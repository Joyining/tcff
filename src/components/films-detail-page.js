import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Filmsdetail from './films-detail'

class FilmsdetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionNum: "0",
    };

  }
  // only for testing 加到購物車
  componentWillMount() {
    this.setState({ collectionNum: localStorage.getItem("collectionsNum") });
  }
  // only for testing 加到購物車
  updatecollectionNum() {
    this.setState({ collectionNum: localStorage.getItem("collectionsNum") });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
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
