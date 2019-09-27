import React, { Component } from 'react';
import { List, Icon,Button} from 'antd';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_988038_ej9e5sv8svd.js',
});

class Drawerview extends Component {
    constructor(props, context) {
      super(props, context)
      this.pageChoose = this.pageChoose.bind(this)
  }
  pageChoose(Xst){
    this.props.pageChoose(Xst)
   
    !this.props.isSingle&&this.props.socketFn({choose:Xst})
  }
  newSlide(i,page,e){  //i true for add false for delete
      this.props.newSlide(i,page)
      !this.props.isSingle&&this.props.socketFn({add:i,page:page})
  }

    render() {
      const title=this.props.cataloglist;
      const length = this.props.thumbnail.length
  //    console.log("thumbnail:",this.props.thumbnail)
    //  console.log("pages:",length)
      const listData = [];
      for (let i = 0; i < length; i++) {
        listData.push({
          // href: 'http://ant.design',
          title: title[i],
          // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          // description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
          Xst:i+1
        });
      }
      return (
        <div style={{
          overflowY:"auto",
          height:"893px"}}>
        
        <List
        itemLayout="vertical"
        size="large"
        split = {false}
       
        /*pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}*/
        dataSource={listData}
        footer={<div>
          <Button type="dashed"  shape="circle" onClick = {(e)=>this.newSlide(true,this.props.page)}>
                 <IconFont type="anticon-plus-bold" />
          </Button>
          <Button type="dashed" shape="circle" onClick = {(e)=>this.newSlide(false,this.props.page)}>
                 <IconFont type="anticon-jianshao"/>
          </Button>
          </div>}
        renderItem={item => (
          <List.Item
            key={item.title}
            // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
            // extra={<img width={200} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            style = {{display:"flex",flexDirection:'column',alignItems:"center"}}
          >
          
            <List.Item.Meta
              title={item.title}
              style={{display:"flex",alignSelf:'flex-start'}}
            />
            
            <img  style={this.props.page===item.Xst?{ borderStyle:'solid',borderColor:"rgb(196,49,29)",
            borderWidth:"1px"}:{/* boxShadow:"3px 3px 20px #888888", */
            borderStyle:'solid',borderColor:"rgb(219,219,219)",
            borderWidth:"1px"}} 
            width={220} height={150} alt="logo" 
            src={typeof this.props.thumbnail[item.Xst-1].pageThumbnail !== "undefined"?this.props.thumbnail[item.Xst-1].pageThumbnail:this.props.thumbnail[item.Xst-1]} 
            onClick={this.pageChoose.bind(this,item.Xst)}/>
           
          </List.Item>
         
        )}
      />
      </div>
      );
    }
  }

  export default Drawerview;