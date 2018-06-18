import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import TimeList from "./time-list";
import TimeSwitch from "./time-switch";
import Breadcrumb from './breadcrumb';

class TimeListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: ['切換日曆', '切換列表'],
      switchUrl: ['/time', '/time-list'],
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
    return <div style={{ position: "relative" }}>
        <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login}/>
        <Breadcrumb currentBreadcrumbName={this.state.currentBreadcrumbName} currentBreadcrumbPath={this.state.currentBreadcrumbPath} />
        <FastTicket />
        <TimeList />
        <TimeSwitch switch={this.state.switch[0]} switchUrl={this.state.switchUrl[0]} />
        <Footer />
      </div>;
  }
}

export default TimeListPage;
