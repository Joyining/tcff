import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Logo from "./components/logo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
