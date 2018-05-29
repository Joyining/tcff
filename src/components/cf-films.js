import React, { Component } from 'react';
// import '../sass/page.scss';
import '../sass/cf-films.scss';
import Titantic from '../images/1997_Titanic.jpg';
import Holland from '../images/1996_Mr_Holland_Opus.jpg';
import Terminator from '../images/1991_Terminator2.jpg';
import Future from '../images/1989_Back_to_the_Future_PartII.jpg';
import Rain from '../images/1988_Rain_Man.jpg';
import Die from '../images/1988_Die_Hard.jpg';
import Deer from '../images/1978_the_deer_hunter.jpg';
import Godfather from '../images/1974_the_godfather_part_II.jpg';
import Kramer from '../images/1979_kramer_vs._kramer.jpg';
import Breakfast from '../images/1961_breakfast_at_tiffany_s.jpg';
import Graduate from '../images/1967_the_graduate.jpg';
import Space from '../images/1968_2001_a_space_odyssey.jpg';

class Cffilms extends Component {
  render() {
    return (
        <div>
        <section className="container">

        </section>
        <section className="container">
        <div id="mycard" className="flex">
            <figure className="card">
                <img className="post" src={Titantic} alt="" />
                <p>[1997]</p>
                <p>鐵達尼號</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>               
            </figure>
            <figure className="card">
                <img className="post" src={Holland} alt="" />
                <p>[1996]</p>
                <p>春風化雨1996</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>
            <figure className="card">
                <img className="post" src={Terminator} alt="" />
                <p>[1991]</p>
                <p>魔鬼終結者 2</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>

            <figure className="card">
                <img className="post" src={Future} alt="" />
                <p>[1989]</p>
                <p>回到未來 2</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>

            </figure>
            <figure className="card">
                <img className="post" src={Rain} alt="" />
                <p>[1988]</p>
                <p>雨人</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>
            <figure className="card">
                <img className="post" src={Die} alt="" />
                <p>[1988]</p>
                <p>終極警探</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>

            <figure className="card">
                <img className="post" src={Deer} alt="" />
                <p>[1978]</p>
                <p>越戰獵鹿人</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>
            <figure className="card">
                <img className="post" src={Godfather} alt="" />
                <p>[1974]</p>
                <p>教父 2</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>
            <figure className="card">
                <img className="post" src={Kramer} alt="" />
                <p>[1979]</p>
                <p>克拉瑪對克拉瑪</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>
            <figure className="card">
                <img className="post" src={Space} alt="" />
                <p>[1968]</p>
                <p>2001太空漫遊</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>
            <figure className="card">
                <img className="post" src={Breakfast} alt="" />
                <p>[1961]</p>
                <p>第凡內早餐</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>
            <figure className="card">
                <img className="post" src={Graduate} alt="" />
                <p>[1967]</p>
                <p>畢業生</p>
                    <a href="">
                        <div className="system">參與募資</div>
                    </a>
            </figure>
        </div>
        <div className="about">
                <p>[注意事項]</p>
                <p></p>
            </div>            
            
        </section>
        </div>
    );
  }
}

export default Cffilms;
