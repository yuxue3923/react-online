import React, { Component } from 'react';
import {Form, Icon, Input, Button, Carousel,Checkbox, } from 'antd';
import {Link} from 'react-router-dom'
import './tempreview.css'

  class Tempreview extends Component {
    
    render() {
      
      return (
        <Carousel autoplay>
           <div>
             <h3>
             <img className="imgdiv"
               src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" height="154"/>
            </h3>
           </div>
           <div><h3>2</h3></div>
           <div><h3>3</h3></div>
           <div><h3>4</h3></div>
        </Carousel>
      );
    }
  }
  export default Tempreview;