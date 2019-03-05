import React, { Component } from 'react';
import {Icon, Button,Col,Row,Card ,Modal} from 'antd';
import {Link} from 'react-router-dom'
import './Account.css'
const {Meta} = Card;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1015305_dn6cbev91qk.js',
  });
  class ChoseTemplate extends Component {
    state = { 
        visible: false ,

      }
    //Modal事件
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
    render() {
        const coursetemplate_one = (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                    <Card
                      style={{ width:200 ,height:280}}
                      cover={
                        <img onClick={this.showModal}
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
                        <img onClick={this.showModal}
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
                          <div className="parent" onClick={this.showModal}>
                            <div className="self">
                            <IconFont  style={{ fontSize:"50px"}} type="icon-kongbaiye" />
                            </div>
                          </div>
                      }
                    >
                      <Row>
                        <Col span={24}>
                        <Meta
                            title="空白模版"
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
            <Modal
              title="是否选择该模版"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
            >
             <p className="right">
                <Button key="return" onClick={this.handleCancel}>取消</Button>
                <Link to='/Createcourse'><Button key="next" type="primary"> 确定 </Button></Link>
             </p>
            </Modal> 
            {coursetemplate}
        </div>
      );
    }
  }

  export default ChoseTemplate;