# 树型表格 treeTable
```javascript
npm install
npm start
run at : http://localhost:8080/
```

demo1:
![](http://zitk.net/img/111.png)
```javascript
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
<TreeTable headerList={headerList} dataSource={dataSource} />
```


demo2:
![](http://zitk.net/img/222.png)
```javascript
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
<TreeTable
    headerList={headerList2}
    treeIndex={2}
    expandAll={true}
    dataSource={this.state.treeData} />
```
