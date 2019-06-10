import React, { Component } from 'react';
import { Icon,Button,Popover,Drawer} from 'antd';
import SndBtn from './SndBtn'
import { mergeObjectArr as merge} from './util'

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_981127_k7yilt2ebjs.js',
});

const fileNameAndIconList = [{name:"新建",icon:"file-add"},{name:"保存",icon:"save"},{name:"分享",icon:"share-alt"},{name:"导出",icon:"import"}];
const fileFns = [function(){console.log("I'm fileFn%")},function(){console.log("I'm fileFn2")},function(){console.log("I'm fileFn3")},function(){console.log("I'm fileFn4")}];
//const fileMsg = fileNameAndIconList.reduce((acc,curr,i)=>acc.concat([Object.assign({},curr,{fn:fileFns[i]})]),[]);
const fileMsg = merge(fileNameAndIconList,fileFns,"fn");
/***
 * 文件按钮
 */
const editNameList = [{name:'新增'},{name:'undo'},{name:'redo'}];
const editIconList = ['file-add','undo','redo'];
const editFns = [];
const editMsg = merge(merge(editNameList,editIconList,"icon"),editFns,"fns");
/**
 * 编辑按钮
 */
const imbortNameList = [{name:'PDF'},{name:'图片'},{name:'音视频'}];
const imbortIconList = ['file-pdf','picture','play-square'];
const imbortFns = [];
const imbortMsg = merge(merge(imbortNameList,imbortIconList,"icon"),imbortFns,"fns");
/**
 * 导入按钮
 */
const shapeNameList = [{name:'矩形'},{name:'三角形'},{name:'圆形'}];
const shapeIconList = ['appstore','appstore','appstore'];
const shapeFns = [function(){this.add('rect')},function(){this.add('tisogon')},function(){this.add('circle')}];
const shapeMsg = merge(merge(shapeNameList,shapeIconList,"MyIcon"),shapeFns,"fn");
/**
 * 形状按钮
 */
const textNameList = [{name:'边框'},{name:'填充'},{name:'字体'}];
const textIconList = ['appstore','appstore','appstore'];
const textFns = [];
const textMsg = merge(merge(textNameList,textIconList,"icon"),textFns,"fns");
/**
 *文本按钮
 */
const penNameList = [{name:'粗细'},{name:'颜色'},{name:'橡皮'}];
const penIconList = ['appstore','appstore','appstore'];
const penFns = [];
const penMsg = merge(merge(penNameList,penIconList,"icon"),penFns,"fns");
/**
 * 画笔按钮
 */
const attrNameList = [{name:'颜色'},{name:'透明度'},{name:'大小'},{name:'角度'}];
const attrIconList = ['appstore','appstore','appstore','appstore'];
const attrFns = [];
const attrMsg = merge(merge(attrNameList,attrIconList,"icon"),attrFns,"fns");
/**
 * 属性按钮
 */
const groupNameList = [{name:'邀请'},{name:'交流'},{name:'授课'},{name:'人员'}];
const groupIconList = ['appstore','appstore','appstore','appstore'];
const groupFns = [function(){console.log("邀请")},function(){console.log("交流")},function(){console.log("授课")},function(){console.log("人员")}];
const groupMsg = merge(merge(groupNameList,groupIconList,"icon"),groupFns,"fn");
/**
 * 团队按钮
 */

export default class Nav extends Component {
    add=(type,colortype)=>{
        this.props.add(type,colortype);
    }

    render() {
        return (
        <div className="main-nav">
            <div className="nav" >
                <Popover placement="bottomLeft" content={<SndBtn msgArr={fileMsg} add={this.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="folder" />
                        <div>文件</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={editMsg} add={this.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="appstore"/>
                        <div>编辑</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={imbortMsg} add={this.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="appstore"/>
                        <div>导入</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={shapeMsg} add={this.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="appstore"/>
                        <div>形状</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={penMsg} add={this.add}/>} overlayClassName="self-popover">
                    <Button type="primary" onClick={this.add.bind(this,'pen')}>
                        <Icon type="appstore"/>
                        <div>画笔</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={textMsg} add={this.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="appstore"/>
                        <div>文本</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={attrMsg} add={this.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="appstore"/>
                        <div>属性</div>
                    </Button>
                </Popover>
            </div>
            <div className="nav reverse" style={{width:"100%"}}>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={groupMsg} add={this.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                    <Icon type="appstore"/>
                        <div>团队</div>
                    </Button>
                </Popover>
                <Button type="primary" >
                    <Icon type="appstore"/>
                    <div> 个人 </div>
                </Button>
                <Button type="primary" style={{marginLeft:"10%"}} onClick={this.props.showResource}>
                    <Icon type="appstore"/>
                    <div> 资源 </div>
                </Button>
                <Drawer
                    // style={{ margin: '3.8% 0 8px 0px'}}
                    style={{ margin: '4.7% 0 8px 0px'}}
                    title="Basic Drawer"
                    width="18.5%"
                    closable={false}
                    maskClosable={false}
                    mask={false}
                    visible={this.props.sourceVisible}
                >
                    ........Drawer
                </Drawer>
            </div>
        </div>
        )
    }
}

