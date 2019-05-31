import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout,Modal, Button, Tabs, Card, Row,Input,Col,Avatar, Icon,Form,Pagination,Select,message,Skeleton,Divider} from 'antd';
import MyTag from './Tag';
import ChoseTemplate from './ChoseTemplate'
import '../../App.css'
import './Account.css'
import $ from 'jquery';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import {localhost} from '../../config'
//import pagefirst from '../CreatecourseNew/pagefirst'

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
const { Header} = Layout;
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
          controlrecycle:false,
          loading:true,
          allcoursedata:[],
          recyclcourse:[],
          usercoursedata:[],
          collectinfo:false,
          collectcourseinfo:"未收藏",
          visible: false ,
          current:1,//我的课件当前页
          pagecurrent:1,//总课件当前页
          pagecurrentrecycle:1,
          checked: true,//Tag状态
          templatevisible:false,//控制课件模版弹出框
          deletevisible:false,//课件删除弹出框
          imgurl:["https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png","https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png","https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png","https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png" ]
        }
    }
    handleChangecreat=(value)=> {
      console.log("value",value)
      if(value==="1"){
        this.getdata();
      }
      if(value==="2"){
        this.collectCourseByuser();
      }
      
    }
    //预览课件传参
    handleOk_preview = (id) => {
      const { sendpreviewcourseid} = this.props;
      sendpreviewcourseid({
        type: 'GetpreviewcourseidSuccess',
        payload:{ 
          project_id:id,
          allcoursedata:this.state.allcoursedata,
          // thumbnail:this.state.thumbnail,
          // cataloglist:this.state.cataloglist,
        },
      });
      this.context.router.history.push("/Previewcourse");
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
     //showModal_template = () => {
      //this.setState({
      //  templatevisible: true,
     // });
    //}
  
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
    handleCancel_template = (e) => {
      console.log(e);
      this.setState({
        templatevisible: false,
      });
    }
    //课件删除确认弹出框
    showModal_delete = (_id) => {
      this.setState({
        deletevisible: true,
        _id:_id
      });
    }
  
    handleOk_delete = (e) => {
      console.log(e);
      message.success('还可以去右上角的回收站找哟~');
      var recyclcourse1=this.state.recyclcourse;
       var arraydata=this.state.usercoursedata;
        for (let i=0;i<arraydata.length;i++){
          if(arraydata[i]._id===this.state._id){
                var index=i;
                recyclcourse1.push(arraydata[i]);
            }
         }
          arraydata.splice(index,1);
          this.setState({
            usercoursedata:arraydata,
            recyclcourse:recyclcourse1,
            deletevisible: false,
          });
    }
    recyclcourse=()=>{
      this.setState({
        controlrecycle:true,
      });
    }
    handleCancel_delete = (e) => {
      console.log(e);
      this.deletecourseid(this.state._id);
      this.setState({
        deletevisible: false,
      });
    }
    handleCanceldelete = (e) => {
      console.log(e);
      this.setState({
        deletevisible: false,
      });
    }
  onChange=(page)=>{
    this.setState(
      {
        current:page,
      }
    )
  }
  onChangeSearch = (e) => {
    this.setState({ searchContent: e.target.value });
    
  }
  
  searchCode(e,callBack){
    
    var data = this.state.searchContent;
  
    const { login_info } = this.props;
    $.ajax({
      url: "http://"+localhost+":3000/api/getReflectProject_id?tinyCode="+data,
      async:false,
      type: "GET",
      contentType:"application/json;charset=UTF-8",
      accepts:"application/json;charset=UTF-8",
      dataType: "json",
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      success: function(data) {
          if (data) {
              console.log('返回对应项目id'+data);
            //  this.setState({ searchContent: data});
              callBack(data)
          }
          else {
              console.log('找不到项目');
          }
      },
      error: function (xhr, status, err) {
        console.log("请求项目失败")
      }
  });
   
  }
  
  
  gotoSearchProject(projectId){
    const {setCreatecourseState} = this.props;
    const { login_info}=this.props;
      
      var data = projectId?{
        "_id" :projectId,
      }:{
        "_id" :this.state.searchContent,
      };
      console.log('进入researchByCourseId接口');
      console.log(JSON.stringify(data));
      $.ajax({
        url: "http://"+localhost+":3000/api/researchByCourseId",
        async:false,
        type: "GET",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:data,
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode === 0) {
            console.log('获取查询权限111');
            console.log(data.msg[0])
            setCreatecourseState({
              type:'createcourseSuccess',
              payload:{
                isSingle:false,
                createCourse_info:data.msg[0],
                course_id:projectId || this.state.searchContent,
                numchat:true,
              }
            });
            this.context.router.history.push("/APP");
          }
          else {   
            console.log('获取查询权限2222');
             
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }
      });
  }
  
  onChangepage=(page)=>{
    this.setState(
      {
        pagecurrent:page,
      }
    )
  }
  onChangepagerecycle=(page)=>{
    this.setState(
      {
        pagecurrentrecycle:page,
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
        url: "http://"+localhost+":3000/api/collectCourse",
        async:false,
        type: "POST",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:JSON.stringify(data),
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode === 0) {
            console.log('收藏课件成功111');
            message.success('成功收藏该课件');
          }
          else {   
            console.log('收藏课件成功222');
             
          }
        },
        error: function (xhr, status, err) {
        }
      });
    }
    //收藏课件
    collectCourseByuser=()=>{ 
      const { login_info}=this.props;
      console.log('进入收藏用户课件接口');
      $.ajax({
        url: "http://"+localhost+":3000/api/allCollectCourses",
        // async:false,
        type: "GET",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:{"user_id":login_info.user_id},
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode === 0) {
            console.log('收藏课件成功111');
            var result=[];
            for(var i=0;i<data.msg.length;i++){
              var obj=data.msg[i];
              if(obj!==null){
                result.push(obj);
              }
            }
            this.setState({
              current:1,
              usercoursedata:result,
              controlrecycle:false,
            });
          }
          else {   
            console.log('收藏课件成功222');
             
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }
      });
    }
    cancelcollectCourse(id){ 
      const { login_info}=this.props;
      var data = {
          "_id" :id.toString(),
      };
      console.log('进入cancelcollectCourse接口');
      $.ajax({
        url: "http://"+localhost+":3000/api/cancelCollect",
        async:false,
        type: "DELETE",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:JSON.stringify(data),
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode === 0) {
            console.log('取消收藏课件成功111');
            message.success( '取消收藏该课件');
          }
          else {   
            console.log('取消收藏课件成功222');
          }
        },
        error: function (xhr, status, err) {
          console.log('无法收藏课件');
        }
      });
    }
    cancelrecycledeletecourseid(id){ 
      message.info('该课件已还原到原位置哟~');
      console.log('进入取消deleteCourse接口');
      var array=this.state.recyclcourse;
      for (var i=0;i<array.length;i++){
        console.log("index",array)
        if(array[i]._id===id){
           var index=i;
           console.log("index",index)
        }
      }
    array.splice(index,1);
    console.log(array);
    this.setState({
      recyclcourse:array,
      controlrecycle:true,

    })
    this.getdata();
    }
    recycledeletecourseid(id){ 
      const { login_info}=this.props;
      var data = {
          "_id" :id.toString(),
      };
      console.log('进入deleteCourse接口');
      console.log(JSON.stringify(data));
      $.ajax({
        url: "http://"+localhost+":3000/api/deleteCourse",
        async:false,
        type: "DELETE",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:JSON.stringify(data),
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode === 0) {
            message.success('成功删除课件~');
            console.log('删除课件id成功111');
            console.log(data);
            
            // this.getdata();
            // this.getallcoursedata();

            var array=this.state.recyclcourse;
            for (var i=0;i<array.length;i++){
              console.log("index",array)
              if(array[i]._id===id){
                 var index=i;
                 console.log("index",index)
              }
            }
          array.splice(index,1);
          console.log(array);
          this.setState({
            recyclcourse:array,
            controlrecycle:true,
          })
          }
          else {   
            console.log('删除课件id成功2222');
             
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }
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
        url: "http://"+localhost+":3000/api/deleteCourse",
        // async:false,
        type: "DELETE",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:JSON.stringify(data),
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode === 0) {
            message.success('成功删除课件~');
            console.log('删除课件id成功111');
            console.log(data);
            
            // this.getdata();
            // this.getallcoursedata();

            var array=this.state.usercoursedata;
            for (var i=0;i<array.length;i++){
              console.log("index",array)
              if(array[i]._id===id){
                 var index=i;
                 console.log("index",index)
              }
            }
          array.splice(index,1);
          console.log(array);
          this.setState({
            usercoursedata:array,
            controlrecycle:false,
          })
          }
          else {   
            console.log('删除课件id成功2222');
             
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }
      });
    }
    getdata() {
      const { login_info }=this.props;
      console.log('进入researchByUserId接口');
      message.info('加载过程有点缓慢，请耐心等待哟~');
      this.setState({
        loading:true,
      });
      $.ajax({
        url: "http://"+localhost+":3000/api/researchByUserId",
        // async:false,
        type: "GET",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:{"user_id":login_info.user_id},
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode === 0) {
            console.log('获取查询权限111');
            var result=[];
            for(var i=0;i<data.msg.length;i++){
              var obj=data.msg[i];
              if(obj!==null){
                result.push(obj);
              }
            }
            this.setState({
              loading:false,
              usercoursedata:result,
              controlrecycle:false,
            });
          }
          else {   
            console.log('获取查询权限2222');
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }
      });
    }

    getcoursenamedata(e) {
      const { login_info }=this.props;
      console.log('进入researchByCourseName接口');
      $.ajax({
        url: "http://"+localhost+":3000/api/researchByCourseName",
        // async:false,
        type: "GET",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:{"courseName":e.target.value},
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode === 0) {
            console.log('成功查找课件111');
            this.setState({
              loading:false,
              allcoursedata:data.msg,
            });
          }
          else {   
            console.log('获取查询权限2222');
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }
      });
    }
     
    getallcoursedata() {
      const { login_info }=this.props;
      console.log('进入allCouse接口');
      $.ajax({
        url: "http://"+localhost+":3000/api/allCourses",
        // async:false,
        type: "GET",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:{},
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function(data) {
          if (data.errorCode === 0) {
            console.log('获取查询权限111');
            this.setState({
              allcoursedata:data.msg,
            });
          }
          else {   
            console.log('获取查询权限2222');
          }
        }.bind(this),
        error: function (xhr, status, err) {
        }
      });
    }
    componentDidMount(){
      this.setState({trigger:1})
      this.getdata();
      this.getallcoursedata();
    }
    render() {
      console.log("Account XuanRan")
      const { loading ,controlrecycle} = this.state;
      var ownloadcourse=(loading)=>{
      if(loading){
        return  <div>
       <Row gutter={24} style={{ margin: '8px 8px 8px 0'}}>
         <Col span={4}><Skeleton loading={loading} active /></Col>
         <Col span={4}><Skeleton loading={loading} active /></Col>
         <Col span={4}><Skeleton loading={loading} active /></Col>
         <Col span={4}><Skeleton loading={loading} active /></Col> 
         <Col span={4}><Skeleton loading={loading} active /></Col> 
         <Col span={4}><Skeleton loading={loading} active /></Col>
       </Row>
       <Row gutter={24} style={{ margin: '8px 8px 8px 0'}}>
         <Col span={4}><Skeleton loading={loading} active /></Col>
         <Col span={4}><Skeleton loading={loading} active /></Col>
         <Col span={4}><Skeleton loading={loading} active /></Col>
         <Col span={4}><Skeleton loading={loading} active /></Col> 
         <Col span={4}><Skeleton loading={loading} active /></Col> 
         <Col span={4}><Skeleton loading={loading} active /></Col>
       </Row>
     </div>
      }
    }
     
    const recyclecourseList = this.state.recyclcourse.map((v, i) => {
      return (
        <div>
             <Row gutter={16}>
           <Col span={8}>
            <Card
              style={{ width:250 ,height:300}}
              cover={
                <img 
                  alt="example"
                  src={this.state.imgurl[i%4]} height="154"
                />
              }
            >
              <Row>
                <Col span={24}>
                <Meta
                    title={v.courseName}
                    description={v.descript}
                 />
                </Col>
              </Row>
              <br />
              <Row >
                <Col span={3}>
                {/* <IconFont className="iconsize" type="icon-xiugai" onClick={this.showModal.bind(this,v._id)}/> */}
              </Col>
                {/* <Col span={4}><IconFont className="iconsize" type="icon-xin" onClick={this.collect.bind(this,v._id)}/>{v.isEdit?"已收藏":"未收藏"}</Col> */}
                {/* <Col span={3}><IconFont className="iconsize" type="icon-xin" onClick={this.collectCourse.bind(this,v._id)}/></Col>
                <Col span={3}><IconFont className="iconsize" type="icon-shoucang" onClick={this.cancelcollectCourse.bind(this,v._id)}/></Col> */}
                <Col span={3}><Icon className="iconsize" type="delete" onClick={this.recycledeletecourseid.bind(this,v._id)}/></Col>
                <Col span={3}><Icon className="iconsize" type="rollback" onClick={this.cancelrecycledeletecourseid.bind(this,v._id)}/></Col>
                <Col span={12}><IconFont className="iconsize" type="icon-icon-test"/><IconFont className="iconsize" type="icon-icon-test2"/><IconFont className="iconsize" type="icon-icon-test1"/><IconFont className="iconsize" type="icon-icon-test-copy"/></Col>
              </Row>
            </Card>
        </Col>
        </Row>
        </div>
      );}
    );
      const courseList = this.state.usercoursedata.map((v, i) => {
          return (
            <div>
                 <Row gutter={16}>
               <Col span={8}>
                <Card
                  style={{ width:250 ,height:370}}
                  cover={
                    <img onClick={this.handleOk_preview.bind(this,v._id)}
                      alt="example"
                      src={this.state.imgurl[i%4]} height="154"
                    />
                  }
                >
                  <Row>
                    <Col span={24}>
                    <Meta
                        title={v.courseName}
                        description={v.descript}
                     />
                    </Col>
                  </Row>
                  <br />
                  <Row style={{ marginBottom: '0px' }}>
               <Col span={1}></Col>
               <Col span={8}><Icon type="message" />2534</Col>
               <Col span={7}><Icon type="heart" />12万</Col>
               <Col span={7}><Icon type="share-alt" />367</Col>
               <Col span={1}></Col>
              </Row>
              <Divider>课件操作</Divider>
                  <Row style={{ marginBottom: '0px' }}>
                    {/* <Col span={3}>
                    <IconFont className="iconsize" type="icon-xiugai" onClick={this.showModal.bind(this,v._id)}/>
                  </Col> */}
                    {/* <Col span={4}><IconFont className="iconsize" type="icon-xin" onClick={this.collect.bind(this,v._id)}/>{v.isEdit?"已收藏":"未收藏"}</Col> */}
                    <Col span={7}><IconFont className="iconsize" type="icon-xin" onClick={this.collectCourse.bind(this,v._id)}/>收藏</Col>
                    <Col span={10}><IconFont className="iconsize" type="icon-shoucang" onClick={this.cancelcollectCourse.bind(this,v._id)}/>取消收藏</Col>
                    <Col span={7}><Icon className="iconsize" type="delete" onClick={this.showModal_delete.bind(this,v._id)}/>删除</Col>
                    {/* <Col span={12}><IconFont className="iconsize" type="icon-icon-test"/><IconFont className="iconsize" type="icon-icon-test2"/><IconFont className="iconsize" type="icon-icon-test1"/><IconFont className="iconsize" type="icon-icon-test-copy"/></Col> */}
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
                  style={{ width:250 ,height:370}}
                  cover={
                    <img onClick={this.handleOk_preview.bind(this,v._id)}
                      alt="example"
                      src={this.state.imgurl[i%4]} height="154"
                    />
                  }
                >
                  <Row>
                    <Col span={24}>
                    <Meta
                        title={v.courseName}
                        description={v.descript}
                     />
                    </Col>
                  </Row>
                  <br />
                  <Row style={{ marginBottom: '0px' }}>
               <Col span={1}></Col>
               <Col span={8}><Icon type="message" />2534</Col>
               <Col span={7}><Icon type="heart" />12万</Col>
               <Col span={7}><Icon type="share-alt" />367</Col>
               <Col span={1}></Col>
              </Row>
              <Divider>课件操作</Divider>
                  <Row >
                    {/* <Col span={4}>
                    <IconFont className="iconsize" type="icon-xiugai" onClick={this.showModal.bind(this,v._id)}/>
                  </Col> */}
                   <Col span={12}><IconFont className="iconsize" type="icon-xin" onClick={this.collectCourse.bind(this,v._id)}/>收藏</Col>
                    <Col span={12}><IconFont className="iconsize" type="icon-shoucang" onClick={this.cancelcollectCourse.bind(this,v._id)}/>取消收藏</Col>
                    {/* <Col span={7}><Icon className="iconsize" type="delete" onClick={this.showModal_delete.bind(this,v._id)}/>删除</Col> */}
                    {/* <Col span={8}><IconFont className="iconsize" type="icon-xin"/></Col> */}
                    {/* <Col span={12}><IconFont className="iconsize" type="icon-icon-test"/><IconFont className="iconsize" type="icon-icon-test2"/><IconFont className="iconsize" type="icon-icon-test1"/><IconFont className="iconsize" type="icon-icon-test-copy"/></Col> */}
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
                    <p style={{fontSize:'35px'}}><Link to='pagefirst'><IconFont  type="icon-jia" /></Link></p>
                    <p>创建新课件</p>
                  </Row>
                </Card>
        </div>
      );

     
      var ownMapallcourse=(list,current)=>{
        for(let i=(current-1)*12;i<list.length;){
          return  <div>
          <Row gutter={24} style={{ margin: '8px 8px 8px 0'}}>
             <Col span={4}>{list[i]}</Col>
            <Col span={4}>{list[i+1]}</Col>
            <Col span={4}>{list[i+2]}</Col> 
            <Col span={4}>{list[i+3]}</Col>
            <Col span={4}>{list[i+4]}</Col>
            <Col span={4}>{list[i+5]}</Col>
          </Row>
          <Row gutter={24} style={{ margin: '8px 8px 8px 0'}}>
            <Col span={4}>{list[i+6]}</Col>
            <Col span={4}>{list[i+7]}</Col>
            <Col span={4}>{list[i+8]}</Col> 
            <Col span={4}>{list[i+9]}</Col> 
            <Col span={4}>{list[i+10]}</Col>
            <Col span={4}>{list[i+11]}</Col> 
          </Row>
          <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
          <Pagination current={this.state.pagecurrent} onChange={this.onChangepage} total={list.length} pageSize={12} />
          </Row>
        </div>
        }
       }
      var ownMap=(list,current)=>{
       for(let i=(current-1)*11;i<list.length;){
        
         return  <div>
         <Row gutter={24} style={{ margin: '8px 8px 8px 0'}}>
           <Col span={4}>{cardBasic_creat}</Col>
           <Col span={4}>{list[i]}</Col>
           <Col span={4}>{list[i+1]}</Col>
           <Col span={4}>{list[i+2]}</Col> 
           <Col span={4}>{list[i+3]}</Col> 
           <Col span={4}>{list[i+4]}</Col>
         </Row>
         <Row gutter={24} style={{ margin: '8px 8px 8px 0'}}>
           <Col span={4}>{list[i+5]}</Col>
           <Col span={4}>{list[i+6]}</Col>
           <Col span={4}>{list[i+7]}</Col>
           <Col span={4}>{list[i+8]}</Col> 
           <Col span={4}>{list[i+9]}</Col> 
           <Col span={4}>{list[i+10]}</Col>
         </Row>
         <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
         <Pagination current={this.state.current} onChange={this.onChange} total={list.length} pageSize={11}/>
         </Row>
       </div>
      
      }
      return  <div>
      <Row gutter={24} style={{ margin: '8px 8px 8px 0'}}>
        <Col span={4}>{cardBasic_creat}</Col>
      </Row>
      <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
      <Pagination current={this.state.current} onChange={this.onChange} total={list.length} pageSize={11}/>
      </Row>
    </div>
      }
      var ownrecyclecourse=(controlrecycle,list,current)=>{
        if(controlrecycle){
          for(let i=(current-1)*12;i<list.length;){
            return  <div>
            <Row gutter={24} style={{ margin: '8px 8px 8px 0'}}>
               <Col span={4}>{list[i]}</Col>
              <Col span={4}>{list[i+1]}</Col>
              <Col span={4}>{list[i+2]}</Col> 
              <Col span={4}>{list[i+3]}</Col>
              <Col span={4}>{list[i+4]}</Col>
              <Col span={4}>{list[i+5]}</Col>
            </Row>
            <Row gutter={24} style={{ margin: '8px 8px 8px 0'}}>
              <Col span={4}>{list[i+6]}</Col>
              <Col span={4}>{list[i+7]}</Col>
              <Col span={4}>{list[i+8]}</Col> 
              <Col span={4}>{list[i+9]}</Col> 
              <Col span={4}>{list[i+10]}</Col>
              <Col span={4}>{list[i+11]}</Col> 
            </Row>
            <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
            <Pagination current={this.state.pagecurrentrecycle} onChange={this.onChangepagerecycle} total={list.length} pageSize={12} />
            </Row>
          </div>
          }
        }
      }
      const cardList_course = ownloadcourse(loading)||ownrecyclecourse(controlrecycle,recyclecourseList,this.state.pagecurrentrecycle)||ownMap(courseList,this.state.current)
      const cardList_viedo = ownloadcourse(loading)||ownMapallcourse(allcourseList,this.state.pagecurrent)
      // const cardList_course = ownloadcourse(loading)
      // const cardList_viedo = ownloadcourse(loading)
      const mycourse_ground=(
        <div style={{ margin: '0'}}>
        {/* <Card bordered={false}> */}
          <Form layout="inline"  style={{ marginTop: '20px'}}>
              <Row gutter={16}>
              <Col span={5}>                  
                  <Select defaultValue="1" onChange={this.handleChangecreat} style={{width:'100%'}}>
                     <Option value="1">我创建的课件</Option>
                    <Option value="2"> 我收藏的课件</Option>
                    <Option value="3">我删除的课件</Option>
                    <Option value="4"> 我协同的课件</Option>
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
                <Col span={7}/> 
                <Col span={2}>
                  <p style={{fontSize:'35px'}}><Icon onClick={this.recyclcourse} type="rest" /></p>
                </Col> 
              </Row>
          </Form>
        {/* </Card> */}
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
        placeholder="搜索项目"
        onChange={this.onChangeSearch.bind(this)}
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} onClick={(value) =>this.searchCode(value,this.gotoSearchProject.bind(this))}/>}
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
         <p>你可以选择查看课件，也可以编辑修改课件哟~</p>
        <p className="right">
            <Link to='/Reviewcourse'><Button key="return" >查看课件</Button></Link>
           <Link to='/Updatecourse'><Button key="next" type="primary"> 编辑课件 </Button></Link>
        </p>
        </Modal>
        <Modal
          title="是否删除课件"
          visible={this.state.deletevisible}
          // onOk={this.handleOk_delete}
          onCancel={this.handleCanceldelete}
          footer={null}
        >
        <p>你可以选择彻底删除课件，也可以将其放到回收站哟~</p>
        <p className="right">
           <Button key="return" onClick={this.handleCancel_delete}>彻底删除</Button>
          <Button key="next" type="primary" onClick={this.handleOk_delete}>回收站</Button>
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
      setCreatecourseState: (state) => dispatch(state),
      sendpreviewcourseid: (state) => dispatch(state),
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Account_Index);
