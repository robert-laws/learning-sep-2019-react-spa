import React, { Component } from 'react';
import FormError from '../form-error/form-error.component';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import firebase from '../../firebase/firebase';

import './registration.styles.scss';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: null
    }
  }

  handleChange = (event) => {
    const itemName = event.target.name;
    const itemValue = event.target.value;

    this.setState({
      [itemName]: itemValue
    }, () => {
      if(this.state.password !== this.state.confirmPassword) {
        this.setState({
          errorMessage: 'Passwords do not match'
        })
      } else {
        this.setState({
          errorMessage: null
        })
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let registrationData = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.password
    }

    firebase.auth().createUserWithEmailAndPassword(registrationData.email, registrationData.password).then(() => {
      this.props.registerUser(registrationData.displayName)
    }).catch(error => {
      if(error.message !== null) {
        this.setState({errorMessage: error.message})
      } else {
        this.setState({errorMessage: null})
      }
    })
  }

  render() {
    return (
      <Container className='App text-left' fluid>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <Card>
              <CardBody>
                <CardTitle>
                  <h2 className='text-primary'>Register</h2>
                </CardTitle>                
                {this.state.errorMessage !== null ? (
                  <FormError message={this.state.errorMessage} />
                ) : null}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="displayName">Display Name</Label>
                    <Input type="text" name="displayName" id="displayName" onChange={this.handleChange} value={this.state.displayName} placeholder="select a display name" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email} placeholder="enter your email address" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password} placeholder="enter a password" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirmPassword">Password</Label>
                    <Input type="password" name="confirmPassword" id="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} placeholder="confirm your password" />
                  </FormGroup>
                  <Button className='float-right' color='primary'>Register</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Registration;