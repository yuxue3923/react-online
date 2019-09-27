import React, { Component } from 'react';
import { Icon,Button,Popover,Input} from 'antd';
import TrdBtn from './TrdBtn'

const { Search } = Input;

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1231848_522d6c9esog.js',
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
        else if(msg.text){
            return <Search
                        placeholder="输入要添加的文字"
                        enterButton="添加"
                        size="large" 
                        onSearch={value => this.props.add('text',value)}
                    />
        }
        else{
            return <Button type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                        {this.choiceIcon(msg)}
                        <div>{msg.name}</div>
                    </Button>
        }
    }

    render() {
        const len = this.props.msgArr.length;
        const list = this.props.msgArr.map((msg,i)=><div key={i} className="list-item">{this.choicePopover(msg,i,len)}</div>)
        return <div className="second-button">{list}</div>
    }
}