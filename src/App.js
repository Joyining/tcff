import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import MemberPage from './components/member-page';
import HomePage from './components/home-page';
import MyFilmPage from './components/my-film-page';
import FilmsPage from './components/films-page';
import CfFilmsPage from './components/cf-films-page';
import FilmsDetailPage from './components/films-detail-page';
import CfFilmsDetailPage from './components/cf-films-detail-page';
import TimePage from './components/time-page';
import TimeListPage from "./components/time-list-page";
import InfoPage from './components/info-page';
import NewsPage from './components/news-page';
import ArticlePage from './components/article-page';




class App extends Component {

  // shouldComponentUpdate() {
  //   window.scrollTo(0, 0);
  // }
  // componentWillUpdate(){
  //   window.scrollTo(0, 0);
  // }
  // componentDidUpdate(){
  //   window.scrollTo(0, 0);
  // }
  
  render() {
    return <Router>
        <div>
          {/* 路由對照設定 */}
          <Route exact path="/" component={HomePage} />
          <Route path="/member" component={MemberPage} />
          <Route path="/my-film/:page" component={MyFilmPage} />
          <Route path="/films" component={FilmsPage} />
          <Route path="/cf-films" component={CfFilmsPage} />
          <Route path="/films-detail-page" component={FilmsDetailPage} />
          <Route path="/cf-films-detail-page" component={CfFilmsDetailPage} />
          <Route path="/time" component={TimePage} />
          <Route path="/time-list" component={TimeListPage} />
          <Route path="/info" component={InfoPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/article" component={ArticlePage} />
        </div>
      </Router>;
  }
}
export default App;

