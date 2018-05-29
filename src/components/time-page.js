import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Time from './time'

class TimePage extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <Time />
            <Footer />
        </div>
    );
  }
}

export default TimePage;
