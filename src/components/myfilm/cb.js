import React, {
    Component
} from 'react';
import './cb.scss';

class Cb extends Component {
    constructor(props) {
        super(props);
        // this.handleCheck = this.handleCheck.bind(this);
    }
    componentDidMount() {
        
    }
    // handleCheck(evt){
    //     let target = evt.target;
    //     console.log(target);
    // }
    render() {
        return ( 
            <div className="cb">
                <input type="checkbox" id={this.props.id} />
                <label data-id-movie={this.props.id.split('_')[1]} htmlFor={this.props.id} onClick={this.props.click ? this.props.click : this.handleCheck}>
                    <span></span>
                </label>
            </div>
        );
    }
}

export default Cb;
