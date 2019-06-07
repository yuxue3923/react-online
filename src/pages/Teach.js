import React, { Component } from 'react';
import './Edit/index.css';
import PropTypes from "prop-types";
import { Button,Input, Icon ,Carousel,Form} from 'antd';
// import $ from 'jquery';
// import {localhost} from '../config';
import { connect } from 'react-redux';
import srender from 'srenderlib'

var isVisible = true;
var srs= [];
class Teach extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
           currentpage:1,
           page:1,
           totalpage:9,
        };
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
       let page=this.state.page;
        if(page<this.state.totalpage){
            page=page+1;
            this.setState({
                page:page,
            })
        }
    }
    prev(){
        let page=this.state.page;
        if(page>1){
            page=page-1;
            this.setState({
                page:page,
            })
        }
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
    componentDidMount(){
        this.getcoursenamedata();
        this.initialCanvas();
        this.inittotalpage();
    }
    inittotalpage(){
        const { createCourse_info }=this.props;
        this.setState({
            totalpage:createCourse_info.createCourse_info.slides.slide.length,
        });
    }
    componentDidUpdate(){
        this.initialCanvas();
        
    }
    initialCanvas(){
        const { login_info,createCourse_info }=this.props;
        var content = createCourse_info.createCourse_info.slides.slide;
        var dom = document.getElementsByClassName('container')[0]
        srs[this.state.page-1]=srender.init(dom,{},login_info.userName,this.state.page-1)
        srs[this.state.page-1].initWithOthers(content[this.state.page-1].media)
       
    }
    getcoursenamedata(e) {
        const { login_info,createCourse_info }=this.props;
        console.log('授课页面信息');
        console.log(createCourse_info)
      
      }
  render(){
    console.log("页数》》》",this.state.totalpage)
      return (
      <div ref="page" style={{overflow:"hidden"}}>
      {/* <div onMouseMove={(e)=>this.displayNav(e)} ref="page" style={{overflow:"hidden"}}> */}
       {/* <div style={{position:"absolute" ,height:"auto",bottom:"0%",left:"0%",zIndex:"99"}} className="nav tool"> 
        <Button type="primary" size="small" block><Icon type="appstore"/><div>菜 单</div></Button>
        <Button type="primary" size="small" block><Icon type="appstore"/><div>最小化</div></Button>
        <Button type="primary" size="small" block className="at-right-border"><Icon type="appstore"/><div>用 户</div></Button>
      </div>  */}
      <div style={{position:"absolute" ,height:"auto",bottom:"0%",right:"0",zIndex:"99"}} className="nav tool"> 
        <Button type="primary" size="small" block onClick={()=>this.prev()}><Icon type="appstore"/><div>上一页</div></Button>
        <Button type="primary" size="small" block><Icon type="appstore"/><div>{this.state.page}/{this.state.totalpage}</div></Button>
        <Button type="primary" size="small" block className="at-right-border" onClick={()=>this.next()}><Icon type="appstore"/><div>下一页</div></Button>
      </div> 
     
      {/* <div style={{position:"absolute" ,height:"auto",top:"30%",right:"0",zIndex:"99"}}  ref="shrink" className="nav col tool" onClick={function(){console.log("yiwaii")}}> 
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>指针</div></Button>
        <Button type="primary" size="small" block><Icon type="appstore"/><div>画笔</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>橡皮檫</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>撤销</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>学生状态</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>交流</div></Button>
        <Button type="primary" size="small" block onClick={()=>this.shrink()}><Icon className="shrink" style={{height:"12px"}} type="appstore"/></Button>
      </div>  */}
      <div>
            <div className="container" style={{height:'100vh',width:'100%',padding:"0px 0px 0px 0px"}}></div>
     </div>
      </div>
      )
  }
}

const Teach_Index=Form.create()(Teach);
function  mapStateToProps(state) {
  return{
     login_info:state.reducer_login.login_info,
     createCourse_info:state.reducer_createcourse.createCourse_info,
  };
}
function mapDispatchToProps(dispatch){
  return{
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teach_Index);