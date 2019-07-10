import React, { Component } from 'react';
import '../../App.css';
import { Button, Card, Col, Row } from 'antd';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {localhost} from '../../config'
import axios from 'axios'
var testUrl = [];
var initialData =[];
function deepClone(obj){
  let _obj = JSON.stringify(obj);
  return JSON.parse(_obj)
}

class Step3 extends Component {
  static contextTypes = {
    router: PropTypes.object
}
constructor(props, context) {
    super(props, context);
    this.state = {
        current: 0,
        delay:false,
        choose:false,
    };

    Object.assign(this.state, this.props)
}
onClick_pre() {
  this.setState({ current: 1 })
  setTimeout(() => {
      this.props.GetStates(this.state.current)
  }, 100);
}
 complete=(i)=>{
  const {setCreatecourseState,login_info,createCourse_info} = this.props;
  var temp = deepClone(createCourse_info.createCourse_info);
  
  temp.slides=initialData[i] && initialData[i].slides
  /* axios.post("http://"+localhost+":3000/api/createCourse",{headers: {"Authorization":'Bearer '+login_info.access_token}}) */
  initialData[i] && setCreatecourseState({
    type:'createcourseSuccess',
    payload:{
      createCourse_info:temp
      // numchat:true,
    }
  }); 
  this.context.router.history.push("/Edit");
 }
 componentWillMount(){
    const { login_info } = this.props;
    axios.get("http://"+localhost+":3000/api/allTemplates",{headers: {"Authorization":'Bearer '+login_info.access_token}})
    .then((response)=>{
      console.log(response.data.msg)
      initialData = response.data.msg
      response.data.msg.map((v,i)=>{testUrl[i]=v.slides.slide[0].pageThumbnail})
      this.setState({delay:true})
    })
    .catch(function (error) {
      console.log(error);
    });
 }
  render() {

    return (
      <div  style={{overflow:"auto",height:window.screen.availHeight-200,width:window.screen.availWidth}}>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
  <Row gutter={16} style={{ padding: '15px' }}>
 {
  ["模板一","模板二","模板三","模板四","空白模板","模板五"].map((v,i)=>(
      <Col span={8} onClick={()=>this.setState({choose:i})}>
      <Card title={v} bordered={true} bodyStyle={this.state.choose===i?{boxShadow:"3px 3px 20px #888888"}:{}}>
            <img src={testUrl[i]||""} width="330px" height="250px" alt="" />
        </Card>
        </Col>
     ))
  }
  
  </Row>
</div>
      <div className="App" style={{ padding: '15px' }}>
          {/* <div style={{fontSize:25,}}>步骤3</div> */}
          <Button type="primary" onClick={this.complete.bind(this,this.state.choose)}>完成</Button>
          <Button onClick={this.onClick_pre.bind(this)}>上一步</Button>
      </div>
      </div>
    );
  }
}


function  mapStateToProps(state) {
  return{
    login_info:state.reducer_login.login_info,
    createCourse_info:state.reducer_createcourse.createCourse_info,
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
)(Step3);