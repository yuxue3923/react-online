import React, { Component } from 'react';
import {Form, Icon, Input, Button, Checkbox, } from 'antd';
import {Link} from 'react-router-dom'
import './Access.css'
const FormItem = Form.Item;
  class Access_child extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="divparent">
        <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox className="login-form-remember">记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Link to='/Account'><Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button></Link>
          {/* Or <a href="">register now!</a> */}
        </FormItem>
      </Form>
      </div>
      );
    }
  }
  const Access = Form.create()(Access_child);
  export default Access;