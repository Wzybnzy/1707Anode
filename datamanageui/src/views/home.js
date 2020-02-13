import React, { Component } from 'react'
import { Button, Table } from 'antd';
// import axios from 'axios'
import httpAxios from '../utils/request'
export default class Home extends Component {
    state = {
        list:[]
    }
    render() {
        let {list} = this.state;
        const columns = [
            {
                title: 'name',
                dataIndex: 'name'
            },
            {
                title: 'phone',
                dataIndex: 'phone',
            },
            {
                title: 'label',
                dataIndex: 'label',
            },
            {
                title: 'role',
                dataIndex: 'role',
            },
            {
                title: 'card',
                dataIndex: 'card',
            },
            {
                title: 'address',
                dataIndex: 'address',
            },
            {
                title: 'followup',
                dataIndex: 'followup',
            },
            {
                title: 'time',
                dataIndex: 'time',
            },
            {
                title: 'action',
                dataIndex: 'action',
                render: () =><>
                 <Button type="primary">查看</Button>
                 <Button type="primary">编辑</Button>
                 <Button type="danger">删除</Button>
                 </>,
            }
        ];
        list.map(item => item.key= item.id)
        const data = list;
        // const data = [
        //     {
        //         key: '1',
        //         name: 'John Brown',
        //         phone: 32,
        //         label: 'New York No. 1 Lake Park',
        //         role: 'v0',
        //         card: '4567890987654323455',
        //         address: '海淀',
        //         followup: '跟进内容',
        //         time: '2020-09-09',
        //     },
        //     {
        //         key: '2',
        //         name: 'Jim Green',
        //         phone: 42,
        //         label: 'London No. 1 Lake Park',
        //         role: 'v0',
        //         card: '4567890987654323455',
        //         address: '海淀',
        //         followup: '跟进内容',
        //         time: '2020-09-09',
        //     },
        //     {
        //         key: '3',
        //         name: 'Joe Black',
        //         phone: 32,
        //         label: 'Sidney No. 1 Lake Park',
        //         role: 'v0',
        //         card: '4567890987654323455',
        //         address: '海淀',
        //         followup: '跟进内容',
        //         time: '2020-09-09',
        //     }
        // ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        return (
            <div>
                <Button type="primary">添加用户</Button>
                <Button type="danger">删除用户</Button>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        )
    }

    async componentDidMount(){
        let res = await httpAxios.get('/list');
        console.log(res);
        if(res.data.code == 1){
            this.setState({
                list:res.data.data
            })
        }
    }
}
