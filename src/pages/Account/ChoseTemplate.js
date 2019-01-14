import React, { Component } from 'react';
import {Form, Icon, Input, Button, Checkbox,Col,Row,Card } from 'antd';
import {Link} from 'react-router-dom'
const {Meta} = Card;

  class ChoseTemplate extends Component {
    
    render() {
        const coursetemplate_one = (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                    <Card
                      style={{ width:200 ,height:280}}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" height="154"
                        />
                      }
                    >
                      <Row>
                        <Col span={24}>
                        <Meta
                            title="课件模版"
                            description="适用于科技类、教育类"
                         />
                        </Col>
                      </Row>
                      <br/>
                      <Row>
                        <Col span={18}>
                            <Link to='/Tempreview'><Icon type="eye"/> 预览模版</Link>
                        </Col>
                      </Row>
                    </Card>
                </Col>
              </Row>
            </div>
          );
          const coursetemplate_two = (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                    <Card
                      style={{ width:200 ,height:280}}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png" height="154"
                        />
                      }
                    >
                      <Row>
                        <Col span={24}>
                        <Meta
                            title="课件模版"
                            description="适用于动画、古风类"
                         />
                        </Col>
                      </Row>
                      <br/>
                      <Row>
                        <Col span={18}>
                            <Link to='/Tempreview'><Icon type="eye"/> 预览模版</Link>
                        </Col>
                      </Row>
                    </Card>
                </Col>
              </Row>
            </div>
          );
          const coursetemplate_three = (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                    <Card
                      style={{ width:200 ,height:280}}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png" height="154"
                        />
                      }
                    >
                      <Row>
                        <Col span={24}>
                        <Meta
                            title="课件模版"
                            description="适用于新闻类、宣传类"
                         />
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col span={18}>
                            <Link to='/Tempreview'><Icon type="eye"/> 预览模版</Link>
                        </Col>
                      </Row>
                    </Card>
                </Col>
              </Row>
            </div>
          );
          const coursetemplate = (
            <div>
              <Row gutter={16}>
                <Col span={8}>{coursetemplate_one}</Col>
                <Col span={8}>{coursetemplate_two}</Col>
                <Col span={8}>{coursetemplate_three}</Col>           
              </Row>
            </div>
          );
      return (
        <div> 
            {coursetemplate}
        </div>
      );
    }
  }

  export default ChoseTemplate;