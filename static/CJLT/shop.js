if (login()) {


    layui.use(['table', 'form'], function () {
        var table = layui.table,
            form = layui.form;

        table.render({
            elem: '#GoodsList',
            text: {
                none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
            },
            id: 'GoodsList',
            url: pUrl + 'api_findGoodsList.do',
            method: 'post',
            where: {
                category: $("#category").val(),
            },
            toolbar: "#btn",
            title: '商品列表',
            limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            cols: [[
                // {type: 'checkbox', fixed: 'left'},
                { field: 'id', title: 'id', align: 'center', width: 50 },
                { field: 'name', title: '商品名称', align: 'center', width: 150 },
                { field: 'pic', title: '列表图片', align: 'center', minWidth: 200, toolbar: '#pic' },
                { field: 'url', title: '详情连接', align: 'center', minWidth: 100, Width: 100 },
                { field: 'category', title: '商品一级分类', align: 'center', width: 200, toolbar: '#categorys' },
                { field: 'createTime', title: '创建时间', align: 'center', width: 200 },
                { field: 'cao', title: '操作', align: 'center', width: 200, toolbar: '#cao' },
            ]],
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局,
                curr: 1,                //设定初始在第 5 页
                groups: 5,              //只显示 1 个连续页码
                first: false,           //不显示首页
                last: false             //不显示尾页
            }, request: {
                pageName: 'page',       //页码的参数名称，默认：page
                limitName: 'pageSize'   //每页数据量的参数名，默认：limit
            }, response: {
                statusCode: 1,          //规定成功的状态码，默认：0
            }, parseData: function (res) { //res 即为原始返回的数据
                return {
                    "code": res.key,                //解析接口状态
                    "msg": res.message,             //解析提示文本
                    "count": res.result.totalCount, //解析数据长度
                    "data": res.result.list         //解析数据列表
                };
            },
        });
        var active = {
            reload: function () {
                //执行重载
                table.reload('GoodsList', {
                    page: 1
                    , where: {
                        category: $("#category").val(),
                    }
                });
            }
        };
        $('#search').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        //头工具栏事件
        table.on('toolbar(GoodsList)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id);
            switch (obj.event) {
                case 'add':
                    newAdd('新增商品', 'shopAdd.html', 800, 500);
                    break;
            }
        });
        //监听行工具事件
        table.on('tool(GoodsList)', function (obj) {
            var data = obj.data;
            console.log(data)
            //这里的event事件名称对应的是html页面里面的lay-event
            if (obj.event === 'pic') {
                //点击列表图片弹出一个框展示大图片
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
            else if (obj.event === 'edit') {
                sessionStorage.setItem('id', data.id);
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('category', data.category);
                sessionStorage.setItem('pic', data.pic);
                sessionStorage.setItem('url', data.url);
                newAdd('修改文章：', 'shopEdit.html', 800, 500)
            }
            else if (obj.event === 'delshop') {
                layer.confirm('确定删除吗?', function (index) {
                    $.axa(
                        'api_deleteGoods.do',
                        {
                            id: data.id,
                        },
                        false,
                        function (res) {
                            if (res.key == 1) {
                                layer.msg('删除成功！');
                                setTimeout(function () {
                                    window.location.reload();
                                }, 2000);
                            } else {
                                layer.msg(res.message);
                            }
                        }
                    );
                    obj.del();
                });
            }
        });
    });
}