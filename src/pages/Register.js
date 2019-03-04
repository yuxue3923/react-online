import React, { Component } from 'react';
import {Form, Icon, Input, Button, Checkbox,message,Modal,Select } from 'antd';
import {Link} from 'react-router-dom'
import './Access.css'
import { connect } from 'react-redux';
import {localhost} from '../config'
import $ from 'jquery';
import PropTypes from "prop-types"
const FormItem = Form.Item;
const Option =Select.Option;
  class Register_child extends Component {
    static contextTypes={
      router:PropTypes.object
    }
    constructor(props,context){
      super(props,context);
      this.state={
        username:"",
        passwd:"",
        email:"",
        phone_num:"",
        role:"",
      }
    }
    changeUsername(e){
      let uname=e.target.value;
      this.setState({
        username:uname,
      });
    }
    changePassword(e){
      let pword=e.target.value;
      this.setState({
        passwd:pword,
      });
    }
    changeEmail(e){
      let email=e.target.value;
      this.setState({
        email:email,
      });
    }
    changePhone_num(e){
      let phone_num=e.target.value;
      this.setState({
        phone_num:phone_num,
      });
    }
    changeRole(value){
      let role=value;
      this.setState({
        role:role,
      });
    }
    handleClick(){
      if (this.state.username===""||this.state.username===null
         ||this.state.passwd===""||this.state.passwd===null
         ||this.state.email===""||this.state.email===null
         ||this.state.phone_num===""||this.state.phone_num===null
         ||this.state.role===""||this.state.role===null) {
        message.error("注册信息不能为空哟~");
      } else {
        console.log('进入ajax');
        $.ajax({
            url: "http://"+localhost+":3000/api/register",
            type: "POST",
            dataType: "json",
            data:"username="+this.state.username+"&passwd="+this.state.passwd+"&email="+this.state.email+"&phone_num="+this.state.phone_num+"&role="+this.state.role,
            success: function (data) {
                if (data.errorCode == 0) {
                   console.log(data);
                    console.log('注册成功');
                    Modal.success({
                      title: '消息提示',
                      content: '成功注册账号！',
                    });
                    this.context.router.history.push("/");
                }
                else {
                   console.log(data);
                    message.error("注册失败，用户名重复~");
                }
            }.bind(this),
            error: function (xhr, status, err) {
            }.bind(this)
        });
        
      }
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="divparent">
        <Form className="login-form">
        <FormItem>
            <Input onChange={this.changeUsername.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
        </FormItem>
        <FormItem>
            <Input onChange={this.changePassword.bind(this)} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="check-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="再次确认密码" />
        </FormItem>
        <FormItem>
            <Input onChange={this.changeEmail.bind(this)} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
        </FormItem>
        <FormItem>
            <Input onChange={this.changePhone_num.bind(this)} prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="电话" />
        </FormItem>
        <FormItem>
            <Select onChange={this.changeRole.bind(this)} prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="角色">
            <Option value="教师">教师</Option>
            <Option value="学生">学生</Option>
            </Select>
            {/* <Input onChange={this.changeRole.bind(this)} prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="角色" /> */}
        </FormItem>
        <FormItem>
          <Button onClick={this.handleClick.bind(this)} type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
          <a href="/">使用已有账户登录</a>
        </FormItem>
      </Form>
      </div>
      );
    }
  }
  const Register = Form.create()(Register_child);
  export default Register;