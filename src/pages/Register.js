import React, { Component } from 'react';
import {Form, Icon, Input, Button, Checkbox,Modal } from 'antd';
import {Link} from 'react-router-dom'
import './Access.css'
const FormItem = Form.Item;
  class Register_child extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    remind = () => {
        Modal.success({
          title: '消息提示',
          content: '成功注册账号！',
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
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请确认密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="再次确认" />
          )}
        </FormItem>
        <FormItem>
          <Link to='/'><Button onClick={this.remind} type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button></Link>
          <a href="/">使用已有账户登录</a>
        </FormItem>
      </Form>
      </div>
      );
    }
  }
  const Register = Form.create()(Register_child);
  export default Register;