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
    // this.tab = document.querySelectorAll(".myfilmPage>div")
    this.state = {
      films:[],
      cffilms:[],
      add_cffilms:[],
      add_films: [],
      all_films: [],
      all_cffilms:[],
    };
    this.temp = [];
  }
  componentDidMount(){
    console.log("props: ", this.props);
    console.log("props: " ,this.props.match);
    // console.log(Store);
    
    // fetch(`http://192.168.39.110:3000/${process.env.PUBLIC_URL}/component/collection.json`)
    fetch(`${process.env.PUBLIC_URL}/json/collection.json`)
      .then(res => res.json())
      .then(datas => {
        let films = [];
        let cffilms = [];
        datas.forEach(data => {
          if(data.cf === true){
            cffilms.push(data);
          }else{
            films.push(data);
          }
        })
        // console.log(films,cffilms);
        this.setState({
          films: films,
          cffilms: cffilms
        });
        // console.log(this.state);
      })

      // let body = document.getElementsByTagName('body')[0];
      // let fragment = document.createDocumentFragment();
      // let str_el = "";
      // fragment.appendChild(str_el);
      // body.appendChild(fragment);
  }
  componentDidUpdate(){
    console.log('didupdate');
    Array.from(document.querySelectorAll(".cb input")).forEach(cb => cb.checked = true);
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
    let isCheck = !target.previousSibling.checked;
    let table = target.closest("table");
    let cbs = table.querySelectorAll(".checkItem input");
    //if isCheck=true, let all item checked
    //vice versa
    Array.from(cbs).forEach(function(cb){
      cb.checked = isCheck;
    })
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
  }
  del_collection(event){
    // confirm
    //...

    //remove item
    // let tr = event.target.closest('tr');
    // tr.remove();
    let isFilms = event.target.closest("table").classList.contains("films");
    let id = event.target.getAttribute("data-id-movie");
    // console.log(isFilms);

    if(isFilms){
      let ar = this.state.films;
      //remove a film 
      ar = ar.filter((obj) => {
        return (obj["id_movie"] != id)
      })
      // console.log(id, ar);
      //setState -> re-render
      this.setState({
        films: ar
      });
    }else{
      let ar = this.state.cffilms;
      //remove a film 
      ar = ar.filter((obj) => {
        return (obj["id_movie"] != id)
      })
      // console.log(id, ar);
      //setState -> re-render
      this.setState({
        cffilms: ar
      });
    }

    let item = Array.from(document.querySelectorAll('.item'))[id-1];
    if(item){
      item.classList.remove("selected");
      item.classList.add("notSelected");
    }

    console.log(item);

    //if removed, then send result to db
    //...
  }
  add_collection(event) {
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.classList.add('show');
    console.log(this.state.all_films.length, this.state.all_cffilms.length);
    if (!(this.state.all_films.length || this.state.all_cffilms.length)){
      fetch(`${process.env.PUBLIC_URL}/json/films.json`)
        .then(res => res.json())
        .then(datas => {
          let films = [];
          let cffilms = [];
          console.log(datas);
          datas.map((data, idx) => {
            if (idx < 60) {
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
                "name": data.name,
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
                "name": data.name,
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
                            {film.name}
                          </li>
                        ))
                      }
                      {
                        this.state.cffilms.map((film, idx) => (
                          <li key={idx}>
                            {film.name}
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
                        {film.bookable ? (
                          // <input type="checkbox" />
                          <Cb id={`movie_${film.id_movie}`} click={this.checkItem} />
                        ) : ""}
                      </td>
                      <td className={`title ${film.bookable === true ? "" : "forbid"}`}>
                        <div className="text">
                          <span className="film_name">{film.name}</span>
                          <span className="film_date">{film.date}</span>
                          <span className="film_auditorium">{film.auditorium}</span>
                          <span className="film_bookable">{film.bookable === true ? "熱賣中" : "已售完"}</span>
                        </div>
                        <div className="trash" data-id-movie={film.id_movie} onClick={this.del_collection}>
                          X
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
                        <span className="film_name">{film.name}</span>
                        <div className="trash" data-id-movie={film.id_movie} onClick={this.del_collection}>
                          X
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
