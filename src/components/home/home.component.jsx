import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import './home.styles.scss';

class Home extends Component {  
  render() {
    const { user } = this.props;

    return (
      <Container className='App text-center' fluid>
        <Row className='justify-content-center'>
          <Col sm='4'>
            <h1 className='text-primary'>Meeting Log</h1>
            <p>This simple app creates meetings, allows people to check in, and picks random users to award prizes. It's an example of a Single Page Application (SPA). It includes a connection to a database and routing. It helps learn <a href="https://reactjs.org">React</a> and <a href="https://firebase.google.com">Firebase</a>.</p>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          {!user ? (
            <span>
              <Button color="primary" outline size="md">Register</Button>
              <Button color="primary" outline size="md">Log In</Button>
            </span>
          ) : (
            <Button color="primary" size="md">Meetings</Button>
          )}
        </Row>
      </Container>
    )
  }
}

export default Home;