import React, {Component} from 'react' ;
import '../sass/membercenter.scss';
import $ from 'jquery';
import { width } from 'window-size';

import memberCenterPic from "../images/member_center.svg";

class MemberCenter extends Component{
    constructor(props) {
        super(props);
        this.datas = [];
        this.state = {
            films:[],
            cffilms:[],
            load: false
        };
    }
    componentDidUpdate(){
        //處理資料
        // this.processOrders();   
        if(this.state.load){
             
        }
    }
    componentDidMount(){
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
                this.processOrders({
                    films: films,
                    cffilms: cffilms
                })
                console.log("datas", datas.length);
                // this.setState({ films: films, cffilms: cffilms });
            });
    }
    processOrders(datas){
        // let ar0 = this.state.cffilms.slice(0);
        // console.log("init", ar0)
        console.log("state", this.state);
        //cffilms
        let cffilms = datas.cffilms;
        let ar1 = cffilms.reduce((a, x) => {
            let l = a.length;
            let lastObj = a[l - 1];
            let order_date = x.order_date.slice(0, x.order_date.indexOf(' '));
            delete x.order_date;
            delete x.id_member;
            // delete x.id;
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
                        id_movie: x.id,
                        name_zhtw: x.name_zhtw,
                        quantity: parseInt(x.quantity)
                    };
                    a.push(obj);
                } else if (x.id === lastObj.id_movie) {
                    // let ar = lastObj.orders;
                    // ar.push(x);
                    lastObj.quantity += parseInt(x.quantity);
                } else if (x.id !== lastObj.id_movie) {
                    let obj = {
                        id_movie: x.id,
                        name_zhtw: x.name_zhtw,
                        quantity: parseInt(x.quantity)
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

        //films
        let films = datas.films;
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
                        date: x.date,
                        auditorium: x.auditorium,
                        name_zhtw: x.name_zhtw,
                        quantity: parseInt(x.quantity),
                        seats: [x.seat],
                        time:x.time
                    };
                    a.push(obj);
                } else if (x.id_session === lastObj.id_session) {
                    // let ar = lastObj.orders;
                    // ar.push(x);
                    lastObj.quantity += parseInt(x.quantity);
                    lastObj.seats.push(x.seat);
                }
                return a;
            }, []);
            order.orders = orders;
            return order;
        })
        films = arr2;

        this.setState({
            films: arr2,
            cffilms: ar2,
            load: true
        }, ()=>{
            console.log(this.state)
            $('.oders_post_down').hide();
            console.log($('.oders_post_down'))

            $('.oders_post_box ul').click(function(){
                if($(this).siblings('.oders_post_down').hasClass('on')){
                    $(this).siblings(".oders_post_down").slideUp(500).removeClass("on");  
                } else{
                    $(this).parent().siblings('.oders_post_down').removeClass("on");
                    $(this).siblings(".oders_post_down").slideDown(500).addClass("on").parent().siblings().children("li").slideUp(500);
                }
            })    
        })
        console.log("second: ", arr2);
        console.log("final state: ", this.state);
    }



    render(){
        return(
            <section className="container container-membercenter">

                    <div className="banner_up">122</div>
                    <div className="them">
                        
                        <div className="photo">
                            <figure className="pic">
                                <img src={memberCenterPic}/>
                                <button className="pic_change">更換照片</button>
                            </figure>              

                            <ul  className="btns">
                                <li>
                                    <ul className="box_click" id="change_color">
                                        訂單查詢
                                        <li className="oders_post_down_mobile oders_word ">1235</li>
                                    </ul>

                                    <ul className="box_unclick"  id="change_color">
                                        修改會員資料
                                        <li className="oders_post_down_mobile oders_word ">1235</li>
                                    </ul>

                                    <ul className="box_unclick"  id="change_color">
                                        修改密碼
                                        <li className="oders_post_down_mobile oders_word ">1235</li>
                                    </ul>
                                    
                                    <ul className="box_unclick"  id="change_color">
                                         客服中心
                                        <li className="oders_post_down_mobile oders_word display">1235</li>
                                    </ul>
                                    
                                </li>    
                            </ul>              
                            {/* <div className="btns">
                                <div className="box_click">訂單查詢</div>
                                <div className="box_unclick">修改會員資料</div>
                                <div className="box_unclick">修改密碼</div>
                                <div className="box_unclick">客服中心</div>
                            </div> */}
                        </div>

                        <div className="commit01">

                            <div className="modify">
                               <div className="oders month_word">訂單查詢</div>
                               
                               <div className="oders_use">
                               
                                   <ul  className="oders_post_box">
                                   <h1>確認放映</h1>
                                   {this.state.films.map((film,id) =>(                           
                                        <li>
                                            <ul className="oders_post oders_word" id="oders_click">{film.order_date}</ul>
                                               
                                            {/* {
                                                film.orders.map(x => {
                                                    console.log(x)
                                                })
                                            } */}
                                            {
                                                film.orders.map(x => (
                                                    
                                                    <li className="oders_post_down oders_word">{`${x.date}${' '}${'/'}${' '}${x.name_zhtw}${' '}${'/'}${' '}${x.quantity}${'張'}${' '}${'/'}${' '}${x.auditorium} `}</li>
                                                ))
                                            }
                                            
                                            
                                        </li>
                                        ))}
                                   </ul>
                                   <ul  className="oders_post_box">
                                   <h1>募資中</h1>
                                   {this.state.cffilms.map((film,id) =>(                           
                                        <li>
                                            <ul className="oders_post oders_word" id="oders_click">{film.order_date}</ul>
                                               
                                            {/* {
                                                film.orders.map(x => {
                                                    console.log(x)
                                                })
                                            } */}
                                            {
                                                film.orders.map(x => (
                                                    
                                                    <li className="oders_post_down oders_word">{` ${x.name_zhtw}${' '}${'/'}${' '}${x.quantity}${'票'} `}</li>
                                                ))
                                            }
                                            
                                            
                                        </li>
                                        ))}
                                   </ul>
                            
                               </div>
                            
                            </div>
                            
                            <div className="ticketbox">111</div>
                        </div>
                    </div>
                
            </section>
        );
    }
}

export default MemberCenter;