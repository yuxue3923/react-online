import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout,Modal, Button, Tabs, Card, Row,Input,Col,Avatar, Icon,Form,Pagination,Select,} from 'antd';
import MyTag from './Tag';
import ChoseTemplate from './ChoseTemplate'
import '../../App.css'
import './Account.css'
import $ from 'jquery';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1006980_3sv6ir3jo3x.js',
});
const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span:2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const TabPane = Tabs.TabPane;
const { Header, Content } = Layout;
const {Meta} = Card;
const suffix=<Icon type="close-circle"/>
const FormItem = Form.Item;
  class Account extends Component {
    static contextTypes={
      router:PropTypes.object
    }
    constructor(props, context) {
        super(props, context)
        this.state = {
          collectinfo:false,
          collectcourseinfo:"未收藏",
          visible: false ,
          current:1,//我的课件当前页
          pagecurrent:1,//总课件当前页
          checked: true,//Tag状态
          templatevisible:false,//控制课件模版弹出框
          imgurl:["https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png","https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png","https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png","https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png" ]
        }
    }
    handleChangecreat=(value)=> {
      if(value==2){
        this.collectCourseByuser();
      }
    }
    //Modal事件
    showModal = (id) => {
      this.setState({
        visible: true,
      });
      const { setSsendupdatecourseid } = this.props;
      setSsendupdatecourseid({
        type: 'GetuserupdatecourseidSuccess',
        payload: id,
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
     //课件模版选择确认弹出框
     showModal_template = () => {
      this.setState({
        templatevisible: true,
      });
    }
  
    handleOk_template = (e) => {
      console.log(e);
      this.setState({
        templatevisible: false,
      });
      Modal.success({
        title: '消息提示',
        content: '成功选择该课件模版！',
      });
    }
  onChange=(page)=>{
    this.setState(
      {
        current:page,
      }
    )
  }
  onChangepage=(page)=>{
    this.setState(
      {
        pagecurrent:page,
      }
    )
  }
  //控制收藏按钮
  collect=(id)=>{
    this.setState({
      collectinfo:!this.state.collectinfo,
    });
    if(!this.state.collectinfo){
      console.log("打印收藏"+this.state.collectinfo)
      this.collectCourse(id);
    }
    else{
      this.cancelcollectCourse(id);
    }
  }

    handleCancel_template = (e) => {
      console.log(e);
      this.setState({
        templatevisible: false,
      });
    }
    sendupdatecourseid(id){ 
      const { setSsendupdatecourseid } = this.props;
      setSsendupdatecourseid({
        type: 'GetuserupdatecourseidSuccess',
        payload: id,
      });
    }
    collectCourse(id){ 
      const { login_info}=this.props;
      var data = {
          "_id" :id.toString(),
          "user_id":login_info.user_id,
      };
      console.log('进入collectCourse接口');
      $.ajax({
        url: "http://localhost:3000/api/collectCourse",
        async:false,
        type: "POST",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:JSON.stringify(data),
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode == 0) {
            console.log('收藏课件成功111');
            this.setState({
              collectcourseinfo:"已收藏",
            });
          }
          else {   
            console.log('收藏课件成功222');
             
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }.bind(this)
      });
    }
    //收藏课件
    collectCourseByuser=()=>{ 
      const { login_info}=this.props;
      console.log('进入收藏用户课件接口');
      $.ajax({
        url: "http://localhost:3000/api/allCollectCourses",
        async:false,
        type: "GET",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:{"user_id":login_info.user_id},
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode == 0) {
            console.log('收藏课件成功111');
            this.setState({
              usercoursedata:data.msg,
            });
          }
          else {   
            console.log('收藏课件成功222');
             
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }.bind(this)
      });
    }
    cancelcollectCourse(id){ 
      const { login_info}=this.props;
      var data = {
          "_id" :id.toString(),
      };
      console.log('进入cancelcollectCourse接口');
      $.ajax({
        url: "http://localhost:3000/api/cancelCollect",
        async:false,
        type: "DELETE",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:JSON.stringify(data),
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode == 0) {
            console.log('取消收藏课件成功111');
            this.setState({
              collectcourseinfo:"未收藏",
            });
          }
          else {   
            console.log('取消收藏课件成功222');
             
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }.bind(this)
      });
    }
    deletecourseid(id){ 
      const { login_info}=this.props;
      var data = {
          "_id" :id.toString(),
      };
      console.log('进入deleteCourse接口');
      console.log(JSON.stringify(data));
      $.ajax({
        url: "http://localhost:3000/api/deleteCourse",
        async:false,
        type: "DELETE",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:JSON.stringify(data),
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode == 0) {
            console.log('删除课件id成功111');
            console.log(data);
            this.getdata();
          }
          else {   
            console.log('删除课件id成功2222');
             
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }.bind(this)
      });
    }
    getdata() {
      const { login_info }=this.props;
      console.log('进入researchByUserId接口');
      $.ajax({
        url: "http://localhost:3000/api/researchByUserId",
        async:false,
        type: "GET",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:{"user_id":login_info.user_id},
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode == 0) {
            console.log('获取查询权限111');
            console.log(data.msg);
            this.setState({
              usercoursedata:data.msg,
            });
          }
          else {   
            console.log('获取查询权限2222');
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }.bind(this)
      });
    }
    getcoursenamedata(e) {
      const { login_info }=this.props;
      console.log('进入researchByCourseName接口');
      $.ajax({
        url: "http://localhost:3000/api/researchByCourseName",
        async:false,
        type: "GET",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:{"courseName":e.target.value},
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode == 0) {
            console.log('成功查找课件111');
            console.log(data.msg);
            this.setState({
              allcoursedata:data.msg,
            });
          }
          else {   
            console.log('获取查询权限2222');
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }.bind(this)
      });
    }
    getallcoursedata() {
      const { login_info }=this.props;
      console.log('进入allCouse接口');
      $.ajax({
        url: "http://localhost:3000/api/allCourses",
        async:false,
        type: "GET",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:{},
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode == 0) {
            console.log('获取查询权限111');
            console.log(data.msg);
            this.setState({
              allcoursedata:data.msg,
            });
          }
          else {   
            console.log('获取查询权限2222');
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }.bind(this)
      });
    }
    componentWillMount(){
      this.getdata();
      this.getallcoursedata();
    }
    render() {
      var result=[];
      for(var i=0;i<this.state.usercoursedata.length;i++){
        var obj=this.state.usercoursedata[i];
        if(obj!==null){
          result.push(obj);
        }
      }
      console.log(result);
      const courseList = result.map((v, i) => {
          return (
            <div>
                 <Row gutter={16}>
               <Col span={8}>
                <Card
                  style={{ width:250 ,height:300}}
                  cover={
                    <img onClick={this.showModal.bind(this,v._id)}
                      alt="example"
                      src={this.state.imgurl[i%4]} height="154"
                    />
                  }
                >
                  <Row>
                    <Col span={18}>
                    <Meta
                        title={v.courseName}
                        description={v.descript}
                     />
                    </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col span={3}>
                    <IconFont className="iconsize" type="icon-xiugai" onClick={this.showModal.bind(this,v._id)}/>
                  </Col>
                    {/* <Col span={4}><IconFont className="iconsize" type="icon-xin" onClick={this.collect.bind(this,v._id)}/>{v.isEdit?"已收藏":"未收藏"}</Col> */}
                    <Col span={3}><IconFont className="iconsize" type="icon-xin" onClick={this.collectCourse.bind(this,v._id)}/></Col>
                    <Col span={3}><IconFont className="iconsize" type="icon-shoucang" onClick={this.cancelcollectCourse.bind(this,v._id)}/></Col>
                    <Col span={3}><Icon className="iconsize" type="delete" onClick={this.deletecourseid.bind(this,v._id)}/></Col>
                    <Col span={12}><IconFont className="iconsize" type="icon-icon-test"/><IconFont className="iconsize" type="icon-icon-test2"/><IconFont className="iconsize" type="icon-icon-test1"/><IconFont className="iconsize" type="icon-icon-test-copy"/></Col>
                  </Row>
                </Card>
            </Col>
            </Row>
            </div>
          );}
        );
        const allcourseList = this.state.allcoursedata.map((v, i) => {
          return (
            <div>
                 <Row gutter={16}>
               <Col span={8}>
                <Card
                  style={{ width:250 ,height:300}}
                  cover={
                    <img onClick={this.showModal.bind(this,v._id)}
                      alt="example"
                      src={this.state.imgurl[i%4]} height="154"
                    />
                  }
                >
                  <Row>
                    <Col span={18}>
                    <Meta
                        title={v.courseName}
                        description={v.descript}
                     />
                    </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col span={4}>
                    <IconFont className="iconsize" type="icon-xiugai" onClick={this.showModal.bind(this,v._id)}/>
                  </Col>
                    <Col span={8}><IconFont className="iconsize" type="icon-xin"/></Col>
                    <Col span={12}><IconFont className="iconsize" type="icon-icon-test"/><IconFont className="iconsize" type="icon-icon-test2"/><IconFont className="iconsize" type="icon-icon-test1"/><IconFont className="iconsize" type="icon-icon-test-copy"/></Col>
                  </Row>
                </Card>
            </Col>
            </Row>
            </div>
          );}
        );
      const cardBasic_creat = (
        <div>
                <Card
                  className="cardparent"
                >
                  <Row className="cardself" >
                    <p style={{fontSize:'35px'}}><IconFont  onClick={this.showModal_template} type="icon-jia" /></p>
                    <p>创建新课件</p>
                  </Row>
                </Card>
        </div>
      );

     
      var ownMapallcourse=(list,current)=>{
        for(let i=(current-1)*8;i<list.length;){
          return  <div>
          <Row style={{ margin: '8px 8px 8px 0'}}>
             <Col span={6}>{list[i]}</Col>
            <Col span={6}>{list[i+1]}</Col>
            <Col span={6}>{list[i+2]}</Col> 
            <Col span={6}>{list[i+3]}</Col>
          </Row>
          <Row style={{ margin: '8px 8px 8px 0'}}>
            <Col span={6}>{list[i+4]}</Col>
            <Col span={6}>{list[i+5]}</Col>
            <Col span={6}>{list[i+6]}</Col> 
            <Col span={6}>{list[i+7]}</Col> 
          </Row>
          <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
          <Pagination current={this.state.pagecurrent} onChange={this.onChangepage} total={500} />
          </Row>
        </div>
        }
       }
      var ownMap=(list,current)=>{
       for(let i=(current-1)*7;i<list.length;){
         return  <div>
         <Row style={{ margin: '8px 8px 8px 0'}}>
           <Col span={6}>{cardBasic_creat}</Col>
            <Col span={6}>{list[i]}</Col>
           <Col span={6}>{list[i+1]}</Col>
           <Col span={6}>{list[i+2]}</Col> 
         </Row>
         <Row style={{ margin: '8px 8px 8px 0'}}>
           <Col span={6}>{list[i+3]}</Col>
           <Col span={6}>{list[i+4]}</Col>
           <Col span={6}>{list[i+5]}</Col>
           <Col span={6}>{list[i+6]}</Col> 
         </Row>
         <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
         <Pagination current={this.state.current} onChange={this.onChange} total={500} />
         </Row>
       </div>
       }
      }
      const cardList_course = ownMap(courseList,this.state.current)
      const cardList_viedo = ownMapallcourse(allcourseList,this.state.pagecurrent)
      const mycourse_ground=(
        <div style={{ margin: '8px 8px 8px 0'}}>
        <Card bordered={false}>
          <Form layout="inline" style={{ paddingBottom: 11 }}>
              <Row gutter={16}>
              <Col span={5}>                  
                  <Select defaultValue="1" onChange={this.handleChangecreat} style={{width:'100%'}}>
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
        <div style={{ margin: '0px 0px 0px 0'}}>
        <Card bordered={false}>
          <Form >
              <FormItem label="K12教育"  {...formItemLayout}>
                    <MyTag>全部</MyTag>
                    <MyTag>语文</MyTag>
                    <MyTag>数学</MyTag>
                    <MyTag>英语</MyTag>
                    <MyTag>物理</MyTag>
                    <MyTag>化学</MyTag>
                    <MyTag>生物</MyTag>
                    <MyTag>政治</MyTag>
                    <MyTag>历史</MyTag>
                    <MyTag>体育</MyTag>
                    <MyTag>艺术</MyTag>
              </FormItem>
              <FormItem label="IT教育"  {...formItemLayout}>
                    <MyTag>全部</MyTag>
                    <MyTag>前端</MyTag>
                    <MyTag>小程序</MyTag>
                    <MyTag>区块链</MyTag>
                    <MyTag>人工智能</MyTag>
                    <MyTag>云计算</MyTag>
                    <MyTag>大数据</MyTag>
                    <MyTag>运维</MyTag>
                    <MyTag>测试</MyTag>
                    <MyTag>数据库</MyTag>
                    <MyTag>UI设计</MyTag>
              </FormItem>
              <FormItem label="百科知识" {...formItemLayout}>
                    <MyTag>全部</MyTag>
                    <MyTag>建筑</MyTag>
                    <MyTag>艺术</MyTag>
                    <MyTag>心理</MyTag>
                    <MyTag>宗教</MyTag>
                    <MyTag>医学健康</MyTag>
                    <MyTag>商业管理</MyTag>
                    <MyTag>经济</MyTag>
                    <MyTag>金融</MyTag>
                    <MyTag>法律</MyTag>
                    <MyTag>伦理</MyTag>
              </FormItem>
          </Form>
        </Card>
        {cardList_viedo}
        </div>
      );

      return (
        <Layout style={{height:'100%',width:'100%'}}>
        <Modal
          width="700px"
          title="选择模版"
          visible={this.state.templatevisible}
          onOk={this.handleOk_template}
          onCancel={this.handleCancel_template}
          footer={null}
        >
          <ChoseTemplate/>
        </Modal> 
        <Header className='top-navigation' style={{height:'8.2%'}}>
        {/* <div className="logo" /> */}
        <div className="search">
        <Input onPressEnter={this.getcoursenamedata.bind(this)}
        size='large'
        placeholder="搜索课件标题"
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
      />
     
        </div>
        <div className='flowbar-account' style={{right:30,top:20}}>
        <Link to='/User'><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" >U</Avatar></Link>
        <span style={{padding:10,fontSize:15}}>当前用户</span>
        </div>
         
       
     
        </Header>
        <Modal
          title="是否查看课件"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
        <p className="right">
           <Button key="return" onClick={this.handleCancel}>取消</Button>
           <Link to='/Updatecourse'><Button key="next" type="primary"> 确定 </Button></Link>
        </p>
        </Modal>
        <Card bordered={false}>
            <Tabs defaultActiveKey="mycourse" size="large">
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

  const Account_Index=Form.create()(Account);
  function  mapStateToProps(state) {
    return{
       login_info:state.reducer_login.login_info,
    };
  }
  function mapDispatchToProps(dispatch){
    return{
      setSsendupdatecourseid: (state) => dispatch(state),
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Account_Index);
