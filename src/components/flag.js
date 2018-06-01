import React, { Component } from 'react';
import '../sass/flag.scss';

class Flag extends Component {
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
    return <div className="flag-wrap">
        <div className="line-long" />
        <div className="flag-inner-wrap">
          <div className="line-short" />
          <div className="circle" />
          <div className="flag">{this.props.flagType}</div>
        </div>
      </div>;
  }
}

export default Flag;
