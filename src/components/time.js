import React, { Component } from 'react';
import "../sass/time.scss";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
    };
  }
  
  componentWillMount() {
    fetch("http://192.168.39.110/tcff_php/api/movie/session.php")
      .then(res => res.json())
      .then(sessions => {
        this.setState({ data: sessions });
      });
    console.log('state: ', this.state);
  }

  render() {
    return <section className="container-time">
        <div className="time-wrap">
          <div className="time-row">
            <div className="time-col date heading" />
            <div className="time-col time-name border heading">誠品電影院</div>
            <div className="time-col time-name heading">台北光點</div>
          </div>

          {this.state.data.map(session => (
            <div className="time-row" key={session.id}>
              <div className="time-col date">
                {session.date.replace('-', '/')}&nbsp 
                {session.day}
              </div>
              <Link to="/" className="time-col time-name">
                {session.time.slice(1,5)}&nbsp 
                {session.name_zhtw}
              </Link>
              <Link to="/" className="time-col time-name">
                {session.time.slice(1, 5)}&nbsp 
                {session.name_zhtw}
              </Link>
            </div>
          ))}
        </div>

        {/* <table>
          <thead>
            <tr>
              <th>id</th>
              <th>date</th>
              <th>day</th>
              <th>time</th>
              <th>auditorium</th>
              <th>id_movie</th>
              <th>name_zhtw</th>
              <th>running_time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(session => <tr key={session.id}>
                <td>{session.id}</td>
                <td>{session.date}</td>
                <td>{session.day}</td>
                <td>{session.time}</td>
                <td>{session.auditorium}</td>
                <td>{session.id_movie}</td>
                <td>{session.name_zhtw}</td>
                <td>{session.running_time}</td>
              </tr>)}
          </tbody>
        </table> */}
      </section>;
  }
}

export default Time;
