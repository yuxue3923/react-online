import React, { Component } from 'react';
import { List, Avatar, Icon,Button,Tabs,Tree} from 'antd';
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_988038_ej9e5sv8svd.js',
});
const listData = [];
for (let i = 0; i < 4; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `幻灯片 ${i+1}`,
    // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    // description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    Xst:i+1
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
      this.pageChoose = this.pageChoose.bind(this)
  }
  //树状知识点点击事件
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  pageChoose(Xst){
    this.props.pageChoose(Xst)
  }
  componentWillMount(){
    listData[0].title=this.props.thumbnail
  }

    render() {
      const course_map=(
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
        footer={<div>
          <Button type="dashed"  shape="circle" >
                 <IconFont type="anticon-plus-bold" />
          </Button>
          <Button type="dashed" shape="circle" >
                 <IconFont type="anticon-jianshao"/>
          </Button>
          </div>}
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
            <img width={150} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" onClick={this.pageChoose.bind(this,item.Xst)}/>
          </List.Item>
        )}
      />
      );
      const course_list=(
        <div>
                <div borderd={false} title="选择知识点" style={{ margin: '16px 16px 16px 16px'}}>
                      <Tree showLine defaultExpandedKeys={['0-0-0', '0-1-2']} onSelect={this.onSelect}>
                        <TreeNode title="一次方程" key="0-0">
                          <TreeNode title="一次方程概念" key="0-0-0" />
                          <TreeNode title="一次方程特点" key="0-0-1" />
                          <TreeNode title="一次方程应用" key="0-0-2">
                            <TreeNode title="应用实例" key="0-0-2-0" />
                          </TreeNode>
                        </TreeNode>
                        <TreeNode title="二次方程" key="0-1">
                          <TreeNode title="二次方程概念" key="0-1-0" />
                          <TreeNode title="二次方程特点" key="0-1-1" />
                          <TreeNode title="二次方程应用" key="0-1-2">
                            <TreeNode title="应用实例" key="0-1-2-0" />
                          </TreeNode>
                        </TreeNode>
                        <TreeNode title="二次函数" key="0-2" />
                        <TreeNode title="分数" key="0-3" />
                        <TreeNode title="比值" key="0-4" />
                      </Tree>
                    </div>
            </div>
      );
      return (
        <div>
          <Tabs defaultActiveKey="map" size="large">
              <TabPane tab="缩略图" key="map">
              {course_map}
              </TabPane>
              <TabPane tab="列表" key="list">
                {course_list}
              </TabPane>
            </Tabs>
        </div>
      
      );
    }
  }

  export default Drawerview;