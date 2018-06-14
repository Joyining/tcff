import React, { Component } from 'react';
import '../sass/result.scss';

class Info extends Component {

  render() {
    return (
        <section className="container-result">
            <div className="title">訂票紀錄</div>
            <div className="about">
                <table className="mytable">
                    <thead>
                        <tr>
                            <th>訂購時間</th>
                            <th>訂單內容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>2018-06-15</td>
                        <td>電影 心靈捕手<br />
                            時間 2018-07-08Sun15:00:00<br />
                            戲院 誠品電影院 <br />                            
                        </td>
                    </tbody>
                </table>
            </div>
            
        </section>
    );
  }
}

export default Info;
