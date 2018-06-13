import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import Home from './home';
// import Flag from './flag';

class HomePage extends Component {
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

  }

  
  componentDidMount() {
    // 加到每個page.js
    window.scrollTo(0, 0);
  }

  render() {
    return <div>
        {/* 加到每個page.js */}
        <Header collectionNum={this.state.collectionNum} loginStatus={this.state.loginStatus} login={this.state.login}/>

        <Home />
        <FastTicket />
        <Footer />
      </div>;
  }
}

export default HomePage;
