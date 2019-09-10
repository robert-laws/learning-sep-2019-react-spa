import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { FaUsers } from 'react-icons/fa';

import './navigation.styles.scss';

class Navigation extends Component {
  constructor() {
    super()

    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { user } = this.props;
    
    return (
      <div>
        <Navbar color='dark' dark expand='md'>
          <Link to='/' className='navbar-brand'>
            <FaUsers className='mr-1' /> Meeting App
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {user ? (
                <React.Fragment>
                  <NavItem>
                    <Link to='/meetings' className='nav-link'>Meetings</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/' className='nav-link'>Log Out</Link>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <Link to='/registration' className='nav-link'>Register</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/log-in' className='nav-link'>Log In</Link>
                  </NavItem>
                </React.Fragment>
              )}              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;