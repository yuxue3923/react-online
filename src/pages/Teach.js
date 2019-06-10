import React, { Component } from 'react';
import '../NewUI.css';
import PropTypes from "prop-types";
import { Button,Input, Icon ,Carousel,Form} from 'antd';
import $ from 'jquery';
import {localhost} from '../config';
import { connect } from 'react-redux';
import srender from 'srenderlib'
import Editor from '../components/Editor/canvaslib'

var srs=[];
var prePage = 0;
/**这段较长的代码为画笔，由于作用域暂时无法封装为文件 */
var s; //定义路径对象
var sL = []; //路径数组
var isDraw = false;
var drawWidth = 2;
function pen1(e) {
    isDraw = true; //表示正在画线了
    s = new srender.Polyline({shape:{points: sL,smooth: 'spline',},style: {stroke: 'rgba(220, 20, 60, 0.8)',lineWidth: drawWidth},draggable:true,});//初始化线条
    srs[prePage].add(s); //将线条添加到图层上
    }
function pen2(e) {
    if (isDraw) { //判断是否是画线状态
        var x = e.event.zrX;
        var y = e.event.zrY; //获取鼠标位置
        sL.push([x, y]); //将位置存入数组
        s.attr({shape: {pointList: sL,}})
        }
    }
function pen3(e) {
    isDraw = false; //退出画线状态
    sL = []; //清空线条路经,若不清空将会和上次画线连接到一起
             // s=null;    //清空线条对象
    }
         
function Pen(flag,page){
    if(!srs[page]) return
    if(flag!=='pen'){
        srs[page].disableDrag(true);
        srs[page].off('mousedown',pen1);
        srs[page].off('mousemove',pen2);
        srs[page].off('mouseup',pen3);
        return;
    }
    srs[page].disableDrag(false);
    srs[page].on('mousedown',pen1);
    srs[page].on('mousemove',pen2);
    srs[page].on('mouseup',pen3);
    
}
/**画笔 */


var isVisible = true;
var total = 1;
class Teach extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
           currentpage:1,
           page:0,
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
        this.state.page<total-1&&this.setState((state,props)=>({
            page:(state.page+1)
        }))
    }
    prev(){
        this.state.page>0&&this.setState((state,props)=>({
            page:(state.page-1)
        }))
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
    componentWillMount(){
        const { createCourse_info }=this.props;
        var content = createCourse_info.createCourse_info.slides.slide;
        total = content.length;
    }
    componentDidMount(){
        this.getcoursenamedata();
        this.updateCanvas();
        prePage = this.state.page;

    }
    componentDidUpdate(){
        this.updateCanvas();
        prePage = this.state.page;
        
    }
    updateCanvas(){
        const { login_info,createCourse_info }=this.props;

        var content = createCourse_info.createCourse_info.slides.slide;
        var dom = document.getElementsByClassName('container')[0]
        if(!srs[this.state.page]) {
            srs[this.state.page]=srender.init(dom,{},login_info.userName,this.state.page);
            srs[this.state.page].initWithOthers(content[this.state.page].media);
        }
       // if(this.props.page-prePage===0);
      console.log(dom.childNodes.length)
       if(dom.childNodes.length === 0) {this.componentWillMount();return}
       dom.replaceChild(srs[this.state.page].painter._domRoot,dom.childNodes[0]);
       
    }
    getcoursenamedata(e) {
        const { createCourse_info }=this.props;
        console.log('授课页面信息');
        console.log(createCourse_info)
      
      }
  render(){
      return (
      <div onMouseMove={(e)=>this.displayNav(e)} ref="page" style={{overflow:"hidden"}}>
       <div style={{position:"absolute" ,height:"auto",bottom:"0%",left:"0%",zIndex:"99"}} className="nav tool"> 
        <Button type="primary" size="small" block><Icon type="appstore"/><div>菜 单</div></Button>
        <Button type="primary" size="small" block><Icon type="appstore"/><div>最小化</div></Button>
        <Button type="primary" size="small" block className="at-right-border"><Icon type="appstore"/><div>用 户</div></Button>
      </div> 
      <div style={{position:"absolute" ,height:"auto",bottom:"0%",right:"0",zIndex:"99"}} className="nav tool"> 
        <Button type="primary" size="small" block onClick={()=>this.prev()}><Icon type="appstore"/><div>上一页</div></Button>
        <Button type="primary" size="small" block><Icon type="appstore"/><div>{this.state.page + 1}/{total}</div></Button>
        <Button type="primary" size="small" block className="at-right-border" onClick={()=>this.next()}><Icon type="appstore"/><div>下一页</div></Button>
      </div> 
     
      <div style={{position:"absolute" ,height:"auto",top:"30%",right:"0",zIndex:"99"}}  ref="shrink" className="nav col tool" > 
        <Button type="primary" size="small" block onClick={()=>Pen('pointer',this.state.page)}><Icon type="appstore"/><div>指针</div></Button>
        <Button type="primary" size="small" block onClick={()=>Pen('pen',this.state.page)}><Icon type="appstore"/><div>画笔</div></Button>
        <Button type="primary" size="small" block onClick={()=>Pen('eraser',this.state.page)}><Icon type="appstore"/><div>橡皮檫</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>撤销</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>学生状态</div></Button>
        <Button type="primary" size="small" block ><Icon type="appstore"/><div>交流</div></Button>
        <Button type="primary" size="small" block onClick={()=>this.shrink()}><Icon className="shrink" style={{height:"12px"}} type="appstore"/></Button>
      </div> 
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
   //  account_course:state.
  };
}
function mapDispatchToProps(dispatch){
  return{
    setSsendupdatecourseid: (state) => dispatch(state),
    setCreatecourseState: (state) => dispatch(state),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teach_Index);