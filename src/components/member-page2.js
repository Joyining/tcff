import React, {Component} from 'react' ;
import Header from './header' ;
import Footer from './footer' ;
import FastTicket from './fast-ticket' ;
// import Member from './member' ;
import Member2 from './member2';



class MemberPage2 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            collectionNum: 0, // 加到每個page.js
            loginStatus: false, // 加到每個page.js
            login: "", // 加到每個page.js
        };
      }

    // 加到每個page.js
    componentWillMount() {
        let collection = JSON.parse(sessionStorage.getItem("collection"));
        console.log(collection)
        if (collection !== null) {
            let collectionNum = collection.films.length + collection.cffilms.length;
            this.setState({
                collectionNum: collectionNum
            })
        }

        if (sessionStorage.getItem("user") !== null) {
            console.log(typeof (sessionStorage.getItem('user')));
            console.log(JSON.parse(sessionStorage.getItem('user')));
            this.setState({
                loginStatus: true,
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
                <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login} />
                <FastTicket />
                <Member2 />
                <Footer />
            </div>
        );
    }
}

export default MemberPage2;