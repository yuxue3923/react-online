import React,{Component} from 'react';
import {Icon,Input} from 'antd'

const IconAvator = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1009791_ev29rcbfmfr.js',
  });
class UpdateContent extends Component{
    constructor(){
        super()
    }
    render(){
        return  this.props.coursecatalog.map((v,i ) => {//显示聊天
            return (
              <div>
                <IconAvator type={this.props.Avatartype[i%5]}></IconAvator>
                <a style={{fontSize:10}}>{v.username}</a>
                <Input value={v.text}  style={{ width: 300 }}/>
              </div>    
            )
        })
    }
}
export default UpdateContent;