import React, { Component } from 'react';
import { Form, Input, Button, Card ,Divider} from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class AddKnowledge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      echartsoption: {
        selectedName: '',
        selectIndex: -1,
        ifAdd: false,
        ifDelete: false,
        newname: ''
      }
    }
  }
  getdata(EchartsIndexName) {
    // const { EchartsIndexName } = this.props;
    // console.log('进入页面~~~~~~~~~~~~', EchartsIndexName)
    if (EchartsIndexName) {
      this.setState({
        selectedName: EchartsIndexName.name
      })
      // setTimeout(() => {
      //   console.log('进入页面~~~~~~~~~~~~this.state.selectedName', this.state.selectedName)
      // }, 100);

    }
  }
  changename(e) {
    this.setState({
      newname: e.target.value
    });
  }
  handleClick_delete() {
    const { EchartsIndexName } = this.props;
    this.props.handleDelete(EchartsIndexName.index, EchartsIndexName.name, EchartsIndexName.id);
  }
  handleClick() {
    const { EchartsIndexName } = this.props;
    this.props.handleAdd(EchartsIndexName.index, EchartsIndexName.name, EchartsIndexName.id, this.state.newname);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.EchartsIndexName !== this.props.EchartsIndexName) {
      this.getdata(nextProps.EchartsIndexName);
    }
  }
  componentDidMount(){
    this.getdata(this.props.EchartsIndexName);
  }
  render() {

    return (
      <Card style={{ height: '450px', marginTop: '30px' }}>

        <Form style={{ paddingTop: '10px' }}>
          <FormItem
            label={<span style={{ fontWeight: 'bold' }}>选中节点为</span>}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            hasFeedback
            style={{ marginBottom: '5px' }}
          >
            <span style={{ paddingLeft: "30px" }}>{this.state.selectedName}</span>
          </FormItem>
          <Divider />
          
          <FormItem
            label="为其添加下级知识点"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            hasFeedback
          >
            <Input onChange={this.changename.bind(this)} />
          </FormItem>
          <FormItem>
            <Button type="primary" style={{ marginLeft: "100px" }} onClick={this.handleClick.bind(this)}>添加知识点</Button>
          </FormItem>
          <FormItem>
            <Button type="primary" style={{ marginLeft: "100px" }} onClick={this.handleClick_delete.bind(this)}>删除知识点</Button>
          </FormItem>
        </Form>
      </Card>
    )
  }

}


function mapStateToProps(state) {
  return {
    EchartsIndexName: state.reducer_echarts.EchartsIndexName
  };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddKnowledge);