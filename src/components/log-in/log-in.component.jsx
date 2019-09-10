import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './log-in.styles.scss';

class LogIn extends Component {
  render() {
    return (
      <Container className='App text-center' fluid>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <h1 className='text-primary'>
              Log In
            </h1>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LogIn;