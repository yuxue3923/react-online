import React, { Component } from 'react';
import { List, Avatar, Icon} from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `幻灯片 ${i+1}`,
    // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    // description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: '幻灯片具体内容幻灯片具体内容幻灯片具体内容幻灯片具体内容幻灯片具体内容幻灯片具体内容',
  });
}

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );

class Drawerview extends Component {
    constructor(props, context) {
      super(props, context)
      
  }
  componentWillMount(){
    listData[0].title=this.props.thumbnail
  }
    render() {
      
      return (
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        footer={<div><Button type="primary" ghost icon="plus" ></Button><Button type="primary" ghost  icon="minus"></Button></div>}
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
            {item.content}
            <img width={150} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
          </List.Item>
        )}
      />
      );
    }
  }

  export default Drawerview;