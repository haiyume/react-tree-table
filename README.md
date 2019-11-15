treeTable demo
1. npm install
2. npm start

run at : http://localhost:8080/

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

render:
<TreeTable headerList={headerList} dataSource={dataSource} />