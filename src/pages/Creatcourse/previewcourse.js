// import React, { Component } from 'react';
// import {Form, Icon, Avatar,Button,Row,Col ,Layout,Card,message} from 'antd';
// import {Link} from 'react-router-dom'
// import './creatcourse.css'
// import '../User.css'
// import $ from 'jquery';
// import PropTypes from "prop-types"
// import { connect } from 'react-redux';
// import DrawViewcopy from '../../components/ZoomPic/drawerviewcopy';
// import {localhost} from '../../config'
// // import Editor from '../../components/Editor/canvaslib'
// const FormItem = Form.Item;
// const formItemLayout = {
//     labelCol: {
//       xs: { span: 12 },
//       sm: { span:12 },
//     },
//     wrapperCol: {
//       xs: { span: 12},
//       sm: { span: 12 },
//     },
//   };
//   // var isflush = true;
//   class Previewcourse extends Component {
//     static contextTypes={
//       router:PropTypes.object
//     }
//     constructor(props, context) {
//         super(props, context)
//         this.state = {
//           coursecatalog:[],//课件目录
//           knowledges:[],
//           page:1,
//           login_info:{
//             username:"",
//             access_token:"",
//             user_id:"",
//           },
//           previewcourseid:{ 
//             project_id:"",
//             thumbnail:"",
//             cataloglist:"",
//           },
//         }
//       }
//       getprops(){
//         const { login_info ,previewcourseid}=this.props;
//         this.setState({
//           login_info:{
//             username:login_info.username,
//             access_token:login_info.access_token,
//             user_id:login_info.user_id,
//           },
//           previewcourseid:{ 
//             project_id:previewcourseid.project_id,
//             thumbnail:previewcourseid.thumbnail,
//             cataloglist:previewcourseid.cataloglist,
//           },
//         });
//       }
//       getdata() {
//         // const { login_info ,previewcourseid}=this.props;
//         var a=this.state.previewcourseid.project_id;
//         var access_token=this.state.login_info.access_token;
//         var data = {
//             "_id" :a.toString(),
//         };
//         console.log('进入researchByCourseId接口');
//         console.log("this.state.login_info.access_token",access_token)
//         $.ajax({
//           url: "http://"+localhost+":3000/api/researchByCourseId",
//           // async:false,
//           type: "GET",
//           contentType:"application/json;charset=UTF-8",
//           dataType: "json",
//           data:data,
//           beforeSend:function(request){
//             request.setRequestHeader("Authorization",'Bearer '+access_token);
//           },
//           success: function(data) {
//             if (data.errorCode === 0) {
//               console.log('获取查询权限111');
//               console.log(data);
//              data.msg&&data.msg[0]&&data.msg[0].catalog&&data.msg[0].catalog.children&&this.setState({   
//                 fileSize:data.msg[0].fileSize,
//                 scope:data.msg[0].scope,
//                 addTime:data.msg[0].addTime,
//                 views: data.msg[0].views,
//                 thumbnail:this.state.previewcourseid.thumbnail,
//                 cataloglist:this.state.previewcourseid.cataloglist,
//               });
//             }
//             else {   
//               console.log('获取查询权限2222');
               
//             }
//           }.bind(this),
//           error: function (xhr, status, err) {
//           }
//         });
//       }
//       downloadcoursedata() {
//         // const { login_info ,previewcourseid}=this.props;
//         var a=this.state.previewcourseid.project_id;
//         var access_token=this.state.login_info.access_token;
//         var data = {
//             "_id" :a.toString(),
//         };
//         console.log('进入downloadCourse接口');
//         $.ajax({
//           url: "http://"+localhost+":3000/api/downloadCourse",
//           // async:false,
//           type: "GET",
//           contentType:"application/json;charset=UTF-8",
//           dataType: "json",
//           data:data,
//           beforeSend:function(request){
//             request.setRequestHeader("Authorization",'Bearer '+ access_token);
//           },
//           success: function(data) {
//             if (data.errorCode === 0) {
//               console.log('下载成功111');
//               console.log(data);
//               message.success('下载成功，请到桌面区查看课件压缩包~');
//             }
//             else {   
//               console.log('下载成功2222');
               
//             }
//           },
//           error: function (xhr, status, err) {
//           }
//         });
//       }
//       getuserdata() {
//         // const { login_info }=this.props;
//         console.log('进入getuserdata ajax');
//         // console.log(login_info.access_token);
//         var access_token=this.state.login_info.access_token;
//         $.ajax({
//           url: "http://"+localhost+":3000/api/getPersonalInfo",
//           data:"user_id="+this.state.login_info.user_id,
//           beforeSend:function(request){
//             request.setRequestHeader("Authorization",'Bearer '+access_token);
//           },
//           type: "GET",
//           dataType: "json",
//           // async:false,
//           success: function (data) {
//             if (data.errorCode === 1) {
//               console.log('获取用户个人信息1111');
//               console.log(data);
//               this.setState({
//                 nick_name:data.msg.nick_name,
//                 position:data.msg.position,
//                 city:data.msg.city,
//                 sexy:data.msg.sexy,
//                 description:data.msg.description,
//               });
//             }
//             else {   
//               console.log('获取查询权限2222');
//               this.setState({
//                 nick_name:data.msg.nick_name,
//                 position:data.msg.position,
//                 city:data.msg.city,
//                 sexy:data.msg.sexy,
//                 description:data.msg.description,
//               });
//             }
//           }.bind(this),
//           error: function (xhr, status, err) {
//           }
//         });
//       }
//       pageChoose = (Xst) => {
//         this.setState({
//           page: Xst,
//         });
//         console.log(Xst)
//       }
//       componentWillMount(){
//         this.getprops();
//         setTimeout(() => {
//           this.getdata();
//           this.getuserdata();
//         }, 1000); 
//       }
//     render() { 
//       console.log("login...",this.state.login_info)
//       console.log("login...",this.state.thumbnail)
//       return (
//       <Layout style={{ backgroundColor: '#fff',height:'100%',width:'100%' }}> 
//         <div className="flowbar" style={{right:10,top:20}}>      
//         <Link to='/App'><Button type="primary" >
//            <Icon type="edit" className="iconsize"/>
//          </Button></Link>
//         </div>
//         <div className="flowbar" style={{right:80,top:20}}>      
//          <Button onClick={this.downloadcoursedata.bind(this)} type="primary"  className="iconsize" >
//            下载
//          </Button>
//         </div>
//       <Card  style={{height:'100%',width:'100%'}}>
//         <div>
//          <Row gutter={16}>
//          {/* <Col span={3}>
//            <Card style={{margin:'80px 0px 30px 80px',width:"100%",height: 700}} title="缩略图">
//               <DrawView pageChoose={this.pageChoose} thumbnail={this.state.thumbnail}/>
//            </Card>
//          </Col> */}
//          <Col span={17}>
//            <Card style={{margin:'80px 0px 30px 80px',width:"100%",height:"100%"}} title="显示区">
//            {/* <Editor getThumbnail={this.handleThumbnail} objectList={isflush&&this.props.initContent} sync = {this.props.sync} isSingleMode ={this.props.isSingleMode} message={this.props.message} toServe={this.props.toServe} clearMsg = {this.props.clearMsg} shouldCreateSocket = {this.props.shouldCreateSocket} effect_createSocket = {this.props.effect_createSocket} project_id_now = {this.props.project_id_now}/>/> */}
//             <DrawViewcopy cataloglist={this.state.previewcourseid.cataloglist} pageChoose={this.pageChoose} thumbnail={this.state.previewcourseid.thumbnail}/>
//             </Card>
//          </Col>
//          <Col span={4}>
//            <Card style={{margin:'80px 0px 30px 80px',width:"100%",height:"100%"}} title="课件详情">
//            <Row gutter={16}>
//               <Col span={8}>
//                 <Avatar style={{width:70,height:70}}
//                   size="large"
//                   src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
//                 />
//               </Col>
//               <Col span={16}>
//                 <div className="head_one">{this.state.nick_name}</div>
//                 <div className="head_two">作者</div>
//               </Col>
//             </Row>
//                    <Form >
//                       <FormItem label="浏览量" {...formItemLayout} >
//                            {this.state.views}
//                       </FormItem>
//                       <FormItem label="文件大小"  {...formItemLayout}>
//                            {this.state.fileSize}
//                       </FormItem>
//                       <FormItem label="类别"  {...formItemLayout}>
//                            {this.state.scope}
//                       </FormItem>
//                       <FormItem label="发布时间" {...formItemLayout} >
//                            {this.state.addTime}
//                       </FormItem>
//                       <FormItem label="页数" {...formItemLayout} >
//                            7
//                       </FormItem>
//                   </Form>
//             </Card>
//          </Col>
//          </Row>
//         </div>
//       </Card>
//       </Layout>
//       );
//     }
//   }
//   const Previewcourse_Index=Form.create()(Previewcourse);
//   function  mapStateToProps(state) {
//     return{
//        login_info:state.reducer_login.login_info,
//        previewcourseid:state.reducer_previewcourseid.previewcourseid,
//     };
//   }
//   function mapDispatchToProps(dispatch){
//     return{
//       setCreatecourseState: (state) => dispatch(state),
//     };
//   }
//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   )(Previewcourse_Index);

import React, { Component } from 'react';
import { Card, Row, Col,Icon ,Button,Form,Avatar,Divider, Comment, List, Input,message} from 'antd';
import PropTypes from "prop-types";
import $ from 'jquery';
import {Link} from 'react-router-dom'
import {localhost} from '../../config'
import { connect } from 'react-redux';
import moment from 'moment';
function deepClone(obj){
  let _obj = JSON.stringify(obj);
  return JSON.parse(_obj)
}
const TextArea = Input.TextArea;

const { Meta } = Card;
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
  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : '评论数'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          添加评论
        </Button>
      </Form.Item>
    </div>
  );
class Preview extends Component {
  static contextTypes={
    router:PropTypes.object
  }
  constructor(props,context){
    super(props,context);
    this.state = {
      current: 0,
      step_content: [],
      recomcourselength:7,
      allcoursedata:[],
      coursedata:{
        createCourse_info:[],
        course_id:"",
      },
      comments: [],
     submitting: false,
     value: '',
     imgurl:["https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png","https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png","https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png","https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png" ],
    };
  }
        getprops(){
        const { login_info ,previewcourseid}=this.props;
        this.setState({
          login_info:{
            username:login_info.username,
            access_token:login_info.access_token,
            user_id:login_info.user_id,
          },
          previewcourseid:{ 
            project_id:previewcourseid.project_id,
            allcoursedata:previewcourseid.allcoursedata,
            // thumbnail:previewcourseid.thumbnail,
            // cataloglist:previewcourseid.cataloglist,
          },
          allcoursedata:previewcourseid.allcoursedata,
        });
      }
      updatecourse = () =>{
        // const know=this.state.knowledgelist;
        // var knowsource=[];
        // for(var i=0;i<know.length;i++){
        //    var obj=know[i];
        //    knowsource.push(obj.title);
        // };
        const { login_info }=this.props;
          var temp = deepClone(this.state.coursedata)
        var passbydata = this.state.coursedata.createCourse_info
     
     var formData = deepClone(passbydata)

      delete formData.slides

      delete formData.thumbnail

      formData.courseName=this.state.courseName
      formData.grade=this.state.grade
      formData.subject=this.state.subject
      formData.descript=this.state.descript
      formData.knowledges=this.state.knowledges
      formData.children=this.state.coursecatalog
      formData.isOpen=this.state.isOpen

      formData.name = temp.createCourse_info.catalog.name
      formData.width = temp.createCourse_info.thumbnail.style.width

      formData.height = temp.createCourse_info.thumbnail.style.height

      formData.url = temp.createCourse_info.thumbnail.url
    
      formData.slide =  [...temp.createCourse_info.slides.slide]

      formData.templateId = deepClone(temp.createCourse_info.slides.templateId) 
    
           console.log(JSON.stringify(formData))
        
        //更新课件
        console.log("进入更新课件ajax");
        const {setCreatecourseState} = this.props;

        $.ajax({
            url: "http://"+localhost+":3000/api/updateCourse",
            async:false,
            type: "PUT",
            contentType:"application/json;charset=UTF-8",
            accepts:"application/json;charset=UTF-8",
            dataType: "json",
            data:JSON.stringify(formData),
            beforeSend:function(request){
              request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
            },
            success: function (data) {
                if (data.errorCode === 0) {
                    console.log('成功更新课件:',data);
                    message.success('进入课件详情~');
                    console.log(this.state.coursecatalog);
                    setCreatecourseState({
                        type:'createcourseSuccess',
                        payload:{
                            createCourse_info:data.msg[0],
                            course_id:data.msg[0]._id,
                            // numchat:false,
                        }
                      });
                      this.context.router.history.push("/Edit");
                }
                else {
                    console.log('成功更新课件');
                    console.log(data.msg);
                }
            }.bind(this),
            error: function (xhr, status, err) {
              console.log("更新课件操作错误")
            }
        });
    }
    getcoursedata() {
        const { login_info}=this.props;
        var a=this.state.previewcourseid.project_id;
        var data = {
            "_id" :a.toString(),
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
              console.log(data);
              // const a=data.msg[0].knowledges;
              // const knowcontain=[];
              // for(var i=0;i<a.length;i++){
              // const coursecatalog1 = {};   
              // coursecatalog1['title'] = a[i];
              // knowcontain.push(coursecatalog1);
              // }
            
             data.msg&&data.msg[0]&&data.msg[0].catalog&&data.msg[0].catalog.children&&this.setState({
                coursedata:{
                  createCourse_info:data.msg[0],
                  course_id:data.msg[0]._id},
                arrSize: data.msg[0].catalog.children.length,
                isOpen:data.msg[0].isOpen,
                coursecatalog:data.msg[0].catalog.children,
                courseName:data.msg[0].courseName,
                grade: data.msg[0].grade,
                subject: data.msg[0].subject,
                descript: data.msg[0].descript,
                knowledges:data.msg[0].knowledges,
                // knowledgelist:knowcontain,
                templateId:data.msg[0].slides.templateId,
                slide: data.msg[0].slides.slide,     
                fileSize:data.msg[0].fileSize,
                scope:data.msg[0].scope,
                addTime:data.msg[0].addTime,
                views: data.msg[0].views,
                url:data.msg[0].thumbnail.url,
                width:data.msg[0].thumbnail.style.width,
                height:data.msg[0].thumbnail.style.height
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
      getdata() {
        // const { login_info ,previewcourseid}=this.props;
        var a=this.state.previewcourseid.project_id;
        var access_token=this.state.login_info.access_token;
        var data = {
            "_id" :a.toString(),
        };
        console.log('进入researchByCourseId接口');
        console.log("this.state.login_info.access_token",access_token)
        $.ajax({
          url: "http://"+localhost+":3000/api/researchByCourseId",
          // async:false,
          type: "GET",
          contentType:"application/json;charset=UTF-8",
          dataType: "json",
          data:data,
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+access_token);
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
                courseName:data.msg[0].courseName,
                descript:data.msg[0].descript,
                slideslength:data.msg[0].slides.slide.length,
                // thumbnail:this.state.previewcourseid.thumbnail,
                // cataloglist:this.state.previewcourseid.cataloglist,
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
        // const { login_info ,previewcourseid}=this.props;
        var a=this.state.previewcourseid.project_id;
        var access_token=this.state.login_info.access_token;
        var data = {
            "_id" :a.toString(),
        };
        console.log('进入downloadCourse接口');
        $.ajax({
          url: "http://"+localhost+":3000/api/downloadCourse",
          // async:false,
          type: "GET",
          contentType:"application/json;charset=UTF-8",
          dataType: "json",
          data:data,
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+ access_token);
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
          },
          error: function (xhr, status, err) {
          }
        });
      }
      getuserdata() {
        // const { login_info }=this.props;
        console.log('进入getuserdata ajax');
        // console.log(login_info.access_token);
        var access_token=this.state.login_info.access_token;
        $.ajax({
          url: "http://"+localhost+":3000/api/getPersonalInfo",
          data:"user_id="+this.state.login_info.user_id,
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+access_token);
          },
          type: "GET",
          dataType: "json",
          // async:false,
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
      // getallcoursedata() {
      //   const { login_info }=this.props;
      //   console.log('进入allCouse接口');
      //   $.ajax({
      //     url: "http://"+localhost+":3000/api/allCourses",
      //     // async:false,
      //     type: "GET",
      //     contentType:"application/json;charset=UTF-8",
      //     dataType: "json",
      //     data:{},
      //     beforeSend:function(request){
      //       request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      //     },
      //     success: function(data) {
      //       if (data.errorCode === 0) {
      //         console.log('获取查询权限111');
      //         this.setState({
      //           allcoursedata:data.msg,
      //         });
      //       }
      //       else {   
      //         console.log('获取查询权限2222');
      //       }
      //     }.bind(this),
      //     error: function (xhr, status, err) {
      //     }
      //   });
      // }
        componentWillMount(){
        this.getprops();
        setTimeout(() => {
          this.getdata();
          this.getuserdata();
          this.getcoursedata();
          // this.getallcoursedata();
        }, 1000); 
      }
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author:this.state.nick_name,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };
  magnify_preview = () => {
    const { setCreatecourseState} = this.props;
    setCreatecourseState({
      type:'createcourseSuccess',
      payload:{
          createCourse_info:this.state.coursedata.createCourse_info,
          course_id:this.state.coursedata.course_id,
          // numchat:false,
      }
    });
  }
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
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
  render() {
    const { comments, submitting, value } = this.state;
    const allcourseList = this.state.allcoursedata.map((v, i) => {
      return (
        <div>
             <Row gutter={16}>
           <Col span={8}>
            <Card
              style={{ width:200 ,height:220}}
              cover={
                <img onClick={this.handleOk_preview.bind(this,v._id)}
                  alt="example"
                  src={this.state.imgurl[i%4]} height="100"
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
            </Card>
        </Col>
        </Row>
        </div>
      );}
    );
    //   const recomcourselist=[];
    // for (let i = 0; i < this.state.recomcourselength; i++) {
    //     recomcourselist.push(
    //         <div>
    //         <Row gutter={16}>
    //       <Col span={8}>
    //        <Card
    //          style={{ width:200 ,height:220}}
    //          cover={
    //            <img 
    //              alt="example"
    //              src="https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png" height="100"
    //            />
    //          }
    //        >
    //          <Row>
    //            <Col span={24}>
    //            <Meta
    //                title="课件名称"
    //                description="描述>>>>>>>>>>"
    //             />
    //            </Col>
    //          </Row>
    //          <br />
    //          <Row >
    //            <Col span={1}></Col>
    //            <Col span={8}><Icon type="message" />2534</Col>
    //            <Col span={7}><Icon type="heart" />12万</Col>
    //            <Col span={7}><Icon type="share-alt" />367</Col>
    //            <Col span={1}></Col>
    //          </Row>
    //        </Card>
    //    </Col>
    //    </Row>
    //    </div>
    // );
    //   }

    return (
      <div style={{overflow:"scroll"}}>
      <Row style={{margin:"20px 20px 0px 20px",height:"100%"}}>
    
      <Col span={17} style={{textAlign:"right"}}>
      <img alt="example"src="https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png" height="550px"/>
      <div style={{position:"absolute",bottom:"0%",right:"1%",zIndex:"99",fontSize:"42px"}}> 
       <Link to="/MagnifyPreview"><Icon type="fullscreen" onClick={this.magnify_preview()}/></Link>
      </div>         
      </Col>
      <Col span={7} style={{textAlign:"left"}}>
      <Card title="课件详情">
           <Row gutter={16}>
              <Col span={8}>
                <Avatar style={{width:70,height:70}}
                  size="large"
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                />
              </Col>
              <Col span={16}>
                <div style={{fontSize:"20px",margin:"8px 8px 8px 8px"}}>{this.state.nick_name}</div>
                <div style={{fontSize:"16px",margin:"8px 8px 8px 8px"}}>作者</div>
              </Col>
            </Row>
                   <Form >
                      <FormItem style={{ marginBottom: '0px' }} label="浏览量" {...formItemLayout} >
                      {this.state.views}
                      </FormItem>
                      <FormItem style={{ marginBottom: '0px' }} label="文件大小"  {...formItemLayout}>
                      {this.state.fileSize}
                      </FormItem>
                      <FormItem style={{ marginBottom: '0px' }} label="类别"  {...formItemLayout}>
                      {this.state.scope}
                      </FormItem>
                      <FormItem style={{ marginBottom: '0px' }} label="发布时间" {...formItemLayout} >
                      {this.state.addTime}
                      </FormItem>
                      <FormItem style={{ marginBottom: '0px' }} label="页数" {...formItemLayout} >
                      {this.state.slideslength}
                      </FormItem>
                      <FormItem style={{ marginBottom: '0px' }} label="名称" {...formItemLayout} >
                      {this.state.courseName}
                      </FormItem>
                      <FormItem style={{ marginBottom: '0px' }} label="简介" {...formItemLayout} >
                      {this.state.descript}
                      </FormItem>
                  </Form>
            </Card>
        <Divider>你可以对课件进行以下操作</Divider>
       <Row  style={{margin:"0px 0px 0px 10px"}}>
        <Col span={4} style={{textAlign:"center",fontSize:"14px"}}>
        <Icon type="download" style={{fontSize:"20px"}} onClick={this.downloadcoursedata.bind(this)}/>
          <div>下载</div>
         </Col>
         <Col span={4} style={{textAlign:"center",fontSize:"14px"}}>
         <Icon type="like" style={{fontSize:"20px"}}/>
          <div>点赞</div>
         </Col>
         <Col span={4} style={{textAlign:"center",fontSize:"14px"}}>
         <Icon type="share-alt"  style={{fontSize:"20px"}}/>
          <div>分享</div>
         </Col>
         <Col span={4} style={{textAlign:"center",fontSize:"14px"}}>
         <Icon type="edit" style={{fontSize:"20px"}} onClick={this.updatecourse}/>
          <div>编辑</div>
         </Col>
       </Row>
      </Col>
      </Row>
      <Row>
      <Divider>相关课件推荐</Divider>  
      <Row style={{margin:"0px 0px 0px 20px"}}>
        <Col span={4}>
        {allcourseList[0]}
       </Col>
       <Col span={4}>
        {allcourseList[1]}
       </Col>
       <Col span={4}>
        {allcourseList[2]}
       </Col>
       <Col span={4}>
        {allcourseList[3]}
       </Col>
       <Col span={4}>
        {allcourseList[4]}
       </Col>
       <Col span={4}>
        {allcourseList[6]}
       </Col>
      </Row>
      </Row>
      <Row>
      <Divider>相关评论</Divider>  
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
      </Row>
      </div>
    );
  }
}

  const Previewcourse_Index=Form.create()(Preview);
  function  mapStateToProps(state) {
    return{
       login_info:state.reducer_login.login_info,
       previewcourseid:state.reducer_previewcourseid.previewcourseid,
    };
  }
  function mapDispatchToProps(dispatch){
    return{
      setCreatecourseState: (state) => dispatch(state),
      sendpreviewcourseid: (state) => dispatch(state),
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Previewcourse_Index);

