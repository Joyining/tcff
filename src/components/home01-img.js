import React, { Component } from 'react';
import '../sass/home01-img.scss';

import Home01Img01 from "../images/Home01Img01.jpg";
// import Home01Img02 from "../images/Home01Img02.jpg";
// import Home01Img03 from "../images/Home01Img03.jpg";
// import Home01Img04 from "../images/Home01Img04.jpg";
// import Home01Img05 from "../images/Home01Img05.jpg";
// import Home01Img06 from "../images/Home01Img06.jpg";
// import Home01Img07 from "../images/Home01Img07.jpg";
// import Home01Img08 from "../images/Home01Img08.jpg";
// import Home01Img09 from "../images/Home01Img09.jpg";
// import Home01Img10 from "../images/Home01Img10.jpg";
// import Home01Img11 from "../images/Home01Img11.jpg";
// import Home01Img12 from "../images/Home01Img12.jpg";

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from "react-router-dom";

class Home01Img extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const imageUrl = this.props.home01Slide;

      return 
          <Link to="/films" className="carousel_cell transition">
            {/* <img src={this.props.home01Slide} alt="" /> */}
            {/* <img src={`data:image/jpg;base64,${this.props.home01Slide}`} /> */}
            <img src={imageUrl.img} alt="" />
          </Link>;
  }
}

export default Home01Img;
