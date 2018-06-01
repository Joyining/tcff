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
            films: {
                id_movie: 1,
                name: "驚魂記",
                session: "2018-07-14 19:00 台北光點",
                quantity: 1,
                seats: [],
                allSeats: 170,
                occupied: [1,2,3,4,5,6,50,51,52,60,71,72]
            },
            cffilms: {
                id_movie: 15,
                name: "最長的一天",
                quantity: 1
            }
        };
        this.price = 250;
        this.overlay = "";
        this.picked = [];
    }
    componentDidMount() {
        // console.log("dm",this.overlay);
        this.overlay = document.getElementsByClassName('overlay')[0];
    }
    changeTicketNum(event){
        // console.log(event.target.value);
        let value = (event.target.value < 1) ? 1 : event.target.value;
        value = (event.target.value > 10) ? 10 : value;
        let isFilms = event.target.closest("table").classList.contains("films");
        if(isFilms){
            let ar = this.state.films;
            ar.quantity = value;
            this.setState({ films: ar });
        }else{
            let ar = this.state.cffilms;
            ar.quantity = value;
            this.setState({ cffilms: ar });
        }
    }
    seatAssign(event){
        // console.log("劃位");
        // let overlay = document.getElementsByClassName('overlay')[0];
        // console.log("sa", this.overlay);
        this.overlay.classList.add('show');
    }
    confirmSeats(evt){
        this.overlay.classList.remove('show');
        // console.log('cs',this.overlay);
        // console.log(evt.target.value);
        let isYes = evt.target.value === "確定";
        console.log(isYes);
        if(isYes){
            let ar = this.state.films;
            ar['seats'] = this.picked;
            this.setState({
                films: ar
            })
        }else{

        }
    }
    pickSeat(evt) {
        let td = evt.target;
        let isPicked = td.classList.contains('picked');
        let seatNum = td.getAttribute('data-row') + td.innerHTML;
        let id_movie = td.closest('table').getAttribute("data-id-movie");
        let picked = this.picked.includes(seatNum);
        console.log(picked);
        
        if (isPicked) {
            td.classList.remove("picked");
            if (picked) {
                let index = this.picked.indexOf(seatNum);
                this.picked.splice(index);
            };
        }
        else {
            td.classList.add("picked");

            if (!picked) this.picked.push(seatNum);
        }
        console.log(this.picked);
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
                                <SeatMap id_movie={this.state.films.id_movie} occupiedSeats={this.state.films.occupied} pickSeat={this.pickSeat} />
                            </div>
                        <div id="cancelOverlay">
                            <input type="button" value="取消" onClick={this.confirmSeats} />
                            <input type="button" value="確定" onClick={this.confirmSeats} />
                            </div>                             
                        </div>
                    </div>

                <table className="films">
                    <thead>
                        <tr>
                            <th colSpan="6">欲購買的場次</th>
                            </tr>
                    </thead>
                    <tbody>
                        <tr data-id-movie={this.state.films.id_movie}>
                            <td>{this.state.films.name}</td>
                            <td>{this.state.films.session}</td>
                            <td><input type="number" value={this.state.films.quantity} min="1" max="10" onChange={this.changeTicketNum} /></td>
                            <td>{this.price * this.state.films.quantity}</td>
                            <td>{this.state.films.seats.join(" / ")}</td>
                            <td><input type="button" value="自行劃位" onClick={this.seatAssign} /></td>
                            </tr>
                        </tbody>
                </table>
                <table className="cffilms">
                    <thead>
                        <tr>
                            <th colSpan="3">參與募資的電影</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.cffilms.name}</td>
                            <td><input type="number" value={this.state.cffilms.quantity} min="1" max="10" onChange={this.changeTicketNum} /></td>
                            <td>{this.price * this.state.cffilms.quantity}</td>
                        </tr>
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
