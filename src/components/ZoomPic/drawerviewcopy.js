import React, { Component } from 'react';
import { List, Avatar, Icon} from 'antd';
// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_988038_ej9e5sv8svd.js',
// });
// var imgSrc = null;


// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );

class Drawerview extends Component {
    constructor(props, context) {
      super(props, context)
      this.pageChoose = this.pageChoose.bind(this)
  }
  pageChoose(Xst){
    this.props.pageChoose(Xst)
  }
  newSlide(i,page,e){  //i true for add false for delete
      this.props.newSlide(i,page)
  }
  componentWillMount(){
   // listData[0].title=this.props.thumbnail
    
  }

    render() {
     
      const length = this.props.thumbnail.length
      console.log("thumbnail:",this.props.thumbnail)
    //  console.log("pages:",length)
      const listData = [];
      for (let i = 0; i < length; i++) {
        listData.push({
          href: 'http://ant.design',
          title: `幻灯片 ${i+1}`,
          // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          // description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
          Xst:i+1
        });
      }
      return (
        <List
        itemLayout="vertical"
        size="large"
        /*pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}*/
        dataSource={listData}
        // footer={<div>
        //   <Button type="dashed"  shape="circle" onClick = {(e)=>this.newSlide(true,this.props.page)}>
        //          <IconFont type="anticon-plus-bold" />
        //   </Button>
        //   <Button type="dashed" shape="circle" onClick = {(e)=>this.newSlide(false,this.props.page)}>
        //          <IconFont type="anticon-jianshao"/>
        //   </Button>
        //   </div>}
        renderItem={item => (
          <List.Item
            key={item.title}
            // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
            // extra={<img width={200} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            
          >
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: '#fde3cf' }}> <Icon type='tags'/></Avatar>}
              title={<a href={item.href}>{item.title}</a>}
            //   description={item.description}
            />
            <img width="100%" alt="logo" src={typeof this.props.thumbnail[item.Xst-1].pageThumbnail !== "undefined"?this.props.thumbnail[item.Xst-1].pageThumbnail:this.props.thumbnail[item.Xst-1]} onClick={this.pageChoose.bind(this,item.Xst)}/>
          </List.Item>
        )}
      />
      );
    }
  }

  export default Drawerview;