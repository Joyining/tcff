import React, { Component } from 'react';
import '../sass/page.scss';
import fastTicket from '../images/ticket_fast03.png';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class FastTicket extends Component {
    constructor(props){
        super(props);
        this.menuClose = this.menuClose.bind(this);
    }

    menuClose(){
        const menuWrap = document.querySelector(".menu-wrap");
        const body = document.querySelector("body");
        const menuIcons = document.querySelectorAll(".menu-icon");
        menuWrap.classList.remove('active');
        body.classList.remove('overflow-hidden');
        Array.from(menuIcons).forEach(menuIcon => {
            menuIcon.classList.remove("active");
        });
    }

    render() {
        return(
            <div className="fast-ticket">
                <Link to="/my-film" onClick={this.menuClose}><img src={fastTicket} alt="" /></Link>
            </div>
        );
    }
}

export default FastTicket;
