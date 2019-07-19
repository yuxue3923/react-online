import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import { Row, Col,PageHeader,Typography,Divider,Layout,Icon,Button, Card } from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;


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
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }, 
  }) 
} 


  render() {
    return (
      <div className='background'>
      <Row>
      {/* <Title  level={3} className='title'><Icon type="usergroup-delete" />  在线协同研习系统</Title>  */}
      <img className='title' src="http://m.qpic.cn/psb?/V11ktFxG4N4JjT/zQdtr.UmthenR7cxUevyS0rS3fYWqrujYjU.k1*skR4!/b/dL4AAAAAAAAA&amp;bo=5wBPAAAAAAARF4g!&amp;rf=viewer_4"  height="60px" width="220px"  />

      <Divider />
      </Row>
      <Row>
        <Col span={12} >
        <div class="swiper-container"   >
         <div class="swiper-wrapper">
         <div class="swiper-slide"> <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&amp;quality=100&amp;size=b4000_4000&amp;sec=1563513818&amp;di=9db25b0e759f6d6a384c931b26345032&amp;src=http://txt22262.book118.com/2017/0210/book89853/89852984.jpg" width="100%" height="85%"/></div>
         <div class="swiper-slide">Slide 2</div>
         <div class="swiper-slide">Slide 3</div>
         </div>
    
    
       {/* <-- 如果需要导航按钮 --> */}
       <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        </div>
        </Col>
        <Col span={12} >
        <div className="Signup"><Link to='/Register'><Button size="large" type="primary">Sign Up</Button></Link></div>
        <div className="Login"><Link to='/Access'><Button size="large" type="primary">Log In</Button></Link></div>
        

        </Col>
      </Row>
      </div>
    )
  }
}
      
export default NewAccount;