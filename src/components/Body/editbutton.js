import React, { Component } from 'react';
import { Popover,Button } from 'antd';
import {Link} from 'react-router-dom'
import './sider.css';
const content1 = (
    <div className="povercolor">
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="align-center"></Button>
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
  class editbutton extends Component {
    render() {
      return (
          <div className="flowbutton"> 
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="search"></Button>
          </div>
          <div style={{margin:'1px'}}>
          <Popover placement="rightTop" content={content1}>
             <Button type="primary" icon="edit"></Button>
          </Popover>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="drag"></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="scissor"></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="redo"></Button>
          </div> 
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="highlight"></Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" icon="dash"></Button>
          </div>
          </div>
      );
    }
  }

  export default editbutton;