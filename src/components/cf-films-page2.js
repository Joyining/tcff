import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Cffilms2 from './cf-films2'

class CffilesPage2 extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <Cffilms2 />
            <Footer />
        </div>
    );
  }
}

export default CffilmsPage2;
