import React, { Component } from 'react';

import { Icon,Button} from 'antd';

export default class SndBtn extends Component {
    add=(type,colortype)=>{
        this.props.add(type,colortype);
    }
    render() {
        const len = this.props.msgArr.length;
        const list = this.props.msgArr.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
        <Icon type={msg.icon}/>
           <div>{msg.name} </div>
       </Button>)
        return <div className="second-button">{list}</div>
    }
}



