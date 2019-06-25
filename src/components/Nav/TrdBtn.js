import React, { Component } from 'react';
import { mergeObjectArr as merge} from './util'
import { Icon,Button,Slider,InputNumber,Row,Col} from 'antd';

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1231848_522d6c9esog.js',
});

//边框颜色属性
const strokeColorBtn = [{MyIcon:'icon-white'},{MyIcon:'icon-red'},{MyIcon:'icon-yellow'},{MyIcon:'icon-blue'},{MyIcon:'icon-green'},{MyIcon:'icon-black'}];
const strokeColorFns = [function(){this.props.add('strokeColor','white')},
                        function(){this.props.add('strokeColor','red')},
                        function(){this.props.add('strokeColor','yellow')},
                        function(){this.props.add('strokeColor','blue')},
                        function(){this.props.add('strokeColor','green')},
                        function(){this.props.add('strokeColor','black')}
                       ];
const strokeColorMsg = merge(strokeColorBtn,strokeColorFns,"fn");

//填充颜色属性
const fillColorBtn = [{MyIcon:'icon-white'},{MyIcon:'icon-red'},{MyIcon:'icon-yellow'},{MyIcon:'icon-blue'},{MyIcon:'icon-green'},{MyIcon:'icon-black'}];
const fillColorFns = [function(){this.props.add('fillColor','white')},
                      function(){this.props.add('fillColor','red')},
                      function(){this.props.add('fillColor','yellow')},
                      function(){this.props.add('fillColor','blue')},
                      function(){this.props.add('fillColor','green')},
                      function(){this.props.add('fillColor','black')}
                     ];
const fillColorMsg = merge(fillColorBtn,fillColorFns,"fn");

//大小属性
const thicknessBtn = [{MyIcon:'icon-size1'},{MyIcon:'icon-size2'},{MyIcon:'icon-size3'},{MyIcon:'icon-size4'},{MyIcon:'icon-size5'}];
const thicknessFns = [function(){this.props.add('thickness',2)},
                      function(){this.props.add('thickness',4)},
                      function(){this.props.add('thickness',6)},
                      function(){this.props.add('thickness',8)},
                      function(){this.props.add('thickness',10)},
                     ];
const thicknessMsg = merge(thicknessBtn,thicknessFns,"fn");

//画笔大小属性
const penSizeBtn = [{MyIcon:'icon-size1'},{MyIcon:'icon-size2'},{MyIcon:'icon-size3'},{MyIcon:'icon-size4'},{MyIcon:'icon-size5'}];
const penSizeFns = [function(){this.props.add('penSize',2)},
                    function(){this.props.add('penSize',4)},
                    function(){this.props.add('penSize',6)},
                    function(){this.props.add('penSize',8)},
                    function(){this.props.add('penSize',10)},
                   ];
const penSizeMsg = merge(penSizeBtn,penSizeFns,"fn");

//画笔颜色属性
const penColorBtn = [{MyIcon:'icon-white'},{MyIcon:'icon-red'},{MyIcon:'icon-yellow'},{MyIcon:'icon-blue'},{MyIcon:'icon-green'},{MyIcon:'icon-black'}];
const penColorFns = [function(){this.props.add('penColor','white')},
                     function(){this.props.add('penColor','red')},
                     function(){this.props.add('penColor','yellow')},
                     function(){this.props.add('penColor','blue')},
                     function(){this.props.add('penColor','green')},
                     function(){this.props.add('penColor','black')}
                    ];
const penColorMsg = merge(penColorBtn,penColorFns,"fn");

export default class TrdBtn extends Component {
    state = {
        opacityValue: 0,
        sizeValue: 0,
    };

    opacityOnChange = value => {
        this.props.add('opacity',value)
        this.setState({
            opacityValue: value,
        });
    };

    sizeOnChange = value => {
        this.props.add('size',value)
        this.setState({
            sizeValue: value,
        });
    };

    choiceIcon=(msg)=>{
        if(msg.icon){
            return <Icon type={msg.icon}/>
        }
        else{
            return <MyIcon type={msg.MyIcon}/>
        }
    }
    render() {
        var list=null;
        if(this.props.popo=='strokeColor'){
            const len = strokeColorMsg.length;
            list = strokeColorMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        if(this.props.popo=='fillColor'){
            const len = fillColorMsg.length;
            list = fillColorMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        else if(this.props.popo=='diaphaneity'){
            const inputValue = this.state.opacityValue;
            return(
                <Row>
                    <Col span={12}>
                        <Slider min={0} max={1} onChange={this.opacityOnChange} value={typeof inputValue === 'number' ? inputValue : 0} step={0.01}/>
                    </Col>
                    <Col span={4}>
                        <InputNumber min={0} max={1} style={{ marginLeft: 16 }} step={0.01} value={inputValue} onChange={this.opacityOnChange}/>
                    </Col>
                </Row>)
        }
        else if(this.props.popo=='size'){
            const inputValue = this.state.sizeValue;
            return(
                <Row>
                    <Col span={12}>
                        <Slider min={1} max={100} onChange={this.sizeOnChange} value={typeof inputValue === 'number' ? inputValue : 0} />
                    </Col>
                    <Col span={4}>
                        <InputNumber min={1} max={100} style={{ marginLeft: 16 }} value={inputValue} onChange={this.sizeOnChange}/>
                    </Col>
                </Row>)
        }
        else if(this.props.popo=='penSize'){
            const len = penSizeMsg.length;
            list = penSizeMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        else if(this.props.popo=='penColor'){
            const len = penColorMsg.length;
            list = penColorMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        else if(this.props.popo=='thickness'){
            const len = thicknessMsg.length;
            list = thicknessMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        return <div className="third-button">{list}</div>
    }
}