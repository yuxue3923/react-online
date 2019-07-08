//import srender from 'srender'
import srender from 'srenderlib'
import React from 'react'
import {localhost} from '../../config'
import io from 'socket.io-client'
//import {playOrPauseVideo,beginChangeMenu,endChangeMenu,createOrShowMenu,hiddenMenu} from './videoFunc'

function dClone(obj){
    let _obj = JSON.stringify(obj);
    return JSON.parse(_obj)
  }
var toServe = null;
var toServePage = null;
var prePage = 0;

var hasInitCb = false;
const elementStyle={
    stroke: '#ccc',
    fill: 'white',
   // lineDash: [5, 5, 10, 10],
}
const sourceXY = {
    x:100,
    y:100
}
function allowDrop(ev)
{
ev.preventDefault();
}
function drop(ev)
{
ev.preventDefault();
var src=ev.dataTransfer.getData("dragSource");
//src= src +"?v=" + new Date().getTime();
if(srs[prePage]){
    var img = new srender.Image({style:{image:src,height:230,width:200,x:sourceXY.x,y:sourceXY.y},draggable:true})
    srs[prePage].add(img)
}
}
function resolve(msg,page){
    if(!msg||!srs[page]) return
    let sr = srs[page];
    let el = msg.el;
    let tag = msg.tag;
    switch(msg.type){
        case 'attr':
            switch(tag){
                case 'position':
                    sr.attr(el,tag)
                    break;
                case 'shape':
                    sr.attr(el,tag,true)
                    break;
                case 'style':
                  //  sr.attr(el,tag)
                    sr.attr(el,"style",false,el.style);
                    break;
                case 'style-text':
                    console.log("text change:",el)
                    sr.attr(el,"style",false,el.style,true);
                    break;
                default:
                    break;
            }
            break;
        case 'add':
            sr.add(el)
            break;
        case 'delete':
            sr.remove(el)
            break;
        case 'stack-transform':
            sr.stacking("transform",msg.el,tag);
            break;
        case 'stack':
          //  sr.remove(el)
            switch(tag){
                case 'redo':
                  console.log("redo")
                  sr.redo(true);
                  break;
                case 'undo':
                  console.log("undo")
                  sr.undo(true);
                  break;
                /* case 'interrup':
                  console.log("interrup")
                    sr.undo(true);
                    break; */
                default:
                  break;
            }
            break;
        default:
            break;
    }
}

var srs=[];
/**这段较长的代码为画笔，由于作用域暂时无法封装为文件 */
var s; //定义路径对象
var sL = []; //路径数组
var isDraw = false;
const penState = {
    penColor:"rgba(220, 20, 60, 0.8)",
    penSize:2
}
function pen1(penSize,penColor) {
    isDraw = true; //表示正在画线了
    penState.penColor = penColor?penColor:penState.penColor ;
    penState.penSize = penSize?penSize:penState.penSize;
    s = new srender.Polyline({shape:{points: sL,smooth: 'spline',},style: {stroke:penState.penColor,lineWidth: penState.penSize},draggable:true,});//初始化线条
    srs[prePage].add(s); //将线条添加到图层上
  //  srs[prePage].disableDrag(false);
    }
function pen2(e) {
    if (isDraw) { //判断是否是画线状态
        var x = e.event.zrX;
        var y = e.event.zrY; //获取鼠标位置
        sL.push([x, y]); //将位置存入数组
        s.attr({shape: {pointList: sL,}})
        }
        srs[prePage].disableDrag(false);
    }
function pen3(e) {
    isDraw = false; //退出画线状态
    sL = []; //清空线条路经,若不清空将会和上次画线连接到一起
             // s=null;    //清空线条对象
    }

function Pen(flag,page,penSize,penColor){
    if(!srs[page]) return
    if(flag!=='pen'){
        srs[page].disableDrag(true);
        srs[page].off('mousedown',pen1);
        srs[page].off('mousemove',pen2);
        srs[page].off('mouseup',pen3);
        return;
    }
    
    srs[page].on('mousedown',pen1.bind(this,penSize,penColor));
    srs[page].on('mousemove',pen2);
    srs[page].on('mouseup',pen3);
}

/**画笔 */

function add(type,colorType,page,callback){
    var sr;

    /* if(typeof colorType === "number"){
        page = colorType;
        callback = page;
    } */

    if(!srs[page]) return
    else sr = srs[page]
    console.log("instance:",srs[page])
    switch(type){
        case 'circle':
            Pen('circle',page)
            var circle=new srender.Circle({shape:{cx:70,cy: 90,r: 90},style: elementStyle,draggable:true})
            sr.add(circle)
            break;
        case 'rect':
            Pen('rect',page)
            var rect = new srender.Rect({shape: {r: 1,x: 100,y: 100,width: 100,height: 100},style: elementStyle,draggable:true})
            sr.add(rect);
            break;
        case 'pen':
            Pen('pen',page)
        //    callback()
            break;
        case 'penSize':
            Pen('pen',page,colorType)
            break;
        case 'penColor':
            Pen('pen',page,null,colorType)
            break;
        case 'image':
            Pen('image',page)
            console.log("Sorry,image module to be done")
         // var image=new srender.Circle({shape:{cx:70,cy: 90,r: 90},style: elementStyle,})
            break;
        case 'star':
            Pen('star',page)
            var star=new srender.Star({shape:{cx:200,cy:200,n:5,r:40},style:elementStyle,draggable:true})
            sr.add(star);
            break;
        case 'house':
            Pen('house',page)
            var house=new srender.House({shape:{cx:500,cy:300},style:{fill:'none',stroke:(colorType?colorType:'black')},draggable:true})
            sr.add(house);
            break;
        case 'apple':
            Pen('apple',page)
            var apple=new srender.DbCircle({shape:{cx:400,cy:300,r:50},style:{fill:'red',stroke:(colorType?colorType:'none')},draggable:true})
            sr.add(apple);
            //sr.dealPropertyMenu(that.props.showProperty);
            break;
        case 'tisogon':
            Pen('tisogon',page)
            var tisogon=new srender.Isogon({shape:{x:300,y:300,r:50,n:3},style:{fill:'none',stroke:(colorType?colorType:'green')},draggable:true})
            sr.add(tisogon);
            break;
        case 'fisogon':
            Pen('fisogon',page)
            var fisogon=new srender.Isogon({shape:{x:400,y:300,r:50,n:5},style:{fill:'none',stroke:(colorType?colorType:'red')}})
            sr.add(fisogon);
            break;
        case 'heart':
            Pen('heart',page)
            var heart=new srender.Heart({shape:{cx:200,cy:100,width:50,height:50},style:{fill:'red',stroke:(colorType?colorType:'red')}})
            sr.add(heart);
            break;
        case 'strokeColor':
            Pen('color')
            sr.changeStrokeColor(callback(),colorType)
            break;
        case 'fillColor':
            Pen('color',page)
            sr.changeFillColor(callback(),colorType)
            break;
        case 'thickness':
            Pen('thickness',page)
            sr.changeLineWidth(callback(),colorType)
            break;
        case 'size':
            Pen('size',page)
            if(callback()){
                callback().attr({scale: [colorType,colorType]})
            }
            break;
        case 'angle':
            Pen('size',page)
            if(callback()){
                callback().attr({rotation:[colorType*Math.PI,0]})
            }
            break;
        case 'opacity':
            Pen('opacity',page)
            if(callback()){
                callback().attr({style: {opacity: colorType}})
            }
            break;
        case 'undo':
            //  Pen('undo')
            sr.undo();
            break;
        case 'redo':
            //   Pen('redo')
            sr.redo();
            break;
        case 'remove':
            sr.remove(callback())
            break;
        case 'clear':
            sr.remove()
            break;
        case 'text':
            Pen('text',page)
            var text=new srender.Text({
            draggable:true,
            style:{
                x:600,
                y:100,
                text:colorType,
                textAlign: 'center',
                textVerticalAlign: 'middle',
                fontSize: 20,
                fontFamily: 'Lato',
                fontWeight: 'bolder',
                textFill: '#000',
                blend: 'lighten'
            }})
            sr.add(text);
            //  sr.redo(true);
            break;
        case 'video':
            Pen('video',page)
            var video = new srender.Video({style:{videosrc:require('./../../video.ogv')},shape:{width:600,height:480}});
            sr.add(video);
            //video.brush()
            // let x = document.getElementsByClassName('container')[0].clientX;
            // let y = document.getElementsByClassName('container')[0].clientY;
            // video.on('click',playOrPauseVideo.bind(this,video));
            // video.on('mousedown',beginChangeMenu.bind(this,video,x,y));
            // video.on('mouseup',endChangeMenu.bind(this,video));
            // video.on('mouseover',createOrShowMenu.bind(this,video,x,y));
            // video.on('mouseout',hiddenMenu.bind(this,video));
            
            console.log('video:',video)
            break;
        default:
            Pen('none',page)
            return false
    }
}

export default class Editor extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            add:false
        }
        this.handleGetThumbnail=this.handleGetThumbnail.bind(this)
        this.sync = this.sync.bind(this)
        this.dispatchState = this.dispatchState.bind(this)
    }
    handleGetThumbnail(message){
        this.props.getThumbnail(message)
    }
    sync(objectList){
        this.props.sync(objectList);
    }
    dispatchState(){
        this.props.dispatchState();
    }
    flushThumbnail(base64){
        var newImg = new Image();
        newImg.setAttribute('crossOrigin', 'anonymous');
        srs[prePage].painter.getRenderedCanvas('black').toBlob((blob)=>{
            var url = URL.createObjectURL(blob);
            newImg.src=url;
            ((this.props.type!=='none'))&&this.handleGetThumbnail(newImg.src,base64);//应该是缩略图有变化就该传递 //通过该函数改变pageChange?
       },'image/png')
    }
    createSocket=(projectId)=>{
       
        var url = "http://"+localhost+":3001"
        let param = `/${projectId}` 
    
        var socket = io(url,{path:param});//无论页面怎样切换，用户应当只获取该socket
    
        toServe = function(page=0,msg){
        socket.emit('update data', JSON.stringify({id:page,body:msg}));   //sr用以初始化向外界传递消息的回调函数
        }//在唯一一次创建socket时被赋值，但是可以被多个画布使用，前提在于画布有自己的id来区分
        toServePage = function(msg){
        socket.emit('update page',JSON.stringify(msg))
        }
        var username = 'bing';
            socket.emit('add user', username);

            socket.on('login',(data)=>{
                console.log("client numOfUsers is "+JSON.stringify(data));
                console.log("client socket.id is"+socket.id);
             });
         
            socket.on('user joined',(data)=>{
                console.log(data.username+" come in");
            });
            socket.on('update page',(data)=>{
                var msg = JSON.parse(data)
                if(msg.choose){this.props.pageChoose(msg.choose)}
                else this.props.newSlide(msg.add,msg.page)
            })
             socket.on('update data',(data)=>{
             const msg = JSON.parse(data).body;
             const page = JSON.parse(data).id;
                resolve(msg,page)
             });
           this.props.getToServePage(toServePage)
           
       }
    componentDidMount() {
       
        var dom = document.getElementsByClassName('container')[0]
        srs[this.props.page]=srender.init(dom,{},!this.props.isSingleMode,this.props.userName,this.props.page)
        srs[this.props.page].on("mouseup",function(e){
            console.log("I'm here")
          //  change = true;
            sourceXY.x = e.zrX
            sourceXY.y = e.zrY
        })
        srs[this.props.page].dealPropertyMenu(this.props.showProperty)

        if(this.props.isSingleMode){

            !this.props.objectList&&srs[this.props.page].clear()
       
            this.props.objectList&&srs[this.props.page].initWithOthers(this.props.objectList)
        }
        else{
        this.createSocket(this.props.project_id_now);
        srs[this.props.page].initWithCb(toServe)

        this.props.objectList&& srs[this.props.page].initWithOthers(this.props.objectList)
        hasInitCb = true;//
        }
     //   srs[this.props.page].initWithCb(toServe)
        prePage = this.props.page;
    //    add(this.props.type,prePage,this.props.tag,srs[prePage].getNowShape.bind(srs[prePage]));

        this.props.shouldCreateSocket&&this.props.effect_createSocket(false)//

        var base64 =  srs[this.props.page].painter.getRenderedCanvas().toDataURL("image/jpeg", 0.5)
        var newImg = new Image();
        newImg.setAttribute('crossOrigin', 'anonymous');
        srs[this.props.page].painter.getRenderedCanvas('black').toBlob((blob)=>{
            var url = URL.createObjectURL(blob);
            newImg.src=url; 
            this.handleGetThumbnail(newImg.src,base64);
        },'image/png')
       
    
       
        

        this.sync({media: srs[this.props.page].getObjectList(),pageThumbnail:base64});
     //   this.dispatchState({thumbnail:url},{sync:{media:sr.getObjectList(),pageThumbnail:base64}})
    }
    
    
   
      
    componentDidUpdate(){
        var dom=document.getElementsByClassName('container')[0];
      //  console.log(srs[this.props.page].stack._undoList)
        if(this.props.shouldCreateSocket&&!this.props.isSingleMode){
            this.createSocket(this.props.project_id_now);
        }
       
        if(this.props.isSingleMode){
            if(this.props.pageChange!==1&&(this.props.page-prePage===0||srs.length === this.props.pageLength));
            else{
                if(this.props.pageChange){//删除
                    if(srs.length===1) { //this.props.pageLength===1
                        srs = [];
                        srs[0] = srender.init(dom,{},false,this.props.userName,this.props.page)
                    }
                    else{
                        /* if(this.props.page) {//page为零既可能是删除首页，但state无变化，也有可能是删除第二页，page为（2-1）-1 */
                            console.log("这里prePage:",prePage,this.props.page)
                            prePage?srs.splice(this.props.page+1,1):srs.splice(this.props.page,1);
                            if(!srs&&!prePage) srs[0] = srender.init(dom,{},false,this.props.userName,0);  
                    }
                }
                else if(this.props.pageChange===0){//增加
                    srs.splice(this.props.page,0,srender.init(dom,{},false,this.props.userName,this.props.page))
                }
                
              //  srs[this.props.page]=srender.init(dom,{},false,this.props.userName,this.props.page);
                //srs[this.props.page].on("mouseup",function(e){ console.log("I'm here");sourceXY.x = e.zrX;sourceXY.y = e.zrY})  
               
            }
        }
        else{
            if((this.props.page-prePage===0||srs.length === this.props.pageLength)&&hasInitCb);
            else{
                srs[this.props.page]=srender.init(dom,{},true,this.props.userName,this.props.page);
                srs[this.props.page].initWithCb(toServe);
                hasInitCb = true;
                this.props.objectList&&srs[this.props.page].initWithOthers(this.props.objectList);
    
            }
          
       
        }
        

        prePage = this.props.page;
        console.log("srs:",srs)
        srs[prePage].dealPropertyMenu(this.props.showProperty)//
        add(this.props.type,this.props.tag,prePage,srs[prePage].getNowShape.bind(srs[prePage]),this);//
        dom.replaceChild(srs[prePage].painter._domRoot,dom.childNodes[0]);

        this.props.shouldCreateSocket&&this.props.effect_createSocket(false)
        var base64 =  srs[prePage].painter.getRenderedCanvas().toDataURL("image/jpeg", 0.5)
        srs[this.props.page].on("mouseup",()=>{this.flushThumbnail(base64)})//缩略图更新
        this.props.type!=='none'&&this.flushThumbnail(base64);
       
       this.sync({media: srs[prePage].getObjectList(),pageThumbnail:base64});
    }
    render() {
        return (

            <div>
            <div className="container" style={{height:'100vh',width:'100%',border:"0px 0px 0px 0px",padding:"0px 0px 0px 0px"}} onDrop={drop} onDragOver={allowDrop}></div>
            </div>

        )
    }

}