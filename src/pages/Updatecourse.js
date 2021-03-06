import React, { Component } from 'react';
import {Form, Icon, Avatar,Input, Button,Select,Row,Col ,Switch,Modal,Layout,Card,message} from 'antd';
import {Link} from 'react-router-dom'
import './Creatcourse/creatcourse.css'
import $ from 'jquery';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/tree';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {localhost} from '../config'

const { TextArea } = Input;
const data= {
    "children": [
        {
            "children": [],
            "name": "一级目录",
        },
    ],
    "name": "课件总目录"
  }
const Option = Select.Option;
// const { Sider} = Layout;
// const TreeNode = Tree.TreeNode;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  function deepClone(obj){
    let _obj = JSON.stringify(obj);
    return JSON.parse(_obj)
  }
  class Updatecourse extends Component {
    static contextTypes={
      router:PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
          arrSize: 0,
          isOpen:"0",
          visible: true, //控制弹出框的呈现与隐藏
          coursecatalog:[],//课件目录
          coursedata:{},//课件信息
          knowledgelist:[],
          courseName:"",
        }
      }
      // 传入课件名称
      Inputcoursename(e){
        let coursename=e.target.value;
        if(coursename){
        this.setState({
          courseName:coursename,
        });
        this.getknowledgeRel(coursename);
      }else{
        this.setState({
          courseName:coursename,
        });
        this.getknowledgeRel("ttt");
      } 
      }
      //年级科目
      Inputgrade(value){
        this.setState({
          grade:value,
        });
      }
      Inputsubject(value){
        this.setState({
          subject:value,
        });
      }
      //传入课件描述
      Inputdescript(e){
        this.setState({
          descript: e.target.value,
        });
      }
      //传入是否公开
      Inputisopen(value){
        console.log(value);
        if(value===true){
        this.setState({
          isOpen:"1",
        });}
        else{
          this.setState({
            isOpen:"0",
          });
        }
      }
     
      //树状知识点点击事件
      onSelect = (e) => {
        console.log(e.target.value);
        const a=this.state.knowledgelist;
        const knowledges1={}; 
        knowledges1['title'] =e.target.value; 
        a.push(knowledges1);
        console.log(a[0].title);
        this.setState({
          knowledgelist:a
        });
      }
      deleteknowid(value){
        var array=this.state.knowledgelist;
          for (var i=0;i<array.length;i++){
            if(array[i].title===value){
               var index=i;
               console.log("index",index)
            }
          }
        array.splice(index,1);
        console.log(array);
        this.setState({
          knowledgelist:array,
        })
      }
      handlePlus() {
        if (this.state.arrSize < 7) {
            const coursecatalog1 = {}; 
            coursecatalog1['children'] =[];   
            coursecatalog1['name'] = "";
            this.state.coursecatalog.push(coursecatalog1);
          this.setState({ 
              arrSize: this.state.arrSize + 1 ,
        })
        this.CourseAppear(); 
        } else {
          Modal.warning({
            title: '注意：',
            content: '最多8个目录！',
          });
        }
      }
    
      handleMinus() {
        if (this.state.arrSize > 0) {
            this.state.coursecatalog.pop()
          this.setState({ 
              arrSize: this.state.arrSize - 1 ,
        })
        this.CourseAppear(); 
        } else {
          Modal.warning({
            title: '注意：',
            content: '最少1个目录！',
          });
        }
      }
      updatecourse = () =>{
        const know=this.state.knowledgelist;
        var knowsource=[];
        for(var i=0;i<know.length;i++){
           var obj=know[i];
           knowsource.push(obj.title);
        };
        const { login_info }=this.props;
          var temp = deepClone(this.state.coursedata)
        var passbydata = this.state.coursedata.createCourse_info
     
     var formData = deepClone(passbydata)

      delete formData.slides

      delete formData.thumbnail

      formData.courseName=this.state.courseName
      formData.grade=this.state.grade
      formData.subject=this.state.subject
      formData.descript=this.state.descript
      formData.knowledges=knowsource
      formData.children=this.state.coursecatalog
      formData.isOpen=this.state.isOpen

      formData.name = temp.createCourse_info.catalog.name
      formData.width = temp.createCourse_info.thumbnail.style.width

      formData.height = temp.createCourse_info.thumbnail.style.height

      formData.url = temp.createCourse_info.thumbnail.url
    
      formData.slide =  [...temp.createCourse_info.slides.slide]

      formData.templateId = deepClone(temp.createCourse_info.slides.templateId) 
    
           console.log(JSON.stringify(formData))
         
          
    
       
        //更新课件
        console.log("进入更新课件ajax");
        const {setCreatecourseState} = this.props;

        $.ajax({
            url: "http://"+localhost+":3000/api/updateCourse",
            async:false,
            type: "PUT",
            contentType:"application/json;charset=UTF-8",
            accepts:"application/json;charset=UTF-8",
            dataType: "json",
            data:JSON.stringify(formData),
            beforeSend:function(request){
              request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
            },
            success: function (data) {
                if (data.errorCode === 0) {
                    console.log('成功更新课件:',data);
                    message.success('成功更新课件~');
                    console.log(this.state.coursecatalog);
                    setCreatecourseState({
                        type:'createcourseSuccess',
                        payload:{
                            createCourse_info:data.msg[0],
                            course_id:data.msg[0]._id,
                            // numchat:false,
                        }
                      });
                      this.context.router.history.push("/Index/Edit");
                }
                else {
                    console.log('成功更新课件');
                    console.log(data.msg);
                }
            }.bind(this),
            error: function (xhr, status, err) {
              console.log("更新课件操作错误")
            }
        });
    }
    getdata() {
        const { login_info ,updatecourseid}=this.props;
        var a=updatecourseid;
        var data = {
            "_id" :a.toString(),
        };
        console.log('进入researchByCourseId接口');
        console.log(JSON.stringify(data));
        $.ajax({
          url: "http://"+localhost+":3000/api/researchByCourseId",
          async:false,
          type: "GET",
          contentType:"application/json;charset=UTF-8",
          dataType: "json",
          data:data,
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
          },
          success: function(data) {
            if (data.errorCode === 0) {
              console.log('获取查询权限111');
              console.log(data);
              const a=data.msg[0].knowledges;
              const knowcontain=[];
              for(var i=0;i<a.length;i++){
              const coursecatalog1 = {};   
              coursecatalog1['title'] = a[i];
              knowcontain.push(coursecatalog1);
              }
            
             data.msg&&data.msg[0]&&data.msg[0].catalog&&data.msg[0].catalog.children&&this.setState({
                coursedata:{
                  createCourse_info:data.msg[0],
                  course_id:data.msg[0]._id},
                arrSize: data.msg[0].catalog.children.length,
                isOpen:data.msg[0].isOpen,
                coursecatalog:data.msg[0].catalog.children,
                courseName:data.msg[0].courseName,
                grade: data.msg[0].grade,
                subject: data.msg[0].subject,
                descript: data.msg[0].descript,
                // knowledges:data.msg[0].knowledges,
                knowledgelist:knowcontain,
                templateId:data.msg[0].slides.templateId,
                slide: data.msg[0].slides.slide,     
                fileSize:data.msg[0].fileSize,
                scope:data.msg[0].scope,
                addTime:data.msg[0].addTime,
                views: data.msg[0].views,
                url:data.msg[0].thumbnail.url,
                width:data.msg[0].thumbnail.style.width,
                height:data.msg[0].thumbnail.style.height
              });
            }
            else {   
              console.log('获取查询权限2222');
               
            }
          }.bind(this),
          error: function (xhr, status, err) {
          }
        });
      }
      getknowledgeRel(value) {
        const { login_info }=this.props;
        console.log('进入knowledgeRel ajax');
        console.log(login_info.access_token);
        $.ajax({
          url: "http://"+localhost+":3000/api/knowledgeRel",
          data:"courseName="+value,
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
          },
          type: "GET",
          dataType: "json",
          async:false,
          success: function (data) {
            if (data.errorCode === 0) {
              console.log('获取关联知识点');
              console.log(data);
              if(data.msg){
              this.setState({
                // courseName:value,
                knowledgelist:data.msg,
              });
            }
            }
            else {   
              console.log('获取关联知识点2222');
            }
          }.bind(this),
          error: function (xhr, status, err) {
          }
        });
      }
      componentWillMount(){
        this.getdata();
      }
      componentDidMount(){
          this.getdata();
          this.CourseAppear();
      }
      CourseAppear() {
        let a=this.state.coursecatalog;
        this.setState({ 
          coursecatalog: a,
       })
        console.log("课件展示区")
        console.log(JSON.stringify(this.state.coursecatalog))
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        // myChart.showLoading();    //显示Loading标志； var myChart = echarts.init(document.getElementById('页面中div的id')); 
// $.get('./data.json', function (data) {
    // myChart.hideLoading();    //得到数据后隐藏Loading标志
 
    echarts.util.each(data.children, function (datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
    });    //间隔展开子数据，animate，display，physics，scale，vis是展开的
 
    myChart.setOption({
        tooltip: {    //提示框组件
            trigger: 'item',    //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
            triggerOn: 'mousemove'    //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：        
        },
        series: [    //系列列表
            {
                type: 'tree',    //树形结构
                data: [{
                  "children": this.state.coursecatalog,
                //   "children": [{
                //     "children": [],
                //     "name": "数学知识点1"
                //  }],
                  "name": "课件总目录"
                }],    //上面从flare.json中得到的数据
 
                top: '1%',       //距离上
                left: '15%',      //左
                bottom: '1%',    //下
                right: '20%',    //右的距离
 
                symbolSize: 7,   //标记的大小，就是那个小圆圈，默认7
 
                label: {         //每个节点所对应的标签的样式
                    normal: {
                        position: 'left',       //标签的位置
                        verticalAlign: 'middle',//文字垂直对齐方式，默认自动。可选：top，middle，bottom
                        align: 'right',         //文字水平对齐方式，默认自动。可选：top，center，bottom
                        fontSize: 9             //标签文字大小
                    }
                },
 
                leaves: {    //叶子节点的特殊配置，如上面的树图示例中，叶子节点和非叶子节点的标签位置不同
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },
 
                expandAndCollapse: true,    //子树折叠和展开的交互，默认打开
                animationDuration: 550,     //初始动画的时长，支持回调函数,默认1000
                animationDurationUpdate: 750//数据更新动画的时长，默认300
            }
        ]
      });
// });
    }
    render() {
      const treeList = this.state.knowledgelist.map((v, i) => {
        return (
          <div>
          <Row gutter={16}>
            <Col span={20}>
              <div key={i}>{v.title}</div>
            </Col>
            <Col span={4}>
              <Icon type="minus-square" onClick={this.deleteknowid.bind(this,v.title)}/>
            </Col>
          </Row>
          </div>
        );}
      )
      return (
        <Layout style={{ backgroundColor: '#fff',height:'100%',width:'100%' }}> 
         <div className='flowbar' style={{right:30,top:20}}>
        <Link to='/Index/User'><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" >U</Avatar></Link>
        <span style={{padding:10,fontSize:15}}>当前用户</span>
        </div>
         
       
     
        {/* </Header> */} 
      <Card  style={{height:'100%',width:'100%'}}>
         
        <div>
         <Row gutter={16}>
         <Col span={9}>
         <Row gutter={16}>
         <Col span={8}>
         </Col>
          <Col span={8}>
        <div style={{ color: 'green', fontSize:'20px',margin:'20px 0px 30px 0px' }} >修改课件</div>
         </Col>
         </Row>
        <Form style={{margin:'20px 0px 0px 0px'}}>
          <Form.Item label="课件名称" {...formItemLayout}>
            <Input value={this.state.courseName} onChange={this.Inputcoursename.bind(this)} style={{ width: 300 }}/>
          </Form.Item>
          <Form.Item label="年级科目" {...formItemLayout}>
          <Row gutter={16}>
          <Col span={12}>
          <Select onChange={this.Inputgrade.bind(this)} style={{width:'100%'}} value={this.state.grade}>
                    <Option value="小学">小学</Option>
                    <Option value="初中"> 初中</Option>
                    <Option value="高中">高中</Option>
          </Select> 
          </Col> 
          <Col span={12}>
           <Select onChange={this.Inputsubject.bind(this)} style={{width:'100%'}} value={this.state.subject}>
                    <Option value="语文">语文</Option>
                    <Option value="数学">数学</Option>
                    <Option value="英语">英语</Option>
                    <Option value="物理">物理</Option>
                    <Option value="化学">化学</Option>
                    <Option value="生物">生物</Option>
                    <Option value="政治">政治</Option>
                    <Option value="历史">历史</Option>
                    <Option value="地理">地理</Option>
            </Select> 
            </Col> 
            </Row>                 
          </Form.Item>
          <Form.Item label="课件简介" {...formItemLayout}>
           <TextArea onChange={this.Inputdescript.bind(this)} style={{ minHeight: 32 ,minWidth: 300}} value={this.state.descript} rows={4} />
          </Form.Item>
          <Form.Item label="手动输入关联知识点" {...formItemLayout}>
            <Input placeholder="20字以内" onPressEnter={this.onSelect.bind(this)} style={{ width: 300 }}/>
          </Form.Item>
          <Form.Item label="关联知识点" {...formItemLayout}>
          <Row gutter={16}>
          <Col span={24}>
             <Card> 
                {treeList}
             </Card>
          </Col> 
          </Row>                 
          </Form.Item>
          <Form.Item label="公开/私密" {...formItemLayout}>
          <Row gutter={8}>
          <Col span={10}>
             <Switch onChange={this.Inputisopen.bind(this)} checkedChildren="公开" unCheckedChildren="私密" defaultChecked={this.state.isOpen}/>
          </Col> 
          </Row>
          </Form.Item>
          <Form.Item label="课件目录" {...formItemLayout}>
          <Row gutter={16}>
           <Col span={12}>
            <Button type="dashed" style={{ width: '100%' }} onClick={this.handlePlus.bind(this)}><Icon type="plus" />添加</Button>
            </Col>
            <Col span={12}>
            <Button type="dashed" style={{ width:'100%' }} onClick={this.handleMinus.bind(this)}><Icon type="minus" />删除</Button>
            </Col>
            </Row>
          </Form.Item>
          <Form.Item label="目录名称" {...formItemLayout}>
          <Row key={this.state.arrSize}>
                <Col span={8}>
                  {
                    this.state.coursecatalog.map((v,i ) => {
                      return (
                        <Row gutter={8} key={i}>
                           <Col span={10}>
                          <Input style={{ width: 300 }}
                          onChange={(e)=>{
                            v.name = e.target.value; 
                            this.CourseAppear();  
                          }} value={v.name}
                          />
                           </Col>
                        </Row>
                      )
                })
                  }
                </Col>
            </Row>
            </Form.Item>
        </Form>
           <Row gutter={16}>
             <Col span={8}>
             </Col>
            <Col span={16}>
             <Button type="primary" onClick={this.updatecourse} style={{margin:'0px 0px 0px 100px'}}>确认修改</Button>
             </Col>
           </Row>
            </Col>
            <Col span={15}>
              <Card style={{margin:'80px 0px 30px 80px',width:550 }} title="课件目录大纲">
               <div id="main" style={{ width: 500, height: 500 }}></div>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
      </Layout>
      );
    }
  }
  const Updatecourse_Index=Form.create()(Updatecourse);
  function  mapStateToProps(state) {
    return{
       login_info:state.reducer_login.login_info,
       updatecourseid:state.reducer_userupdatecourseid.updatecourseid,
    };
  }
  function mapDispatchToProps(dispatch){
    return{
        setCreatecourseState: (state) => dispatch(state),
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Updatecourse_Index);
