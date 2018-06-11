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
      collectionNum: "0", // 加到每個page.js
      loginStatus: false,
      login:"",
    };
  }

  // 加到每個page.js
  componentWillMount() {
    this.setState({ collectionNum: localStorage.getItem("collectionsNum") });

    if(sessionStorage.getItem("user")!==null){
      console.log(typeof(sessionStorage.getItem('user')));
      console.log(JSON.parse(sessionStorage.getItem('user')));
      this.setState({
        loginStatus: true,
        login: JSON.parse(sessionStorage.getItem("user"))["email"].slice(0, 2).toUpperCase(),
      });
    }else{
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
