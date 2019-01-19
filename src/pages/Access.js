import React, { Component } from 'react';
import {Form, Icon, Input, Button, Checkbox,message } from 'antd';
import {Link} from 'react-router-dom'
import './Access.css'
import { connect } from 'react-redux';
import $ from 'jquery';
import PropTypes from "prop-types"
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
        setLoginState({
          type:'LoginSuccess',
          payload:this.state.username,
        });
        this.context.router.history.push("/Account");
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
           <a href="/Register">注册账户!</a>
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