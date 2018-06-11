import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Time from './time'
import TimeSwitch from "./time-switch";

class TimePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: ["切換日曆", "切換列表"],
      switchUrl: ["/time", "/time-list"],
      collectionNum: "0", // only for testing 加到購物車
      loginStatus: false,
      login: "",
    };
    // only for testing 加到購物車
    this.updatecollectionNum = this.updatecollectionNum.bind(this);
  }

  // only for testing 加到購物車
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
  // only for testing 加到購物車
  updatecollectionNum() {
    this.setState({ collectionNum: localStorage.getItem("collectionsNum") });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login} />
        <FastTicket />
        <Time updatecollectionNum={this.updatecollectionNum} />
        <TimeSwitch
          switch={this.state.switch[1]}
          switchUrl={this.state.switchUrl[1]}
        />
        <Footer />
      </div>
    );
  }
}

export default TimePage;
