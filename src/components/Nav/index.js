import React, { Component } from 'react';
import { Icon,Button,Popover,Drawer} from 'antd';
import SndBtn from './SndBtn'
import { mergeObjectArr as merge} from './util'
import Bodysider from '../../components/Resource/sider';

const fileNameAndIconList = [{name:"新建",icon:"file-add"},{name:"保存",icon:"save"},{name:"分享",icon:"share-alt"},{name:"导出",icon:"import"}];
const fileFns = [function(){this.props.linkTo('pagefirst')},
                 function(){this.props.save()},
                 function(){console.log("I'm fileFn3")},
                 function(){console.log("I'm fileFn4")}
                ];
//const fileMsg = fileNameAndIconList.reduce((acc,curr,i)=>acc.concat([Object.assign({},curr,{fn:fileFns[i]})]),[]);
const fileMsg = merge(fileNameAndIconList,fileFns,"fn");
/***
 * 文件按钮
 */
const editNameList = [{name:'新增'},{name:'undo'},{name:'redo'}];
const editIconList = ['file-add','undo','redo'];
const editFns = [function(){},
                 function(){this.props.add('undo')},
                 function(){this.props.add('redo')}
                ];
const editMsg = merge(merge(editNameList,editIconList,"icon"),editFns,"fn");
/**
 * 编辑按钮
 */
const imbortNameList = [{name:'PDF'},{name:'图片'},{name:'音视频'}];
const imbortIconList = ['file-pdf','picture','play-square'];
const imbortFns = [];
const imbortMsg = merge(merge(imbortNameList,imbortIconList,"icon"),imbortFns,"fn");
/**
 * 导入按钮
 */
const shapeNameList = [{name:'矩形'},{name:'三角形'},{name:'圆形'}];
const shapeIconList = ['icon-juxing','icon-sanjiaoxing','icon-yuanxingweixuanzhong'];
const shapeFns = [function(){this.props.add('rect')},
                  function(){this.props.add('tisogon')},
                  function(){this.props.add('circle')}
                 ];
const shapeMsg = merge(merge(shapeNameList,shapeIconList,"MyIcon"),shapeFns,"fn");
/**
 * 形状按钮
 */
const textNameList = [{name:'边框'},{name:'填充'},{name:'字体'}];
const textIconList = ['icon-juxing-biankuang','icon-rect','icon-zitishezhi'];
const textPopos = ['strokeColor','fillColor','font'];
const textMsg = merge(merge(textNameList,textIconList,"MyIcon"),textPopos,"popo");
/**
 *文本按钮
 */
const penNameList = [{name:'粗细'},{name:'颜色'},{name:'橡皮'}];
const penIconList = ['icon-cuxi','icon-yanse','icon-xiangpi'];
const penPopos = ['penSize','penColor','font'];
const penMsg = merge(merge(penNameList,penIconList,"MyIcon"),penPopos,"popo");
/**
 * 画笔按钮
 */
const attrNameList = [{name:'边框颜色'},{name:'透明度'},{name:'大小'},{name:'粗细'},{name:'角度'}];
const attrIconList = ['icon-yanse','icon-icon204','icon-daxiao','icon-cuxi','icon-angle'];
const attrPopos = ['strokeColor','diaphaneity','size','thickness','angel'];
const attrMsg = merge(merge(attrNameList,attrIconList,"MyIcon"),attrPopos,"popo");
/**
 * 属性按钮
 */
const groupNameList = [{name:'邀请'},{name:'交流'},{name:'授课'},{name:'人员'}];
const groupIconList = ['icon-useradd','icon-talk','icon-teach','icon-users'];
const groupFns = [function(){this.props.showModal("invite")},
                  function(){this.props.showDrawer()},
                  function(){this.props.linkTo("/Teach");},
                  function(){this.props.popoverVisibleChange()}
                 ];
const groupMsg = merge(merge(groupNameList,groupIconList,"MyIcon"),groupFns,"fn");
/**
 * 团队按钮
 */
export default class Nav extends Component {
    render() {
        return (
        <div className="main-nav">
            <div className="nav" >
                <Popover placement="bottomLeft" content={<SndBtn msgArr={fileMsg} add={this.props.add} save={this.props.save}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="folder" />
                        <div>文件</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={editMsg} add={this.props.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="form"/>
                        <div>编辑</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={imbortMsg} add={this.props.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="import"/>
                        <div>导入</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={shapeMsg} add={this.props.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="bulb"/>
                        <div>形状</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={penMsg} add={this.props.add}/>} overlayClassName="self-popover">
                    <Button type="primary" onClick={this.props.add.bind(this,'pen')}>
                        <Icon type="edit"/>
                        <div>画笔</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={textMsg} add={this.props.add}/>} overlayClassName="self-popover">
                    <Button type="primary" onClick={this.props.add.bind(this,'text')}>
                        <Icon type="font-size"/>
                        <div>文本</div>
                    </Button>
                </Popover>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={attrMsg} add={this.props.add}/>} overlayClassName="self-popover">
                    <Button type="primary">
                        <Icon type="setting"/>
                        <div>属性</div>
                    </Button>
                </Popover>
            </div>
            <div className="nav reverse" style={{width:"100%"}}>
                <Popover placement="bottomLeft" content={<SndBtn msgArr={groupMsg} add={this.props.add} linkTo={this.props.linkTo} showModal={this.props.showModal} showDrawer={this.props.showDrawer} popoverVisibleChange={this.props.popoverVisibleChange} />} overlayClassName="self-popover">
                    <Button type="primary">
                    <Icon type="team"/>
                        <div>团队</div>
                    </Button>
                </Popover>
                <Button type="primary" >
                    <Icon type="user"/>
                    <div> 个人 </div>
                </Button>
                <Button type="primary" style={{marginLeft:"10%"}} onClick={this.props.showResource}>
                    <Icon type="hdd"/>
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
                    <Bodysider resourcelist={this.props.resourcelist} getSource={this.props.getSource}/>
                </Drawer>
            </div>
        </div>
        )
    }
}

