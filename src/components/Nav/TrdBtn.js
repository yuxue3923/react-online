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

//橡皮大小属性
const eraserSizeBtn = [{MyIcon:'icon-size1'},{MyIcon:'icon-size2'},{MyIcon:'icon-size3'},{MyIcon:'icon-size4'},{MyIcon:'icon-size5'}];
const eraserSizeFns = [function(){this.props.add('eraser',2)},
                    function(){this.props.add('eraser',4)},
                    function(){this.props.add('eraser',6)},
                    function(){this.props.add('eraser',8)},
                    function(){this.props.add('eraser',10)},
                   ];
const eraserSizeMsg = merge(eraserSizeBtn,eraserSizeFns,"fn");

export default class TrdBtn extends Component {
    state = {
        opacityValue: 1,
        sizeValue: 1,
        angleValue: 0
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

    angleOnChange = value => {
        this.props.add('angle',value)
        this.setState({
            angleValue: value,
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
        if(this.props.popo==='strokeColor'){
            const len = strokeColorMsg.length;
            list = strokeColorMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        if(this.props.popo==='fillColor'){
            const len = fillColorMsg.length;
            list = fillColorMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        else if(this.props.popo==='diaphaneity'){
            const opacityValue = this.state.opacityValue;
            return(
                <Row>
                    <Col span={12}>
                        <Slider min={0} max={1} onChange={this.opacityOnChange} value={typeof opacityValue === 'number' ? opacityValue : 0} step={0.01}/>
                    </Col>
                    <Col span={4}>
                        <InputNumber min={0} max={1} style={{ marginLeft: 16 }} step={0.01} value={opacityValue} onChange={this.opacityOnChange}/>
                    </Col>
                </Row>)
        }
        else if(this.props.popo==='size'){
            const sizeValue = this.state.sizeValue;
            return(
                <Row>
                    <Col span={12}>
                        <Slider min={0.1} max={2} onChange={this.sizeOnChange} value={typeof sizeValue === 'number' ? sizeValue : 0} step={0.1}/>
                    </Col>
                    <Col span={4}>
                        <InputNumber min={0.1} max={2} style={{ marginLeft: 16 }} value={sizeValue} onChange={this.sizeOnChange} step={0.1}/>
                    </Col>
                </Row>)
        }
        else if(this.props.popo==='angel'){
            const angleValue = this.state.angleValue;
            return(
                <Row>
                    <Col span={12}>
                        <Slider min={0} max={2} onChange={this.angleOnChange} value={typeof angleValue === 'number' ? angleValue : 0} step={0.1}/>
                    </Col>
                    <Col span={4}>
                        <InputNumber min={0} max={2} style={{ marginLeft: 16 }} value={angleValue} onChange={this.angleOnChange} step={0.1}/>
                    </Col>
                </Row>)
        }
        else if(this.props.popo==='penSize'){
            const len = penSizeMsg.length;
            list = penSizeMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        else if(this.props.popo==='penColor'){
            const len = penColorMsg.length;
            list = penColorMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        else if(this.props.popo==='eraser'){
            const len = eraserSizeMsg.length;
            list = eraserSizeMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        else if(this.props.popo==='thickness'){
            const len = thicknessMsg.length;
            list = thicknessMsg.map((msg,i)=><Button key={i} type="primary" size="large" onClick={msg.fn&&msg.fn.bind(this)} className={len===i+1?"at-right-border":"normal"}>
                {this.choiceIcon(msg)}
            </Button>)
        }
        return <div className="third-button">{list}</div>
    }
}