import React, { Component } from 'react';
import Cb from './cb';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from "react-router-dom";
import '../myfilm/tab1.scss';

class Tab1 extends Component {
  constructor(props){
    super(props);

    //綁定this
    this.del_collection = this.del_collection.bind(this);
    this.add_collection = this.add_collection.bind(this);
    this.add_item = this.add_item.bind(this);
    this.checkAll = this.checkAll.bind(this); 
    this.checkItem = this.checkItem.bind(this); 
    this.cancelOverlay = this.cancelOverlay.bind(this); 
    this.nextStep = this.nextStep.bind(this); 
    this.checkIfEmpty = this.checkIfEmpty.bind(this);
    this.spread = this.spread.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.search = this.search.bind(this);

    //state
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
      },
      isCollectionEmpty: true,
      filmsLoad: false,
      searchText: ""
    };

    //暫存element
    this.temp = [];
  }
  componentWillMount(){//fetch data
    console.log("will mount")
    //調整視窗位置
    window.scrollTo(0, 0);

    
    if (sessionStorage.getItem('user') !== null) { //登入狀態
      if(sessionStorage.getItem("collection") === null){
        let id = JSON.parse(sessionStorage.getItem('user')).id;
        
        //查詢收藏
        fetch(`http://192.168.39.110/tcff_php/api/cart/collection.php?id=` + id)
        // fetch(`${process.env.PUBLIC_URL}/json/collection.json`)
          .then(res => res.json())
          .then(datas => {

            let films = [];
            let cffilms = [];

            datas.forEach(data => {
              if(data.cf == 1){
                cffilms.push(data);
              }else{
                films.push(data);
              }
            })

            let collection = {
              films: films,
              cffilms: cffilms
            };

            //改變頁面呈現
            this.setState(collection);
            //更新Storage
            sessionStorage.setItem("collection", JSON.stringify(collection));
            //檢查isCollectionEmpty
            this.checkIfEmpty();

          })
          .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          })
      }else{
        let collection = JSON.parse(sessionStorage.getItem("collection"));

        //改變頁面呈現
        this.setState({
          films: collection.films,
          cffilms: collection.cffilms
        });
        //更新Storage
        sessionStorage.setItem("collection", JSON.stringify({
          films: collection.films,
          cffilms: collection.cffilms
        }));
        //檢查isCollectionEmpty
        this.checkIfEmpty();

      }

    }else{ //未登入狀態
      let collection = sessionStorage.getItem("collection");
      
      if(collection !== null){
        let films = JSON.parse(collection).films;
        let cffilms = JSON.parse(collection).cffilms;

        //整合所有加入的電影id
        let id_movie = films.concat(cffilms).reduce((a,x) => {
                a.push(x.id_movie)
                return a
              },[]);
        
        //查詢電影詳細資料(訂位、募資狀況)
        fetch(`http://192.168.39.110/tcff_php/api/cart/collection.php/${id_movie.join("_")}`)
          .then(res => res.json())
          .then(datas => {

            let films = datas.filter(x => x.cf === '0');
            let cffilms = datas.filter(x => x.cf === '1');

            let collection = {
              films: films,
              cffilms: cffilms
            }

            //替換Storage的collection
            sessionStorage.setItem("collection", JSON.stringify(collection));
            //檢查isCollectionEmpty
            this.checkIfEmpty();
            //更新頁面
            this.setState(collection)
          })
          .catch(err => console.log("fetch problem: " + err.message));
      }
    }
  }
  componentDidMount(){
    //collection全選
    Array.from(document.querySelectorAll(".cb input")).forEach(cb => cb.checked = true);
  }
  componentDidUpdate(){
    console.log('Tab1 Did Update!');

    //collection全選
    Array.from(document.querySelectorAll(".cb input")).forEach(cb => cb.checked = true);
  }
  checkIfEmpty(){//檢查collection是否為空    
    let empty;
    let collection = sessionStorage.getItem("collection");
    //未加入過
    if(collection === null) empty = true;
    //登入後沒有收藏
    else if (JSON.parse(collection).films.concat(JSON.parse(collection).cffilms).length === 0) empty = true;
    //有收藏
    else empty = false;

    this.setState({isCollectionEmpty: empty});
  }
  cancelOverlay(event){//選完加入影片按 確定 /取消
    let target = event.currentTarget;
    let overlay = document.getElementsByClassName('overlay')[0];

    if (target.value === "確定") {
      //此次增加的影片
      let add_ar = this.state.add_films.concat(this.state.add_cffilms);

      //增加的電影id
      let add_id = add_ar.reduce((a,x) => {
        a.push(x.id_movie);
        return a;
      }, [])

      //沒有新增就直接退出
      if (add_id.length === 0) return overlay.classList.remove('show');

      if (sessionStorage.getItem("user") !== null){//加入會員收藏
        let body = {
          id: JSON.parse(sessionStorage.getItem("user")).id,
          id_movie: add_id.join("_")
        }
        fetch(`http://192.168.39.110/tcff_php/api/cart/collection.php`, {
          method: "POST",
          body: JSON.stringify(body)
        }).then(res => res.json())
          .then(datas => {
            if (datas.message === "add collections"){
              //更新至storage
              let collection = sessionStorage.getItem("collection");
              let films = datas.collection_info.filter(x => x.cf === "0");
              let cffilms = datas.collection_info.filter(x => x.cf === "1");
              if(collection === null ){
                collection = {
                  films: films,
                  cffilms: cffilms
                }
              }else{
                collection = JSON.parse(collection);
                collection.films = collection.films.concat(films);
                collection.cffilms = collection.cffilms.concat(cffilms);
              }
              sessionStorage.setItem("collection", JSON.stringify(collection));
              this.checkIfEmpty();

              //更新state並清空此次新增
              let sttfilms = this.state.films;
              let sttcffilms = this.state.cffilms;

              sttfilms = sttfilms.concat(films);
              sttcffilms = sttcffilms.concat(cffilms);

              this.setState({
                films: sttfilms,
                cffilms: sttcffilms,
                add_films: [],
                add_cffilms: []
              })         

              //清空暫存.item element
              this.temp.length = 0;     
            }
          })
      }else{//沒登入，純查詢電影訂位狀況
        fetch(`http://192.168.39.110/tcff_php/api/cart/collection.php/` + add_id.join("_"))
          .then(res => res.json())
          .then(datas => {
            //存到storage
            let films = datas.filter(x => x.cf === '0');
            let cffilms = datas.filter(x => x.cf === '1');

            let collection = sessionStorage.getItem("collection");
            if (collection === null) {
              collection = {
                films: films,
                cffilms: cffilms
              }
            } else {
              collection = JSON.parse(collection);
              collection.films = collection.films.concat(films);
              collection.cffilms = collection.cffilms.concat(cffilms);
            }
            sessionStorage.setItem("collection", JSON.stringify(collection));
            this.checkIfEmpty();

            //更新state / 清空此次新增 / 清空暫存.item element
            collection.add_films = [];
            collection.add_cffilms = [];
            this.temp.length = 0;
            this.setState(collection)
          })
          .catch(err => console.log(err.message))
      }

    } else {//"取消"
      //清空此次新增
      this.setState({
        add_films: [],
        add_cffilms: []
      });
      //還原選擇狀態(css class)
      this.temp.forEach(item => {
        item.classList.remove("selected");
        item.classList.add("notSelected");
      })
    }

    //移除overlay
    overlay.classList.remove('show');
  }

  //Input Checkbox
  checkAll(event){//全選全不選
    let target = event.currentTarget;
    let isCheck = !target.previousSibling.checked;
    let table = target.closest(".table");
    let cbs = table.querySelectorAll(".checkItem input");

    //全選 或 全不選
    Array.from(cbs).forEach(function(cb){
      cb.checked = isCheck;
    })
  }
  checkItem(event) {//單選，全選checkbox也會變
    let target = event.currentTarget;
    let isCheck = target.previousSibling.checked;

    let tbody = target.closest(".body");
    let allItemChecked = isCheck ? tbody.querySelectorAll('.checkItem input:checked').length - 1 : tbody.querySelectorAll('.checkItem input:checked').length+1;
    let allItem = tbody.querySelectorAll('.checkItem input').length;
    let checkAll = target.closest(".table").querySelector('.colTitle input');  

    checkAll.checked = (allItemChecked === allItem);
  }
  del_collection(event){//刪除收藏(垃圾桶onClick)
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

    //刪除確定
    } else if (event.currentTarget.classList.contains("doAction")){
      let user = sessionStorage.getItem('user');
      let id_user = user === null ? undefined : JSON.parse(user).id;
      let url = "";
      let dialog = this.state.dialog;
      let id_movie = event.currentTarget.getAttribute("data-id-movie");
      let cf = event.currentTarget.getAttribute("data-cf");
      
      //已登入
      if (id_user !== undefined) {
        url = `http://192.168.39.110/tcff_php/api/cart/collection.php/${id_movie}/${id_user}`;
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
              this.checkIfEmpty();

              if (cf === "0") {
                let ar = this.state.films;
                //remove a film 
                ar = ar.filter((obj) => {
                  return (obj["id_movie"] != id_movie)
                })
                // console.log(id, ar);
                //setState -> re-render
                let all_films = this.state.all_films.map(x => {
                  if(x.id === id_movie) x.collect = false;
                  return x;
                })
                this.setState({
                  films: ar,
                  all_films: all_films
                });
              } else {
                let ar = this.state.cffilms;
                //remove a film 
                ar = ar.filter((obj) => {
                  return (obj["id_movie"] != id_movie)
                })
                // console.log(id, ar);
                //setState -> re-render
                let all_cffilms = this.state.all_cffilms.map(x => {
                  if (x.id === id_movie) x.collect = false;
                  return x;
                })
                this.setState({
                  cffilms: ar,
                  all_cffilms: all_cffilms
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
          let all_films = this.state.all_films.map(x => {
            if (x.id === id_movie) x.collect = false;
            return x;
          })
          // console.log(id, ar);
          //setState -> re-render
          let collection = JSON.parse(sessionStorage.getItem("collection"));
          collection.films = ar;
          sessionStorage.setItem("collection", JSON.stringify(collection));

          this.checkIfEmpty();
          this.setState({
            films: ar,
            all_films: all_films
          });
        } else {
          let ar = this.state.cffilms;
          //remove a film 
          ar = ar.filter((obj) => {
            return (obj["id_movie"] != id_movie)
          })

          let all_cffilms = this.state.all_cffilms.map(x => {
            if (x.id === id_movie) x.collect = false;
            return x;
          })
          let collection = JSON.parse(sessionStorage.getItem("collection"));
          collection.films = ar;
          sessionStorage.setItem("collection", JSON.stringify(collection));
          this.checkIfEmpty();

          // console.log(id, ar);
          //setState -> re-render
          this.setState({
            cffilms: ar,
            all_cffilms: all_cffilms
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
    //刪除取消  
    } else if (event.currentTarget.classList.contains("cancelAction")){
      let dialog = this.state.dialog;
      dialog.show = false;
      this.setState({ dialog: dialog })
    }
  }
  add_collection(event) {
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.classList.add('show');
    // console.log(this.state.all_films.length, this.state.all_cffilms.length);
    if (!this.state.filmsLoad){//第一次要fetch全部電影列表
      // fetch(`${process.env.PUBLIC_URL}/json/films.json`)
      fetch(`http://192.168.39.110/tcff_php/api/movie/read.php`)
        .then(res => res.json())
        .then(datas => {
          let films = [];
          let cffilms = [];
          console.log(datas);
          datas = datas.sort((a,b) => {
            if (a.name_zhtw.length > b.name_zhtw.length) {
              return 1;
            }
            if (a.name_zhtw.length < b.name_zhtw.length) {
              return -1;
            }
            return 0;
          })
          datas.map((data, idx) => {
            let select = false;
            let collect = false;
            if (data.cf === "0") {
              this.state.films.forEach(film => {                
                if (film.id_movie === data.id_movie) collect = true;
              })
              this.state.cffilms.forEach(film => {                
                if (film.id_movie === data.id_movie) collect = true;
              })
              let new_data = {
                "name": data.name_zhtw,
                "id": (data.id_movie),
                "cf": false,
                "select": select,
                "collect": collect
              }
              films.push(new_data);
            } else {
              this.state.cffilms.forEach(film => {                
                if (film.id_movie === data.id_movie) collect = true;
              })
              this.state.cffilms.forEach(film => {                
                if (film.id_movie === data.id_movie) collect = true;
              })
              let new_data = {
                "name": data.name_zhtw,
                "id": (data.id_movie),
                "cf": true,
                "select": select,
                "collect": collect
              }
              cffilms.push(new_data);
            }
          })
          console.log(films,cffilms);
          this.setState({
            all_films: films,
            all_cffilms: cffilms,
            filmsLoad: true
          });
          console.log(this.state);
          // let items = document.querySelectorAll(".item");
          // Array.from(items).forEach(item => item.classList.add('notSelected'));
        })
    }else{
      let films = [];
      let cffilms = [];
      this.state.all_films.concat(this.state.all_cffilms).map((data, idx) => {
        let select = false;
        let collect = false;
        if (data.cf === false) {
          this.state.films.forEach(film => {            
            if (film.id_movie === data.id) collect = true;
          })
          this.state.cffilms.forEach(film => {            
            if (film.id_movie === data.id) collect = true;
          })
          data.select = select;
          data.collect = collect;
          films.push(data);
        } else {
          this.state.cffilms.forEach(film => {            
            if (film.id_movie === data.id) collect = true;
          })
          this.state.cffilms.forEach(film => {            
            if (film.id_movie === data.id) collect = true;
          })
          data.select = select;
          data.collect = collect;
          cffilms.push(data);
        }
      })
      console.log(films, cffilms);
      this.setState({
        all_films: films,
        all_cffilms: cffilms
      });
    }
    if (this.state.add_films.length || this.state.add_cffilms.length){
      // console.log('refresh');
      let ar = this.state.add_films.concat(this.state.add_cffilms);

    }
  }
  add_item(event){
    let target = event.target;
    let isSelect = target.classList.contains("selected");
    let id_movie = target.getAttribute('data-id-movie');
    console.log(isSelect);
    console.log(target.innerHTML, target.getAttribute('data-id-movie'));
    // target.get
    // let newAr = this.state.films.push();
    if(!isSelect){
      target.classList.remove("notSelected");
      target.classList.add("selected");
      let item = {
        name: target.innerHTML,
        id_movie: id_movie
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
    }else{
      target.classList.remove("selected");
      target.classList.add("notSelected");
      let ar = this.state.add_films;
      ar = ar.filter((x) => {
        return x.id_movie !== id_movie;
      },[])
      this.setState({ add_films: ar });
      this.temp = this.temp.filter(x => {
        return x !== target;
      })
    }
  }
  spread(evt){
    console.log(evt.currentTarget)
    console.log(evt.currentTarget.nextSibling)
    evt.currentTarget.nextSibling.classList.toggle("show");
    evt.currentTarget.querySelector("svg").classList.toggle("show");
  }
  changeTab(evt){
    let target = evt.currentTarget;
    let className = target.getAttribute("data-tab");
    let tabs = target.parentNode.nextSibling;
    //改tag的active
    Array.from(target.parentNode.childNodes).forEach(el => {
      if (el.classList.contains("active")) el.classList.remove("active");
      if (el===target) el.classList.add("active");
    })
    //改tab的active
    Array.from(tabs.childNodes).forEach(el => {
      if(el.classList.contains("active")) el.classList.remove("active");
      if(el.classList.contains(className)) el.classList.add("active");
    })
  }
  search(evt){
    let value = evt.target.value
    this.setState({searchText:value});
    let filteredArr = this.state.all_films.filter(x => x.name.includes(value));
    console.log(filteredArr);
    // console.log(evt.target.nextSibling.querySelectorAll(".item"));
    evt.target.parentNode.nextSibling.querySelectorAll(".item").forEach(x => {
      x.classList.remove("search");
      x.classList.remove("unsearch");
      if(value !== ""){
        if(x.innerHTML.includes(value)){
          x.classList.add("search");
        } else{
          x.classList.add("unsearch");
        }
      }
    })
  }
  nextStep(evt){
    let user = sessionStorage.getItem("user");
    if(user === null){
      evt.preventDefault();
      alert("請先登入會員")
      this.props.history.push("/member");
      return;
    }

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
        // window.location.href = '/my-film/2';
        this.props.history.push("/my-film/2");
      }
      console.log("checkedItem",checkedItem.length)
    }else{//從tab2回來的，cart沒清掉
      evt.preventDefault();
      console.log("cart", JSON.parse(cart));
      cart = [];
      let checkedItem = document.querySelectorAll(".checkItem input:checked");
      if (checkedItem.length === 0) {
        alert('請先勾選欲購買之商品!!');
      } else {
        Array.from(checkedItem).forEach(x => {
          let id = x.id.slice(6);
          id_movie.push(id)
        })
        console.log(id_movie);
        //collection分開丟入cart
        let films = this.state.films.reduce((a, x) => {
          if (id_movie.includes(x.id_movie)) a.push(x);
          return a
        }, []);
        let cffilms = this.state.cffilms.reduce((a, x) => {
          if (id_movie.includes(x.id_movie)) a.push(x);
          return a
        }, []);
        let cart = {
          films: films,
          cffilms: cffilms
        }

        //collection合併cart
        // let collection = this.state.films.concat(this.state.cffilms);
        // let cart = collection.filter(x => {
        //   return id_movie.includes(x.id_movie);
        // })

        // console.log(collection);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        // window.history.pushState({},'/2');
        // window.location.href = '/my-film/2';
        this.props.history.push("/my-film/2");
      }
      // window.history.pushState({}, '/2');
      // window.location.href = '/my-film/2';
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
                <div className="panel">
                  <div className="title">
                    <span className="active" data-tab="films" onClick={this.changeTab}>確定放映</span>
                    <span data-tab="cffilms" onClick={this.changeTab}>募資</span>
                    <span data-tab="collect" onClick={this.changeTab}>加入收藏 <i>{this.state.add_films.concat(this.state.add_cffilms).length}</i></span>
                    </div>
                  <div className="tabs">
                    <div className="films active">
                    <div className="search">
                      <label htmlFor="searchFilms">搜尋片名</label>
                      <input id="searchFilms" type="text" onChange={this.search} value={this.state.searchText}/>
                      </div>
                      <div className="items">
                        {
                          this.state.all_films.map((film, idx) => (
                            <div key={idx} className={`item ${film.select ? 'selected' : 'notSelected'} ${film.collect ? 'hide' : ''}`} data-id-movie={film.id} onClick={this.add_item}>
                                  {film.name}
                                </div>
                          ))
                        }
                        </div>
                    </div>
                    <div className="cffilms">
                    < div className = "search" >
                      <label htmlFor="searchCffilms">搜尋片名</label>
                      <input id="searchCffilms" type="text" onChange={this.search} value={this.state.searchText}/>
                      </div>
                      <div className="items">
                        {
                          this.state.all_cffilms.map((film, idx) => (
                        <div key={idx} className={`item ${film.select ? 'selected' : 'notSelected'} ${film.collect ? 'hide' : ''}`} data-id-movie={film.id} onClick={this.add_item}>
                              {film.name}
                            </div>
                          ))
                        }    
                        </div>                  
                    </div>
                    <ul className="collect">
                      {
                        this.state.add_films.concat(this.state.add_cffilms).map((film, idx) => (
                          <div key={idx} className="add" data-id-movie={film.id_movie}>
                            {film.name}
                          </div>
                        ))
                      }
                    </ul>
                  </div>                 
                </div>
                <div id="cancelOverlay">
                  <input type="button" value="取消" onClick={this.cancelOverlay} />
                  <input type="button" value="確定" onClick={this.cancelOverlay} />
                </div>
              </div>
            </div>
            {
              this.state.dialog.show && 
              (<div class='dialog-overlay'>
                <div class='dialog'>
                  <div className="head">
                    <h3>刪除收藏</h3> 
                </div>
                  <div class='dialog-msg'>
                    <p>確定要刪除<span>{this.state.dialog.name}</span>?</p> 
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
            {this.state.isCollectionEmpty === false && (            
                <div className="table films">
                  <div className="head" onClick={this.spread}>
                      < h2 className = "row title" >我的票夾</h2>
                      <i class="fas fa-caret-down"></i>
                  </div>
                  <div className="body show">
                    <div className="row colTitle">
                      <div className = "check checkAll"> 
                        <Cb id={`filmsCb`}  click={this.checkAll} />
                        </div>
                        <div className="title">
                          < div className="col" >
                            <h4></h4>
                          </div>
                          < div className = "col" >
                            <h4>片名</h4>
                          </div>
                          < div className = "col" >
                            <h4>場次</h4>
                          </div>
                          < div className = "col" >
                            <h4>地點</h4>
                          </div>
                          < div className = "col" >
                            <h4>空位</h4>
                          </div>
                          </div>
                          
                          < div className = "delCol" >
                            <h4>刪除</h4>
                          </div>
                      </div>
                    {
                      this.state.films.map((film, idx) => (
                        <div key={idx} className="row">
                          <div className="check checkItem">
                          {film.bookable_seats_count > 0 ? (
                              <Cb id={`movie_${film.id_movie}`} click={this.checkItem} />
                            ) : ""}
                          </div>
                          <div className={`title ${film.bookable_seats_count > 0 ? "" : "forbid"}`}>
                            <div className="col">
                              <img className="" src={`${process.env.PUBLIC_URL}/images/${film.release_year}_${film.name_en.split(' ').join('_').replace(':', '_')}.jpg`} /> 
                              </div>
                              <Link className="col" data-title="" to={`/films-detail-page?id=${film.id_movie}`}>
                                <span className="film_name">{film.name_zhtw}</span>
                                <span className="film_name">{film.name_en}</span>
                              </Link>
                            < div className = "col" data-title="" >
                              <span className="film_date">{film.date.split("-").join("/")}</span>
                              <span className="film_date">{film.time.slice(0,-3)}</span>
                              </div>
                            < div className = "col" data-title="" >
                              <span className="film_auditorium">{film.auditorium}</span>                          
                            </div>
                            <div className="col" data-title="剩餘座位">
                              <span className={`film_bookable ${film.bookable_seats_count < 20 ? "danger" : ""}`}>{film.bookable_seats_count}</span>
                              </div>
                          </div>
                            <div className="trash" data-id-movie={film.id_movie} data-name={film.name_zhtw} data-cf={0} onClick={this.del_collection}>
                              < i className="fas fa-trash-alt"></i>
                            </div>
                        </div>
                      ))
                    }                
                  </div>
                </div>
              )}
            {this.state.isCollectionEmpty === false && (
                <div className="table cffilms">
                  < div className = "head"  onClick={this.spread}>                  
                      <h2 className="row title">參與募資</h2>
                      <i class="fas fa-caret-down"></i>
                  </div>
                  <div className="body show">
                    < div className = "row colTitle" >
                      <div className = "check checkAll"> 
                          <Cb id={`cffilmsCb`}  click={this.checkAll} />
                          </div>
                          <div className="title">
                            < div className="col" >
                              <h4></h4>
                            </div>
                            < div className = "col" >
                              <h4>片名</h4>
                            </div>
                            < div className = "col" >
                              <h4>進度</h4>
                            </div>
                            </div>                        
                            < div className = "delCol" >
                              <h4>刪除</h4>
                            </div>
                        </div>
                    {
                      this.state.cffilms.map((film, idx) => (
                        <div className="row" key={idx}>
                          <div className="check checkItem">
                              < Cb id = {
                                `movie_${film.id_movie}` 
                            } click={this.checkItem}
                              />
                          </div>
                          <div className="title">
                            <div className="col">
                              <img className="" src={`${process.env.PUBLIC_URL}/images/${film.release_year}_${film.name_en.split(' ').join('_').replace(':', '_')}.jpg`} />
                            </div>
                            <Link className="col" data-title="" to={`/cf-films-detail-page?id=${film.id_movie}&cf=true`}>
                              <span className="film_name">{film.name_zhtw}</span>
                              <span className="film_name">{film.name_en}</span>
                            </Link>
                        < div className="col" data-title="募資進度" >
                            <span className="film_name">{Math.round(film.cf_progress * 100) + '%'}</span>
                            </div>
                              
                          </div>
                          <div className="trash" data-id-movie={film.id_movie} data-name={film.name_zhtw} data-cf={1} onClick={this.del_collection}>
                            <i className="fas fa-trash-alt"></i>
                            </div>
                        </div>
                      ))
                    }     
                  </div>
                </div>
              )}
            {this.state.isCollectionEmpty === true && (
                <div className="empty_info">
                  <h2 className=""><span>目前沒有任何收藏</span><span>馬上加入喜愛的影片吧!!</span></h2>
                  </div>
              )}
            <div className={`buttons ${this.state.isCollectionEmpty ? "center" : ""}`}>
              
              <button type="button" onClick={this.add_collection}><i class="fas fa-plus"></i>加入更多</button>
              {
                this.state.isCollectionEmpty === false && (
                  <Link to="/my-film/2" onClick={this.nextStep}>下一步</Link>
                )}
            </div>
            </div>
          

    );
  }
}

export default withRouter(Tab1);
