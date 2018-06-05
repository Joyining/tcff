import React, {Component} from 'react' ;
import '../sass/member.scss';
import $ from 'jquery';
import { width } from 'window-size';

class Member extends Component{
    constructor(props){
        super(props) ;
        this.state = {value: ''};

        // this.ChangeValue = this.ChangeValue.bind(this) ;
        this.checkAccount = this.checkAccount.bind(this) ;
    }


    handleChange(event){
        const state = this.state;
        state[event.target.id] = event.target.value;
        this.setState(state);
    }

    checkAccount(){           
    
                var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                var email = $('#mail_use').value;
                var password = $('#password_use').value;
                var isPass = true;

                
                console.log($('#mail_use')) ;
    
  
                if(! pattern.test(email) ){
                    $('#worring_mail').removeClass('display')
                    isPass = false;    
                }

                // if( password.length<6 ){
                //     $('#worring_password').removeClass('.display');
                //     isPass = false;    
                // }
    
                return isPass;
                       
    }

    login(){   

            var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            var email = $('#mail_use').value;
            var password = $('#password_use').value;
            var isPass = true;


            // if( password.length<6 ){
            //     $('.login_btn').Css("disabled","disabled");
            //     isPass = false;    
            // }
    
           if(! pattern.test(email) ){
                 $('.login_btn').attr('disabled', 'disabled');
                //  console.log("BTN") ;
                isPass = false;    
            }  

            return isPass;       
        
    }

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
            $('.login_f_p').empty();
            $('.login_f').empty();
        })

        $('.sign_up_r').click(function(){
            $('.turn_b').toggleClass('sign_up_down_flip');
            $('.turn').toggleClass('sign_up_flip');
            $('.login_f').append();
            $('.login_f_p').append();
            $('.turn').css("z-index","1") ;
            
        })

        

    }



    render(){
        return(
            <section className="container">
                <div className="container-member">

                        <div className="turn_b front">
                            <div className="login_b place back_animate"></div>

                        {/* 會員註冊 */}
                            <div className="registered_f back_animate back_r ">
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
                                    <div className="password_r_1 password_mo">再次確認密碼：</div>
                                    <input type="password" className="password_r_2"placeholder="請再次輸入註冊密碼"/>
                                </div>
                                <div className="worring_box_r">
                                    <div className="worring_r">請輸入註冊密碼</div>
                                </div>
                                <div className="btn_box_r">
                                    <button className="registered_btn mouse"><div>註冊</div></button>
                                </div>
                                <div className="word_r">已有帳號?</div>
                                <div className="btn_box_r">
                                    <button className="registered_r sign_up_r mouse"><div>登入</div></button>                    
                                </div>
                            </div>
                        </div>

                        <div className="turn place">
                            {/* 會員登入 */}
                                <div className="login_f place slide_f_animate front" name="form">
                                    <div className="login_word">會 員 登 入</div>
                                    <div className="account_box">
                                        <div className="account_1">帳號：</div>
                                        <input type="text" className="account_2" id="mail_use" placeholder="請輸入Mail" value={this.state.mail} onChange={this.handleChange} onBlur={this.checkAccount}/>
                                    </div>
                                    <div className="worring_box_l">
                                            <div className="worring_l hide_use display" id="worring_mail" >Mail格式錯誤</div>
                                    </div>
                                    <div className="password_box pass">
                                        <div className="password_1">密碼：</div>
                                        <input type="password" className="password_2" id="password_use" placeholder="請輸入密碼" value={this.state.password}  onChange={this.handleChange} onBlur={this.checkAccount}/>
                                    </div>
                                    <div className="worring_box_l">
                                            <div className="worring_l hide_use display" id="worring_password">請輸入密碼</div>
                                    </div>
                                    <button className="login_btn mouse" onClick={this.login}><div >登入</div></button>
                                    <div className="btn_box">
                                        <button  className="registered sign_up mouse"><div>註冊</div></button>
                                        <button  className="registered forget_p mouse"><div>忘記密碼</div></button>
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
                                    <button className="login_btn_p mouse"><div>確認送出</div></button>
                                    <div className="btn_box_p">
                                        <button  className="registered_p sign_up mouse"><div>註冊</div></button>
                                        <button  className="registered_p login_btn_t mouse"><div>登入</div></button>
                                    </div>
                                </div>                 
                            </div>

                 </div>
            </section>
        );
    }
}

export default Member ;