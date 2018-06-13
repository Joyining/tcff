import React, { Component } from 'react';
import Cb from './cb';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import '../myfilm/tab1.scss';

class Tab1 extends Component {
  constructor(props){
    super(props);
    // this.changeTab = this.changeTab.bind(this);
    this.del_collection = this.del_collection.bind(this);
    this.add_collection = this.add_collection.bind(this);
    this.add_item = this.add_item.bind(this);
    this.checkAll = this.checkAll.bind(this); 
    this.checkItem = this.checkItem.bind(this); 
    this.cancelOverlay = this.cancelOverlay.bind(this); 
    this.nextStep = this.nextStep.bind(this); 
    // this.tab = document.querySelectorAll(".myfilmPage>div")
    this.state = {
      films:[],
      cffilms:[],
      add_cffilms:[],
      add_films: [],
      all_films: [],
      all_cffilms:[],
      dialog: {
        show: false,
        id_movie: "",
        name: "",
        cf: 0
      }
    };
    this.temp = [];
  }
  componentDidMount(){
    window.scrollTo(0, 0);

    if (sessionStorage.getItem('user') !== null){
      let id = JSON.parse(sessionStorage.getItem('user')).id;
      // fetch(`http://192.168.39.110/tcff_php/api/cart/collection.php?id=` + id)
      fetch(`http://localhost/tcff_php/api/cart/collection.php?id=` + id)
      // fetch(`${process.env.PUBLIC_URL}/json/collection.json`)
        // .then(res => console.log(res.text()))
        .then(res => res.json())
        .then(datas => {
          let films = [];
          let cffilms = [];
          console.log(datas);
          datas.forEach(data => {
            if(data.cf == 1){
              cffilms.push(data);
            }else{
              films.push(data);
            }
          })
          console.log(films,cffilms);
          this.setState({
            films: films,
            cffilms: cffilms
          });
          let collection = {
            films: films,
            cffilms: cffilms
          };
          sessionStorage.setItem("collection", JSON.stringify(collection));

          // console.log(this.state);
        })
        .catch(function (error) {
          console.log('There has been a problem with your fetch operation: ', error.message);
        })
      }else{
        let collection = sessionStorage.getItem("collection");
        let id_movie = [];
        let url = `http://192.168.39.110/tcff_php/api/cart/collection.php/`;
        
        if(collection !== null){
          let films = JSON.parse(collection).films;
          let cffilms = JSON.parse(collection).cffilms;
          // console.log(films,cffilms)
          let films_id = films.reduce((a,x) => {
                  a.push(x.id_movie)
                  // console.log(a,x,x.id_movie)
                  return a
                },[])
          // console.log(films_id)
          let cffilms_id = cffilms.reduce((a, x) => {
                  a.push(x.id_movie)
                  return a
                }, [])
          // console.log(films_id,cffilms_id)
          id_movie = films_id.concat(cffilms_id);
          id_movie = id_movie.join("_");
          console.log(id_movie);
          url += id_movie;
          // console.log(url)
          fetch(url)
            .then(res => res.json())
            .then(datas => {
              console.log(datas);
              let films = datas.filter(x => x.cf === '0');
              let cffilms = datas.filter(x => x.cf === '1');
              // console.log(films,cffilms)
              let collection = {
                films: films,
                cffilms: cffilms
              }
              sessionStorage.setItem("collection", JSON.stringify(collection));

              this.setState(collection)
            })
            .catch(err => console.log(err.message))
          // this.setState({
          //   films: films,
          //   cffilms: cffilms
          // });
        }
      }

      // let body = document.getElementsByTagName('body')[0];
      // let fragment = document.createDocumentFragment();
      // let str_el = "";
      // fragment.appendChild(str_el);
      // body.appendChild(fragment);
  }
  componentDidUpdate(){
    console.log('didupdate');
    Array.from(document.querySelectorAll(".cb input")).forEach(cb => cb.checked = true);
    // let collection = sessionStorage.getItem('collection');
    // sessionStorage.setItem('cart', collection);
    console.log()
  }
  cancelOverlay(event){
    let target = event.target;
    //cancel overlay
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.classList.remove('show');

    //set result into state
    //...
    // let newFilms = [];

    if (target.value === "確定") {
      let origin_ar = this.state.films;
      let add_ar = this.state.add_films;
      add_ar.forEach(ar => {
        origin_ar.push(ar);
      })
      //清空增加的清單
      add_ar.length = 0;
      //setState -> re-render
      this.setState({
        films: origin_ar,
        add_films: add_ar
      });
      // this.setState(add_ar);

      console.log(this.state);
      this.temp.length = 0;
    // console.log(target.value)
      // console.log("send and fetch")
    } else {
      let add_ar = this.state.add_films;
      add_ar.length = 0;
      this.setState({
        add_films: add_ar
      });
      this.temp.map(item => {
        item.classList.remove("selected");
        item.classList.add("notSelected");
      })
    }
    console.log("temp", this.temp);

    //send collection to db
    //...


  }
  checkAll(event){
    let target = event.target;
    let section = target.previousSibling.id.slice(0,-2);
    let isCheck = !target.previousSibling.checked;
    let table = target.closest("table");
    let cbs = table.querySelectorAll(".checkItem input");
    //if isCheck=true, let all item checked
    //vice versa
    Array.from(cbs).forEach(function(cb){
      cb.checked = isCheck;
    })
    // let collection = JSON.parse(sessionStorage.getItem('collection'));
    // let cart = JSON.parse(sessionStorage.getItem('cart'));
    // console.log("section", section);
    // //collection 都加入 cart
    // if(isCheck){
    //   collection[section].forEach(x => {
    //     if(cart[section].includes(x)) return;
    //     else cart[section].push(x);
    //   })
    // //cart清空
    // }else{
    //   cart[section].length = 0;
    // }
    // sessionStorage.setItem("cart",JSON.stringify(cart));
  }
  checkItem(event) {
    let target = event.target;
    let inputFor = target.getAttribute("for");
    let isCheck = target.previousSibling.checked;
    console.log(isCheck);
    let tbody = target.closest("tbody");
    let allItemChecked = isCheck ? tbody.querySelectorAll('input:checked').length - 1 : tbody.querySelectorAll('input:checked').length+1;
    let allItem = tbody.querySelectorAll('input').length;
    let checkAll = target.closest("table").querySelector('thead input');    
    //if all item checked, let checkAll box checked
    //vice versa
    checkAll.checked = (allItemChecked === allItem);


    // let collection = JSON.parse(sessionStorage.getItem('collection'));
    // let cart = JSON.parse(sessionStorage.getItem('cart'));
    // let id = target.getAttribute('data-id-movie');
    // let section = target.closest('table').classList[0];
    // if(isCheck){
    //   cart[section] = cart[section].filter((x) => {
    //     return x.id_movie !== id;
    //   })
    // }else{
    //   cart[section].push(collection[section].filter((x)=> x.id_movie === id));
    // }
    // sessionStorage.setItem('cart', JSON.stringify(cart));
  }
  del_collection(event){
    //打開confirm box傳值進去
    if (event.currentTarget.classList.contains("trash")){
      let dialog = this.state.dialog;
      let id = event.currentTarget.getAttribute("data-id-movie");
      let name = event.currentTarget.getAttribute("data-name");
      let cf = event.currentTarget.getAttribute("data-cf");
      dialog.show = true;
      dialog.id_movie = id;
      dialog.name = name;
      dialog.cf = cf;
      this.setState({ dialog: dialog })
      // console.log("dialog", this.state.dialog);

    //確定刪除
    } else if (event.currentTarget.classList.contains("doAction")){
      let user = sessionStorage.getItem('user');
      let id_user = user === null ? undefined : JSON.parse(user).id;
      let url = "";
      let dialog = this.state.dialog;
      let id_movie = event.currentTarget.getAttribute("data-id-movie");
      let cf = event.currentTarget.getAttribute("data-cf");
      
      //登入
      if (id_user !== undefined) {
        url = `http://localhost/tcff_php/api/cart/collection.php/${id_movie}/${id_user}`;
        fetch(url, {
          method: "DELETE",
          headers: {
            "Access-Control-Request-Headers": "X-PINGOTHER, Content-Type",
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          mode: 'cors'
        })
          .then(res => res.json())
          .then(data => {
            console.log("m: ", data.message);
            if (data.message === "delete 1 data") {
              //刪Storage的collection
              let collection = JSON.parse(sessionStorage.getItem('collection'));
              collection.films = collection.films.filter(x => x.id_movie !== id_movie);
              sessionStorage.setItem("collection", JSON.stringify(collection));

              if (cf === "0") {
                let ar = this.state.films;
                //remove a film 
                ar = ar.filter((obj) => {
                  return (obj["id_movie"] != id_movie)
                })
                // console.log(id, ar);
                //setState -> re-render
                this.setState({
                  films: ar
                });
              } else {
                let ar = this.state.cffilms;
                //remove a film 
                ar = ar.filter((obj) => {
                  return (obj["id_movie"] != id_movie)
                })
                // console.log(id, ar);
                //setState -> re-render
                this.setState({
                  cffilms: ar
                });
              }

              //加入片單中，選項回復未被選擇狀態
              let item = Array.from(document.querySelectorAll('.item'))[id_movie - 1]; //item要照id排序才能選到正確的
              if (item) {
                item.classList.remove("selected");
                item.classList.add("notSelected");
              }

              dialog.show = false;
              this.setState({ dialog: dialog })
              

              //改變購物車數字 collectionNum
              this.props.updatecollectionNum();
            }
          })
          .catch(err => console.log(`error with fetch: ` + err.message))
      } else { //未登入
        if (cf === "0") {
          let ar = this.state.films;
          //remove a film 
          ar = ar.filter((obj) => {
            return (obj["id_movie"] != id_movie)
          })
          // console.log(id, ar);
          //setState -> re-render
          let collection = JSON.parse(sessionStorage.getItem("collection"));
          collection.films = ar;
          sessionStorage.setItem("collection", JSON.stringify(collection));

          this.setState({
            films: ar
          });
        } else {
          let ar = this.state.cffilms;
          //remove a film 
          ar = ar.filter((obj) => {
            return (obj["id_movie"] != id_movie)
          })

          let collection = JSON.parse(sessionStorage.getItem("collection"));
          collection.films = ar;
          sessionStorage.setItem("collection", JSON.stringify(collection));

          // console.log(id, ar);
          //setState -> re-render
          this.setState({
            cffilms: ar
          });
        }

        //加入片單中，選項回復未被選擇狀態
        let item = Array.from(document.querySelectorAll('.item'))[id_movie - 1]; //item要照id排序才能選到正確的
        if (item) {
          item.classList.remove("selected");
          item.classList.add("notSelected");
        }

        dialog.show = false;
        this.setState({ dialog: dialog })

        //改變購物車數字 collectionNum
        this.props.updatecollectionNum();
      }

      /////
      // console.log(cf)
      

      
    } else if (event.currentTarget.classList.contains("cancelAction") || event.currentTarget.classList.contains("fa-times")){
      let dialog = this.state.dialog;
      dialog.show = false;
      this.setState({ dialog: dialog })
    }
    // confirm
    //...
    // let dialog = this.state.dialog;
    // let id = event.target.getAttribute("data-id-movie");
    // let name = event.target.getAttribute("data-name");
    // dialog.show = true;
    // dialog.id_movie = id;
    // dialog.name = name;
    // this.setState({ dialog: dialog})

    //remove item
    // let tr = event.target.closest('tr');
    // tr.remove();
    // let isFilms = event.target.closest("table").classList.contains("films");
    
    // // console.log(isFilms);

    // if(isFilms){
    //   let ar = this.state.films;
    //   //remove a film 
    //   ar = ar.filter((obj) => {
    //     return (obj["id_movie"] != id)
    //   })
    //   // console.log(id, ar);
    //   //setState -> re-render
    //   this.setState({
    //     films: ar
    //   });
    // }else{
    //   let ar = this.state.cffilms;
    //   //remove a film 
    //   ar = ar.filter((obj) => {
    //     return (obj["id_movie"] != id)
    //   })
    //   // console.log(id, ar);
    //   //setState -> re-render
    //   this.setState({
    //     cffilms: ar
    //   });
    // }

    // //加入片單中，選項回復未被選擇狀態
    // let item = Array.from(document.querySelectorAll('.item'))[id-1]; //item要照id排序才能選到正確的
    // if(item){
    //   item.classList.remove("selected");
    //   item.classList.add("notSelected");
    // }

    // console.log(item);

    //if removed, then send result to db
    //...
  }
  add_collection(event) {
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.classList.add('show');
    console.log(this.state.all_films.length, this.state.all_cffilms.length);
    if (!(this.state.all_films.length || this.state.all_cffilms.length)){
      // fetch(`${process.env.PUBLIC_URL}/json/films.json`)
      fetch(`http://localhost/tcff_php/api/movie/read.php`)
        .then(res => res.json())
        .then(datas => {
          let films = [];
          let cffilms = [];
          console.log(datas);
          datas.map((data, idx) => {
            if (data.cf === "0") {
              let select = false;
              this.state.films.forEach(film => {
                let id = parseInt(film.id_movie);
                if (id === idx+1) select = true;
              })
              this.state.cffilms.forEach(film => {
                let id = parseInt(film.id_movie);
                if (id === idx+1) select = true;
              })
              let new_data = {
                "name": data.name_zhtw,
                "id": (idx+1),
                "cf": false,
                "select": select
              }
              films.push(new_data);
            } else {
              let select = false;
              this.state.cffilms.forEach(film => {
                let id = parseInt(film.id_movie);
                if (id === idx+1) select = true;
              })
              this.state.cffilms.forEach(film => {
                let id = parseInt(film.id_movie);
                if (id === idx+1) select = true;
              })
              let new_data = {
                "name": data.name_zhtw,
                "id": (idx + 1),
                "cf": true,
                "select": select
              }
              cffilms.push(new_data);
            }
          })
          console.log(films,cffilms);
          this.setState({
            all_films: films,
            all_cffilms: cffilms
          });
          console.log(this.state);
          // let items = document.querySelectorAll(".item");
          // Array.from(items).forEach(item => item.classList.add('notSelected'));
        })
      }
      if (this.state.add_films.length || this.state.add_cffilms.length){
        // console.log('refresh');
        let ar = this.state.add_films.concat(this.state.add_cffilms);

      }
      // console.log(this.temp);
      // let colNum = [];
      // this.state.films.map((film, idx) => {
      //   // console.log(idx);
      //   colNum.push(parseInt(film.id_movie));
      // })
      // this.state.cffilms.map((film, idx) => {
      //   // console.log(idx);
      //   colNum.push(parseInt(film.id_movie));
      // })
      // console.log(colNum);
      // let items = document.querySelectorAll(".item");
      // console.log(items);
      // Array.from(items).map((item, idx) => {
      //   let id = parseInt(item.getAttribute("data-id-movie"));
      //   // console.log("id", id);
      //   colNum.forEach(num => {
      //     if(id === num){
      //       item.classList.remove("notSelected");
      //       item.classList.add("selected");
      //       console.log(item)
      //       console.log(id)

      //     }
      //   })
      // })

  }
  add_item(event){
    let target = event.target;
    let isSelect = target.classList.contains("selected");
    console.log(isSelect);
    console.log(target.innerHTML, target.getAttribute('data-id-movie'));
    // target.get
    // let newAr = this.state.films.push();
    if(!isSelect){
      target.classList.remove("notSelected");
      target.classList.add("selected");
      let item = {
        name: target.innerHTML,
        id_movie: target.getAttribute('data-id-movie')
      };
      let ar = this.state.add_films;
      ar.push(item);
      console.log(ar);
      // console.log('ar:  ',ar)
      // console.log('item:  ',item)
      // console.log('add_films:  ', this.state.add_films)
      this.setState({add_films: ar});
      console.log(this.state);
      this.temp.push(target);
    }
  }
  // changeTab(event){
  //   let target = event.target;
  //   let tabs = document.querySelectorAll(".tab")
  //   // event.stopPropagation();
  //   Array.from(tabs).forEach(function(tab){
  //     tab.classList.remove('active'); // tab content
  //   })
  //   // console.log("parent", target.parentElement.parentElement)
  //   let index = Array.from(document.querySelectorAll(".step")).indexOf(target);
  //   // target.parentElement.parentElement.classList.add("active");
  //   tabs[index].classList.add("active");
  //   Array.prototype.forEach.call(document.querySelectorAll('.step'), function(el){
  //     el.classList.remove('active');
  //   })
  //   // console.log(tab);
  //   // tab.classList.remove('active');
  //   console.log(tabs);
  //   target.classList.add('active'); //step

  // }
  nextStep(evt){
    let cart =sessionStorage.getItem('cart');
    let id_movie = [];
    if(cart === null){
      evt.preventDefault();
      cart = [];
      let checkedItem = document.querySelectorAll(".checkItem input:checked");
      if (checkedItem.length === 0){
        alert('請先勾選欲購買之商品!!');
      }else{
        Array.from(checkedItem).forEach(x => {
          let id = x.id.slice(6);
          id_movie.push(id)
        })
        console.log(id_movie);
        //collection分開丟入cart
        let films = this.state.films.reduce((a,x) => {
          if(id_movie.includes(x.id_movie)) a.push(x);
          return a
        },[]);
        let cffilms = this.state.cffilms.reduce((a, x) => {
          if (id_movie.includes(x.id_movie)) a.push(x);
          return a
        }, []);
        let cart = {
          films:films,
          cffilms:cffilms
        }

        //collection合併cart
        // let collection = this.state.films.concat(this.state.cffilms);
        // let cart = collection.filter(x => {
        //   return id_movie.includes(x.id_movie);
        // })

        // console.log(collection);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        // window.history.pushState({},'/2');
        window.location.href = '/my-film/2';
      }
      console.log("checkedItem",checkedItem.length)
    }else{
      evt.preventDefault();
      console.log("cart", JSON.parse(cart));
      // window.history.pushState({}, '/2');
      window.location.href = '/my-film/2';
    }
    // if(!(cart.films.length || cart.cffilms.length)){
    //   evt.preventDefault();
    //   alert('請先勾選欲購買之商品!!');
    // } 
  }
  render() {
    return (
          <div className="tab tab1 active"> 
            <div className="overlay">
              <div className="wrap">
                <h3>加入更多片單</h3>
                <div className="panel">
                  <div className="selected">
                    <div className="title">
                      目前收藏
                    </div>
                    <ul>
                      {
                        this.state.films.map((film, idx) => (
                          <li key={idx}>
                            {film.name_zhtw}
                          </li>
                        ))
                      }
                      {
                        this.state.cffilms.map((film, idx) => (
                          <li key={idx}>
                            {film.name_zhtw}
                          </li>
                        ))
                      }
                      {
                        this.state.add_films.map((film, idx) => (
                          <li key={idx} data-id-movie={film.id_movie}>
                            {film.name}
                          </li>
                        ))
                      }
                      {
                        this.state.add_cffilms.map((film, idx) => (
                          <li key={idx} data-id-movie={film.id_movie}>
                            {film.name}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="options">
                    <div className="films">
                      <div className="title">
                        確定放映
                      </div>
                      <div className="items">
                        {
                          this.state.all_films.map((film, idx) => (
                            <div key={idx} className={`item ${film.select ? 'selected' : 'notSelected'}`} data-id-movie={film.id} onClick={this.add_item}>
                              {film.name}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className="cffilms">
                      <div className="title">
                        募資
                      </div>
                      <div className="items">
                        {
                          this.state.all_cffilms.map((film, idx) => (
                            <div key={idx} className={`item ${film.select ? 'selected' : 'notSelected'}`} data-id-movie={film.id} onClick={this.add_item}>
                              {film.name}
                            </div>
                          ))
                        }
                      </div>
                      <div id="cancelOverlay">
                        <input type="button" value="取消" onClick={this.cancelOverlay} />
                        <input type="button" value="確定" onClick={this.cancelOverlay} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              this.state.dialog.show && 
              (<div class='dialog-overlay'>
                <div class='dialog'>
                  <div className="head">
                    <h3>刪除收藏</h3> 
                    {/* <i class="fas fa-times" onClick={this.del_collection}></i> */}
                </div>
                  <div class='dialog-msg'>
                    <p>確定要從片單刪除 {this.state.dialog.name}?</p> 
                  </div>
                  <div className="foot">
                    <div class='controls'>
                    <button class='button button-danger doAction' data-id-movie={this.state.dialog.id_movie} data-cf={this.state.dialog.cf} onClick={this.del_collection}>確定</button> 
                    <button class='button button-default cancelAction' onClick={this.del_collection}>取消</button> 
                    </div>
                  </div>
                </div>
              </div>)
            }
            <table className="films">
              <thead>
                  <tr>
                    <th className = "check"> 
                      <Cb id={`filmsCb`}  click={this.checkAll} />
                    </th >
                    <th className="title">我的片單(確認放映)</th>
                  </tr>
              </thead>
              <tbody>
                {
                  this.state.films.map((film, idx) => (
                    <tr key={idx}>
                      <td className="check checkItem">
                      {film.bookable_seats_count > 0 ? (
                          // <input type="checkbox" />
                          <Cb id={`movie_${film.id_movie}`} click={this.checkItem} />
                        ) : ""}
                      </td>
                    <td className={`title ${film.bookable_seats_count > 0 ? "" : "forbid"}`}>
                      {/* <td className={`title`}> */}
                        <div className="text">
                          <span className="film_name">{film.name_zhtw + film.name_en}</span>
                          <span className="film_date">{film.date + film.day + film.time}</span>
                          <span className="film_auditorium">{film.auditorium}</span>
                      <span className="film_bookable">{film.bookable_seats_count > 20 ? "熱賣中" : film.bookable_seat_count}</span>
                        </div>
                        <div className="trash" data-id-movie={film.id_movie} data-name={film.name_zhtw} data-cf={0} onClick={this.del_collection}>
                        <i className="fas fa-trash-alt"></i>
                        </div>
                      </td>
                    </tr>
                  ))
                }                
              </tbody>
            </table>
            <table className="cffilms">
              <thead>
                <tr>
                  < th className = "check" > < Cb id = {`cffilmsCb`} click={this.checkAll} /></th >
                  <th className="title">我的片單(募資中)</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.cffilms.map((film, idx) => (
                    <tr key={idx}>
                      <td className="check checkItem">
                          < Cb id = {
                            `movie_${film.id_movie}` 
                        } click={this.checkItem}
                          />
                      </td>
                      <td className="title">
                    <span className="film_name">{film.name_zhtw + film.name_en + "已達成" + (film.cf_progress * 100) + '%'}</span>
                      {/* <span className="cf_progress">{"目前募資進度為" + (film.cf_progress * 100) + '%'}</span> */}
                    <div className="trash" data-id-movie={film.id_movie} data-name={film.name_zhtw} data-cf={1} onClick={this.del_collection}>
                      <i className="fas fa-trash-alt"></i>
                        </div>
                      </td>
                    </tr>
                  ))
                }     
              </tbody>
            </table>
            <div className="buttons">
              <button type="button" onClick={this.add_collection}>+ 加入更多片單</button>
              <Link to="/my-film/2" onClick={this.nextStep}>下一步</Link>
            </div>
            </div>
          

    );
  }
}

export default Tab1;
