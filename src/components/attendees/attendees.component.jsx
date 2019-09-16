import React, { Component } from 'react';
import AttendeesList from '../attendeesList/attendeesList.component';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { FaUndo, FaRandom } from 'react-icons/fa';

import firebase from '../../firebase/firebase';

import './attendees.styles.scss';

class Attendees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thisMeetingName: '',
      displayAttendees: [],
      allAttendees: [],
      searchQuery: ''
    }
  }

  componentDidMount() {
    const meetingRef = firebase.database().ref(`meetings/${this.props.match.params.userID}/${this.props.match.params.meetingID}/meetingName`);
    meetingRef.once('value', snapshot => {
      this.setState({
        thisMeetingName: snapshot.val()
      });
    });

    const ref = firebase.database().ref(`meetings/${this.props.match.params.userID}/${this.props.match.params.meetingID}/attendees`);
    ref.on('value', snapshot => {
      let attendeesList = [];

      snapshot.forEach(item => {            
        attendeesList.push({
          attendeeID: item.key,
          attendeeName: item.val().attendeeName,
          attendeeEmail: item.val().attendeeEmail,
          star: item.val().star
        })
      })

      this.setState({
        allAttendees: attendeesList,
        displayAttendees: attendeesList
      })
    })
  }

  handleChange = event => {
    const itemName = event.target.name;
    const itemValue = event.target.value;

    this.setState({
      [itemName]: itemValue
    })
  }

  resetQuery = () => {
    this.setState({
      displayAttendees: this.state.allAttendees,
      searchQuery: ''
    })
  }

  chooseRandom = () => {
    const randomAttendee = Math.floor(Math.random() * this.state.allAttendees.length);
    this.resetQuery();
    this.setState({
      displayAttendees: [this.state.allAttendees[randomAttendee]]
    })
  }

  render() {
    const dataFilter = item => item.attendeeName.toLowerCase().match(this.state.searchQuery.toLowerCase()) && true;
    const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

    return (
      <Container className='App attendees-section text-center' fluid>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <h1 className='text-primary mb-3'>
              {this.state.thisMeetingName}
            </h1>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <h3>
              Attendees
            </h3>
          </Col>
        </Row>
        <Row className='justify-content-center mb-4'>
          <Col sm='4'>
            <Card>
              <CardBody>
                <InputGroup>
                  <Input type="text" name="searchQuery" value={this.state.searchQuery} placeholder="Search Attendees" onChange={this.handleChange} />
                  <InputGroupAddon addonType="append">
                    <Button color="primary" title="Pick a Random Attendee" onClick={this.chooseRandom}>
                      <FaRandom />
                    </Button>
                    <Button color="primary" title="Reset Search" onClick={this.resetQuery}>
                      <FaUndo />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>                
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <AttendeesList userID={this.props.match.params.userID} meetingID={this.props.match.params.meetingID} attendees={filteredAttendees} adminUser={this.props.adminUser} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Attendees);