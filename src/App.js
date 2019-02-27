import React, { Component } from 'react';
import $ from 'jquery';
import {Form, Layout, Menu,Select, Row,Input,Button,Drawer,Avatar, Badge,Icon,Popover,Modal, Card,message} from 'antd';
import './App.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Bodysider from './components/Resource/sider';
import DrawView from './components/ZoomPic/drawerview';

import EditorWithBar from './components/Editor/EditorWithBar';

var temp = 99999
var MyDeck = [[{
  "id":temp,
  "type":"isogon",
  "position":[700,500],
  "rotation":[0,0],
  "scale":[1,1],
  "shape":{
      "n":3,
      "r":50,
      "x":100,
      "y":100
  },
  "style":{

  }
},
{
  "id":temp,
  "type":"isogon",
  "position":[300,500],
  "rotation":[0,0],
  "scale":[1,1],
  "shape":{
      "n":3,
      "r":50,
      "x":100,
      "y":100
  },
  "style":{

  }
}],[{
  "id":temp,
  "type":"rect",
  "position":[400,700],
  "rotation":[0,0],
  "scale":[1,1],
  "shape":{
      "height":50,
      "r":0,
      "width":50,
      "x":100,
      "y":100  //如果没有初始化值会被0覆盖，问题在于判断函数，待修改
  },
  "style":{

  }
},
{
  "id":temp,
  "type":"house",
  "position":[300,100],
  "rotation":[0,0],
  "scale":[1,1],
  "shape":{
      "n":3,
      "r":40,
      "r0":20,
      "cx":100,
      "cy":100
  },
  "style":{
      "fill":"none",
      "stroke":"green"
  }
}]];

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_981127_oee7kc1cksg.js',
});
const IconAvator = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1009791_ev29rcbfmfr.js',
});

const {  Content, Sider } = Layout;
const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}

const content=(
  <div style={{ width: 500 }}>
  <Card >
  <div className="left">
     <p style={{fontSize:'25px'}} >
        <IconAvator type="icon-touxiangnvhai"/>
        <Input value="这个协同web真棒！"  style={{ width: 200 }}/>
     </p> 
  </div>
  <div className="right">
     <p style={{fontSize:'25px'}} >
        <Input value="我也觉得"  style={{ width: 200 }}/>
        <IconAvator type="icon-icon-test3"/>
     </p> 
  </div>
  <div className="left">
     <p style={{fontSize:'25px'}} >
        <IconAvator type="icon-icon-test2"/>
        <Input value="js继承大家听懂了吗？" style={{ width: 200 }}/>
     </p> 
  </div>
  <div className="left">
     <p style={{fontSize:'25px'}} >
        <IconAvator type="icon-icon-test1"/>
        <Input value="只知道prototype这个属性很重要"  style={{ width: 300 }}/>
     </p> 
  </div>
  <div className="right">
     <p style={{fontSize:'25px'}} >
        <Input value="哈哈哈！"  style={{ width: 200 }}/>
        <IconAvator type="icon-icon-test"/>
     </p> 
  </div>
  <div className="right">
    <Input placeholder="发送消息"  style={{ width: 300 }}/>
     <Button type="primary">发送</Button>
  </div>  
  </Card>
  </div>
);
const text =
  <div>
  <Link to='/Account'><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" >U</Avatar>
  </Link><span style={{fontSize:15}}> 当前用户</span>
  <Popover placement="bottomRight" content={content} trigger="click">
      <Button style={{margin:"0px 0px 0px 4px"}}type="primary" size="small" ghost>交流</Button>
  </Popover>
  </div>;
const menu = (
  <Card title="当前在线协同者">
          <div style={{margin:'2px'}} >
            <Icon type="smile"  className="iconsize" theme="twoTone" twoToneColor="#eb2f96" />
            <span style={{fontSize:15}}> 梁静茹</span>
          </div>
          <div style={{margin:'2px'}}>
            <Icon type="meh"  className="iconsize" theme="twoTone" twoToneColor="#52c41a"/>
            <span style={{fontSize:15}}> 王菲</span>
          </div>
          <div style={{margin:'2px'}} >
            <Icon type="frown" className="iconsize" theme="twoTone"/>
             <span style={{fontSize:15}}> 程奕迅</span>      
          </div>
    </Card>
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
      
       <Option value="1"><IconFont type="anticon-piliangbianji" />允许任何人进行编辑</Option>
       <Option value="2"> <IconFont type="anticon-iconkuozhan_liulanpre" />只能查看浏览</Option>
     </Select>
     </Row>
    <Row style={{margin: '8px 8px 8px 16px'}}>
    <Menu.Divider />
    </Row>
      <Row style={{margin: '8px 8px 8px 16px'}}>
      <Select defaultValue="1" style={{ margin:'0px,0px,0px,-10px',width: '80% ',float:'left'}} onChange={handleChange}>
      
      <Option value="1">查找成员</Option>
      <Option value="2">胡歌</Option>
      <Option value="3">李健</Option>
      <Option value="4">周杰伦</Option>
      </Select>
      <Button style={{float:"right"}} type="primary" >添加</Button>
      </Row>
   </div> 

);
function deepClone(obj){
  let _obj = JSON.stringify(obj);
  return JSON.parse(_obj)
}
var flush = false;
class App extends Component {
  constructor(props, context) {
    super(props, context)
     // this.initPie = this.initPie.bind(this)
     
   this.thumbnail=this.thumbnail.bind(this)
   this.sync=this.sync.bind(this);
   this.flush=this.flush.bind(this);
   this.save = this.save.bind(this)
   this.passbyJudge = this.passbyJudge.bind(this)
  }
    state = {
      collapsed: true,
      visible: false,
      modalvisible:false,
      page:1,
      MyDeck:MyDeck,
      canvasFlush:false,
      thumbnail:[],
    };
    flush(state){
      this.setState({
        canvasFlush:state
      })
    }
    passbyJudge(){
      if(typeof MyDeck[this.state.page-1] !== "undefined"){
        return MyDeck[this.state.page-1].media
      }
      else{
        return null
      }
    }
    save(){
      const {createCourse_info,login_info} = this.props;

      var temp = deepClone(createCourse_info)
      var passbydata = createCourse_info.createCourse_info
   //  temp.createCourse_info.user_id = login_info.user_id

     var formData = deepClone(passbydata)

      delete formData.slides

      delete formData.thumbnail

      formData.width = temp.createCourse_info.thumbnail.style.width

      formData.height = temp.createCourse_info.thumbnail.style.height

      formData.url = temp.createCourse_info.thumbnail.url
    
      formData.slide =  [...temp.createCourse_info.slides.slide]

      formData.templateId = deepClone(temp.createCourse_info.slides.templateId) 

       console.log(JSON.stringify(formData))
      $.ajax({
        url: "http://localhost:3000/api/updateCourse",
        type: "PUT",
        async:false,
        dataType: "json",
        contentType:"application/json;charset=UTF-8",
        accepts:"application/json;charset=UTF-8",
        data:JSON.stringify(formData),//如果直接传会发生this.extend的错误
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function (data) {
            if (data.errorCode !== 0) {
              message.error("保存失败1");
            }
            else {
              message.success('保存成功');
                console.log(data);
                
               
            }
        },
        error: function (xhr, status, err) {
          message.error("保存失败2");
        }
    });
    
    }
    sync(objectList){

   // console.log(MyDeck) ; //浅复制不太对
  //  let temp = deepClone(objectList)
  //  let state=MyDeck[this.state.page-1]==objectList?false:true
   // state&&MyDeck.splice(this.state.page-1,1,temp)
   MyDeck.splice(this.state.page-1,1,objectList) //先浅复制
  
   // return state
    //  MyDeck.splice(this.state.page-1,1,objectList)
    
    }
    thumbnail = (src) =>{
      let thumbnail = this.state.thumbnail
      thumbnail.splice(this.state.page-1,1,src)
      this.setState({thumbnail})
    }
    pageChoose = (Xst) => {
      this.setState({
        page: Xst,
      });
      console.log(Xst)
    }
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
   componentDidUpdate(){
   }
   componentDidMount(){
    
  }

    render() {
      const {createCourse_info} = this.props;
       MyDeck = createCourse_info.createCourse_info.slides.slide
   //    console.log()
      console.log(MyDeck)
     
      console.log(this.state.thumbnail)
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
               <Button style={{fontSize:15}} type="primary" onClick={this.showDrawer}>
                 视图
              </Button>
              <Drawer
                width={300}
                title="幻灯片结构"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <DrawView pageChoose={this.pageChoose} thumbnail={this.state.thumbnail}/>{/**/}
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
            {/* <div className="flowbar" style={{right:200,top:20}}> */}
           <Popover placement="bottomLeft" title={text} content={menu} trigger="click">
           <Button type="dashed" shape="circle" className="iconsize" >
            <Icon type="ellipsis" className="iconsize"/>
           </Button>

         </Popover>
                
            
          </div>
          {/* <div className="flowbar" style={{right:160,top:20}}>
              <Button shape="circle" type="primary" ghost icon="share-alt" onClick={this.showModal}></Button> */}
              
           {/* </div> */}
          <div className="flowbar" style={{right:10,top:20}}>
            <span style={{ marginRight: 24, }}>
                <Badge count={1}><Avatar className="iconsize" onClick={this.showModal} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}  icon="user" /></Badge>
                <Modal
                 title="邀请成员"
                 visible={this.state.modalvisible}
                 onOk={this.handleOk}
                 onCancel={this.handleCancel}
              >
                {ContentModal}
              </Modal>
              </span>
            </div>
            <EditorWithBar initContent={this.passbyJudge()} sync={this.sync} page={this.state.page-1} thumbnail={this.thumbnail} save={this.save}/>
            </div>
            </Content>
            {/* </Layout> */}
          </Layout>
      );
    }
  }

  

  const App_Index=Form.create()(App);
  function  mapStateToProps(state) {
    return{
      login_info:state.reducer_login.login_info,
      createCourse_info:state.reducer_createcourse.createCourse_info,
    };
  }
  function mapDispatchToProps(dispatch){
    return{
      setCreatecourseState: (state) => dispatch(state),
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App_Index);