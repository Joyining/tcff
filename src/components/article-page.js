import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Article from './article'

class ArticlePage extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <Article />
            <Footer />
        </div>
    );
  }
}

export default ArticlePage;
