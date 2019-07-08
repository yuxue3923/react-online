import React, { Component } from 'react';
import '../../App.css';
import { Button,Layout, Card,message ,Row, Col} from 'antd';
// import {Link} from 'react-router-dom'
import $ from 'jquery';
import EchartsTest from '../../Echarts/EchartsTest';
import AddKnowledge from '../../Echarts/AddKnowledge';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {localhost} from '../../config';
const { Content, Sider } = Layout;
function deepClone(obj){
  let _obj = JSON.stringify(obj);
  return JSON.parse(_obj)
}
class Step2 extends Component {
  static contextTypes = {
    router: PropTypes.object
}
constructor(props, context) {
    super(props, context);
    this.state = {
        current: 0,
        echartsoption: {
          ifAdd: false,
          ifDelete: false,
          selectedName: '',
          seletedIndex: -1,
          selectedid: -1,
          newname: '',
          transData:true,
        }
    };

    Object.assign(this.state, this.props)
}
getdata() {
  const { login_info ,createCourse_info}=this.props;
  var a=createCourse_info.course_id;
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
        // console.log("knowcontain>>>",knowcontain);
       data.msg&&data.msg[0]&&this.setState({
          coursedata:{
            createCourse_info:data.msg[0],
            course_id:data.msg[0]._id},
          // arrSize: data.msg[0].catalog.children.length,
          // isOpen:data.msg[0].isOpen,
          // coursecatalog:data.msg[0].catalog.children,
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
formData.children=this.props.EchartsData.courselist
// formData.isOpen=this.state.isOpen

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
              // message.success('成功更新课件~');
              console.log(this.state.coursecatalog);
              setCreatecourseState({
                  type:'createcourseSuccess',
                  payload:{
                      createCourse_info:data.msg[0],
                      course_id:data.msg[0]._id,
                      // numchat:false,
                  }
                });
          }
          else {
              // console.log('成功更新课件');
              console.log(data.msg);
          }
      }.bind(this),
      error: function (xhr, status, err) {
        console.log("更新课件操作错误")
      }
  });
}
componentWillMount(){
  this.getdata();
}
handleDelete(sindex, sname, sid) {
  console.log('App_sname_delete', sname)
  this.setState({
    echartsoption: {
      ifDelete: true,
      selectedIndex: sindex,
      selectedName: sname,
      selectedid: sid,
      transData:true,
    },
  })
}
handleAdd(sindex, sname, sid, name) {
  // console.log('App_name_add', name)
  // console.log('App_sname_add', sname)
  this.setState({
    echartsoption: {
      ifAdd: true,
      selectedIndex: sindex,
      selectedName: sname,
      selectedid: sid,
      newname: name,
      transData:true,
    },
  })
}
onClick_next() {
  console.log("gggg",this.props.EchartsData.courselist)
  this.updatecourse();
  this.setState({ current: 2 })
  setTimeout(() => {
      this.props.GetStates(this.state.current)
  }, 100);
}
onClick_pre() {
  this.setState({ current: 0 })
  setTimeout(() => {
      this.props.GetStates(this.state.current)
  }, 100);
}
render() {
  return (
    <div style={{overflow:"auto",height:window.screen.availHeight-250,width:window.screen.availWidth}}>
      <div>

{/* Echarts—Tree添加节点        */}
<Layout style={{ padding: '10px 0', background: '#fff' }}>
<Sider width={900} height={550} style={{ background: '#fff', paddingLeft: '15px', paddingTop: '30px' }}>
  <Card>
    <EchartsTest eventsOption={this.state.echartsoption}></EchartsTest>
    {/* <EchartsTest/> */}
  </Card>
</Sider>

<Content width={500} height={550} style={{ padding: '0 24px', minHeight: 450 }}>
  <AddKnowledge handleAdd={this.handleAdd.bind(this)} handleDelete={this.handleDelete.bind(this)}></AddKnowledge  >
  {/* <AddKnowledge/>  */}

</Content>
</Layout>
</div>
    <div className="App">
        <Button onClick={this.onClick_next.bind(this)} type="primary">下一步</Button>
        <Button onClick={this.onClick_pre.bind(this)} >上一步</Button>
    </div>
    </div>
  );
}
}
function mapStateToProps(state) {
  return {
    EchartsData: state.reducer_echartsecdata.echartsecdata,
    login_info:state.reducer_login.login_info,
    createCourse_info:state.reducer_createcourse.createCourse_info,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setCreatecourseState: (state) => dispatch(state),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2);
