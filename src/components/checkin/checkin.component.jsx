import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import firebase from '../../firebase/firebase';

import './checking.styles.scss';

class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: ''
    }
  }
  
  handleChange = event => {
    const itemName = event.target.name;
    const itemValue = event.target.value;

    this.setState({
      [itemName]: itemValue
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    const ref = firebase.database().ref(`meetings/${this.props.match.params.userID}/${this.props.match.params.meetingID}/attendees`);

    ref.push({
      attendeeName: this.state.displayName,
      attendeeEmail: this.state.email,
      star: false
    })

    this.props.history.push(`/attendees/${this.props.match.params.userID}/${this.props.match.params.meetingID}`);
  }

  render() {
    return (
      <Container className='App text-left' fluid>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <Card>
              <CardBody>
                <CardTitle>
                  <h2 className='text-primary'>Check In</h2>
                </CardTitle>                
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="displayName">Name</Label>
                    <Input type="text" name="displayName" id="displayName" onChange={this.handleChange} value={this.state.displayName} placeholder="enter your display name" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email} placeholder="enter your email" />
                  </FormGroup>
                  <Button className='float-right' color='primary'>Check In</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(CheckIn);