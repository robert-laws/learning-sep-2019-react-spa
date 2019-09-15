import React, { Component } from 'react';
import AttendeesList from '../attendeesList/attendeesList.component';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import firebase from '../../firebase/firebase';

import './attendees.styles.scss';

class Attendees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAttendees: []
    }
  }

  componentDidMount() {
    const ref = firebase.database().ref(`meetings/${this.props.match.params.userID}/${this.props.match.params.meetingID}/attendees`);

    ref.on('value', snapshot => {
      let attendeesList = [];

      snapshot.forEach(item => {            
        attendeesList.push({
          attendeeID: item.key,
          attendeeName: item.val().attendeeName,
          attendeeEmail: item.val().attendeeEmail
        })
      })

      this.setState({
        displayAttendees: attendeesList
      })
    })
  }

  render() {
    return (
      <Container className='App text-center' fluid>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <h1 className='text-primary'>
              Attendees
            </h1>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <AttendeesList userID={this.props.match.params.userID} attendees={this.state.displayAttendees} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Attendees);