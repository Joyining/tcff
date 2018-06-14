import React, {Component} from 'react' ;
import '../sass/membercenter.scss';
import $ from 'jquery';
import { width } from 'window-size';

import memberCenterPic from "../images/member_center.svg";

class MemberCenter extends Component{
   
    componentDidMount(){
        $('#oders_click').click(function(){
            if($(this).siblings('li').hasClass('on')){
                $(this).siblings("li").slideUp(500).removeClass("on");  
            } else{
                $(this).parent().siblings().children("li").removeClass("on");
                $(this).siblings("li").slideDown(500).addClass("on").parent().siblings().children("li").slideUp(500);
            }
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
                            <div className="btns">
                                <div className="box_click">訂單查詢</div>
                                <div className="box_unclick">修改會員資料</div>
                                <div className="box_unclick">修改密碼</div>
                                <div className="box_unclick">客服中心</div>
                            </div>
                        </div>

                        <div className="commit01">

                            <div className="modify">
                               <div className="oders month_word">訂單查詢</div>
                               <div className="oders_use">
                                   <ul  className="oders_post_box">
                                   
                                       <ul className="oders_post oders_word" id="oders_click">22</ul>
                                            <li className="oders_post_down oders_word">155</li>
                    
                                       <ul className="oders_post oders_word" id="oders_click">22</ul>
                                            <li className="oders_post_down oders_word">155</li>
                                  
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