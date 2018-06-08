import React, { Component } from 'react';
import '../sass/time.scss';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from "react-router-dom";

class TimeSwtich extends Component {
  constructor(props) {
    super(props);
    this.scrollDetection = this.scrollDetection.bind(this);
  }
    scrollDetection(event) {
        let lastScrollTop = 0;
        let scrollTop = document.documentElement.scrollTop;
    };

  componentDidMount() {
    window.addEventListener('scroll', this.scrollDetection, false);
  }

  render() {
    return <Link to={this.props.switchUrl} className="time-switch transition">{this.props.switch}
    </Link>;
  }
}

export default TimeSwtich;
