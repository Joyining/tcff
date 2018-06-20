import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import News from './news'
import Breadcrumb from './breadcrumb';


class NewsPage extends Component {
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
        article: ['首頁', '電影賞析'],
        membercenter: ['首頁', '會員中心'],
        info: ['首頁', '關於影展'],
        news: ['首頁', '最新消息'],
        member: ['首頁', '登入註冊'],
      },
      breadcrumbPath: {
        films: ['/', '/films'],
        time: ['/', '/time'],
        timelist: ['/', '/time'],
        cffilms: ['/', '/cf-films'],
        filmsdetailpage: ['/', '/films'],
        cffilmsdetailpage: ['/', '/cf-films'],
        article: ['/', '/article'],
        membercenter: ['/', '/membercenter'],
        info: ['/', '/info'],
        news: ['/', '/news'],
        member: ['/', '/member'],
      },
      currentBreadcrumbName: [],
      currentBreadcrumbPath: [],
      films: [],
    };

  }
  componentWillMount() {
    // 更新collectionNum數字
    let collection = JSON.parse(sessionStorage.getItem("collection"));
    if (collection !== null) {
      let collectionNum = collection.films.length + collection.cffilms.length;
      this.setState({
        collectionNum: collectionNum
      })
    }

    // 判斷是否為登入狀態
    if (sessionStorage.getItem("user") !== null) {
      this.setState({
        loginStatus: true,
        // 改變登入icon樣式
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
        <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login} />
        <Breadcrumb currentBreadcrumbName={this.state.currentBreadcrumbName} currentBreadcrumbPath={this.state.currentBreadcrumbPath} />
       
        <FastTicket />
        <News />
        <Footer />
      </div>;
  }
}

export default NewsPage;
