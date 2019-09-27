import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Swiper from 'swiper/dist/js/swiper.js'
// import 'swiper/dist/css/swiper.min.css'
import './NewAccount.css'
import {Row, Col,PageHeader,Typography,Divider,Layout,Icon,Button, Card } from 'antd';
import picurl from '../hd_logo.jpg'
import pic1 from '.././Systemjpg/1.png'
import pic2 from '.././Systemjpg/2.png'
import pic3 from '.././Systemjpg/3.jpg'
import pic4 from '.././Systemjpg/4.jpg'
import pic5 from '.././Systemjpg/5.png'
import { relative } from 'path';
const { Title } = Typography;
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;



class NewAccount extends Component {
  

  constructor(props, context) {
    super(props, context);
    
  }
  
  componentDidMount(){
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },

    autoplay:{
      disableOninteraction:false,
      delay:2000
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }, 
  }) 
} 


  render() {
    return (
      <div>
      {/* <Row> */}
      {/* <Title  level={3} className='title'><Icon type="usergroup-delete" />  在线协同研习系统</Title>  */}
      {/* <img className='title' src="http://m.qpic.cn/psb?/V11ktFxG4N4JjT/zQdtr.UmthenR7cxUevyS0rS3fYWqrujYjU.k1*skR4!/b/dL4AAAAAAAAA&amp;bo=5wBPAAAAAAARF4g!&amp;rf=viewer_4"  height="60px" width="220px"  />

      <Divider /> */}
       <Row style={{ background: "#1DA57A", width: "100%" }}>
          <Col span={12} style={{ textAlign: 'right' }}>  <img alt="logo" src={picurl} /> </Col>
          <Col span={12} style={{ textAlign: 'left', marginTop: '25px' }}>
            <span style={{ fontSize: '45px', color: '#fff', fontFamily: 'STKaiti', fontWeight: 'bold' }}>  在线协同研习系统</span>
          </Col>
        </Row>
      {/* </Row> */}
      
      <Row style={{ background: "#1DA57A",  width: "100%" ,height:"1000px"}}>
        <Col span={16} >
        <div class="swiper-card">
        <Card  >  
        <div class="swiper-container">  
         <div class="swiper-wrapper">
         <div class="swiper-slide"> <img src={pic3} width="100%" /></div>
         <div class="swiper-slide"> <img src={pic1} width="100%"/></div>
         <div class="swiper-slide"> <img src={pic2} width="100%"/></div>
         <div class="swiper-slide"> <img src={pic4} width="100%"/></div>
         <div class="swiper-slide"> <img src={pic5} width="100%"/></div>
         </div>
         
       {/* <-- 如果需要轮播小圆点 --> */}
       <div class="swiper-pagination  swiper-pagination-bullets">
       </div>
    
        {/* <-- 如果需要导航按钮 --> */}
       {/* <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>  */}
        </div>
        </Card>
        </div>

        </Col>
        <Col span={8} >
        <div className="Signup"><Link to='/Index/Register'><Button size="large" ><Icon type="smile" theme="twoTone" twoToneColor="#52c41a"/>注册</Button></Link></div>
        <div className="Login"><Link to='/Index/Access'><Button size="large" ><Icon type="smile" theme="twoTone" twoToneColor="#52c41a"/>登录</Button></Link></div>
        </Col>
      </Row>
      
      </div>
      
    )
  }
}
      
export default NewAccount;