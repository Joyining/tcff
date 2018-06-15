import React, { Component } from 'react';
import '../sass/info.scss';
import $ from 'jquery';
import { width } from 'window-size';

import newsPicLogo from "../images/logo.svg";
import newsPicChair from "../images/CHEAR.svg";
import newsPicTicket from "../images/ticket2.svg";

import placePicSpot from "../images/spot_photo.jpg";
import placePicEslite from "../images/eslite_photo.jpg";

class Info extends Component {

  componentDidMount(){

      $(document).ready(function() {
          $("#boxInfo").scrollTop(0);
          $('.pics_box figure a').click(function (e) {
            e.preventDefault();
            var uphight = $("header").height()+$(".pics_box").height() 
            var target=$(this).attr("href")
            var scrollTo=$(target).offset().top-uphight-40;
            console.log(target+", scroll: "+scrollTo);
            // console.log(scrollTop)
            $("body, html").animate({
              scrollTop: scrollTo
            }, 600);
            // $('.down_box').scrollTo($(this).attr('href'), 1000);
            // return false;
          });  
        });

  }



  render() {
    return (
        <section className="container container-info">
            最新消息
            {/* 圖片位置 */}
            <ul className="pics_box" id="pic_up_place">
              <li className="up_pic info_border ">
                <figure className="up_in_pic up_in_pic_info" width="1000%">
                   <a href="#about_tcff"><img src={newsPicLogo}/></a>
                </figure>
                <span>關於影展</span>
              </li>
              <li className="up_pic">
                <figure className="up_in_pic">
                   <a href="#place_tcff"><img src={newsPicChair}/></a>                   
                </figure>
                <span>場地資訊</span>
              </li>
              <li className="up_pic">
                <figure className="up_in_pi ">
                   <a href="#ticket_tcff"><img src={newsPicTicket}/></a>
                </figure>
                <span>售票資訊</span>
              </li>
              <li className="up_pic">
                <figure className="up_in_pic">
                   <a href="#ticket_qa_tcff"><img src={newsPicChair}/></a>
                </figure>
                <span>售票Q&A</span>
              </li>
            </ul>

            {/* 內容位置 */}
            <div className="word down_box"  id="boxInfo">
            
              <div className="tcff_about down_box" id="about_tcff">
                <div className="ingo_title" >關於影展</div>
                <div>
                台北經典影展首屆於2018年舉辦，希望透過經典電影的重新放映，帶領觀影民眾回到1960-2000之間的黃金年代。相較於國內其他影展或電影節活動，台北經典影展破先例的完全以「經典老片」為主軸，
                選擇了相當數量的影史經典巨作呈現在觀眾眼前。我們深信每部經典作品之所以能成為經典，背後一定有著值得我們細細品味挖掘的細節。
                台北經典影展彙集國內外經典電影作品，本屆總計有60部確認放映影片，15部募資影片。本影展的使命是為喜歡經典老電影的觀眾提供一個升級的觀影體驗，因此所有放映影片皆取得以最新數位修復技術復原之版本，
                希望觀眾在緬懷過去的同時，也能享受與時俱進的觀影品質。
                本屆有15部影片透過新型態的募資活動，增加觀眾與影展之間的互動。由募資結果決定哪些影片得以重返大螢幕。台北經典影展也希望藉此了解觀眾的喜好，作為下一屆的選片指南。 
                台北經典影展向經典致敬，並鼓勵對觀眾對經典作品的思考，藉由電影放映及電影賞析文章分享，系統性的帶領觀眾認識經典電影，擴展本地觀影視野，並灌輸欣賞正版影片的正確版權觀念。台北經典影展透過觀眾熟悉的影像，對白和配樂回到過去，引領人們走進時光隧道，感受不同年代的獨特氛圍。本影展期待成為台灣觀眾心目中欣賞經典電影的首選，影迷的年度盛事。
                </div>
              </div>

              <div className="tcff_place down_box" id="place_tcff">
                    <div className="ingo_title" >場地資訊</div>
                    <div>
                        <div className="place_title">台北光點</div>
                        <ul className="pics_box">
                            <li className="place_pic"><img src={placePicSpot} width="100%"/></li>
                            <li>
                              <div>132</div>
                              <div>44411</div>
                            </li>
                        </ul>
                    </div>
                  
                    <div>
                        <div className="place_title"> 誠品電影院</div>
                        <ul className="pics_box">
                            <li  className="place_pic"><img src={placePicEslite} width="100%"/></li>
                            <li>
                              <div>132</div>
                              <div>44411</div>
                            </li>
                        </ul>
                    </div>
                  
              </div>

              <div className="tcff_ticket down_box"   id="ticket_tcff"> </div>


              <div className="tcff_ticket_qa down_box" id="ticket_qa_tcff">
                  <ul>
                    <li>購票</li>
                    <li>取票</li>
                    <li>兌換票</li>
                    <li>其他</li>
                  </ul>

                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
              
              </div>
            </div>
        </section>
    );
  }
}

export default Info;
