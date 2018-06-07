import React, { Component } from 'react';
import '../sass/films.scss';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
// import $ from 'jquery';
// import alien from '../images/1974_alien.jpg';

class Films extends Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.fadeOut = this.fadeOut.bind(this);
        this.fadeIn = this.fadeIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.pickBook = this.pickBook.bind(this);        
        this.state = {
            books:false,
            types:[]
        };
        // this.types = ["romance", "family", "thrill", "war", "sci-fi", "drama", "comedy", "adventure", "crime"];
        // this.types = [];
    }    
    positioning(index){
        let books = Array.from(document.querySelectorAll('.book'));
        let middle = Math.ceil(books.length / 2);
        // let displacement = 0;
        let bookwidth = parseInt(window.getComputedStyle(document.querySelector('.front'), null).getPropertyValue("width"));
        let sidewidth = parseInt(window.getComputedStyle(document.querySelector('.side'), null).getPropertyValue("width"));
        // console.log(bookwidth);
        // console.log(sidewidth);
        let containerwidth = parseInt(window.getComputedStyle(document.getElementById('container'), null).getPropertyValue("width"));
        // console.log(containerwidth);
        let centralline = containerwidth / 2;
        let span = sidewidth * 0.6;
        let middleposition = centralline - sidewidth / 2;
        let sideminimun = Math.floor(((containerwidth - bookwidth) / 2) / (span + sidewidth));
        // console.log(sideminimun);
        // let i = 0;
        index = index == undefined ? middle : index;
        if (index < sideminimun) {
            books.map((book, i) => {
                let left;
                if (i < (index)) {
                    left = i * (span + sidewidth) + 'px';
                    // console.log('<<');
                } else if (i == (index)) {
                    left = i * (span + sidewidth) - sidewidth + 'px';
                    // console.log('<==');
                } else if (i > (index)) {
                    left = (i - 1) * (span + sidewidth) + bookwidth + span + 'px';
                    // console.log('<>');
                }
                // console.log(left);
                book.style.left = left;
            })
        } else if (index > (books.length - sideminimun)) {
            books.map((book, i) => {
                let left;
                if (i == (index)) {
                    left = (containerwidth - sidewidth - bookwidth) - (books.length - 1 - i) * (span + sidewidth) + 'px';
                    // console.log('>==');
                } else if (i > (index)) {
                    left = (containerwidth - sidewidth) - (books.length - 1 - i) * (span + sidewidth) + 'px';
                    // console.log('>>');
                }
                else if (i < (index)){
                    left = (containerwidth - bookwidth) - (books.length - 1 - i) * (span + sidewidth) + 'px';
                    // console.log('><');
                }
                // console.log(left);
                book.style.left = left;
            })
        } else {
            books.map((book, i) => {
                let left;
                if (i == (index)) {
                    left = centralline - bookwidth / 2 - sidewidth + 'px';
                }
                else if (i < index) left = centralline - bookwidth / 2 - (span + sidewidth) * (index - i) + 'px';
                else left = centralline + bookwidth / 2 + span + (sidewidth + span) * (i - index - 1) + 'px';
                book.style.left = left;
            })
        }
    }
    fadeOut(callBack, p){
        // console.log(this);
        // console.log(evt.target);
        let books = Array.from(document.querySelectorAll(".book"));
        const addFadeOut = (i) => {
            books[i].classList.add('fadeOut');
            return (i < books.length - 1) ? addFadeOut(i+1) : i;
        }
        addFadeOut(0);
        // books.map((book, idx) => {
        //     book.classList.add('fadeOut');
        // })
        setTimeout(()=>{
            books.map((book, idx) => {
                book.classList.remove('show');
                book.classList.remove('fadeOut');
            })
            if (callBack) callBack(p);
        }, 1000)
    }
    refresh(evt){
        // console.log(this);
        // console.log(evt.target);
        // let books = Array.from(document.querySelectorAll(".book"));
        this.fadeOut(this.fadeIn);
        // books.map((book, idx) => {
        //     book.classList.remove('show');
        // })
    }
    handleChange(evt){
        // console.log(this);
        // console.log(evt.target.id);
        console.log(evt.target.value);
        let target = evt.target.id;
        let value = evt.target.value;
        let newAr = [];
        if(target == 'selYear'){
            if(this.state.sortBy !== 'year'){
                newAr = this.state.datas.sort((a, b) => {
                    if (a.release_year > b.release_year) {
                        return 1;
                    }
                    if (a.release_year < b.release_year) {
                        return -1;
                    }
                    return 0;
                });
                let index = newAr.findIndex(a => a.release_year >= value);
                console.log(index);
                this.fadeOut(
                    () => {
                        console.log('index: ', index);
                        this.setState({ datas: newAr, sortBy: 'year' });
                        this.positioning(index);
                        this.fadeIn(index);
                    } , index
                );
                console.log(target, newAr, this.state);
            }else{
                let index = this.state.datas.findIndex(a => a.release_year >= value);
                // console.log("pickbook_index: ", index)
                this.positioning(index);
                this.pickBook(evt, index);
            }
        } else if (target == 'selType'){
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
        const show = (i,delay=80) => {
            books[i].classList.add('show');
            let isOpen = books[i].getAttribute('data-open');
            let side = books[i].querySelector('.side');
            let front = books[i].querySelector('.front');
            if (isOpen === 'true'){
                side.style.transform = 'rotateY(0deg)';
                front.style.transform = 'rotateY(90deg)';
                books[i].setAttribute('data-open', false);
            }
            if (i == (index !== undefined ? index : middle)) {
                // console.log(i);
                side.style.transform = 'rotateY(-90deg)';
                front.style.transform = 'rotateY(0deg)';
                books[i].setAttribute('data-open', true);
                books[i].querySelector('img').classList.remove('hide');
            }
            // console.log(i);
            // if(i == books.length) return;
            return (i < books.length - 1) ? setTimeout(() => show(i+1), delay) : i
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
        // fetch(`${process.env.PUBLIC_URL}/json/films.json`)
        fetch(`http://192.168.39.110/tcff_php/api/movie/read.php?cf=false`)
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
            this.setState({
                datas:films,
                sortBy:'year',
                types: types,
                books:true
            })
        });
        console.log('state: ', this.state);
    }
    componentDidUpdate(){
        let allBook = document.querySelectorAll('.book');
        let book = Array.from(allBook);
        let allFront = document.querySelectorAll('.front');
        let front = Array.from(allFront);
        front.forEach((f) => f.style.transform = 'rotateY(90deg)');

        this.positioning();
        this.fadeIn();
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
                        {/* <button onClick={this.fadeOut}>fade out</button>		 */}
                        <button onClick={this.refresh}>refresh</button>
                        <select name="" id="selType" onChange={this.handleChange}>{this.state.types.map((type, idx) => <option key={idx} value={type}>{type}</option>)}</select>
                        <select name="" id="selYear" onChange={this.handleChange}>
                            <option value="1960">1960</option>
                            <option value="1970">1970</option>
                            <option value="1980">1980</option>
                            <option value="1990">1990</option>
                            <option value="2000">2000</option>
                        </select>
                    </div>
                    {
                        this.state.books && (
                            <div id="books">
                                {this.state.datas.map((data, idx) => {
                                    return (
                                        
                                        <div className="book" data-open='false'>
                                            <div className="side" onClick={this.pickBook}><h1><span>{data.release_year}</span>{data.name_zhtw}<h3>{data.theme}</h3></h1></div>
                                            <div className="front">
                                                <img className="hide" src={`${process.env.PUBLIC_URL}/images/${data.release_year}_${data.name_en.split(' ').join('_').replace(':', '_')}.jpg`} />
                                                <Link to={`films-detail-page?id=${data.id_movie}`}>
                                                    電影內容
                                                </Link>
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