import React, {
    Component
} from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import './tab4.scss';

class Tab4 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="tab tab4">
                <div className="wrap">
                    <div className="text">
                        <h3>
                            感謝您的購買
                        </h3>
                        <p>
                            您的兌票序號為ABCD123456
                        </p>
                        <Link className="" to={`/`}>回首頁</Link>
                        
                    </div>
                        
                </div>
            </div>
        );
    }
}

export default Tab4;
