import React, {Component} from 'react' ;
import '../sass/membercenter.scss';
import $ from 'jquery';
import { width } from 'window-size';

import memberCenterPic from "../images/member_center.svg";

class MemberCenter extends Component{
   
    componentDidMount(){
        $('.forget_p').click(function(){
            $('.turn').toggleClass('flip');
        })

        $('.login_btn_t').click(function(){
            $('.turn').toggleClass('flip');
        })

        $('.sign_up').click(function(){
            $('.turn').toggleClass('sign_up_flip');
            $('.turn_b').toggleClass('sign_up_down_flip');        
            $('.registered_f').css("z-index","10") ;
            $('.turn').css("z-index","-2") ;
            $('.login_f').css("z-index","-1") ;
            $('.login_f_p').css("background-color","rgb(100, 26, 29)");
            // $('.login_f_p').empty();
            // $('.login_f').empty();
            $('.hide_use').hide();
        })

        $('.sign_up_r').click(function(){
            $('.turn_b').toggleClass('sign_up_down_flip');
            $('.turn').toggleClass('sign_up_flip');
            $('.login_f').append();
            $('.login_f_p').append();
            $('.turn').css("z-index","1") ;
            $('.hide_use').show();
        })

        

    }



    render(){
        return(
            <section className="container container-membercenter">

                    <div className="banner_up">122</div>
                    <div className="them">
                        
                        <div className="photo">
                            <figure className="pic">
                                <img src={memberCenterPic}/>
                            </figure>
                        </div>
                        <div className="btns">
                             <div className="box_click">訂單查詢</div>
                             <div className="box_unclick">修改會員資料</div>
                             <div className="box_unclick">修改密碼</div>
                             <div className="box_unclick">客服中心</div>
                        </div>
                        <div className="commit01">
                            <div className="modify">
                               <div className="month">
                                   <div className="month_word">1</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                               <div className="month">
                                    <div className="month_word">2</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                               <div className="month">
                                    <div className="month_word">3</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                               <div className="month">
                                    <div className="month_word">4</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>


                               <div className="month">
                                    <div className="month_word">5</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                               <div className="month">
                                    <div className="month_word">6</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                               <div className="month">
                                    <div className="month_word">7</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                               <div className="month">
                                    <div className="month_word">8</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>


                               <div className="month">
                                    <div className="month_word">9</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                               <div className="month">
                                    <div className="month_word">10</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                               <div className="month">
                                    <div className="month_word">11</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                               <div className="month">
                                    <div className="month_word">12</div>
                                    <p className="month_word_m">Month</p>
                                    <p className="month_word_m display">Month2</p>
                               </div>
                            </div>
                            <div className="ticketbox">111</div>
                        </div>
                    </div>
                
            </section>
        );
    }
}

export default MemberCenter;