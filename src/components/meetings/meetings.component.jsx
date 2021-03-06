import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button, Form } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

import MeetingsList from '../meetings-list/meetings-list.component';
import FormError from '../form-error/form-error.component';
import Alert from '../myAlert/myAlert.component';

import './meetings.styles.scss';

class Meetings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meetingName: '',
      errorMessage: null,
      alertMessage: null
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

    const error = this.props.addMeeting(this.state.meetingName);

    if(error !== null) {
      this.setState({errorMessage: error})
      this.setState({alertMessage: null})
    } else {
      this.setState({meetingName: ''})
      this.setState({errorMessage: null})
      this.setState({alertMessage: `Meeting named '${this.state.meetingName}' has been added to the database.`})
    }
  }

  render() {
    return (
      <Container className='App meeting-section text-center' fluid>
        <Row className='justify-content-center'>
          <Col sm='6'>
            <Card>
              <CardBody>
                <CardTitle>
                  <h2 className='text-primary'>Add a Meeting</h2>
                </CardTitle>                
                {this.state.errorMessage !== null ? (
                  <FormError message={this.state.errorMessage} />
                ) : null}
                {this.state.alertMessage !== null ? (
                  <Alert message={this.state.alertMessage} />
                ) : null}
                <Form onSubmit={this.handleSubmit}>
                  <InputGroup>
                    <Input type="text" name="meetingName" id="meetingName" onChange={this.handleChange} value={this.state.meetingName} placeholder="enter a meeting name" />
                    <InputGroupAddon addonType="append">
                      <Button color="primary">+</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col sm='8' className='mt-3'>
            <Card body className="text-left">
              <CardBody>
                {this.props.meetings && this.props.meetings.length ? (
                  <CardTitle className="mt-n4">
                    <h3 className='text-primary'>
                      Your Meetings
                    </h3>
                    <MeetingsList meetings={this.props.meetings} userID={this.props.userID} />
                  </CardTitle>
                ) : <CardTitle className="mt-n4"><h3 className='text-secondary'>No Meetings for this User</h3></CardTitle>}                             
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Meetings;