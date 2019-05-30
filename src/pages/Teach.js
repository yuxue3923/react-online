import React, { Component } from 'react';
import './App.css';
import PropTypes from "prop-types";
import { Button,Input, Icon ,Carousel} from 'antd';


var isVisible = true;

export default class Teach extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
           currentpage:1,
        };
    }
   
   onChange=(current)=> {
        console.log(current);
        this.setState({
            currentpage:current+1,
        });
    }
   displayNav(e){
    let pointer = this.refs.shrink;
    let x = e.screenX;
    let y = e.screenY;
       console.log(e.screenX,e.screenY)
       console.log(pointer.offsetLeft)
      
       let divx1 = pointer.offsetLeft;  
       var divy1 = pointer.offsetTop;  
       var divx2 = pointer.offsetLeft + pointer.offsetWidth;  
       var divy2 = pointer.offsetTop + pointer.offsetHeight; 
       if( x < divx1 || x > divx2 || y < divy1 || y > divy2);
        else {
            if(!isVisible){
                this.refs.shrink.style.visibility="visible";
                isVisible = true;
            }  
        }
        /* if(e.screenX<&&e.screenX>) */ 
        //this.refs.page
   }
//    onChange(a, b, c) {
//         console.log(a, b, c);
//       }
    next(){
        this.refs.Carousel.next();
    }
    prev(){
        console.log("a")
        this.refs.Carousel.prev();
    }
    shrink(){
        if(isVisible) {
            this.refs.shrink.style.visibility="hidden";
            isVisible = false;
        }
        else{
            this.refs.shrink.style.visibility="visible";
            isVisible = true;
        }
      
    }
  render(){
      return (
      <div onMouseMove={(e)=>this.displayNav(e)} ref="page">
       <div style={{position:"absolute" ,height:"auto",bottom:"0%",left:"0%",zIndex:"99"}} className="nav tool"> 
        <Button type="primary" size="small" block><Icon type="appstore"/><div>菜 单</div></Button>
        <Button type="primary" size="small" block><Icon type="appstore"/><div>最小化</div></Button>
        <Button type="primary" size="small" block className="at-right-border"><Icon type="appstore"/><div>用 户</div></Button>
      </div> 
      <div style={{position:"absolute" ,height:"auto",bottom:"0%",right:"0",zIndex:"99"}} className="nav tool"> 
        <Button type="primary" size="small" block onClick={()=>this.prev()}><Icon type="appstore"/><div>上一页</div></Button>
        <Button type="primary" size="small" block><Icon type="appstore"/><div>{this.state.currentpage}/5</div></Button>
        <Button type="primary" size="small" block className="at-right-border" onClick={()=>this.next()}><Icon type="appstore"/><div>下一页</div></Button>
      </div> 
     
      <div style={{position:"absolute" ,height:"auto",top:"30%",right:"0",zIndex:"99"}}  ref="shrink" className="nav col tool" onClick={function(){console.log("yiwaii")}}> 
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>指针</div></Button>
        <Button type="primary" size="small" block><Icon type="appstore"/><div>画笔</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>橡皮檫</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>撤销</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>学生状态</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>交流</div></Button>
        <Button type="primary" size="small" block onClick={()=>this.shrink()}><Icon className="shrink" style={{height:"12px"}} type="appstore"/></Button>
      </div> 
      
      <Carousel afterChange={this.onChange} style={{height:"100%"}} dots={false} ref="Carousel">
        <div>   
            <img src="http://bpic.588ku.com//back_origin_min_pic/19/04/16/aba3ab2789b1aea6c7412512c41e887d.jpg" alt="" height="971" width="1680"/>
        </div>
        {/* 
        wid 1680
        height 971
        */}
       
        
        <div>
            <img src="http://i2.hdslb.com/bfs/archive/582b62c6e6fea16ed2dc1973073d4cd64f72e7d0.jpg" alt="" height="971" width="1680"/>
        </div>
        <div>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" alt="" height="971" width="1680"/>
        </div>
        <div>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" alt="" height="971" width="1680"/>
        </div>
        <div>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" alt="" height="971" width="1680"/>
        </div>
      </Carousel>
      </div>
      )
  }
}