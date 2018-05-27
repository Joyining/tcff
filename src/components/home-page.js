import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Home from './home';
// import Flag from './flag';

class HomePage extends Component {
  render() {
    return (
        <div>
            <Header />
            <Home />
            {/* <Flag /> */}
            <FastTicket />
            <Footer />
        </div>
    );
  }
}

export default HomePage;
