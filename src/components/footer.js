import React, { Component } from 'react';
import '../sass/page.scss';

class Footer extends Component {

    render() {
        return(
            <footer>
                <div className="superviser footer-group">
                    <div className="title">指導單位</div>
                    <ul className="content">
                        <li>指導單位｜台北市政府、文化部影視及流行音樂產業局</li>
                        <li>合辦單位｜臺北市政府文化局、財團法人台北市文化基金會</li>
                    </ul>
                </div>
                <div className="contact footer-group">
                    <div className="title">聯絡方式</div>
                    <ul className="content">
                        <li>客服電話｜02-2999-9999</li>
                        <li>客服信箱｜tcff.service@tcff.com</li>
                    </ul>
                </div>
                <div className="follow footer-group">
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-youtube"></i>
                    <i className="fas fa-arrow-circle-up"></i>
                </div>
            </footer>
        );
    }
}

export default Footer;
