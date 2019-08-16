if (login()) {
  layui.use(['table', 'form'], function () {
    var table = layui.table,
      form = layui.form;

    table.render({
      elem: '#HRList',
      text: {
        none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
      },
      id: 'HRList',
      url: pUrl + 'backend_api_hrList.do',
      method: 'post',
      where: {
        hrName: $("#hrName").val(),
        companyName: $("#companyName").val(),
      },
      toolbar: false,
      title: 'HR列表',
      limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      cols: [[
        // {type: 'checkbox', fixed: 'left'},
        {field: 'id', title: 'ID', align: 'center',width:80},
        {field: 'hrName', title: 'HR姓名', align: 'center',width: 120},
        {field: 'phone', title: 'HR手机号', align: 'center',width: 140},
        {field: 'department', title: '部门', align: 'center',width: 120},
        {field: 'job', title: '岗位', align: 'center',width: 120},
        {field: 'companyName', title: '公司名称', align: 'center'},
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
      }
    });
    var active = {
      reload: function () {
        //执行重载
        table.reload('HRList', {
          page: 1
          , where: {
            hrName: $("#hrName").val(),
            companyName: $("#companyName").val(),
          }
        });
      }
    };
    $('#search').on('click', function () {
      if (login()) {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
      }
    });
  });
}