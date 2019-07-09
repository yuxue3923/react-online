import React, { Component } from 'react';
import '../../App.css';
import { Button, Card, Col, Row } from 'antd';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from "prop-types";
class Step3 extends Component {
  static contextTypes = {
    router: PropTypes.object
}
constructor(props, context) {
    super(props, context);
    this.state = {
        current: 0,
    };

    Object.assign(this.state, this.props)
}
onClick_pre() {
  this.setState({ current: 1 })
  setTimeout(() => {
      this.props.GetStates(this.state.current)
  }, 100);
}
 
  render() {
    return (
      <div  style={{overflow:"auto",height:window.screen.availHeight-200,width:window.screen.availWidth}}>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
  <Row gutter={16} style={{ padding: '15px' }}>
  <Col span={8}>
  <Card title="模板一" bordered={false}>
        
        <img src="http://www.51pptmoban.com/d/file/2014/05/13/8e3835e50c35284e063bdc6b1954a56d.jpg" width="330px" height="250px"/>
    </Card>
    </Col>
    
    <Col span={8}>
    <Card title="模板二" bordered={false}>
        
        <img src="http://pic.pptbz.com/pptpic/201305/2013053106482057.jpg" width="330px" height="250px"/>
    </Card>
    </Col>
    <Col span={8}>
    <Card title="模版三" bordered={false}>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560230529413&di=12b0aecc1df32bcd5f2fd73f0dfce7d1&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20150204%2Fqingxinsuyashuyebiankuangppt_3868316.jpg"  width="330px" height="250px"/>
        </Card>
    </Col>
  </Row>
  <Row gutter={16} style={{ padding: '15px' }}>
    <Col span={8}>
    <Card title="模板四" bordered={false}>
        <img src="http://img1.cache.netease.com/catchpic/8/81/810767CBDFA8FC94B45EC39F959E22AF.jpg"  width="330px" height="250px"/>
        </Card>
    </Col>
    <Col span={8}>
    <Card title="模板五" bordered={false}>
        <img src="http://y2.ifengimg.com/f81f638e5fa13a9e/2014/1015/rdn_543dd6539da5e.jpg"  width="330px" height="250px"/>
        </Card>
    </Col>
    <Col span={8}>
    <Card title="模板六" bordered={false}>
        <img src="http://s3.sinaimg.cn/orignal/001ZsBWbgy72iIMWcnw12"  width="330px" height="250px"/>
        </Card>
    </Col>
  </Row>
</div>
      <div className="App" style={{ padding: '15px' }}>
          {/* <div style={{fontSize:25,}}>步骤3</div> */}
          <Link to='/Edit'><Button type="primary">完成</Button> </Link>
          <Button onClick={this.onClick_pre.bind(this)}>上一步</Button>
      </div>
      </div>
    );
  }
}


  export default Step3;