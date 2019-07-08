import React, { Component } from 'react'
import './index.css'
import $ from 'jquery'
import {Form,Layout,message,Avatar,Modal,Drawer,Icon,Card,Popover} from 'antd'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {localhost} from '../../config'
import EditWithBar from '../../components/Editor'
import DrawView from '../../components/ZoomPic/drawerview'
import io from 'socket.io-client'
import PropTypes from "prop-types"
import Content_Modal from '../../components/Synergy/ContentModal'
import ChatContent from '../../components/Synergy/Content'
const { Header, Sider} = Layout;

var MyDeck = []
var thumbnail = []
var toServePage = null;
var project_id_now = 0;
var share_code_now = 0;

const IconAvator = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1009791_ev29rcbfmfr.js',
});

function handleChange(value) {
  console.log(`selected ${value}`);
}
function deepClone(obj){
  let _obj = JSON.stringify(obj);
  return JSON.parse(_obj)
}

class Edit extends Component {
  static contextTypes={
    router:PropTypes.object
  }
  constructor(props, context) {
    super(props, context)
    // this.initPie = this.initPie.bind(this)
    this.thumbnail=this.thumbnail.bind(this)
    this.sync=this.sync.bind(this);
    this.flush=this.flush.bind(this);
    this.getToServePage=this.getToServePage.bind(this);
    this.save = this.save.bind(this);
    this.showModal_preview=this.showModal_preview.bind(this);
    this.onCollapse = this.onCollapse.bind(this);
    this.getSource = this.getSource.bind(this);
    this.passbyJudge = this.passbyJudge.bind(this)
    this.passbyStack = this.passbyStack.bind(this)
    this.newSlide = this.newSlide.bind(this)
    this.showModal = this.showModal.bind(this)
    this.popoverVisibleChange=this.popoverVisibleChange.bind(this)
  }
  state = {
    collapsed: false,
    previewvisible: false ,   //预览课件弹出框
    page:1,                   //课件页面
    thumbnail:[],             //课件内容？
    thumbnailBase64:[],       //this.props.createCourse_info.createCourse_info.slides.slide,
   
    isSingle:true,            //判断是否处于协同模式
    pageChange:false,             //0代表无变化，0增加， 1减少

    updatecontent:[],
    tempochatdata: "",
    coursecatalog:[],
    toServe:null,
    //  msg:null,
    cooperationuserid:0,
    code:0,
    collapsedleftsider:false,
    visible: false,
    modalvisible:false,
    modal2Visible:false,
    shouldCreateSocket:false,
  
    MyDeck:MyDeck,
    canvasFlush:false,
 
    PopoverVisible:false,
   
    resourcelist:0,
    cooperuserlist:[],
    Avatartype:["icon-touxiangnvhai","icon-icon-test3","icon-icon-test1","icon-icon-test","icon-icon-test2"],
  
    trick:false, //只让缩略图组件使用，用于传递socket而不引发视图（EditorWithBar canvaslib）的渲染
    base64Thumbnail:[],
    chatsocketid:"",
    source:{},
    // templatecourseid:"",
  };


  //课件预览弹出框
  showModal_preview () {
    this.setState({
      previewvisible: true,
    });
  }
  getSource=(source)=>{
    this.setState({
      source:{
        "r_id":source.r_id,
        "file_url":source.file_url,
        "r_descript":source.r_descript,
      },
    });
  }
  handleOk_preview = () => {
    this.setState({
      previewvisible: false,
    });
    const { sendpreviewcourseid,createCourse_info} = this.props;
    sendpreviewcourseid({
      type: 'GetpreviewcourseidSuccess',
      payload:{ 
        project_id:createCourse_info.course_id,
        thumbnail:this.state.thumbnail,
        cataloglist:this.state.cataloglist,
      },
    });
    this.context.router.history.push("/Previewcourse");
  }
  handleCancel_preview = () => {
    this.setState({
      previewvisible: false,
    });
  }
  flush(state){
    this.setState({
      canvasFlush:state
    })
  }
  getToServePage(func){
    toServePage = func;
    this.setState({
      trick:true//刷新的目的是使drawview获得向socket发送页面改变的函数
    })
  }
  /*
  clearMsg(){
    this.setState({
      msg:null
    })
  }
  */
  dispatchState(forThumbnail,forSync){
    let url = forThumbnail.url,
        slide = forSync
    MyDeck.splice(this.state.page-1,1, slide) //先浅复制
    let _thumbnail = this.state.thumbnail
    let thumbnailBase64 = this.state.thumbnailBase64
    _thumbnail.splice(this.state.page-1,1,url)
    thumbnail.splice(this.state.page-1,1,url)//这个变量用于缩略图显示blob
    thumbnailBase64.splice(this.state.page-1,1,slide.pageThumbnail)//这个变量用于数据库存储
    this.setState({thumbnail,thumbnailBase64})//这种格式可以？
  }
  newSlide(flag,page){
    let is = true; //处理删除只剩一页的特例
    if(flag){
      console.log("newSlide:",page)
      thumbnail.splice(page,0,{meida:[],pageThumbnail:"whiteBoard"})//增加页面时，页面跳转到新增空白页面
      console.log(thumbnail.length)
      MyDeck.splice(page,0,{})
      console.log(MyDeck)
    }
    else{
      if(page === 1 && thumbnail.length === 1){
        is = false;
        
        thumbnail = [];
        MyDeck[0].media = []; //为了同步componentWillUpdate的浅复制
      }
      else{
        console.log("page:",page)
        thumbnail.splice(page-1,1)
        MyDeck.splice(page-1,1) //删除页面时，页面跳转到上（下）一个页面
      } 
    }
    let oldPage = this.state.page//这个指的当前页面
  // let length = thumbnail.length 如果新增始终增加在最后，采取该值无问题
    this.setState({
      pageChange:flag?0:1,
      page:flag?oldPage+1:(is?oldPage-1:oldPage)
    })
  }
  passbyJudge(){
    if(typeof MyDeck[this.state.page-1] !== "undefined"){
      console.log("now media:",MyDeck[this.state.page-1])
      return typeof MyDeck[this.state.page-1].media === "undefined"?[]:MyDeck[this.state.page-1].media
    }
    else{
      
      return (typeof MyDeck[this.state.page] !== "undefined")?MyDeck[this.state.page].media:[] //当删去的一页为首页时 //有问题
    }
  }
  passbyStack(){
    if(typeof MyDeck[this.state.page-1] !== "undefined"){
      return typeof MyDeck[this.state.page-1].stack === "undefined"?[]:MyDeck[this.state.page-1].stack
    }
    else{
      return (typeof MyDeck[this.state.page] !== "undefined")?MyDeck[this.state.page].media:[] //当删去的一页为首页时 //有问题
    }
  }
  handlePlus() {
  const { createCourse_info } = this.props;
  this.createchat(createCourse_info.course_id)
  }
  updatechatdata = (e) => {
    this.setState({
      tempochatdata: e.target.value,
    });
  }
  searchuser= (e) => {
    const user_name=e.target.value;
    const { login_info}=this.props;
    console.log('进入ajax');
    $.ajax({
      url: "http://"+localhost+":3000/api/getUserid",
      data:{
        "user_name":user_name,
      },
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      type: "GET",
      dataType: "json",
      async:false,
      success: function (data) {
        if (data.errorCode === 0) {
          console.log('查找成员成功111');
          this.setState({
            cooperationuserid:data.msg.user_id,
          });
        }
        else {   
          console.log('查找成员失败');
        }
      }.bind(this),
      error: function (xhr, status, err) {
      }
    });

  }

  searchCode(code){
    const callBack = this.getInviteData.bind(this)
    const callBack_chat= this.createchatcopy.bind(this)

    const {login_info ,setCreatecourseState} = this.props;

    $.ajax({
      url: "http://"+localhost+":3000/api/getReflectProject_id?tinyCode="+code,
      async:false,
      type: "GET",
      contentType:"application/json;charset=UTF-8",
      accepts:"application/json;charset=UTF-8",
      dataType: "json",
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      success: function (data) {
          if (data) {
              console.log('返回对应项目id'+data);
              callBack(data);
              callBack_chat(data);
              setCreatecourseState({
                type:'createcourseSuccess',
                payload:{
                  course_id:data,
                  // numchat:true,
                }
              });
            
          }
          else {
            message.error("无法找到对应项目");
          }
      },
      error: function (xhr, status, err) {
        message.error("进入项目失败");
      }
  });
  }
  getInviteData(invite_project_id){
    const { login_info}=this.props;
    const {setCreatecourseState} = this.props;
    const data = {
      "_id" :invite_project_id.toString(),
    }
    console.log('进入researchByCourseId接口');
    console.log(data);
    $.ajax({
      url: "http://"+localhost+":3000/api/researchByCourseId",
      async:false,
      type: "GET",
      contentType:"application/json;charset=UTF-8",
      dataType: "json",
      data:data,
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      success: function(data) {
        if (data.errorCode === 0) {
          console.log('返回课件项目信息');
          console.log(data);
          setCreatecourseState({
            type:'createcourseSuccess',
            payload:{
              course_id:invite_project_id,
              createCourse_info:data.msg[0],
              // numchat:true,
            }
          }); 
          MyDeck = deepClone(data.msg[0].slides.slide)
          project_id_now = invite_project_id
    
        this.effect_createSocket(true)
          this.setState({ MyDeck:MyDeck,  modalvisible: false, modal2Visible:false,  isSingle:false,
            popoverVisible:false })
        //  this.setModal2Visible(false)
        }
        else {   
          message.error("找不到对应项目");
          
        }
      }.bind(this),
      error: function (xhr, status, err) {
        message.error("无法获取项目数据");
      }
    })
  }
  setcatalog(){
    const {createCourse_info}=this.props;
    const cataloglist=createCourse_info.createCourse_info.catalog.children;
    var knowsource=[];
    for(var i=0;i<cataloglist.length;i++){
      var obj=cataloglist[i];
      knowsource.push(obj.name);
    }; 
    this.setState({
      cataloglist:knowsource,
    });
  }
  getProjectUserList(){
    const { login_info ,createCourse_info}=this.props;
    console.log('进入ajax');
    $.ajax({
      url: "http://"+localhost+":3000/api/getProjectUsersList",
      data:{
        "project_id":createCourse_info.course_id,
      },
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      type: "GET",
      dataType: "json",
      async:false,
      success: function (data) {
        if (data.errorCode === 0) {
          console.log('获取协作者成功');
          console.log(data);
        this.setState({
          cooperuserlist:data.msg,
        });
        }
        else {   
          console.log('获取协作者失败');
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.log('无法获取协作者');
      }
    });
  }
  getresource(knowledges){
    const { login_info }=this.props;
    console.log('进入ajax');
    $.ajax({
      url: "http://"+localhost+":3000/api/resourceRel",
      data:{
        "knowledges":JSON.stringify(knowledges),
      },
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      type: "GET",
      dataType: "json",
      async:false,
      success: function (data) {
        if (data.errorCode === 0) {
          console.log('获取知识资源成功');
          console.log(data);
        this.setState({
          resourcelist:data.msg,
        });
        }
        else {   
          console.log('获取知识资源失败');
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.log('无法获取知识资源');
      }
    });
  }
  createrelationship(){
    const { login_info ,createCourse_info}=this.props;
    console.log('进入ajax');
    $.ajax({
      url: "http://"+localhost+":3000/api/joinProjectRelationShip",
      data:{
        "user_id":this.state.cooperationuserid,
        "project_id":createCourse_info.course_id,
      },
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      type: "POST",
      dataType: "json",
      async:false,
      success: function (data) {
        if (data.errorCode === 0) {
          console.log('建立联系111');
          message.success('添加成功~');
          this.getProjectUserList();
        }
        else {   
          message.error("添加成员失败~");  
        }
      }.bind(this),
      error: function (xhr, status, err) {
      }
    });
  }
  save(){
    
    const {createCourse_info,login_info} = this.props;

    var temp = deepClone(createCourse_info)
    var passbydata = createCourse_info.createCourse_info
  
  var formData = deepClone(passbydata)

    delete formData.slides

    delete formData.thumbnail
    

    formData.children = temp.createCourse_info.catalog.children
    formData.name = temp.createCourse_info.catalog.name
    formData.width = temp.createCourse_info.thumbnail.style.width

    formData.height = temp.createCourse_info.thumbnail.style.height

    formData.url = temp.createCourse_info.thumbnail.url

    formData.slide =  [...temp.createCourse_info.slides.slide]

    formData.templateId = deepClone(temp.createCourse_info.slides.templateId) 

    console.log(JSON.stringify(formData))
    $.ajax({
      url: "http://"+localhost+":3000/api/updateCourse",
      type: "PUT",
      async:false,
      dataType: "json",
      contentType:"application/json;charset=UTF-8",
      accepts:"application/json;charset=UTF-8",
      data:JSON.stringify(formData),//如果直接传会发生this.extend的错误
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      success: function (data) {
          if (data.errorCode !== 0) {
            message.error("保存失败1");  
          }
          else {
            message.success('保存成功');
              console.log("返回的保存数据",data);
              
            
          }
      },
      error: function (xhr, status, err) {
        message.error("保存失败2");
      }
  });

  }
  linkTo=(url)=>{
    console.log(this)
    this.context.router.history.push(url)
  }
  sync(objectList){
  //  console.log(objectList)
  // console.log(MyDeck) ; //浅复制不太对
  //  let temp = deepClone(objectList)
  //  let state=MyDeck[this.state.page-1]==objectList?false:true
  // state&&MyDeck.splice(this.state.page-1,1,temp)
  MyDeck.splice(this.state.page-1,1,objectList) //先浅复制
  //  console.log("MyDeck:",MyDeck)
  // return state
  //  MyDeck.splice(this.state.page-1,1,objectList)
  }

  thumbnail = (src,base64) =>{
    console.log("duoyu:",src)
    let _thumbnail = this.state.thumbnail
    let thumbnailBase64 = this.state.thumbnailBase64
    _thumbnail.splice(this.state.page-1,1,src)
    thumbnail.splice(this.state.page-1,1,src)//这个变量用于缩略图显示blob
    thumbnailBase64.splice(this.state.page-1,1,base64)//这个变量用于数据库存储
    this.setState({thumbnailBase64})//这种格式可以？thumbnail:thumbnail,:thumbnailBase64
  }
  pageChoose = (Xst) => {
    this.setState({
      page: Xst,
    });
    console.log(Xst)
  }
  showModal = (type) => {
    console.log("???")
    const { createCourse_info,login_info } = this.props;
    const course_id = createCourse_info.createCourse_info._id;
    if(project_id_now !== course_id){
      project_id_now = course_id;
      if(type === "invite"){
        $.ajax({
          url: "http://"+localhost+":3000/api/generateTinyCode?project_id="+course_id,
          async:false,
          type: "GET",
          contentType:"application/json;charset=UTF-8",
          accepts:"application/json;charset=UTF-8",
          dataType: "json",
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
          },
          success: function (data) {
              if (data) {
                  console.log('成功生成短码'+data);
                  share_code_now = data;
              }
              else {
                  console.log('生成短码失败');
              }
          },
          error: function (xhr, status, err) {
            console.log("分享失败")
          }
      });
      }
    }

    
    share_code_now&&this.setState({
      code:share_code_now,
      modalvisible: true,
    });
  }
  handleOk = (e) => {
    const { login_info,createCourse_info } = this.props;
    const param={
      project_id:createCourse_info.course_id
    } 
    this.createChatChannel(createCourse_info.course_id);
    this.save();
    $.ajax({
      url: "http://"+localhost+":3000/api/createWebSocketServer",
      async:false,
      type: "POST",
      contentType:"application/x-www-form-urlencoded",
    //  accepts:"application/json;charset=UTF-8",
    //  dataType: "json",
      data:param,
  // data:'5c6f6e65e00c7f1b4885c798',
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      success: function (data) {
          if (data.errorCode === 0) {
            console.log("this:",this);//这个地方似乎不用赋值给MyDeck，只需要警惕从别处跳过来的情况（project的slides数据不一致）
            project_id_now = createCourse_info.course_id
    
        //    this.effect_createSocket(true)
            console.log('准备创建协同链接');
          }
          else {
              console.log('协同失败');
          }
      }.bind(this),
      error: function (xhr, status, err) {
        console.log("无法协同项目")
      }
  });
    this.setState({
      modalvisible: false,
      isSingle:false,
      shouldCreateSocket:true
    });
  }
  createChatChannel = (project_id) => {
    const callBack_chat= this.createchatcopy.bind(this)
    const { login_info} = this.props;
    const param={
      project_id:project_id
    } 
    $.ajax({
      url: "http://"+localhost+":3000/api/createChatChannel",
      async:false,
      type: "POST",
      contentType:"application/x-www-form-urlencoded",
    //  accepts:"application/json;charset=UTF-8",
    //  dataType: "json",
      data:param,
  // data:'5c6f6e65e00c7f1b4885c798',
      beforeSend:function(request){
        request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
      },
      success: function (data) {
          if (data.errorCode === 0) {
            console.log('已创建协同聊天');
            callBack_chat(project_id);
          }
          else {
            console.log('协同聊天失败');
          }
      },
      error: function (xhr, status, err) {
        console.log("无法协同项目")
      }
  });
  }
  popoverVisibleChange = (popoverVisible) => {
    console.log("popoverVisibleChange");
    this.setState({ popoverVisible:!this.state.popoverVisible });
    console.log(this.state.popoverVisible);
  }
  setModal2Visible = (modal2Visible)=> {
    const{createCourse_info}=this.props;
    this.quitchat(createCourse_info.course_id);
    this.setState({ 
      modal2Visible:modal2Visible,
      popoverVisible:false //选择后让气泡框消失
    });

  }
  handleCancel = (e) => {
    console.log(e);
    //这里应该调用一个接口，让数据库取消映射
    this.setState({
      modalvisible: false,
    });
  }
  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed, });
  }
  showDrawer = () => {
    console.log("showDrawer");
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  effect_createSocket=(flag,projectId)=>{
      this.setState({
        shouldCreateSocket:flag
      })
  }
  createchat=(projectId)=>{
    const { login_info}=this.props;
    console.log("聊天室:",projectId)
    var url = "http://"+localhost+":3001?roomid="+projectId;
    //  let param = `/${projectId}` 
    //  console.log("param:",param)
    //  var socket = io(url,{path:param});
    var socket = io(url);
    //  toServe = function(chatdata){
    //    console.log("socket-client")
    //    socket.emit('send mesg', JSON.stringify(chatdata)); 
    //  }
    var username = 'bing';
    
    socket.emit('add user', username);

    var joindata={
      username : login_info.username,
    }
      socket.emit('join chat', joindata);
    var chatdata={
      text:this.state.tempochatdata,
      username : login_info.username,
      }
      socket.emit('send mesg', chatdata);
      socket.on('login',(data)=>{
        // connected = true;
        console.log("numOfUsers is "+data.numOfUers);
        console.log("socket.id is"+socket.id);
    });

  }
  createchatcopy=(projectId)=>{
    //  this.quitchat(this.state.templatecourseid);
    
    const { login_info}=this.props;
    console.log("聊天室entrepress:",projectId)
    // this.setState({
    //   coursecatalog:[],
    // });
    var url = "http://"+localhost+":3001?roomid="+projectId;
    //  let param = `/${projectId}` 
    //  console.log("param:",param)
    //  var socket = io(url,{path:param});
    var socket = io(url);
    //  toServe = function(chatdata){
    //    console.log("socket-client")
    //    socket.emit('send mesg', JSON.stringify(chatdata)); 
    //  }
    var username = 'bing';
    
    socket.emit('add user', username);

    var joindata={
      username : login_info.username,
    }
      socket.emit('join chat', joindata);
    //  var chatdata={
    //    text:this.state.tempochatdata,
    //    username : login_info.username,
    //   }
    //    socket.emit('send mesg', chatdata);
      socket.on('login',(data)=>{
        // connected = true;
        console.log("numOfUsers is "+data.numOfUers);
        console.log("socket.id is"+socket.id);
    });

        socket.on('message',(data)=>{
        console.log(data)
  //        var msg = JSON.parse(data);
    if(data.event==="broadcast emit"&&data.data.text){
          const coursecatalog1 =data.data; 
          this.state.coursecatalog.push(coursecatalog1);
          const coursedata=this.state.coursecatalog;
          console.log('createchatcopy111',coursedata);
          this.setState({
            coursecatalog:coursedata,
            numchat:true,
            // templatecourseid:projectId,
          });
        }
          });
  }
  numchat=(projectId)=>{
    const { login_info,createCourse_info } = this.props;
    if(createCourse_info.numchat){
  
    console.log("聊天室初始:",projectId)
    var url = "http://"+localhost+":3001?roomid="+projectId;
    var socket = io(url);
    var username = 'bing';
    
    socket.emit('add user', username);

    var joindata={
      username : login_info.username,
    }
      socket.emit('join chat', joindata);
    //  var chatdata={
    //    text:this.state.tempochatdata,
    //    username : login_info.username,
    //   }
    //    socket.emit('send mesg', chatdata);
      socket.on('login',(data)=>{
        // connected = true;
        console.log("numOfUsers is "+data.numOfUers);
        console.log("socket.id is"+socket.id);
    });

        socket.on('message',(data)=>{
        console.log("someone send mesg")
        console.log(data)
  //        var msg = JSON.parse(data);
  if(data.event==="broadcast emit"&&data.data.text){
        const coursecatalog1 =data.data; 
        this.state.coursecatalog.push(coursecatalog1);
        const coursedata=this.state.coursecatalog;
        console.log('numchat111',coursedata);
        this.setState({
          coursecatalog:coursedata,
          numchat:true,
          // templatecourseid:projectId,
        });
      }
        });
      
  }
  }
  quitchat=(projectId)=>{
    this.setState({
      coursecatalog:[],
    });
    //   console.log("退出聊天室numchat:",this.state.numchat)
    // console.log("退出聊天室:",this.state.templatecourseid)
    // const { login_info,createCourse_info } = this.props;
    if(this.state.numchat){
      //   console.log("退出聊天室:",projectId)
      var url = "http://"+localhost+":3001?roomid="+projectId;
      var socket = io(url);
      socket.emit('disconnection',{data:'emit disconnection'});
      //   socket.on('disconnection',(data)=>{
      //     console.log(data);
      // });         
    }
  }
  showModal = (type) => {
    console.log("showModal")
    const { createCourse_info,login_info } = this.props;
    const course_id = createCourse_info.createCourse_info._id;
    if(project_id_now !== course_id){
      project_id_now = course_id;
      if(type === "invite"){
        $.ajax({
          url: "http://"+localhost+":3000/api/generateTinyCode?project_id="+course_id,
          async:false,
          type: "GET",
          contentType:"application/json;charset=UTF-8",
          accepts:"application/json;charset=UTF-8",
          dataType: "json",
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
          },
          success: function (data) {
              if (data) {
                  console.log('成功生成短码'+data);
                  share_code_now = data;
              }
              else {
                  console.log('生成短码失败');
              }
          },
          error: function (xhr, status, err) {
            console.log("分享失败")
          }
      });
      }
    }
  
    
    share_code_now&&this.setState({
      code:share_code_now,
      modalvisible: true,
    });
  }
  componentWillMount(){
    console.log("ss",this.state.thumbnailBase64)
    this.getProjectUserList();
    const {createCourse_info} = this.props;
    console.log("初次加载:",createCourse_info)  //isSingle也需要改变
    console.log("知识点:",[].concat.apply([],createCourse_info.createCourse_info.knowledges)); 
    this.getresource([].concat.apply([],createCourse_info.createCourse_info.knowledges));
    MyDeck = createCourse_info.createCourse_info.slides.slide //适用于创建者与从课件广场进入的用户
    console.log("初始Deck:",MyDeck)
    // project_id_now = createCourse_info.course_id
    console.log("测试多人聊天");
    this.numchat(createCourse_info.course_id);
    console.log("初次加载课件目录:",createCourse_info.createCourse_info.catalog.children)
    this.setcatalog();
  }

  componentDidMount(){
    // const { login_info,createCourse_info } = this.props;
    // this.createchat(createCourse_info.course_id);
    this.getProjectUserList();
    this.setcatalog();

  }

  shouldComponentUpdate(nextProps,nextState){
    if(this.props.isSingleMode!==nextProps.isSingleMode&&!nextProps.isSingleMode){
    // this.createSocket(this.props.createCourse_info.course_id)
    }
    return true
  }
  componentDidUpdate(){
  }

  render() {
    const {createCourse_info,login_info} = this.props;
    const text =
    <div>
      <Link to='/Account'><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} onClick={this.quitchat.bind(this,createCourse_info.course_id)} size="large" >U</Avatar>
      </Link><span style={{fontSize:15}}> 当前用户</span>
      
    </div>;
    const userList = this.state.cooperuserlist.map((v, i) => {
      return (
        <div style={{margin:'2px'}} >
             <IconAvator type={this.state.Avatartype[i%5]} className="iconsize"/>
            <span style={{fontSize:15}}>{v.user_name}</span>
        </div>
      );}
    )
    const menu = function(param){
      // const {func1,func2,func3} = param
      return <Card title="当前在线协同者">
        {userList}
      <div style={{margin:'2px'}} onClick={param}>
        <Icon type="frown" className="iconsize" theme="twoTone"/>
         <span style={{fontSize:15}}> Join</span>   
      </div>
    </Card>
    }

    
    return (
      <Layout style={{width: '100%', height: '100vh'}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} collapsedWidth={0} breakpoint="xxl" defaultCollapsed width={249}
          style={{
            //overflow:"scroll",
               // height:893,
              //  minWidth:2490
              background:'rgb(249,249,249)',
              minHeight:"100%",
              borderRight:0
              /* 200 115 */
          }}
        >
          <Header style={{ background: '#1DA569', padding:0,}} >
            <div className="sider-header">
                <div className="sider-menu">图状</div>
                <div className="sider-menu">树状</div>
            </div>
          </Header>
          <DrawView
            cataloglist={this.state.cataloglist}
            mask={false}
            socketFn={toServePage}
            isSingle={typeof createCourse_info.isSingle === "undefined"?this.state.isSingle:this.state.isSingle&&createCourse_info.isSingle}
            trick={this.state.trick}
            pageChoose={this.pageChoose}
            page={this.state.page}
            thumbnail={thumbnail||createCourse_info.createCourse_info.slides.slide}
            newSlide={this.newSlide}
          />
        </Sider>
        <EditWithBar
          linkTo={this.linkTo}
          showModal={this.showModal}
          showDrawer={this.showDrawer}
          popoverVisibleChange={this.popoverVisibleChange}
          onCollapse={this.onCollapse}
          pageLength={MyDeck.length}
          newSlide={this.newSlide}
          pageChoose={this.pageChoose}
          userName={login_info.username}
          showModal_preview={this.showModal_preview}
          initContent={this.passbyJudge()}
          initStack={this.passbyStack()}
          getToServePage={this.getToServePage}
          pageChange={this.state.pageChange}
          sync={this.sync}
          page={this.state.page-1}
          thumbnail={this.thumbnail}
          save={this.save}
          isSingleMode={(typeof createCourse_info.isSingle === "undefined"?this.state.isSingle:this.state.isSingle&&createCourse_info.isSingle)}
          shouldCreateSocket={this.state.shouldCreateSocket}
          effect_createSocket={this.effect_createSocket}
          project_id_now={project_id_now||createCourse_info.course_id}
          dispatchState={this.dispatchState}
          resourcelist={this.state.resourcelist}
          getSource={this.getSource}
        />
   
        <Modal
         title="邀请成员"
         visible={this.state.modalvisible}
         onOk={this.handleOk}
         onCancel={this.handleCancel}
       //  footer={null}
      >
        <Content_Modal code = {this.state.code} searchuser={this.searchuser.bind(this)} createrelationship={this.createrelationship.bind(this)} />
      </Modal>
      <Drawer
                width={500}
                title="交流区间"
                //placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <ChatContent coursecatalog={this.state.coursecatalog} Avatartype={this.state.Avatartype} updatechatdata={this.updatechatdata.bind(this)} handlePlus={this.handlePlus.bind(this)}/>
            
                
              </Drawer>
              <Popover placement="bottomRight" title={text} content={menu(this.setModal2Visible.bind(this,true))} trigger="click"  visible={this.state.popoverVisible} onVisibleChange={this.popoverVisibleChange}>
           {//第三个
           }
          
         

         </Popover>
      </Layout>

    );
    
  }
}
const Edit_Index=Form.create()(Edit);
function  mapStateToProps(state) {
  return{
    login_info:state.reducer_login.login_info,
    createCourse_info:state.reducer_createcourse.createCourse_info,
  };
}
function mapDispatchToProps(dispatch){
  return{
    setCreatecourseState: (state) => dispatch(state),
    sendpreviewcourseid: (state) => dispatch(state),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit_Index);