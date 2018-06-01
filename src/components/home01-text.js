import React, { Component } from 'react';
import '../sass/home01-text.scss';
import logoSmall from "../images/logo-small.svg";

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from "react-router-dom";

class Home01Text extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return <Link to="/films" className="carousel_cell transition text-box">
          <div className="year">{this.props.home01Slide.year}</div>
          <div className="name">{this.props.home01Slide.name}</div>
          <div className="award">{ this.props.home01Slide.award }</div >
          <div className="logo-time">
            <div className="logo">
              <img src={logoSmall} alt="" className="" />
            </div>
              <div className="time">{this.props.home01Slide.time}</div>
          </div>
        </Link>;
  }
}

export default Home01Text;
