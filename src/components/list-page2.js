import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import List2 from './list2'

class ListPage2 extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <List2 />
            <Footer />
        </div>
    );
  }
}

export default ListPage2;
