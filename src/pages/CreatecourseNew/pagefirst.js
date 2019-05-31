import React, { Component } from 'react';
import { Card, Row, Col, Layout, Steps } from 'antd';
import Step1 from './step1.js'
import Step2 from './step2.js'
import Step3 from './step3.js'
import PropTypes from "prop-types";
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

class Create extends Component {
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

export default Create;