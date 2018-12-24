import React, { Component } from 'react';
import { Popover,Button,Card,Row,Col } from 'antd';
import Editor from './canvaslib'
import './editbutton.css';
import btnsquare from "../../btnpic/btnsquare.png";
import btncircle from "../../btnpic/btncircle.png";
import btnstarf from "../../btnpic/btnstarf.png";
import btnstars from "../../btnpic/btnstars.png";
import btnstart from "../../btnpic/btnstart.png";

import house from "../../btnpic/house.png";
import apple from "../../btnpic/apple.png";
var content1 = function(fn){
   return (
    <div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="align-center" onClick={fn}></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="align-left"></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="align-right"></Button>
          </div> 
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="bold"></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="italic"></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="underline"></Button>
          </div> 
    </div>
  );
}

const sgraph =function(fn){
    return (
    <div>
          <div style={{margin:'1px'}} >
             <img src={btnsquare} alt=''  />
          </div>
          <div style={{margin:'1px'}} onClick={fn}>
             <img src={btncircle} alt='' />
          </div>
          <div style={{margin:'1px'}} >
             <img src={btnstarf} alt=''  />
          </div>
          <div style={{margin:'1px'}} >
             <img src={btnstars} alt=''  />
          </div>
          <div style={{margin:'1px'}} >
             <img src={btnstart} alt=''  />
          </div>
    </div>
   );
}
const dgraph =(
    <div>
          <div style={{margin:'1px'}}>
             <img src={house} alt='' width='50px' />
          </div>
          <div style={{margin:'1px'}}>
             <img src={apple} alt='' width='50px' />
          </div>
    </div>
   );
  class EditorWithBar extends Component {
    constructor(props, context) {
        super(props, context)
       // this.initPie = this.initPie.bind(this)
        this.state = {
            addType:'none',
          //  fromSr:{},
        }
        this.fromSr={}
        this.handleThumbnail=this.handleThumbnail.bind(this)
    }
    add(type){
        this.setState({
            addType:type
        })
    }
    handleThumbnail(pic){
        this.fromSr=pic


    }
    componentDidUpdate(){
        console.log(this.fromSr)
    }
    componentWillUpdate(){
       
    }
    render() {
        console.log("xuanran")
        
      return (
        
        <div>
        <Row >
        <Col span={1}>
          <div className="flowbutton">
          <div style={{margin:'1px'}}>
          <Popover placement="rightTop" content={dgraph} trigger="click">
              <Button type="primary" icon="appstore" ></Button>
          </Popover> 
          </div>
          <div style={{margin:'1px'}}>
          <Popover placement="rightTop" content={ sgraph(this.add.bind(this,'circle'))} trigger="click">
             <Button type="primary" icon="form" ></Button>
          </Popover>
          </div> 
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="highlight" onClick={this.add.bind(this,'pen')}></Button>
          </div>
          <div style={{margin:'1px'}} >
          <Popover placement="rightTop" content={ content1(this.add.bind(this,'circle'))} trigger="click">
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
               <Button type="primary" icon="dash"></Button>
          </div> 
          </div>
          </Col>
          <Col span={23}> <Editor type={this.state.addType} getThumbnail={this.handleThumbnail}/></Col>
        </Row>
        </div>
      );
    }
  }

  export default EditorWithBar;