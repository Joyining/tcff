import React, { Component } from 'react';
// import '../sass/page.scss';
import '../sass/cf-films.scss';
// import Titantic from '../images/1997_Titanic.jpg';
// import Holland from '../images/1996_Mr_Holland_Opus.jpg';
// import Terminator from '../images/1991_Terminator2.jpg';
// import Future from '../images/1989_Back_to_the_Future_PartII.jpg';
// import Rain from '../images/1988_Rain_Man.jpg';
// import Die from '../images/1988_Die_Hard.jpg';
// import Deer from '../images/1978_the_deer_hunter.jpg';
// import Godfather from '../images/1974_the_godfather_part_II.jpg';
// import Kramer from '../images/1979_kramer_vs._kramer.jpg';
// import Breakfast from '../images/1961_breakfast_at_tiffany_s.jpg';
// import Graduate from '../images/1967_the_graduate.jpg';
// import Space from '../images/1968_2001_a_space_odyssey.jpg';

class Cffilms2 extends Component {
    constructor(){
        super();
        this.state = {
            movie:[
                {
                    "img": "1991_Terminator2.jpg",
                    "year": "[1991]",
                    "fileName": "魔鬼終結者 2"
                },
                {
                    "img": "1997_Titanic.jpg",
                    "year": "[1997]",
                    "fileName": "鐵達尼號"
                },
                {
                    "img": "1996_Mr_Holland_Opus.jpg",
                    "year": "[1996]",
                    "fileName": "春風化雨"
                },
                {
                    "img": "1988_Die_Hard.jpg",
                    "year": "[1988]",
                    "fileName": "終極警探"
                },
                {
                    "img": "1988_Rain_Man.jpg",
                    "year": "[1988]",
                    "fileName": "雨人"
                },
                {
                    "img": "1989_Back_to_the_Future_PartII.jpg",
                    "year": "[1989]",
                    "fileName": "回到未來 2"
                },
                {
                    "img": "1974_the_godfather_part_II.jpg",
                    "year": "[1974]",
                    "fileName": "教父 2"
                },
                {
                    "img": "1978_the_deer_hunter.jpg",
                    "year": "[1978]",
                    "fileName": "越戰獵鹿人"
                },
                {
                    "img": "1979_kramer_vs._kramer.jpg",
                    "year": "[1979]",
                    "fileName": "克拉瑪對克拉瑪"
                },
                {
                    "img": "1961_breakfast_at_tiffany_s.jpg",
                    "year": "[1961]",
                    "fileName": "第凡內早餐"
                },
                {
                    "img": "1967_the_graduate.jpg",
                    "year": "[1967]",
                    "fileName": "畢業生"
                },
                {
                    "img": "1968_2001_a_space_odyssey.jpg",
                    "year": "[1968]",
                    "fileName": "2001太空漫遊"
                }
            ]
        }
    }
  render() {
    return (
        <div>
        <section className="container-cf">

        </section>
        <section className="container-cfFilms">
            
            <div id="mycard" className="flex">
            {
                this.state.movie.map((movie,i) =>
                <figure className="card">
                    <img className="post" src={`${process.env.PUBLIC_URL}/images/${movie.img}`} alt="" />
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
                <p>募資活動期間: 2018/06/01 - 2018/06/30</p>
                <p>募資活動結束前，該影片募資進度達成80%以上，則該片確認放映。在募資活動期間完成該片票券購買的消費者，於影片放映當日持電影票券至指定影廳，即可入內觀賞。台北經典影展會於募資達標後一周內以電子郵件通知放映時間及影廳，煩請多加留意。</p>
                <p>如果募資活動結束仍然沒有達到目標，台北經典影展會透過您參與募資時的原付款方式退還你所支持的金額（不包含虛擬帳號轉帳交易手續費）。您將會收到金流公司所寄出的退款信件，請根據信中的指示完成退款步驟。</p>
            </div>            
            
        </section>
        </div>
    );
  }
}

export default Cffilms2;
