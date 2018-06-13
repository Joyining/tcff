import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Cffilmsdetail from './cf-films-detail'

class CffilmsdetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionNum: 0,
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
            <Header collectionNum={this.state.collectionNum} />
            <FastTicket />
            <Cffilmsdetail updatecollectionNum={this.updatecollectionNum} />
            <Footer />
        </div>
    );
  }
}

export default CffilmsdetailPage;
