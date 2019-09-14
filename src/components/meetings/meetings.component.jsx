import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button, Form } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import FormError from '../form-error/form-error.component';

import './meetings.styles.scss';

class Meetings extends Component {
  constructor() {
    super()

    this.state = {
      meetingName: '',
      errorMessage: null
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
    } else {
      this.setState({meetingName: ''})
      this.setState({errorMessage: null})
    }
    
  }

  render() {
    return (
      <Container className='App meeting-section text-center' fluid>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <Card>
              <CardBody>
                <CardTitle>
                  <h2 className='text-primary'>Add a Meeting</h2>
                </CardTitle>                
                {this.state.errorMessage !== null ? (
                  <FormError message={this.state.errorMessage} />
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
      </Container>
    )
  }
}

export default Meetings;