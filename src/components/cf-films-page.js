import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Cffilms from './cf-films';
import Breadcrumb from './breadcrumb';

class CffilmsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectionNum: 0, // 加到每個page.js
            loginStatus: false, // 加到每個page.js
            login: "", // 加到每個page.js
            breadcrumbName: {
                films: ['首頁', '確認放映'],
                time: ['首頁', '場次日曆'],
                timelist: ['首頁', '場次列表'],
                cffilms: ['首頁', '募資影片'],
                filmsdetailpage: ['首頁', '確認放映'],
                cffilmsdetailpage: ['首頁', '募資影片'],
                article: ['首頁', '電影賞析'],
                membercenter: ['首頁', '會員中心'],
                info: ['首頁', '關於影展'],
                news: ['首頁', '最新消息'],
              },
              breadcrumbPath: {
                films: ['/', '/films'],
                time: ['/', '/time'],
                timelist: ['/', '/time'],
                cffilms: ['/', '/cf-films'],
                filmsdetailpage: ['/', '/films'],
                cffilmsdetailpage: ['/', '/cf-films'],
                article: ['/', '/article'],
                membercenter: ['/', '/membercenter'],
                info: ['/', '/info'],
                news: ['/', '/news'],
              }
        };

        this.updatecollectionNum = this.updatecollectionNum.bind(this);
    }
    // only for testing 加到購物車
    componentWillMount() {
        // this.setState({ collectionNum: localStorage.getItem("collectionsNum") });
        let collection = JSON.parse(sessionStorage.getItem("collection"));
        if (collection !== null) {
            let collectionNum = collection.films.length + collection.cffilms.length;
            this.setState({
                collectionNum: collectionNum
            })
        }
        if (sessionStorage.getItem("user") !== null) {
            ;
            this.setState({
                loginStatus: true,
                login: JSON.parse(sessionStorage.getItem("user"))["username"],
            });
        } else {
            this.setState({
                loginStatus: false,
                login: "",
            })
        }
        const currentPath = this.props.location.pathname.replace("/", "").replace("-", "");
        const breadcrumbNameArr = this.state.breadcrumbName[currentPath];
        const breadcrumbPathArr = this.state.breadcrumbPath[currentPath];
        this.setState({
            currentBreadcrumbName: breadcrumbNameArr,
            currentBreadcrumbPath: breadcrumbPathArr,
        })
    }
    // only for testing 加到購物車
    updatecollectionNum() {
        // this.setState({ collectionNum: localStorage.getItem("collectionsNum") });
        let collection = JSON.parse(sessionStorage.getItem("collection"));
        let collectionNum = 0;
        if (collection !== null) {
            collectionNum += collection.films.length;
            // } else if (collection.cffilms !== null){
            collectionNum += collection.cffilms.length;
        }
        this.setState({
            collectionNum: collectionNum
        })
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div style={{ position: 'relative' }}>
                <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login} />
                <Breadcrumb currentBreadcrumbName={this.state.currentBreadcrumbName} currentBreadcrumbPath={this.state.currentBreadcrumbPath} />
                <FastTicket />
                <Cffilms updatecollectionNum={this.updatecollectionNum} />
                <Footer />
            </div>
        );
    }
}

export default CffilmsPage;
