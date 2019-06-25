import React,{Component} from 'react'
import {Input,Button} from 'antd'
import UpdateContent from './UpdateContent'

class ChatContent extends Component{
    constructor(){
        super()
    }
    render()
    {
        return (//交流内容
            <div style={{ width: 450 }}>
            {/* <Card > */}
            <div className="left">
               <p style={{fontSize:'25px'}}>
                  <UpdateContent coursecatalog={this.props.coursecatalog} Avatartype={this.props.Avatartype}/>
               </p> 
            </div>
            <div className="right">
              <Input placeholder="发送消息"  onChange={this.props.updatechatdata} style={{ width: 300 }}/>
               <Button type="primary" onClick={this.props.handlePlus}>发送</Button>
            </div>  
            {/* </Card> */}
            </div>
          );
    }
}
export default ChatContent;