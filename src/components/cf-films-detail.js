import React, { Component } from 'react';
import $ from 'jquery';
// import '../sass/page.scss';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import '../sass/films-detail.scss';

class Cffilmsdetail extends Component {
    constructor(props){
        super(props);
        this.slide = [];
        this.state = {
            films: [],
            slide: []
        }
        this.handleCollect = this.handleCollect.bind(this)
    }
    handleCollect(evt){
        let isChecked = evt.currentTarget.previousElementSibling.checked;
        console.log("isChecked", isChecked)
        let id_movie = evt.currentTarget.getAttribute('data-id-movie');
        let user = sessionStorage.getItem('user');
        let id_user = user === null ? undefined : JSON.parse(user).id;
        let url = "";
        // let collectionNum = sessionStorage.getItem('collectionNum');
        // console.log(evt.currentTarget.previousElementSibling);
        
        if(isChecked){
            console.log("del");
            if (id_user !== undefined){
                url = `https://192.168.39.110/tcff_php/api/cart/collection.php/${id_movie}/${id_user}`;
                fetch(url,{
                    method:"DELETE",
                    headers: {
                        "Access-Control-Request-Headers": "X-PINGOTHER, Content-Type",
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    mode:'cors'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("m: ", data.message);
                        if(data.message === "delete 1 data"){
                            //刪Storage的collection
                            let collection = JSON.parse(sessionStorage.getItem('collection'));
                            collection.cffilms = collection.cffilms.filter(x => x.id_movie !==id_movie);
                            sessionStorage.setItem("collection", JSON.stringify(collection));

                            //改變checkbox狀態(setState)
                            let ar = this.state.films;
                                    ar.collect = false;
                                
                            this.setState({
                                films: ar
                            });

                            //改變購物車數字 collectionNum
                            this.props.updatecollectionNum();
                        }
                    })
                    .catch(err => console.log(`error with fetch: ` + err.message))
            }else{
                //刪Storage的collection
                let collection = JSON.parse(sessionStorage.getItem('collection'));
                collection.cffilms = collection.cffilms.filter(x => x.id_movie !== id_movie);
                sessionStorage.setItem("collection", JSON.stringify(collection));

                let ar = this.state.films;
                        ar.collect = false;
    
                this.setState({
                    films: ar
                });

                //改變購物車數字 collectionNum
                this.props.updatecollectionNum();
            }
            
        }else{
            console.log("add")
            if (id_user !== undefined) {
                url = `https://192.168.39.110/tcff_php/api/cart/collection.php`;
                let body = {
                    id: id_user,
                    id_movie: id_movie
                }
                fetch(url, {
                        method: "POST",
                        body: JSON.stringify(body)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log("m: ", data.message);
                        if (data.message === "add 1 collection") {
                            //刪Storage的collection
                            let collection = JSON.parse(sessionStorage.getItem('collection'));
                            collection.cffilms.push(data.collection_info[0]);
                            sessionStorage.setItem("collection", JSON.stringify(collection));

                            //改變checkbox狀態(setState)
                            let ar = this.state.films;
                                    ar.collect = true;
                                
                            this.setState({
                                films: ar
                            });

                            //改變購物車數字 collectionNum
                            this.props.updatecollectionNum();
                        }
                    })
                    .catch(err => console.log(`error with fetch: ` + err.message))
            } else {
                //增加Storage的collection
                let collection = sessionStorage.getItem('collection');
                if(collection === null){
                    collection = {
                        films: [],
                        cffilms: []
                    }
                    // collection.films.push(this.state.datas.filter(x => x.id_movie == id_movie));
                }else{
                    collection = JSON.parse(collection);
                    // collection.films.push(this.state.datas.filter(x => x.id_movie == id_movie));
                }
                collection.cffilms.push(this.state.films);
                // collection.films.push(data.collection_info[0]);
                sessionStorage.setItem("collection", JSON.stringify(collection));

                let ar = this.state.films;
                ar.collect = true;
                this.setState({
                    films: ar
                });

                //改變購物車數字 collectionNum
                this.props.updatecollectionNum();
            }
            console.log("state", this.state.films)

        }
    }
    componentDidMount(){
        
        // 連結後端資料
        console.log("match",this.props);
        console.log("query",window.location.search)
        let q = window.location.search;
        let id = q.slice(q.search('=') +1)
        console.log("id",id)
        fetch(`http://192.168.39.110/tcff_php/api/movie/readOne.php?id=${id}&cf=true`)
         .then((res) => res.json())
         .then((datas) => {
            console.log(datas) 
            this.setState({
             films: datas
         }, () => {
            fetch(`http://192.168.39.110/tcff_php/api/movie/cfRead.php`)
            .then((res) => res.json())
            .then((datas) => {
               console.log(datas) 
               console.log("state",this.state.films)
               let films = this.state.films;
               let id_movie = films.id_movie;
               films.progress = datas[id_movie] == undefined ? 0 : datas[id_movie];
               films.collect = false;
                let collection = JSON.parse(sessionStorage.getItem("collection"));
                if(collection.cffilms !== null){
                    let cf_ids = collection.cffilms.reduce((a,x) => {
                        a.push(x.id_movie);
                        return a;
                    },[])
                    if(cf_ids.includes(id_movie)) films.collect = true;
                }
               this.setState({Films:films});
               console.log("films",films)
               })

               //  sliiderShow 圖片滑動
             let path = `${this.state.films.release_year}_${this.state.films.name_en.split(' ').join('_').replace(':', '_')}`;
             console.log(path);
             let trailer = `${this.state.films.trailer}`;
             let slide = [];
             for(let i=1;i<=6;i++){
                let url = `${process.env.PUBLIC_URL}/images/` + path + "_0" + i + '.jpg';
                slide.push(url);
             }
             this.setState({slide:slide}, () =>{
                // var slides = [img01,img02,img03,img04,img05];
                let slides = this.state.slide;
                var slideWidth = $(".slide_wrap").width();
                var slideNum=0;
                // console.log(slides[0]);
                //var sildeCount=$(".slides li").length;
                var slideCount = slides.length;
                console.log(slideWidth);
        
                for(let $i=0; $i< slideCount;$i++){
                    // console.log(slides[$i]);
                    $(".slides").append(`<li><a href='` + trailer + `'><div class='play_video' ></div></a><img src="${slides[$i]}" alt=''></li>`)
                    $(".pages").append("<li></li>");
                }
        
                
                setWidth();
        
                $(".pages li").eq(0).css("background","white");
                $(".pages").on("mouseenter","li",function(){
                    slideNum=$(this).index();
                    moveSlide(slideNum);
                });
                $("#left").click(function(){
                    slideNum--;
                    if(slideNum<0)slideNum=slideCount-1;
                    moveSlide(slideNum);
                });
                $("#right").click(function(){
                    slideNum++;
                    if(slideNum>=slideCount)slideNum=0;
                    moveSlide(slideNum);
                });
                $(window).resize(function(){
                    setWidth();
                });
                function setWidth(){
                    slideWidth = $(".slide_wrap").width();
                    $(".slides li").width(slideWidth);
                    $(".slide_wrap ul.slides").width(slideWidth*slideCount);
                    moveSlide(slideNum);
                };
                function moveSlide(slideNum){
                     var slideMove = 0-slideNum*slideWidth;
                    $(".pages li").eq(slideNum).css("background","white")
                        .siblings().css("background","transparent");
                    $(".slides").css("left",slideMove);
                }
             })
         }
        )})
        
        
    }
  render() {
         
    return (
        <div>
            <div className="box3 box">            
                <div className="slide_wrap">
                    <ul className="slides">
                        {/* <li><img src="images/slide1.jpeg" alt=""></li>
                        <li><img src="images/slide2.jpeg" alt=""></li>
                        <li><img src="images/slide3.jpeg" alt=""></li>
                        <li><img src="images/slide4.jpeg" alt=""></li> */}
                    </ul>
                    <ul className="pages">
                        {/* <li></li>
                        <li></li>
                        <li></li>
                        <li></li> */}
                    </ul>
                    <a className="arrow arrow_left" id="left"><i class="fas fa-angle-left"></i></a>
                    <a className="arrow arrow_right" id="right"><i class="fas fa-angle-right"></i></a>
                </div>
            </div>
            
                <div className="box3">
                    <div className="myfilmname">
                    <div id="h01">
                            <h1>{this.state.films.release_year}</h1>
                        </div>
                        
                        <div className="l_pad">
                            <h1>{this.state.films.name_zhtw}</h1>
                            <span>{this.state.films.name_en}</span>
                        </div>
                    </div>
                    <div className="myfont">
                        <div className="fpg">
                            <div className="l_font">國家</div>
                            <div className="r_font">{this.state.films.country}</div>
                        </div>
                        <div className="fpg">
                            <div className="l_font">片長</div>
                            <div className="r_font">{this.state.films.running_time}分鐘</div>
                        </div>
                        <div className="fpg">
                            <div className="l_font">級別</div>
                            <div className="r_font">{this.state.films.rating}</div>
                        </div>            
                        <input type="checkbox" id={`id_${this.state.films.id_movie}`} checked={this.state.films.collect}/>
                        <label htmlFor={`id_${this.state.films.id_movie}`} className="favorite" onClick={this.handleCollect} data-id-movie={this.state.films.id_movie}>
                            <i class="fas fa-plus-circle"></i>  
                            {
                                this.state.films.collect == true ? ' 已加入票夾' : ' 加入我的票夾'
                            }
                        </label>
                    </div>        
                </div>

                <section className="container-filmsDetail">
                    <h2>募資進度 {Math.round(this.state.films.progress*100)}%</h2>
                    <div id="progressbar">
                        <div id="bar" style={{width:this.state.films.progress*100+'%'}}></div>
                    </div>
                    <div className="about">
                        <h2>劇情簡介</h2>
                        {this.state.films.synopsis}
                    </div>
                    <div className="about">
                        <h2>獲獎事蹟</h2> 
                        {this.state.films.award}
                    </div>                  
                </section>

                <section className="box2">
                    <div className="mycontain">
                        <div className="flex dir">
                            <h2>導<br /><br />演</h2>
                            <div className="mycontent cover">                
                                <div className="mycontent-overlay"></div>
                                <img className="mycontent-image" src={this.state.films.director == undefined ? '' : `${process.env.PUBLIC_URL}/images/${this.state.films.director[0].director_name_en.split(' ').join('_').replace(':', '')}.jpg`} />
                                <div className="mycontent-details fadeIn-bottom">
                                    <h3 className="mycontent-title">{this.state.films.director == undefined ? '' : this.state.films.director[0].director_name_zhtw}</h3>
                                    <h4 className="mycontent-title">{this.state.films.director == undefined ? '' : this.state.films.director[0].director_name_en}</h4>
                                    <hr />
                                    <p className="mycontent-text">{this.state.films.director == undefined ? '' : this.state.films.director[0].director_description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex act">
                            <div className="flex">
                                <h2>主要演員</h2>
                                <div className="mycontent cover">                
                                    <div className="mycontent-overlay"></div>
                                    <img className="mycontent-image" src={this.state.films.cast == undefined ? '' : `${process.env.PUBLIC_URL}/images/${this.state.films.cast[0].cast_name_en.split(' ').join('_').replace(':', '')}.jpg`} />
                                    <div className="mycontent-details fadeIn-bottom">
                                        <h3 className="mycontent-title">{this.state.films.director == undefined ? '' : this.state.films.cast[0].cast_name_zhtw}</h3>
                                        <h4 className="mycontent-title">{this.state.films.director == undefined ? '' : this.state.films.cast[0].cast_name_en}</h4>
                                        <hr />
                                        <p className="mycontent-text">{this.state.films.director == undefined ? '' : this.state.films.cast[0].cast_description}</p>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.films.cast == undefined ? '' : this.state.films.cast.map((c,i) => i==0 ? '' : (
                                <div className="mycontent cover left">            
                                    <div className="mycontent-overlay"></div>
                                    <img className="mycontent-image" src={`${process.env.PUBLIC_URL}/images/${c.cast_name_en.split(' ').join('_').replace(':', '')}.jpg`} />
                                    <div className="mycontent-details fadeIn-bottom">
                                        <h3 className="mycontent-title">{c.cast_name_zhtw}</h3>
                                        <h4 className="mycontent-title">{c.cast_name_en}</h4>
                                        <hr />
                                        <p className="mycontent-text">{c.cast_description}</p>
                                    </div>
                                </div>
                                ))
                            }

                                {/* <div className="mycontent cover left">        
                                    <div className="mycontent-overlay"></div>
                                    <img className="mycontent-image" src={act03} /> 
                                    <div className="mycontent-details fadeIn-bottom">
                                        <h3 className="mycontent-title">{movie.cast[2].cast_name_zhtw}</h3>
                                        <h4 className="mycontent-title">{movie.cast[2].cast_name_en}</h4>
                                        <hr />
                                        <p className="mycontent-text">{movie.cast[2].cast_description}</p>
                                    </div>
                                </div> */}
                            </div>

                    </div>                
                </section>
            
        </div>
    );
  }
}

export default Cffilmsdetail;
