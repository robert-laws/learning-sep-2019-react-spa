import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './registration.styles.scss';

class Registration extends Component {
  render() {
    return (
      <Container className='App text-center' fluid>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <h1 className='text-primary'>
              Registration
            </h1>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Registration;