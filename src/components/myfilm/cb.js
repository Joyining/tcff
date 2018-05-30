import React, {
    Component
} from 'react';
import './cb.scss';

class Cb extends Component {
    constructor(props) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
    }
    // componentDidMount() {
    // }
    handleCheck(evt){
        let target = evt.target;
        console.log(target);
    }
    render() {
        return ( 
            <div className="cb">
                <input type="checkbox" id={this.props.id} />
                <label htmlFor={this.props.id} onClick={this.handleCheck}></label>
            </div>
        );
    }
}

export default Cb;
