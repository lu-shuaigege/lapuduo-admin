var provinceList, $form, form, $, content, index, layedit;
layui.use(['jquery', 'form', 'layedit', 'upload'], function () {
    $ = layui.jquery;
    form = layui.form;
    $form = $('form');
    layedit = layui.layedit;
    let cnt = sessionStorage.getItem('cnt')
    console.log(cnt)
    $('#name').val(sessionStorage.getItem('name'));
    $('#address').val(sessionStorage.getItem('address'));
    $('#cnt').val(cnt);
    $('#des').val(sessionStorage.getItem('des'));
    $('#id').val(sessionStorage.getItem('id'));
    // 引入等待加载动画
    // var layer = layui.layer;
    // var index = layer.load(1); //添加laoding,0-2两种方式
    // 建立编辑器    ！！！一定要在layedit.set后面，否则无效
    var index = layedit.build('des', {
        height: 300,
        tool: ['strong', 'italic', 'underline', 'del', '|', 'face', '|']
    });
    //自定义验证规则
    form.verify({
        name: function (value) {

            if (value == '') {
                return '请输入职位名称'
            }
        },
        address: function (value) {
            if (value == '') {
                return '请输入工作地点'
            }
        },
        cnt: function (value) {
            if (value == '') {
                return '请输入招聘人数'
            }
        },
        des: function (value) {
            content = layedit.getContent(index);
            console.log(content)
            if (content == '') {
                return '请输入职位描述'
            }
        },
    });
    form.on('submit(add)', function (data) {
        console.log(data)
        data.field.des = layedit.getContent(index);
        $.ax(
            'api_updateJob.do',
            data.field,
            false,
            function (res) {
                if (res.key == 1) {
                    layer.msg('修改职位成功！');
                    setTimeout(function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        window.parent.location.reload();
                        parent.layer.close(index)
                    }, 2000);
                } else {
                    layer.msg(res.message);
                }
            }
        );

        return false;
    });
});
