import React, { Component } from 'react';
import '../sass/page.scss';
import fastTicket from '../images/ticket_fast03.png';

class FastTicket extends Component {

    render() {
        return(
            <div className="fast-ticket">
                <img src={fastTicket} alt="" />
            </div>
        );
    }
}

export default FastTicket;
