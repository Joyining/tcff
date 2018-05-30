import React, { Component } from 'react';
import $ from 'jquery';
// import '../sass/page.scss';
import '../sass/films-detail.scss';
import dir from '../images/1997_Good_Will_Hunting_dir.jpg';
import act01 from '../images/1997_Good_Will_Hunting_act01.jpg';
import act02 from '../images/1997_Good_Will_Hunting_act02.jpg';
import act03 from '../images/1997_Good_Will_Hunting_act03.jpg';
import img01 from '../images/1997_Good Will Hunting_01.jpg';
import img02 from '../images/1997_Good Will Hunting_02.jpg';
import img03 from '../images/1997_Good Will Hunting_03.jpg';
import img04 from '../images/1997_Good Will Hunting_04.jpg';
import img05 from '../images/1997_Good Will Hunting_05.jpg';


class Filmsdetail extends Component {
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
                <div className="myfilename">
                    <h2 id="h01">1997</h2>
                    <h2>心靈捕手</h2>
                </div>
                <h2>Good Will Hunting</h2>
                <div className="myfont">
                    <div className="fpg">
                        <div className="l_font">國家</div>
                        <div className="r_font">美國</div>
                    </div>
                    <div className="fpg">
                        <div className="l_font">片長</div>
                        <div className="r_font">126分鐘</div>
                    </div>
                    <div className="fpg">
                        <div className="l_font">級別</div>
                        <div className="r_font">保護級</div>
                    </div>            
                    <a href=""><div className="r_font">加入我的票夾</div></a>
                </div>        
            </div>
            <section className="container">                
                <div className="about">
                    何謂「三敲四踹」？參演《心靈捕手》、《瞞天過海》、以《刺殺傑西》角逐奧斯卡，看似有望成名卻始終無望的機會不在家。何謂「一鳴驚人」？沉浮到過了不惑之年，以《海邊的曼徹斯特》一舉成影帝、獎拿到手軟。不再是誰的誰，他就是凱西艾佛列克。奧斯卡9項大獎提名（最佳影片、導演、原創劇本、男主角、男配角、女配角、剪輯、配樂、主題曲）；榮獲最佳原創劇本與男配角2項大獎，本作品是由麥特戴蒙自編自演的電影，劇本由麥特戴蒙與班·艾佛列克聯合撰寫並獲得成功，羅賓威廉斯飾演一位開導男主的心理諮詢師，精湛的演技使他獲得奧斯卡最佳男配角獎。
                </div>
                <div className="about"> 
                    一個麻省理工學院的數學教授，在他系上的公佈欄寫下一道他覺得十分困難的題目，希望他那些傑出的學生能解開答案，可是卻無人能解。結果一個年輕的清潔工（麥特戴蒙飾）卻在下課打掃時，發現了這道數學題並輕易的解開這個難題。數學教授在找不到真正的解題之後，又下了另一道更難的題目，要找出這個數學天才。 
                </div>
                <div className="about">
                    原來這個可能是下一世紀的愛因斯坦的年輕人叫威爾杭特，他聰明絕頂卻叛逆不羈，甚至到處打架滋事，並被少年法庭宣判送進少年觀護所。最後經過數學教授的保釋並向法官求情，才讓他免受牢獄之災。雖然教授希望威爾能夠重拾自己的人生目標，而用盡方法希望他打開心結，但是許多被教授請來為威爾做心理轉導的心理學家，卻都被這個毛頭小伙子洞悉心理反被威爾羞辱，紛紛宣告威爾已「無藥可救」。
                </div>
                <div className="about">
                    數學教授在無計可施的情況下，只好求助他的大學同學及好友（羅賓威廉斯飾），希望他來開導這個前途汲汲可危的年輕人。到底最後他能不能打開心胸擁抱生命？會不會把他之前所遭遇的困境拋諸腦後？ 
                </div>                    
            </section>
            
            <section className="box2">
                <div className="mycontain">
                    <div className="dir">
                        <h2>導<br /><br />演</h2>
                        <div className="mycontent cover">                
                            <div className="mycontent-overlay"></div>
                            <img className="mycontent-image" src={dir} />
                            <div className="mycontent-details fadeIn-bottom">
                                <h3 className="mycontent-title">葛斯·范·桑</h3>
                                <h4 className="mycontent-title">Gus Van Sant</h4>
                                <hr />
                                <p className="mycontent-text">拍攝廣告出身的葛斯范桑，第一部作品電影長片作品《追流雲的少年》獲選為洛杉磯影評人協會最佳獨立電影。作品大多關注於同志議題、次文化和邊緣少年問題等等，像是比較為台灣觀眾所知的，《迷幻公園》和《自由大道》的主題皆是如此。</p>
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
                                    <h3 className="mycontent-title">麥特·戴蒙</h3>
                                    <h4 className="mycontent-title">Matt Damon</h4>
                                    <hr />
                                    <p className="mycontent-text">最初的拍攝的電影是浪漫喜劇《Mystic Pizza》，當年16歲。戴蒙與班·艾佛列克是相當要好的好朋友，成名作《心靈捕手》，為兩人贏得九項奧斯卡大獎的提名，並且讓兩人獲得奧斯卡最佳原創劇本獎。</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            
                            <div className="mycontent cover left">            
                                <div className="mycontent-overlay"></div>
                                <img className="mycontent-image" src={act02} />
                                <div className="mycontent-details fadeIn-bottom">
                                    <h3 className="mycontent-title">羅賓·威廉斯</h3>
                                    <h4 className="mycontent-title">Robin Williams</h4>
                                    <hr />
                                    <p className="mycontent-text">羅賓曾三度提名奧斯卡最佳男主角獎，並在1997年以電影《心靈捕手》榮獲奧斯卡最佳男配角獎、美國演員工會獎最佳男配角。此外，羅賓也曾三度拿下金球獎最佳音樂及喜劇類電影男主角獎。</p>
                                </div>

                            </div>
                        </div>
                        <div className="flex">
                            
                            <div className="mycontent cover left">        
                                <div className="mycontent-overlay"></div>
                                <img className="mycontent-image" src={act03} /> 
                                <div className="mycontent-details fadeIn-bottom">
                                    <h3 className="mycontent-title">班·艾佛列克</h3>
                                    <h4 className="mycontent-title">Ben Affleck</h4>
                                    <hr />
                                    <p className="mycontent-text">班艾佛列克出生於美國的加州，早期與夥伴兼死黨麥特戴蒙出演了一系列的肥皂劇，1997年兩人自編自演的電影《心靈捕手》獲得九項奧斯卡金像獎提名，共同創作的劇本更獲得最佳原著劇本獎，自此正式踏上明星之路。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </section>
            <div className="box3 flex">
                <div id="trapezoid_left">
                    <h2>07/01(日)</h2>
                </div>            
                <div id="trapezoid_right">                 
                    <h2>台北光點電影院</h2>       
                </div>        
            </div>
        </div>
    );
  }
}

export default Filmsdetail;
