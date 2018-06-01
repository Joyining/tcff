import React, { Component } from 'react';
import Flag from './flag';
import Home01Text from "./home01-text";
import Home01Img from "./home01-img";
import '../sass/home.scss';

import Home01Img01 from "../images/Home01Img01.jpg";
import Home01Img02 from "../images/Home01Img02.jpg";
import Home01Img03 from "../images/Home01Img03.jpg";
import Home01Img04 from "../images/Home01Img04.jpg";
import Home01Img05 from "../images/Home01Img05.jpg";
import Home01Img06 from "../images/Home01Img06.jpg";
import Home01Img07 from "../images/Home01Img07.jpg";
import Home01Img08 from "../images/Home01Img08.jpg";
import Home01Img09 from "../images/Home01Img09.jpg";
import Home01Img10 from "../images/Home01Img10.jpg";
import Home01Img11 from "../images/Home01Img11.jpg";
import Home01Img12 from "../images/Home01Img12.jpg";

import Home02ImgAll from "../images/Home02ImgAll.jpg";
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

import Home03Poster01 from "../images/Home03Poster01.jpg";
import Home03Poster02 from "../images/Home03Poster02.jpg";
import Home03Poster03 from "../images/Home03Poster03.jpg";
import Home03Poster04 from "../images/Home03Poster04.jpg";
import Home03Poster05 from "../images/Home03Poster05.jpg";
import Home03Poster06 from "../images/Home03Poster06.jpg";
import Home03Poster07 from "../images/Home03Poster07.jpg";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";


class Home extends Component {
  constructor(props){
      super(props);
      this.scrollDetection = this.scrollDetection.bind(this);
      this.windowResize = this.windowResize.bind(this); 
      this.rotateSlide = this.rotateSlide.bind(this); 

      this.state = {
        flagType: ['確認放映', '募資中'],
        home01Slide:[
          { year: '1964', name: '007：金手指', award: '最具有重要里程碑意義的一部詹姆士龐德系列影片', time: '2018 | 07 | 14 20:30	誠品電影院', img:'Home01Img01'},
          { year: '1964', name: '窈窕淑女', award: '奧斯卡最佳影片、男主角、導演、攝影、藝術指導、服裝設計等八項大獎', time: '2018 | 07 | 08 10:00	誠品電影院' },
          { year: '1977', name: '安妮霍爾', award: '現代浪漫喜劇的典範，榮獲奧斯卡最佳影片、女主角、導演、原著劇本', time: '2018 | 07 | 12 19:30	台北光點' },
          { year: '1974', name: '異形', award: '影史上的經典科幻片，獲得第52屆奧斯卡最佳視覺效果獎，榮登AFI百年百大驚悚電影第六名', time: '2018 | 07 | 03 19:30	誠品電影院' },
          { year: '1905', name: 'xyz', award: 'uutt', time: '2018/08/09' },
          { year: '1906', name: 'pqr', award: 'uutt', time: '2018/08/10' },
          { year: '1907', name: 'pqr', award: 'uutt', time: '2018/08/10' },
          { year: '1908', name: 'abc', award: 'uutt', time: '2018/08/08' },
          { year: '1909', name: 'xyz', award: 'uutt', time: '2018/08/09' },
          { year: '1910', name: 'pqr', award: 'uutt', time: '2018/08/10' },
          { year: '1911', name: 'pqr', award: 'uutt', time: '2018/08/10' },
          { year: '1912', name: 'pqr', award: 'uutt', time: '2018/08/10' },
        ],
      }
  }

  scrollDetection(){
    let scrollTop = document.documentElement.scrollTop;
    const home02 = document.querySelector('.home02');
    const home03 = document.querySelector(".home03");
    const slogons = document.querySelectorAll('.slogon');
    const cube = document.querySelector(".cube");
    const sides = document.querySelectorAll(".side");
    const cfButton = document.querySelector(".cf-button").children;
    const cfPosters = document.querySelectorAll(".cf-poster");
    if (scrollTop > (home02.offsetTop-800)) {
        slogons[0].classList.add("animate");
    } else if (scrollTop < (home02.offsetTop - 1200)){
        slogons[0].classList.remove("animate");
    }
    if (scrollTop > (home03.offsetTop - 600)){
      slogons[1].classList.add("animate");
      cube.classList.add("animate");
      Array.from(sides).forEach(side =>{
        side.classList.add('animate');
      })
      cfButton[0].classList.add("animate");
      Array.from(cfPosters).forEach(cfPoster => {
        cfPoster.classList.add("animate");
      });
    } else if (scrollTop < (home03.offsetTop - 1200)){
      slogons[1].classList.remove("animate");
    }
  }

  windowResize(){
    if (!/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
      const container = document.querySelector('.container-home');
      // let bodyWidth = document.body.clientWidth;
      let containerWidth = container.clientWidth;
      // console.log(containerWidth);
      let eclipseWidth = containerWidth * .9;
      let posterWidth = eclipseWidth * .9;
      const eclipses = document.querySelectorAll('.cf-circle');
      const eclipse01 = document.querySelector(".cf-circle-01");
      const marginTop = parseInt(window
        .getComputedStyle(eclipse01)
        .getPropertyValue("margin-top")
        .replace("px", ""));
      const imgs = document.querySelector(".cf01").children;
      const imgHeight = imgs[0].clientHeight;
      const btnHeight = document.querySelector(".cf-button").clientHeight;
      // console.log(imgs[0]);
      // console.log(marginTop);
      // console.log(btnHeight);


      const posters = document.querySelectorAll(".cf-poster");
      Array.from(eclipses).forEach(eclipse => {
        eclipse.style.width = `${eclipseWidth}px`;
      });
      eclipses[1].style.left = `${(containerWidth - eclipseWidth) / 2}px`;
      eclipses[1].style.top = `${btnHeight + marginTop}px`;

      Array.from(posters).forEach(poster => {
        poster.style.width = `${posterWidth}px`;
      })
      let imgWidth = document.querySelector('.cf01').clientWidth;
      let positionMove = Math.tan(10 * Math.PI / 180) * imgWidth;

      const cfImgs = posters[0].children;
      cfImgs[0].style.transform = `translateY(${positionMove * 2.5}px) skewY(-10deg)`;
      cfImgs[1].style.transform = `translateY(${positionMove * 1.5}px) skewY(-10deg)`;
      cfImgs[2].style.transform = `translateY(${positionMove * .5}px)skewY(-10deg)`;
      cfImgs[4].style.transform = `translateY(${positionMove * .5}px)skewY(10deg)`;
      cfImgs[5].style.transform = `translateY(${positionMove * 1.5}px) skewY(10deg)`;
      cfImgs[6].style.transform = `translateY(${positionMove * 2.5}px) skewY(10deg)`;

      const cfBg = posters[1].children;
      cfBg[0].style.transform = `translateY(${positionMove * 2.5}px) skewY(-10deg)`;
      cfBg[1].style.transform = `translateY(${positionMove * 1.5}px) skewY(-10deg)`;
      cfBg[2].style.transform = `translateY(${positionMove * 0.5}px)skewY(-10deg)`;
      cfBg[4].style.transform = `translateY(${positionMove * 0.5}px)skewY(10deg)`;
      cfBg[5].style.transform = `translateY(${positionMove * 1.5}px) skewY(10deg)`;
      cfBg[6].style.transform = `translateY(${positionMove * 2.5}px) skewY(10deg)`;

      Array.from(posters).forEach(poster => {
        poster.style.top = `-${positionMove * .5}px`;
      })
      // eclipses[1].style.top = `${btnHeight + marginTop + imgHeight*1.5}px`;

    } else {
      // ...
    }

    
  }

  rotateSlide(){
    const container = document.querySelector('.container-home');
    // console.log(`container width: ${containerWidth}`);
    let containerWidth = container.clientWidth;
    let rotateFn, sceneWidth, sceneHeight, sceneSize;;
    if(/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)){
      rotateFn = "rotateX";
      sceneWidth = containerWidth * 0.8;
      sceneHeight = containerWidth * 0.5;
      sceneSize = sceneHeight;
    } else{
      rotateFn = "rotateY";
      sceneWidth = containerWidth * .42;
      sceneHeight = containerWidth * .3;
      sceneSize = sceneWidth;
    }
    console.log(rotateFn);

    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll('.carousel_cell');
    const slideCount = slides.length;
    const rotateDiff = 360 / slideCount;
    let rotateDeg = 0;

    const scene = document.querySelector('.scene');
    // console.log(scene);
    scene.style.width = `${sceneWidth}px`;
    scene.style.height = `${sceneHeight}px`;
    carousel.style.width = `${sceneWidth}px`;
    carousel.style.height = `${sceneHeight}px`;
    

    const radius = parseFloat(sceneSize / 2 / Math.tan(rotateDiff / 2 * Math.PI / 180));
    console.log(rotateDiff);
    console.log(radius);
    carousel.style.transform = `translateZ(-${radius}px)`;

    // if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)){
    //   alert('mobile device');
    // }

      

    Array.from(slides).forEach(slide => {
      slide.style.transform = `${rotateFn}(${rotateDeg}deg) translateZ(${radius}px)`;
      console.log(rotateDeg);
      console.log(window.getComputedStyle(slide).width);
      let rotateDeg2 = rotateDeg;
      let move = () => {  
        rotateDeg2 -= .75;
        slide.style.transform = `${rotateFn}(${rotateDeg2}deg) translateZ(${radius}px)`;
        setTimeout(move, 100);
      }
      move();
      rotateDeg += rotateDiff;
    })

    const textBoxes = document.querySelectorAll('.text-box');
    let showTextBox = ()=>{
      for (let i = 0; i < textBoxes.length; i++) {
        setTimeout(function () {
          textBoxes[i].classList.add("animate");
        }, i * 4000, i);
      }
      // setTimeout(showTextBox, 48000); 
    }
    showTextBox();

  }


  
  componentDidMount(){
    // console.log('home mount');
    window.addEventListener('scroll', this.scrollDetection, false);
    window.addEventListener("load", this.windowResize, false);
    window.addEventListener("resize", this.windowResize, false);
    window.addEventListener("load", this.rotateSlide, false);
    window.addEventListener("resize", this.rotateSlide, false);

    let mousePosition = ()=>{
      let lastMouseX;
      let lastMouseY;
      window.addEventListener('mousemove', function(evt){
        let mouseXdiff = lastMouseX - evt.clientX;
        let mouseYdiff = lastMouseY - evt.clientY;
        lastMouseX = evt.clientX;
        lastMouseY = evt.clientY;
        const inside = document.querySelector('.inside');
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
    titleText()

    console.log(this.state);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollDetection, false);
    window.removeEventListener("load", this.windowResize, false);
    window.removeEventListener("resize", this.windowResize, false);
    window.removeEventListener("load", this.rotateSlide, false);
    window.removeEventListener("resize", this.rotateSlide, false);
  }
  

  render() {
    return <div className="home-outer-wrap">
        <div className="home01">
          <div className="scene">
            <div className="carousel">
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img01} alt="" />
              </Link>
              {/* <Home01Img home01Slide={this.state.home01Slide[0]} /> */}
              <Home01Text home01Slide={this.state.home01Slide[0]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img02} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[1]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img03} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[2]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img04} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[3]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img05} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[4]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img06} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[5]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img07} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[6]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img08} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[7]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img09} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[8]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img10} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[9]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img11} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[10]} />
              <Link to="/films" className="carousel_cell transition">
                <img src={Home01Img12} alt="" />
              </Link>
              <Home01Text home01Slide={this.state.home01Slide[11]} />

            </div>
          </div>
        </div>
        <section className="container-home">
          <div className="home02">
            <Flag flagType={this.state.flagType[0]}/>
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
                  {/* <div className="slide transition"> */}
                    {/* <img src={Home02Img01} alt="" />
                    <img src={Home02Img02} alt="" />
                    <img src={Home02Img03} alt="" />
                    <img src={Home02Img04} alt="" />
                    <img src={Home02Img05} alt="" />
                    <img src={Home02Img06} alt="" />
                    <img src={Home02Img07} alt="" />
                    <img src={Home02Img08} alt="" />
                    <img src={Home02Img09} alt="" />
                    <img src={Home02Img10} alt="" /> */}
                  {/* </div> */}
                </div>
                <div className="title-wrap">
                  <div className="inner">
                    <div className="title bg-1 title-text transition" />
                    <div className="title bg-2 transition" />
                  </div>
                </div>
                <div className="quote-wrap">
                  <div className="inner">
                    <div className="quote bg-1 quote-text transition" />
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
            <div className="poster-more transition">
              <Link to="/films" className="transition">
                更多確認放映影片
              </Link>
            </div>
          </div>
          <div className="home03">
            <Flag flagType={this.state.flagType[1]}/>
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
                <div className="side front">台</div>
                <div className="side back">展</div>
                <div className="side right">典</div>
                <div className="side left">北</div>
                <div className="side top">影</div>
                <div className="side bottom">經</div>
              </div>
            </div>
            <div className="cf-wrap">
              <div className="cf-button">
                <Link to="/cf-films" className="transition">
                  參與募資
                </Link>
              </div>
              <div className="cf-circle cf-circle-01">
                <div className="cf-poster">
                  <Link to="/cf-films" className="transition cf01">
                    <img src={Home03Poster01} alt="" />
                  </Link>
                  <Link to="/cf-films" className="transition cf02">
                    <img src={Home03Poster02} alt="" />
                  </Link>
                  <Link to="/cf-films" className="transition cf03">
                    <img src={Home03Poster03} alt="" />
                  </Link>
                  <Link to="/cf-films" className="transition cf04">
                    <img src={Home03Poster04} alt="" />
                  </Link>
                  <Link to="/cf-films" className="transition cf05">
                    <img src={Home03Poster05} alt="" />
                  </Link>
                  <Link to="/cf-films" className="transition cf06">
                    <img src={Home03Poster06} alt="" />
                  </Link>
                  <Link to="/cf-films" className="transition cf07">
                    <img src={Home03Poster07} alt="" />
                  </Link>
                </div>
              </div>
              <div className="cf-circle cf-circle-03 cf-circle-bg">
                <div className="cf-poster">
                  <div className="cf-bg" />
                  <div className="cf-bg" />
                  <div className="cf-bg" />
                  <div className="cf-bg" />
                  <div className="cf-bg" />
                  <div className="cf-bg" />
                  <div className="cf-bg" />
                </div>
              </div>
              {/* <div className="cf-circle cf-circle-02"></div> */}
            </div>
          </div>
        </section>
      </div>;
  }
}

export default Home;
