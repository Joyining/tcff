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
            var scrollTo=$(target).offset().top-uphight-60;
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
                <div className="info_title" >關於影展</div>
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
                    <div className="info_title" >場地資訊</div>
                    <div>
                        <div className="place_title">台北光點</div>
                        <ul className="pics_box2">
                            <li className="place_pic"><img src={placePicSpot} width="100%"/></li>
                            <li>
                              <div className="place_info">
                                <span>地址：104 台北市中山區中山北路二段18號</span>
                                <span>連絡電話：(02)2511-7786 　</span>
                              </div>
                              <div>
                                 444
                              </div>
                            </li>
                        </ul>
                    </div>
                  
                    <div>
                        <div className="place_title"> 誠品電影院</div>
                        <ul className="pics_box2">
                            <li  className="place_pic"><img src={placePicEslite} width="100%"/></li>
                            <li>
                            <div className="place_info">
                                <span>地址：110 台北市信義區菸廠路88號</span>
                                <span>連絡電話：(02)6636-5888　</span>
                              </div>
                              <div>44411</div>
                            </li>
                        </ul>
                    </div>
                  
              </div>

              <div className="tcff_ticket down_box" id="ticket_tcff">
                 
                   <div className="info_title" >售票資訊</div>
                   <p className="tcff_ticket_worring">
                     購票前，請先詳閱售票資訊，如不同意請勿購買，以免產生不必要之糾紛及損害；一旦進行購票及退票作業，則視同已瞭解並同意遵守相關規範。
                  </p>
                    <div className="ticket_title"> 票價</div>
                   <p className="tcff_ticket_word">
                     <span className="tcff_ticket_bigword">【全票】每張220元</span>
                     <span> 銷售時間：6.01〈五〉 - 7.14〈六〉</span>
                   </p>

                  <p className="tcff_ticket_word">
                     <span className="tcff_ticket_bigword">【募資票】每張220元</span>
                     <span> 銷售時間：6.01〈五〉 - 7.10〈日〉</span>
                   </p>

                  <p className="tcff_ticket_word">
                     <div className="ticket_title">購票方式</div>

                     <span className="tcff_ticket_bigword">【網路購票】</span>
                     <span>
                        <ol>
                          <li>1.預售期間僅提供網路購票。</li>
                          <li>2.購票須登入金馬影展會員帳號（尚無會員帳號之觀眾，請先註冊）。為確保購票順利，請自行確認會員帳號有效，且能正常登入。</li>
                          <li>3.每筆訂單以8張為限。</li>
                          <li>4.進入購票流程後，10分鐘內須完成訂單確認，逾時未確認之訂單，系統將視為無效並取消，需再重新訂購。</li>
                          <li>5.各場次開演前2小時「線上售票系統」將停止販售，僅可於戲院現場之影展售票處購買。</li>
                          <li>6.單一帳號請勿多裝置或多視窗同時操作。</li>
                          <li>7.付款方式：信用卡、ATM轉帳、超商付款</li>
                          <li>8.取票方式：購買後會取得「取票序號」，在放映時間到指定廳院兌換即可。</li>
                        </ol>
                     </span>

                     <br/>

                     <span className="tcff_ticket_bigword">【現場購票】</span>
                     <span>
                        <ol>
                          <li>1.影展期間可於戲院現場之影展售票處購買。</li>
                          <li>2.售票處開放時間：每日首場電影放映前30分鐘，至末場電影開演後20分鐘。</li>
                          <li>3.僅提供現金購票。</li>                         
                        </ol>                        
                     </span>
                     
                     <br/>

                     <span className="tcff_ticket_bigword">【注意事項】</span>
                     <span>
                        <ol>
                          <li>1.每場次座位有限，售完為止。現場無保留票券，請提早購買。</li>
                          <li>2.票券視同有價證券，且為唯一入場憑證，請妥善保存。如發生遺失、損毀或無法辨識等情形請自行負責，恕無法重新開票。</li>
                          <li>3.身高超過100（含）公分以上兒童須購買全票入場。</li>  
                          <li>4.影廳內無障礙設施席位有限，如有需求請事先來電預約。</li>
                          <li className="bold">5.為維護觀影品質，影片映演20分鐘後，不再開放入場，逾時恕不退換票，敬請準時入場。</li>
                          <li>6.攜帶外食者，請遵守各戲院之外食規定。</li>
                          <li>7.每場次放映完畢後皆會清場，離場時請注意個人隨身物品。</li>
                          <li>8.為了影廳內的安全與維持逃生動線，請勿逗留、站立或坐在廳內走道與其他非座位處。</li>
                          <li className="bold">9.影片之權利屬於版權所有者，任何攝影、錄影、錄音行為皆屬違法，可能招致法律訴訟，本會保留要求違法觀眾刪除檔案之權利。</li>
                          <li>10.影展手冊場次表所列之影片片長為刊物付印前之最完整資料，若有片長異動，將於官方網站與戲院現場另行公告。片長不包含映前與映後座談時間。</li>
                          <li>11.影展手冊場次表所列之影片級數為刊物付印前之最完整資料，但可能因文化部審核結果而有所變更，級數異動將於官方網站與戲院現場另行公告。於公告前購票之觀眾若因級數異動而無法觀影，票款將可全額退回。</li>
                          <li>12.影展工作人員之各種舉措乃為維持影展之順暢運作，及盡可能維護大眾之最佳觀影狀況，本會不接受任何針對工作人員之惡意行為，並將視情況採取相應之措施。</li>
                          <li>13.上述事項若有未盡事宜，主辦單位保留節目更動之權利。</li>                       
                        </ol>                        
                     </span>
                     
                     <br/>

                     <span className="tcff_ticket_bigword">【退票方式】</span>
                     <span>
                        <ol>
                          <li className="bold">1.退票最遲須於該場次放映3天前辦理，逾時恕不受理。</li>
                          <li>2.每張需酌收10%手續費。</li>
                          <li>3.僅提供現場退票，恕無法網路退票。</li>        
                          <li>4.「換票」視同「退票」，請依上述方式辦理退票。</li>                 
                        </ol>                        
                     </span>


                   </p>
              
              </div>


              <div className="tcff_ticket_qa down_box" id="ticket_qa_tcff">
                  <div className="info_title" >售票Q&A</div>
                  <ul className="tcff_ticket_qa_up">
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
