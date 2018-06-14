import React, {
    Component
} from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import './tab4.scss';

class Tab4 extends Component {
    constructor(props) {
        super(props);
        this.datas = [];
        this.state = {
            films:[],
            cffilms:[]
        };
    }
    componentDidUpdate(){
        //處理資料
        this.processOrders();
        
    }
    componentDidMount() {
        //調整視窗位置
        window.scrollTo(0, 0);     

        //取得訂單紀錄
        this.fetchOrders();
    }
    fetchOrders(){
        let data = [];
        // fetch(`${process.env.PUBLIC_URL}/json/orders_raw.json`)
        fetch(`http://192.168.39.110/tcff_php/api/members/orders.php?id=` + JSON.parse(sessionStorage.getItem("user")).id)
            .then(res => res.json())
            .then(datas => {
                console.log("datas", datas.length);
                // datas = datas.filter((d) => {
                //     return d.id_member == 15;
                // })
                let cffilms = datas.filter((d) => {
                    return d.id_session == 0;
                })
                let films = datas.filter((d) => {
                    return d.id_session != 0;
                })
                console.log("datas", datas.length);
                this.setState({ films: films, cffilms: cffilms });
            });
    }
    processOrders(){
        let ar0 = this.state.cffilms.slice(0);
        console.log("init", ar0)
        console.log("state", this.state);
        let cffilms = this.state.cffilms;
        let ar1 = cffilms.reduce((a, x) => {
            let l = a.length;
            let lastObj = a[l - 1];
            let order_date = x.order_date.slice(0, x.order_date.indexOf(' '));
            delete x.order_date;
            delete x.id_member;
            delete x.id;
            if (lastObj === undefined) {
                let obj = {
                    order_date: order_date,
                    orders: [x]
                };
                a.push(obj);
            } else if (order_date === lastObj.order_date) {
                // let ar = lastObj.orders;
                // ar.push(x);
                lastObj.orders.push(x);
            } else if (order_date !== lastObj.order_date) {
                let obj = {
                    order_date: order_date,
                    orders: [x]
                };
                a.push(obj);
            }
            return a;
        }, []);
        cffilms = ar1;
        console.log("first: ", ar1);
        let ar2 = cffilms.map(order => {
            let orders = order.orders.reduce((a, x) => {
                let l = a.length;
                let lastObj = a[l - 1];
                // let order_date = x.order_date.slice(0, x.order_date.indexOf(' '));
                // let id_movie = x.id_movie;
                // delete x.order_date;
                // delete x.id_member;
                // delete x.id;
                if (lastObj === undefined) {
                    let obj = {
                        id_movie: x.id_movie,
                        quantity: x.quantity
                    };
                    a.push(obj);
                } else if (x.id_movie === lastObj.id_movie) {
                    // let ar = lastObj.orders;
                    // ar.push(x);
                    lastObj.quantity += x.quantity;
                } else if (x.id_movie !== lastObj.id_movie) {
                    let obj = {
                        id_movie: x.id_movie,
                        quantity: x.quantity
                    };
                    a.push(obj);
                }
                return a;
            }, []);
            order.orders = orders;
            return order;
        })
        cffilms = ar2;
        console.log("second: ", ar2);


        let films = this.state.films;
        let arr1 = films.reduce((a, x) => {
            let l = a.length;
            let lastObj = a[l - 1];
            let order_date = x.order_date.slice(0, x.order_date.indexOf(' '));
            delete x.order_date;
            delete x.id_member;
            delete x.id;
            if (lastObj === undefined || order_date !== lastObj.order_date) {
                let obj = {
                    order_date: order_date,
                    orders: [x]
                };
                a.push(obj);
            } else if (order_date === lastObj.order_date) {
                // let ar = lastObj.orders;
                // ar.push(x);
                lastObj.orders.push(x);
            }
            return a;
        }, []);
        films = arr1;
        console.log("first: ", arr1);
        let arr2 = films.map(order => {
            let orders = order.orders.reduce((a, x) => {
                let l = a.length;
                let lastObj = a[l - 1];
                if (lastObj === undefined || x.id_session !== lastObj.id_session) {
                    let obj = {
                        id_session: x.id_session,
                        quantity: x.quantity,
                        seats: [x.seat]
                    };
                    a.push(obj);
                } else if (x.id_session === lastObj.id_session) {
                    // let ar = lastObj.orders;
                    // ar.push(x);
                    lastObj.quantity += x.quantity;
                    lastObj.seats.push(x.seat);
                }
                return a;
            }, []);
            order.orders = orders;
            return order;
        })
        films = arr2;
        console.log("second: ", arr2);
        console.log("final state: ", this.state);
    }
    render() {
        return (
            <div className="tab tab4">
                <div className="wrap">
                    <div className="text">
                        <h3>
                            感謝您的購買
                        </h3>
                        <p>
                            您的兌票序號為ABCD123456
                        </p>
                        <Link className="" to={`/`}>回首頁</Link>
                    </div>
                        
                </div>
            </div>
        );
    }
}

export default withRouter(Tab4);
