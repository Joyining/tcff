import React, {Component} from 'react' ;
import '../sass/registered.scss';

class Registered extends Component{
    render(){
        return(
            <section className="container">
                <div className="login_f">
                    <div className="login_word">會 員 註 冊</div>
                    <div className="account_box">
                        <div className="account_1">帳號：</div>
                        <input type="text" className="account_2" placeholder="請輸入Mail"/>
                    </div>
                    <div className="worring_box">
                        <div className="worring">請輸入正確的Mail格式</div>
                    </div>
                    <div className="password_box">
                        <div className="password_1">密碼：</div>
                        <input type="password" className="password_2" placeholder="請輸入至少六字元"/>
                    </div>
                    <div className="worring_box">
                        <div className="worring">請輸入至少六字元</div>
                    </div>
                    <div className="password_box">
                        <div className="password_1">再次確認密碼：</div>
                        <input type="password" className="password_2"placeholder="請再次輸入註冊密碼"/>
                    </div>
                    <div className="worring_box">
                        <div className="worring">請輸入註冊密碼</div>
                    </div>
                    <a href=""><div className="login_btn">註冊</div></a>
                    <div className="word">已有帳號?</div>
                    <div className="btn_box">
                        <a href="" ><div className="registered">登入</div></a>                    
                    </div>
                </div>
                <div className="login_b"></div>
            </section>
        );
    }
}

export default Registered ;