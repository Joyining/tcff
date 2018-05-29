import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import MyFilm from './my-film'

class MyFilmPage extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <MyFilm />
            <Footer />
        </div>
    );
  }
}

export default MyFilmPage;
