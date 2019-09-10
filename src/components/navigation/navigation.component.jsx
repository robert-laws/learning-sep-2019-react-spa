import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
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
          <NavbarBrand href='/'>
            <FaUsers className='mr-1' /> Meeting App
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {user ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink href='/'>Meetings</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href='/'>Log Out</NavLink>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <NavLink href='/'>Register</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href='/'>Log In</NavLink>
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