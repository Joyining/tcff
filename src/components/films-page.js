import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Films from './films';


class FilmsPage extends Component{
    constructor(props){
        super(props);
        this.updatecollectionNum = this.updatecollectionNum.bind(this);
        this.state = {
            collectionNum: 0,
            loginStatus: false,
            login: "", 
        }
    }
    componentDidUpdate(){
        console.log('page update');
    }
    componentWillMount(){
        let collection = JSON.parse(sessionStorage.getItem("collection"));
        if (collection !== null){
            let collectionNum = collection.films.length + collection.cffilms.length;
            this.setState({
                collectionNum: collectionNum
            })
        }

        //login state
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
    }
    updatecollectionNum(){
        let collection = JSON.parse(sessionStorage.getItem("collection"));
        let collectionNum = 0;
        if(collection !== null){
            collectionNum += collection.films.length;
            collectionNum += collection.cffilms.length;
        }
        this.setState({
            collectionNum: collectionNum
        })
    }
    render(){
        return (
            <div>
                <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login} />
                <FastTicket />
                <Films updatecollectionNum={this.updatecollectionNum} />
                <Footer />
            </div>
        );
    }
}

export default FilmsPage;