import React, {Component} from 'react';

export default class PageTex extends Component {
    render() {
        return (
            <div className="api-table">
                <h2>API</h2>
                <table>
                    <thead>
                        <tr>
                            <th>参数</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="blue">className</td>
                            <td>类名</td>
                            <td>string</td>
                            <td>空</td>
                        </tr>
                        <tr>
                            <td className="blue">dataSource</td>
                            <td>数据源</td>
                            <td>array</td>
                            <td>null</td>
                        </tr>
                        <tr>
                            <td className="blue">indent</td>
                            <td>层级缩进</td>
                            <td>number</td>
                            <td>24px</td>
                        </tr>
                        <tr>
                            <td className="blue">headerList</td>
                            <td>表头数据结构，示例：{'[{key:"title",value:"名称",className:"",width:100,textAline:"center",onClick:null,format:null},{key:"text",value:"颜色"}]'}</td>
                            <td>array</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td className="blue">treeIndex</td>
                            <td>第几列以树型格式展示</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td className="blue">nullStr</td>
                            <td>数据为空替换符</td>
                            <td>string</td>
                            <td>空</td>
                        </tr>
                        <tr>
                            <td className="blue">orderNumber</td>
                            <td>是否显示行数列(也可以是行号显示的表头名称)</td>
                            <td>bool/string</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td className="blue">expandAll</td>
                            <td>是否打开所有节点</td>
                            <td>bool</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td className="blue">idKey</td>
                            <td>取节点id读取的字段名</td>
                            <td>string</td>
                            <td>id</td>
                        </tr>
                        <tr>
                            <td className="blue">childrenKey</td>
                            <td>取子节点读取的字段名</td>
                            <td>string</td>
                            <td>children</td>
                        </tr>
                    </tbody>
                </table>

                <h2>组件内部方法</h2>
                <table>
                    <thead>
                        <tr>
                            <th>方法</th>
                            <th>说明</th>
                            <th>传参</th>
                            <th>返回值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="blue">setExpandAll</td>
                            <td>展开/关闭所有节点</td>
                            <td>isExpand - bool</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td className="blue">setExpandList</td>
                            <td>展开/闭合某些节点</td>
                            <td>
                                expandList - id array<br />
                                isExpand - bool
                            </td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
