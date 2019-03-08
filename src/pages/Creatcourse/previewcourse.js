import React, { Component } from 'react';
import {Form, Icon, Avatar,Button,Row,Col ,Layout,Card,message} from 'antd';
import {Link} from 'react-router-dom'
import './creatcourse.css'
import '../User.css'
import $ from 'jquery';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import DrawView from '../../components/ZoomPic/drawerview';
import {localhost} from '../../config'
import Editor from '../../components/Editor/canvaslib'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span:12 },
    },
    wrapperCol: {
      xs: { span: 12},
      sm: { span: 12 },
    },
  };
  var isflush = true;
  class Previewcourse extends Component {
    static contextTypes={
      router:PropTypes.object
    }
    constructor(props, context) {
        super(props, context)
        this.state = {
          coursecatalog:[],//课件目录
          knowledges:[],
          page:1,
        }
      }
      
      getdata() {
        const { login_info ,previewcourseid}=this.props;
        var a=previewcourseid.project_id;
        var data = {
            "_id" :a.toString(),
        };
        console.log('进入researchByCourseId接口');
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
              console.log(data);
             data.msg&&data.msg[0]&&data.msg[0].catalog&&data.msg[0].catalog.children&&this.setState({   
                fileSize:data.msg[0].fileSize,
                scope:data.msg[0].scope,
                addTime:data.msg[0].addTime,
                views: data.msg[0].views,
                thumbnail:previewcourseid.thumbnail,
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
      downloadcoursedata() {
        const { login_info ,previewcourseid}=this.props;
        var a=previewcourseid.project_id;
        var data = {
            "_id" :a.toString(),
        };
        console.log('进入downloadCourse接口');
        $.ajax({
          url: "http://"+localhost+":3000/api/downloadCourse",
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
              console.log('下载成功111');
              console.log(data);
              message.success('下载成功，请到桌面区查看课件压缩包~');
            }
            else {   
              console.log('下载成功2222');
               
            }
          }.bind(this),
          error: function (xhr, status, err) {
          }
        });
      }
      getuserdata() {
        const { login_info }=this.props;
        console.log('进入getuserdata ajax');
        console.log(login_info.access_token);
        $.ajax({
          url: "http://"+localhost+":3000/api/getPersonalInfo",
          data:"user_id="+login_info.user_id,
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
          },
          type: "GET",
          dataType: "json",
          async:false,
          success: function (data) {
            if (data.errorCode === 1) {
              console.log('获取用户个人信息1111');
              console.log(data);
              this.setState({
                nick_name:data.msg.nick_name,
                position:data.msg.position,
                city:data.msg.city,
                sexy:data.msg.sexy,
                description:data.msg.description,
              });
            }
            else {   
              console.log('获取查询权限2222');
              this.setState({
                nick_name:data.msg.nick_name,
                position:data.msg.position,
                city:data.msg.city,
                sexy:data.msg.sexy,
                description:data.msg.description,
              });
            }
          }.bind(this),
          error: function (xhr, status, err) {
          }
        });
      }
      pageChoose = (Xst) => {
        this.setState({
          page: Xst,
        });
        console.log(Xst)
      }
      componentWillMount(){
        this.getdata();
        this.getuserdata();
      }
    render() { 
      return (
      <Layout style={{ backgroundColor: '#fff',height:'100%',width:'100%' }}> 
        <div className="flowbar" style={{right:10,top:20}}>      
        <Link to='/App'><Button type="primary" >
           <Icon type="edit" className="iconsize"/>
         </Button></Link>
        </div>
        <div className="flowbar" style={{right:80,top:20}}>      
         <Button onClick={this.downloadcoursedata.bind(this)} type="primary"  className="iconsize" >
           下载
         </Button>
        </div>
      <Card  style={{height:'100%',width:'100%'}}>
        <div>
         <Row gutter={16}>
         <Col span={3}>
           <Card style={{margin:'80px 0px 30px 80px',width:"100%",height: 700}} title="缩略图">
              <DrawView pageChoose={this.pageChoose} thumbnail={this.state.thumbnail}/>
           </Card>
         </Col>
         <Col span={14}>
           <Card style={{margin:'80px 0px 30px 80px',width:"100%",height: 700 }} title="显示区">
           {/* <Editor getThumbnail={this.handleThumbnail} objectList={isflush&&this.props.initContent} sync = {this.props.sync} isSingleMode ={this.props.isSingleMode} message={this.props.message} toServe={this.props.toServe} clearMsg = {this.props.clearMsg} shouldCreateSocket = {this.props.shouldCreateSocket} effect_createSocket = {this.props.effect_createSocket} project_id_now = {this.props.project_id_now}/>/> */}
            </Card>
         </Col>
         <Col span={4}>
           <Card style={{margin:'80px 0px 30px 80px',width:"100%",height: 700}} title="课件详情">
           <Row gutter={16}>
              <Col span={8}>
                <Avatar style={{width:70,height:70}}
                  size="large"
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                />
              </Col>
              <Col span={16}>
                <div className="head_one">{this.state.nick_name}</div>
                <div className="head_two">作者</div>
              </Col>
            </Row>
                   <Form >
                      <FormItem label="浏览量" {...formItemLayout} >
                           {this.state.views}
                      </FormItem>
                      <FormItem label="文件大小"  {...formItemLayout}>
                           {this.state.fileSize}
                      </FormItem>
                      <FormItem label="类别"  {...formItemLayout}>
                           {this.state.scope}
                      </FormItem>
                      <FormItem label="发布时间" {...formItemLayout} >
                           {this.state.addTime}
                      </FormItem>
                      <FormItem label="页数" {...formItemLayout} >
                           7
                      </FormItem>
                  </Form>
            </Card>
         </Col>
         </Row>
        </div>
      </Card>
      </Layout>
      );
    }
  }
  const Previewcourse_Index=Form.create()(Previewcourse);
  function  mapStateToProps(state) {
    return{
       login_info:state.reducer_login.login_info,
       previewcourseid:state.reducer_previewcourseid.previewcourseid,
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
  )(Previewcourse_Index);
