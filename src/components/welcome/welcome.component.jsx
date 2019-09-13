import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './welcome.styles.scss';

class Welcome extends Component {
  render() {
    const { userName, logoutUser } = this.props;

    return (
      <div id='welcome-component' className='text-center text-secondary font-weight-bold pl-1'>
        Welcome, { userName } | <Link to="/log-in" onClick={logoutUser}>Log Out</Link>
      </div>
    )
  }
}

export default Welcome;