import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import firebase from './firebase/firebase';

import Welcome from './components/welcome/welcome.component';
import Navigation from './components/navigation/navigation.component';
import Home from './components/home/home.component';
import LogIn from './components/log-in/log-in.component';
import Registration from './components/registration/registration.component';
import Meetings from './components/meetings/meetings.component';
import CheckIn from './components/checkin/checkin.component';

import './App.scss';
import Attendees from './components/attendees/attendees.component';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      displayName: null,
      userID: null,
      meetings: null,
      howManyMeetings: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        })

        const meetingsRef = firebase.database().ref(`meetings/${FBUser.uid}`);

        meetingsRef.on('value', snapshot => {
          let meetingsList = [];

          snapshot.forEach(item => {            
            meetingsList.push({
              meetingID: item.key,
              meetingName: item.val().meetingName
            })
          })

          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          })
        })
      } else {
        this.setState({user: null})
      }
    })
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        })
        this.props.history.push('/meetings')
      })
    })
  }

  logoutUser = event => {
    event.preventDefault();

    this.setState({
      user: null,
      displayName: null,
      userID: null
    })

    firebase.auth().signOut().then(() => {
      this.props.history.push('/log-in')
    })
  }

  addMeeting = meetingName => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    let meetingError = null;

    try {
      ref.push({meetingName: meetingName})
    } catch (error) {
      meetingError = error.message
    }

    return meetingError;
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logoutUser={this.logoutUser} />
        {this.state.user && (
          <Welcome userName={this.state.displayName} logoutUser={this.logoutUser} />
        )}
        <Switch>
          <Route exact path='/' render={() => <Home user={this.state.user} />} />
          <Route path='/log-in' component={LogIn} />
          <Route path='/registration' render={() => <Registration registerUser={this.registerUser} />} />
          <Route path='/meetings' render={() => <Meetings addMeeting={this.addMeeting} meetings={this.state.meetings} userID={this.state.userID} />} />
          <Route path='/checkin/:userID/:meetingID' render={() => <CheckIn />} />
          <Route path='/attendees/:userID/:meetingID' render={() => <Attendees adminUser={this.state.userID} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);