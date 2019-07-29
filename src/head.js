import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';

import picurl from './hd_logo.jpg'
class AppIndex extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "",
    }
  }
  
  render() {
    return (
      <div>
        {/* <Row style={{ background: "#EEC591", width: "100%" }}>
          <Col span={12} style={{ textAlign: 'right' }}>  <img alt="logo" src={picurl} /> </Col>
          <Col span={12} style={{ textAlign: 'left', marginTop: '25px' }}>
            <span style={{ fontSize: '45px', color: '#fff', fontFamily: 'STKaiti', fontWeight: 'bold' }}>  在线协同研习系统</span>
          </Col>
        </Row> */}
        {/* <Row> */}
         
            {/* <div> */}
              {this.props.children}
            {/* </div> */}
         
        {/* </Row> */}
      </div>
    );
  }
}
export default AppIndex;
