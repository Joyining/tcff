import React, {Component} from 'react' ;
import '../sass/member.scss';
import $ from 'jquery';

class Member extends Component{
    componentDidMount(){

    }

    render(){
        return(
            <section className="container container-member">
                <div className="login_f">
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
                        <a href="" ><div className="registered">註冊</div></a>
                        <a href="" ><div className="registered">忘記密碼</div></a>
                    </div>
                </div>

            {/* 忘記密碼 */}
                 <div className="login_f_p">
                    <div className="login_word_p">忘 記 密 碼</div>
                    <div className="account_box_p">
                        <div className="account_1_p">註冊帳號：</div>
                        <input type="text" className="account_2_p" placeholder="請輸入Mail"/>
                    </div>
                    <button className="login_btn_p"><div>確認送出</div></button>
                    <div className="word_m">已有帳號？</div>
                    <div className="btn_box_p">
                        <a href="" ><div className="registered_p">註冊</div></a>
                        <a href="" ><div className="registered_p">登入</div></a>
                    </div>
                </div>

                <div className="login_b"></div>
            </section>
        );
    }
}

export default Member ;