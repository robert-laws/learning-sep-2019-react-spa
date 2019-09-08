import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './App.scss';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      selection: '',
      dropdownOpen: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  handleClick = (event) => {
    this.setState({
      selection: event.target.name
    })
  }

  render() {
    return (
      <Container className='App'>
        <Row>
          <Col>
            <h1>React SPA</h1>
            <p>{this.state.selection}</p>
          </Col>
          <Col>
            <Button color="primary" size="lg">Click Here</Button>
            <hr />
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle color="primary" caret>
                Make a Selection
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem name="Germany" onClick={this.handleClick}>Germany</DropdownItem>
                <DropdownItem name="France" onClick={this.handleClick}>France</DropdownItem>
                <DropdownItem name="Spain" onClick={this.handleClick}>Spain</DropdownItem>
                <DropdownItem name="Italy" onClick={this.handleClick}>Italy</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    );
  }
}
