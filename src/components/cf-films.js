import React, { Component } from 'react';
// import '../sass/page.scss';
// import Cflist from './cf-films.json';
import '../sass/cf-films.scss';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
// import Titantic from '../images/1997_Titanic.jpg';
// import Holland from '../images/1996_Mr_Holland_Opus.jpg';
// import Terminator from '../images/1991_Terminator2.jpg';
// import Future from '../images/1989_Back_to_the_Future_PartII.jpg';
// import Rain from '../images/1988_Rain_Man.jpg';
// import Die from '../images/1988_Die_Hard.jpg';
// import Deer from '../images/1978_the_deer_hunter.jpg';
// import Godfather from '../images/1974_the_godfather_part_II.jpg';
// import Kramer from '../images/1979_kramer_vs._kramer.jpg';
// import Breakfast from '../images/1961_breakfast_at_tiffany_s.jpg';
// import Graduate from '../images/1967_the_graduate.jpg';
// import Space from '../images/1968_2001_a_space_odyssey.jpg';

class Cffilms extends Component {
    constructor(props){
        super(props);
        this.state = {
            Films:[]
        }
    }

    componentDidMount(){

        // 連結後端資料
        console.log("match",this.props);
        console.log("query",window.location.search)
        let q = window.location.search;
        let id = q.slice(q.search('=') +1)
        console.log("id",id)
        fetch(`http://192.168.39.110/tcff_php/api/movie/read.php?cf=true`)
         .then((res) => res.json())
         .then((datas) => {
            console.log(datas) 
            this.setState({
             Films: datas
         }, ()=>{
            fetch(`http://192.168.39.110/tcff_php/api/movie/cfRead.php`)
            .then((res) => res.json())
            .then((datas) => {
               // console.log(datas) 
               console.log("state",this.state.Films)
               let films = this.state.Films.map(film => {
                   film.progress = 0;
                   if(datas.hasOwnProperty(film.id_movie)){
                       film.progress = datas[film.id_movie];
                   }
                   return film;
               })
               this.setState({Films:films});
               console.log("films",films)
               })
         } )})
         
    }
  render() {
    return (
        <div>
        <section className="container-cf">

        </section>
        <section className="container-cfFilms">
            <div className="about">
                <p>[注意事項]</p>
                <p>募資活動期間: 2018/06/01 - 2018/06/30</p>
                <p>募資活動結束前，該影片募資進度達成80%以上，則該片確認放映。在募資活動期間完成該片票券購買的消費者，於影片放映當日持電影票券至指定影廳，即可入內觀賞。台北經典影展會於募資達標後一周內以電子郵件通知放映時間及影廳，煩請多加留意。</p>
                <p>如果募資活動結束仍然沒有達到目標，台北經典影展會透過您參與募資時的原付款方式退還你所支持的金額（不包含虛擬帳號轉帳交易手續費）。您將會收到金流公司所寄出的退款信件，請根據信中的指示完成退款步驟。</p>
            </div>  
            <div id="mycard" className="flex">

            {this.state.Films.map((data, idx) => 
                <figure className="card">
                    <div className="mycontent cover">                        
                        <Link to={`cf-films-detail-page?id=${data.id_movie}&cf=true`}>
                        <img className="post" src={`${process.env.PUBLIC_URL}/images/${data.release_year}_${data.name_en.split(' ').join('_').replace(':', '')}.jpg`} alt="" />
                        </Link>
                    </div>
                    
                    <p className="first">{data.release_year}</p>
                    <p>{data.name_zhtw}</p>
                    <div id="progressbar">
                        <div id="bar" style={{width:data.progress*100+'%'}}></div>
                    </div>
                    <h6>目前進度：{data.progress*100}%(尚未達標)</h6>
                    <button className="favorite"><div><i class="fas fa-plus-circle"></i>  參與募資</div></button>
                </figure>
            
            )}
                
                
                
            </div>
                      
            
        </section>
        </div>
    );
  }
}

export default Cffilms;
