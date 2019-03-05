import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

class MyTag extends React.Component {
  state = { checked: false };

  handleChange = (checked) => {
    this.setState({ checked });
  }

  render() {
    return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  }
}
export default MyTag;
