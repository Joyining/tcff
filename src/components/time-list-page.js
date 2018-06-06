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
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <TimeList />
            <TimeSwitch switch={this.state.switch[0]}/>
            <Footer />
        </div>
    );
  }
}

export default TimeListPage;
