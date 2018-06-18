import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Time from './time'
import TimeSwitch from "./time-switch";
import Breadcrumb from './breadcrumb';

class TimePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: ["切換日曆", "切換列表"],
      switchUrl: ["/time", "/time-list"],
      collectionNum: 0,
      loginStatus: false,
      login: "",
      breadcrumbName: {
        films: ['首頁', '確認放映'],
        time: ['首頁', '場次日曆'],
        timelist: ['首頁', '場次列表'],
        cffilms: ['首頁', '募資影片'],
        filmsdetailpage: ['首頁', '確認放映'],
        cffilmsdetailpage: ['首頁', '募資影片'],
      },
      breadcrumbPath: {
        films: ['/', '/films'],
        time: ['/', '/time'],
        timelist: ['/', '/time'],
        cffilms: ['/', '/cf-films'],
        filmsdetailpage: ['/', '/films'],
        cffilmsdetailpage: ['/', '/cf-films'],
      },
      currentBreadcrumbName: [],
      currentBreadcrumbPath: [],
      films: [],
    };
  }

  componentWillMount() {
    let collection = JSON.parse(sessionStorage.getItem("collection"));
    if (collection !== null) {
      let collectionNum = collection.films.length + collection.cffilms.length;
      this.setState({
        collectionNum: collectionNum
      })
    }

    if (sessionStorage.getItem("user") !== null) {
      console.log(typeof (sessionStorage.getItem('user')));
      console.log(JSON.parse(sessionStorage.getItem('user')));
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

    const currentPath = this.props.location.pathname.replace("/", "").replace("-", "");
    const breadcrumbNameArr = this.state.breadcrumbName[currentPath];
    const breadcrumbPathArr = this.state.breadcrumbPath[currentPath];
    this.setState({
      currentBreadcrumbName: breadcrumbNameArr,
      currentBreadcrumbPath: breadcrumbPathArr,
    })
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login} />
        <Breadcrumb currentBreadcrumbName={this.state.currentBreadcrumbName} currentBreadcrumbPath={this.state.currentBreadcrumbPath}/>
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
