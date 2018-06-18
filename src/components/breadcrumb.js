import React, { Component } from 'react';
import '../sass/breadcrumb.scss';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from "react-router-dom";
// import { wrap } from 'module';

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
  }


render() {
    return (
        <div className="breadcrumb-wrap">
            {this.props.currentBreadcrumbName.map(el => {
                return <Link to={this.props.currentBreadcrumbPath[this.props.currentBreadcrumbName.indexOf(el)]} key={el}>{el}</Link>;
            })}
        </div>
    );
  }
}

export default Breadcrumb;
