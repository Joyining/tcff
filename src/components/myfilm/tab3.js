import React, {
    Component
} from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import './tab3.scss';

class Tab3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films: [
                {
                    id_movie: 1,
                    name: "驚魂記",
                    session: "2018-07-14 19:00 台北光點",
                    quantity: 3,
                    seats: ['A1','A2','A3'],
                },
                {
                    id_movie: 2,
                    name: "畢業生",
                    session: "2018-07-14 19:00 台北光點",
                    quantity: 2,
                    seats: ['D1', 'D2'],
                },
                {
                    id_movie: 4,
                    name: "真善美",
                    session: "2018-07-14 19:00 台北光點",
                    quantity: 4,
                    seats: ['E5', 'E6', 'E7', 'E8'],
                },
                {
                    id_movie: 15,
                    name: "最長的一天",
                    quantity: 5
                },
                {
                    id_movie: 30,
                    name: "克萊門夫婦",
                    quantity: 5
                }
            ]
        }
        this.price = 250;
    }
    componentDidMount() {
        let price = document.querySelectorAll(".price");
        let total = Array.from(price).reduce((a,x) => {
            return a + parseInt(x.innerHTML);
        }, 0)
        console.log(total);
        document.querySelector('.totalPrice span').innerHTML = total;
        // console.log(document.querySelector('.totalPrice span'));
    }
    render() {
        return (
            <div className="tab tab3">
                選擇付款方式
                <table>
                    <thead>
                        <tr>
                            <th colSpan="5">
                                確認訂購明細
                                </th>
                        </tr>
                        <tr align="center">
                            <td>片名</td>
                            <td>場次時間</td>
                            <td>座位</td>
                            <td>張數</td>
                            <td>小計</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.films.map((film, idx) => (
                                <tr align="right">
                                    <td>{film.name}</td>
                                    <td>{film.session}</td>
                                    <td>{film.hasOwnProperty('seats') ? film.seats.join(',') : 'cf'}</td>
                                    <td>{film.quantity}</td>
                                    <td className="price">{film.quantity * this.price}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan="5" className="totalPrice" align="right">total<span>0</span></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        
                    </tfoot>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="5">
                                確認訂購人資訊
                                </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr align="center">
                            <td>姓名<input type="text" /></td>                               
                        </tr>
                        <tr align="center">
                            <td>電話<input type="text" /></td>
                        </tr>
                        <tr align="center">
                            <td>電子郵件<input type="text" /></td>
                        </tr>
                        <tr align="center">
                            <td>付款方式
                                <select name="" id="">
                                    <option value="">信用卡</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttons">
                    <Link className="prevStep" to={`/my-film/2`} onClick={this.prevStep}>上一步</Link>
                    <Link className="nextStep" to={`/my-film/4`} onClick={this.nextStep}>下一步</Link>
                </div>
            </div>
        );
    }
}

export default Tab3;
