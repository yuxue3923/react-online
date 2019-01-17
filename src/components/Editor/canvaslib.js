//import srender from 'srender'
import srender from 'srenderlib'
import React from 'react'
var isFlush = false;
const elementStyle={
    stroke: '#ccc',
    fill: 'white',
   // lineDash: [5, 5, 10, 10],
}
var sr=null;
/**这段较长的代码为画笔，由于作用域暂时无法封装为文件 */
var s; //定义路径对象
var sL = []; //路径数组
var isDraw = false;
function pen1(e) {
    isDraw = true; //表示正在画线了
    s = new srender.Polyline({shape:{points: sL,smooth: 'spline',},style: {stroke: 'rgba(220, 20, 60, 0.8)',lineWidth: 2},draggable:true,});//初始化线条
    sr.add(s); //将线条添加到图层上
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
         
function Pen(flag){
    if(flag!=='pen'){
        sr.off('mousedown',pen1);
        sr.off('mousemove',pen2);
        sr.off('mouseup',pen3);
        return;
    }
    sr.on('mousedown',pen1);
    sr.on('mousemove',pen2);
    sr.on('mouseup',pen3);
    
}
/**画笔 */

function add(type){
    switch(type){
        case 'circle':
            Pen('circle')
            var circle=new srender.Circle({shape:{cx:70,cy: 90,r: 90},style: elementStyle,})
            sr.add(circle)
            break;
        case 'rect':
            Pen('rect')
            var rect = new srender.Rect({shape: {r: 1,x: 100,y: 100,width: 100,height: 100},style: elementStyle,})
            sr.add(rect);
            break;
        case 'pen':
            Pen('pen')
            break;
        case 'image':
            Pen('image')
            console.log("Sorry,image module to be done")
            break;
        case 'star':
            Pen('star')
            var star=new srender.Star({shape:{cx:200,cy:200,n:5,r:40},style:elementStyle,})
            sr.add(star);
            return true;
        case 'house':
            Pen('house')
            var house=new srender.House({shape:{cx:500,cy:300},style:{fill: 'none',stroke: 'green'}})
            sr.add(house);
            return true;
        case 'apple':
            Pen('apple')
            var apple=new srender.DbCircle({shape:{cx:400,cy:300,r:50},style:{fill: 'red',stroke: 'none'}})
            sr.add(apple);
            break;
        case 'tisogon':
            Pen('tisogon')
            var tisogon=new srender.Isogon({shape:{x:300,y:300,r:50,n:3},style:{fill: 'none',stroke: 'green'}})
            sr.add(tisogon);
            break;
        case 'fisogon':
            Pen('fisogon')
            var fisogon=new srender.Isogon({shape:{x:400,y:300,r:50,n:5},style:{fill: 'none',stroke: 'blue'}})
            sr.add(fisogon);
            break;
        case 'heart':
            Pen('heart')
            var heart=new srender.Heart({shape:{cx:200,cy:20,width:50,height:50},style:{fill: 'red',stroke: 'none'}})
            sr.add(heart);
            break;
        default:
            Pen('none')
            console.log("Sorry,no shape to draw")
            return false
    } 
    
   
}
export default class Editor extends React.Component {
    constructor(props, context) {
        super(props, context)
       // this.initPie = this.initPie.bind(this)
        this.state = {
            add:false
        }
    //    this.handleGetThumbnail=this.handleGetThumbnail.bind(this)
    //    this.sync = this.sync.bind(this)
     //   this.flush = this.flush.bind(this)
    }
    handleGetThumbnail(message){
    //    this.props.getThumbnail(message)
    }
    sync(objectList){
     //   this.props.sync(objectList);
    }
    flush(state){
     //   this.props.flush(state);
    }
    componentDidMount() {
        
        var dom = document.getElementsByClassName('container')[0]
        sr = srender.init(dom)
        var w = sr.getWidth();
        var h = sr.getHeight();
    //    this.props.objectList&&sr.initWithOthers(this.props.objectList)
    }
    componentWillUpdate(){
    //   console.log(this.props.objectList)
    }
    
    shouldComponentUpdate(nextProps,nextState){
        isFlush=this.props.type!=='none'?false:true
        return true
      }
      
    componentDidUpdate(){
       
      //  this.props.objectList&&sr.initWithOthers(this.props.objectList)
     //   add(this.props.type);
    //    this.sync(sr.getObjectList())
       
    //    this.props.type!=='none'&&this.handleGetThumbnail("某些信息")
      //  console.log("组建props改变触发")
    }
    render() {
        return (

            <div>
            <div className="container" style={{height:'100vh',width:'100%',padding:"0px 0px 0px 20px"}}></div>
          
            </div>

        )
    }

}