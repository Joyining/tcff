import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Filmsdetail from './films-detail'

class FilmsdetailPage extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <Filmsdetail />
            <Footer />
        </div>
    );
  }
}

export default FilmsdetailPage;
