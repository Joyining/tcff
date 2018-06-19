import React, {
    Component
} from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from "react-router-dom";
import './tab3.scss';

class Tab3 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
        this.state = {
            films: []
        }
        this.price = 250;
    }
    componentWillMount(){
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        let films = cart.films;
        cart.cffilms.forEach(x => {
            films.push(x);
        });
        console.log("films",films);
        this.setState({films: films});
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        console.log("user: ",JSON.parse(sessionStorage.getItem('user')));
        let price = document.querySelectorAll(".price");
        let total = Array.from(price).reduce((a,x) => {
            return a + parseInt(x.innerHTML);
        }, 0)
        console.log(total);
        document.querySelector('.totalPrice :last-child').innerHTML = total;
        // console.log(document.querySelector('.totalPrice span'));
    }
    nextStep(evt){
        evt.preventDefault();
        let body = {
            films:[],
            cffilms:[]
        }
        this.state.films.forEach(x => {
            let film = {};
            if(x.hasOwnProperty('seats')){
                let seats = x.seats.map(seat => {
                    seat = (seat[0].charCodeAt() - 65) * 12 + parseInt(seat.slice(1),10);
                    return seat;
                })
                film = {
                    session: x.id_session,
                    id_movie: x.id_movie,
                    seats: seats,
                    quantity: x.quantity
                };
                body.films.push(film);
            }else{
                film = {
                    id_movie: x.id_movie,
                    quantity: x.quantity
                };
                body.cffilms.push(film);
            }
        });
        let id = JSON.parse(sessionStorage.getItem('user')).id;
        body.id = id;
        fetch(`http://192.168.39.110/tcff_php/api/cart/booking.php`, {
        // fetch(`http://localhost/tcff_php/api/cart/booking.php`,{
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json'           
            }),
            // mode: 'cors',
            // headers: new Headers({
            //     "Content-Type": "application/json",
            // })
        })
            .then(res => res.json())
            .then(datas => {
                console.log("state&datas",this.state,datas);
                if(datas.message === "booking success"){
                    // window.history.pushState(null, '', '4');
                    let url = "";
                    let id = JSON.parse(sessionStorage.getItem('user')).id;
                    url = 'http://192.168.39.110/tcff_php/api/cart/collection.php/';
                    let booked_id_movie = this.state.films.reduce((a,x) => {
                        a.push(x.id_movie);
                        return a;
                    },[])
                    console.log(`${url}${booked_id_movie.join('_')}/${id}`)
                    fetch(`${url}${booked_id_movie.join('_')}/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log("m: ", data.message);
                            console.log(data)
                            if (data.message === "delete collections"){
                                let collection = JSON.parse(sessionStorage.getItem('collection'));
                                let films = collection.films;
                                let cffilms = collection.cffilms;
                                films = films.filter(x => !booked_id_movie.includes(x.id_movie))
                                cffilms = cffilms.filter(x => !booked_id_movie.includes(x.id_movie))
                                collection = {
                                    films:films,
                                    cffilms:cffilms
                                }

                                console.log("booked_id_movie", booked_id_movie)
                                console.log("films", films)
                                console.log("cffilms", cffilms)
                                console.log("collection", collection)
                                sessionStorage.setItem("collection", JSON.stringify(collection));

                            }
                            sessionStorage.removeItem('cart');
                            // window.location.href = '/my-film/4';
                            this.props.history.push("/my-film/4");
                        })
                    
                } else if (datas.message === "seats have been booked"){
                    let str = '';
                    for(let id_movie in datas.repeat_seats){
                        str += `id_movie: ${id_movie}, occupied: `
                        datas.repeat_seats[id_movie].forEach(seat => {
                            str += seat + `, `;
                        })
                        str += ';'
                    }
                    alert(str);
                }
            })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ', error.message);
                console.log('body ', error.message);
            })
        console.log("body",JSON.stringify(body));
    }
    render() {
        return (
            <div className="tab tab3">
                <div className="table">
                    <div className="head">
                        <div className="row">
                            確認訂購明細
                        </div>
                        <div className="row">
                            <h4 className="col">片名</h4>
                            <h4 className="col">場次時間</h4>
                            <h4 className="col">座位</h4>
                            <h4 className="col">張數</h4>
                            <h4 className="col">小計</h4>
                        </div>
                    </div>
                    <div className="body">
                        {
                            this.state.films.map((film, idx) => (
                                <div className="row">
                                    <div className="col">{film.name_zhtw}</div>
                                    {film.hasOwnProperty('seats') && (<div className="col"><span>{film.date.split("-0").join("/").split("-").join("/")} {film.time.slice(0, -3)}</span> <span>{film.auditorium}</span></div>)}
                                    {!film.hasOwnProperty('seats') && (<div className="col"></div>)}
                                    <div className="col">{film.hasOwnProperty('seats') ? film.seats.join(',') : ''}</div>
                                    <div className="col">{film.quantity}</div>
                                    <div className="col price">{film.quantity * this.price}</div>
                                </div>
                            ))
                        }
                        <div className="row totalPrice">
                            <div className="col"></div>
                            <div className="col"></div>
                            <div className="col"></div>
                            <div className="col"></div>
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
                <div className="userInfo">
                    <div className="head">
                        <div className="row">
                            <div className="col">
                                確認訂購人資訊
                                </div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="infoName" className="infoName">姓名</label>
                                <input type="text" id="infoName" />
                            </div>                               
                        </div>
                        <div className="row">
                            < div className = "col" >
                                <label htmlFor="infoPhone" className="infoName">電話</label>
                            <input type="text" id="infoPhone" /></div>
                        </div>
                        <div className="row">
                        < div className = "col" >
                                <label htmlFor="infoMail" className="infoName">電子郵件</label>
                            <input type="text" id="infoMail" /></div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="infoPay" className="infoName">付款方式</label>
                                <select name="" id="infoPay">
                                    <option value="">信用卡</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <Link className="prevStep" to={`/my-film/2`} onClick={this.prevStep}>上一步</Link>
                    <Link className="nextStep" to={`/my-film/4`} onClick={this.nextStep}>下一步</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Tab3);
