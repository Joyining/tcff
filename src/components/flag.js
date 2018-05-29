import React, { Component } from 'react';
import '../sass/flag.scss';

class Flag extends Component {

    componentDidMount(){
        document.addEventListener("DOMContentLoaded", function scrollDetection (event) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", function () {
                let scrollTop = document.documentElement.scrollTop;
            })
        });
    }
    
    render() {
        return(
                <div className="flag-wrap">
                    <div className="line-long"></div>
                    <div className="line-short"></div>
                    <div className="circle"></div>
                    <div className="flag">確認放映</div>
                </div>
        );
    }
}

export default Flag;
