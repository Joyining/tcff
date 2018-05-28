import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import News from './news'

class NewsPage extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <News />
            <Footer />
        </div>
    );
  }
}

export default NewsPage;
