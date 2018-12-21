import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Card, Row,Input,Col, Tag,Button,Drawer,Avatar, Badge,Icon,Dropdown,Popover} from 'antd';
import '../App.css'
import './Account.css'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const {Meta} = Card;
const suffix=<Icon type="close-circle"/>

  class Account extends Component {
    // state = {
    //     current: 'mail',
    //   }
    // handleClick = (e) => {
    //     console.log('click ', e);
    //     this.setState({
    //       current: e.key,
    //     });
    //   }
    render() {
      return (
        <Layout style={{height:'100%'}}>
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
        {/* <nav className="mid-nav">
            <Menu
            onClick={this.handleClick}
             selectedKeys={[this.state.current]}
              
                mode="horizontal"
            >
            <Menu.Item key="mail">
            <Icon type="mail" />Navigation One
            </Menu.Item>
            <Menu.Item key="app">
            <Icon type="appstore" />Navigation Two
            </Menu.Item>
            </Menu>
        </nav> */}
        <Content className="page_body">
        {/* <div className="title">My Drive</div>
        <div className="controller"><Icon type="folder-add" /><Icon type="swap" /><Icon type="ordered-list" /></div> */}
        <div className="Content">
        <Row  gutter={40}>
          <Col span={6}>
           <Card
             style={{ width:200 }}
             cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
             actions={[<Icon type="setting" />, <Link to='/APP'><Icon type="edit" /></Link>, <Icon type="ellipsis" />]}
           >
           <Meta
              avatar={<Avatar style={{ backgroundColor: '#fde3cf' }}> <Icon type='tags'/></Avatar>}
              title="编辑中"
              description="2018.12.18"
           />
           </Card>
          </Col>
          <Col span={6}>
           <Card
             style={{ width: 200 }}
             cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
             actions={[<Icon type="setting" />, <Link to='/APP'><Icon type="edit" /></Link>, <Icon type="ellipsis" />]}
           >
           <Meta
              avatar={<Avatar style={{ backgroundColor: '#fde3cf' }}> <Icon type='tags'/></Avatar>}
              title="已完成"
              description="2018.11.5"
           />
           </Card>
          </Col>
          <Col span={6}>
           <Card
             style={{ width: 200 }}
             cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
             actions={[<Icon type="setting" />, <Link to='/APP'><Icon type="edit" /></Link>, <Icon type="ellipsis" />]}
           >
           <Meta
              avatar={<Avatar style={{ backgroundColor: '#fde3cf' }}> <Icon type='tags'/></Avatar>}
              title="已完成"
              description="2018.11.7"
           />
           </Card>
          </Col>
          <Col span={6}>
           <Card
             style={{ width: 200 }}
             cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
             actions={[<Icon type="setting" />, <Link to='/APP'><Icon type="edit" /></Link>, <Icon type="ellipsis" />]}
           >
           <Meta
              avatar={<Avatar style={{ backgroundColor: '#fde3cf' }}> <Icon type='tags'/></Avatar>}
              title="已完成"
              description="2018.10.06"
           />
           </Card>
          </Col> 
        </Row>
        </div>
        </Content>
        </Layout>
      );
    }
  }

  export default Account;