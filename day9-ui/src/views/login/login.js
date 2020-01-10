import React, { Component } from 'react'
import axios from 'axios'
import { Form, Icon, Input, Button, Select,message } from 'antd';
const { Option } = Select;
class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let {stu,pwd} = values;
                let res = await axios.post('/login',{stu,pwd});
                console.log(res);
                if(res.data.code == 1){
                     window.localStorage.setItem('users',JSON.stringify(res.data.data))
                    // window.localStorage.token = res.data.token;
                    // window.localStorage.uid = res.data.uid;
                    this.props.history.push('/index');
                } else {
                    message.info(res.data.mes,3)
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
                 

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <a>去注册</a>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;