import React, {
    Component
} from 'react';
import './seat-map.scss';

class SeatMap extends Component {
    constructor(props) {
        super(props);
        // this.handleCheck = this.handleCheck.bind(this);
        this.allSeatsNum = 0;
    }
    // componentDidMount() {
    // }
    createSeats(occupiedSeats){
        let table = [];
        this.allSeatsNum = 0;

        // Outer loop to create parent ((3+6+3)cols * 9rows)=108seats
        let noSeatCol = [1,5,12];
        // let allSeatsNum = 0;
        for (let i = 0; i < 9; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 16; j++) {
                let cl = children.length;
                if(j === 0){
                    children.push(<td className="row">{String.fromCharCode(65+i)}</td>);                    
                }
                if (cl !== children.length) continue;
                noSeatCol.forEach(num => {
                    if (j === num) {
                        children.push(<td className="empty">{`0`}</td>);
                        // console.log("return");
                        return;
                    }
                });
                if(cl !== children.length) continue;
                // console.log("still");
                this.allSeatsNum++;
                // let col = (<td className="available occupied">{`${this.allSeatsNum}`}</td>);
                occupiedSeats.map(num => {
                    if (this.allSeatsNum === num) {
                        children.push(<td className="occupied" data-seat-num={this.allSeatsNum} data-row={String.fromCharCode(65 + i)}>{`${((this.allSeatsNum-1) % 12) +1}`}</td>);
                        // console.log("return");
                        return;
                    }
                })
                if (cl !== children.length) continue;
                // console.log("still");
                children.push(<td className="available" onClick={this.props.pickSeat} data-seat-num={this.allSeatsNum} data-row={String.fromCharCode(65 + i)}>{`${((this.allSeatsNum - 1) % 12) + 1}`}</td>);
            }
            //Create the parent and add the children
            table.push(<tr>{children}</tr>)
        }
        return table
        // return map;
    }
    render() {
        return (
            <div className="seat-map">
                <table data-id-movie={this.props.id_movie}>
                <thead align="center">
                    <tr>
                        <th colSpan="16">
                        <span>SCREEN</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.createSeats(this.props.occupiedSeats)}
                    </tbody>
                    </table>
            </div>
        );
    }
}

export default SeatMap;
