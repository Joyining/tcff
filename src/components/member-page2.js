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

 
    componentWillMount() {
            // 加到每個page.js
            let collection = JSON.parse(sessionStorage.getItem("collection"));
            if (collection !== null) {
            let collectionNum = collection.films.length + collection.cffilms.length;
            this.setState({
                collectionNum: collectionNum
            })
            }

            // 加到每個page.js
            if(sessionStorage.getItem("user")!==null){;
            this.setState({
                loginStatus: true,
                login: JSON.parse(sessionStorage.getItem("user"))["username"],
            });
            }else{
            this.setState({
                loginStatus: false,
                login: "",
            })
            }

            console.log(this.props.location.pathname);
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
                <Member2 />
                <Footer />
            </div>
        );
    }
}

export default MemberPage2;