import React, { Component } from 'react';
import '../sass/films.scss';
import { Link } from "react-router-dom";
// import Cb from "./myfilm/cb";

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
    handleCollect(evt){
        let isChecked = evt.currentTarget.previousElementSibling.checked;
        let id_movie = evt.currentTarget.getAttribute('data-id-movie');
        let user = sessionStorage.getItem('user');
        let id_user = user === null ? undefined : JSON.parse(user).id;
        let url = "";
        // let collectionNum = sessionStorage.getItem('collectionNum');
        // console.log(evt.currentTarget.previousElementSibling);
        
        if(isChecked){
            console.log("del");
            if (id_user !== undefined){
                url = `https://localhost/tcff_php/api/cart/collection.php/${id_movie}/${id_user}`;
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
            }else{
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
            
        }else{
            console.log("add")
            if (id_user !== undefined) {
                url = `https://localhost/tcff_php/api/cart/collection.php`;
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
                            collection.films.push(data.collection_info[0]);
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
            } else {
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
            // url = `https://localhost/tcff_php/api/cart/collection.php/{id_movie}`;
            // let ar = this.state.datas.map(film => {
            //     if (film.id_movie == id_movie) {
            //         film.collect = true;
            //     }
            //     return film;
            // })
            // this.setState({ datas: ar });
        }
    }
    handleMove(evt){
        let moveTo = evt.target.innerHTML;
        let index;
        console.log(moveTo.slice(0, -1));
        if(evt.target.classList[0] === "detailYear"){
            index = this.state.datas.findIndex(a => a.release_year >= moveTo.slice(0,-1));
        }else{
            index = this.state.datas.findIndex(a => a.theme >= moveTo);
        }
        console.log(index);
        // let index = this.state.datas.findIndex(a => a.release_year >= value);
        this.positioning(index);
        this.pickBook(evt, index);
        // setTimeout(() => this.setState({ moveTo: moveTo }), 1000);
    }
    handleSort(evt){
        console.log("id: ",evt.target.previousSibling.id);
        let target = evt.target;
        // let htmlFor = target.getAttribute('htmlFor');
        let sortBy = target.classList[0];
        let parent = target.parentNode;
        // let value = evt.target.value;
        // let isChecked = target.previousSibling.checked;
        let isChecked = (sortBy === "optionYear" ? "year" : "theme") === this.state.sortBy;

        console.log(sortBy, parent, isChecked);
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
                //翻開分類第一本
                // let index = newAr.findIndex(a => a.release_year >= value);
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
                // let index = newAr.findIndex(a => a.theme == value);
                let index = 30;
                console.log(index);
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
    positioning(index){
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
    fadeOut(callBack, p){
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
    handleChange(evt){
        let target = evt.target.id;
        let value = evt.target.value;
        let newAr = [];
        if(target === 'selYear'){
            if(this.state.sortBy !== 'year'){
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
                //翻開分類第一本
                let index = newAr.findIndex(a => a.release_year >= value);

                this.fadeOut(
                    () => {
                        this.setState({ datas: newAr, sortBy: 'year' }); //更新狀態重新渲染
                        this.positioning(index); //移動
                        this.fadeIn(index); //開書
                    } , index
                );
            //同個分類不同選項
            }else{
                let index = this.state.datas.findIndex(a => a.release_year >= value);
                this.positioning(index);
                this.pickBook(evt, index);
            }
        } else if (target === 'selType'){
            if (this.state.sortBy !== 'type') {
                newAr = this.state.datas.sort((a, b) => {
                    if (a.theme > b.theme) {
                        return 1;
                    }
                    if (a.theme < b.theme) {
                        return -1;
                    }
                    return 0;
                });
                let index = newAr.findIndex(a => a.theme == value);
                console.log(index);
                this.fadeOut(
                    () => {
                        console.log('index: ', index);
                        this.setState({ datas: newAr, sortBy: 'type' });
                        this.positioning(index);
                        this.fadeIn(index);
                    }, index
                );
                console.log(target, newAr, this.state);
            }else{
                let index = this.state.datas.findIndex(a => a.theme == value);
                console.log("pickbook_index: ", index)
                console.log("newAr: ", newAr)
                this.positioning(index);
                this.pickBook(evt, index);
            }
        }


    }
    pickBook(evt, i) {
        // console.log('evt: ', evt);
        // console.log('evt.target: ', evt.target);
        // console.log('parentNode: ', evt.target.parentNode);
        // console.log('firstChild: ', evt.target.firstChild);
        // console.log('lastChild: ', evt.target.lastChild);
        // console.log('childNodes: ', evt.target.childNodes);
        // console.log('nextSibling: ', evt.target.nextSibling);
        // console.log('parentElement: ', evt.target.parentElement);
        // console.log('previousSibling: ', evt.target.previousSibling);
        // console.log('removeChild: ', evt.target.removeChild);
        // console.log('parentElement == parentNode : ', evt.target.parentElement == evt.target.parentNode);
        // evt.target.parentElement.classList.add('opened');
        console.log('target', evt.target)
        console.log('current target',evt.currentTarget)
        let books = Array.from(document.querySelectorAll(".book"));

        let index = (i === undefined) ? books.indexOf(evt.currentTarget.parentElement) : i;
        console.log("index i evt: ", index, i, evt);
        this.positioning(index);
        books.map((book, idx) => {
            let isOpen = book.getAttribute('data-open');
            // let parent = book.parentElement;
            let side = book.querySelector('.side');
            let front = book.querySelector('.front');

            // console.log(isOpen);
            // console.log(idx, index);

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
    fadeIn(index){
        let books = Array.from(document.querySelectorAll('.book'));
        let middle = Math.ceil(books.length / 2);
        // console.log("fadeIn: index = ", index)
        // console.log(this.state.datas.length)
        // console.log(index, index !== undefined)
        index = index !== undefined ? index : middle;
        let minIndex = index - this.sideMaxBooks;
        let maxIndex = index + this.sideMaxBooks;
        minIndex = minIndex < 0 ? 0 : minIndex;
        maxIndex = maxIndex > books.length-1 ? books.length-1 : maxIndex;
        console.log(minIndex, maxIndex)
        const show = (i,delay=120) => {
            books[i].classList.add('show');
            let isOpen = books[i].getAttribute('data-open');
            let side = books[i].querySelector('.side');
            let front = books[i].querySelector('.front');
            if (isOpen === 'true'){
                side.style.transform = 'rotateY(0deg)';
                front.style.transform = 'rotateY(90deg)';
                books[i].setAttribute('data-open', false);
                books[i].querySelector('img').classList.add('hide');
            }
            if (i === index) {
                // console.log(i);
                side.style.transform = 'rotateY(-90deg)';
                front.style.transform = 'rotateY(0deg)';
                books[i].setAttribute('data-open', true);
                books[i].querySelector('img').classList.remove('hide');
            }
            // console.log(i);
            // if(i == books.length) return;
            if(i < maxIndex && i > minIndex){
                return (i < books.length - 1) ? setTimeout(() => show(i + 1), delay) : i
            }else{
                return (i < books.length - 1) ? show(i + 1) : i
            }
            
        }
        show(0);
        // for (let i = 0; i < books.length; i++) {
        //     setTimeout(() => {
        //         books[i].classList.add('show');
        //     }, i * 80)
        // }
        // setTimeout(() => {
        //     side.style.transform = 'rotateY(-90deg)';
        //     front.style.transform = 'rotateY(0deg)';
        //     books[middle].setAttribute('data-open', true);
        // }, middle * 80 + 80)
    }
    componentWillMount(){
        let collection = sessionStorage.getItem("collection");
        console.log(collection);
        if(collection === null){
            // fetch(`${process.env.PUBLIC_URL}/json/films.json`)
            // fetch(`http://192.168.39.110/tcff_php/api/movie/read.php?cf=false`)
            fetch(`http://localhost/tcff_php/api/movie/read.php?cf=false`)
            .then((res)=>res.json())
            // .then(films => console.log(films))
            .then((films)=> {
                let types = films.reduce((a, x) => {
                    // console.log({
                    //     a:a,
                    //     x:x
                    // })
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
                films.map(film => {
                    film.collect = false;
                })
                this.setState({
                    datas:films,
                    sortBy:'year',
                    types: types,
                    books:true
                })
            });
            console.log('state: ', this.state);
        }else{
            collection = JSON.parse(collection).films;
            fetch(`http://localhost/tcff_php/api/movie/read.php?cf=false`)
                .then((res) => res.json())
                // .then(films => console.log(films))
                .then((films) => {
                    let types = films.reduce((a, x) => {
                        // console.log({
                        //     a:a,
                        //     x:x
                        // })
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
                    films.map(film => {
                        film.collect = false;
                        collection.forEach(x => {
                            if(x.id_movie === film.id_movie){
                                film.collect = true;
                                return;
                            }
                        })
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
    componentDidUpdate(){
        console.log("update")
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
    componentDidMount() {
        
        // let allBook = document.querySelectorAll('.book');
        // let book = Array.from(allBook);
        // let allFront = document.querySelectorAll('.front');
        // let front = Array.from(allFront);
        // front.forEach((f) => f.style.transform = 'rotateY(90deg)');

        // this.positioning();
        // this.fadeIn();
        // console.log(this.state.datas.map((data, idx) => `${process.env.PUBLIC_URL}/images/${data.year}_${data.name.split(' ').join('_')}.jpg`))
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