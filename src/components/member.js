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

    }

    render(){
        return(
            <section className="containerr">
                <div className="container-member">

                    <div className="turn_b">
                        <div className="login_b place back_animate"></div>
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
                                    <button  className="registered"><div>註冊</div></button>
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
                                <button className="login_btn_p"><div>確認送出</div></button>
                                <div className="btn_box_p">
                                    <button  className="registered_p"><div>註冊</div></button>
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