import React, { Component } from 'react';
import { mergeObjectArr as merge} from './util'
import { Icon,Button} from 'antd';

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1231848_er6wdjkf9mi.js',
});


//颜色属性
const colorBtn = [{MyIcon:'icon-white'},{MyIcon:'icon-red'},{MyIcon:'icon-yellow'},{MyIcon:'icon-blue'},{MyIcon:'icon-green'},{MyIcon:'icon-black'}];
const colorFns = [function(){this.add('tisogon','white')},
                  function(){this.add('tisogon','red')},
                  function(){this.add('tisogon','yellow')},
                  function(){this.add('tisogon','blue')},
                  function(){this.add('tisogon','green')},
                  function(){this.add('tisogon','black')}
                 ];
const colorMsg = merge(colorBtn,colorFns,"fn");

//透明度属性
const diaphaneityBtn = [{MyIcon:'icon-yuanxingweixuanzhong'},{MyIcon:'icon-red'},{MyIcon:'icon-yellow'},{MyIcon:'icon-blue'},{MyIcon:'icon-green'},{MyIcon:'icon-black'}];
const diaphaneityFns = [function(){this.add('tisogon','white')},
                        function(){this.add('tisogon','red')},
                        function(){this.add('tisogon','yellow')},
                        function(){this.add('tisogon','blue')},
                        function(){this.add('tisogon','green')},
                        function(){this.add('tisogon','black')}
                       ];
const diaphaneityMsg = merge(diaphaneityBtn,diaphaneityFns,"fn");

export default class TrdBtn extends Component {
    add=(type,colortype)=>{
        this.props.add(type,colortype);
    }
    choiceIcon=(msg)=>{
        if(msg.icon){
            return <Icon type={msg.icon}/>
        }
        else{
            return <MyIcon type={msg.MyIcon}/>
        }
    }
    render() {
        var list=null;
        if(this.props.popo=='color'){
            const len = colorMsg.length;
            list = colorMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        else if(this.props=='diaphaneity'){

        }
        return <div className="third-button">{list}</div>
    }
}