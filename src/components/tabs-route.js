import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Tab1 from './myfilm/tab1';
import Tab2 from './myfilm/tab2';
import Tab3 from './myfilm/tab3';
import Tab4 from './myfilm/tab4';

class TabsRoute extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path={`${this.props.url}/`} component={Tab1} />
                    <Route path={`${this.props.url}/2`} component={Tab2} />
                    <Route path={`${this.props.url}/3`} component={Tab3} />
                    <Route path={`${this.props.url}/4`} component={Tab4} />
                    </div>
            </Router>
        );
    }
}

export default TabsRoute;
