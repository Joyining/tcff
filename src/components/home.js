import React, { Component } from 'react';
import Flag from './flag';
import '../sass/home.scss';

import Home02Img01 from "../images/Home02Img01.jpg";
import Home02Img02 from "../images/Home02Img02.jpg";
import Home02Img03 from "../images/Home02Img03.jpg";
import Home02Img04 from "../images/Home02Img04.jpg";
import Home02Img05 from "../images/Home02Img05.jpg";
import Home02Img06 from "../images/Home02Img06.jpg";
import Home02Img07 from "../images/Home02Img07.jpg";
import Home02Img08 from "../images/Home02Img08.jpg";
import Home02Img09 from "../images/Home02Img09.jpg";
import Home02Img10 from "../images/Home02Img10.jpg";

import Home02Poster01 from "../images/Home02Poster01.jpg";
import Home02Poster02 from "../images/Home02Poster02.jpg";
import Home02Poster03 from "../images/Home02Poster03.jpg";
import Home02Poster04 from "../images/Home02Poster04.jpg";
import Home02Poster05 from "../images/Home02Poster05.jpg";
import Home02Poster06 from "../images/Home02Poster06.jpg";
import Home02Poster07 from "../images/Home02Poster07.jpg";
import Home02Poster08 from "../images/Home02Poster08.jpg";
import Home02Poster09 from "../images/Home02Poster09.jpg";


class Home extends Component {
  componentDidMount(){
    document.addEventListener("DOMContentLoaded", function scrollDetection(event){
      window.addEventListener("scroll", function (){
        let scrollTop = document.documentElement.scrollTop;
        const home02 = document.querySelector('.home02');
        const slogons = document.querySelectorAll('.slogon');
        if (scrollTop > (home02.offsetTop-800)) {
          // console.log(scrollTop);
          // console.log(home02.offsetTop);
          Array.from(slogons).forEach(slogon=>{
            slogon.classList.add("animate");
          })
        } else if (scrollTop < (home02.offsetTop - 1200)){
          Array.from(slogons).forEach(slogon => {
            slogon.classList.remove("animate");
          })
        }
      })
    })

    let mousePosition = ()=>{
      let lastMouseX;
      let lastMouseY;
      window.addEventListener('mousemove', function(evt){
        let mouseXdiff = lastMouseX - evt.clientX;
        let mouseYdiff = lastMouseY - evt.clientY;
        lastMouseX = evt.clientX;
        lastMouseY = evt.clientY;
        const inside = document.querySelector('.inside');
        // setInterval(function(){
        //   inside.style.transform = `rotateX(${mouseXdiff}deg)`;
        //   inside.style.transform = `rotateY(${mouseYdiff}deg)`;
        //   if (mouseYdiff > 0) {
        //     console.log('up');
        //   } else {
        //     console.log('down');
        //   }
        //   if (mouseXdiff > 0) {
        //     console.log('left');
        //   } else {
        //     console.log('right');
        //   }
        // }, 1000)
        let insideRotate = ()=>{
          inside.style.transform = `rotateX(${mouseXdiff}deg)`;
          inside.style.transform = `rotateY(${mouseYdiff}deg)`;
          if (mouseYdiff > 0) {
            console.log('up');
          } else {
            console.log('down');
          }
          if (mouseXdiff > 0) {
            console.log('left');
          } else {
            console.log('right');
          }
        }
        insideRotate();
        console.log(mouseXdiff);
        console.log(mouseYdiff);
      })
    }
    // mousePosition();

    // let slideMove =()=>{
    //   let slideMove = 100;
    //   setInterval(function () {
    //     const slide = document.querySelector('.slide');
    //     slide.style.left = `${-slideMove}px`;
    //     slideMove += 100;
    //   }, 500)
    // }
    // slideMove();

    let titleText = ()=>{
      const movies = [
        { title: "2002 無間道", quote: '"我想做好人"' },
        { title: "1967 畢業生", quote: '"羅賓遜夫人，你想勾引我？"' },
        { title: "1975 計程車司機", quote: '"你在對我說話嗎"'},
        { title: "1993 侏儸記公園", quote: '"生命自會找到出口"' },
        { title: "1972 教父", quote: '"我會開出一個他無法拒絕的條件"' },
        { title: "1982 E.T外星人", quote: '"E.T. phone home."' },
        { title: "1961 第凡內早餐", quote: '"天空適合仰望，不適合居住"' },
        { title: "1973 星際大戰", quote: '"願原力與你同在"' },
        { title: "1985 回到未來", quote: '"路？我們要去的地方不需要路"' },
        { title: "2008 黑暗騎士", quote: '"Why so serious？"' }
      ];
      const titleText = document.querySelector('.title');
      titleText.innerHTML = `${movies[0].title}`;
      const quoteText = document.querySelector(".quote");
      quoteText.innerHTML = `${movies[0].quote}`;
      const slideLength = movies.length;
      let i=1;
      const inners = document.querySelectorAll('.inner');
      setTimeout(() => {
        titleText.innerHTML = `${movies[i % slideLength].title}`;
        quoteText.innerHTML = `${movies[i % slideLength].quote}`;
        i++;
      }, 1500);
      setTimeout(() => {
        setInterval(function () {
          titleText.innerHTML = `${movies[i % slideLength].title}`;
          quoteText.innerHTML = `${movies[i % slideLength].quote}`;
          i++;
        }, 3000)
      }, 1400);
    }
    titleText();


  }
  render() {
    return <section className="container">
        <div className="home01"> </div>
        <div className="home02">
        < Flag />
          <div className="text-wrap">
            <div className="slogon">
              <div>
                <span>經</span>
                <span>典</span>
                <span>倒</span>
                <span>帶</span>
              </div>
              <div>
                <span>復</span>
                <span>古</span>
                <span>最</span>
                <span>摩</span>
                <span>登</span>
              </div>
            </div>
            <div className="content">
              <p>台北經典影展用熟悉的對白和配樂，回放你的人生底片</p>
              <p>橫跨四十年，影史必看作品，六十四部數位修復老電影</p>
              <p>經典永遠流行</p>
            </div>
          </div>
          <div className="home02-screen-wrap">
            <div className="bg-image">
              <img src={Home02Img01} alt="" />
              <img src={Home02Img02} alt="" />
              <img src={Home02Img03} alt="" />
              <img src={Home02Img04} alt="" />
              <img src={Home02Img05} alt="" />
              <img src={Home02Img06} alt="" />
              <img src={Home02Img07} alt="" />
              <img src={Home02Img08} alt="" />
              <img src={Home02Img09} alt="" />
              <img src={Home02Img10} alt="" />
            </div>
            <div className="inside">
              <div className="image">
                <div className="slide transition">
                  <img src={Home02Img01} alt="" />
                  <img src={Home02Img02} alt="" />
                  <img src={Home02Img03} alt="" />
                  <img src={Home02Img04} alt="" />
                  <img src={Home02Img05} alt="" />
                  <img src={Home02Img06} alt="" />
                  <img src={Home02Img07} alt="" />
                  <img src={Home02Img08} alt="" />
                  <img src={Home02Img09} alt="" />
                  <img src={Home02Img10} alt="" />
                </div>
              </div>
              <div className="title-wrap">
                <div className="inner">
                  <div className="title bg-1 title-text transition"></div>
                  <div className="title bg-2 transition" />
                </div>
              </div>
              <div className="quote-wrap">
                <div className="inner">
                <div className="quote bg-1 quote-text transition"></div>
                  <div className="quote bg-2 transition" />
                </div>
              </div>
            </div>
          </div>
          <div className="poster-wrap transition">
            <img src={Home02Poster01} alt="" />
            <img src={Home02Poster02} alt="" />
            <img src={Home02Poster03} alt="" />
            <img src={Home02Poster04} alt="" />
            <img src={Home02Poster05} alt="" />
            <img src={Home02Poster06} alt="" />
            <img src={Home02Poster07} alt="" />
            <img src={Home02Poster08} alt="" />
            <img src={Home02Poster09} alt="" />
          </div>
          <div className="poster-more transition"><a className="transition" href="">更多確認放映影片</a></div>
        </div>
        <div className="home03">
          < Flag />
          <div className="text-wrap">
            <div className="slogon">
              <div>
                <span>沒</span>
                <span>有</span>
                <span>遺</span>
                <span>珠</span>
                <span>之</span>
                <span>憾</span>
              </div>
            </div>
            <div className="content">
              <p>四十年太長，十四天太短</p>
              <p>還有好多想看的經典作品不在確認放映清單裡嗎？</p>
              <p>參加募資，由你決定哪些經典老片可以強勢回歸大螢幕!</p>
            </div>
          </div>
          <div className="cube-wrap">
            <div className="cube">
              <div className="side front">1</div>
              <div className="side back">2</div>
              <div className="side right">3</div>
              <div className="side left">4</div>
              <div className="side top">5</div>
              <div className="side bottom">6</div>
            </div>
          </div>
        </div>
      </section>;
  }
}

export default Home;
