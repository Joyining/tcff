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
      currentDate:'',
      currentDay:'',
      uniqueDate:[],
    };
    this.nextDate = this.nextDate.bind(this); 
    this.nextDate2 = this.nextDate2.bind(this); 
    this.createUniqueDate = this.createUniqueDate.bind(this);
    // this.datePick = this.datePick.bind(this);
    this.findCurrentDay = this.findCurrentDay.bind(this);
  }

  createUniqueDate(){
    // console.log("createUniqueDate");
    let dateArr = [];
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    this.state.data.map(session =>{
      // dateArr.push(`${session.date.slice(5, 10).replace('-', '/')} ${session.day}`);
      dateArr.push(`${session.date} ${session.day}`);
    })
    let uniqueDateArr = dateArr.filter(onlyUnique);
    this.setState({
      uniqueDate: uniqueDateArr,
      currentDate: uniqueDateArr[0]
    })
    console.log(this.state.uniqueDate.slice(0,10));
  }

  datePick(date){
    let currentDate = `2018-${date.replace('/', '-')}`;
    this.setState({
      currentDate: currentDate,
    })
    // console.log(currentDate);
    // console.log(this.state.currentDate);
  }

  nextDate(){
    let currentDateStr = this.state.currentDate.slice(8,10);
    let currentDateNum;
    let currentDate;
    // let currentDayIdx = this.state.currentDayIdx;

    if (currentDateStr[0] == '0' && currentDateStr[1] !== '9'){
      currentDateNum = (parseInt(currentDateStr.slice(1,2)))%14+1;
      currentDate = `2018-07-0${currentDateNum}`;
      
    }else{
      currentDateNum = (parseInt(currentDateStr))%14+1;
      currentDateNum == 1 ? (currentDate = `2018-07-0${currentDateNum}`) : (currentDate = `2018-07-${currentDateNum}`);
    }
    // currentDayIdx = (currentDayIdx + 1) % 7;
    // console.log(this.state.currentDate.slice(8, 10));
    // console.log(currentDateNum);

    this.setState({
      currentDate: currentDate,
      // currentDayIdx: currentDayIdx,
    });
  }

  nextDate2(){
    console.log(this.state.uniqueDate);
    
  }

  findCurrentDay() {
    let currentDateStrAll = this.state.currentDate;
    let currentDay = new Date(currentDateStrAll).getDay();
    let currentDayStr;
    console.log(currentDay);
    switch (currentDay) {
      case 0:
        currentDayStr = "Sun"
        break;
      case 1:
        currentDayStr = "Mon"
        break;
      case 2:
        currentDayStr = "Tue"
        break;
      case 3:
        currentDayStr = "Wed"
        break;
      case 4:
        currentDayStr = "Thu"
        break;
      case 5:
        currentDayStr = "Fri"
        break;
      case 6:
        currentDayStr = "Sat"
        break;
    }
    this.setState({
      currentDay: currentDayStr,
    })
    console.log(this.state.currentDay);
  }
  
  componentWillMount() {
    fetch("http://192.168.39.110/tcff_php/api/movie/session.php")
      .then(res => res.json())
      .then(sessions => {
        this.setState({ data: sessions });
      });
    window.addEventListener("load", this.createUniqueDate, false);
    window.addEventListener("load", this.findCurrentDay, false);
    window.addEventListener("load", this.findCurrentDay, false);
  }

  componentDidMount(){
    // console.log("state: ", this.state.data);
    // window.addEventListener("load", this.createUniqueDate, false);
  }

  render() {
    return <section className="container-time">
        <div className="date-pick-wrap">
          {this.state.uniqueDate.map(date=>{
          return <div className="date-picker" key={date.id} onClick={this.datePick.bind(this, date)}>
              {date}
            </div>;
          })}
        </div>

        <div className="calendar">
          <div className="cal cal-left" onClick={this.nextDate2}>
            <div className="cal-heading">誠品電影院</div>
            <div className="year">{this.state.currentDate.slice(0, 4)}</div>
            <div className="date">{this.state.currentDate.slice(5, 10).replace('-', '/')}</div>

            <div className="day"></div>

            {this.state.data.map(session => {
            // console.log(this.state.currentDate)
              if (session.date == this.state.currentDate && session.auditorium == "誠品電影院") {
                return <div key={session.id}>
                  <Link to="/" className="time-name transition">{session.time.slice(0, 5)}{"  "}{session.name_zhtw}</Link>
                </div>;
              }
            })}
          </div>
          <div className="cal cal-right" onClick={this.nextDate2}>
            <div className="cal-heading">台北光點</div>
            <div className="year">{this.state.currentDate.slice(0, 4)}</div>
            <div className="date">{this.state.currentDate.slice(5, 10).replace('-', '/')}</div>
            <div className="day">{this.state.currentDay}</div>
            {this.state.data.map(session => {
              if (session.date == this.state.currentDate && session.auditorium == "台北光點") {
                return <div key={session.id}>
                  <Link to="/" className="time-name transition">{session.time.slice(0, 5)}{"  "}{session.name_zhtw}</Link>
                  </div>;
              }
            })}
          </div>
        </div>
      </section>;
  }
}

export default Time;
