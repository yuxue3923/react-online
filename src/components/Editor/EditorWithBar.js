import React, { Component } from 'react';
import { Popover,Button,Card,Row,Col } from 'antd';
import Editor from './canvaslib'
import './editbutton.css';
const content1 = (
    <div>
          <Row style={{margin:'1px'}}>
               <Button type="primary" icon="align-center"></Button>
          </Row>
          <Row style={{margin:'1px'}}>
               <Button type="primary" icon="align-left"></Button>
          </Row>
          <Row style={{margin:'1px'}}>
               <Button type="primary" icon="align-right"></Button>
          </Row> 
          <Row style={{margin:'1px'}}>
               <Button type="primary" icon="bold"></Button>
          </Row>
          <Row style={{margin:'1px'}}>
               <Button type="primary" icon="italic"></Button>
          </Row>
          <Row style={{margin:'1px'}}>
               <Button type="primary" icon="underline"></Button>
          </Row> 
    </div>
  );
  
  class EditorWithBar extends Component {
    constructor(props, context) {
        super(props, context)
       // this.initPie = this.initPie.bind(this)
        this.state = {
            addType:'none'
        }
    }
    add(type){
        this.setState({
            addType:type
        })
    }
    render() {
        console.log("xuanran")
      return (
        
        <div>
        <Row>
        <Col span={1}>
          <div className="flowbutton">
          <div style={{margin:'1px'}}>
              <Button type="primary" icon="search" onClick={this.add.bind(this,'circle')}></Button>
          </div>
          <div style={{margin:'1px'}} >
          <Popover placement="rightTop" content={content1} trigger="click">
             <Button type="primary" icon="edit" ></Button>
          </Popover>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="drag" ></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="scissor"></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="form" onClick={this.add.bind(this,'rect')}></Button>
          </div> 
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="highlight" onClick={this.add.bind(this,'pen')}></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="dash"></Button>
          </div> 
          </div>
          </Col>
          <Col span={23}> <Editor type={this.state.addType}/></Col>
        </Row>
        </div>
      );
    }
  }

  export default EditorWithBar;