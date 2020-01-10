import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import httpAxios from '../../utils/request'
import {Switch,Route,Redirect,NavLink} from 'react-router-dom'
import Home from '../index/home/home'
import Score from '../index/score/score'
import Student from '../index/student/student'
import People from '../index/people/people'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Index extends Component {
    state = {
        name:'',
        role:'',
        list:[]
    }
    async componentDidMount(){
        const user = JSON.parse(window.localStorage.getItem('users')); //本地存储取得值
        let res = await httpAxios.get('/user/menu?role_id='+user.role);
        console.log(res);
        if(res.data.code == 1){
            this.setState({role:res.data.name,name:user.name,list:res.data.data})
        }
    }

    handleClick(){
        window.localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        let {name,role,list} = this.state;
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <p>1707A后台管理</p>
                        <div>
                            <span>欢迎：{name}-{role}</span>
                            <span onClick={this.handleClick.bind(this)}>退出</span>
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {
                                    list && list.map((item,index) => 
                                    <Menu.Item key={index}>
                                        <NavLink to={item.url}>{item.power_name}</NavLink>
                                    </Menu.Item>)
                                }

                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb> */}
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <Switch>
                                    <Route path="/index/home" component={Home}/>
                                    <Route path="/index/score" component={Score}/>
                                    <Route path="/index/student" component={Student}/>
                                    <Route path="/index/pep" component={People}/>
                                    <Redirect path="/index" to="/index/home"/>
                                </Switch>
        </Content>
                        </Layout>
                    </Layout>
                </Layout>,
            </div>
        )
    }
}


