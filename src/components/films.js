import React, { Component } from 'react';
import '../sass/films.scss';
import { Link } from "react-router-dom";

class Films extends Component {
    constructor(props) {
        super(props);

        this.fadeOut = this.fadeOut.bind(this);
        this.fadeIn = this.fadeIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.pickBook = this.pickBook.bind(this);        
        this.handleSort = this.handleSort.bind(this);        
        this.handleMove = this.handleMove.bind(this);
        this.handleCollect = this.handleCollect.bind(this); 

        this.state = {
            books:false,
            types:[],
            moveTo: "",
        };

        this.sideMaxBooks = 0;
        this.sideWidth = 0;
        this.bookWidth = 0;
        this.containerWidth = 0;
        this.firstUpdate = false;
    }    
    handleCollect(evt){//收藏
        let isChecked = evt.currentTarget.previousElementSibling.checked;
        let id_movie = evt.currentTarget.getAttribute('data-id-movie');
        let user = sessionStorage.getItem('user');
        let id_user = user === null ? undefined : JSON.parse(user).id;
        let url = "";        
        
        if(isChecked){//刪除收藏
            console.log("刪除收藏");
            if (id_user !== undefined){//已登入
                url = `http://192.168.39.110/tcff_php/api/cart/collection.php/${id_movie}/${id_user}`;
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
                            collection.films = collection.films.filter(x => x.id_movie !==id_movie);
                            sessionStorage.setItem("collection", JSON.stringify(collection));

                            //改變checkbox狀態(setState)
                            let ar = this.state.datas.map(film => {
                                if (film.id_movie == id_movie) {
                                    film.collect = false;
                                }
                                return film;
                            })
                            this.setState({
                                datas: ar
                            });

                            //改變購物車數字 collectionNum
                            this.props.updatecollectionNum();
                        }
                    })
                    .catch(err => console.log(`error with fetch: ` + err.message))
            }else{//未登入(不用寫入db)
                //刪Storage的collection
                let collection = JSON.parse(sessionStorage.getItem('collection'));
                collection.films = collection.films.filter(x => x.id_movie !== id_movie);
                sessionStorage.setItem("collection", JSON.stringify(collection));

                //改變checkbox狀態(setState)
                let ar = this.state.datas.map(film => {
                    if (film.id_movie == id_movie) {
                        film.collect = false;
                    }
                    return film;
                })
                this.setState({
                    datas: ar
                });

                //改變購物車數字 collectionNum
                this.props.updatecollectionNum();
            }
            
        }else{//加入收藏
            console.log("加入收藏")
            if (id_user !== undefined) {//已登入
                url = `http://192.168.39.110/tcff_php/api/cart/collection.php`;
                let body = {
                    id: id_user,
                    id_movie: id_movie
                }
                //先寫入db
                fetch(url, {
                        method: "POST",
                        body: JSON.stringify(body)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log("m: ", data.message);

                        if (data.message === "add 1 collection") {
                            //加入Storage的collection
                            let collection = sessionStorage.getItem('collection');
                            if(collection === null){//第一次加入
                                collection = {
                                    films: [data.collection_info[0]],
                                    cffilms: []
                                }
                            }else{
                                collection = JSON.parse(collection)
                                collection.films.push(data.collection_info[0]);
                            }
                            sessionStorage.setItem("collection", JSON.stringify(collection));

                            //改變checkbox狀態(setState)
                            let ar = this.state.datas.map(film => {
                                if (film.id_movie == id_movie) {
                                    film.collect = true;
                                }
                                return film;
                            })
                            this.setState({
                                datas: ar
                            });

                            //改變購物車數字 collectionNum
                            this.props.updatecollectionNum();
                        }
                    })
                    .catch(err => console.log(`error with fetch: ` + err.message))
            } else {//未登入(不用寫入db)
                //增加Storage的collection
                let collection = sessionStorage.getItem('collection');
                if(collection === null){//第一次加入
                    collection = {
                        films: [],
                        cffilms: []
                    }
                }else{
                    collection = JSON.parse(collection);
                }
                collection.films.push(this.state.datas.filter(x => x.id_movie == id_movie)[0]);
                sessionStorage.setItem("collection", JSON.stringify(collection));

                //改變checkbox狀態(setState)
                let ar = this.state.datas.map(film => {
                    if (film.id_movie == id_movie) {
                        film.collect = true;
                    }
                    return film;
                })
                this.setState({
                    datas: ar
                });

                //改變購物車數字 collectionNum
                this.props.updatecollectionNum();
            }
        }
    }
    handleMove(evt){//換小分類
        let moveTo = evt.target.innerHTML;
        let index;

        //求分類第一本index
        if(evt.target.classList[0] === "detailYear"){
            index = this.state.datas.findIndex(a => a.release_year >= moveTo.slice(0,-1));
        }else{
            index = this.state.datas.findIndex(a => a.theme >= moveTo);
        }

        //位移，開書
        this.positioning(index);
        this.pickBook(evt, index);

    }
    handleSort(evt){//換大分類
        let target = evt.target;
        let sortBy = target.classList[0];
        let parent = target.parentNode;

        let isChecked = (sortBy === "optionYear" ? "year" : "theme") === this.state.sortBy;

        let newAr = [];
        if(isChecked === false){
            if (sortBy === "optionYear"){
                //依年代排序
                newAr = this.state.datas.sort((a, b) => {
                    if (a.release_year > b.release_year) {
                        return 1;
                    }
                    if (a.release_year < b.release_year) {
                        return -1;
                    }
                    return 0;
                });
                //翻開正中間                
                let index = 30;

                this.fadeOut(
                    () => {
                        this.setState({ datas: newAr, sortBy: 'year' }); //更新狀態重新渲染
                        this.positioning(index); //移動
                        this.fadeIn(index); //開書
                    }, index
                );
            }else{
                newAr = this.state.datas.sort((a, b) => {
                    if (a.theme > b.theme) {
                        return 1;
                    }
                    if (a.theme < b.theme) {
                        return -1;
                    }
                    return 0;
                });
                //翻開正中間
                let index = 30;

                this.fadeOut(
                    () => {
                        console.log('index: ', index);
                        this.setState({ datas: newAr, sortBy: 'theme' });
                        this.positioning(index);
                        this.fadeIn(index);
                    }, index
                );
            }
        }
    }
    positioning(index){//書的位移
        let books = Array.from(document.querySelectorAll('.book'));
        let middle = Math.ceil(books.length / 2);
        //封面寬
        let bookwidth = parseInt(window.getComputedStyle(document.querySelector('.front'), null).getPropertyValue("width"),10);
        //書背寬
        let sidewidth = parseInt(window.getComputedStyle(document.querySelector('.side'), null).getPropertyValue("width"),10);
        let containerwidth = parseInt(window.getComputedStyle(document.getElementById('container'), null).getPropertyValue("width"),10);
        let centralline = containerwidth / 2;
        let span = sidewidth * 0.6; // 書與書的間隔
        let sideminimun = Math.floor(((containerwidth - bookwidth) / 2) / (span + sidewidth)); //兩旁能容納的本數
        this.bookWidth = bookwidth;
        this.sideWidth = sidewidth;
        this.containerWidth = containerwidth;
        this.sideMaxBooks = sideminimun;
        index = index === undefined ? middle : index; //點到翻開的書，初始值為最中間的那本

        //點到頭側的書
        if (index < sideminimun) {
            books.map((book, i) => {
                let left;
                if (i < (index)) {
                    left = i * (span + sidewidth) + 'px';
                } else if (i === (index)) {
                    left = i * (span + sidewidth) - sidewidth + 'px';
                } else if (i > (index)) {
                    left = (i - 1) * (span + sidewidth) + bookwidth + span + 'px';
                }
                book.style.left = left;
            })
        //點到尾端的書
        } else if (index > (books.length - sideminimun)) {
            books.map((book, i) => {
                let left;
                if (i === (index)) {
                    left = (containerwidth - sidewidth - bookwidth) - (books.length - 1 - i) * (span + sidewidth) + 'px';
                } else if (i > (index)) {
                    left = (containerwidth - sidewidth) - (books.length - 1 - i) * (span + sidewidth) + 'px';
                }
                else if (i < (index)){
                    left = (containerwidth - bookwidth) - (books.length - 1 - i) * (span + sidewidth) + 'px';
                }
                book.style.left = left;
            })
        //其餘中間的書
        } else {
            books.map((book, i) => {
                let left;
                if (i === (index)) {
                    left = centralline - bookwidth / 2 - sidewidth + 'px';
                }
                else if (i < index) left = centralline - bookwidth / 2 - (span + sidewidth) * (index - i) + 'px';
                else left = centralline + bookwidth / 2 + span + (sidewidth + span) * (i - index - 1) + 'px';
                book.style.left = left;
            })
        }
    }
    fadeOut(callBack, p){//換分類時淡出
        let books = Array.from(document.querySelectorAll(".book"));
        const addFadeOut = (i) => {
            books[i].classList.add('fadeOut');
            return (i < books.length - 1) ? addFadeOut(i+1) : i;
        }

        //遞迴 加上class:fadeOut
        addFadeOut(0);

        //動畫結束移除class
        setTimeout(()=>{
            books.map((book, idx) => {
                book.classList.remove('show');
                book.classList.remove('fadeOut');
            })
            if (callBack) callBack(p);
        }, 1000)
    }
    pickBook(evt, i) {//開書

        let books = Array.from(document.querySelectorAll(".book"));

        let index = (i === undefined) ? books.indexOf(evt.currentTarget.parentElement) : i;

        //位移
        this.positioning(index);

        //開書闔書
        books.map((book, idx) => {
            let isOpen = book.getAttribute('data-open');
            let side = book.querySelector('.side');
            let front = book.querySelector('.front');

            if (isOpen == 'false') {
                if (idx == index) {
                    side.style.transform = 'rotateY(-90deg)';
                    front.style.transform = 'rotateY(0deg)';
                    book.setAttribute('data-open', true);
                    book.querySelector('img').classList.remove('hide');
                }
            }else if(isOpen == 'true'){
                side.style.transform = 'rotateY(0deg)';
                front.style.transform = 'rotateY(90deg)';
                book.setAttribute('data-open', false);
                book.querySelector('img').classList.add('hide');
            }
        })
    }
    fadeIn(index){//書的進場(換分類/進此頁)
        let books = Array.from(document.querySelectorAll('.book'));
        let middle = Math.ceil(books.length / 2);

        //沒給index就翻最中間的書
        index = index !== undefined ? index : middle;

        //求可視範圍書本index
        let minIndex = index - this.sideMaxBooks;
        let maxIndex = index + this.sideMaxBooks;
        minIndex = minIndex < 0 ? 0 : minIndex;
        maxIndex = maxIndex > books.length-1 ? books.length-1 : maxIndex;

        const show = (i,delay=120) => {
            books[i].classList.add('show');
            let isOpen = books[i].getAttribute('data-open');
            let side = books[i].querySelector('.side');
            let front = books[i].querySelector('.front');

            //闔上書本
            if (isOpen === 'true'){
                side.style.transform = 'rotateY(0deg)';
                front.style.transform = 'rotateY(90deg)';
                books[i].setAttribute('data-open', false);
                books[i].querySelector('img').classList.add('hide');
            }
            //打開指定的書
            if (i === index) {
                side.style.transform = 'rotateY(-90deg)';
                front.style.transform = 'rotateY(0deg)';
                books[i].setAttribute('data-open', true);
                books[i].querySelector('img').classList.remove('hide');
            }

            //可視範圍內書本才做動畫
            if(i < maxIndex && i > minIndex){
                return (i < books.length - 1) ? setTimeout(() => show(i + 1), delay) : i
            }else{ //範圍外
                return (i < books.length - 1) ? show(i + 1) : i
            }
            
        }
        show(0); //遞迴呼叫
    }
    componentWillMount(){//fetch data
        let collection = sessionStorage.getItem("collection");
        //Storage中沒有collection
        if(collection === null){
            // fetch(`${process.env.PUBLIC_URL}/json/films.json`)
            // fetch(`http://192.168.39.110/tcff_php/api/movie/read.php?cf=false`)
            fetch(`http://192.168.39.110/tcff_php/api/movie/read.php?cf=false`)
            .then((res)=>res.json())
            .then((films)=> {
                let types = films.reduce((a, x) => {
                    if (!a.includes(x.theme)) {
                        a.push(x.theme);
                    }
                    return a;
                }, []);
                films = films.sort((a, b) => {
                    if (a.release_year > b.release_year) {
                        return 1;
                    }
                    if (a.release_year < b.release_year) {
                        return -1;
                    }
                    return 0;
                })
                types = types.sort((a,b) => {
                    if (a > b) {
                        return 1;
                    }
                    if (a < b) {
                        return -1;
                    }
                    return 0;
                })

                //全部影片都未收藏
                films = films.map(film => {
                    film.collect = false;
                    return film;
                })
                this.setState({
                    datas: films,
                    sortBy:'year',
                    types: types,
                    books: true
                })
            });
        }else{ //已有收藏
            collection = JSON.parse(collection).films;
            fetch(`http://192.168.39.110/tcff_php/api/movie/read.php?cf=false`)
                .then((res) => res.json())
                .then((films) => {
                    let types = films.reduce((a, x) => {
                        if (!a.includes(x.theme)) {
                            a.push(x.theme);
                        }
                        return a;
                    }, []);
                    films = films.sort((a, b) => {
                        if (a.release_year > b.release_year) {
                            return 1;
                        }
                        if (a.release_year < b.release_year) {
                            return -1;
                        }
                        return 0;
                    })
                    types = types.sort((a, b) => {
                        if (a > b) {
                            return 1;
                        }
                        if (a < b) {
                            return -1;
                        }
                        return 0;
                    })
                    films = films.map(film => {
                        film.collect = false;
                        collection.forEach(x => {
                            if(x.id_movie === film.id_movie){
                                film.collect = true;
                                return;
                            }
                        })
                        return film
                    })
                    this.setState({
                        datas: films,
                        sortBy: 'year',
                        types: types,
                        books: true
                    })
                });
        }
    }
    componentDidUpdate(){//書本初始狀態(位移、淡入、調整書背書面角度)
        console.log("films Did Update")
        if(!this.firstUpdate){
            let allBook = document.querySelectorAll('.book');
            let book = Array.from(allBook);
            let allFront = document.querySelectorAll('.front');
            let front = Array.from(allFront);
            front.forEach((f) => f.style.transform = 'rotateY(90deg)');

            this.positioning();
            this.fadeIn();
            this.firstUpdate = true;
        }
    }
    render() {
        console.log('render', this.state)        
        return (
            <div id="container">
                <div id="filmsPage">
                    <div className="buttons">
                        <select name="" id="selType" onChange={this.handleChange}>{this.state.types.map((type, idx) => <option key={idx} value={type}>{type}</option>)}</select>
                        <select name="" id="selYear" onChange={this.handleChange}>
                            <option value="1960">1960</option>
                            <option value="1970">1970</option>
                            <option value="1980">1980</option>
                            <option value="1990">1990</option>
                            <option value="2000">2000</option>
                        </select>
                    </div>
                    {this.state.books && (
                        <div className="sortBy">
                            
                                <input type="radio" name="sortBy" id="sortByYear" checked={this.state.sortBy === "year" ? true : false} />
                                <label className="optionYear" htmlFor="sortByYear" onClick={this.handleSort}>年代</label>
                            
                            
                                
                                <input type="radio" name="sortBy" id="sortByTheme" checked={this.state.sortBy === "theme" ? true : false} />
                                <label className="optionTheme" htmlFor="sortByTheme" onClick={this.handleSort}>類型</label>
                                <div className="sortDetailYear">
                                    <input type="radio" name="sortDetail" id="to1960s" />
                                    <label className="detailYear" htmlFor="to1960s" onClick={this.handleMove}>1960s</label>
                                    <input type="radio" name="sortDetail" id="to1970s" />
                                    <label className="detailYear" htmlFor="to1970s" onClick={this.handleMove}>1970s</label>
                                    <input type="radio" name="sortDetail" id="to1980s" />
                                    <label className="detailYear" htmlFor="to1980s" onClick={this.handleMove}>1980s</label>
                                    <input type="radio" name="sortDetail" id="to1990s" />
                                    <label className="detailYear" htmlFor="to1990s" onClick={this.handleMove}>1990s</label>
                                    <input type="radio" name="sortDetail" id="to2000s" />
                                    <label className="detailYear" htmlFor="to2000s" onClick={this.handleMove}>2000s</label>
                                </div>
                                <div className="sortDetailTheme">
                                    {this.state.types.map((type, idx) => 
                                        (<div key={idx}>
                                            <input type="radio" name="sortDetail" id={`toType${idx}`} />
                                            <label className="detailTheme" htmlFor={`toType${idx}`} onClick={this.handleMove}>{type}</label>
                                        </div>)
                                    )}
                                </div>
                            <div className="frame"></div>
                        
                            
                          
                        </div>
                    )}
                    {
                        this.state.books && (
                            <div id="books">
                                {this.state.datas.map((data, idx) => {
                                    return (
                                        
                                        <div className="book" data-open='false'>
                                            <div className="side" onClick={this.pickBook}>
                                                <h1>
                                                    <span className="year">{data.release_year + "│    " + data.name_zhtw.replace('：', ' ').slice(0,8)}</span>
                                                    {/* <span className="name">{data.name_zhtw}</span> */}
                                                    <span className="theme">{data.theme}</span>
                                                    {/* {data.name_zhtw}{data.theme} */}
                                                    {/* <h3>{data.theme}</h3> */}
                                                    </h1>
                                                </div>
                                            <div className="front">
                                                <img className="hide" src={`${process.env.PUBLIC_URL}/images/${data.release_year}_${data.name_en.split(' ').join('_').replace(':', '_')}.jpg`} />
                                                <div className="top">
                                                    <div className="h4">
                                                        <h4>{data.release_year + "│    " + data.theme}</h4>
                                                    </div>
                                                    <div className="h2">
                                                        <h2 className="name">{data.name_zhtw}</h2>
                                                        <h5 className="name">{data.name_en}</h5>
                                                    </div>
                                                    
                                                    <div className="h5">
                                                        {/* <h5>{data.theme}</h5> */}
                                                        <h5>{data.director_name}</h5>
                                                    </div>
                                                    
                                                </div>
                                                <div className="btm">
                                                    <Link to={`films-detail-page?id=${data.id_movie}`}>
                                                        電影內容
                                                    </Link>
                                                    {/* <button onClick="" className="addCollection" type="button" data-liked="false">
                                                        {
                                                            false ? <i class="far fa-heart"></i> : <i class="fas fa-heart"></i>
                                                        }                                                       
                                                    </button> */}
                                                    <input type="checkbox" name="" id={"add-" + data.id_movie} checked={data.collect} />
                                                    <label htmlFor={"add-" + data.id_movie} onClick={this.handleCollect} data-id-movie={data.id_movie}>
                                                        <i className="fas fa-heart"></i>
                                                    </label>
                                                </div>
                                                
                                                
                                            </div>
                                            </div> 
                                            )
                                })
                                }
                            </div>
                        )
                    }      
                </div>
            </div>
        );
    }    
}

export default Films;