import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Filmsdetail from './films-detail';
import Breadcrumb from './breadcrumb';

class FilmsdetailPage extends Component {
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
        },
        breadcrumbPath: {
            films: ['/', '/films'],
            time: ['/', '/time'],
            timelist: ['/', '/time'],
            cffilms: ['/', '/cf-films'],
            filmsdetailpage: ['/', '/films'],
            cffilmsdetailpage: ['/', '/cf-films'],
        },
        currentBreadcrumbName: [],
        currentBreadcrumbPath: [],
        films: [],
    };
    this.updatecollectionNum = this.updatecollectionNum.bind(this);
  }
  // only for testing 加到購物車
  componentWillMount() {
    // this.setState({ collectionNum: localStorage.getItem("collectionsNum") });
    let collection = JSON.parse(sessionStorage.getItem("collection"));
        if (collection !== null){
            let collectionNum = collection.films.length + collection.cffilms.length;
            this.setState({
                collectionNum: collectionNum
            })
        }
        if(sessionStorage.getItem("user")!==null){;
            this.setState({
              loginStatus: true,
              login: JSON.parse(sessionStorage.getItem("user"))["username"],
            });
          }else{
            this.setState({
              loginStatus: false,
              login: "",
          })
          }

    const currentPath = this.props.location.pathname.replace("/", "").replace("-", "").replace("-", "");
    const breadcrumbNameArr = this.state.breadcrumbName[currentPath];
    const breadcrumbPathArr = this.state.breadcrumbPath[currentPath];

    let q = window.location.search;
    let id = q.slice(q.search('=') + 1);
    fetch(`http://192.168.39.110/tcff_php/api/movie/readOne.php?id=${id}`)
        .then((res) => res.json())
        .then((datas) => {
            this.setState({
                films: datas,
            })
            breadcrumbNameArr.push(this.state.films.name_zhtw);
            breadcrumbPathArr.push(`films-detail-page?id=${id}`);
            this.setState({
                currentBreadcrumbName: breadcrumbNameArr,
                currentBreadcrumbPath: breadcrumbPathArr,
            })
        })
    
    }
    

  // only for testing 加到購物車
  updatecollectionNum() {
    // this.setState({ collectionNum: localStorage.getItem("collectionsNum") });
    let collection = JSON.parse(sessionStorage.getItem("collection"));
        let collectionNum = 0;
        if(collection !== null){
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
        <div style={{position:'relative'}}>
            <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login} />
            <Breadcrumb currentBreadcrumbName={this.state.currentBreadcrumbName} currentBreadcrumbPath={this.state.currentBreadcrumbPath} />
            <FastTicket />
            <Filmsdetail updatecollectionNum={this.updatecollectionNum} />
            <Footer />
        </div>
    );
  }
}

export default FilmsdetailPage;
