import React, { Component } from 'react';
import {Form, Card, Row, Col, Layout, Steps,message } from 'antd';
import Step1 from './step1.js'
import Step2 from './step2.js'
import Step3 from './step3.js'
import PropTypes from "prop-types";
import $ from 'jquery';
import {localhost} from '../../config'
import { connect } from 'react-redux';
const Step = Steps.Step;

const steps = [{
  title: '第一步',
  description:'填写课件基本信息',
}, {
  title: '第二步',
  description:'自动生成课件目录',
}, {
  title: '第三步',
  description:'选择课件模版',
}];

class pagefirst extends Component {
  static contextTypes={
    router:PropTypes.object
  }
  constructor(props,context){
    super(props,context);
    this.state = {
      current: 0,
      step_content: [],
    };
    Object.assign(this.state, this.props)
    this.handleClick1 = this.handleClick1.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
  }
  handleClick1(current) {
    console.log(current)
    this.setState({ current: current })
  }
  handleClick2(current) {
    console.log(current)
    this.setState({ current: current })
  }
  handleClick3(current) {
    console.log(current)
    this.setState({ current: current })
  }

  componentWillMount() {
    const step1 = (<div><Step1 GetStates={this.handleClick1.bind(this)} /></div>)
    const step2 = (<div><Step2 GetStates={this.handleClick2.bind(this)} /></div>)
    const step3 = (<div><Step3 GetStates={this.handleClick3.bind(this)} /></div>)
    this.state.step_content.push(step1)
    this.state.step_content.push(step2)
    this.state.step_content.push(step3)
  }

  createcourse = () =>{
    const know=this.state.knowledgelist;
    var knowsource=[];
    for(var i=0;i<know.length;i++){
       var obj=know[i];
       knowsource.push(obj.title);
    };
    console.log(knowsource)
    const { login_info }=this.props;
    var data={
     "user_id":login_info.user_id,
      "courseName":this.state.courseName,
      "grade": this.state.grade,
      "subject": this.state.subject,
      "descript":  this.state.descript,
      "knowledges":knowsource,
      "isOpen": this.state.isOpen,
      "isEdit": 1,
      "name": "课件目录",
      "children":this.state.coursecatalog,
      "templateId": 1,
      "slide": [{
          "pageId": 1,
          "pageThumbnail": {
              "pageurl": "./1.png",
              "style": {
                  "pagewidth": "100px",
                  "pageheight": "100px"
              }
          },
          "media":[
              {
                  "id":2314,
                  "position":[0,0],
                  "rotation":0,
                  "scale":[1,1],
                  "shape":{"cx":100,"cy":100,"n":30,"z":40},
                  "style":{"fill":"none"},
                  "type":"house"
              }
          ]
      }],     
      "fileSize": "100M",
      "scope": "k12教育",
      "addTime": new Date(),
      "views": 300,
      "url": "D:/Graduate/11.jpg",
      "width": "30px",
      "height": "40px"
  };
   
    //创建课件
    console.log("进入ajax") 
    const {setCreatecourseState} = this.props;
    $.ajax({
        url: "http://"+localhost+":3000/api/createCourse",
        async:false,
        type: "POST",
        contentType:"application/json;charset=UTF-8",
        accepts:"application/json;charset=UTF-8",
        dataType: "json",
        data:JSON.stringify(data),
        beforeSend:function(request){
          request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
        },
        success: function (data) {
            if (data.errorCode === 0) {
                console.log('成功保存课件');
                console.log(data.msg);
                console.log(data.msg._id);
                message.success('成功创建课件！');
               
                setCreatecourseState({
                  type:'createcourseSuccess',
                  payload:{
                    createCourse_info:data.msg,
                    course_id:data.msg._id,
                    // numchat:false,
                  }
                });
                this.context.router.history.push("/APP");

            }
            else {
                console.log('成功获取搜索资源');
                // this.setState({ resource: data.msg });
                console.log(data.msg);
            }
        }.bind(this),
        error: function (xhr, status, err) {
          console.log("取回课件数据错误")
        }
    });
}

getknowledgeRel(value) {
  const { login_info }=this.props;
  console.log('进入knowledgeRel ajax');
  console.log(login_info.access_token);
  $.ajax({
    url: "http://"+localhost+":3000/api/knowledgeRel",
    data:"courseName="+value,
    beforeSend:function(request){
      request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
    },
    type: "GET",
    dataType: "json",
    async:false,
    success: function (data) {
      if (data.errorCode === 0) {
        console.log('获取关联知识点');
        console.log(data);
        if(data.msg){
        this.setState({
          knowledgelist:data.msg,
        });
      }
      }
      else {   
        console.log('获取关联知识点2222');
      }
    }.bind(this),
    error: function (xhr, status, err) {
    }
  });
}



  render() {
    const { current } = this.state;
    return (
      <div >
        <Layout style={{ padding: '10px 0', backgroundColor: "#fff" }}>
          <Row>
            {/* <Col span={2}></Col>
            <Col span={20}> */}
              <Card bordered={false}>
                <div>
                  <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} description={item.description}/>)}
                  </Steps>
                  <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    {this.state.step_content[current]}
                  </div>
                </div>
              </Card>
            {/* </Col>
            <Col span={2}></Col> */}
          </Row>
        </Layout>
      </div>
    );
  }
}
const pagefirst_Index=Form.create()(pagefirst);
  function  mapStateToProps(state) {
    return{
       login_info:state.reducer_login.login_info,
     //  user_info:state.reducer_user.user_info,
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
  )(pagefirst_Index);
