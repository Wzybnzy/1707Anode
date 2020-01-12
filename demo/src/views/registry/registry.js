import React, { Component } from 'react'

import { Form, Icon, Input, Button,  Select } from 'antd';
const { Option } = Select;

class Registry extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  state = {
    formLayout: 'horizontal',
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { formLayout } = this.state
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
        : null;
    return (

      <div className="registry">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item label="学号" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="学号"
              />,
            )}
          </Form.Item>
          <Form.Item label="学号" {...formItemLayout}>
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>


          <Form.Item label="Select" hasFeedback {...formItemLayout}>
            {getFieldDecorator('select', {
              rules: [{ required: true, message: 'Please select your country!' }],
            })(
              <Select placeholder="请选择身份">
                <Option value="1">讲师</Option>
                <Option value="2">学委</Option>
                <Option value="3">学生</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="Login">
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