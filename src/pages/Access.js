import React, { Component } from 'react';
import {Form, Icon, Input, Button,message } from 'antd';
import {Link} from 'react-router-dom'
import './Access.css'
import { connect } from 'react-redux';
import $ from 'jquery';
import PropTypes from "prop-types"
import {localhost} from '../config'
const FormItem = Form.Item;
  class Access_child extends Component {
    static contextTypes={
      router:PropTypes.object
    }
    constructor(props,context){
      super(props,context);
      this.state={
        username:"",
        password:"",
        accessdata:[],
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
        password:pword,
      });
    }
    handleClick(){
      const {setLoginState} = this.props;
      if (this.state.username===""||this.state.username===null||this.state.password===""||this.state.password===null) {
        message.error("用户名或密码不能为空");
      } else {
        console.log('进入ajax');
        $.ajax({
            url: "http://"+localhost+":3000/api/oauth/token",
            type: "POST",
            sync:"true",
            dataType: "json",
            data:"grant_type=password&"+"username="+this.state.username+"&password="+this.state.password+"&client_id=A10&client_secret=xiaomi",
            success: function (data) {
                if (data.error === "server_error") {
                    console.log("没有登录权限");
                }
                else {
                    console.log('登录成功');
                    console.log(data);
                    console.log(data.access_token);
                    setLoginState({
                      type:'LoginSuccess',
                      payload:{
                        username:this.state.username,
                        access_token:data.access_token,
                        user_id:data.user_id,
                      }
                    });
                    this.context.router.history.push("/Account");
                }
            }.bind(this),
            error: function (xhr, status, err) {
              message.error("用户名或密码错误");
            }
        });
        
      }
    }
    render() {
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
            <Button onClick={this.handleClick.bind(this)} type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <Link to='/Register'><a >注册账户!</a></Link>
          </FormItem>
      </Form>
      </div>
      );
    }
  }
  const Access = Form.create()(Access_child);
  function  mapStateToProps(state) {
    return{
        
    };
  }
  function mapDispatchToProps(dispatch){
    return{
       setLoginState: (state) => dispatch(state),
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Access);