import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import List from './list'

class ListPage extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <List />
            <Footer />
        </div>
    );
  }
}

export default ListPage;
