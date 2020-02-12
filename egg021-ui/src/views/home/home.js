import React, { Component } from 'react'
import httpAxios from '../../utils/request';
import {Switch,Route,Redirect} from 'react-router-dom'
import Approval from './approval/approval'
import Myreser from './myreser/myreser'
import Myreserve from './myreserve/myreserve'
import Reserve from './reserve/reserve'
import RouterView from '../../router/routerview'
export default class Home extends Component {
    state = {
        name:'',
        list:[]
    }
    render() {
        // getuserinfo
        let {name,list} = this.state;
        let {child} = this.props;
        console.log(this.props)
        return (
            <div>
                <header>
                    <span>姓名：{JSON.parse(window.localStorage.user).name}</span>
                    <span>身份：{name}</span>
                </header>
                <div className="wrapper">
                    <div className="left">
                        <ul>
                            {
                                list && list.map((item,index) => 
                                <li key={index} onClick={this.handleTab.bind(this,item.url)}>{item.p_name}</li>)
                            }
                        </ul>
                    </div>
                    <div className="right">
                    <RouterView routes={child}/>
                        {/* <Switch>
                            <Route path="/home/approval" component={Approval}/>
                            <Route path="/home/myreser" component={Myreser}/>
                            <Route path="/home/myreserve" component={Myreserve}/>
                            <Route path="/home/reserve" component={Reserve}/>
                            <Redirect path="/home" to="/home/approval"/>
                        </Switch> */}
                    </div>
                </div>
            </div>
        )
    }
    async componentDidMount(){
        let uid = JSON.parse(window.localStorage.user).uid;
        let res = await httpAxios.get('/getuserinfo?uid='+uid);
        //获取左侧列表
        let left = await  httpAxios.get('/getlist?uid='+uid);
        console.log(left)
        if(res.data.code == 1){
            this.setState({
                name:res.data.name,
                list:left.data.data
            })
        }
        console.log(res);
    }
    handleTab(url){ //点击左侧
        console.log(url); // url1---> component1   url2 ----> component2
        this.props.history.push(url)
    }
}
