import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Card, Input, Tag,Button,Drawer,Avatar, Badge,Icon,Dropdown,Popover} from 'antd';
import '../App.css'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const {Meta} = Card;
const suffix=<Icon type="close-circle"/>

  class Account extends Component {
    state = {
        current: 'mail',
      }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      }
    render() {
      return (
        <Layout style={{height:'100%'}}>
        <Header className='top-navigation' style={{height:'8.2%'}}>
        <div className="logo" />
        <div className="search">
        <Input 
        size='large'
        placeholder="Search or Enter Code"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
      />
     
        </div>
        <div className='flowbar-account'><span style={{padding:10}}>用户名</span><Avatar style={{ backgroundColor:'#f56a00', verticalAlign: 'middle' }} size={50}>U</Avatar>
        </div>
         
       
     
        </Header>
        <nav className="mid-nav">
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
        </nav>
        <Content className="page_body">
        <div className="title">My Drive</div>
        <div className="controller"><Icon type="folder-add" /><Icon type="swap" /><Icon type="ordered-list" /></div>
        <div className="content">
        <Card
    style={{ width: 200 }}
    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
  >
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
        </div>
        </Content>
        <Footer><Button type="primary"><Link to='/'>点击用户具体课件回到编辑页面</Link></Button></Footer>
        </Layout>
      );
    }
  }

  export default Account;