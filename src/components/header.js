import React, { Component } from 'react';

import '../sass/page.scss';
import logo1 from '../images/logo1.svg';
import logo2 from '../images/logo2.svg';
import ticket from '../images/ticket2.svg';
import member from '../images/member2.svg';
import calendar from '../images/calendar.svg';
import fastTicket from '../images/fast-ticket.svg';

import menuBgImg01 from "../images/2001_a_space_odyssey_01.jpg";
import menuBgImg02 from "../images/2001_a_space_odyssey_02.jpg";
import menuBgImg03 from "../images/2001_a_space_odyssey_03.jpg";
import menuBgImg04 from "../images/2001_a_space_odyssey_04.jpg";
import menuBgImg05 from "../images/breakfast_at_tiffany's_01.jpg";
import menuBgImg06 from "../images/breakfast_at_tiffany's_02.jpg";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  withRouter
} from "react-router-dom";

class Header extends Component {

    constructor(props){
        super(props);
        this.menuClose = this.menuClose.bind(this);
        this.openMember=this.openMember.bind(this);
        this.closeMember = this.closeMember.bind(this);
        this.logout = this.logout.bind(this);
        }

    // updatecollectionNum() {
    //     this.setState({ 
    //         collectionNum: localStorage.getItem("collectionsNum") });
    // }

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

    openMember(){
        const memberPanel = document.querySelector('.member-panel');
        memberPanel.classList.add('active');
    }

    closeMember() {
        const memberPanel = document.querySelector('.member-panel');
        memberPanel.classList.remove('active');
    }

    logout(){
        sessionStorage.clear("user");
        const memberPanel = document.querySelector('.member-panel');
        memberPanel.classList.remove('active');
        this.props.history.push("/member");
    }

    componentDidMount(){
        if(this.props.loginStatus==true){
            console.log('login true');
            let memberIcon = document.querySelector('#member');
            memberIcon.style.display="none";

        }else{
            console.log("login false");
            let nickname = document.querySelector("#nickname");
            nickname.style.display = "none";
        }


        document.addEventListener("DOMContentLoaded", function scrollDetection (event) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", function () {
                let scrollTop = document.documentElement.scrollTop;
                const header = document.querySelector('header');
                const logoImg = document.querySelector('#logo').children;
                
                if (scrollTop > lastScrollTop) {
                    header.classList.add('small-header');
                    logoImg[0].setAttribute('src', logo2);
                } else {
                    header.classList.remove('small-header');
                    logoImg[0].setAttribute('src', logo1);
                }
                lastScrollTop = scrollTop;
            })
        });

        let menuClick = ()=>{
            const menuIcons = document.querySelectorAll(".menu-icon");
            // console.log(menuIcons);
            const menuWrap = document.querySelector(".menu-wrap");
            const body = document.querySelector("body");
            
            Array.from(menuIcons).forEach(menuIcon => {
                menuIcon.addEventListener("click", function(event) {
                    // console.log(this);
                    menuWrap.classList.toggle('active');
                    body.classList.toggle('overflow-hidden');
                    Array.from(menuIcons).forEach(menuIcon => {
                        menuIcon.classList.toggle("active");
                    });
                });
            });
        }
        menuClick();

        let menuDetect = () => {
            const menuBtn = document.querySelector('.menu-btn').children;
            let lastPosition = -1;
            const menuBgRow1 = document.querySelector('.menu-bg-row1');
            const menuBgRow2 = document.querySelector('.menu-bg-row2');
            const menuBgRow3 = document.querySelector('.menu-bg-row3');

            const slideWidth = 900;

            let initLeftRow1 = parseInt(window
                .getComputedStyle(menuBgRow1, null)
                .getPropertyValue("left")
                .replace("px", ""));
            let initTopRow1 = parseInt(window
                .getComputedStyle(menuBgRow1, null)
                .getPropertyValue("top")
                .replace("px", ""));

            let initLeftRow2 = parseInt(window
                .getComputedStyle(menuBgRow2, null)
                .getPropertyValue("left")
                .replace("px", ""));
            let initTopRow2 = parseInt(window
                .getComputedStyle(menuBgRow2, null)
                .getPropertyValue("top")
                .replace("px", ""));

            let initLeftRow3 = parseInt(window
                .getComputedStyle(menuBgRow3, null)
                .getPropertyValue("left")
                .replace("px", ""));

            let initTopRow3 = parseInt(window
                .getComputedStyle(menuBgRow3, null)
                .getPropertyValue("top")
                .replace("px", ""));

            for (let i = 0; i < menuBtn.length; i++) {
                menuBtn[i].addEventListener('mouseover', function () {
                    let positionDiff = lastPosition - i;
                    lastPosition = i;

                    let newLeftRow1 = initLeftRow1 - positionDiff * slideWidth;
                    let newLeftRow2 = initLeftRow2 + positionDiff * slideWidth;
                    let newLeftRow3 = initLeftRow3 - positionDiff * slideWidth;

                    menuBgRow2.style.left = `${newLeftRow2}px`;
                    initLeftRow2 = newLeftRow2;

                    menuBgRow1.style.left = `${newLeftRow1}px`;
                    initLeftRow1 = newLeftRow1;

                    menuBgRow3.style.left = `${newLeftRow3}px`;
                    initLeftRow3 = newLeftRow3;

                    let menuSiblings = this.parentNode.children;
                    for(let i=0; i< menuSiblings.length; i++){
                        menuSiblings[i].classList.remove('active');
                        menuSiblings[i].lastChild.classList.remove("active");
                    }
                    this.classList.add('active');
                    this.lastChild.classList.add('active');
                    // console.log(this.children);
                })
                menuBtn[i].addEventListener('mouseout', function (){
                    this.classList.remove("active");
                    this.lastChild.classList.remove("active");
                })
            }

            // for (let i = 0; i < menuBtn.length; i++) {
            //     menuBtn[i].addEventListener('click', function () {
            //         const menuWrap = document.querySelector(".menu-wrap");

            //     })
        }
        menuDetect();

        let menuExpand = ()=>{
            const menuBtn = document.querySelector(".menu-btn").children;
            for (let i = 0; i < menuBtn.length; i++){
                menuBtn[i].addEventListener(
                  "click",
                  function() {  
                    let menuSiblings = this.parentNode.children;
                    for (let i = 0; i < menuSiblings.length; i++) {
                        menuSiblings[i].classList.remove('active');
                    }
                    this.classList.add('active');

                    if (this.lastChild.style.maxHeight) {
                        this.lastChild.style.maxHeight = null;
                    } else {
                        this.lastChild.style.maxHeight = this.lastChild.scrollHeight + "px";
                    }
                    }
                );
            }
        }
        menuExpand();

        let navTextExpand=()=>{
            const navTexts = document.querySelectorAll(".nav-text-li");
            Array.from(navTexts).forEach(navText => {
                navText.addEventListener("mouseover", function(event) {
                    let navTextSiblings = this.parentNode.children;
                    for (let i = 0; i < navTextSiblings.length; i++) {
                        navTextSiblings[i].lastChild.classList.remove("active");
                    }
                    navText.lastChild.classList.add('active');
                });
              });
            Array.from(navTexts).forEach(navText => {
                navText.addEventListener("mouseout", function (event) {
                    navText.lastChild.classList.remove('active');
                });
            });
        }
        navTextExpand();
    }
    
    render() {
        return (
        <header>
            <div className="logo">
                <Link id="logo" to="/"><img src={logo1} alt="" className="" /></Link>
            </div>
            <ul className="nav-text transition">
                <li className="nav-text-li transition">
                    <a href="" className="transition">節目資訊</a>
                    <ul className="panel transition">
                        <li><Link to="/films" className="transition">確認放映</Link></li>
                        <li><Link to="/cf-films" className="transition">募資影片</Link></li>
                        <li><Link to="/time" className="transition">場次表</Link></li>
                    </ul>
                </li>
                <li className="nav-text-li transition">
                    <a href="" className="transition">影展資訊</a>
                    <ul className="panel transition">
                        <li><Link to="/info" className="transition">關於影展</Link></li>
                        <li><Link to="/info" className="transition">場地資訊</Link></li>
                        <li><Link to="/info" className="transition">售票資訊</Link></li>
                        <li><Link to="/info" className="transition">購票Q&A</Link></li>
                    </ul>
                </li>
                <li className="nav-text-li transition"><Link to="/news" className="transition">最新消息</Link></li>
                <li className="nav-text-li transition"><Link to="/article" className="transition">電影賞析</Link></li>
            </ul>
            <div className="nav-icon web">
                <Link to="/my-film/1" onClick={this.menuClose}><img className="transition" src={ticket} alt="" /><div className="collection-num">{this.props.collectionNum}</div></Link>
                
                <a id="nickname" onMouseOver={this.openMember} onMouseOut={this.closeMember}>{this.props.login}</a>
                <ul className="member-panel transition" onMouseOver={this.openMember} onMouseOut={this.closeMember}>
                    <li><Link to="/" className="transition">查詢訂票紀錄</Link></li>
                    <li><Link to="/" className="transition">修改會員資料</Link></li>
                    <li><a className="transition" onClick={this.logout}>登出</a></li>
                </ul>
                <Link to="/member" id="member" onClick={this.menuClose}><img  className="transition" src={member} alt="" /></Link>

                <div className="menu-icon transition">
                    <div className="line-1 no-animation transition"></div>
                    <div className="line-2 no-animation transition"></div>
                    <div className="line-3 no-animation transition"></div>
                </div>
            </div>
            <div className="nav-icon mobile">
                <div className="icon">
                    <Link to="/time" onClick={this.menuClose}><img src={calendar} alt="" /></Link>
                    <Link to="/my-film/1" onClick={this.menuClose}><img className="transition" src={ticket} alt="" /></Link>
                    <Link to="/my-film/1" onClick={this.menuClose}><img src={fastTicket} alt="" /></Link>
                    <Link to="/member" onClick={this.menuClose}><img className="transition" src={member} alt="" /></Link>
                    <div className="menu-icon transition">
                        <div className="line-1 no-animation transition"></div>
                        <div className="line-2 no-animation transition"></div>
                        <div className="line-3 no-animation transition"></div>
                    </div>
                </div>
                <ul className="text">
                    <li><Link to="/time" onClick={this.menuClose}>場次表</Link></li>
                    <li><Link to="/my-film/1" onClick={this.menuClose}>我的票夾</Link></li>
                    <li><Link to="/my-film/1" onClick={this.menuClose}>快速購票</Link></li>
                    <li><Link to="/member" onClick={this.menuClose}>會員登入</Link></li>
                    <li><a href="">主選單</a></li>
                </ul>
            </div>
            <div className="menu-wrap transition">
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
                        <li className="active">
                            <a className="transition">節目資訊</a>
                            <ul className="panel transition" data-device='tablet'>
                                <li><Link to="/films" className="transition" onClick={this.menuClose}>確認放映</Link></li>
                                <li><Link to="/cf-films" className="transition" onClick={this.menuClose}>募資影片</Link></li>
                                <li><Link to="/time" className="transition" onClick={this.menuClose}>場次表</Link></li>
                            </ul>
                        </li>
                        <li>
                            <a className="transition">影展資訊</a>
                            <ul className="panel transition" data-device='tablet'>
                                <li><Link to="/info" className="transition" onClick={this.menuClose}>關於影展</Link></li>
                                <li><Link to="/info" className="transition" onClick={this.menuClose}>場地資訊</Link></li>
                                <li><Link to="/info" className="transition" onClick={this.menuClose}>售票資訊</Link></li>
                                <li><Link to="/info" className="transition" onClick={this.menuClose}>購票Q&A</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/news" className="transition" onClick={this.menuClose}>最新消息</Link>

                        </li>
                        <li>
                            <Link to="/article" className="transition" onClick={this.menuClose}>電影賞析</Link>
                        </li>
                    </ul>
                </div>
            </div>

            
        </header>
         
        )
    }
}

export default withRouter(Header);
