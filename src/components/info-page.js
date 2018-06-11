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
      loginStatus: false,
      login: "",
    };

  }
  componentWillMount() {
    this.setState({ collectionNum: localStorage.getItem("collectionsNum") });

    if (sessionStorage.getItem("user") !== "") {
      console.log(typeof (sessionStorage.getItem('user')));
      console.log(JSON.parse(sessionStorage.getItem('user')));
      this.setState({
        loginStatus: true,
        login: JSON.parse(sessionStorage.getItem("user"))["email"].slice(0, 2).toUpperCase(),
      });
    } else {
      this.setState({
        loginStatus: false,
        login: "",
      })
    }
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return <div style={{ position: "relative" }}>
        <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login} />
        <FastTicket />
        <Info />
        <Footer />
      </div>;
  }
}

export default InfoPage;
