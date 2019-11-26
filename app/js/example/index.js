/**
 * @Descript: 树形表格示例
 * @params:
 * @author DHL
 * @date 2019/11/5
 */
import React, {Component} from 'react';
import TreeTable from '../treeTable';
import Doc from './doc';
import fetch from 'isomorphic-fetch';

class PageTex extends Component {

    state = {
        treeData : null
    }

    componentDidMount(){
        fetch(
            'json/treeData.json',
            {
                method: 'get',
                credentials: 'include'
            }
        ).then(re => re.json()).then((re) => {
            this.setState({
                treeData : re.data
            });
        }).catch(re => {
            Message.warn(re.info);
        });
        // hljs.highlightBlock(this.refs.code);
    }

    getNodeBox = () => {
        return this.containerRef;
    }

    expandAll = () => {
        this.refs.table.setExpandAll(true);
    }

    closeAll = () => {
        this.refs.table.setExpandAll(false);
    }

    expandList = () => {
        this.refs.table.setExpandList(['111', '41'], true);
    }

    closeList = () => {
        this.refs.table.setExpandList(['111', '41'], false);
    }

    render() {
        let headerList = [
            {
                key : 'title',
                value : "名称",
                onClick : (data) => {
                    alert(data.title + '是' + data.color + '的');
                }
            },
            {
                key : 'id',
                value : "标识",
                width : 100,
                textAlign : 'left'
            },
            {
                key : 'color',
                value : "颜色",
                width : 100,
                textAlign : 'center'
            }
        ];
        let headerList2 = [
            {
                key : 'id',
                value : "id",
                width : 100,
                textAlign : 'center'
            },
            {
                key : 'id',
                value : "层级",
                width : 100,
                textAlign : 'center',
                format : (value, data, eq, headerObj, deep) => {
                    return deep;
                }
            },
            {
                key : 'title',
                value : "名称"
            },
            {
                key : 'id',
                value : "操作",
                width : 150,
                textAlign : 'center',
                format : (id, data) => {
                    return (
                        <React.Fragment>
                            <a className="bt small" onClick={() => {alert('no zuo no die');}}>前往</a>
                            <a className="bt small" onClick={() => {alert(data.title);}}>查看</a>
                        </React.Fragment>
                    );
                }
            }
        ];
        return (
            <div className="index">
                <h1>Tree Table</h1>
                <div className="api-demo">

                    <div className="demonstration" ref={ref => this.containerRef = ref}>

                        <div className="demonstration-box">
                            <h2>demo 1</h2>
                            <div className="demonstration-dome">
                                <div>
                                    <a className="bt" onClick={this.expandAll}>展开所有</a>
                                    <a className="bt" onClick={this.closeAll}>关闭所有</a>
                                    <a className="bt" onClick={this.expandList}>展开太阳系和虫洞</a>
                                    <a className="bt" onClick={this.closeList}>隐藏太阳系和虫洞</a>
                                </div>
                                <div className="h10" />
                                <TreeTable
                                    ref="table"
                                    headerList={headerList}
                                    orderNumber={true}
                                    dataSource={this.state.treeData} />
                            </div>
                        </div>

                        <div className="demonstration-box">
                            <h2>demo 2</h2>
                            <div className="demonstration-dome">
                                <TreeTable
                                    headerList={headerList2}
                                    treeIndex={2}
                                    expandAll={true}
                                    dataSource={this.state.treeData} />
                            </div>
                        </div>

                    </div>
                </div>
                <Doc />
            </div>
        );
    }
}

export default PageTex;