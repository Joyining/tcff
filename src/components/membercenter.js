import React, {Component} from 'react' ;
import '../sass/membercenter.scss';
import $ from 'jquery';
import { width } from 'window-size';

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
                        
                        <div className="photo">  </div>
                        <div className="btns">
                             <div className="box">123 </div>
                             <div className="box">341 </div>
                             <div className="box">1645 </div>
                             <div className="box">1545 </div>
                        </div>
                        <div className="commit01">155</div>
                    </div>
                
            </section>
        );
    }
}

export default MemberCenter;