import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className='text-center text-secondary font-weight-bold pl-1'>
        Welcome, { user } | <a href="/">Log Out</a>
      </div>
    )
  }
}

export default Welcome;