import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import TabsRoute from './tabs-route';
import './myfilm/my-film.scss';
import Tab1 from './myfilm/tab1';
import Tab2 from './myfilm/tab2';
import Tab3 from './myfilm/tab3';
import Tab4 from './myfilm/tab4';

class MyFilmPage extends Component {
  constructor(props){
    super(props);
    this.changeUrl = this.changeUrl.bind(this);
    // this.text = "props";
    // this.changeTicketNum = this.changeTicketNum.bind(this);
    // this.state = {
    //   tab2: {
    //     films: {
    //         id_movie: 1,
    //         name: "驚魂記",
    //         session: "2018-07-14 19:00 台北光點",
    //         quantity: 1,
    //         seats: [],
    //         allSeats: 170,
    //         occupied: [1, 2, 3, 4, 5, 6, 50, 51, 52, 60, 71, 72]
    //       },
    //       cffilms: {
    //         id_movie: 15,
    //         name: "最長的一天",
    //         quantity: 1
    //       },
    //       changeTicketNum: this.changeTicketNum
    //   }
    // }
  }
  // changeTicketNum(event) {
  //   console.log(event.target.value);
  //   let value = (event.target.value < 1) ? 1 : event.target.value;
  //   value = (event.target.value > 10) ? 10 : value;
  //   let isFilms = event.target.closest("table").classList.contains("films");
  //   if (isFilms) {
  //     // let ar = this.state.films;
  //     // console.log(this.state);
  //     let ar = this.state.tab2.films;
  //     ar.quantity = value;
  //     this.setState({
  //       tab2: {
  //         films: ar
  //       }
  //     });
  //   } else {
  //     // let ar = this.state.cffilms;
  //     let ar = this.state.tab2.cffilms;
  //     ar.quantity = value;
  //     this.setState({
  //       tab2: {
  //         cffilms: ar
  //       }
  //     });
  //   }
  // }
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
            <Header />
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
              <Route path={`/my-film/1`} component={Tab1} />
              <Route path={`/my-film/2`} component={Tab2} />
              <Route path={`/my-film/3`} component={Tab3} />
              <Route path={`/my-film/4`} component={Tab4} />
              </div>
            </section>
            <Footer />
        </div>
    );
  }
}

export default MyFilmPage;
