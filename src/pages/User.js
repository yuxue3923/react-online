import React, { Component } from 'react';
import {Form, Icon, Input, Button, Radio,Avatar,Card,Row,Col,Modal} from 'antd';
import {Link} from 'react-router-dom'
import './User.css'
import { connect } from 'react-redux';
import $ from 'jquery';
import PropTypes from "prop-types"
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span:5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  class User extends React.Component {
    static contextTypes={
      router:PropTypes.object
    }
    constructor(props,context){
      super(props,context);
      this.state={
        email:"",
        username:"",
        phone_num:"",
        works:"",
        mark:"",
        download:"",
        visit:"",
        contribution:[],
      }
    }
      onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          sexy: e.target.value,
        });
      }
      Inputnick_name(e){
        this.setState({
          nick_name: e.target.value,
        });
      }
      Inputposition(e){
        this.setState({
          position: e.target.value,
        });
      }
      Inputcity(e){
        this.setState({
          city: e.target.value,
        });
      }
      Inputusername(e){
        this.setState({
         username: e.target.value,
        });
      }
      Inputphone_num(e){
        this.setState({
        phone_num: e.target.value,
        });
      }
      Inputdescription(e){
        this.setState({
        description: e.target.value,
        });
      }
      Inputemail(e){
        this.setState({
        email: e.target.value,
        });
      }
      Inputpasswd(e){
        this.setState({
        passwd: e.target.value,
        });
      }
      handleOK = (e) => {
        this.putaccountdata();
        this.putuserdata();
      }
      //put账户信息
      putuserdata(){
        const { login_info }=this.props;
        console.log('进入ajax');
        $.ajax({
          url: "http://localhost:3000/api/updatePersonalInfo",
          data:{
            "user_id":login_info.user_id,
            "nick_name":this.state.nick_name,
            "position":this.state.position,
            "city":this.state.city,
            "sexy":this.state.sexy,
            "description":this.state.description,
          },
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
          },
          type: "PUT",
          dataType: "json",
          async:false,
          success: function (data) {
            if (data.errorCode == 0) {
              console.log('PUT个人信息1111');
              Modal.success({
                title: '消息提示',
                content: '成功修改信息',
              });
             this.getdata();
             this.getuserdata();
            }
            else {   
              console.log('没有需要更新的个人信息');
              Modal.success({
                title: '消息提示',
                content: '没有需要更新的个人信息哟~',
              });
            }
          }.bind(this),
          error: function (xhr, status, err) {
          }.bind(this)
        });
      }
      //put账户信息
      putaccountdata(){
        const { login_info }=this.props;
        console.log('进入ajax');
        $.ajax({
          url: "http://localhost:3000/api/updateInfo",
          data:{
            "user_id":login_info.user_id,
            "email":this.state.email,
            "phone_num":this.state.phone_num,
            "passwd":this.state.passwd,
          },
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
          },
          type: "PUT",
          dataType: "json",
          async:false,
          success: function (data) {
            if (data.errorCode == 0) {
              console.log('PUT账户信息1111');
              Modal.success({
                title: '消息提示',
                content: '成功修改信息',
              });
             this.getdata();
             this.getuserdata();
            }
            else {   
              console.log('没有需要更新的信息');
              Modal.success({
                title: '消息提示',
                content: '没有需要更新的信息哟~',
              });
            }
          }.bind(this),
          error: function (xhr, status, err) {
          }.bind(this)
        });
      }
      //Token获取数据
      getdata() {
        const { login_info }=this.props;
        console.log(login_info.username);
        console.log('进入ajax');
        console.log(login_info.access_token);
        $.ajax({
          url: "http://localhost:3000/api/queryUserinfo",
          data:"username="+login_info.username,
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
          },
          type: "GET",
          dataType: "json",
          async:false,
          success: function (data) {
            if (data.errorCode == '0') {
              console.log('获取查询权限1111');
              console.log(data);
              console.log("userid:"+data.msg.user_id);
              this.setState({
                username:login_info.username,
                email:data.msg.email,
                phone_num:data.msg.phone_num,
                works:data.msg.works,
                mark:data.msg.mark,
                download:data.msg.download,
                visit:data.msg.visit,
                contribution:[data.msg.works,data.msg.download,data.msg.mark,data.msg.visit]
              });
            }
            else {   
              console.log('获取查询权限2222');
               
            }
          }.bind(this),
          error: function (xhr, status, err) {
          }.bind(this)
        });
      }
     //获取用户信息
     getuserdata() {
      const { login_info }=this.props;
      console.log('进入getuserdata ajax');
      console.log(login_info.access_token);
      $.ajax({
        url: "http://localhost:3000/api/getPersonalInfo",
        data:"user_id="+login_info.user_id,
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        type: "GET",
        dataType: "json",
        async:false,
        success: function (data) {
          if (data.errorCode == '1') {
            console.log('获取用户个人信息1111');
            console.log(data);
            this.setState({
              nick_name:data.msg.nick_name,
              position:data.msg.position,
              city:data.msg.city,
              sexy:data.msg.sexy,
              description:data.msg.description,
            });
          }
          else {   
            console.log('获取查询权限2222');
             
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }.bind(this)
      });
    }
      componentWillMount(){
        this.getdata();
        this.getuserdata();
      }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            // title: {
            //     text: '基础雷达图'
            // },
            tooltip: {},
            legend: {
                data: ['贡献领域', ]
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                   }
                },
                indicator: [
                   { name: 'works', max: 6500},
                   { name: 'download', max: 800},
                   { name: 'mark', max: 35000},
                   { name: 'visit', max: 20000},
                  //  { name: '研发课件', max: 52000},
                  //  { name: '涉猎范围', max: 25000}
                ]
            },
            series: [{
                name: '贡献领域',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : this.state.contribution,
                        name : '贡献领域'
                    },
                    //  {
                    //     value : [5000, 14000, 28000, 31000, 42000, 21000],
                    //     name : '实际开销（Actual Spending）'
                    // }
                ]
            }]
        });
    }
    render() {
      const { login_info }=this.props;
        const pageHeaderContent = (
            <Row gutter={16}>
              <Col span={2}>
              <Link to='/Account'><Avatar style={{width:70,height:70}}
                  size="large"
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                /></Link>
              </Col>
              <Col span={12}>
                <div className="head_one">早安，{this.state.nick_name}，祝你开心每一天！</div>
                <div className="head_two">{this.state.position} | {this.state.city}</div>
              </Col>
            </Row>
          );
      return (
         <div>
           <Card>
              {pageHeaderContent}
           </Card>
           <Row gutter={16}>
               <Col span={8}>
                  <Card title="贡献领域" style={{  height: 600 }}>
                    <div id="main" style={{ width: 400, height: 400 }}></div>
                  </Card>
               </Col>
               <Col span={8}>
                 <Card title="个人信息" style={{  height: 600 }}>
                    <div>
                    <Form >
                      <FormItem label="姓名" {...formItemLayout} >
                           {this.state.nick_name}
                      </FormItem>
                      <FormItem label="登录名"  {...formItemLayout}>
                           {this.state.username}
                      </FormItem>
                      <FormItem label="邮箱"  {...formItemLayout}>
                           {this.state.email}
                      </FormItem>
                      <FormItem label="联系电话" {...formItemLayout} >
                           {this.state.phone_num}
                      </FormItem>
                      <FormItem label="性别" {...formItemLayout} >
                           {this.state.sexy}
                      </FormItem>
                      <FormItem label="个性签名" {...formItemLayout} >
                           {this.state.description}
                      </FormItem>
                      <FormItem label="职位" {...formItemLayout} >
                           {this.state.position}
                      </FormItem>
                      <FormItem label="城市" {...formItemLayout} >
                           {this.state.city}
                      </FormItem>
                    </Form>
                    </div>
                  </Card>
               </Col>
               <Col span={8}>
               <Card title="修改信息" style={{  height: 600 }}>
                    <Row>
                    <Form >
                      <FormItem label="姓名" {...formItemLayout} >
                         <Input placeholder={this.state.nick_name} onChange={this.Inputnick_name.bind(this)}/> 
                      </FormItem>
                      <FormItem label="登录名"  {...formItemLayout}>
                         <Input placeholder={this.state.username} onChange={this.Inputusername.bind(this)}/>   
                      </FormItem>
                      <FormItem label="邮箱"  {...formItemLayout}>
                         <Input placeholder={this.state.email} onChange={this.Inputemail.bind(this)}/>   
                      </FormItem>
                      <FormItem label="联系电话" {...formItemLayout} >
                         <Input placeholder= {this.state.phone_num} onChange={this.Inputphone_num.bind(this)}/>
                      </FormItem>
                      <FormItem label="性别" {...formItemLayout} >
                      <RadioGroup onChange={this.onChange} value={this.state.sexy}>
                             <Radio value="男">男</Radio>
                             <Radio value="女">女</Radio>
                             <Radio value="secret">secret</Radio>
                      </RadioGroup>
                      </FormItem>
                      <FormItem label="个性签名" {...formItemLayout} >
                         <Input placeholder= {this.state.description} onChange={this.Inputdescription.bind(this)}/>
                      </FormItem>
                      <FormItem label="职位" {...formItemLayout} >
                         <Input placeholder= {this.state.position} onChange={this.Inputposition.bind(this)}/>
                      </FormItem>
                      <FormItem label="城市" {...formItemLayout} >
                         <Input placeholder= {this.state.city} onChange={this.Inputcity.bind(this)}/>
                      </FormItem>
                      <FormItem label="原始密码" {...formItemLayout}>
                         <Input type="password" />
                      </FormItem>
                      <FormItem label="设置密码" {...formItemLayout}>
                         <Input type="password" onChange={this.Inputpasswd.bind(this)} />
                      </FormItem>
                    </Form>
                    </Row>
                    <Row>
                        <Button type="primary" onClick={this.handleOK} style={{margin:'0px 0px 0px 100px'}}>确认修改</Button>
                    </Row>
                  </Card>
               </Col>
           </Row>
         </div>
      );
    }
  }
  const User_index=Form.create()(User);
  function  mapStateToProps(state) {
    return{
       login_info:state.reducer_login.login_info,
    };
  }
  function mapDispatchToProps(dispatch){
    return{
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(User_index);
