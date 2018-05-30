import React, { Component } from 'react';
import Cb from './myfilm/cb'
import '../sass/myfilm.scss';

class MyFilm extends Component {
  constructor(props){
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.del_collection = this.del_collection.bind(this);
    this.add_collection = this.add_collection.bind(this);
    this.add_item = this.add_item.bind(this);
    this.checkAll = this.checkAll.bind(this);
    // this.tab = document.querySelectorAll(".myfilmPage>div")
    this.state = {
      films:[],
      cffilms:[],
      add_cffilms:[],
      add_films:[]
    }
  }
  componentDidMount(){
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
        console.log(this.state);
      })

      // let body = document.getElementsByTagName('body')[0];
      // let fragment = document.createDocumentFragment();
      // let str_el = "";
      // fragment.appendChild(str_el);
      // body.appendChild(fragment);
  }
  checkAll(event){
    let target = event.target;
    console.log(target.getAttribute("for"));
  }
  del_collection(event){
    // let name = 
    alert("確定要刪除嗎?")
  }
  add_collection(event) {
    // let name = 
    alert("+++");
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.classList.add('show');

    fetch(`${process.env.PUBLIC_URL}/json/films.json`)
      .then(res => res.json())
      .then(datas => {
        let films = [];
        let cffilms = [];
        console.log(datas);
        datas.map((data, idx) => {
          if (idx < 60) {
            let new_data = {
              "name": data.name,
              "id": idx,
              "cf": false
            }
            films.push(new_data);
          } else {
            let new_data = {
              "name": data.name,
              "id": idx,
              "cf": true
            }
            cffilms.push(new_data);
          }
        })
        // console.log(films,cffilms);
        this.setState({
          add_films: films,
          add_cffilms: cffilms
        });
        console.log(this.state);
      })

  }
  add_item(event){
    let target = event.target;
    console.log(target.innerHTML, target.getAttribute('data-id-movie'));
    // target.get
  }
  changeTab(event){
    let target = event.target;
    let tabs = document.querySelectorAll(".tab")
    // event.stopPropagation();
    Array.from(tabs).forEach(function(tab){
      tab.classList.remove('active'); // tab content
    })
    // console.log("parent", target.parentElement.parentElement)
    let index = Array.from(document.querySelectorAll(".step")).indexOf(target);
    // target.parentElement.parentElement.classList.add("active");
    tabs[index].classList.add("active");
    Array.prototype.forEach.call(document.querySelectorAll('.step'), function(el){
      el.classList.remove('active');
    })
    // console.log(tab);
    // tab.classList.remove('active');
    console.log(tabs);
    target.classList.add('active'); //step

  }
  render() {
    return (
      <section className="container">
        <div className="myfilmPage">
          <div className="overlay">
            <div className="wrap">
                <h3>加入更多片單</h3>
                <div className="films">
                  <div className="title">
                    確定放映
                  </div>
                  <div className="items">
                    {
                      this.state.add_films.map((film, idx) => (
                        <div key={idx} className="item" data-id-movie={film.id} onClick={this.add_item}>
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
                      this.state.add_cffilms.map((film, idx) => (
                      <div key={idx} className="item" data-id-movie={film.id} onClick={this.add_item}>
                          {film.name}
                        </div>
                      ))
                    }
                  </div>
                </div>
            </div>
          </div>
          <div className="progressBar">
            <div className="step step1 active" onClick={this.changeTab}>
              STEP1. <span>勾選欲購買之場次</span>
            </div>
            <div className="step step2" onClick={this.changeTab}>
              STEP2. <span>選擇張數及劃位</span>
            </div>
            <div className="step step3" onClick={this.changeTab}>
              STEP3. <span>選擇付款方式</span>
            </div>
            <div className="step step4" onClick={this.changeTab}>
              STEP4. <span>完成結帳</span>
            </div>
          </div>

          <div className="tab tab1 active"> 
            <table className="films">
              <thead>
                  <tr>
                    <th className = "check"> 
                      <Cb id={`filmsCb`}  onClick={this.checkAll} />
                    </th >
                    <th className="title">我的片單(確認放映)</th>
                  </tr>
              </thead>
              <tbody>
                {
                  this.state.films.map((film, idx) => (
                    <tr key={idx}>
                      <td className="check">
                        {film.bookable === true ? (
                          // <input type="checkbox" />
                          <Cb id={`movie_${film.id_movie}`} />
                        ) : (
                          <input type="checkbox" disabled />
                        )}
                      </td>
                      <td className={`title ${film.bookable === true ? "" : "forbid"}`}>
                        <div className="text">
                          <span className="film_name">{film.name}</span>
                          <span className="film_date">{film.date}</span>
                          <span className="film_auditorium">{film.auditorium}</span>
                          <span className="film_bookable">{film.bookable === true ? "熱賣中" : "已售完"}</span>
                        </div>
                        <div className="trash" onClick={this.del_collection}>
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
                  < th className = "check" > < Cb id = {`cffilmsCb`} onClick={this.checkAll} /></th >
                  <th className="title">我的片單(募資中)</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.cffilms.map((film, idx) => (
                    <tr key={idx}>
                      <td className="check">
                          < Cb id = {
                            `movie_${film.id_movie}`
                          }
                          />
                      </td>
                      <td className="title">
                        <span className="film_name">{film.name}</span>
                        <div className="trash" onClick={this.del_collection}>
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
              <button type="button">下一步</button>
            </div>
          </div>
          <div className="tab tab2">
            Tab2
              </div>
          <div className="tab tab3">
            Tab3
              </div>
          <div className="tab tab4">
            Tab4
          </div>
        </div>
      </section>
    );
  }
}

export default MyFilm;
