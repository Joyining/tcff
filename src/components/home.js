import React, { Component } from 'react';
import '../sass/home.scss';
import Home02Img01 from "../images/breakfast_at_tiffany's_01.jpg";

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
          <div class="home02-screen-wrap">
            <div class="bg-image">
            <img src={Home02Img01} alt="" />
            </div>
            <div class="inside">
              <div class="image">
              <img src={Home02Img01} alt="" />
              </div>
              <div class="title">This is Title</div>
              <div class="quote">"This is a quote"</div>
            </div>
          </div>
        </div>
      </section>;
  }
}

export default Home;
