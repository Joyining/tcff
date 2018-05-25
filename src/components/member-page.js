import React, {Component} from 'react' ;
import Header from './header' ;
import Footer from './footer' ;
import FastTicket from './fast-ticket' ;
import Member from './member' ;

class MemberPage extends Component{
    render(){
        return(
            <div style={{position:'relative'}}>
                <Header />
                <FastTicket />
                <Member />
                <Footer />
            </div>
        );
    }
}

export default MemberPage ;