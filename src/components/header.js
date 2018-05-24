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

class Header extends Component {

    componentDidMount(){
        document.addEventListener("DOMContentLoaded", function scrollDetection (event) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", function () {
                let scrollTop = document.documentElement.scrollTop;
                const header = document.querySelector('header');
                const logoImg = document.querySelector('.logo').children;
                
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

            // const panel = document.querySelector(".panel");


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
            }
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
        return(
        <header>
            <div className="logo">
                <img src={logo1} alt="" className="" />
            </div>
            <ul className="nav-text transition">
                <li className="nav-text-li transition">
                    <a href="">節目資訊</a>
                    <ul className="panel transition">
                        <li><a className="transition" href="">確認放映</a></li>
                        <li><a className="transition" href="">募資影片</a></li>
                        <li><a className="transition" href="">場次表</a></li>
                    </ul>
                </li>
                <li className="nav-text-li transition">
                    <a href="">影展資訊</a>
                    <ul className="panel transition">
                        <li><a className="transition" href="">關於影展</a></li>
                        <li><a className="transition" href="">場地資訊</a></li>
                        <li><a className="transition" href="">售票資訊</a></li>
                        <li><a className="transition" href="">購票Q&A</a></li>
                    </ul>
                </li>
                <li className="nav-text-li transition"><a href="">最新消息</a></li>
                <li className="nav-text-li transition"><a href="">電影賞析</a></li>
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
                                <li><a className="transition" href="">確認放映</a></li>
                                <li><a className="transition" href="">募資影片</a></li>
                                <li><a className="transition" href="">場次表</a></li>
                            </ul>
                        </li>
                        <li>
                            <a className="transition">影展資訊</a>
                            <ul className="panel transition" data-device='tablet'>
                                <li><a className="transition" href="">關於影展</a></li>
                                <li><a className="transition" href="">場地資訊</a></li>
                                <li><a className="transition" href="">售票資訊</a></li>
                                <li><a className="transition" href="">購票Q&A</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="" className="transition">最新消息</a>

                        </li>
                        <li>
                            <a href="" className="transition">電影賞析</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        );
    }
}

export default Header;
