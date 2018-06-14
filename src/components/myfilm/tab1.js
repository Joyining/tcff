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
      filmsLoad: false
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
  checkIfEmpty(){
    let empty = this.state.isCollectionEmpty;
    let collection = sessionStorage.getItem("collection");
    if(collection === null) empty = true;
    else empty = false;
    // if (this.state.films.length === 0 && this.state.cffilms.length === 0) empty = true;
    this.setState({isCollectionEmpty: empty});
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
      let add_ar = this.state.add_films.concat(this.state.add_cffilms);
      let add_id = add_ar.reduce((a,x) => {
        a.push(x.id_movie);
        return a;
      }, [])
      if(add_id.length > 0){
        if (sessionStorage.getItem("user") !== null){
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

                let sttfilms = this.state.films;
                let sttcffilms = this.state.cffilms;
                console.log("before state", sttfilms, sttcffilms)
                console.log("before add", films, cffilms)
                sttfilms = sttfilms.concat(films);
                sttcffilms = sttcffilms.concat(cffilms);
                console.log("after state", sttfilms, sttcffilms)

                console.log("before state", this.state)
                this.setState({
                  films: sttfilms,
                  cffilms: sttcffilms,
                  add_films: [],
                  add_cffilms: []
                }, () => { console.log("after state", this.state)})         

                this.temp.length = 0;     
              }
            })
        }else{
          fetch(`http://192.168.39.110/tcff_php/api/cart/collection.php/` + add_id.join("_"))
            .then(res => res.json())
            .then(datas => {
              console.log(datas);
              let films = datas.filter(x => x.cf === '0');
              let cffilms = datas.filter(x => x.cf === '1');
              // console.log(films,cffilms)
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

              collection.add_films = [];
              collection.add_cffilms = [];
              this.temp.length = 0;
              this.setState(collection)
            })
            .catch(err => console.log(err.message))
        }
      }

      // add_ar.forEach(ar => {
      //   origin_ar.push(ar);
      // })
      //清空增加的清單
      // add_ar.length = 0;
      //setState -> re-render
      // this.setState({
      //   films: origin_ar,
      //   add_films: add_ar
      // });
      // this.setState(add_ar);

      // console.log(this.state);
      // this.temp.length = 0;
    // console.log(target.value)
      // console.log("send and fetch")
    } else {
      // let add_ar = this.state.add_films;
      // add_ar.length = 0;
      this.setState({
        add_films: [],
        add_cffilms: []
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
                        <div key={idx} className={`item ${film.select ? 'selected' : 'notSelected'} ${film.collect ? 'hide' : ''}`} data-id-movie={film.id} onClick={this.add_item}>
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
                        <div key={idx} className={`item ${film.select ? 'selected' : 'notSelected'} ${film.collect ? 'hide' : ''}`} data-id-movie={film.id} onClick={this.add_item}>
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
            {
              this.state.isCollectionEmpty === false && (
            
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
              )}
            {
              this.state.isCollectionEmpty === false && (
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
              )
            }
            {
              this.state.isCollectionEmpty === true && (
                <h2 className="empty_info">目前沒有收藏喔!馬上加入喜愛的影片吧!!</h2>
              )
            }
            <div className="buttons">
              
              <button type="button" onClick={this.add_collection}>+ 加入更多片單</button>
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
