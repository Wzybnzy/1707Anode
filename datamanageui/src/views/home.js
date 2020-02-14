import React, { Component } from 'react'
import { Button, Table, Modal, Input, Select, Tag, Tooltip, } from 'antd';
// import axios from 'axios'
import httpAxios from '../utils/request'

const { Option } = Select;
export default class Home extends Component {
    state = {
        list: [],
        total: 1,
        pageSize: 5,
        selArr: [
            {
                val: 'v0',
                txt: '超级管理员'
            },
            {
                val: 'v1',
                txt: '管理员'
            },
            {
                val: 'v2',
                txt: '访客'
            }
        ],
        visible: false,
        phone: "",
        name: '',
        card: '',
        address: '',
        label: '',
        followup: '',
        role: '',
        tags: [],
        tagsArr: ['医生', '护士', '经理', '总经理', '讲师', '教授', '八维']
    }
    render() {
        let { list, total, pageSize, selArr, tags, tagsArr } = this.state;
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
                render: (text, record, index) => { //v0超级管理员  v1管理员   v2访客
                    // v0 删除、编辑、查看  v1 编辑、查看   v2 查看
                    // console.log(text, record, index, '*********')
                    return <>
                        {
                            record.role == 'v0' ? <Button type="danger">删除</Button> : null
                        }
                        {
                            record.role == 'v1' || record.role == 'v0' ? <Button type="primary">编辑</Button> : null
                        }

                        <Button type="primary">查看</Button>
                    </>
                },
            }
        ];
        list.map(item => item.key = item.id)
        const data = list;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        // pagination，一共多少条数据，一页多少条，才能展示一个正确的页码
        //改变页码的时候，会触发change事件，在事件里面可以获取到当前第几页，一页多少条
        // 为什么要获取这些参数？ 当页码改变的时候，要重新发起请求，请求点击的页码的数据
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>添加用户</Button>
                <Button type="danger">删除用户</Button>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={{ total, pageSize }}
                    onChange={this.handleChangePagination.bind(this)}
                />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/* <input value={phone} name="phone" onChange={this.handleCancel.bind(this)}/> */}

                    <Input placeholder="请输入手机号" name="phone" onChange={this.handleInputChange.bind(this)} />
                    <Input placeholder="请输入用户名称" name="name" onChange={this.handleInputChange.bind(this)} />
                    <Input placeholder="请输入身份证" name="card" onChange={this.handleInputChange.bind(this)} />
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleSelChange.bind(this)}>
                        {
                            selArr && selArr.map((item, index) => <Option value={item.val} key={index}>{item.txt}</Option>)
                        }
                    </Select>
                    <Input placeholder="请输入公司地址" name="address" onChange={this.handleInputChange.bind(this)} />
                    <Input placeholder="请输入跟进" name="followup" onChange={this.handleInputChange.bind(this)} />
                    <h3>标签:</h3>
                    {tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                            <Tag key={tag} closable onClose={() => this.handleClose(tag)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                        );
                        return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                                {tagElem}
                            </Tooltip>
                        ) : (
                                tagElem
                            );
                    })}
                    <div>
                        {
                            tagsArr && tagsArr.map((item, index) =>
                                <Tag color="magenta" key={index} onClick={this.handleClickTags}>{item}</Tag>)
                        }
                    </div>

                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
    handleClickTags = (e) => {
        //点击标签
        console.log(e.target.innerHTML, 'tags****************');
        let txt = e.target.innerHTML;
        let { tags } = this.state;
        //判断一下，判断当前添加的值是否存在
        let ind = tags.findIndex(item => item == txt);
        if (ind == -1) {
            tags.push(txt);
            this.setState({ tags })
        }
    }
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }

    handleInputChange(e) { //input改变的时候触发
        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }
    handleSelChange(value) { //点击select
        this.setState({
            role: value
        })
        console.log(value, 'select');
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = async e => {
        console.log(e);
        let { phone, card, address, name, role, followup, tags } = this.state;
        console.log(phone, card, address, name, role, followup, tags, '点击ok的时候');
        this.setState({
            visible: false,
        });
        let res = await httpAxios.post('/addlist', {
            phone,
            card,
            address,
            name,
            role,
            followup,
            label: tags.join(',')
        });
        console.log(res, '*************&');
        if (res.data.code == 1) {
            this.getlist(); //更新列表的数据
        }
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    componentDidMount() {
        this.getlist();
    }
    async getlist() {
        let res = await httpAxios.get('/list');
        console.log(res);
        if (res.data.code == 1) {
            this.setState({
                list: res.data.data,
                total: res.data.total
            })
        }
    }
    async handleChangePagination(page) {
        console.log(page);
        //请求下一页的数据
        let { current, pageSize } = page;
        //发送请求，请求下一页的数据  axios.get('/list?page=2&limit=5');
        let res = await httpAxios.get('/list?page=' + current + '&limit=' + pageSize);
        console.log(res, '下一页');
        if (res.data.code == 1) {
            this.setState({
                list: res.data.data
            })
        }
    }
}
