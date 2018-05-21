import React, { Component } from 'react';
import '../sass/page.scss';
import logo1 from '../images/logo1.svg';
import logo2 from '../images/logo2.svg';
import ticket from '../images/ticket2.svg';
import member from '../images/member2.svg';
import calendar from '../images/calendar.svg';
import fastTicket from '../images/fast-ticket.svg';

class Header extends Component {

    // constructor(props){
    //     super(props);
    //     this.state ={
    //         header: "big"
    //     }
    // }

    componentDidMount(){
        document.addEventListener("DOMContentLoaded", function scrollDetection (event) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", function () {
                let scrollTop = document.documentElement.scrollTop;
                const header = document.querySelector('header');
                const logoImg = document.querySelector('.logo').children;
                // let logo = "logo1";
                
                if (scrollTop > lastScrollTop) {
                    header.classList.add('small-header');
                    // logo = "logo2";
                    logoImg[0].setAttribute('src', '{logo1}');
                } else {
                    header.classList.remove('small-header');
                    // logo = "logo1";
                    logoImg[0].setAttribute('src', '{logo2}');
                }
                lastScrollTop = scrollTop;
            })
        });
    }
    
    render() {
        return(
        <header className="logo">
            <div class="logo">
                <img src={logo1} alt="" className="" />
            </div>
            <ul className="menu-text transition">
                <li><a href="">節目資訊</a></li>
                <li><a href="">影展資訊</a></li>
                <li><a href="">最新消息</a></li>
                <li><a href="">電影賞析</a></li>
            </ul>
            <div className="nav-icon web">
                <img className="transition" src={ticket} alt="" />
                <img  className="transition" src={member} alt="" />
                <div className="menu-icon transition">
                    <div className="line-1 no-animation transition"></div>
                    <div className="line-2 no-animation transition"></div>
                    <div className="line-3 no-animation transition"></div>
                </div>
            </div>
            <div className="nav-icon mobile">
                <div className="icon">
                    <img src={calendar} alt="" />
                    <img className="transition" src={ticket} alt="" />
                    <img src={fastTicket} alt="" />
                    <img className="transition" src={member} alt="" />
                    <div className="menu-icon transition">
                        <div className="line-1 no-animation transition"></div>
                        <div className="line-2 no-animation transition"></div>
                        <div className="line-3 no-animation transition"></div>
                    </div>
                </div>
                <ul className="text">
                    <li><a href="">場次表</a></li>
                    <li><a href="">我的票夾</a></li>
                    <li><a href="">快速購票</a></li>
                    <li><a href="">會員登入</a></li>
                    <li><a href="">主選單</a></li>
                </ul>
            </div>
        </header>
        );
    }
}

export default Header;
