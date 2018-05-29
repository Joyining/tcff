import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Cffilms from './cf-films'

class CffilesPage extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <Cffilms />
            <Footer />
        </div>
    );
  }
}

export default CffilmsPage;
