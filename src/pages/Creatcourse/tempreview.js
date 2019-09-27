import React, { Component } from 'react';
import {Icon,Carousel} from 'antd';
import {Link} from 'react-router-dom'
import './tempreview.css'

  class Tempreview extends Component {
    
    render() {
      
      return (
        <div>
        <div className="flowbar" style={{right:10,top:20}}>
            <span style={{ marginRight: 24, }}>
            <Link to='/Index/Account'><Icon style={{ color: '#f56a00',fontSize:'35px' }}  type="rollback"/></Link>
            </span>
        </div>
        <Carousel autoplay>
           <div>
             <h3>
             <img className="imgdiv" alt="1"
               src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" height="600"/>
            </h3>
           </div>
           <div>
             <h3>
               <img className="imgdiv" alt="2"
               src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" height="600"/>
             </h3>
           </div>
           <div>
             <h3><img className="imgdiv" alt="3"
               src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" height="600"/>
            </h3>
          </div>
           <div>
             <h3><img className="imgdiv" alt="4"
               src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" height="600"/>
            </h3>
          </div>
        </Carousel>
        </div>
      );
    }
  }
  export default Tempreview;