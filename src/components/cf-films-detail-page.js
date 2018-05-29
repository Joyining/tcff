import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Cffilmsdetail from './cf-films-detail'

class CffilmsdetailPage extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <Cffilmsdetail />
            <Footer />
        </div>
    );
  }
}

export default CffilmsdetailPage;
