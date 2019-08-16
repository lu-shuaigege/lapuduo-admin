if (login()) {


    layui.use(['table', 'form'], function () {
        var table = layui.table,
            form = layui.form;
        // 引入等待加载动画
        var layer = layui.layer;
        var index = layer.load(1); //添加laoding,0-2两种方式

        table.render({
            elem: '#JobList',
            text: {
                none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
            },
            id: 'JobList',
            url: pUrl + 'api_findJobList.do',
            method: 'post',
            where: {
            },
            toolbar: "#btn",
            title: '招聘信息列表',
            limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            cols: [[
                // {type: 'checkbox', fixed: 'left'},
                { field: 'id', title: 'id', align: 'center', width: 50 },
                { field: 'name', title: '职位名称', align: 'center', width: 200 },
                { field: 'cnt', title: '人数', align: 'center', Width: 100 },
                { field: 'des', title: '职位描述', align: 'center', minWidth: 500, Width: 1000 },
                { field: 'address', title: '地点', align: 'center', width: 200 },
                { field: 'createTime', title: '创建时间', align: 'center', width: 200 },
                { field: 'cao', title: '操作', align: 'center', width: 200, toolbar: '#cao' },
            ]],
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局,
                curr: 1, //设定初始在第 5 页
                groups: 5,//只显示 1 个连续页码
                first: false, //不显示首页
                last: false //不显示尾页
            }, request: {
                pageName: 'page', //页码的参数名称，默认：page
                limitName: 'pageSize' //每页数据量的参数名，默认：limit
            }, response: {
                statusCode: 1, //规定成功的状态码，默认：0
            }, parseData: function (res) { //res 即为原始返回的数据
                return {
                    "code": res.key, //解析接口状态
                    "msg": res.message, //解析提示文本
                    "count": res.result.total, //解析数据长度
                    "data": res.result.list //解析数据列表
                };
            },
            done: function (res) {   //返回数据执行回调函数
                layer.close(index);    //返回数据关闭loading加载中动画效果

            }
        });
        var active = {
            reload: function () {
                //执行重载
                table.reload('bannerList', {
                    page: 1
                    , where: {
                        title: $("#title").val(),
                    }
                });
            }
        };
        //头工具栏事件
        table.on('toolbar(JobList)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id);
            switch (obj.event) {
                case 'add':
                    newAdd('新增职位', 'recruitAdd.html', 800, 500);
                    break;
            }
        });
        //监听行工具事件
        table.on('tool(JobList)', function (obj) {
            var data = obj.data;
            console.log(data)
            if (obj.event === 'xiu') {
                sessionStorage.setItem('id', data.id);
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('cnt', data.cnt);
                sessionStorage.setItem('des', data.des);
                sessionStorage.setItem('address', data.address);
                sessionStorage.setItem('createTime', data.createTime);
                newAdd('修改招聘信息：', 'recruitEdit.html', 800, 500)
            }
            else if (obj.event === 'deleteJob') {
                layer.confirm('确定删除吗?', function (index) {
                    $.ax(
                        'api_deleteJob.do',
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