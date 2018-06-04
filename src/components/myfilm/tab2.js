import React, {
    Component
} from 'react';
import SeatMap from './seat-map.js';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import './tab2.scss';

class Tab2 extends Component {
    constructor(props) {
        super(props);
        this.changeTicketNum = this.changeTicketNum.bind(this);
        this.seatAssign = this.seatAssign.bind(this);
        this.confirmSeats = this.confirmSeats.bind(this);
        this.pickSeat = this.pickSeat.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);

        this.state = {
            films: [
                {
                    id_movie: 1,
                    name: "驚魂記",
                    session: "2018-07-14 19:00 台北光點",
                    quantity: 1,
                    seats: [],
                    allSeats: 170,
                    occupied: [1, 2, 3, 4, 5, 6, 50, 51, 52, 60, 71, 72]
                },
                {
                    id_movie: 2,
                    name: "畢業生",
                    session: "2018-07-14 19:00 台北光點",
                    quantity: 1,
                    seats: [],
                    allSeats: 170,
                    occupied: [30,31,32,34,35,36]
                },
                {
                    id_movie: 4,
                    name: "真善美",
                    session: "2018-07-14 19:00 台北光點",
                    quantity: 1,
                    seats: [],
                    allSeats: 170,
                    occupied: [54,55,56,57,58,59,60,61]
                },
            ],
            cffilms: [
                {
                    id_movie: 15,
                    name: "最長的一天",
                    quantity: 1
                },
                {
                    id_movie: 30,
                    name: "克萊門夫婦",
                    quantity: 1
                }
                
            ],
            seatOfFilm: {}
        };
        this.price = 250;
        this.overlay = "";
        this.picked = [];
        this.temp = [];
    }
    componentDidMount() {
        // console.log("props: ", this.props);
        // console.log("dm",this.overlay);
        // console.log("href", location.href)
        // console.log("URL", document.URL)
        // console.log("href", window.location.href)
        // console.log("path", window.location.pathname)
        // console.log("id", window.location.pathname.search('='))
        // console.log("q", window.location.search)
        // console.log("index", window.location.search.search('='))
        // console.log("id", window.location.search.slice(3+1))
        this.overlay = document.getElementsByClassName('overlay')[0];
    }
    componentDidUpdate(){
        console.log({
            update: true,
            state: this.state,
            picked: this.picked,
            film: this.state.seatOfFilm
        })
    }
    changeTicketNum(event){
        // console.log(event.target.value);
        let value = (event.target.value < 1) ? 1 : event.target.value;
        value = (event.target.value > 10) ? 10 : value;
        let isFilms = event.target.closest("table").classList.contains("films");
        let id = event.target.closest("tr").getAttribute('data-id-movie');
        if(isFilms){
            let ar = this.state.films.map(film => {
                if(film.id_movie == id) film.quantity = value;
                return film;
            });
            // let ar = this.props.extraProps.films;
            // ar.quantity = value;
            this.setState({ films: ar });
        }else{
            let ar = this.state.cffilms.map(film => {
                if (film.id_movie == id) film.quantity = value;
                return film;
            });
            // let ar = this.props.extraProps.cffilms;
            // ar.quantity = value;
            this.setState({ cffilms: ar });
        }
    }
    seatAssign(event){
        // console.log("劃位");
        // let overlay = document.getElementsByClassName('overlay')[0];
        // console.log("sa", this.overlay);
        this.overlay.classList.add('show');
        let index = event.target.closest('tr').getAttribute('data-id-movie');
        
        // console.log(index)
        let ar = this.state.films.filter((film) => film.id_movie===parseInt(index));
        // this.state.seatOfFilm = ar

        this.picked = this.state.films.reduce((a, film) => {
            // console.log("a", a)
            // console.log("film", film)
            // console.log("seats", film.seats)
            if (film.id_movie == ar[0]['id_movie']) return a.concat(film.seats)
            else return a;
        }, [])
        let picked = this.picked.sort((a, b) => { 
            if (a[0] == b[0]) return parseInt(a.slice(1)) > parseInt(b.slice(1));
            else return a[0] > b[0] 
        })
        this.temp = Array.from(document.querySelectorAll('.available')).reduce((a,x) => {
            picked.forEach(y => {
                let n = (y[0].charCodeAt() - 65) * 12 + parseInt(y.slice(1));
                if(n==x.getAttribute('data-seat-num')) a.push(x)
            })
            return a;
        },[])


        console.log("this.picked", this.picked)
        console.log("this.temp", this.temp)
        // console.log("ar",ar);
        this.setState({
            seatOfFilm: ar[0]
        })
        console.log("state",this.state)
    }
    confirmSeats(evt){
        this.overlay.classList.remove('show');
        // console.log('cs',this.overlay);
        // console.log(evt.target.value);
        let isYes = evt.target.value === "確定";
        // console.log(isYes);
        let id = evt.target.closest('.wrap').querySelector('table').getAttribute('data-id-movie');
        // console.log(id);
        if(isYes){
            console.log("this.picked", this.picked)
            console.log("this.temp",this.temp)
            let ar = this.state.films.map((film) => {
                if (film.id_movie == id) {
                    film.seats = this.picked;
                };
                return film
            });
            console.log(ar);
            // ar['seats'] = this.picked;
            this.setState({
                films: ar
            }, () => {
                // this.picked.length = 0;
                console.log("state: ", this.state);
            })
            // this.picked.length = 0;
            // this.temp = 
        }else{
            // console.log("sof",this.state.seatOfFilm)
            let seats = this.state.seatOfFilm.seats;
            this.temp.map(td => {
                let seatNum = td.getAttribute('data-row') + td.innerHTML;
                if(!seats.includes(seatNum)) td.classList.remove('picked');
            })
            
            this.picked.length = 0;
            this.temp.length = 0;
            console.log("picked", this.picked);
            console.log("temp", this.temp);
        }
    }
    pickSeat(evt) {
        let td = evt.target;
        let isPicked = td.classList.contains('picked');
        let seatNum = td.getAttribute('data-row') + td.innerHTML;
        let id_movie = td.closest('table').getAttribute("data-id-movie");
        let quantity = this.state.seatOfFilm.quantity
        console.log("Q",quantity)
        // this.picked = this.state.films.filter(film => {
        //     if(film.id_movie == id_movie) return film.seats
        // })
        
        console.log("this.picked", this.picked)
        let picked = this.picked.includes(seatNum);
        console.log("is SeatNum in picked? ", picked);
        // if (!this.temp.includes(td)) this.temp.push(td);
        
        console.log("in?", this.temp.includes(td));
        if(this.temp.length < quantity){
            console.log("<")
            if (isPicked) {
                td.classList.remove("picked");
                if (picked) {
                    let index = this.picked.indexOf(seatNum);
                    this.picked.splice(index,1);
                };
                if (this.temp.includes(td)){
                    let index = this.temp.indexOf(td);
                    console.log({
                        index:index,
                        temp:this.temp
                    })
                    this.temp.splice(index,1);
                }
            }
            else {
                td.classList.add("picked");

                if (!picked){
                    this.picked.push(seatNum);
                    // this.temp.push(td);
                    // console.log(this.temp);
                } 
                if (!this.temp.includes(td)) {
                    this.temp.push(td);
                }
            }
        }
        else{
           console.log(">");
            if (isPicked) {
                td.classList.remove("picked");
                if (picked) {
                    let index = this.picked.indexOf(seatNum);
                    this.picked.splice(index, 1);
                };
                if (this.temp.includes(td)) {
                    let index = this.temp.indexOf(td);
                    console.log({
                        index: index,
                        temp: this.temp
                    })
                    this.temp.splice(index, 1);
                }
            }
            else {
                td.classList.add("picked");
                this.temp[0].classList.remove("picked");

                this.temp.shift();
                this.temp.push(td);

                this.picked.shift();
                this.picked.push(seatNum);
                // if (!picked) {
                //     this.picked.push(seatNum);
                //     // this.temp.push(td);
                //     // console.log(this.temp);
                // }
                // if (!this.temp.includes(td)) {
                //     this.temp.push(td);
                // }
            }
        }
        console.log("this.temp", this.temp)
        console.log("this.picked", this.picked);
    }
    prevStep(){

    }
    nextStep(){

    }
    render() {
        return (
            <div className="tab tab2">
                選擇張數及劃位
                <div className="overlay">
                    <div className="wrap">
                        <h3>劃位</h3>
                        <div>
                            座位圖
                                <SeatMap id_movie={this.state.seatOfFilm.id_movie} seatOfFilm={this.state.seatOfFilm} pickSeat={this.pickSeat} />
                            </div>
                        <div id="cancelOverlay">
                            <input type="button" value="取消" onClick={this.confirmSeats} />
                            <input type="button" value="確定" onClick={this.confirmSeats} />
                            </div>                             
                        </div>
                    </div>

                <table className="films rwd-table">
                    <thead>
                        <tr>
                            <th colSpan="6">欲購買的場次</th>
                            </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.films.map((film, idx) => (
                                <tr data-id-movie={film.id_movie} key={idx}>
                                    <td data-th="片名">{film.name}</td>
                                    <td data-th="場次">{film.session}</td>
                                    <td data-th="數量"><input type="number" value={film.quantity} min="1" max="10" onChange={this.changeTicketNum} /></td>
                                    <td data-th="小計">{this.price * film.quantity}</td>
                                    <td data-th="位號">{film.seats.join(",")}</td>
                                    <td data-th="劃位"><input type="button" value="自行劃位" onClick={this.seatAssign} /></td>
                                    </tr>
                            ))
                        }
                       
                        {/* <tr data-id-movie={this.props.extraProps.films.id_movie}>
                            <td>{this.props.extraProps.films.name}</td>
                            <td>{this.props.extraProps.films.session}</td>
                            <td><input type="number" value={this.props.extraProps.films.quantity} min="1" max="10" onChange={this.props.extraProps.changeTicketNum} /></td>
                            <td>{this.price * this.props.extraProps.films.quantity}</td>
                            <td>{this.props.extraProps.films.seats.join(" / ")}</td>
                            <td><input type="button" value="自行劃位" onClick={this.seatAssign} /></td>
                            </tr> */}
                        </tbody>
                </table>
                <table className="cffilms rwd-table">
                    <thead>
                        <tr>
                            <th colSpan="3">參與募資的電影</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.cffilms.map((film, idx) => (
                                <tr data-id-movie={film.id_movie} key={idx}>
                                    <td data-th="片名">{film.name}</td>
                                    <td data-th="數量"><input type="number" value={film.quantity} min="1" max="10" onChange={this.changeTicketNum} /></td>
                                    <td data-th="小計">{this.price * film.quantity}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                </table>
                <div className="buttons">
                    <Link className="prevStep" to={`/my-film/1`} onClick={this.prevStep}>上一步</Link>
                    <Link className="nextStep" to={`/my-film/3`} onClick={this.nextStep}>下一步</Link>
                </div>
            </div>
        );
    }
}

export default Tab2;
