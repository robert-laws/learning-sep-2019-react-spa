import React, { Component } from 'react';

import './form-error.styles.scss';

class FormError extends Component {
  render() {
    const { message } = this.props;

    return (
      <div className='col-12 alert alert-danger'>
        {message}
      </div>
    )
  }
}

export default FormError;