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
      // email: "",
      // password: "",
      // message: { email: "", password: "" },

      // account: "",
      // password_acc: "",
      // message: { account: "", password_acc: "" }
    };
    this.flipToReg = this.flipToReg.bind(this);
    this.fliptoForget = this.fliptoForget.bind(this);
    this.flipFromForgetToLog = this.flipFromForgetToLog.bind(this);
    this.flipFromForgetToReg = this.flipFromForgetToReg.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
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
                // let films = [];
                // let cfFilms = [];
                // let newCollection = {
                //   films: films,
                //   cffilms: cfFilms,
                // }
                // sessionStorage.setItem("collection", JSON.stringify(newCollection));

                // this.props.history.goBack();
                // window.history.back();
            }
        });
}

registerSubmit(evt) {
  let emailRegister = document.getElementById("email_reg");
  let passwordRegister = document.getElementById("password_reg");
  let nicknameRegister = document.getElementById("nickname_reg");
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
        alert('register success');
        console.log(sessionStorage.getItem('user'));
        this.props.history.push("/member");
        this.flipToReg();
      }
    });
}



  render() {
    return (
      <section className="container-member2">
        <div className="card-container">
          <div className="card log-reg transition" id="card1">
            {/* <div className="inner-wrap"> */}
            <form action="" className="inner front log" id="login">
              <div className="title">會員登入</div>
              <div className="">
                <label htmlFor="email_log">帳號</label>
                <input
                  type="text"
                  id="email_log"
                  placeholder="請輸入您的email帳號"
                />
              </div>
              <div className="">
                <label htmlFor="password_log">密碼</label>
                <input
                  type="password"
                  id="password_log"
                  placeholder="請輸入您的密碼"
                />
              </div>

              <input type="button" onClick={this.loginSubmit} value="登入"/>
              <div className="btn-group">
                <div className="btn reg-btn" onClick={this.flipToReg}>
                  註冊
                </div>
                <div className="btn forget-btn" onClick={this.fliptoForget}>
                  忘記密碼
                </div>
              </div>
            </form>
            <form className="inner back reg" id="register">
              <div className="title">會員註冊</div>
              <div className="">
                <label htmlFor="email_reg">帳號</label>
                <input
                  type="text"
                  id="email_reg"
                  placeholder="請輸入您的email帳號"
                />
              </div>
              <div className="">
                <label htmlFor="nickname_reg">暱稱</label>
                <input
                  type="text"
                  id="nickname_reg"
                  placeholder="請輸入一個三個字元內的暱稱"
                />
              </div>
              <div className="">
                <label htmlFor="password_reg">密碼</label>
                <input
                  type="password"
                  id="password_reg"
                  placeholder="請輸入您的密碼"
                />
              </div>
              <div className="">
                <label htmlFor="password_check">密碼確認</label>
                <input
                  type="password"
                  id="password_check"
                  placeholder="請再次輸入您的密碼"
                />
              </div>

              <input type="button" onClick={this.registerSubmit} value="註冊會員" />
              <div>已有帳號?</div>
              <div className="btn-group">
                <div className="btn log-btn" onClick={this.flipToReg}>
                  登入
                </div>
              </div>
            </form>
            {/* </div> */}
          </div>

          <div className="card bg-forget transition" id="card2">
            <div className="inner front bg">background</div>
            <form className="inner back forget" id="forget">
                <div className="title">忘記密碼</div>
                <div className="">
                    <label htmlFor="email_forget">您的註冊帳號</label>
                    <input
                        type="text"
                        id="email_forget"
                        placeholder="請輸入您註冊的email帳號"
                    />
                </div>
                <button>確認送出</button>
                <div className="btn-group">
                    <div className="btn reg-btn" onClick={this.flipFromForgetToReg}>註冊</div>
                    <div className="btn log-btn"onClick={this.flipFromForgetToLog}>登入</div>
                </div>


            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Member2);