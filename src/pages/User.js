import React, { Component } from 'react';
import {Form, Icon, Input, Button, Radio,Avatar,Card,Row,Col,Modal} from 'antd';
import {Link} from 'react-router-dom'
import './User.css'
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
  class User extends Component {
    state = {
        value: 2,
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
                   { name: '制作课件', max: 6500},
                   { name: '协同课件', max: 16000},
                   { name: '发布课件', max: 30000},
                   { name: '分享课件', max: 38000},
                   { name: '研发课件', max: 52000},
                   { name: '涉猎范围', max: 25000}
                ]
            },
            series: [{
                name: '贡献领域',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : [4300, 10000, 28000, 35000, 50000, 19000],
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
        const pageHeaderContent = (
            <Row gutter={16}>
              <Col span={2}>
              <Link to='/Account'><Avatar style={{width:70,height:70}}
                  size="large"
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                /></Link>
              </Col>
              <Col span={12}>
                <div className="head_one">早安，曲丽丽，祝你开心每一天！</div>
                <div className="head_two">交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
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
                           曲丽丽
                      </FormItem>
                      <FormItem label="登录名"  {...formItemLayout}>
                           千与木夕
                      </FormItem>
                      <FormItem label="联系电话" {...formItemLayout} >
                           15555778909
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
                      <FormItem label="姓名" {...formItemLayout} >
                         <Input placeholder="曲丽丽"/> 
                      </FormItem>
                      <FormItem label="登录名"  {...formItemLayout}>
                         <Input placeholder="千与木夕"/>   
                      </FormItem>
                      <FormItem label="联系电话" {...formItemLayout} >
                         <Input placeholder="15555778909"/>
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
  export default User;