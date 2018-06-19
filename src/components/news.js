import React, { Component } from 'react';
import '../sass/news.scss';
import $ from 'jquery';
import { width } from 'window-size';

import newsPic_01 from "../images/news_pic01.PNG";
import newsPic_02 from "../images/news_pic02.PNG";
import newsPic_03 from "../images/news_pic03.PNG";

class News extends Component {

  render() {
    return (
        <section className="container-news">
            <div className="news_title">最新消息</div>
            
            <div  className="news_box">
            
                {/* 一格 */}
                <ul className="flex_use">
                    <li className=" ">
                        <figure  className="box_pic">
                             <img src={newsPic_01} className="box_pic_in"  weight="80%" />
                        </figure>
                    </li>

                    <li className="box_text">
                          <a href=""><span className="box_bigtitle">戡平、李壽全、何篤霖 現身經典電影展站台</span></a>
                    </li>
                </ul>

                {/* 一格 */}
                 <ul className="flex_use">
                    <li className=" ">
                        <figure  className="box_pic">
                             <img src={newsPic_02} className="box_pic_in"  weight="80%" />
                        </figure>
                    </li>

                    <li className="box_text">
                        <a href=""><span className="box_bigtitle">經典回顧！上一屆經典電影展</span></a>
                    </li>
                </ul>

                {/* 一格 */}
                <ul className="flex_use">
                    <li className=" ">
                        <figure  className="box_pic">
                            <img src={newsPic_03} className="box_pic_in"  weight="80%"/>
                        </figure>
                    </li>

                    <li className="box_text">
                         <a href=""><span className="box_bigtitle">戡平、李壽全、何篤霖 現身經典電影展站台</span></a>
                    </li>
                </ul>

               <ul className="box_word">
                    <a href=""><li  className="box_wrod_in"><span className="in_span">◆ 戡平、李壽全、何篤霖 現身經典電影展站台</span></li></a>
                    <a href=""><li  className="box_wrod_in"><span>◆ 戡平、李壽全、何篤霖 現身經典電影展站台</span></li></a>
                    <a href=""><li  className="box_wrod_in"><span>◆ 戡平、李壽全、何篤霖 現身經典電影展站台</span></li></a>
               </ul>
            </div>

            <div className="page_box">

                <ul className="page">
                    <a href=""><li className="page_num">1</li></a>
                    <a href=""><li className="page_num">2</li></a>
                    <a href=""><li className="page_num">3</li></a>
                    <a href=""><li className="page_num">4</li></a>
                    <a href=""><li className="page_num">5</li></a>
                    <a href=""><li className="page_num">＞</li></a>
                </ul>

            </div>
        </section>
    );
  }
}

export default News;
