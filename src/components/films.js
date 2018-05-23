import React, { Component } from 'react';
import '../sass/films.scss';
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
            datas: [
                { "name": "Psycho", "year": 1960, "type": "thirll" },
                { "name": "The Graduate", "year": 1967, "type": "romance" },
                { "name": "Bonnie and Clyde", "year": 1967, "type": "family" },
                { "name": "The Sound of Music", "year": 1965, "type": "comedy" },
                { "name": "Mary Poppins", "year": 1964, "type": "crime" },
                { "name": "Breakfast at Tiffany's", "year": 1961, "type": "adventure" },
                { "name": "101 Dalmations", "year": 1961, "type": "war" },
                { "name": "My Fair Lady", "year": 1964, "type": "sci-fi" },
                { "name": "Yellow Submarine", "year": 1968, "type": "thirll" },
                { "name": "Dragon Inn", "year": 1967, "type": "romance" },
                { "name": "A Fistful of Dollars", "year": 1964, "type": "family" },
                { "name": "Goldfinger", "year": 1964, "type": "comedy" },
                { "name": "2001 A Space Odyssey", "year": 1968, "type": "crime" },
                { "name": "Guess Who's Coming to Dinner", "year": 1967, "type": "adventure" },
                { "name": "The Longest Day", "year": 1962, "type": "war" },
                { "name": "The Godfather", "year": 1972, "type": "sci-fi" },
                { "name": "One Flew Over the Cuckoo's Nest", "year": 1971, "type": "thirll" },
                { "name": "Star Wars", "year": 1973, "type": "romance" },
                { "name": "Alien", "year": 1974, "type": "family" },
                { "name": "A Clockwork Orange", "year": 1974, "type": "comedy" },
                { "name": "Taxi Driver", "year": 1975, "type": "crime" },
                { "name": "Rocky", "year": 1975, "type": "adventure" },
                { "name": "Jaws", "year": 1975, "type": "war" },
                { "name": "Annie Hall", "year": 1977, "type": "sci-fi" },
                { "name": "The Godfather Part 2", "year": 1974, "type": "thirll" },
                { "name": "Apocalypse Now", "year": 1979, "type": "romance" },
                { "name": "The Sting", "year": 1973, "type": "family" },
                { "name": "Chinatown", "year": 1974, "type": "comedy" },
                { "name": "The Deer Hunter", "year": 1978, "type": "crime" },
                { "name": "Kramer vs. Kramer", "year": 1979, "type": "adventure" },
                { "name": "The Elephant Man", "year": 1980, "type": "war" },
                { "name": "Raiders of the Lost Ark", "year": 1981, "type": "sci-fi" },
                { "name": "Mad Max 2", "year": 1981, "type": "thirll" },
                { "name": "Blade Runner", "year": 1982, "type": "romance" },
                { "name": "E.T.", "year": 1982, "type": "family" },
                { "name": "First Blood", "year": 1982, "type": "comedy" },
                { "name": "Rocky 4", "year": 1985, "type": "crime" },
                { "name": "Star Wars Episode 6: Return of the Jedi", "year": 1983, "type": "adventure" },
                { "name": "A Nightmare on Elm Street", "year": 1984, "type": "war" },
                { "name": "Ghostbusters", "year": 1984, "type": "sci-fi" },
                { "name": "The Karate Kid", "year": 1984, "type": "thirll" },
                { "name": "Back to the Future", "year": 1985, "type": "romance" },
                { "name": "Back to the Future Part 2", "year": 1989, "type": "family" },
                { "name": "Rain Man", "year": 1988, "type": "comedy" },
                { "name": "Die Hard", "year": 1988, "type": "crime" },
                { "name": "Good Will Hunting", "year": 1997, "type": "adventure" },
                { "name": "Forrest Gump", "year": 1994, "type": "war" },
                { "name": "Jurassic Park", "year": 1993, "type": "sci-fi" },
                { "name": "The Lost World: Jurassic Park 2", "year": 1997, "type": "thirll" },
                { "name": "Star Wars Episode 1: The Phantom Menace", "year": 1999, "type": "romance" },
                { "name": "Home Alone", "year": 1990, "type": "family" },
                { "name": "Home Alone 2", "year": 1992, "type": "comedy" },
                { "name": "Home Alone 3", "year": 1997, "type": "crime" },
                { "name": "Armageddon", "year": 1998, "type": "adventure" },
                { "name": "Speed", "year": 1994, "type": "war" },
                { "name": "Days of Thunder", "year": 1990, "type": "sci-fi" },
                { "name": "Saving Private Ryan", "year": 1998, "type": "thirll" },
                { "name": "Terminator 2", "year": 1991, "type": "romance" },
                { "name": "Titanic", "year": 1997, "type": "family" },
                { "name": "Mr. Holland's Opus", "year": 1995, "type": "comedy" },
                { "name": "Eternal Sunshine of the Spotless Mind", "year": 2004, "type": "crime" },
                { "name": "Taare Zameen Par", "year": 2007, "type": "adventure" },
                { "name": "The Dark Knight", "year": 2008, "type": "war" },
                { "name": "City of God", "year": 2002, "type": "sci-fi" },
                { "name": "Spirited Away", "year": 2001, "type": "thirll" },
                { "name": "The Pianist", "year": 2002, "type": "romance" },
                { "name": "Memento", "year": 2000, "type": "family" },
                { "name": "A Beautiful Mind", "year": 2001, "type": "comedy" },
                { "name": "Hotel Rwanda", "year": 2004, "type": "crime" },
                { "name": "Memories of Murder", "year": 2003, "type": "adventure" },
                { "name": "In the Mood for Love", "year": 2000, "type": "war" },
                { "name": "Before Sunset", "year": 2004, "type": "sci-fi" },
                { "name": "Infernal Affairs", "year": 2002, "type": "thirll" },
                { "name": "Memories of Matsuko", "year": 2006, "type": "romance" },
                { "name": "Pan's Labyrinth", "year": 2006, "type": "family" }
            ],
            sortBy: 'year'
        };
        this.datas = [
            { "name": "Psycho", "year": 1960, "type": "thirll" },
            { "name": "The Graduate", "year": 1967, "type": "romance" },
            { "name": "Bonnie and Clyde", "year": 1967, "type": "family" },
            { "name": "The Sound of Music", "year": 1965, "type": "comedy" },
            { "name": "Mary Poppins", "year": 1964, "type": "crime" },
            { "name": "Breakfast at Tiffany's", "year": 1961, "type": "adventure" },
            { "name": "101 Dalmations", "year": 1961, "type": "war" },
            { "name": "My Fair Lady", "year": 1964, "type": "sci-fi" },
            { "name": "Yellow Submarine", "year": 1968, "type": "thirll" },
            { "name": "Dragon Inn", "year": 1967, "type": "romance" },
            { "name": "A Fistful of Dollars", "year": 1964, "type": "family" },
            { "name": "Goldfinger", "year": 1964, "type": "comedy" },
            { "name": "2001 A Space Odyssey", "year": 1968, "type": "crime" },
            { "name": "Guess Who's Coming to Dinner", "year": 1967, "type": "adventure" },
            { "name": "The Longest Day", "year": 1962, "type": "war" },
            { "name": "The Godfather", "year": 1972, "type": "sci-fi" },
            { "name": "One Flew Over the Cuckoo's Nest", "year": 1971, "type": "thirll" },
            { "name": "Star Wars", "year": 1973, "type": "romance" },
            { "name": "Alien", "year": 1974, "type": "family" },
            { "name": "A Clockwork Orange", "year": 1974, "type": "comedy" },
            { "name": "Taxi Driver", "year": 1975, "type": "crime" },
            { "name": "Rocky", "year": 1975, "type": "adventure" },
            { "name": "Jaws", "year": 1975, "type": "war" },
            { "name": "Annie Hall", "year": 1977, "type": "sci-fi" },
            { "name": "The Godfather Part 2", "year": 1974, "type": "thirll" },
            { "name": "Apocalypse Now", "year": 1979, "type": "romance" },
            { "name": "The Sting", "year": 1973, "type": "family" },
            { "name": "Chinatown", "year": 1974, "type": "comedy" },
            { "name": "The Deer Hunter", "year": 1978, "type": "crime" },
            { "name": "Kramer vs. Kramer", "year": 1979, "type": "adventure" },
            { "name": "The Elephant Man", "year": 1980, "type": "war" },
            { "name": "Raiders of the Lost Ark", "year": 1981, "type": "sci-fi" },
            { "name": "Mad Max 2", "year": 1981, "type": "thirll" },
            { "name": "Blade Runner", "year": 1982, "type": "romance" },
            { "name": "E.T.", "year": 1982, "type": "family" },
            { "name": "First Blood", "year": 1982, "type": "comedy" },
            { "name": "Rocky 4", "year": 1985, "type": "crime" },
            { "name": "Star Wars Episode 6: Return of the Jedi", "year": 1983, "type": "adventure" },
            { "name": "A Nightmare on Elm Street", "year": 1984, "type": "war" },
            { "name": "Ghostbusters", "year": 1984, "type": "sci-fi" },
            { "name": "The Karate Kid", "year": 1984, "type": "thirll" },
            { "name": "Back to the Future", "year": 1985, "type": "romance" },
            { "name": "Back to the Future Part 2", "year": 1989, "type": "family" },
            { "name": "Rain Man", "year": 1988, "type": "comedy" },
            { "name": "Die Hard", "year": 1988, "type": "crime" },
            { "name": "Good Will Hunting", "year": 1997, "type": "adventure" },
            { "name": "Forrest Gump", "year": 1994, "type": "war" },
            { "name": "Jurassic Park", "year": 1993, "type": "sci-fi" },
            { "name": "The Lost World: Jurassic Park 2", "year": 1997, "type": "thirll" },
            { "name": "Star Wars Episode 1: The Phantom Menace", "year": 1999, "type": "romance" },
            { "name": "Home Alone", "year": 1990, "type": "family" },
            { "name": "Home Alone 2", "year": 1992, "type": "comedy" },
            { "name": "Home Alone 3", "year": 1997, "type": "crime" },
            { "name": "Armageddon", "year": 1998, "type": "adventure" },
            { "name": "Speed", "year": 1994, "type": "war" },
            { "name": "Days of Thunder", "year": 1990, "type": "sci-fi" },
            { "name": "Saving Private Ryan", "year": 1998, "type": "thirll" },
            { "name": "Terminator 2", "year": 1991, "type": "romance" },
            { "name": "Titanic", "year": 1997, "type": "family" },
            { "name": "Mr. Holland's Opus", "year": 1995, "type": "comedy" },
            { "name": "Eternal Sunshine of the Spotless Mind", "year": 2004, "type": "crime" },
            { "name": "Taare Zameen Par", "year": 2007, "type": "adventure" },
            { "name": "The Dark Knight", "year": 2008, "type": "war" },
            { "name": "City of God", "year": 2002, "type": "sci-fi" },
            { "name": "Spirited Away", "year": 2001, "type": "thirll" },
            { "name": "The Pianist", "year": 2002, "type": "romance" },
            { "name": "Memento", "year": 2000, "type": "family" },
            { "name": "A Beautiful Mind", "year": 2001, "type": "comedy" },
            { "name": "Hotel Rwanda", "year": 2004, "type": "crime" },
            { "name": "Memories of Murder", "year": 2003, "type": "adventure" },
            { "name": "In the Mood for Love", "year": 2000, "type": "war" },
            { "name": "Before Sunset", "year": 2004, "type": "sci-fi" },
            { "name": "Infernal Affairs", "year": 2002, "type": "thirll" },
            { "name": "Memories of Matsuko", "year": 2006, "type": "romance" },
            { "name": "Pan's Labyrinth", "year": 2006, "type": "family" }
        ];
        this.types = ["romance", "family", "thrill", "war", "sci-fi", "drama", "comedy", "adventure", "crime"];
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
                newAr = this.datas.sort((a, b) => {
                    if (a.year > b.year) {
                        return 1;
                    }
                    if (a.year < b.year) {
                        return -1;
                    }
                    return 0;
                });
                let index = newAr.findIndex(a => a.year >= value);
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
                let index = this.state.datas.findIndex(a => a.year >= value);
                // console.log("pickbook_index: ", index)
                this.positioning(index);
                this.pickBook(evt, index);
            }
        } else if (target == 'selType'){
            if (this.state.sortBy !== 'type') {
                newAr = this.datas.sort((a, b) => {
                    if (a.type > b.type) {
                        return 1;
                    }
                    if (a.type < b.type) {
                        return -1;
                    }
                    return 0;
                });
                let index = newAr.findIndex(a => a.type == value);
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
                let index = this.state.datas.findIndex(a => a.type == value);
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
        let books = Array.from(document.querySelectorAll(".book"));

        let index = (i === undefined) ? books.indexOf(evt.target.parentElement) : i;
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
        console.log(index, index !== undefined)
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
                console.log(i);
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
    componentDidMount() {
        let allBook = document.querySelectorAll('.book');
        let book = Array.from(allBook);
        let allFront = document.querySelectorAll('.front');
        let front = Array.from(allFront);
        front.forEach((f) => f.style.transform = 'rotateY(90deg)');

        this.positioning();
        this.fadeIn();
        // console.log(this.state.datas.map((data, idx) => `${process.env.PUBLIC_URL}/images/${data.year}_${data.name.split(' ').join('_')}.jpg`))
    }
    render() {        
        return (
            <div id="container">
                <div className="buttons">
                    {/* <button onClick={this.fadeOut}>fade out</button>		 */}
                    <button onClick={this.refresh}>refresh</button>
                    <select name="" id="selType" onChange={this.handleChange}>{this.types.map((type, idx) => <option key={idx} value={type}>{type}</option>)}</select>
                    <select name="" id="selYear" onChange={this.handleChange}>
                        <option value="1960">1960</option>
                        <option value="1970">1970</option>
                        <option value="1980">1980</option>
                        <option value="1990">1990</option>
                        <option value="2000">2000</option>
                    </select>
                </div>
                <div id="books">
                    {this.state.datas.map((data, idx) => {return (
                            <div className="book" data-open='false'>
                            <div className="side" onClick={this.pickBook}><h1><span>{data.year}</span>{data.name}<h3>{data.type}</h3></h1></div>
                            <div className="front"><img className="hide" src={`${process.env.PUBLIC_URL}/images/${data.year}_${data.name.split(' ').join('_').replace(':', '')}.jpg`} /></div>
                            </div>)
                        })
                    }                    
                </div>
            </div>
        );
    }    
}

export default Films;