import React, { Component } from 'react';
import "../sass/time.scss";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class TimeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
    };
    // this.createCol1 = this.createCol1.bind(this); 
    // this.createCol2 = this.createCol2.bind(this); 
    // this.createCol3 = this.createCol3.bind(this); 
  }
  
  componentWillMount() {
    fetch("http://192.168.39.110/tcff_php/api/movie/session.php")
      .then(res => res.json())
      .then(sessions => {
        this.setState({ data: sessions });
      });
    console.log('state: ', this.state);
  }

  // createCol1 = () => {
  //   let dataLength = this.state.data.length;
  //   console.log(dataLength);
  //     this.state.data.map(session =>{
  //       if (session.auditorium == "誠品電影院"){
  //         console.log(session.date);
  //         return <div className="">
  //           {session.date.replace('-', '/').replace('-', '/')}
  //           {session.day}
  //         </div>;
  //       }
  //     }
  //   )}

  // createCol2 = () => {
  //   this.state.data.map(session => {
  //     if (session.auditorium == "誠品電影院") {
  //       return <Link to="/" className="">
  //         {session.time.slice(0, 5)}
  //         {session.name_zhtw}
  //       </Link>;
  //     }
  //   })
  // }

  // createCol3 = () => {
  //   this.state.data.map(session => {
  //     if (session.auditorium == "台北光點") {
  //       return <Link to="/" className="">
  //         {session.time.slice(0, 5)}
  //         {session.name_zhtw}
  //       </Link>;
  //     }
  //   })
  // }

  render() {
    return <section className="container-time">
        <div className="time-wrap">
          <div className="col col1">
            <div className="heading cell"></div>
            {this.state.data.map(session => {
              if (session.auditorium == "誠品電影院") {
                console.log(session);
                return <div className="cell transition" key={session.id}>
                    {session.date
                      .replace("-", "/")
                    .replace("-", "/").slice(5,10)}{'  '}
                    {session.day}
                  </div>;
              }
            })}
          </div>
          <div className="col col2">
            <div className="heading cell border">誠品電影院</div>
            {this.state.data.map(session => {
              if (session.auditorium == "誠品電影院") {
                return <Link to={`/films-detail-page?id=${session.id_movie}`} className="cell transition" key={session.id}>
                    {session.time.slice(0, 5)}
                    {"  "}
                    {session.name_zhtw}
                  </Link>;
              }
            })}
          </div>
          <div className="col col3">
            <div className="heading cell">台北光點</div>
            {this.state.data.map(session => {
              if (session.auditorium == "台北光點") {
                return <Link to={`/films-detail-page?id=${session.id_movie}`} className="cell transition" key={session.id}>
                    {session.time.slice(0, 5)}
                    {"  "}
                    {session.name_zhtw}
                  </Link>;
              }
            })}
          </div>
          <div className="col col4">
            <div className="heading cell border">誠品電影院</div>
            {this.state.data.map(session => {
              if (session.auditorium == "誠品電影院") {
                return <Link to={`/films-detail-page?id=${session.id_movie}`} className="cell transition" key={session.id}>
                    {session.date
                      .replace("-", "/")
                      .replace("-", "/")
                      .slice(5, 10)}
                    {"  "}
                    {session.day}
                    <br />
                    {session.time.slice(0, 5)}
                    {"  "}
                    {session.name_zhtw}
                  </Link>;
              }
            })}
          </div>
          <div className="col col5">
            <div className="heading cell border">台北光點</div>
              {this.state.data.map(session => {
              if (session.auditorium == "台北光點") {
                return <Link to={`/films-detail-page?id=${session.id_movie}`} className="cell transition" key={session.id}>
                    {session.date
                      .replace("-", "/")
                      .replace("-", "/")
                      .slice(5, 10)}
                    {"  "}
                    {session.day}
                    <br />
                    {session.time.slice(0, 5)}
                    {"  "}
                    {session.name_zhtw}
                  </Link>;
                }
              })}
          </div>
        </div>
      </section>;
  }
}

export default TimeList;
