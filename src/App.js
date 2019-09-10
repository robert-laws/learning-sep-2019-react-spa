import React, { Component } from 'react';
import Welcome from './components/welcome/welcome.component';
import Navigation from './components/navigation/navigation.component';
import Home from './components/home/home.component';

import './App.scss';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    }
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} />
        {this.state.user && (
          <Welcome user={this.state.user} />
        )}
        <Home user={this.state.user} />
      </div>
    );
  }
}
