import React, { Component } from 'react';
import { Layout, Menu,Select, Row,Col,Button,Drawer,Avatar, Badge,Icon,Dropdown,Popover,Modal, Card} from 'antd';
import './App.css';
import {Link} from 'react-router-dom';

import Bodysider from './components/Resource/sider';
import DrawView from './components/ZoomPic/drawerview';

import EditorWithBar from './components/Editor/EditorWithBar';
const {  Content, Sider } = Layout;
const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const text =<div><Link to='/Account'><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" >Tom</Avatar></Link><span>当前用户</span></div>;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <div>
       <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />
        梁静茹
      </div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1" >
      <div>
       <Icon type="meh" theme="twoTone" twoToneColor="#52c41a"/>
        王菲
      </div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <div>
       <Icon type="frown" theme="twoTone"/>
        程奕迅
      </div>
    </Menu.Item>
  </Menu>
);
const ContentModal = (
 <div>
      <Row style={{margin: '8px 8px 8px 16px'}}> 
        <a style={{float:"left"}}>加入</a>
        <Button style={{float:"right"}} type="primary" ghost>JLFABSKA</Button>
      </Row>
      <Row style={{margin: '8px 8px 8px 16px'}}> 
        <a style={{float:"left"}}>https://ant.design/components/icon-cn/</a>
        <Button style={{float:"right"}} type="primary" >分享</Button>
      </Row>
    <Row style={{margin: '8px 8px 8px 16px'}}>
    <Menu.Divider />
    </Row>
    <Row style={{margin: '8px 8px 8px 16px'}}>
    
     <Select defaultValue="1" onChange={handleChange} style={{width:'100%'}}>
      
       <Option value="1"><Icon type="edit" theme="twoTone" twoToneColor="#52c41a"/>允许任何人进行编辑</Option>
       <Option value="2"><Icon type="audio" theme="twoTone" twoToneColor="#eb2f96"/>只能查看浏览</Option>
     </Select>
     </Row>
    <Row style={{margin: '8px 8px 8px 16px'}}>
    <Menu.Divider />
    </Row>
      <Row style={{margin: '8px 8px 8px 16px'}}>
      <Select defaultValue="1" style={{ margin:'0px,0px,0px,-10px',width: '80% ',float:'left'}} onChange={handleChange}>
      
      <Option value="1">查找成员</Option>
      <Option value="2">胡歌</Option>
      <Option value="2">李健</Option>
      <Option value="2">周杰伦</Option>
      </Select>
      <Button style={{float:"right"}} type="primary" >添加</Button>
      </Row>
   </div> 

);

class App extends Component {
  constructor(props, context) {
    super(props, context)
     // this.initPie = this.initPie.bind(this)
     
   // this.thumbnail=this.thumbnail.bind(this)
  }
    state = {
      collapsed: false,
      visible: false,
      modalvisible:false,
    };
    
    showModal = () => {
      this.setState({
        modalvisible: true,
      });
    }
    handleOk = (e) => {
      console.log(e);
      this.setState({
        modalvisible: false,
      });
    }
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        modalvisible: false,
      });
    }
    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }
    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
    render() {
      return (
        <Layout style={{width: '100%', height: '100vh'}}>
          <Sider 
          width={700}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          collapsedWidth={0}
         
          className="Sider"
          style={{width: '100%', height: '100vh'}}
          >
            <Bodysider/>
          </Sider>
         
         
         
          
            <div className="flowbar" style={{right:80,top: 20}}>
               <Button type="primary" onClick={this.showDrawer}>
                 视图
              </Button>
              <Drawer
                width={300}
                title="幻灯片缩略图"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <DrawView thumbnail={"当前幻灯片"}/>
              </Drawer>
            </div>
            <div className="flowbar" style={{right:10,top:20}}>
            <span style={{ marginRight: 24, }}>
                <Badge count={3}><Link to='/Account'><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}  icon="user" /></Link></Badge>
              </span>
            </div>
            
            {/* <Layout className='Layoutstyle'> */}
            <Content className="Content" style={{height: '100vh',margin: '0 16px'}}>
            <div>
            <div className="flowbar" style={{right:170,top:20}}>
           
           <Popover placement="bottomLeft" title={text} content={menu} trigger="click">
           <Button type="dashed" shape="circle" >
           <Icon type="ellipsis" />
           </Button>

         </Popover>
                
            
          </div>
          <div className="flowbar" style={{right:10,top:20}}>
            <span style={{ marginRight: 24, }}>
                <Badge count={1}><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}  icon="user" /></Badge>
              </span>
            </div>
            <EditorWithBar/>
            </div>
            </Content>
            {/* </Layout> */}
          </Layout>
      );
    }
  }

  export default App;