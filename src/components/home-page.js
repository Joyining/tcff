import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Home from './home';
// import Flag from './flag';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionNum: "0" // 加到每個page.js
    };
  }

  // 加到每個page.js
  componentWillMount() {
    this.setState({ collectionNum: localStorage.getItem("collectionsNum") });
  }

  // 加到每個page.js
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return <div>
        {/* 加到每個page.js */}
        <Header collectionNum={this.state.collectionNum} />
        <Home />
        <FastTicket />
        <Footer />
      </div>;
  }
}

export default HomePage;
