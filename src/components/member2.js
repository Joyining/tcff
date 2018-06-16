import React, {Component} from 'react' ;
import '../sass/member2.scss';

// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   NavLink
// } from "react-router-dom";

import { withRouter } from "react-router";

class Member2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password_log: "",
      message: { email: "", password_log: "" },

      account: "",
      password_reg: "",
      password_again:"",
      nickname:"",
      message: { account: "", password_acc: "", password_acc_again: "",nickname:"" }
    };
    this.handleChange = this.handleChange.bind(this);   
    this.handleChange2 = this.handleChange2.bind(this);   
    this.validate = this.validate.bind(this);  

    this.flipToReg = this.flipToReg.bind(this);
    this.fliptoForget = this.fliptoForget.bind(this);
    this.flipFromForgetToLog = this.flipFromForgetToLog.bind(this);
    this.flipFromForgetToReg = this.flipFromForgetToReg.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
  }

handleChange(event){
    const state = this.state;
    state[event.target.id] = event.target.value;         
    this.setState(state);
  }
  handleChange2(event){
    const state = this.state;
    const pw = state.password_log;

    console.log(state.password_log===event.target.value);
    const password_acc_ag = document.querySelector('#password_acc_ag');

    if(state.password_log===event.target.value){
      password_acc_ag.innerHTML = '';
    } else {
      password_acc_ag.innerHTML = '請輸入註冊密碼';
    }
  }

validate(event){
    switch (event.target.name){
        case "email":
            this.emailCheck();
            break;
        case "password":
            this.passwordCheck();
            break;
        case "account":
            this.accountCheck();
            break;
        case "password_reg":
            this.passwordAccCheck();
            break;
        case "password_acc_ag":
            this.passwordAccCheckAgain();
            break;
        case "nickname":
          this.nicknameCheck();
          break;
        default:
            break;
    } 
}

emailCheck(){
    const pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const error = this.state.message;     
    //pattern.test(this.state.email) ? error.email = "" : error.email = "email格式不正確";
    pattern.test(this.state.email_log) ? error.email = "" : error.email = "email格式不正確";
    this.setState({message:error});
    // console.log(pattern.test(this.state.email_log), this.state.email_log);
}
passwordCheck(){
    const pwd = this.state.password_log;
    const error = this.state.message;
    pwd.length >=6 ? error.password = "" : error.password = "密碼至少有6個字元";
    this.setState({message:error});
    // console.log(pwd,pwd.length, error);
}

accountCheck(){
  const pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const error = this.state.message
  pattern.test(this.state.email_reg) ? error.account = "" : error.account = "email格式不正確";
  this.setState({message:error})
}

passwordAccCheck(){
  console.log(pwd)
  const pwd = this.state.password_reg;
  const error = this.state.message
  pwd.length >=6 ? error.password_acc = "" : error.password_acc= "請輸入至少6字元";
  this.setState({message:error})
}

// not working
passwordAccCheckAgain(){
  const pwdagain = this.state.password_again;
  const pwd = this.state.password_reg ;
  const error = this.state.message ;
  pwdagain === pwd ? error.password_acc_again = "" : error.password_acc_again = "再次輸入的密碼不正確";
  this.setState({message:error})
}

nicknameCheck() {
  const nickname = this.state.nickname;
  const error = this.state.message;
  nickname.length >= 1 ? (error.nickname = "") : (error.nickname = "請輸入您的暱稱");
  this.setState({ message: error })
}


flipToReg() {
    console.log("flip to reg");
    let card1 = document.querySelector("#card1");
    card1.classList.toggle("active");
  }
fliptoForget(){
      console.log("flip to forget");
      let card2 = document.querySelector("#card2");
      card2.classList.toggle("active");
  };
flipFromForgetToLog(){
    console.log("flip from forget to login");
    let card2 = document.querySelector("#card2");
    card2.classList.toggle("active");
}
flipFromForgetToReg() {
    console.log("flip from forget to reg");
    let card2 = document.querySelector("#card2");
    card2.classList.toggle("active");
    let card1 = document.querySelector("#card1");
    card1.classList.toggle("active");
}

loginSubmit(evt) {
    let emailLogin = document.getElementById("email_log");
    let passwordLogin = document.getElementById("password_log");
    let json = {};
    json["email"] = emailLogin.value;
    json["password"] = passwordLogin.value;
    let url = `http://192.168.39.110/tcff_php/api/members/login.php`;
    let body = JSON.stringify(json);
    fetch(url, {
        method: "POST",
        body: JSON.stringify(json),
    }).then(res => res.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('user', JSON.stringify(data.user));
                console.log(sessionStorage.getItem('user'));

                // 更新collection
                let collection = JSON.parse(sessionStorage.getItem("collection"));
                // 未登入狀態collection已有片
                if (collection !== null) {
                  let userJson = JSON.parse(sessionStorage.getItem("user"));
                  console.log(collection);
                  console.log(collection['films'].length);
                  let json = {};
                  json["id"] = userJson.id;
                  json["id_movie"] = [];
                  for (let i = 0; i < collection["films"].length; i++) {
                    console.log(collection["films"][i]["id_movie"]);
                    json["id_movie"].push(collection["films"][i]["id_movie"]);
                  }
                  for (let i = 0; i < collection["cffilms"].length; i++) {
                    console.log(collection["cffilms"][i]["id_movie"]);
                    json["id_movie"].push(collection["cffilms"][i]["id_movie"]);
                  }
                  console.log(json);

                  let url = `http://192.168.39.110/tcff_php/api/cart/collection.php`;
                  fetch(url, { method: "PUT", body: JSON.stringify(json) })
                    .then(res => res.json())
                    .then(data => {
                      // 該帳號之前登入時收藏的影片有目前collection沒收到的
                      if (data.collection_info) {
                        console.log("put success");
                        console.log(data.collection_info);
                        let collectionInfos = data.collection_info;
                        let films = [];
                        let cfFilms = [];
                        Array.from(collectionInfos).forEach(
                          collectionInfo => {
                            console.log(collectionInfo);
                            if (
                              collectionInfo.cf == "0"
                            ) {
                              films.push(collectionInfo);
                            } else {
                              cfFilms.push(
                                collectionInfo
                              );
                            }
                          }
                        );
                        console.log(films);

                        let newCollection = { films: films, cffilms: cfFilms };
                        sessionStorage.setItem("collection", JSON.stringify(newCollection));
                        this.props.history.goBack();
                      } // 該帳號之前登入時收藏的影片"沒有"目前collection沒收到的
                      else if (data.message == "nothing to update") {
                        fetch(`http://192.168.39.110/tcff_php/api/cart/collection.php?id=${JSON.parse(sessionStorage.getItem("user")).id}`)
                          .then(res => res.json())
                          .then(data => {
                            console.log("顯示全部收藏");
                            console.log(data);
                            let films = [];
                            let cfFilms = [];
                            Array.from(data).forEach(
                              el => {
                                if (el.cf == "0") {
                                  films.push(el);
                                } else {
                                  cfFilms.push(el);
                                }
                              }
                            );

                            let newCollection = { films: films, cffilms: cfFilms };
                            sessionStorage.setItem("collection", JSON.stringify(newCollection));
                            this.props.history.goBack();
                          });
                      }
                    });
                }// 未登入狀態collection沒有片
                else{
                  fetch(`http://192.168.39.110/tcff_php/api/cart/collection.php?id=${JSON.parse(sessionStorage.getItem("user")).id}`)
                    .then(res => res.json())
                    .then(data => {
                      console.log('顯示全部收藏');
                      console.log(data);
                      let films = [];
                      let cfFilms = [];
                      Array.from(data).forEach(el => {
                        if (el.cf == "0") {
                          films.push(el);
                        } else {
                          cfFilms.push(el);
                        }
                      })

                      let newCollection = {
                        films: films,
                        cffilms: cfFilms,
                      }
                      sessionStorage.setItem("collection", JSON.stringify(newCollection));
                      this.props.history.goBack();
                    });
                }
            }else{
              alert("帳號或密碼有誤，請重新登入");
            }
        });
}

registerSubmit(evt) {
  let emailRegister = document.getElementById("email_reg");
  let passwordRegister = document.getElementById("password_reg");
  let nicknameRegister = document.getElementById("nickname");
  let json = {};
  json["username"] = nicknameRegister.value;
  json["email"] = emailRegister.value;
  json["password"] = passwordRegister.value;
  console.log("json:", json)
  let url = `http://192.168.39.110/tcff_php/api/members/signup.php`;
  let body = JSON.stringify(json);
  console.log(body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
  }).then(res => res.json())
    .then(data => {
      console.log('res', data);
      if (data.success) {
        // sessionStorage.setItem('user', JSON.stringify(data.user));
        alert('註冊成功');
        console.log(sessionStorage.getItem('user'));
        this.props.history.push("/member");
        this.flipToReg();
      } else {
        alert("註冊所需資訊有誤，請重新輸入");
      }
    });
}



  render() {
    return (
      <section className="container-member2">
        <div className="card-container">
          <div className="card log-reg transition" id="card1">
            {/* <div className="inner-wrap"> */}

            {/* 會員登入 */}
            <form action="" className="inner front log" id="login">
                <div className="title">會 員 登 入</div>

                <div className="input_box">
                    <label htmlFor="email"  className="account_1">帳號：</label>
                    <input type="text" id="email_log" name="email" className="account_2"  placeholder="請輸入您的email帳號"  value={this.state.email_log} onChange={this.handleChange} onBlur={this.validate} />
                </div>
                <div className="warning_box hide_use">
                    <div className="worring_l" id="worring_mail" >{this.state.message.email}</div>
                </div>

                <div className="input_box pass hide_use">
                  <label htmlFor="password_log" className="password_1">密碼：</label>
                  <input  type="password"  id="password_log" name="password" className="password_2" placeholder="請輸入您的密碼" value={this.state.password_log} onChange={this.handleChange} onBlur={this.validate} />
                </div>
                <div className="warning_box hide_use">
                    <div className="worring_l" id="worring_password">{this.state.message.password}</div>
                </div>

                <div className="btn mouse hide_use" id="login-btn" onClick={this.loginSubmit}>登入</div>

                <div className="btn_group">
                  <div className="btn_switch sign_up mouse" onClick={this.flipToReg}>註冊</div>
                  <div className="btn_switch forget_p mouse" onClick={this.fliptoForget}>忘記密碼</div>
                </div>
            </form>

            {/* 會員註冊 */}
            <form className="inner back reg" id="register">
              <div className="title">會 員 註 冊</div>
              <div className="input_box">
                <label htmlFor="email_reg" className="account_r">帳號：</label>
                <input  type="text" id="email_reg" name="account" className="account_r_2" placeholder="請輸入您的email帳號"  onBlur={this.validate} value={this.state.email_reg} onChange={this.handleChange} />
              </div>
              <div className="warning_box">
                <div className="worring_r">{this.state.message.account}</div>
               </div>
              <div className="input_box">
                <label htmlFor="nickname_reg">暱稱：</label>
                <input
                  type="text"
                  id="nickname"
                  placeholder="請輸入您的暱稱"
                  name="nickname" value={this.state.nickname} onChange={this.handleChange} onBlur={this.validate}
                />

              </div> 
              <div className="password_box_r">
                <div className="password_r_1"  htmlFor="password_reg"><label>密碼：</label></div>
                <input  type="password"  id="password_log" name="password" className="password_2" placeholder="請輸入您的密碼" value={this.state.password_log} onChange={this.handleChange} onBlur={this.validate} />
              </div>
              <div className="worring_box_r">
                <div className="worring_r">{this.state.message.password}</div>
              </div>

              <div className="password_box_r">
                <div  className="password_r_1 password_mo" htmlFor="password_check"><label>密碼確認：</label></div>
                <input  type="password"  id="password_check" name="password_acc_ag" className="password_r_2" placeholder="請再次輸入您的密碼"  onChange={this.handleChange2} onBlur={this.handleChange2} />
              </div>
              <div className="worring_box_r">
                 <div className="worring_r" id="password_acc_ag">{this.state.message.password_acc_ag}</div>

              </div>

              <div className="btn mouse" onClick={this.registerSubmit}>註冊</div>

              <div className="already_register">已有帳號?</div>
              <div className="btn_group">
                  <div className="btn_switch sign_up_r mouse" onClick={this.flipToReg}><div>登入</div></div>            
              </div>
            </form>
            {/* </div> */}
          </div>

           {/* 忘記密碼 */}
          <div className="card bg-forget transition" id="card2">
            <div className="inner front bg"> </div>
            <form className="inner back forget" id="forget">
              <div className="title hide_use ">忘 記 密 碼</div>

                <div className="input_box hide_use">
                    <label htmlFor="email_forget" className="account_1_p">註冊帳號：</label>
                    <input type="text" id="email_forget" className="account_2_p"  placeholder="請輸入email"  />
                </div>

                <div className="btn mouse hide_use">確認送出</div>

                <div className="btn_group hide_use">
                    <div className="btn_switch sign_up mouse" onClick={this.flipFromForgetToReg}> <div>註冊</div></div>
                    <div className="btn_switch login_btn_t mouse" onClick={this.flipFromForgetToLog}><div>登入</div></div>
                </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Member2);