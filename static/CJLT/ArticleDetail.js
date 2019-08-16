if (login()) {
    layui.use(['table', 'form'], function () {
        var table = layui.table,
            form = layui.form;
        var ids = sessionStorage.getItem('id');
        table.render({
            elem: '#ArticleDetail',
            text: {
                none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
            },
            id: 'ArticleDetail',
            url: pUrl + 'api_findArticleDetail.do',
            method: 'post',
            where: {
                id: ids,
            },
            // toolbar: "#btn",
            title: '文章详情',
            limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            cols: [[
                // {type: 'checkbox', fixed: 'left'},
                { field: 'id', title: 'id', align: 'center', width: 50 },
                { field: 'title', title: '文章标题', align: 'center', width: 200 },
                { field: 'introduce', title: '文章简要', align: 'center', minWidth: 500, Width: 1000 },
                { field: 'content', title: '文章内容', align: 'center', minWidth: 200 },
                { field: 'pic', title: '列表图片', align: 'center', minWidth: 100, toolbar: '#pic' },
                { field: 'readCnt', title: '阅读数', align: 'center', width: 80 },
                { field: 'goodCnt', title: '好看', align: 'center', width: 80 },
                { field: 'createTime', title: '创建时间', align: 'center', width: 200 },
                { field: 'cao', title: '操作', align: 'center', width: 200, toolbar: '#cao' },
            ]],
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局,
                curr: 1,                 //只显示 1 个连续页码
                groups: 5,               //设定初始在第 5 页
                first: false,            //不显示首页
                last: false              //不显示尾页
            }, request: {
                pageName: 'page',        //页码的参数名称，默认：page
                limitName: 'pageSize'    //每页数据量的参数名，默认：limit
            }, response: {
                statusCode: 1,           //规定成功的状态码，默认：0
            }, parseData: function (res) { //res 即为原始返回的数据
                console.log(res.result)
                return {
                    "code": res.key,              //解析接口状态
                    "msg": res.message,           //解析提示文本
                    "count": res.result.total,    //解析数据长度
                    //因为这里返回的数据直接是对象layui不支持解析这种格式，只能解析数组格式的，所以给解析数据加上一个数组
                    "data": [res.result]          //解析数据列表
                };
            },
        });
        var active = {
            reload: function () {
                //执行重载
                table.reload('GoodsList', {
                    page: 1
                    , where: {
                        id: ids,
                    }
                });
            }
        };
        //监听行工具事件
        table.on('tool(ArticleDetail)', function (obj) {
            var data = obj.data;
            console.log(data)
            if (obj.event == 'picevent') {
                layer.open({
                    type: 1
                    , title: false
                    , closeBtn: 2
                    , area: ["80%", "80%"]
                    , skin: 'layui-layer-nobg'
                    , shadeClose: true
                    , content: '<img src="' + data.pic + '" style="width:100%;">'
                    , scrollbar: false
                })
            }
            else if (obj.event === 'xiu') {
                sessionStorage.setItem('id', data.id);
                sessionStorage.setItem('title', data.title);
                sessionStorage.setItem('introduce', data.introduce);
                sessionStorage.setItem('pic', data.pic);
                sessionStorage.setItem('readCnt', data.readCnt);
                sessionStorage.setItem('goodCnt', data.goodCnt);
                sessionStorage.setItem('content', data.content);
                newAdd('修改文章：', 'newsEdit.html', 800, 500)
            }
        });
    });
}
