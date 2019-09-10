import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './welcome.styles.scss';

class Welcome extends Component {
  render() {
    const { user } = this.props;

    return (
      <div id='welcome-component' className='text-center text-secondary font-weight-bold pl-1'>
        Welcome, { user } | <Link to="/">Log Out</Link>
      </div>
    )
  }
}

export default Welcome;