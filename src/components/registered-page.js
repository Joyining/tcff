import React, {Component} from 'react' ;
import Header from './header' ;
import Footer from './footer' ;
import FastTicket from './fast-ticket' ;
import Registered from './registered' ;

class RegisteredPage extends Component{
    render(){
        return(
            <div style={{position:'relative'}}>
                <Header />
                <FastTicket />
                <Registered />
                <Footer />
            </div>
        );
    }
}

export default RegisteredPage ;