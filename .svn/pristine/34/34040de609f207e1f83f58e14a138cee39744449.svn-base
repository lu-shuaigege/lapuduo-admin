var provinceList, $form, form, $, content, index, layedit;
layui.use(['jquery', 'form', 'layedit', 'upload'], function () {
    $ = layui.jquery;
    form = layui.form;
    $form = $('form');
    layedit = layui.layedit;
    var layer = layui.layer,
        upload = layui.upload;
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
            console.log(res)
            return {
                "code": res.key, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.result.total, //解析数据长度
                "data": res.result.list //解析数据列表
            };
        },
        done: function (res) {
            console.log(res)
            //上传成功
            if (res.code == 0) {
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
    var index = layedit.build('content', {
        height: 300,
        tool: ['strong', 'italic', 'underline', 'del', '|', 'face', '|', 'image']
    });

    //自定义验证规则
    form.verify({
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
        introduce: function (value) {
            if (value == '') {
                return '请输入文章简要！'
            }
        },
        readCnt: function (value) {
            if (value == '') {
                return '请输入阅读数！'
            }
        },
        goodCnt: function (value) {
            if (value == '') {
                return '请输入好看数！'
            }
        },

        content: function (content) {
            content = layedit.getContent(index);
            console.log(content)
            if (content == '') {
                return '请输入内容！'
            }
        },
    });
    form.on('submit(add)', function (data) {
        console.log(data)
        data.field.content = layedit.getContent(index);
        if (data.field.cityId == '') {
            data.field.cityId = 0
        }
        $.ax(
            'api_addArticle.do',
            data.field,
            false,
            function (res) {
                if (res.key == 1) {
                    layer.msg('新增文章成功！');
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