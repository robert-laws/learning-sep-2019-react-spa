import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from './components/welcome/welcome.component';
import Navigation from './components/navigation/navigation.component';
import Home from './components/home/home.component';
import LogIn from './components/log-in/log-in.component';
import Registration from './components/registration/registration.component';
import Meetings from './components/meetings/meetings.component';

import './App.scss';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      user: 'Kal'
    }
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} />
        {this.state.user && (
          <Welcome user={this.state.user} />
        )}
        <Switch>
          <Route exact path='/' render={() => <Home user={this.state.user} />} />
          <Route path='/log-in' component={LogIn} />
          <Route path='/registration' component={Registration} />
          <Route path='/meetings' component={Meetings} />
        </Switch>
      </div>
    );
  }
}
