import React, {Component} from 'react' ;
import '../sass/member.scss';
import $ from 'jquery';
import { width } from 'window-size';

class Member extends Component{
    componentDidMount(){
        $('.forget_p').click(function(){
            $('.turn').toggleClass('flip');
        })

        $('.login_btn_t').click(function(){
            $('.turn').toggleClass('flip');
        })

        // $('.sign_up').click(function(){
        //     $('.turn').toggleClass('sign_up_flip');
        // })

        // $('.sign_up').click(function(){
        //     $('.turn').toggleClass('sign_up_flip');
        //     $('.sign_up').addClass('.color');
        //     $('.login_f_p').empty();
        // })

        $('.sign_up').click(function(){
            $('.turn').toggleClass('sign_up_flip');
            $('.turn_b').toggleClass('sign_up_down_flip');        
            $('.login_f_p').empty();
        })
        $('.sign_up_2').click(function(){
            $('.registered_f').addClass('zindex');
            $('.login_f_p').addClass('color');   
        }) 

        $('.sign_up_r').click(function(){
            $('.turn_b').toggleClass('sign_up_down_flip');
        })
    }
    render(){
        return(
            <section className="container">
                <div className="container-member display">

                        <div className="turn_b front">
                            <div className="login_b place back_animate"></div>

                        {/* 會員註冊 */}
                            <div className="registered_f back_animate back">
                                <div className="registered_word">會 員 註 冊</div>
                                <div className="account_box_r">
                                    <div className="account_r">帳號：</div>
                                    <input type="text" className="account_r_2" placeholder="請輸入Mail"/>
                                </div>
                                <div className="worring_box_r">
                                    <div className="worring_r">請輸入正確的Mail格式</div>
                                </div>
                                <div className="password_box_r">
                                    <div className="password_r_1">密碼：</div>
                                    <input type="password" className="password_r_2" placeholder="請輸入至少六字元"/>
                                </div>
                                <div className="worring_box_r">
                                    <div className="worring_r">請輸入至少六字元</div>
                                </div>
                                <div className="password_box_r">
                                    <div className="password_r_1">再次確認密碼：</div>
                                    <input type="password" className="password_r_2"placeholder="請再次輸入註冊密碼"/>
                                </div>
                                <div className="worring_box_r">
                                    <div className="worring_r">請輸入註冊密碼</div>
                                </div>
                                <div className="btn_box_r">
                                    <button className="registered_btn"><div>註冊</div></button>
                                </div>
                                <div className="word_r">已有帳號?</div>
                                <div className="btn_box_r">
                                    <button className="registered_r sign_up_r"><div>登入</div></button>                    
                                </div>
                            </div>
                        </div>

                        <div className="turn place">
                            {/* 會員登入 */}
                                <div className="login_f place slide_f_animate front">
                                    <div className="login_word">會 員 登 入</div>
                                    <div className="account_box">
                                        <div className="account_1">帳號：</div>
                                        <input type="text" className="account_2" placeholder="請輸入Mail"/>
                                    </div>
                                    <div className="password_box">
                                        <div className="password_1">密碼：</div>
                                        <input type="password" className="password_2"/>
                                    </div>
                                    <button className="login_btn"><div >登入</div></button>
                                    <div className="btn_box">
                                        <button  className="registered sign_up"><div>註冊</div></button>
                                        <button  className="registered forget_p"><div>忘記密碼</div></button>
                                    </div>
                                </div>


                            {/* 忘記密碼 */}
                                <div className="login_f_p place slide_f_animate back">
                                    <div className="login_word_p">忘 記 密 碼</div>
                                    <div className="account_box_p">
                                        <div className="account_1_p">註冊帳號：</div>
                                        <input type="text" className="account_2_p" placeholder="請輸入Mail"/>
                                    </div>
                                    <div className="worring_box_p">
                                            <div className="worring_p">請輸入註冊帳號</div>
                                    </div>
                                    <button className="login_btn_p"><div>確認送出</div></button>
                                    <div className="btn_box_p">
                                        <button  className="registered_p  sign_up sign_up_2"><div>註冊</div></button>
                                        <button  className="registered_p  login_btn_t"><div>登入</div></button>
                                    </div>
                                </div>                 
                            </div>

                 </div>
            </section>
        );
    }
}

export default Member ;