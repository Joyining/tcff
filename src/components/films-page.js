import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Films from './films';


class FilmsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            collectionNum: "0"
        }
    }
    componentWillMount(){
        this.setState({
            collectionNum: localStorage.getItem("collectionNum")
        })
    }
    unpdatecollectionNum(){
        this.setState({
            collectionNum: localStorage.getItem("collectionNum")
        })
    }
    render(){
        return (
            <div>
                <Header collectionNum={this.collectionNum} />
                <FastTicket />
                <Films addToCart={this.unpdatecollectionNum} />
                <Footer />
            </div>
        );
    }
}

export default FilmsPage;