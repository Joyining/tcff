import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Films from './films';


class FilmsPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Header />
                <FastTicket />
                <Films />
                <Footer />
            </div>
        );
    }
}

export default FilmsPage;