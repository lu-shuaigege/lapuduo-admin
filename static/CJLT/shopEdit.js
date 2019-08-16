var provinceList, $form, form, $, content, index, layedit;
layui.use(['jquery', 'form', 'layedit', 'upload'], function () {
    $ = layui.jquery;
    form = layui.form;
    $form = $('form');
    layedit = layui.layedit;
    var layer = layui.layer,
        upload = layui.upload;
    $('#id').val(sessionStorage.getItem('id'));
    $('#name').val(sessionStorage.getItem('name'));
    $('#category').val(sessionStorage.getItem('category'));
    $('#url').val(sessionStorage.getItem('url'));
    $('#pics').attr('src', sessionStorage.getItem('pic'));
    $("#pic").val(sessionStorage.getItem('pic'));

    $('body > div > form > div:nth-child(2) > div > div > dl').find('dd[lay-value=' + sessionStorage.getItem('category') + ']').click()
    var img;
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#pic1',
        url: pUrl + 'uploadFile.do'
        ,
        before: function (obj) {

        },
        response: {
            statusCode: 1, //规定成功的状态码，默认：0
        },
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": res.key, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.result.total, //解析数据长度
                "data": res.result.list //解析数据列表
            };
        },
        done: function (res) {
            console.log(res)

            if (res.code == 0) {
                //上传成功
                img = res.data.src;
                $('#pics').attr('src', img).attr('alt', img);
                $("#pic").val(img);
            } else {
                //如果上传失败
                return layer.msg('上传失败');
            }
        },
        error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });

    // 富文本框里面的图片上传
    layedit.set({
        uploadImage: {
            url: pUrl + 'uploadFile.do',
            type: 'post',
        }
    });
    // 建立编辑器    ！！！一定要在layedit.set后面，否则无效
    var index = layedit.build('path', {
        height: 300,
        tool: ['strong', 'italic', 'underline', 'del', '|', 'face', '|', 'image']
    });

    //自定义验证规则
    form.verify({
        type: function (value) {

            if (value == '') {
                return '请选择类型！'
            } else if (value == 1) {
                $form.find('div[class=layui-paths]').hide;
            } else {

            }
        },
        title: function (value) {
            if (value == '') {
                return '请输入标题！'
            }
        },
        pic: function (value) {
            if (value == '') {
                return '请上传图片！'
            }
        },
        path: function (value) {
            content = layedit.getContent(index);
            console.log(content)
        },
    });
    form.on('submit(add)', function (data) {
        console.log(data)
        data.field.path = layedit.getContent(index);
        if (data.field.cityId == '') {
            data.field.cityId = 0
        }
        $.axa(
            'api_updateGoods.do',
            data.field,
            false,
            function (res) {
                if (res.key == 1) {
                    layer.msg('修改商品成功！');
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