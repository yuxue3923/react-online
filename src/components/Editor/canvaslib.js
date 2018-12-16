//import srender from 'srender'
import srender from 'srenderlib'
import React from 'react'
import {Button} from 'antd'


export default class editor extends React.Component {
    constructor(props, context) {
        super(props, context)
       // this.initPie = this.initPie.bind(this)
        this.state = {
            add:false
        }
    }
   add(){
    alert("ll")
    console.log("trig")
       this.setState({
           add:!this.state.add
       })
   // this.componentDidMount()
   }
    componentDidMount() {
        
        var dom = document.getElementsByClassName('container')[0]
        var sr = srender.init(dom)
        var w = sr.getWidth();
        var h = sr.getHeight();

        var r = 30;

       



       
        var circle = new srender.Circle({
            shape: {
                cx: r,
                cy: h / 2,
                r: r
            },
            style: {
                fill: 'transparent',
                stroke: '#FF6EBE'
            },
            silent: true
        });
        
            circle.animate('shape', true)
                .when(5000, {
                    cx: w - r
                })
                .when(10000, {
                    cx: r
                })
                .start();
        
        sr.add(circle);
        var sun = new srender.Circle({
            shape: {
                cx: 0,
                cy: 0,
                r: 50
            },
            style: {
                fill: '#FF904F'
            },
            position: [w / 2, h / 2],
            draggable: true,
        });

        sr.add(sun);
        var sun1 = new srender.Circle({
            shape: {
                cx: 0,
                cy: 0,
                r: 20
            },
            style: {
                fill: '#FF9'
            },
            position: [w / 2, h / 2],
            draggable: true,
        });
        sr.add(sun1);
        var rect = new srender.Rect({
            shape: {
                r: 1,
                x: 100,
                y: 100,
                width: 100,
                height: 100
            }
        })
       
        /////** */
       function addShape(){
            sr.add(rect)
        }
        if(this.state.add){
            addShape()
        }
        /** */

        console.log(sr)



        console.log(sr.handler._$handlers)
        console.log(sr.handler.proxy._$handlers)
    }
    render() {
        return (

            <div>
                <Button onClick={this.add.bind(this)}>
                    {`buttonaaaaaa
                    aaaaa`}
                </Button>
            <div className="container" style={{height:'904px',width:'1418px'}}></div>
            </div>

        )
    }

}