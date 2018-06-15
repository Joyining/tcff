import React, {Component} from 'react' ;
import '../sass/membercenter.scss';
import $ from 'jquery';
import { width } from 'window-size';

import memberCenterPic from "../images/member_center.svg";

class MemberCenter extends Component{
   
    componentDidMount(){
        $('.oders_post_down').hide();

        $('.oders_post_box ul').click(function(){
            if($(this).siblings('.oders_post_down').hasClass('on')){
                $(this).siblings(".oders_post_down").slideUp(500).removeClass("on");  
            } else{
                $(this).parent().siblings('.oders_post_down').removeClass("on");
                $(this).siblings(".oders_post_down").slideDown(500).addClass("on").parent().siblings().children("li").slideUp(500);
            }
        })

        $('.oders_post_down_mobile').hide();

        $(function(){
            $('#change_color').click(function(){
                $(this).toggleClass('click_box_change');
                return false ;
            })
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
                                <button className="pic_change">更換照片</button>
                            </figure>              

                            <ul  className="btns">
                                <li>
                                    <ul className="box_click" id="change_color">
                                        訂單查詢
                                        <li className="oders_post_down_mobile oders_word ">1235</li>
                                    </ul>

                                    <ul className="box_unclick"  id="change_color">
                                        修改會員資料
                                        <li className="oders_post_down_mobile oders_word ">1235</li>
                                    </ul>

                                    <ul className="box_unclick"  id="change_color">
                                        修改密碼
                                        <li className="oders_post_down_mobile oders_word ">1235</li>
                                    </ul>
                                    
                                    <ul className="box_unclick"  id="change_color">
                                         客服中心
                                        <li className="oders_post_down_mobile oders_word display">1235</li>
                                    </ul>
                                    
                                </li>    
                            </ul>              
                            {/* <div className="btns">
                                <div className="box_click">訂單查詢</div>
                                <div className="box_unclick">修改會員資料</div>
                                <div className="box_unclick">修改密碼</div>
                                <div className="box_unclick">客服中心</div>
                            </div> */}
                        </div>

                        <div className="commit01">

                            <div className="modify">
                               <div className="oders month_word">訂單查詢</div>
                               <div className="oders_use">
                                   <ul  className="oders_post_box">
                                        <li>
                                            <ul className="oders_post oders_word" id="oders_click">06/21</ul>
                                            <li className="oders_post_down oders_word">訂單內容</li>
                                        </li>
                                        <li>
                                            <ul className="oders_post oders_word" id="oders_click">06/18</ul>
                                            <li className="oders_post_down oders_word">訂單內容</li>
                                        </li>
                                   </ul>
                                  

                                    
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