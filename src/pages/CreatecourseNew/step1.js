import React, { Component } from 'react';
import '../../App.css';
import { Modal,Button, Form,Input,Select,Divider,Drawer, Row ,Col, Tree,message } from 'antd';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import $ from 'jquery';
import { connect } from 'react-redux';
import {localhost} from '../../config';
const Option = Select.Option;
const { TreeNode } = Tree;
const { TextArea } = Input;
const dataSource_class = ["小学", "初中","高中"];
const dataSource_catalog = ["语文", "数学","英语","物理","化学","生物"]

const children_class = [];
for (let i = 0; i < dataSource_class.length; i++) {
  children_class.push(<Option value={dataSource_class[i]}>{dataSource_class[i]}</Option>);
}
const children_catalog = [];
for (let i = 0; i < dataSource_catalog.length; i++) {
  children_catalog.push(<Option value={dataSource_catalog[i]}>{dataSource_catalog[i]}</Option>);
}

class Step1 extends Component {
  static contextTypes = {
    router: PropTypes.object
}
constructor(props, context) {
    super(props, context);
    this.state = {
        current: 0,
        visible: false,
        modalvisible: false,
        coursename:"",
        class:"",
        catalog:"",
        abstract:"",
        releknowledge:"",
        releknowledgestr:[],
        knowledgelist:[],
    };

    Object.assign(this.state, this.props)
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
creatcourse = () =>{
  const { login_info }=this.props;
  var data={
   "user_id":login_info.user_id,
    "courseName":this.state.coursename,
    "grade": this.state.class,
    "subject": this.state.catalog,
    "descript":  this.state.abstract,
    "knowledges":this.state.releknowledgestr,
    // "isOpen": this.state.isOpen,
    // "isEdit": 1,
    // "name": "课件目录",
    // "children":this.state.coursecatalog,
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
              // message.success('成功创建课件！');
             
              setCreatecourseState({
                type:'createcourseSuccess',
                payload:{
                  createCourse_info:data.msg,
                  course_id:data.msg._id,
                  // numchat:false,
                }
              });
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
showDrawer = () => {
  if(this.state.coursename){
    this.getknowledgeRel(this.state.coursename);
  }else{
    this.getknowledgeRel("ttt");
  } 
  this.setState({
    visible: true,
  });
};

onClose = () => {
  this.setState({
    visible: false,
  });
};
onClick_next() {
  this.setState({ 
    modalvisible:false,
    current: 1 ,})
  setTimeout(() => {
      this.props.GetStates(this.state.current);
      this.creatcourse();
  }, 100);
}
handleSubmit(e) {
  e.preventDefault();
  this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      if(this.state.releknowledgestr.length!=0){
        console.log('Received values of form: ', values);
        this.showModal();
      }else{
        message.error("关联知识点不能为空！");
      }
      
    }
  });
};
onChange_class(value) {
  console.log(`selected ${value}`);
  this.setState({ class: value })
}
reverseString() {
  let a = this.state.releknowledge;
  console.log("需转换的字符串",a);
  
  this.setState({
    releknowledgestr:a.split(";"),
  })
  console.log("转换后的字符串数组",this.state.releknowledgestr);
}
onChange_catalog(value) {
  console.log(`selected ${value}`);
  this.setState({ catalog: value })
}
onSelect(selectedKeys, info) {
  console.log('selected', selectedKeys, info);
  console.log('selectedKeys', selectedKeys[0]);
  const newreleknowledgestr=this.state.releknowledgestr;
  newreleknowledgestr.push(selectedKeys[0]);
  console.log('newreleknowledgestr1', newreleknowledgestr);
 
  const knowledgejoin=newreleknowledgestr;

  this.setState({ 
    releknowledgestr: newreleknowledgestr ,
    releknowledge: knowledgejoin.join(';'),
  })

};

showModal = () => {
  this.setState({
    modalvisible: true,
  });
};
handleCancel = () => {
  this.setState({ modalvisible: false });
  this.creatcourse();
  this.context.router.history.push("/APP");
};



  render() {
    console.log("转换后的字符串render",this.state.releknowledgestr);
    console.log("dddd",this.state.releknowledge)
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
    };
    const treeList = this.state.knowledgelist.map((v, i) => {
      return (
        <TreeNode title={v.title} key={v.title} />
      );}
    )
    return (
      <div>
      <div style={{marginTop:"50px"}}>
        <Form>
          <Form.Item {...formItemLayout} style={{ marginBottom: '0px' }} label={<span style={{ fontWeight: 'bold' }}>课件名称</span>}  >
                        {getFieldDecorator('coursename', {
                            initialValue: this.state.coursename,
                            rules: [
                                { required: true, message: '请输入课件名称!' },
                                { min: 2, max: 15, message: '长度不在范围内(2-15个字)!' },],
                        })(
                            <Input onChange={(e) => { this.setState({ coursename: e.target.value }) }} />
                        )}
          </Form.Item>
          <Form.Item {...formItemLayout} style={{ marginBottom: '0px' }} label={<span style={{ fontWeight: 'bold' }}>年级</span>} >
                        {getFieldDecorator('class', {
                            initialValue: this.state.class,
                            rules: [{ required: true, message: '请选择年级!', whitespace: true },],
                        })(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                onChange={this.onChange_class.bind(this)}
                            >
                                {children_class}
                            </Select>
                        )}
          </Form.Item>
          <Form.Item {...formItemLayout} style={{ marginBottom: '0px' }} label={<span style={{ fontWeight: 'bold' }}>科目</span>} >
                        {getFieldDecorator('catalog', {
                            initialValue: this.state.catalog,
                            rules: [{ required: true, message: '请选择科目!', whitespace: true },],
                        })(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                onChange={this.onChange_catalog.bind(this)}
                            >
                                {children_catalog}
                            </Select>
                        )}
          </Form.Item>
          <Form.Item {...formItemLayout} style={{ marginBottom: '0px' }} label={<span style={{ fontWeight: 'bold' }}>课件简介</span>}  >
                        {getFieldDecorator('abstract', {
                            initialValue: this.state.abstract,
                            rules: [
                                { required: true, message: '请输入课件简介!' },
                                { min: 2, max: 500, message: '长度不在范围内(2-500个字)!' },],
                        })(
                          <TextArea rows={5} onChange={(e) => { this.setState({ abstract: e.target.value }) }} />
                        )}
          </Form.Item>
          <Divider>关联知识点</Divider>
          <Form.Item {...formItemLayout} style={{ marginBottom: '0px' }} label={<span style={{ fontWeight: 'bold' }}>关联知识点</span>}  >
                 <Row  gutter={8}>
                  <Col span={20}>    
                        {/* {getFieldDecorator('releknowledge', {
                            initialValue: this.state.releknowledge,
                            rules: [
                                { required: true, message: '请输入关联知识点!' },],
                        })( */}

                          <Input placeholder="请用“;”字符分隔知识点" value={this.state.releknowledge} onChange={(e) => { this.setState({ releknowledge: e.target.value });this.reverseString(); }} />
                          
                        {/* )
                        } */}
                        </Col>
                        <Col span={4}>
                        <Button type="primary" onClick={this.showDrawer}>
                          自动关联
                        </Button>
                        </Col>
                      </Row>
          </Form.Item>
        </Form>
       
        <Drawer
          title="自动检索的知识点"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
           <Tree showLine defaultExpandedKeys={['2']} onSelect={this.onSelect.bind(this)}>
        {/* <TreeNode title="parent 1" key={1}>
          <TreeNode title="parent 1-0" key={2}>
            <TreeNode title="leaf" key={1} />
            <TreeNode title="leaf" key={2} />
            <TreeNode title="leaf" key={3} />
          </TreeNode>
          <TreeNode title="parent 1-1" key={3}>
            <TreeNode title="leaf" key={1} />
          </TreeNode>
          <TreeNode title="parent 1-2" key={4}>
            <TreeNode title="leaf" key={1} />
            <TreeNode title="leaf" key={2} />
          </TreeNode>
        </TreeNode> */}
        {treeList}
      </Tree>
        </Drawer>
      </div>
      <div style={{marginTop:"50px"}} className="App">
        {/* <div style={{fontSize:25,}}>步骤1</div> */}
        <Button key="handsubmit" onClick={this.handleSubmit.bind(this)} type="primary">下一步</Button>
        <Modal
          visible={this.state.modalvisible}
          onOk={this.onClick_next.bind(this)}
          onCancel={this.handleCancel}
          footer={[
           <Button key="back" onClick={this.handleCancel}>
            手动创建
            </Button>,
            <Button key="submit" type="primary" onClick={this.onClick_next.bind(this)}>
             自动创建
           </Button>
          ]}
        >
          <p>确定创建该课件？</p>
        </Modal>
       <Link to='/Account'><Button >返回</Button></Link>
      </div>
      </div>
    );
  }
}
const Step11 = Form.create({ name: 'register' })(Step1);
function  mapStateToProps(state) {
  return{
     login_info:state.reducer_login.login_info,
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
)(Step11);
