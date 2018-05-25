import React, { Component } from 'react';
import '../sass/home.scss';
import Home02Img01 from "../images/breakfast_at_tiffany's_01.jpg";
import Home02Img02 from "../images/breakfast_at_tiffany's_02.jpg";
import Home02Img03 from "../images/2001_a_space_odyssey_01.jpg";
import Home02Img04 from "../images/2001_a_space_odyssey_02.jpg";
import Home02Img05 from "../images/2001_a_space_odyssey_03.jpg";


class Home extends Component {
  componentDidMount(){
    document.addEventListener("DOMContentLoaded", function scrollDetection(event){
      window.addEventListener("scroll", function (){
        let scrollTop = document.documentElement.scrollTop;
        const home02 = document.querySelector('.home02');
        const titles = document.querySelectorAll('.title');
        if (scrollTop > (home02.offsetTop-800)) {
          // console.log(scrollTop);
          // console.log(home02.offsetTop);
          Array.from(titles).forEach(title=>{
            title.classList.add("animate");
          })
        } else if (scrollTop < (home02.offsetTop - 1200)){
          Array.from(titles).forEach(title => {
            title.classList.remove("animate");
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
        { title: "title 01", quote: "quote 01" },
        { title: "title 02", quote: "quote 01" },
        { title: "title 03", quote: "quote 03" },
      ];
      const titleText = document.querySelector('.title');
      const quote = document.querySelector(".quote");
      // console.log(movies.length);
      let i=0;
      setInterval(function(){
        titleText.innerHTML = movies[i].title;
        i++;
      },2000)
    }
    titleText();


  }
  render() {
    return <section className="container">
        <div className="home01" />
        <div className="home02">
          <div className="text-wrap">
            <div className="title">
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
            </div>
            <div className="inside">
              <div className="image">
                <div className="slide transition">
                  <img src={Home02Img01} alt="" />
                  <img src={Home02Img02} alt="" />
                  <img src={Home02Img03} alt="" />
                  <img src={Home02Img04} alt="" />
                  <img src={Home02Img05} alt="" />
                </div>
              </div>
              <div className="title-wrap">
                <div className="inner">
                  <div className="title bg-1 title-text transition">
                    title title
                  </div>
                  <div className="title bg-2 transition" />
                </div>
              </div>
              <div className="quote-wrap">
                <div className="inner">
                <div className="quote bg-1 quote-text transition">
                    "quote quote"
                  </div>
                  <div className="quote bg-2 transition" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>;
  }
}

export default Home;
