import React, { Component } from 'react';
import {Form, Icon, Input, Button, Checkbox,Avatar ,Card,Row,Col} from 'antd';
import {Link} from 'react-router-dom'
import './User.css'


  class User extends Component {
    render() {
        const pageHeaderContent = (
            <Row gutter={16}>
              <Col span={2}>
                <Avatar style={{width:70,height:70}}
                  size="large"
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                />
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
                  <Card title="研究领域">
                    
                  </Card>
               </Col>
               <Col span={8}>
               </Col>
               <Col span={8}>
               </Col>
           </Row>
         </div>
      );
    }
  }
  export default User;