import React, { Component } from 'react';

class Login extends Component{
    constructor(props){
        super(props) ;
        //了解state設定的目的嗎?
        //在textbox中我們使用了value={this.state.email}顯示email的內容
        //在small標籤中我們使用了{this.state.message.email}顯示了email錯誤訊息
        //要修改錯誤訊息或者是value的值，都必須要透過this.setState(...)才做得到
        //可以看看下面程式的this.setState(...)
        this.state = {          
            email: '', //用來儲存使用者在email欄位中輸入的資料
            password: '', //用來儲存使用者在password欄位中的資料
            message:{'email':'','password':''}  //用來儲存錯誤訊息
          }
        this.handleChange = this.handleChange.bind(this);   
        this.validate = this.validate.bind(this);    
    }

    //onChange事件發生會執行handleChange的function
    //主要的目的是為了讓使用者可以在textbox中輸入資料
    handleChange(event){
        const state = this.state;
        state[event.target.id] = event.target.value;         
        this.setState(state);
    }

    //onBlur事件發生會執行validate的function
    //主要的目的是為了檢查使用者輸入的資料是否正確
    validate(event){
        switch (event.target.name){
            case "email":
                this.emailCheck();
                break;
            case "password":
                this.passwordCheck();
                break;
            default:
                break;
        } 
    }

    emailCheck(){
        const pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        const error = this.state.message       
        pattern.test(this.state.email) ? error.email = "" : error.email = "email格式不正確";
        this.setState({message:error});
    }
    passwordCheck(){
        const pwd = this.state.password;
        const error = this.state.message
        pwd.length >=4 && pwd.length <=8 ? error.password = "" : error.password = "密碼請輸入4-8個字元";
        this.setState({message:error})
    }

    render() {
        return (
            <form>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="text" autoComplete="off" onBlur={this.validate} value={this.state.email} onChange={this.handleChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailError" className="form-text text-muted">{this.state.message.email}</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" value={this.state.password} onBlur={this.validate}  onChange={this.handleChange} className="form-control" id="password" name="password" placeholder="Password" />
              <small id="passwordError" className="form-text text-muted">{this.state.message.password}</small>
            </div>            
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>         
        );
    } 
}
export default Login;
