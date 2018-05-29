import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import MemberPage from './components/member-page';
import HomePage from './components/home-page';
import MyFilmPage from './components/my-film-page';
import FilmsPage from './components/films-page';
// import AllPage from './components/all-page';
import TimePage from './components/time-page';
import InfoPage from './components/info-page';
import NewsPage from './components/news-page';
import ArticlePage from './components/article-page';



class App extends Component {
  render() {
    return <Router>
        <div>
          {/* 路由對照設定 */}
          <Route exact path="/" component={HomePage} />
          <Route path="/member" component={MemberPage} />
          <Route path="/my-film" component={MyFilmPage} />
          <Route path="/films" component={FilmsPage} />
        {/* <Route path="/cf-films" component={CfFilmsPage} /> */}
          <Route path="/time" component={TimePage} />
          <Route path="/info" component={InfoPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/article" component={ArticlePage} />
        </div>
      </Router>;
  }
}
export default App;

