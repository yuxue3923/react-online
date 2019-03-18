import React, { Component } from 'react';
import { Pagination,Card, Icon,Row, Col,Input,Upload, message,Button,Tabs } from 'antd';
import './sider.css';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const { Meta } = Card;
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
  class sider extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = {
        resourcelist:this.props.resourcelist,
        current:1,//图片资源当前页
        currentpage:1,//视频资源当前页
        textcurrentpage:1,//文本资源当前页
      }
  }
 
  onChange=(page)=>{
    this.setState(
      {
        current:page,
      }
    )
  }
  onChangepage=(page)=>{
    this.setState(
      {
        currentpage:page,
      }
    )
  }
  onChangetext=(page)=>{
    this.setState(
      {
        textcurrentpage:page,
      }
    )
  }
  callback(key) {
    console.log(key);
    console.log(this.state.resourcelist);
  }
  componentDidMount() {
    console.log(this.state.source)
  }
    render() {
      const resource=this.state.resourcelist;
      // console.log(this.state.source)
      var imgresource=[];
      for(var i=0;i<resource.length;i++){
        var obj=resource[i];
        if(obj.rtype ==="图片"){
          imgresource.push(obj);
        }
      };
      var videoresource=[];
      for(var j=0;j<resource.length;j++){
        var objec=resource[j];
        if(objec.rtype ==="视频"){
          videoresource.push(objec);
        }
      };
      var textresource=[];
      for(var k=0;k<resource.length;k++){
        var obje=resource[k];
        if(obje.rtype ==="文本"){
          textresource.push(obje);
        }
      };
      const imgresourceList = imgresource.map((v, i) => {
        return (
          <div>
          <Row gutter={16}>
            <Col span={8}>
                <Card
                  style={{ width:220 ,height:230}}
                  cover={
                    <img style={{ width:220 ,height:130}} onClick={()=>this.props.Getsource(v)}
                      alt="example"
                      src={v.file_url}
                    />
                  }
                >
                  <Row>
                    <Col span={18}>
                      <Meta  title={v.r_name} />
                    </Col>
                    <Col span={6}>
                      <Icon type="star-o" onClick={()=>this.props.Getsource(v)} /><span style={{fontSize:'1px'}}> 应用</span>
                  </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col span={7}>
                      <Icon type="like-o" /><span style={{fontSize:'1px'}}>1718</span>
                  </Col>
                    <Col span={8}><span style={{fontSize:'1px'}}>积分：49</span></Col>
                    <Col span={9}><span style={{fontSize:'1px'}}>引用数：89</span></Col>
                  </Row>
                </Card>
            </Col>
          </Row>
        </div>
        );}
      );
      const videosourceList =videoresource.map((v, i) => {
        return (
          <div>
          <Row gutter={16}>
            <Col span={8}>
                <Card
                  style={{ width:220 ,height:230}}
                  cover={
                    <Video style={{ width:220 ,height:130}} autoPlay loop muted
                         controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                         poster=""
                         onCanPlayThrough={() => {
                         // Do stuff
                         }}>
                        <source src={v.file_url} type="video/mp4" />
                        <track label="English" kind="subtitles" srcLang="en" src="" default />
                    </Video>
                    }
                   >
                  <Row>
                    <Col span={18}>
                      <Meta  title={v.r_name} />
                    </Col>
                    <Col span={6}>
                      <Icon type="star-o" onClick={()=>this.props.Getsource(v)}/><span style={{fontSize:'1px'}}> 应用</span>
                  </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col span={7}>
                      <Icon type="like-o" /><span style={{fontSize:'1px'}}>1718</span>
                  </Col>
                    <Col span={8}><span style={{fontSize:'1px'}}>积分：49</span></Col>
                    <Col span={9}><span style={{fontSize:'1px'}}>引用数：89</span></Col>
                  </Row>
                </Card>
            </Col>
          </Row>
        </div>
        );}
      );
      const textsourceList = textresource.map((v, i) => {
        return (
          <div>
          <Row gutter={16}>
            <Col span={8}>
                <Card
                  style={{ width:220 ,height:230}}
                  cover={
                    <TextArea onClick={()=>this.props.Getsource(v)} style={{ minHeight: 130 ,minWidth: 220}} value={v.r_descript} rows={4} />
                    // <div style={{ width:220 ,height:130}} onClick={()=>this.props.Getsource(v)}>
                    //   {v.r_descript}
                    // </div>
                  }
                >
                  <Row>
                    <Col span={18}>
                      <Meta  title={v.r_name} />
                    </Col>
                    <Col span={6}>
                      <Icon type="star-o" onClick={()=>this.props.Getsource(v)} /><span style={{fontSize:'1px'}}> 应用</span>
                  </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col span={7}>
                      <Icon type="like-o" /><span style={{fontSize:'1px'}}>1718</span>
                  </Col>
                    <Col span={8}><span style={{fontSize:'1px'}}>积分：49</span></Col>
                    <Col span={9}><span style={{fontSize:'1px'}}>引用数：89</span></Col>
                  </Row>
                </Card>
            </Col>
          </Row>
        </div>
        );}
      );
      var ownMap=(list,current)=>{
        if(list.length===0){
          return <div className='cardstyle'>
             <div>当前没有图片资源哟~</div>
        </div>
         }
         else{
        for(let i=(current-1)*6;i<list.length;){
          return <div className='cardstyle'>
          <Row>
            <Col span={8}>{list[i]}</Col>
            <Col span={8}>{list[i+1]}</Col>
            <Col span={8}>{list[i+2]}</Col> 
          </Row>
          <Row>
            <Col span={8}>{list[i+3]}</Col>
            <Col span={8}>{list[i+4]}</Col>
            <Col span={8}>{list[i+5]}</Col> 
          </Row>
          <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
          <Pagination current={this.state.current} onChange={this.onChange} total={list.length} pageSize={6}/>
          </Row>
        </div>
        }
       }
      }
       var videoownMap=(list,current)=>{
        if(list.length===0){
          return <div className='cardstyle'>
             <div>当前没有视频资源哟~</div>
        </div>
         }
         else{
        for(let i=(current-1)*6;i<list.length;){
          return <div className='cardstyle'>
          <Row>
            <Col span={8}>{list[i]}</Col>
            <Col span={8}>{list[i+1]}</Col>
            <Col span={8}>{list[i+2]}</Col> 
          </Row>
          <Row>
            <Col span={8}>{list[i+3]}</Col>
            <Col span={8}>{list[i+4]}</Col>
            <Col span={8}>{list[i+5]}</Col> 
          </Row>
          <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
          <Pagination current={this.state.currentpage} onChange={this.onChangepage} total={list.length} pageSize={6}/>
          </Row>
        </div>
        }
       }
      }
       var textownMap=(list,current)=>{
         if(list.length===0){
          return <div className='cardstyle'>
             <div>当前没有文本资源哟~</div>
        </div>
         }
         else{
        for(let i=(current-1)*6;i<list.length;){
          return <div className='cardstyle'>
          <Row>
            <Col span={8}>{list[i]}</Col>
            <Col span={8}>{list[i+1]}</Col>
            <Col span={8}>{list[i+2]}</Col> 
          </Row>
          <Row>
            <Col span={8}>{list[i+3]}</Col>
            <Col span={8}>{list[i+4]}</Col>
            <Col span={8}>{list[i+5]}</Col> 
          </Row>
          <Row style={{ margin: '8px 8px 8px 0',textAlign: 'center' }}>
          <Pagination current={this.state.textcurrentpage} onChange={this.onChangetext} total={list.length} pageSize={6}/>
          </Row>
        </div>
        }
      }
       }
         const cardList_img = ownMap(imgresourceList,this.state.current)
         const cardList_video = videoownMap(videosourceList,this.state.currentpage)
         const cardList_text = textownMap(textsourceList,this.state.textcurrentpage)
      return (
        
          <div className='divContent'>
             
             <Input className='inputstyle' placeholder="输入搜索资源关键字" />
             
             
             <Upload {...props}>
                  <Button>
                     <Icon type="upload" /> 上传本地资源
                  </Button>
              </Upload>
              
              <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} >
                  <TabPane tab="视频" key="1">{cardList_video}</TabPane>
                  <TabPane tab="图片" key="2">{cardList_img}</TabPane>
                  <TabPane tab="文本" key="3">{cardList_text}</TabPane>
              </Tabs>
              </div>
      );
    }
  }

  export default sider;