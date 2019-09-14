import React, { Component } from 'react';
import { Alert } from 'reactstrap';

import './myAlert.styles.scss';

class myAlert extends Component {
  constructor() {
    super();

    this.state = {
      visible: true
    }
  }

  onDismiss = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { message } = this.props;
    
    return (
      <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
        {message}
      </Alert>
    )
  }
}

export default myAlert;
