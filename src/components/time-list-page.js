import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import TimeList from "./time-list";
import TimeSwitch from "./time-switch";

class TimeListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: ['切換日曆', '切換列表'],
      switchUrl: ['/time', '/time-list'],
      collectionNum: 0, 
      loginStatus: false,
      login: "",
    };
  }

  componentWillMount() {
    // 加到每個page.js
    let collection = JSON.parse(sessionStorage.getItem("collection"));
    if (collection !== null) {
      let collectionNum = collection.films.length + collection.cffilms.length;
      this.setState({
        collectionNum: collectionNum
      })
    }

    // 加到每個page.js
    if (sessionStorage.getItem("user") !== null) {
      ;
      this.setState({
        loginStatus: true,
        login: JSON.parse(sessionStorage.getItem("user"))["username"],
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
        <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login}/>
        <FastTicket />
        <TimeList />
        <TimeSwitch switch={this.state.switch[0]} switchUrl={this.state.switchUrl[0]} />
        <Footer />
      </div>;
  }
}

export default TimeListPage;
