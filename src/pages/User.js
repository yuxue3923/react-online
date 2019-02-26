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
        value: 2,
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
          value: e.target.value,
        });
      }
      handleOK = (e) => {
        Modal.success({
          title: '消息提示',
          content: '成功修改信息',
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
      // getcontribution(){
      //   const contribution1=this.state.contribution; 
      //   contribution1.push(this.state.visit) ;
      //   contribution1.push(this.state.mark) ;
      //   console.log(contribution1);
      //   this.setState({
      //     contribution:contribution1
      //   });
      // }
      componentWillMount(){
        this.getdata();
      }
    componentDidMount() {
        // this.getdata();
        // this.getcontribution();
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
                <div className="head_one">早安，{login_info.username}，祝你开心每一天！</div>
                {/* <div className="head_two">交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div> */}
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
                      {/* <FormItem label="姓名" {...formItemLayout} >
                           曲丽丽
                      </FormItem> */}
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
                           女
                      </FormItem>
                      <FormItem label="个性签名" {...formItemLayout} >
                           无
                      </FormItem>
                    </Form>
                    </div>
                  </Card>
               </Col>
               <Col span={8}>
               <Card title="修改信息" style={{  height: 600 }}>
                    <Row>
                    <Form >
                      {/* <FormItem label="姓名" {...formItemLayout} >
                         <Input placeholder="曲丽丽"/> 
                      </FormItem> */}
                      <FormItem label="登录名"  {...formItemLayout}>
                         <Input placeholder={this.state.username}/>   
                      </FormItem>
                      <FormItem label="邮箱"  {...formItemLayout}>
                         <Input placeholder={this.state.email}/>   
                      </FormItem>
                      <FormItem label="联系电话" {...formItemLayout} >
                         <Input placeholder= {this.state.phone_num}/>
                      </FormItem>
                      <FormItem label="性别" {...formItemLayout} >
                      <RadioGroup onChange={this.onChange} value={this.state.value}>
                             <Radio value={1}>男</Radio>
                             <Radio value={2}>女</Radio>
                      </RadioGroup>
                      </FormItem>
                      <FormItem label="个性签名" {...formItemLayout} >
                         <Input placeholder="无"/>
                      </FormItem>
                      <FormItem label="原始密码" {...formItemLayout}>
                         <Input type="password" value="111111" />
                      </FormItem>
                      <FormItem label="设置密码" {...formItemLayout}>
                         <Input type="password"  />
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
