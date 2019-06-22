import React,{Component} from 'react';
import{Menu,Select,Row,Button,Input,Icon} from 'antd';

const Option = Select.Option;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_981127_oee7kc1cksg.js',
});

function handleChange(value) {
  console.log(`selected ${value}`);
}

class ContentModal extends Component{
    constructor(){
        super()

    }
    
    render(){

        return <div>
        <Row style={{margin: '8px 8px 8px 16px'}}> 
          <a style={{float:"left"}}>加入</a>
          <Button style={{float:"right"}} type="primary" ghost>{this.props.code}</Button>
        </Row>
        <Row style={{margin: '8px 8px 8px 16px'}}> 
          <a style={{float:"left"}}>https://ant.design/components/icon-cn/</a>
          <Button style={{float:"right"}} type="primary" >分享</Button>
        </Row>
      <Row style={{margin: '8px 8px 8px 16px'}}>
      <Menu.Divider />
      </Row>
      <Row style={{margin: '8px 8px 8px 16px'}}>
      
       <Select defaultValue="1" onChange={handleChange} style={{width:'100%'}}>
        
         <Option value="1"><IconFont type="anticon-piliangbianji" />允许任何人进行编辑</Option>
         <Option value="2"> <IconFont type="anticon-iconkuozhan_liulanpre" />只能查看浏览</Option>
       </Select>
       </Row>
      <Row style={{margin: '8px 8px 8px 16px'}}>
      <Menu.Divider />
      </Row>
        <Row style={{margin: '8px 8px 8px 16px'}}>
        <Input placeholder="输入需添加的成员用户名"  style={{ margin:'0px,0px,0px,-10px',width: '80% ',float:'left'}} onChange={this.props.searchuser}/>
        <Button onClick={this.props.createrelationship} style={{float:"right"}} type="primary">添加</Button>
        </Row>
      </div> 
    }
}
export default ContentModal;