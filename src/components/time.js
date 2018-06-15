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
      uniqueDate:[], //07-01
      uniqueDateAll: [], //2018-07-01
      uniqueDay: [], // Sun
      uniqueDateDay: [], // 2018-07-01 Sun
      currentInx:0,
      currentDay:'',
    };
    this.createUniqueDate = this.createUniqueDate.bind(this);
    this.nextDate = this.nextDate.bind(this);  
  }


  createUniqueDate(){
    let dateArr = [];
    let dateAllArr = [];
    let dateDayArr = [];
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    // 從60筆data中取出所有的date
    this.state.data.map(session =>{
      dateArr.push(`${session.date.slice(5,10)}`);
      dateAllArr.push(`${session.date}`);
      dateDayArr.push(`${session.date} ${session.day}`);
    })

    // 60筆date中，取出Unique的14天
    let uniqueDateArr = dateArr.filter(onlyUnique);
    let uniqueDateAllArr = dateAllArr.filter(onlyUnique);
    let uniqueDateDayArr = dateDayArr.filter(onlyUnique);
    let uniqueDayArr = [];
    Array.from(uniqueDateDayArr).forEach(el=>{
      uniqueDayArr.push(el.slice(11, 15));
    });

    this.setState({
      uniqueDate: uniqueDateArr,
      uniqueDateAll: uniqueDateAllArr,
      uniqueDay: uniqueDayArr,
      uniqueDateDay: uniqueDateDayArr,
      currentDate: uniqueDateDayArr[0],
    });

    let datePickers = document.querySelectorAll('.date-picker');
    datePickers[0].classList.add('active');
  }

  datePick(date){
    let currentDate = `2018-${date}`;
    let uniqueDateAllArr = this.state.uniqueDateAll;
    let currentInx = uniqueDateAllArr.indexOf(currentDate);
    let datePickers = document.querySelectorAll('.date-picker');
    for (let i = 0; i < datePickers.length; i++){
      if (i == currentInx){
        for (let j = 0; j < datePickers[i].parentNode.childNodes.length; j++){
          datePickers[i].parentNode.childNodes[j].classList.remove('active');
        }
        console.log(datePickers[i].parentNode.childNodes[0]);
        datePickers[i].classList.add('active');
      }
    }
    this.setState({
      currentInx: currentInx,
    })
    console.log(this.state.currentInx);
  }

  nextDate(){
    let currentInx = this.state.currentInx;
    currentInx=(currentInx+1)%14;
    let datePickers = document.querySelectorAll(".date-picker");
    for (let i = 0; i < datePickers.length; i++) {
      if (i == currentInx) {
        for (let j = 0; j < datePickers[i].parentNode.childNodes.length; j++) {
          datePickers[i].parentNode.childNodes[j].classList.remove('active');
        }
        console.log(datePickers[i].parentNode.childNodes[0]);
        datePickers[i].classList.add('active');
      }
    }
    this.setState({
      currentInx: currentInx,
    })
    console.log(this.state.currentInx);

    // let calendars = document.querySelectorAll('.cal');
    // Array.from(calendars).forEach(calendar=>{
    //   calendar.classList.add('animate');
    // })
  }

  componentWillMount() {
    fetch("http://192.168.39.110/tcff_php/api/movie/session.php")
      .then(res => res.json())
      .then(sessions => {
        this.setState({ data: sessions });
      })
      .then(this.createUniqueDate);
  }

  render() {
    return <section className="container-time">

        <div className="date-pick-wrap">
          {this.state.uniqueDate.map(date=>{
          return <div className="date-picker transition" key={date.id} onClick={this.datePick.bind(this, date)}>
              {date}
            </div>;
          })}
        </div>

        <div className="calendar">
          <div className="cal cal-left shadow transition" onClick={this.nextDate}>
            <div className="cal-heading">誠品電影院</div>
            <div className="year">2018</div>
            <div className="date">{this.state.uniqueDate[this.state.currentInx]}</div>
            <div className="day">{this.state.uniqueDay[this.state.currentInx]}</div>
            {this.state.data.map(session => {
            // console.log(this.state.currentDate)
              if (session.date == this.state.uniqueDateAll[this.state.currentInx] && session.auditorium == "誠品電影院") {
                return <div key={session.id}>
                  <Link to={`/films-detail-page?id=${session.id_movie}`} className="time-name transition">{session.time.slice(0, 5)}{"  "}{session.name_zhtw}</Link>
                </div>;
              }
            })}
          </div>
          <div className="cal cal-right shadow transition" onClick={this.nextDate}>
            <div className="cal-heading">台北光點</div>
            <div className="year">2018</div>
            <div className="date">{this.state.uniqueDate[this.state.currentInx]}</div>
           <div className="day">{this.state.uniqueDay[this.state.currentInx]}</div>
            {this.state.data.map(session => {
              // console.log(this.state.currentDate)
              if (session.date == this.state.uniqueDateAll[this.state.currentInx] && session.auditorium == "台北光點") {
                return <div key={session.id}>
                  <Link to={`/films-detail-page?id=${session.id_movie}`} className="time-name transition">{session.time.slice(0, 5)}{"  "}{session.name_zhtw}</Link>
                </div>;
              }
            })}
          </div>
        </div>
      </section>;
  }
}

export default Time;
