import React, { Component } from 'react';
import '../../App.css';
import { Button,Layout, Card } from 'antd';
import {Link} from 'react-router-dom'
import EchartsTest from '../../Echarts/EchartsTest';
import AddKnowledge from '../../Echarts/AddKnowledge';
import PropTypes from "prop-types";
const { Content, Sider } = Layout;
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
        }
    };

    Object.assign(this.state, this.props)
}
handleDelete(sindex, sname, sid) {
  console.log('App_sname_delete', sname)
  this.setState({
    echartsoption: {
      ifDelete: true,
      selectedIndex: sindex,
      selectedName: sname,
      selectedid: sid,
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
    },
  })
}
onClick_next() {
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
      <div>
        <div >

{/* Echarts—Tree添加节点        */}
<Layout style={{ padding: '10px 0', background: '#fff' }}>
  <Sider width={900} style={{ background: '#fff', paddingLeft: '15px', paddingTop: '30px' }}>
    <Card>
      <EchartsTest eventsOption={this.state.echartsoption}></EchartsTest>
      {/* <EchartsTest/> */}
    </Card>
  </Sider>

  <Content width={500} style={{ padding: '0 24px', minHeight: 450 }}>
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

export default Step2;
