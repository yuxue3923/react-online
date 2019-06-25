import React,{Component} from 'react';
import {Modal,Badge,span,Avatar,icon} from 'antd'
import ContentModal from './ContentModal'
class ShareModal extends Component{
    constructor(){
        super()
    }
    render(){
        return   <div className="flowbar" style={{left:410,top:20}}>
        <span style={{ marginRight: 24, }}>
            <Badge count={1}><Avatar className="iconsize" onClick={this.props.showModal} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}  icon="user" /></Badge>
            <Modal
             title="邀请成员"
             visible={this.state.modalvisible}
             onOk={this.handleOk}
             onCancel={this.handleCancel}
           //  footer={null}
          >
            {//{ContentModal(this.state.code)}
            }
            <ContentModal code = {this.props.code} searchuser={this.props.searchuser} createrelationship={this.props.createrelationship} />
          </Modal>
          </span>
        
        </div>

    }
}
export default ShareModal;