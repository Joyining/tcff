import React, {Component} from 'react' ;
import Header from './header' ;
import Footer from './footer' ;
import FastTicket from './fast-ticket' ;
// import Member from './member' ;
import MemberCenter from './membercenter';



class MemberCenterPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          collectionNum: "0", // 加到每個page.js
          loginStatus: false, // 加到每個page.js
          login: "", // 加到每個page.js
        };
      }

    // 加到每個page.js
    componentWillMount() {
         // 更新collectionNum數字
        let collection = JSON.parse(sessionStorage.getItem("collection"));
        if (collection !== null) {
        let collectionNum = collection.films.length + collection.cffilms.length;
            this.setState({
                collectionNum: collectionNum
            })
        }

        // 判斷是否為登入狀態
        if (sessionStorage.getItem("user") !== null) {
            this.setState({
            loginStatus: true,
            // 改變登入icon樣式
            login: JSON.parse(sessionStorage.getItem("user"))["username"],
            });
        } else {
            this.setState({
            loginStatus: false,
            login: "",
            })
        }
    }
    
  // 加到每個page.js
    componentDidMount() {
         window.scrollTo(0, 0);
    }
    
    render(){
        return(
            <div style={{position:'relative'}}>
                 {/* 加到每個page.js */}
                <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login}/>
                
                <FastTicket />
                <MemberCenter />
                <Footer />
            </div>
        );
    }
}

export default MemberCenterPage;