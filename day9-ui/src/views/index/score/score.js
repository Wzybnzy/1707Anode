import React, { Component } from 'react'
import { Input, Button, Table, Divider, Tag } from 'antd';
import httpAxios from '../../../utils/request'
const columns = [
    {
        title: '序号',
        dataIndex: 'num',
        render: (text,item) => <a>{item.id}</a>,
    },
    {
        title: '姓名',
        dataIndex: 'name'
    },
    {
        title: '理论成绩',
        dataIndex: 'theory'
    },
    {
        title: '技能成绩',
        dataIndex: 'skill'
    },
    {
        title: '操作',
        render: (text, record) => (
            <div>
                <Button type="primary">编辑</Button>
                <Button type="danger">删除</Button>
            </div>
        ),
    },
];

export default class Score extends Component {
    state = {
        data:[]
    }
    async componentDidMount(){
        let res = await httpAxios.get('/scores/list');
        console.log(res);
        if(res.data.code == 1){
            this.setState({data:res.data.data})
        }
    }
    render() {
        let {data} = this.state;
        return (
            <div>
                <h3>成绩管理</h3>
                <header className="score_header">
                    <div>
                        <span>姓名：</span>
                        <Input placeholder="Basic usage" />
                        <Button type="primary">搜索</Button>
                    </div>
                    <Button type="primary">添加</Button>
                </header>

                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
