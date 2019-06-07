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
    const cardchild=(
      <Card title="Card title" bordered={false}>
          Card content
      </Card>
    );
    return (
      <div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={16} style={{ padding: '15px' }}>
      <Col span={8}>
        {cardchild}
      </Col>
      <Col span={8}>
        {cardchild}
      </Col>
      <Col span={8}>
       {cardchild}
      </Col>
    </Row>
    <Row gutter={16} style={{ padding: '15px' }}>
      <Col span={8}>
        {cardchild}
      </Col>
      <Col span={8}>
        {cardchild}
      </Col>
      <Col span={8}>
       {cardchild}
      </Col>
    </Row>
  </div>
      <div className="App" style={{ padding: '15px' }}>
          {/* <div style={{fontSize:25,}}>步骤3</div> */}
          <Link to='/APP'><Button type="primary">完成</Button> </Link>
          <Button onClick={this.onClick_pre.bind(this)}>上一步</Button>
      </div>
      </div>
    );
  }
}


  export default Step3;