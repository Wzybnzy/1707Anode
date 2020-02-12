import React, { Component } from 'react'
import axios from 'axios'
export default class Login extends Component {
    state = {
        name:'',
        pwd:''
    }
    render() {
        let {name,pwd} = this.state; 
        return (
            <div>
                <input placeholder="请输入用户名" value={name} name="name" onChange={this.handleChange.bind(this)}/>
                <input placeholder="请输入密码" value={pwd} name="pwd" onChange={this.handleChange.bind(this)}/>
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
        let {name,pwd} = this.state;
        let res =await  axios.post('/login',{
            name,pwd
        });
        if(res.data.code == 1){
            //登录成功
            window.localStorage.user = JSON.stringify({token:res.data.token,uid:res.data.uid,name});
            //跳转首页
            // this.props.history.push({
            //     pathname:'/home',
            //     params:{
            //         name:name
            //     }
            // });
            this.props.history.push('/home');
        }
        console.log(res,'**************');
    }
    
}
