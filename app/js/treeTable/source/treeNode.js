/**
 * @Descript: 树型表格-树节点
 * @author: DHL
 * @date 2019/11/5
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TreeTable extends Component {
    static propTypes = {
        data : PropTypes.object,            // 行数据源
        deep : PropTypes.string,            // 深度索引
        eq : PropTypes.number,              // 行号
        getJsonValue : PropTypes.func,      // 获取json值
        parentDeep : PropTypes.string,      // 父级深度值
        parentEq : PropTypes.number,        // 父级索引值
        getChildren : PropTypes.func,       // 获取数据子节点
        setChildrenExpand : PropTypes.func  // 设置子节点的开合
    }

    state = {
        // 当前节点开合
        expand : (!this.props.expandAll && this.props.deep.indexOf('-') > -1) ? false : true,
        // 子节点开合
        childrenExpand : !!this.props.expandAll
    }

    componentDidMount() {

    }

    // 设置展开，关闭
    setExpand = (expand) => {
        let childrenExpand = this.state.childrenExpand;
        this.setState({
            expand,
            childrenExpand : !expand ? false : childrenExpand
        });
    }

    // format
    valueFormat = (value, headerObj) => {
        const {data, nullStr, eq, deep} = this.props;
        if(headerObj.format){
            return headerObj.format(value, data, eq, headerObj, deep);
        }else{
            return (value || value === 0) ? value : nullStr;
        }
    }

    // 点击箭头
    onArrow = (isExpand) => {
        const {deep, setChildrenExpand, eq} = this.props;
        let childrenExpand = typeof isExpand === 'boolean' ? isExpand : !this.state.childrenExpand;
        this.setState({childrenExpand});
        setChildrenExpand(deep, eq, childrenExpand);
    }

    // 创建td
    creatTds = () => {
        const {data, treeIndex, getChildren, deep, indent, eq, getJsonValue} = this.props;
        let headerList = this.props.headerList || [];
        return headerList.map((item, i) => {
            let value = this.valueFormat(getJsonValue(data, item.key), item);
            if(item.onClick){
                value = <a className="lft-treeTable-a" onClick={() => {item.onClick(value, data, eq, deep);}}>{value}</a>;
            }
            let trStyle = {
                width : item.width,
                textAlign : item.textAlign
            };
            if(treeIndex == i){
                let divStyle = {
                    paddingLeft : (deep.split('-').length - 1) * indent
                };
                trStyle.textAlign = 'left';
                let hasChild = getChildren(data);
                return (
                    <td key={i} style={trStyle} className={item.className}>
                        <div style={divStyle} className="lft-treeTable-td">
                            <i onClick={hasChild ? this.onArrow : undefined} className={hasChild ? "lft-treeTable-arrow" : undefined} />
                            {value}
                        </div>
                    </td>
                );
            }else{
                return (
                    <td key={i} style={trStyle} className={item.className}>
                        <div className="lft-treeTable-td">{value}</div>
                    </td>
                );
            }
        });
    }

    render() {
        const {deep, orderNumber, eq} = this.props;
        const {expand, childrenExpand} = this.state;
        let style = {};
        if(expand === false){
            style.display = 'none';
        }
        return (
            <tr style={style} className={childrenExpand === false ? "lft-treeTable-tr lft-treeTable-tr-none" : "lft-treeTable-tr"} data-deep={deep}>
                {
                    orderNumber ? (
                        <td className="lft-treeTable-order">{eq + 1}</td>
                    ) : undefined
                }
                {this.creatTds()}
            </tr>
        );
    }
}