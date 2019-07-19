import React,{Component} from 'react'
import {Button,icon} from 'antd'
import Dragger from 'react-dragger-r'
import ChatContent from './Content'
import './drag.css'
 class DragContent extends Component{
     constructor(){
         super()
         this.state={
            title:'交流区间',
        }
     }
 
     render(){
      return (
        <div className={this.props.visible ? 'show': 'hidden'}>
          <Dragger className='draggerElem'>
            <div className='connectModal'>
           <h3 className='title'>{this.state.title}</h3>
           <Button className='closeBtn' icon='close' onClick={this.props.onClose} ></Button>
           <ChatContent coursecatalog={this.props.coursecatalog} Avatartype={this.props.Avatartype} updatechatdata={this.props.updatechatdata} handlePlus={this.props.handlePlus}/>          
           </div>
           </Dragger>
           </div>
           )
         
     }
 }


 export default DragContent;