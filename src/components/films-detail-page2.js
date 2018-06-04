import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Filmsdetail2 from './films-detail2'

class FilmsdetailPage2 extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <Filmsdetail2 />
            <Footer />
        </div>
    );
  }
}

export default FilmsdetailPage2;
