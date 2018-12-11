import React, { Component } from 'react';
import { Button } from 'antd';
import {Link} from 'react-router-dom'

  class Access extends Component {
    render() {
      return (
        <div>
         登录、注册的地方
          <Button type="primary"><Link to='/'>登录</Link></Button>
        </div>

      );
    }
  }

  export default Access;