import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import './myfilm/my-film.scss';
import Tab1 from './myfilm/tab1';
import Tab2 from './myfilm/tab2';
import Tab3 from './myfilm/tab3';
import Tab4 from './myfilm/tab4';

class MyFilmPage extends Component {
  constructor(props){
    super(props);
    this.changeUrl = this.changeUrl.bind(this);
    this.updatecollectionNum = this.updatecollectionNum.bind(this);
    this.state = {
      collectionNum: 0,
      loginStatus: false, 
      login: "", 
    }
  }
  componentWillMount() {
    //collection number
    let collection = JSON.parse(sessionStorage.getItem("collection"));
    if (collection !== null) {
      let collectionNum = collection.films.length + collection.cffilms.length;
      this.setState({
        collectionNum: collectionNum
      })
    }

    //login state
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
  updatecollectionNum() {
    let collection = JSON.parse(sessionStorage.getItem("collection"));
    let collectionNum = collection.films.length + collection.cffilms.length;
    this.setState({
      collectionNum: collectionNum
    })
  }
  changeUrl(evt){
    console.log("evt: ", evt);
    console.log("url: ", this.props.match);
    console.log("new: ", evt.target.getAttribute("to"));
  }
  componentDidMount(){
    window.scrollTo(0, 0);
  }
  componentDidCatch(){
    window.scrollTo(0, 0);
  }
  render() {
    return (
        <div style={{position:'relative'}}>
        <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login} />
            <FastTicket />
            <section className="container">
              <div className="myfilmPage">
                <div className="progressBar">
              <NavLink activeClassName="active" to={`/my-film/1`}>              
                    STEP1. <span>勾選欲購買之場次</span>
                </NavLink>
              <NavLink activeClassName="active" to={`/my-film/2`}>              
                    STEP2. <span>選擇張數及劃位</span>
                </NavLink>
              <NavLink activeClassName="active" to={`/my-film/3`}>              
                    STEP3. <span>選擇付款方式</span>
                </NavLink>
              <NavLink activeClassName="active" to={`/my-film/4`} >              
                    STEP4. <span>完成結帳</span>
                </NavLink>
                </div>
              {/* <TabsRoute url={this.props.match.url}/> */}
              {/* <Route exact path={`/my-film/1`} render={(props) => <Tab1 num={this.text} tab="2" props={props} isAuthed={true} />} />
              <Route path={`/my-film/2`} render={(props) => <Tab2 extraProps={this.state.tab2} props={props} isAuthed={true} />}/> */}
              {/* <Route path={`/my-film/1`} component={Tab1} /> */}
              <Route path={`/my-film/1`} render={() => <Tab1 updatecollectionNum={this.updatecollectionNum}/>} />
              <Route path={`/my-film/2`} component={Tab2} />
              <Route path={`/my-film/3`} component={Tab3} />
              <Route path={`/my-film/4`} render={() => <Tab4 updatecollectionNum={this.updatecollectionNum} />} />
              {/* <Route path={`/my-film/4`} component={Tab4} /> */}
              </div>
            </section>
            <Footer />
        </div>
    );
  }
}

export default MyFilmPage;
