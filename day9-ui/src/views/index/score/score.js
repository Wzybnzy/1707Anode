import React, { Component } from 'react'
import { Input, Button, Table, Modal, Select } from 'antd';
import httpAxios from '../../../utils/request'
const { Option } = Select;


export default class Score extends Component {
    state = {
        data: [],
        list: [], //select的值
        visible: false, //弹框显示隐藏
        skill: 0, //技能成绩
        theory: 0, //理论成绩
        selid: null, //select选中值
        isEdit:false  //是否是编辑
    }
    showModal = async () => { //显示弹框，点击添加按钮
        //获取还没有添加成绩的学生
        this.setState({
            visible: true,
            theory: 0,
            skill: 0,
            list: [],
            isEdit:false,
            selid: null
        });
        console.log(this.state,'tianjia');
        let res = await httpAxios.get('/user/student');
        console.log(res)
        if (res.data.code == 1) {
            this.setState({
                list: res.data.data
            })
        }

    };

    handleOk = async e => { //点击确定
        console.log(e);
        let { theory, skill, list, selid,isEdit } = this.state;
        console.log(theory, skill,selid,'&&&&&&&&&&&&&&&');
        let obj = list.find(item => item.id == selid);
        console.log(obj, 'obj^^^^^^^^^^^^^^');
        if (isEdit) { //编辑
            console.log('编辑');

            let res =await httpAxios.post('/scores/update',{
                theory,
                skill,
                id:selid,
                name:obj.name
            });
            console.log(res);
            this.getlist()


        } else { //添加
            //添加
            let res = await httpAxios.post('/scores/add', {
                name: obj.name,
                stu: obj.stu,
                theory,
                skill
            });
            console.log(res)
            if (res.data.code == 1) { //添加成功
                this.getlist();
            }
        }


        this.setState({
            visible: false,
        });
    };

    handleCancel = e => { //点击取消
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    async componentDidMount() {
        this.getlist();
    }
    async getlist() {
        let res = await httpAxios.get('/scores/list');
        console.log(res);
        if (res.data.code == 1) {
            this.setState({ data: res.data.data })
        }
    }
    handleChange(e) { //select发生改变的时候
        console.log('select %%%%%%%%%%%%%%%', e)
        this.setState({ selid: e })
    }
    handleInput(e) { //input发生改变的时候
        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }
    handleEdit(item) { //点击编辑
        console.log('编辑', item);
        this.setState({
            visible: true,
            theory: item.theory,
            skill: item.skill,
            isEdit:true,
            list: [
                { name: item.name, id: item.id }
            ],
            selid: item.id
        });
    }
    async handleDel(id){ //删除
        console.log(id,'删除');
        let res = await httpAxios.get('/scores/del?id='+id);
        // let res = await httpAxios.get('/scores/list?search='+search);
        console.log(res);
        this.getlist();
    }
    render() {
        let { data, skill, theory, list, selid } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                render: (text, item) => <a>{item.id}</a>,
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
                        <Button type="primary" onClick={this.handleEdit.bind(this, record)}>编辑</Button>
                        <Button type="danger" onClick={this.handleDel.bind(this,record.id)}>删除</Button>
                    </div>
                ),
            },
        ];
        return (
            <div>
                <h3>成绩管理</h3>
                <header className="score_header">
                    <div>
                        <span>姓名：</span>
                        <Input placeholder="Basic usage" />
                        <Button type="primary">搜索</Button>
                    </div>
                    <Button type="primary" onClick={this.showModal}>添加</Button>
                </header>

                <Table columns={columns} dataSource={data} />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Select value={selid} style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                        {
                            list && list.map((item, index) =>
                                <Option value={item.id} key={item.id}>{item.name}</Option>)
                        }
                    </Select>
                    <Input placeholder="技能成绩" value={skill} name="skill" onChange={this.handleInput.bind(this)} />
                    <Input placeholder="理论成绩" value={theory} name="theory" onChange={this.handleInput.bind(this)} />
                </Modal>
            </div>
        )
    }
}
