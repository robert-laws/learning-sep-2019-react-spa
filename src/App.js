import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import firebase from './firebase/firebase';

import Welcome from './components/welcome/welcome.component';
import Navigation from './components/navigation/navigation.component';
import Home from './components/home/home.component';
import LogIn from './components/log-in/log-in.component';
import Registration from './components/registration/registration.component';
import Meetings from './components/meetings/meetings.component';

import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      displayName: null,
      userID: null
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
      })
    })
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} />
        {this.state.user && (
          <Welcome userName={this.state.displayName} />
        )}
        <Switch>
          <Route exact path='/' render={() => <Home user={this.state.user} />} />
          <Route path='/log-in' component={LogIn} />
          <Route path='/registration' render={() => <Registration registerUser={this.registerUser} />} />
          <Route path='/meetings' component={Meetings} />
        </Switch>
      </div>
    );
  }
}
