import React, { Component } from 'react';
import {   Layout, Pagination,Menu,Card, Icon,Row, Col,Carousel,Divider,Avatar,Drawer,Input,Upload, message,Button,Tabs } from 'antd';
import {Link} from 'react-router-dom'
import './sider.css';
const TabPane = Tabs.TabPane;
const { Meta } = Card;
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  function callback(key) {
    console.log(key);
  }
  class sider extends Component {
    render() {
        const cardBasic_viedo = (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                    <Card
                      style={{ width:220 ,height:230}}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                    >
                      <Row>
                        <Col span={18}>
                          <Meta  title="解方程应用.mp4" />
                        </Col>
                        <Col span={6}>
                          <Icon type="star-o" /><span style={{fontSize:'1px'}}> 收藏</span>
                      </Col>
                      </Row>
                      <br />
                      <Row >
                        <Col span={7}>
                          <Icon type="like-o" /><span style={{fontSize:'1px'}}>1718</span>
                      </Col>
                        <Col span={8}><span style={{fontSize:'1px'}}>积分：49</span></Col>
                        <Col span={9}><span style={{fontSize:'1px'}}>引用数：89</span></Col>
                      </Row>
                    </Card>
                </Col>
              </Row>
            </div>
          );
          const cardBasic_pdf = (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                    <Card
                      style={{ width:220 ,height:230}}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                    >
                      <Row>
                        <Col span={18}>
                          <Meta  title="解方程应用.pdf" />
                        </Col>
                        <Col span={6}>
                          <Icon type="star-o" /><span style={{fontSize:'1px'}}> 收藏</span>
                      </Col>
                      </Row>
                      <br />
                      <Row >
                        <Col span={7}>
                          <Icon type="like-o" /><span style={{fontSize:'1px'}}>1718</span>
                      </Col>
                        <Col span={8}><span style={{fontSize:'1px'}}>积分：49</span></Col>
                        <Col span={9}><span style={{fontSize:'1px'}}>引用数：89</span></Col>
                      </Row>
                    </Card>
                </Col>
              </Row>
            </div>
          );
          const cardBasic_word = (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                    <Card
                      style={{ width:220 ,height:230}}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                    >
                      <Row>
                        <Col span={18}>
                          <Meta  title="解方程应用.docx" />
                        </Col>
                        <Col span={6}>
                          <Icon type="star-o" /><span style={{fontSize:'1px'}}> 收藏</span>
                      </Col>
                      </Row>
                      <br />
                      <Row >
                        <Col span={7}>
                          <Icon type="like-o" /><span style={{fontSize:'1px'}}>1718</span>
                      </Col>
                        <Col span={8}><span style={{fontSize:'1px'}}>积分：49</span></Col>
                        <Col span={9}><span style={{fontSize:'1px'}}>引用数：89</span></Col>
                      </Row>
                    </Card>
                </Col>
              </Row>
            </div>
          );
         const cardList_viedo = (
            <div className='cardstyle'>
              <Row>
                <Col span={8}>{cardBasic_viedo}</Col>
                <Col span={8}>{cardBasic_viedo}</Col>
                {/* {/* <Col span={6}>{cardBasic_viedo}</Col> */}
                <Col span={8}>{cardBasic_viedo}</Col> 
              </Row>
              <Row>
                <Col span={8}>{cardBasic_viedo}</Col>
                <Col span={8}>{cardBasic_viedo}</Col>
                {/* {/* <Col span={6}>{cardBasic_viedo}</Col> */}
                <Col span={8}>{cardBasic_viedo}</Col> 
              </Row>
              <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
                <Pagination  defaultCurrent={1} total={500} />
                {/* <Pagination showQuickJumper defaultCurrent={1} total={500} /> */}
              </Row>
            </div>
          );
          const cardList_document = (
            <div className='cardstyle'>
              <Row>
                <Col span={8}>{cardBasic_pdf}</Col>
                <Col span={8}>{cardBasic_pdf}</Col>
                {/* {/* <Col span={6}>{cardBasic_pdf}</Col> */}
                <Col span={8}>{cardBasic_pdf}</Col>
              </Row>
              <Row>
                <Col span={8}>{cardBasic_word}</Col>
                <Col span={8}>{cardBasic_word}</Col>
                {/* {/* <Col span={6}>{cardBasic_word}</Col> */}
                <Col span={8}>{cardBasic_word}</Col>
              </Row>
              <Row style={{  margin: '8px 8px 8px 0',textAlign: 'center'  }}>
                <Pagination  defaultCurrent={1} total={500} />
              </Row>
              </div>
          );
      return (
          <div className='divContent'>
             
             <Input className='inputstyle' placeholder="输入搜索资源关键字" />
             
             
             <Upload {...props}>
                  <Button>
                     <Icon type="upload" /> 上传本地资源
                  </Button>
              </Upload>
              
              <Tabs defaultActiveKey="2" onChange={callback} >
                  <TabPane tab="视频" key="1">{cardList_viedo}</TabPane>
                  <TabPane tab="图片" key="2">{cardList_viedo}</TabPane>
                  <TabPane tab="文本" key="3">{cardList_document}</TabPane>
              </Tabs>
              </div>
      );
    }
  }

  export default sider;