import React, { Component } from 'react';
import { Icon,Button,Popover} from 'antd';
import TrdBtn from './TrdBtn'


const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1231848_lebbqw1r21m.js',
});

export default class SndBtn extends Component {

    choiceIcon=(msg)=>{
        if(msg.icon){
            return <Icon type={msg.icon}/>
        }
        else{
            return <MyIcon type={msg.MyIcon}/>
        }
    }

    choicePopover=(msg,i,len)=>{
        if(msg.popo){
            return <Popover placement="bottomLeft" content={<TrdBtn popo={msg.popo} add={this.props.add}/>} overlayClassName="self-popover">
                        <Button type="primary" size="large" className={len===i+1?"at-right-border":"normal"}>
                            {this.choiceIcon(msg)}
                            <div>{msg.name}</div>
                        </Button>
                    </Popover>
        }
        else{
            return <Button type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                        {this.choiceIcon(msg)}
                        <div>{msg.name}</div>
                    </Button>
        }
    }

    linkTo=(url)=>{
        this.props.linkTo(url)
    }

    render() {
        const len = this.props.msgArr.length;
        const list = this.props.msgArr.map((msg,i)=><div key={i} className="list-item">{this.choicePopover(msg,i,len)}</div>)
        return <div className="second-button">{list}</div>
    }
}