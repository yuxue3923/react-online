import React, { Component } from 'react';

import {Layout,Input} from 'antd'
import Editor from './canvaslib'
import Nav from '../Nav'

var isButton=false;
var isflush = true;
const {TextArea} = Input;
const { Header, Content ,Footer} = Layout;

class EditWithBar extends Component {
    constructor() {
        super()
        this.state = {
            addType:'none',
            tag:'',//补充参数，如颜色
            //fromSr:{},
        }
        this.handleThumbnail=this.handleThumbnail.bind(this);
        this.save = this.save.bind(this);
        this.showModal_preview=this.showModal_preview.bind(this);
        this.onCollapse=this.onCollapse.bind(this);
    }
    state = {
        propertyVisible: false,     //属性栏可见性
        sourceVisible:false,        //资源栏可见性
        propertyMsg:'attr',         //属性值
        flag:10
    }
    
    //展示/隐藏资源菜单
    showResource = () => {
        this.setState(function(preState,props){
            return { sourceVisible:!preState.sourceVisible }
        });
    };

    //展示属性菜单
    showProperty = (attr) => {
        this.setState(function(){
            return { propertyVisible:true,
                     propertyMsg:attr,
            }
        });
    };

    handleVisibleChange = propertyVisible => {
        this.setState({ propertyVisible });
    };

    linkTo=(url)=>{
        this.props.linkTo(url);
    }
    getSource=(source)=>{
        this.props.getSource(source);
    }
    add=(type,colorType)=>{
        isButton=true;
        this.setState({addType:type,tag:colorType||""})
        //this.flush(true)
    }
    handleThumbnail(src){
        this.props.thumbnail(src)
    }
    onCollapse(){
      this.props.onCollapse()
    }
    showModal_preview(){
      this.props.showModal_preview()
    }
    showModal=(type)=>
    {
        this.props.showModal(type);
    }

    save(){
      this.props.save()
    }
    shouldComponentUpdate(nextProps,preState,nextState){
        //console.log(JSON.stringify(nextProps.initContent)==JSON.stringify(this.props.initContent))
        //console.log(nextProps.initContent === this.props.initContent)
        //console.log("1:",!(JSON.stringify(nextProps.initContent)==JSON.stringify(this.props.initContent))||(this.props.isSingleMode!==nextProps.isSingleMode))
        //console.log("2:",nextProps.message)
        //||(this.props.shouldCreateSocket&&nextProps.shouldCreateSocket!==this.props.shouldCreateSocket)
        return (nextProps.resourcelist != this.props.resourcelist)||(preState.propertyVisible != this.state.propertyVisible)||(preState.sourceVisible != this.state.sourceVisible)||(isButton)||!(nextProps.page === this.props.page)||!(JSON.stringify(nextProps.initContent)===JSON.stringify(this.props.initContent))||(this.props.isSingleMode!==nextProps.isSingleMode)
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
        console.log(this.props.initContent)
        return (
            <Layout style={{overflow:"hidden"}}>
               
                <Header style={{ background: '#1DA57A', padding:0,}} >
                    <Nav
                        resourcelist={this.props.resourcelist}
                        getSource={this.getSource}
                        propertyMsg={this.state.propertyMsg}
                        add={this.add}
                        save={this.save}
                        linkTo={this.linkTo}
                        showModal={this.showModal}
                        showDrawer={this.props.showDrawer}
                        popoverVisibleChange={this.props.popoverVisibleChange}
                        sourceVisible={this.state.sourceVisible}
                        showResource={this.showResource}
                        propertyVisible={this.state.propertyVisible}
                        handleVisibleChange={this.handleVisibleChange}>
                    </Nav>
                </Header>
                
                <Layout style={{padding: ' 24px', margin:'0 3px 0 0'}}>
                    <Content
                        style={{
                        padding:24,
                        background: '#fff',
                        //  width: '100%',
                        height: '100vh',
                        boxShadow:"3px 3px 20px #888888"
                        }}
                        className={this.state.sourceVisible?"wid-shrink":"wid-content"}
                    >
                        <Editor
                            pageLength={this.props.pageLength}
                            page={this.props.page}
                            userName={this.props.userName}
                            newSlide={this.props.newSlide}
                            pageChoose={this.props.pageChoose}
                            type={isButton&&this.state.addType}
                            tag={this.state.tag}
                            getToServePage={this.props.getToServePage}
                            pageChange={this.props.pageChange}
                            getThumbnail={this.handleThumbnail}
                            objectList={isflush&&this.props.initContent}
                            stack={isflush&&this.props.initStack}
                            sync={this.props.sync}
                            isSingleMode={this.props.isSingleMode}
                            shouldCreateSocket={this.props.shouldCreateSocket}
                            effect_createSocket={this.props.effect_createSocket}
                            project_id_now={this.props.project_id_now}
                            dispatchState={this.props.dispatchState}
                            showProperty={this.showProperty}
                            />
                    </Content>
                </Layout>
                <Footer style={{ background: '#fff', padding:10 ,margin:10}} className={this.state.sourceVisible?"wid-shrink":"wid-footer"}>
                    <TextArea row ={5}/>
                </Footer>
            </Layout>
        );
    }
  }

  export default EditWithBar;

