//import zrender from 'zrender'
import zrender from 'srenderlib'
import React from 'react'
export default class editor extends React.Component {

    componentDidMount() {
        var dom = document.getElementsByClassName('container')[0]
        var zr = zrender.init(dom)
        var w = zr.getWidth();
        var h = zr.getHeight();

        var r = 30;

        var elementStyle = {
            stroke: '#ccc',
            fill: 'white'
        };



        var circleH = new zrender.Circle({
            shape: {
                cx: 0,
                cy: 0,
                r: 200
            },
            position: [
                (w * 0.6 - r * 2) * Math.random() + r + w * 0.2,
                (h * 0.6 - r * 2) * Math.random() + r + h * 0.2
            ],
            style: elementStyle,
            draggable: true
        })
        circleH.on('click', function() {
            alert("el的事件")

        })
        console.log(circleH._$handlers)
        zr.add(circleH)
        zr.addHover(circleH, {
            fill: '#FF904F',
            stroke: '#FF6EBE'
        })
        var circle = new zrender.Circle({
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
        /*
            circle.animate('shape', true)
                .when(5000, {
                    cx: w - r
                })
                .when(10000, {
                    cx: r
                })
                .start();
        */
        zr.add(circle);
        var sun = new zrender.Circle({
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

        zr.add(sun);
        var sun1 = new zrender.Circle({
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
        zr.add(sun1);
        var rect = new zrender.Rect({
            shape: {
                r: 1,
                x: 100,
                y: 100,
                width: 100,
                height: 100
            }
        })
        zr.on('click', function() {
            zr.add(rect)
        })
        console.log(zr)



        console.log(zr.handler._$handlers)
        console.log(zr.handler.proxy._$handlers)
    }
    render() {
        return (


            <div className="container" style={{height:'904px',width:'1418px'}}></div>

        )
    }

}