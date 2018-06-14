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
            films:[],
            cffilms:[],
            seatOfFilm: {},
            completeLoad: false
        };

        this.price = 250;
        this.overlay = "";
        this.picked = [];
        this.temp = [];
    }
    componentWillMount(){//從storage取出cart再setState
        let cart = JSON.parse(sessionStorage.getItem('cart'));

        //加上位置與張數
        cart.films = cart.films.map(film => {
            film.seats = [];
            film.occupied = film.occupied.sort((a, b) => (a + 0) - (b + 0));
            film.quantity = 1;
            return film;
        })
        cart.cffilms = cart.cffilms.map(film => {
            film.quantity = 1;
            return film;
        })

        this.setState({
            films: cart.films,
            cffilms: cart.cffilms,
            completeLoad: true
        })
    }
    componentDidMount() {
        //調整視窗位置
        window.scrollTo(0, 0);

        //存overlay的元素位置
        this.overlay = document.getElementsByClassName('overlay')[0];
    }
    componentDidUpdate(){
        console.log({
            phase: "tab2 did Update",
            state: this.state,
            picked: this.picked,
            film: this.state.seatOfFilm
        })
    }
    changeTicketNum(event){//控制input
        //張數限制在1-10
        let value = (event.target.value < 1) ? 1 : event.target.value;
        value = (event.target.value > 10) ? 10 : value;
        let isFilms = event.target.closest("table").classList.contains("films");
        let id = event.target.closest("tr").getAttribute('data-id-movie');

        if(isFilms){//確映
            let ar = this.state.films.map(film => {
                if(film.id_movie === id) film.quantity = value;
                return film;
            });
            this.setState({ films: ar });
        }else{//募資
            let ar = this.state.cffilms.map(film => {
                if (film.id_movie === id) film.quantity = value;
                return film;
            });
            this.setState({ cffilms: ar });
        }
    }

    //劃位系統
    seatAssign(event){//onClick"自行劃位"
        //顯示蓋板
        this.overlay.classList.add('show');

        let id_movie = event.target.closest('tr').getAttribute('data-id-movie');        
        let ar = this.state.films.filter((film) => film.id_movie === id_movie);

        this.picked = this.state.films.reduce((a, film) => {
            if (film.id_movie === ar[0]['id_movie']) return a.concat(film.seats)
            else return a;
        }, [])
        let picked = this.picked.sort((a, b) => { 
            if (a[0] === b[0]) return parseInt(a.slice(1)) > parseInt(b.slice(1));
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
        if(isYes){//確定
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
        }else{//取消
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
    nextStep(evt){//檢查劃位，cart存回storage
        let isAllAssign = true;

        //檢查是否都有劃位
        this.state.films.forEach(function(film){
            if(film.seats.length === 0){
                isAllAssign = false;
            }
        })
        if(!isAllAssign){//有還未劃位的發出警訊
            evt.preventDefault();
            alert("記得要劃位喔!!")
        }else{//離開前將購物車存進storage
            let cart = {
                films: this.state.films,
                cffilms: this.state.cffilms,
            };
            sessionStorage.setItem('cart', JSON.stringify(cart));
        }
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
                            this.state.completeLoad && this.state.films.map((film, idx) => (
                                <tr data-id-movie={film.id_movie} key={idx}>
                                    <td data-th="片名">{film.name_zhtw}</td>
                                    <td data-th="場次">{film.date + film.time.slice(0,-3) + film.auditorium}</td>
                                    <td data-th="數量"><input type="number" value={film.quantity} min="1" max="10" onChange={this.changeTicketNum} /></td>
                                    <td data-th="小計">{this.price * film.quantity}</td>
                                    <td data-th="位號">{film.seats.join(",")}</td>
                                    <td data-th="劃位"><input type="button" value="自行劃位" onClick={this.seatAssign} /></td>
                                    </tr>
                            ))
                        }                       
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
                            this.state.completeLoad && this.state.cffilms.map((film, idx) => (
                                <tr data-id-movie={film.id_movie} key={idx}>
                                    <td data-th="片名">{film.name_zhtw}</td>
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
