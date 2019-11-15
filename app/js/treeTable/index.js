/**
 * @Descript: 树型表格
 * @author: DHL
 * @date 2019/11/5
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeNode from './source/treeNode';
import './index.scss';

export default class TreeTable extends Component {
    static propTypes = {
        className : PropTypes.string,       // 类名
        dataSource : PropTypes.array,       // json格式的数据源
        indent : PropTypes.number,          // 缩进
        headerList : PropTypes.array,       // 表头的定义 demo-[{key:'title',value:"名称",className:"",width:100,textAline:'center',onClick:null,format:null},{key:'text',value:"说明"}]
        treeIndex : PropTypes.number,       // 第几列以树型格式展示，默认0
        // model : PropTypes.oneOf(['tree', 'json']), // 渲染模式，默认是tree
        nullStr : PropTypes.string,         // 取不到数据的替换符
        orderNumber: PropTypes.oneOfType([  // 是否显示行号，默认否
            PropTypes.string,
            PropTypes.bool
        ]),
        expandAll : PropTypes.bool,         // 是否展开所有，默认是
        // expandList : PropTypes.array,       // 首屏需要展开的id列表
        idKey : PropTypes.string,           // 修正的id读取字段，用来识别节点，默认id，配合expandList使用
        childrenKey: PropTypes.string       // 修正的子节点数据读取名称
    }

    static defaultProps = {
        indent: 24,
        expandAll : false,
        treeIndex : 0,
        idKey: 'id',
        childrenKey: 'children'
    }

    state = {
    }

    componentDidMount() {
        // 此功能略显鸡肋，先注掉
        // const {dataSource, expandAll, expandList} = this.props;
        // if(dataSource && dataSource.length && !expandAll && expandList && expandList.length){
        //     this.setExpandList(expandList, true);
        // }
    }

    // 展开/关闭所有节点
    setExpandAll = (isExpand) => {
        for(let i = 0; i < this.domListLen; i++){
            let trObj = this['ref' + i];
            let cdeep = trObj.props.deep;
            let ep = !!isExpand;
            if(cdeep.indexOf('-') > -1){
                trObj.setState({
                    expand : ep,
                    childrenExpand : ep
                });
            }else{
                trObj.setState({
                    childrenExpand : ep
                });
            }
        }
    }

    // 展开/闭合某些节点
    setExpandList = (expandList, isExpand) => {
        if(!expandList || !expandList.length){
            return;
        }
        let arr = [];
        for(let i = 0; i < this.domListLen; i++){
            let trObj = this['ref' + i];
            let id = this.getId(trObj.props.data);
            let eq = expandList.indexOf(id);
            if(eq > -1){
                arr.push(trObj.props.parentEq);
                if(arr.length >= expandList.length){
                    break;
                }
            }
        }
        for(let j = 0; j < arr.length; j++){
            let trObj = this['ref' + arr[j]];
            if(isExpand){
                this.setItemShow(trObj);
            }else{
                trObj && trObj.onArrow(false);
            }
        }
    }

    // 显示某一个节点
    setItemShow = (trObj) => {
        trObj && trObj.onArrow(true);
        let parentEq = this.getJsonValue(trObj, 'props.parentEq');
        if(parentEq || parentEq === 0){
            this.setItemShow(this['ref' + parentEq]);
        }
    }

    // 获取id值
    getId = (data) => {
        return this.getJsonValue(data, this.props.idKey);
    }

    // 获取数据子节点值
    getChildren = (data = {}) => {
        let arr = data[this.props.childrenKey];
        return (arr && arr.length) ? arr : null;
    }

    // json取值
    getJsonValue = (data, keys) => {
        if(!data){return data;}
        const getValue = (data, keys) => {
            if(keys && keys.length){
                let newData = data[keys.shift()];
                if (!newData || !keys.length){return newData;}
                return getValue(newData, keys);
            }
        };
        return getValue(data, keys.split('.'));
    }

    // 生成header
    creatHeader = () => {
        let headerList = this.props.headerList || [];
        return headerList.map((item, i) => {
            let style = {
                width : item.width,
                textAlign : item.textAlign
            };
            return (
                <th style={style} className={item.className} key={i}>
                    <div className="lft-treeTable-td">{item.value}</div>
                </th>
            );
        });
    }

    // 设置展开，隐藏
    setChildrenExpand = (deep, eq, childrenExpand) => {
        for(let i = eq + 1; i < this.domListLen; i++){
            let trObj = this['ref' + i];
            let cdeep = trObj.props.deep;
            if(cdeep.indexOf(deep) === 0){
                if(!childrenExpand || (childrenExpand && cdeep.substr(deep.length + 1).indexOf('-') < 0)){
                    trObj.setExpand(childrenExpand);
                }
            }else{
                break;
            }
        }
    }

    // 生产树形结构
    createTree = (data = [], list, deep, parentEq) => {
        let me = this;
        let domList = list || [];
        let len = data ? data.length : 0;
        for(let i = 0; i < len; i++){
            let childrenData = this.getChildren(data[i]);
            let newDeep = deep ? (deep + '-' + i) : (i + '');
            let eq = domList.length;
            domList.push(
                <TreeNode
                    {...me.props}
                    key={newDeep}
                    deep={newDeep}
                    parentDeep={deep}
                    parentEq={parentEq > -1 ? parentEq : -1}
                    data={data[i]}
                    eq={eq}
                    getChildren={me.getChildren}
                    setChildrenExpand={me.setChildrenExpand}
                    getJsonValue={me.getJsonValue}
                    ref={ref => me['ref' + eq] = ref} />
            );
            if(childrenData){
                this.createTree(childrenData, domList, newDeep, eq);
            }
        }
        this.domListLen = domList.length;
        return domList;
    }

    render() {
        const props = this.props;
        const {dataSource, orderNumber} = props;
        let cname = props.className ? ("lft-treeTable " + props.className) : "lft-treeTable";
        return (
            <table className={cname}>
                <thead>
                    <tr>
                        {
                            orderNumber ? (
                                <th className="lft-treeTable-order">{orderNumber === true ? '序号' : orderNumber}</th>
                            ) : undefined
                        }
                        {this.creatHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.createTree(dataSource)}
                </tbody>
            </table>
        );
    }
}