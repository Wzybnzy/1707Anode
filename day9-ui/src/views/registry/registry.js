import React, { Component } from 'react'
import axios from 'axios'
import { Form, Icon, Input, Button, Select } from 'antd';
const { Option } = Select;
class Registry extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let {stu,pwd,name,role} = values;
                let res = await axios.post('/registry',{stu,pwd,name,role});
                console.log(res);
                if(res.data.code == 1){
                    this.props.history.push('/login');
                }
            }
        });
    };
    state = {
        formLayout: 'horizontal'
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        return (
            <div className="wrapper">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="学号" {...formItemLayout}>
                        {getFieldDecorator('stu', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入学号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="密码" {...formItemLayout}>
                        {getFieldDecorator('pwd', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="姓名" {...formItemLayout}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                placeholder="请输入姓名"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="Select" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: 'Please select your country!' }],
                        })(
                            <Select placeholder="Please select a country">
                                <Option value="1">讲师</Option>
                                <Option value="2">学委</Option>
                                <Option value="3">学生</Option>
                            </Select>,
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Registry);

export default WrappedNormalLoginForm;