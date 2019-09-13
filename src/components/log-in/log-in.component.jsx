import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import FormError from '../form-error/form-error.component';

import firebase from '../../firebase/firebase';

import './log-in.styles.scss';

class LogIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
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

    let loginInformation = {
      email: this.state.email,
      password: this.state.password
    }

    firebase.auth().signInWithEmailAndPassword(
      loginInformation.email,
      loginInformation.password
    )
    .then(() => {
      this.props.history.push('/meetings')
    })
    .catch(error => {
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
                  <h2 className='text-primary'>Login</h2>
                </CardTitle>                
                {this.state.errorMessage !== null ? (
                  <FormError message={this.state.errorMessage} />
                ) : null}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email} placeholder="enter your email address" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password} placeholder="enter a password" />
                  </FormGroup>
                  <Button className='float-right' color='primary'>Login</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(LogIn);