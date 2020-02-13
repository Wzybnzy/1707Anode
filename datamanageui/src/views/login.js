import React, { Component } from 'react'
import axios from 'axios'
export default class Login extends Component {
    state = {
        phone:'',
        pwd:''
    }
    render() {
        let {phone,pwd} = this.state;
        return (
            <div>
                <input placeholder="请输入手机号" name="phone" value={phone} onChange={this.handleChange.bind(this)}/>
                <input placeholder="请输入密码" name="pwd" value={pwd} onChange={this.handleChange.bind(this)}/>
                <button onClick={this.handleSubmit.bind(this)}>登录</button>
            </div>
        )
    }
    handleChange(e){
        let name = e.target.name;
        this.setState({
            [name]:e.target.value
        })
    }
   async handleSubmit(){
        console.log('点击登录');
        let {phone,pwd} = this.state;

        let res = await axios.post('/login',{
            phone,
            pwd
        });
        if(res.data.code == 1){
            window.localStorage.user = JSON.stringify({token:res.data.token,uid:res.data.uid});
            this.props.history.push('/home');
        }
        console.log(res,'*****');
    }
}
