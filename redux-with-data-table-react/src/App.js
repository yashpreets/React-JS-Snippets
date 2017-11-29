import React, { Component } from 'react';
import logo from './logo.svg';
import Router from './Router.js';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router/>
      </div>
    );
  }
}

export default App;
