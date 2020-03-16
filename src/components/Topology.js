import cytoscape from 'cytoscape';
import React, { Component } from 'react';
import { Button, Card, Collapse, Drawer, Icon, List, Tag, Timeline, Tooltip,Divider } from 'antd';
// import {Link} from "react-router-dom";

const Panel = Collapse.Panel;
class Topology extends Component {
    
    state = {
        visible: false,
        currentNode: {}
    };

    componentDidMount() {
        document.getElementById('cy').style.height = '400px'
        let cy = cytoscape({

            container: document.getElementById('cy'), // container to render in
            layout: {
                name: 'preset',
                // rows: 2,

            },
            elements: [
                {
                    data: { id: 'SG', label: 'ShaoGuan' }, position: { x: -500, y: 0 }
                },
                {
                    data: { id: 'SZ', label: 'ShengZhen' }, position: { x: -250, y: 40 }
                },
                {
                    data: { id: 'GZ', label: 'GuangZhou' }, position: { x: 200, y: 20 }
                },
                {
                    data: { id: 'HY' }, position: { x: -540, y: 200 }
                },
                {
                    data: { id: 'YF' }, position: { x: -420, y: 200 }
                },
                {
                    data: { id: 'ZQ' }, position: { x: -300, y: 200 }
                },
                {
                    data: { id: 'QY' }, position: { x: -180, y: 200 }
                },
                {
                    data: { id: 'HZ' }, position: { x: -60, y: 200 }
                },
                {
                    data: { id: 'DG' }, position: { x: 60, y: 200 }
                },
                {
                    data: { id: 'FS' }, position: { x: 180, y: 200 }
                },
                {
                    data: { id: 'ZS' }, position: { x: 300, y: 200 }
                },
                {
                    data: { id: 'ZH' }, position: { x: 420, y: 200 }
                },
                {
                    data: { id: 'JM' }, position: { x: 540, y: 200 }
                }
            ],

            style: [
                {
                    selector: 'node',
                    style: {
                        'label': function (ele) {
                            return ele.data('label') ? ele.data('label') : ele.data('id')
                        }
                    }
                }
            ],
            // autoungrabify: true
            // autounselectify: true,
        });
        // add ports
        var pos = cy.$id('SG').position()
        for (let i = 0; i < 5; i++) {
            cy.add({ data: { id: 'SG:' + i, parent: 'SG' }, position: { x: i * 40 + pos.x - 40, y: pos.y } })
        }
        var pos = cy.$id('SZ').position()
        console.log(pos)
        for (let i = 0; i < 10; i++) {
            cy.add({ data: { id: 'SZ:' + i, parent: 'SZ' }, position: { x: i * 40 + pos.x, y: pos.y } })
        }
        var pos = cy.$id('GZ').position()
        console.log(pos)
        for (let i = 0; i < 11; i++) {
            cy.add({ data: { id: 'GZ:' + i, parent: 'GZ' }, position: { x: i * 40 + pos.x, y: pos.y } })
        }
        let l2nodes = ['HY', 'YF', 'ZQ', 'QY', 'HZ', 'DG', 'FS', 'ZS', 'ZH', 'JM']
        l2nodes.forEach(n => {
            var pos = cy.$id(n).position()
            for (let i = 0; i < 2; i++) {
                cy.add({ data: { id: n + ':' + i, parent: n }, position: { x: i * 40 + pos.x, y: pos.y } })
                cy.add({ data: { id: n + ':' + (i + 2), parent: n }, position: { x: i * 40 + pos.x, y: pos.y + 50 } })
            }
        })
        // add links
        let links = [
            { id: 'SG-SZ', source: 'SG:0', target: 'SZ:0' },
            { id: 'SZ-GZ', source: 'SZ:1', target: 'GZ:0' },
            { id: 'GZ-SG', source: 'GZ:1', target: 'SG:1' },
            { id: 'SG-HY', source: 'SG:2', target: 'HY:0' },
            { id: 'SG-ZQ', source: 'SG:3', target: 'ZQ:0' },
            { id: 'SG-QY', source: 'SG:4', target: 'QY:0' },
            { id: 'SZ-HY', source: 'SZ:2', target: 'HY:1' },
            { id: 'SZ-YF', source: 'SZ:3', target: 'YF:0' },
            { id: 'SZ-HZ', source: 'SZ:4', target: 'HZ:0' },
            { id: 'SZ-DG', source: 'SZ:5', target: 'DG:0' },
            { id: 'SZ-FS', source: 'SZ:6', target: 'FS:0' },
            { id: 'SZ-ZS', source: 'SZ:7', target: 'ZS:0' },
            { id: 'SZ-ZH', source: 'SZ:8', target: 'ZH:0' },
            { id: 'SZ-JM', source: 'SZ:9', target: 'JM:0' },
            { id: 'GZ-YF', source: 'GZ:2', target: 'YF:1' },
            { id: 'GZ-ZQ', source: 'GZ:3', target: 'ZQ:1' },
            { id: 'GZ-QY', source: 'GZ:4', target: 'QY:1' },
            { id: 'GZ-HZ', source: 'GZ:5', target: 'HZ:1' },
            { id: 'GZ-DG', source: 'GZ:6', target: 'DG:1' },
            { id: 'GZ-FS', source: 'GZ:7', target: 'FS:1' },
            { id: 'GZ-ZS', source: 'GZ:8', target: 'ZS:1' },
            { id: 'GZ-ZH', source: 'GZ:9', target: 'ZH:1' },
            { id: 'GZ-JM', source: 'GZ:10', target: 'JM:1' },
        ]
        links.forEach(l => {
            cy.add([
                { data: { id: l.id, source: l.source, target: l.target } }
            ])
        })
        cy.nodes().on('select', e => {
            let n = e.target
            n.neighborhood().select()
            let cys = cytoscape({
                container: document.getElementById('cys'), // container to render in
                layout: {
                    name: 'preset',
                },
                elements: cy.filter(e => {
                    if (e.isNode() && !e.data('parent')) {
                        if (cy.filter(ee => ee.data('parent') == e.id() && ee.selected()).length > 0) {
                            return true
                        } else {
                            return false
                        }
                    }
                    return e.selected()
                }).jsons(),
                style: [
                    {
                        selector: 'node',
                        style: {
                            'label': function (ele) {
                                return ele.data('label') ? ele.data('label') : ele.data('id')
                            }
                        }
                    }
                ],
            })
        })

        // cy.elements().on('select', e => {
        //     if (this.props.showSlice === false) {
        //         return
        //     }
        //     let l = e.target
        //     if (1) {
        //     cy.$id(l.id()).source().select()
        //     cy.$id(l.id()).target().select()
        //     }
        //     // cy.$(':selected').forEach(e => {
        //     //     console.log(e)
        //     // })
        //     let cys = cytoscape({

        //         container: document.getElementById('cys'), // container to render in
        //         layout: {
        //             name: 'preset',
        //         },
        //         elements: cy.filter(e => {
        //             if (e.isNode() && !e.data('parent')) {
        //                 if (cy.filter(ee => ee.data('parent') == e.id() && ee.selected()).length > 0) {
        //                     return true
        //                 } else {
        //                     return false
        //                 }
        //             }
        //             return e.selected()
        //         }).jsons(),
        //         style: [
        //             {
        //                 selector: 'node',
        //                 style: {
        //                     'label': function (ele) {
        //                         return ele.data('label') ? ele.data('label') : ele.data('id')
        //                     }
        //                 }
        //             }
        //         ],
        //     })
        //     // console.log(cy.selected())
        //     // console.log(l.source().selected())
        // })

        cy.fit()

        //   cy.style()
        //     .selector('node')
        //     .style({
        //       'background-image': '/router.png',
        //       'background-width': '100%',
        //       'background-height': '100%'
        //     }).update();
        //   cy.nodes().on('click', (e) => {
        //     var clickedNode = e.target;
        //     console.log(clickedNode);
        //     this.setState({visible: true, currentNode: clickedNode.data()})

        //   });
        //   cy.nodes().map(n => {
        //     if (n.data().position) {
        //       n.position(n.data().position)
        //     }
        //   });
        //   cy.center(cy.nodes())
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {showSlice} = this.props
        const data = [
            'BGP',
            'Fireware',
            'Basic Tools',
        ];
        return (
            <div style={{ width: '100%', display: 'block' }}>
                <div id='cy' style={{ width: '100%', height: '400px', display: 'block' }} ref="cyelement">

                </div>
                <Divider style={{ margin: '10px 0' }} />
                {showSlice !== false?
                    <div>
                        Slice topology:
                        <div id='cys' style={{ width: '100%', height: 400, display: 'block' }} ref="cyelement">

                        </div>
                    </div>:
                        null
                }
                
            </div>
        )
    }
}

export default Topology;