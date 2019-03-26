import React, { Component } from 'react';
import { Popover,Button,Row,Col ,Icon} from 'antd';
import Editor from './canvaslib'
import './editbutton.css';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_981127_k7yilt2ebjs.js',
  });
//at.alicdn.com/t/font_1006980_b7ueg4tyem5.js

var isButton=false;
var isflush = true;

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
                 <IconFont className="subiconsize" type="anticon-xing"/>
            </Button>
          </div>
          <div style={{margin:'1px'}}>
           <Button type="primary" onClick={ft}>
                 <IconFont className="subiconsize" type="anticon-xingzhuang-sanjiaoxing"/>
            </Button>
          </div>
          <div style={{margin:'1px'}} >
           <Button type="primary" onClick={fp}>
                 <IconFont  className="subiconsize" type="anticon-xingzhuang-juxing"/>
            </Button>
          </div>
          <div style={{margin:'1px'}} >
            <Button type="primary" onClick={fn}>
                 <IconFont className="subiconsize" type="anticon-yuanhuan"/>
            </Button>
          </div>
          <div style={{margin:'1px'}} >
            <Button type="primary" onClick={ff}>
                 <IconFont className="subiconsize" type="anticon-icon-bianxing"/>
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
                 <IconFont className="subiconsize" type="anticon-pingguo"/>
            </Button>
          </div>
          <div style={{margin:'1px'}}>
            <Button type="primary" onClick={fheart}>
                 <IconFont className="subiconsize" type="anticon-xin"/>
            </Button>
          </div>
          <div style={{margin:'1px'}} onClick={fh}>
            <Button type="primary" >
                 <IconFont className="subiconsize" type="anticon-home"/>
            </Button>
          </div>
    </div>
   );
  }
  class EditorWithBar extends Component {
    constructor() {
        super()
        this.state = {
            addType:'none',
            //fromSr:{},
        }
        
        this.handleThumbnail=this.handleThumbnail.bind(this);
        this.save = this.save.bind(this);
        this.showModal_preview=this.showModal_preview.bind(this);
    }
 
    add(type){
        console.log("按钮")
        isButton=true;
        this.setState({addType:type})
     //  this.flush(true)
    }
    handleThumbnail(src){
        this.props.thumbnail(src)


    }
    showModal_preview(){
      this.props.showModal_preview()
    }
    save(){
      this.props.save()
    }
   
     shouldComponentUpdate(nextProps,nextState){

    //  console.log(JSON.stringify(nextProps.initContent)==JSON.stringify(this.props.initContent))
   // console.log(nextProps.initContent === this.props.initContent)
       //console.log("1:",!(JSON.stringify(nextProps.initContent)==JSON.stringify(this.props.initContent))||(this.props.isSingleMode!==nextProps.isSingleMode))
   //     console.log("2:",nextProps.message)
        //||(this.props.shouldCreateSocket&&nextProps.shouldCreateSocket!==this.props.shouldCreateSocket)
       return (isButton)||!(nextProps.page === this.props.page)||!(JSON.stringify(nextProps.initContent)===JSON.stringify(this.props.initContent))||(this.props.isSingleMode!==nextProps.isSingleMode)
       
     }
 
    componentWillReceiveProps(nextProps){
   //   console.log(nextProps)
      isflush = true
    }
   
    componentDidUpdate(){
      //  if(this.state.addType!=="pen"){isButton=false} //按下画笔键时，还没开始画，就重新渲染
      isButton=false
        isflush = false
    }
  
    render() {
      console.log("Barxuanran")
      console.log(this.props.initContent)
     
      
    return (

        <div>
        <Row >
        <Col span={1}>
          <div className="flowbutton">
          <div style={{margin:'1px'}}>
          <Popover placement="rightTop" content={dgraph(this.add.bind(this,'house'),this.add.bind(this,'heart'),this.add.bind(this,'apple'))} trigger="click">
              <Button type="primary">
                 <Icon className="iconsize" type="appstore"/>
              </Button>
          </Popover> 
          </div>
          <div style={{margin:'1px'}}>
          <Popover placement="rightTop" content={ sgraph(this.add.bind(this,'circle'),this.add.bind(this,'rect'),this.add.bind(this,'star'),this.add.bind(this,'tisogon'),this.add.bind(this,'fisogon'))} trigger="click">
              <Button type="primary">
                 <Icon className="iconsize" type="form"/>
              </Button>
          </Popover>
          </div> 
          <div style={{margin:'1px'}}>
              <Button type="primary" onClick={this.add.bind(this,'pen')}>
                 <Icon className="iconsize" type="highlight"/>
               </Button>
          </div>
          <div style={{margin:'1px'}} >
          <Popover placement="rightTop" content={ content1(this.add.bind(this,'circle'))} trigger="click">
               <Button type="primary" onClick={this.add.bind(this,'pen')}>
                 <Icon className="iconsize" type="edit"/>
               </Button>
          </Popover>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" onClick={this.add.bind(this,'pen')}>
                 <Icon className="iconsize" type="drag"/>
               </Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" onClick={(e) => {this.add.bind(this,'pen')}}>
                 <Icon className="iconsize" type="scissor"/>
               </Button>
          </div>
          <div style={{margin:'1px'}}>
               <Button type="primary" >
                 <Icon className="iconsize" type="file-search"/>
               </Button>
          </div> 
          <div style={{margin:'1px'}}>
               <Button type="primary" onClick={this.save}>
                 <Icon className="iconsize" type="save"/>
               </Button>
          </div> 
          <div style={{margin:'1px'}}>
               <Button type="primary" onClick={this.showModal_preview}>
                 <Icon className="iconsize" type="eye"/>
               </Button>
          </div> 
          <div style={{margin:'1px'}}>
               <Button type="primary" onClick = {this.add.bind(this,'redo')}>
                 <Icon className="iconsize" type="redo" />
               </Button>
          </div> 
          <div style={{margin:'1px'}}>
               <Button type="primary" onClick = {this.add.bind(this,'undo')}>
                 <Icon className="iconsize" type="undo"/>
               </Button>
          </div> 
          </div>
          </Col>
       <Col span={23}> <Editor userName={this.props.userName} type={isButton&&this.state.addType} getToServePage={this.props.getToServePage} pageChange={this.props.pageChange} getThumbnail={this.handleThumbnail} objectList={isflush&&this.props.initContent} sync = {this.props.sync} isSingleMode ={this.props.isSingleMode}   shouldCreateSocket = {this.props.shouldCreateSocket} effect_createSocket = {this.props.effect_createSocket} project_id_now = {this.props.project_id_now} dispatchState = {this.props.dispatchState}/></Col>   
      </Row> 
        </div>
     
   
    
     
    );
    
    }
  }

  export default EditorWithBar;