import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Info from './info'

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionNum: "0",
    };

  }
  componentWillMount() {
    this.setState({ collectionNum: localStorage.getItem("collectionsNum") });
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header collectionNum={this.state.collectionNum} />
            <FastTicket />
            <Info />
            <Footer />
        </div>
    );
  }
}

export default InfoPage;
