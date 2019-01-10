import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Tabs, Card, Row,Input,Col,Avatar, Icon,Form,Pagination,Select,} from 'antd';

import TagSelect from '../../components/TagSelect';
import '../../App.css'
import './Account.css'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1006980_or3kowafoh.js',
});
const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const TabPane = Tabs.TabPane;
const { Header, Content } = Layout;
const {Meta} = Card;
const suffix=<Icon type="close-circle"/>
const FormItem = Form.Item;
  class Account extends Component {
    
    render() {
      const cardBasic_one = (
        <div>
          <Row gutter={16}>
            <Col span={8}>
                <Card
                  style={{ width:250 ,height:300}}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" height="154"
                    />
                  }
                >
                  <Row>
                    <Col span={18}>
                    <Meta
                        title="React"
                        description="React 可以非常轻松地创建用户交互界面。"
                     />
                    </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col span={4}>
                    <Link to='/APP'><IconFont type="icon-edit"/></Link>
                  </Col>
                    <Col span={8}><IconFont type="icon-xin"/></Col>
                    <Col span={12}><IconFont type="icon-icon-test"/><IconFont type="icon-icon-test2"/><IconFont type="icon-icon-test1"/><IconFont type="icon-icon-test-copy"/></Col>
                  </Row>
                </Card>
            </Col>
          </Row>
        </div>
      );
      const cardBasic_two = (
        <div>
          <Row gutter={16}>
            <Col span={8}>
                <Card
                  style={{ width:250 ,height:300}}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" height="154"
                    />
                  }
                >
                  <Row>
                    <Col span={18}>
                    <Meta
                        title="React"
                        description="React 可以非常轻松地创建用户交互界面。"
                     />
                    </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col span={4}>
                    <Link to='/APP'><IconFont type="icon-edit"/></Link>
                  </Col>
                    <Col span={8}><IconFont type="icon-xin"/></Col>
                    <Col span={12}><IconFont type="icon-icon-test"/><IconFont type="icon-icon-test2"/><IconFont type="icon-icon-test1"/><IconFont type="icon-icon-test-copy"/></Col>
                  </Row>
                </Card>
            </Col>
          </Row>
        </div>
      );
      const cardBasic_three = (
        <div>
          <Row gutter={16}>
            <Col span={8}>
                <Card
                  style={{ width:250 ,height:300}}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png" height="154"
                    />
                  }
                >
                  <Row>
                    <Col span={18}>
                    <Meta
                        title="React"
                        description="React 可以非常轻松地创建用户交互界面。"
                     />
                    </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col span={4}>
                    <Link to='/APP'><IconFont type="icon-edit"/></Link>
                  </Col>
                    <Col span={8}><IconFont type="icon-xin"/></Col>
                    <Col span={12}><IconFont type="icon-icon-test"/><IconFont type="icon-icon-test2"/><IconFont type="icon-icon-test1"/><IconFont type="icon-icon-test-copy"/></Col>
                  </Row>
                </Card>
            </Col>
          </Row>
        </div>
      );
      const cardBasic_four = (
        <div>
          <Row gutter={16}>
            <Col span={8}>
                <Card
                  style={{ width:250 ,height:300}}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png" height="154"
                    />
                  }
                >
                  <Row>
                    <Col span={18}>
                    <Meta
                        title="React"
                        description="React 可以非常轻松地创建用户交互界面。"
                     />
                    </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col span={4}>
                    <Link to='/APP'><IconFont type="icon-edit"/></Link>
                  </Col>
                    <Col span={8}><IconFont type="icon-xin"/></Col>
                    <Col span={12}><IconFont type="icon-icon-test"/><IconFont type="icon-icon-test2"/><IconFont type="icon-icon-test1"/><IconFont type="icon-icon-test-copy"/></Col>
                  </Row>
                </Card>
            </Col>
          </Row>
        </div>
      );
      const cardBasic_creat = (
        <div>
                <Card
                  className="cardparent"
                >
                  <Row className="cardself" >
                    <Link to='/Createcourse'><p style={{fontSize:'35px'}} ><IconFont type="icon-jia" /></p></Link>
                    <p>创建新课件</p>
                  </Row>
                </Card>
        </div>
      );

      const cardList_viedo = (
        <div>
          <Row style={{ margin: '8px 8px 8px 0'}}>
            <Col span={6}>{cardBasic_one}</Col>
            <Col span={6}>{cardBasic_four}</Col>
            <Col span={6}>{cardBasic_two}</Col>
            <Col span={6}>{cardBasic_three}</Col> 
          </Row>
          <Row style={{ margin: '8px 8px 8px 0'}}>
            <Col span={6}>{cardBasic_two}</Col>
            <Col span={6}>{cardBasic_one}</Col>
            <Col span={6}>{cardBasic_three}</Col>
            <Col span={6}>{cardBasic_four}</Col> 
          </Row>
          <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
            <Pagination  defaultCurrent={1} total={500} />
            {/* <Pagination showQuickJumper defaultCurrent={1} total={500} /> */}
          </Row>
        </div>
      );
      const cardList_course = (
        <div>
          <Row style={{ margin: '8px 8px 8px 0'}}>
            <Col span={6}>{cardBasic_creat}</Col>
            <Col span={6}>{cardBasic_four}</Col>
            <Col span={6}>{cardBasic_two}</Col>
            <Col span={6}>{cardBasic_three}</Col> 
          </Row>
          <Row style={{ margin: '8px 8px 8px 0'}}>
            <Col span={6}>{cardBasic_two}</Col>
            <Col span={6}>{cardBasic_one}</Col>
            <Col span={6}>{cardBasic_three}</Col>
            <Col span={6}>{cardBasic_four}</Col> 
          </Row>
          <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
            <Pagination  defaultCurrent={1} total={500} />
            {/* <Pagination showQuickJumper defaultCurrent={1} total={500} /> */}
          </Row>
        </div>
      );
      const mycourse_ground=(
        <div style={{ margin: '8px 8px 8px 0'}}>
        <Card bordered={false}>
          <Form layout="inline" style={{ paddingBottom: 11 }}>
              <Row gutter={16}>
              <Col span={5}>                  
                  <Select defaultValue="1" onChange={handleChange} style={{width:'100%'}}>
                     <Option value="1">我创建的课件</Option>
                    <Option value="2"> 我收藏的课件</Option>
                 </Select>                  
                </Col>
                <Col span={5}>                  
                  <Select defaultValue="1" onChange={handleChange} style={{width:'100%'}}>
                     <Option value="1">按创建时间降序</Option>
                    <Option value="2"> 按创建时间升序</Option>
                    <Option value="3">按修改时间降序</Option>
                    <Option value="4"> 按修改时间升序</Option>
                 </Select>                  
                </Col>
                <Col span={5}>                  
                  <Select defaultValue="1" onChange={handleChange} style={{width:'100%'}}>
                     <Option value="1">语文</Option>
                    <Option value="2"> 数学</Option>
                    <Option value="3">英语</Option>
                    <Option value="4"> 物理</Option>
                    <Option value="5">化学</Option>
                    <Option value="6">生物</Option>
                 </Select>                  
                </Col>
              </Row>
          </Form>
        </Card>
        {cardList_course}
        </div>
      );

      const course_ground=(
        <div style={{ margin: '8px 8px 8px 0'}}>
        <Card bordered={false}>
          <Form layout="inline" style={{ paddingBottom: 11 }}>
              <FormItem label="K12教育">
                  <TagSelect  expandable>
                    <TagSelect.Option value="cat2">语文</TagSelect.Option>
                    <TagSelect.Option value="cat3">数学</TagSelect.Option>
                    <TagSelect.Option value="cat4">英语</TagSelect.Option>
                    <TagSelect.Option value="cat5">物理</TagSelect.Option>
                    <TagSelect.Option value="cat6">化学</TagSelect.Option>
                    <TagSelect.Option value="cat7">生物</TagSelect.Option>
                    <TagSelect.Option value="cat8">政治</TagSelect.Option>
                    <TagSelect.Option value="cat9">历史</TagSelect.Option>
                    <TagSelect.Option value="cat10">体育</TagSelect.Option>
                    <TagSelect.Option value="cat11">艺术</TagSelect.Option>
                  </TagSelect>
              </FormItem>
              <FormItem label="IT教育">
                  <TagSelect  expandable>
                    <TagSelect.Option value="cat2">前端</TagSelect.Option>
                    <TagSelect.Option value="cat3">小程序</TagSelect.Option>
                    <TagSelect.Option value="cat4">区块链</TagSelect.Option>
                    <TagSelect.Option value="cat5">人工智能</TagSelect.Option>
                    <TagSelect.Option value="cat6">云计算</TagSelect.Option>
                    <TagSelect.Option value="cat7">大数据</TagSelect.Option>
                    <TagSelect.Option value="cat8">运维</TagSelect.Option>
                    <TagSelect.Option value="cat9">测试</TagSelect.Option>
                    <TagSelect.Option value="cat10">数据库</TagSelect.Option>
                    <TagSelect.Option value="cat11">UI设计</TagSelect.Option>
                  </TagSelect>
              </FormItem>
              <FormItem label="百科知识">
                  <TagSelect  expandable>
                    <TagSelect.Option value="cat2">建筑</TagSelect.Option>
                    <TagSelect.Option value="cat3">艺术</TagSelect.Option>
                    <TagSelect.Option value="cat4">心理</TagSelect.Option>
                    <TagSelect.Option value="cat5">宗教</TagSelect.Option>
                    <TagSelect.Option value="cat6">医学健康</TagSelect.Option>
                    <TagSelect.Option value="cat7">商业管理</TagSelect.Option>
                    <TagSelect.Option value="cat8">经济</TagSelect.Option>
                    <TagSelect.Option value="cat9">金融</TagSelect.Option>
                    <TagSelect.Option value="cat10">法律</TagSelect.Option>
                    <TagSelect.Option value="cat11">伦理</TagSelect.Option>
                  </TagSelect>
              </FormItem>
          </Form>
        </Card>
        {cardList_viedo}
        </div>
      );

      return (
        <Layout style={{height:'100%',width:'100%'}}>
        <Header className='top-navigation' style={{height:'8.2%'}}>
        {/* <div className="logo" /> */}
        <div className="search">
        <Input 
        size='large'
        placeholder="搜索课件标题"
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
      />
     
        </div>
        <div className='flowbar-account'><span style={{padding:10}}>用户名</span><Avatar style={{ backgroundColor:'#f56a00', verticalAlign: 'middle' }} size={50}>U</Avatar>
        </div>
         
       
     
        </Header>
        <Card bordered={false}>
            <Tabs defaultActiveKey="courseground" size="large">
              <TabPane tab="课件广场" key="courseground">
              {course_ground}
              </TabPane>
              <TabPane tab="我的课件" key="mycourse">
                {mycourse_ground}
              </TabPane>
            </Tabs>
          </Card>
       

        </Layout>
      );
    }
  }

  export default Account;