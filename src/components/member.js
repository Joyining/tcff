import React, {Component} from 'react' ;
import '../sass/member.scss';
import $ from 'jquery';

class Member extends Component{
    componentDidMount(){

    }

    render(){
        return(
            <section className="container">
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
                    <a href=""><div className="login_btn">登入</div></a>
                    <div className="btn_box">
                        <a href="" ><div className="registered">註冊</div></a>
                        <a href="" ><div className="registered">忘記密碼</div></a>
                    </div>
                </div>

            {/* 忘記密碼 */}
                 <div className="login_f_p">
                    <div className="login_word_p">忘 記 密 碼</div>
                    <div className="account_box_p">
                        <div className="account_1_p">帳號：</div>
                        <input type="text" className="account_2_p" placeholder="請輸入Mail"/>
                    </div>
                    <div className="password_box_p">
                        <div className="password_1_p">密碼：</div>
                        <input type="password" className="password_2_p"/>
                    </div>
                    <a href=""><div className="login_btn_p">登入</div></a>
                    <div className="btn_bo_px">
                        <a href="" ><div className="registered_p">註冊</div></a>
                        <a href="" ><div className="registered_p">忘記密碼</div></a>
                    </div>
                </div>

                <div className="login_b"></div>
            </section>
        );
    }
}

export default Member ;