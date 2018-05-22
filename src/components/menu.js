import React, { Component } from 'react';
// import Header from "./header";
import '../sass/menu.scss';
import menuBgImg01 from "../images/2001_a_space_odyssey_01.jpg";
import menuBgImg02 from "../images/2001_a_space_odyssey_02.jpg";
import menuBgImg03 from "../images/2001_a_space_odyssey_03.jpg";
import menuBgImg04 from "../images/2001_a_space_odyssey_04.jpg";
import menuBgImg05 from "../images/breakfast_at_tiffany's_01.jpg";
import menuBgImg06 from "../images/breakfast_at_tiffany's_02.jpg";

class Menu extends Component {

    componentDidMount(){

    }
    
    render() {
        return (
            <div className="menu-wrap">
            {/* <Header /> */}
            <div className="menu-bg transition">
              <div className="menu-bg-row1 transition">
                <figure>
                  <img src={menuBgImg01} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg02} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg03} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg04} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg05} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg06} alt="" />
                </figure>
              </div>
              <div className="menu-bg-row2 transition">
                <figure>
                  <img src={menuBgImg01} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg02} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg03} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg04} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg05} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg06} alt="" />
                </figure>
              </div>
              <div className="menu-bg-row3 transition">
                <figure>
                  <img src={menuBgImg01} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg02} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg03} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg04} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg05} alt="" />
                </figure>
                <figure>
                  <img src={menuBgImg06} alt="" />
                </figure>
              </div>
            </div>
            <div className="menu">
                <ul className="menu-btn">
                    <li>
                    <a href="" className="active">最新消息</a>
                    </li>
                    <li>
                    <a href="">影展資訊</a>
                    </li>
                    <li>
                    <a href="">節目介紹</a>
                    </li>
                    <li>
                    <a href="">電影賞析</a>
                    </li>
              </ul>
            </div>
          </div>)
    }
}

export default Menu;
