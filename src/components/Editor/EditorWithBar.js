import React, { Component } from 'react';
import { Popover,Button,Row,Col ,Icon} from 'antd';
import Editor from './canvaslib'
import './editbutton.css';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_981127_k7yilt2ebjs.js',
  });
//at.alicdn.com/t/font_1006980_b7ueg4tyem5.js
var isButton=false;
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

const sgraph =function(fn,fp,fs,ft,ff){
    return (
    <div>
          <div style={{margin:'1px'}} >
            <Button type="primary" onClick={fs}>
                 <IconFont type="anticon-xing"/>
            </Button>
          </div>
          <div style={{margin:'1px'}}>
           <Button type="primary" onClick={ft}>
                 <IconFont type="anticon-xingzhuang-sanjiaoxing"/>
            </Button>
          </div>
          <div style={{margin:'1px'}} >
           <Button type="primary" onClick={fp}>
                 <IconFont type="anticon-xingzhuang-juxing"/>
            </Button>
          </div>
          <div style={{margin:'1px'}} >
            <Button type="primary" onClick={fn}>
                 <IconFont type="anticon-yuanhuan"/>
            </Button>
          </div>
          <div style={{margin:'1px'}} >
            <Button type="primary" onClick={ff}>
                 <IconFont type="anticon-icon-bianxing"/>
            </Button>
          </div>
    </div>
   );
}
const dgraph=function(fh,fheart,fa){
  return (
    <div>
          <div style={{margin:'1px'}}>
            <Button type="primary" onClick={fa}>
                 <IconFont type="anticon-pingguo"/>
            </Button>
          </div>
          <div style={{margin:'1px'}}>
            <Button type="primary" onClick={fheart}>
                 <IconFont type="anticon-xin"/>
            </Button>
          </div>
          <div style={{margin:'1px'}} onClick={fh}>
            <Button type="primary" >
                 <IconFont type="anticon-home"/>
            </Button>
          </div>
    </div>
   );
  }
  class EditorWithBar extends Component {
    constructor(props, context) {
        super(props, context)
       // this.initPie = this.initPie.bind(this)
        this.state = {
            addType:'none',
            //fromSr:{},
        }
        this.fromSr={}
        this.handleThumbnail=this.handleThumbnail.bind(this)
    }
    add(type){
        console.log("这个被调用了")
        isButton=true;
        this.setState({
            addType:type
        })
       
    }
    handleThumbnail(pic){
        this.fromSr=pic


    }
    componentWillUpdate(){

     
      
     }
    componentDidUpdate(){
     
        isButton=false
        console.log(this.fromSr)

    }
   
    render() {
        console.log("xuanran")
        console.log("xuanran后的state"+this.state.addType)
      return (
        
        <div>
        <Row >
        <Col span={1}>
          <div className="flowbutton">
          <div style={{margin:'1px'}}>
          <Popover placement="rightTop" content={dgraph(this.add.bind(this,'house'),this.add.bind(this,'heart'),this.add.bind(this,'apple'))} trigger="click">
              <Button type="primary" icon="appstore" ></Button>
          </Popover> 
          </div>
          <div style={{margin:'1px'}}>
          <Popover placement="rightTop" content={ sgraph(this.add.bind(this,'circle'),this.add.bind(this,'rect'),this.add.bind(this,'star'),this.add.bind(this,'tisogon'),this.add.bind(this,'fisogon'))} trigger="click">
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
               <Button type="primary" icon="file-search"></Button>
          </div> 
          </div>
          </Col>
          <Col span={23}> <Editor type={isButton&&this.state.addType} getThumbnail={this.handleThumbnail}/></Col>{/*{}*/}
        </Row>
        </div>
      );
    }
  }

  export default EditorWithBar;