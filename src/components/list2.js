import React, { Component } from 'react';
// import '../sass/page.scss';
import '../sass/list.scss';
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

class List2 extends Component {
    constructor(){
        super();
        this.state = {
            movie:[
                {
                    "img": "../images/1991_Terminator2.jpg",
                    "year": "[1991]",
                    "fileName": "魔鬼終結者 2"
                },
                {
                    "img": "../images/1997_Titanic.jpg",
                    "year": "[1997]",
                    "fileName": "鐵達尼號"
                },
                {
                    "img": "../images/1996_Mr_Holland_Opus.jpg",
                    "year": "[1996]",
                    "fileName": "春風化雨"
                },
                {
                    "img": "../images/1988_Die_Hard.jpg",
                    "year": "[1988]",
                    "fileName": "終極警探"
                },
                {
                    "img": "../images/1988_Rain_Man.jpg",
                    "year": "[1988]",
                    "fileName": "雨人"
                },
                {
                    "img": "../images/1989_Back_to_the_Future_PartII.jpg",
                    "year": "[1989]",
                    "fileName": "回到未來 2"
                },
                {
                    "img": "../images/1974_the_godfather_part_II.jpg",
                    "year": "[1974]",
                    "fileName": "教父 2"
                },
                {
                    "img": "../images/1978_the_deer_hunter.jpg",
                    "year": "[1978]",
                    "fileName": "越戰獵鹿人"
                },
                {
                    "img": "../images/1979_kramer_vs_kramer.jpg",
                    "year": "[1979]",
                    "fileName": "克拉瑪對克拉瑪"
                },
                {
                    "img": "../images/1961_breakfast_at_tiffany_s.jpg",
                    "year": "[1961]",
                    "fileName": "第凡內早餐"
                },
                {
                    "img": "../images/1967_the_graduate.jpg",
                    "year": "[1967]",
                    "fileName": "畢業生"
                },
                {
                    "img": "../images/1968_2001_a_space_odyssey.jpg",
                    "year": "[1968]",
                    "fileName": "2001太空漫遊"
                }
            ]
        }
    }
  render() {
    return (
        <div>
        <section className="container">

        </section>
        <section className="container">
        <div id="mycard" className="flex">
        {
            this.state.movie.map((movie,i) =>
            <figure className="card">
                <img className="post" src={movie.img} alt="" />
                <p>{movie.year}</p>
                <p>{movie.fileName}</p>
                <a href="">
                    <div className="system">參與募資</div>
                </a>
            </figure>)
        }
            
            
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

export default List2;
