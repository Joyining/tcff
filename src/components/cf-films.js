import React, { Component } from 'react';
// import '../sass/page.scss';
// import Cflist from './cf-films.json';
import '../sass/cf-films.scss';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class Cffilms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Films: []
        }
        this.handleCollect = this.handleCollect.bind(this);
    }
    handleCollect(evt) {
        let isChecked = evt.currentTarget.previousElementSibling.checked;
        console.log("isChecked", isChecked)
        let id_movie = evt.currentTarget.getAttribute('data-id-movie');
        let user = sessionStorage.getItem('user');
        let id_user = user === null ? undefined : JSON.parse(user).id;
        let url = "";
        // let collectionNum = sessionStorage.getItem('collectionNum');
        // console.log(evt.currentTarget.previousElementSibling);

        if (isChecked) {
            console.log("del");
            if (id_user !== undefined) {
                url = `http://192.168.39.110/tcff_php/api/cart/collection.php/${id_movie}/${id_user}`;
                fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Access-Control-Request-Headers": "X-PINGOTHER, Content-Type",
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    mode: 'cors'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("m: ", data.message);
                        if (data.message === "delete 1 data") {
                            //刪Storage的collection
                            let collection = JSON.parse(sessionStorage.getItem('collection'));
                            collection.cffilms = collection.cffilms.filter(x => x.id_movie !== id_movie);
                            sessionStorage.setItem("collection", JSON.stringify(collection));

                            //改變checkbox狀態(setState)
                            let ar = this.state.Films.map(film => {
                                if (film.id_movie == id_movie) {
                                    film.collect = false;
                                }
                                return film;
                            })
                            this.setState({
                                Films: ar
                            });

                            //改變購物車數字 collectionNum
                            this.props.updatecollectionNum();
                        }
                    })
                    .catch(err => console.log(`error with fetch: ` + err.message))
            } else {
                //刪Storage的collection
                let collection = JSON.parse(sessionStorage.getItem('collection'));
                collection.cffilms = collection.cffilms.filter(x => x.id_movie !== id_movie);
                sessionStorage.setItem("collection", JSON.stringify(collection));

                let ar = this.state.Films.map(film => {
                    if (film.id_movie == id_movie) {
                        film.collect = false;
                    }
                    return film;
                })
                this.setState({
                    Films: ar
                });

                //改變購物車數字 collectionNum
                this.props.updatecollectionNum();
            }

        } else {
            console.log("add")
            if (id_user !== undefined) {
                url = `http://192.168.39.110/tcff_php/api/cart/collection.php`;
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
                            //加Storage的collection
                            let collection = sessionStorage.getItem('collection');

                            if (collection === null) {//第一次加入
                                collection = {
                                    cffilms: [data.collection_info[0]],
                                    films: []
                                }
                            } else {
                                collection = JSON.parse(collection)
                                collection.cffilms.push(data.collection_info[0]);
                            }

                            sessionStorage.setItem("collection", JSON.stringify(collection));

                            //改變checkbox狀態(setState)
                            let ar = this.state.Films.map(film => {
                                if (film.id_movie == id_movie) {
                                    film.collect = true;
                                }
                                return film;
                            })
                            this.setState({
                                Films: ar
                            });

                            //改變購物車數字 collectionNum
                            this.props.updatecollectionNum();
                        }
                    })
                    .catch(err => console.log(`error with fetch: ` + err.message))
            } else {
                //增加Storage的collection
                let collection = sessionStorage.getItem('collection');
                if (collection === null) {
                    collection = {
                        films: [],
                        cffilms: []
                    }
                    // collection.films.push(this.state.datas.filter(x => x.id_movie == id_movie));
                } else {
                    collection = JSON.parse(collection);
                    // collection.films.push(this.state.datas.filter(x => x.id_movie == id_movie));
                }
                collection.cffilms.push(this.state.Films.filter(x => x.id_movie == id_movie)[0]);
                // collection.films.push(data.collection_info[0]);
                sessionStorage.setItem("collection", JSON.stringify(collection));

                let ar = this.state.Films.map(film => {
                    if (film.id_movie == id_movie) {
                        film.collect = true;
                    }
                    return film;
                })
                this.setState({
                    Films: ar
                });

                //改變購物車數字 collectionNum
                this.props.updatecollectionNum();
            }
            console.log("state", this.state.Films)
        }
    }
    componentDidMount() {

        console.log("didMount state", this.state)
        // 連結後端資料
        console.log("match", this.props);
        console.log("query", window.location.search)
        let q = window.location.search;
        let id = q.slice(q.search('=') + 1)
        let collection = sessionStorage.getItem("collection");
        console.log("id", id)
        fetch(`http://192.168.39.110/tcff_php/api/movie/read.php?cf=true`)
            .then((res) => res.json())
            .then((datas) => {
                console.log(datas)
                if (collection !== null) {
                    collection = JSON.parse(collection);
                    if (collection.cffilms.length > 0) {
                        let cf_ids = collection.cffilms.reduce((a, x) => {
                            a.push(x.id_movie);
                            return a;
                        }, [])
                        datas = datas.map(x => {
                            x.collect = false;
                            if (cf_ids.includes(x.id_movie)) x.collect = true;
                            return x;
                        })
                    } else {
                        datas = datas.map(x => {
                            x.collect = false;
                            return x;
                        })
                    }
                } else {
                    datas = datas.map(x => {
                        x.collect = false;
                        return x;
                    })
                }

                this.setState({
                    Films: datas
                }, () => {
                    fetch(`http://192.168.39.110/tcff_php/api/movie/cfRead.php`)
                        .then((res) => res.json())
                        .then((datas) => {
                            // console.log(datas) 
                            console.log("state", this.state.Films)
                            let films = this.state.Films.map(film => {
                                film.progress = 0;
                                if (datas.hasOwnProperty(film.id_movie)) {
                                    film.progress = datas[film.id_movie];
                                }
                                return film;
                            })
                            this.setState({ Films: films });
                            console.log("films", films)
                        })
                })
            })

    }
    render() {
        return (
            <div>
                <section className="container-cf">

                </section>
                <section className="container-cfFilms">
                    <div className="about">
                        <p>[注意事項]</p>
                        <p>募資活動期間: 2018/06/01 - 2018/06/30</p>
                        <p>募資活動結束前，該影片募資進度達成80%以上，則該片確認放映。在募資活動期間完成該片票券購買的消費者，於影片放映當日持電影票券至指定影廳，即可入內觀賞。台北經典影展會於募資達標後一周內以電子郵件通知放映時間及影廳，煩請多加留意。</p>
                        <p>如果募資活動結束仍然沒有達到目標，台北經典影展會透過您參與募資時的原付款方式退還你所支持的金額（不包含虛擬帳號轉帳交易手續費）。您將會收到金流公司所寄出的退款信件，請根據信中的指示完成退款步驟。</p>
                    </div>
                    <div id="mycard" className="flex">

                        {this.state.Films.map((data, idx) =>
                            <figure className="card">
                                <div className="mycontent cover">
                                    <Link to={`cf-films-detail-page?id=${data.id_movie}&cf=true`}>
                                        <button className="detail"><div>電影資料</div></button>
                                        <img className="post" src={`${process.env.PUBLIC_URL}/images/${data.release_year}_${data.name_en.split(' ').join('_').replace(':', '')}.jpg`} alt="" />
                                    </Link>
                                </div>

                                <p className="first">{data.release_year}</p>
                                <p>{data.name_zhtw}</p>
                                <h6>目前進度：{Math.round(data.progress * 100)}%</h6>
                                <div id="progressbar">
                                    <div id="bar" style={{ width: data.progress * 100 + '%' }}></div>
                                </div>

                                <input type="checkbox" id={`id_${data.id_movie}`} checked={data.collect} />
                                <label htmlFor={`id_${data.id_movie}`} className="favorite" onClick={this.handleCollect} data-id-movie={data.id_movie}>
                                    <i className="fas fa-plus-circle"></i>
                                    {
                                        data.collect == true ? ' 已收藏' : ' 加入收藏'
                                    }

                                </label>
                            </figure>

                        )}



                    </div>


                </section>
            </div>
        );
    }
}

export default Cffilms;
