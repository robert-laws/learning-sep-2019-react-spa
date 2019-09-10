import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

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
              <Link className='btn btn-outline-primary mr-2' to='/registration'>Register</Link>
              <Link className='btn btn-outline-primary mr-2' to='/log-in'>Log In</Link>
            </span>
          ) : (
            <Link className='btn btn-primary' to='/meetings'>Meetings</Link>
          )}
        </Row>
      </Container>
    )
  }
}

export default Home;