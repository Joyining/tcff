import React, { Component } from 'react';
import $ from 'jquery';
// import '../sass/page.scss';
import '../sass/films-detail.scss';
import dir from '../images/1997_Titanic_dir.jpg';
import act01 from '../images/1997_Titanic_act01.jpg';
import act02 from '../images/1997_Titanic_act02.jpg';
import act03 from '../images/1997_Titanic_act03.jpg';
import img01 from '../images/1997_Titanic_01.jpg';
import img02 from '../images/1997_Titanic_02.jpg';
import img03 from '../images/1997_Titanic_03.jpg';
import img04 from '../images/1997_Titanic_04.jpg';
import img05 from '../images/1997_Titanic_05.jpg';


class Cffilmsdetail extends Component {
    componentDidMount(){
        var slides = [img01,img02,img03,img04,img05];
        var slideWidth = $(".slide_wrap").width();
        var slideNum=0;
        // console.log(slides[0]);
        //var sildeCount=$(".slides li").length;
        var slideCount = slides.length;
        console.log(slideWidth);

        for(let $i=0; $i< slideCount;$i++){
            console.log(slides[$i])
            $(".slides").append("<li><img src='"+ slides[$i] +"' alt=''></li>")
            $(".pages").append("<li></li>");
        }

        // $(".slide li").width(slideWidth);
        // $(".slide_wrap ul.slides").width(slideWidth*slideCount);
        setWidth();

        $(".pages li").eq(0).css("background","white");
        $(".pages").on("mouseenter","li",function(){
            slideNum=$(this).index();
            moveSlide(slideNum);
        });
        $("#left").click(function(){
            slideNum--;
            if(slideNum<0)slideNum=slideCount-1;
            moveSlide(slideNum);
        });
        $("#right").click(function(){
            slideNum++;
            if(slideNum>=slideCount)slideNum=0;
            moveSlide(slideNum);
        });
        $(window).resize(function(){
            setWidth();
        });
        function setWidth(){
            slideWidth = $(".slide_wrap").width();
            $(".slide li").width(slideWidth);
            $(".slide_wrap ul.slides").width(slideWidth*slideCount);
            moveSlide(slideNum);
        };
        function moveSlide(slideNum){
             var slideMove = 0-slideNum*slideWidth;
            $(".pages li").eq(slideNum).css("background","white")
                .siblings().css("background","transparent");
            $(".slides").css("left",slideMove);
        }
    }
  render() {
         
    return (
        <div>
            <div className="box3 box">            
                <div className="slide_wrap">
                    <ul className="slides">
                        {/* <li><img src="images/slide1.jpeg" alt=""></li>
                        <li><img src="images/slide2.jpeg" alt=""></li>
                        <li><img src="images/slide3.jpeg" alt=""></li>
                        <li><img src="images/slide4.jpeg" alt=""></li> */}
                    </ul>
                    <ul className="pages">
                        {/* <li></li>
                        <li></li>
                        <li></li>
                        <li></li> */}
                    </ul>
                    <a className="arrow arrow_left" id="left"><i class="fas fa-angle-left"></i></a>
                    <a className="arrow arrow_right" id="right"><i class="fas fa-angle-right"></i></a>
                </div>
            </div>
            <div className="box3">
                <div className="myfilmname">
                    <h1 id="h01">1997</h1>
                    <h1>鐵達尼號</h1>
                </div>
                <h1>Titanic</h1>
                <div className="myfont">
                    <div className="fpg">
                        <div className="l_font">國家</div>
                        <div className="r_font">美國</div>
                    </div>
                    <div className="fpg">
                        <div className="l_font">片長</div>
                        <div className="r_font">194分鐘</div>
                    </div>
                    <div className="fpg">
                        <div className="l_font">級別</div>
                        <div className="r_font">保護級</div>
                    </div>            
                    <a href=""><div className="r_font BGC"><i class="fas fa-plus-circle"></i>  加入我的票夾</div></a>
                </div>        
            </div>
            <section className="container-filmsDetail">                
                <div className="about">
                    鐵達尼號》於1997年12月19日（星期六）在美國公開放映，在星期日它就已經錄得2850萬美元的票房收入。在此後一周內它的票房收入翻了三倍。即使在三個月後依然能夠達到滿座。一直到15個星期後每星期的收入才下降50%，一般電影在首映後，每周票房收入平均會下降40%。1998年3月《鐵達尼號》成為第一部票房收入達10億美元的電影。許多人表示曾多次翻看這部電影。電影唱片以及《詹姆斯·卡麥隆的鐵達尼號》電影書籍也非常暢銷，這本書在數星期《紐約時報》的暢銷書列表上占第一位——這是第一部這麼暢銷的電影書籍。鐵達尼號》最終錄得的總票房收入為18.353億美元，是歷史上最成功的電影之一，這個票房紀錄直至12年後才被柯麥隆自己編導的《阿凡達》所破。
                </div>
                <div className="about"> 
                    1912年，夢之船鐵達尼號首次出航，年輕美貌的貴族少女Rose隨著母親和未婚夫Caledon乘上豪華舒適的鐵達尼號巨輪。當年因家族面臨破產，Rose奉母之命被迫與富商Caledon訂婚。為博得Rose的歡心，Caledon不僅許諾滿足Rose的一切要求，而且將一條鑲有五十六克拉藍鑽石：海洋之心項鏈送給Rose，但Rose仍感到精神上孤獨寂寞，常因單調乏味的貴族生活而鬱鬱寡歡。 正當她因為生存意義與價值觀的不同之問題而尋死的剎那，邂逅了男主角Jack。與之相比，同船三等艙的年輕畫家Jack雖然生活窘迫，連三等艙都是從賭桌上贏得的，但他卻樂天知命。在他眼中人生如同一場幸運的遊戲，珍惜生活、珍惜自由就是他的生活真諦。Rose面對著滾滾的海浪欲結束自己的生命時，Jack的出現不僅挽救了她的生命，更挽救了她的靈魂。
                </div>
                <div className="about">
                    Rose與Jack墜入 戀愛後，Rose感受到 了愛情的美妙和生活的活力。她沖破世俗觀念，不顧貪圖虛榮的母親的反對，不受Caledon財富的誘惑，毅然選擇了自己的真愛與Jack沉浸在愛情的喜悅之中。然而，夢幻之船鐵達尼號卻發生難以挽回的意外，使得這段浪漫的情感沉入了大西洋的滔滔海水。
                </div>
                <div className="about">
                    八十四年後，尋寶探險家在三千英尺深處的鐵達尼號殘骸中找到了一幅完美無損的少女裸身素描畫畫中人正是年逾百歲的沉船倖存者羅絲。面對這張熟悉的畫像，飽經滄桑的老人不禁陷入了對往事的追憶之中…
                </div>                    
            </section>
            
            <section className="box2">
                <div className="mycontain">
                    <div className="flex dir">
                        <h2>導<br /><br />演</h2>
                        <div className="mycontent cover">                
                            <div className="mycontent-overlay"></div>
                            <img className="mycontent-image" src={dir} />
                            <div className="mycontent-details fadeIn-bottom">
                                <h3 className="mycontent-title">詹姆斯·卡麥隆</h3>
                                <h4 className="mycontent-title">James Cameron</h4>
                                <hr />
                                <p className="mycontent-text">詹姆斯·卡麥隆生於加拿大的安大略省的一個名為Kapuskasing的地方。他到南加州大學的圖書館找資料自修學習電影特效技術，以編劇開始他的職業生涯，後來又轉向電影的藝術導演以及特效處理工作。曾擔任過電影Roger Corman的製片。</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex act">
                        <div className="flex">
                            <h2>主要演員</h2>
                            <div className="mycontent cover">                
                                <div className="mycontent-overlay"></div>
                                <img className="mycontent-image" src={act01} />
                                <div className="mycontent-details fadeIn-bottom">
                                    <h3 className="mycontent-title">李奧納多·狄卡皮歐</h3>
                                    <h4 className="mycontent-title">Leonardo DiCaprio</h4>
                                    <hr />
                                    <p className="mycontent-text">小學就開始學習表演，並在同年演出他的電視處女秀《新靈犬萊西》。隨後因為名導麥可卡頓瓊斯慧眼識英雄，而與勞勃狄尼洛、艾倫芭金主演暢銷名著改編的《這男孩的一生》，並贏得一致好評。</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mycontent cover left">            
                                <div className="mycontent-overlay"></div>
                                <img className="mycontent-image" src={act02} />
                                <div className="mycontent-details fadeIn-bottom">
                                    <h3 className="mycontent-title">凱特·溫斯蕾</h3>
                                    <h4 className="mycontent-title">Kate Winslet</h4>
                                    <hr />
                                    <p className="mycontent-text">凱特·溫斯蕾從電視上開始演員生涯，她在電影中的首次演出是彼得·傑克森所執導的《夢幻天堂》，並飾演女主角茱麗葉·休姆，她在劇中是一位活潑的少女，並幫助自己最好的朋友謀殺她的母親（因為她不允許她們在一起）。凱特·溫斯蕾這次演出受到許多正面的評價。</p>
                                </div>

                            </div>
                        </div>
                        <div className="flex">
                            <div className="mycontent cover left">        
                                <div className="mycontent-overlay"></div>
                                <img className="mycontent-image" src={act03} /> 
                                <div className="mycontent-details fadeIn-bottom">
                                    <h3 className="mycontent-title">比利·贊恩</h3>
                                    <h4 className="mycontent-title">Billy Zane</h4>
                                    <hr />
                                    <p className="mycontent-text">「比利」·贊恩（" Billy " Zane)是一位美國男演員和監製。他較著名的是在1989年驚悚片《航越地平線》中飾演休吉·沃里納，以及在1996年超級英雄片《轟天奇兵》中主演基特·沃克／轟天奇兵。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </section>
            
        </div>
    );
  }
}

export default Cffilmsdetail;
