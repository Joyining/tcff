import React, {Component} from 'react' ;
import '../sass/registered.scss';

class Registered extends Component{
    render(){
        return(
            <section className="container">
                <div className="registered_f">
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
                    <a href=""><div className="registered_btn">註冊</div></a>
                    <div className="word_r">已有帳號?</div>
                    <div className="btn_box_r">
                        <a href="" ><div className="registered_r">登入</div></a>                    
                    </div>
                </div>
                <div className="login_b"></div>
            </section>
        );
    }
}

export default Registered ;