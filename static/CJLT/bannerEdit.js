var provinceList, $form, form, $, content, index, layedit;
layui.use(['jquery', 'form', 'layedit', 'upload'], function () {
    $ = layui.jquery;
    form = layui.form;
    $form = $('form');
    layedit = layui.layedit;
    // index = layedit.build('path') //建立编辑器
    var layer = layui.layer,
        upload = layui.upload;
    $('#bannerId').val(sessionStorage.getItem('bannerId'));
    $('#type').val(sessionStorage.getItem('type'));
    $('#title').val(sessionStorage.getItem('title'));
    $('#path').val(sessionStorage.getItem('path'));
    $("#pic").val(sessionStorage.getItem('pic'));
    $('#pics').attr('src', sessionStorage.getItem('pic'));
    $('#cityId').val(sessionStorage.getItem('cityId'));
    getProvince(); // 获取省份列表
    var img;
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#pic1'
        , url: pUrl + 'back_uploadImg.do'
        // , before: function (obj) {
        , before: function (obj) {
        }
        , done: function (res) {
            // console.log(res.result.url)
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            } else {
                //上传成功
                img = res.result.url;
                $('#pics').attr('src', img).attr('alt', img);
                $("#pic").val(img);
            }
        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });
    layedit.set({
        uploadImage: {
            url: pUrl + 'uploadFileText.do',
            type: 'post'
        }
    });
    var index = layedit.build('path', {
        height: 300,
        tool: ['strong', 'italic', 'underline', 'del', '|', 'face', '|', 'image']
    });
    //自定义验证规则
    form.verify({
        type: function (value) {
            if (value == '') {
                return '请选择类型！'
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
            // console.log(layedit.getContent(index))
            content = layedit.getContent(index);
            // if (content == '') {
            //     return '请输入内容'
            // }
        },
        // province: function (value) {
        //     if (value == '') {
        //         return '请选择省份'
        //     }
        // },
        // city: function (value) {
        //     if (value == '') {
        //         // return '请选择城市'
        //         $form.find('input[name=cityId]').val(0);
        //     }
        // },
    });
    //监听提交
    // form.on('select(type)', function (data) {
    //     console.log(data.value)
    //     if(data.value == '' || data.value == 1){
    //         $form.find('#layui-path').show();
    //     }else if(data.value == 2){
    //         $form.find('#layui-path').hide();
    //     }
    //     return false;
    // });
    form.on('submit(edit)', function (data) {
        data.field.path = layedit.getContent(index);
        $.ax(
            'back_editBanner.do',
            data.field,
            false,
            function (res) {
                if (res.key == 1) {
                    layer.msg('编辑banner成功！');
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
        console.log(data.field);
        return false;
    });
});
function getProvince() {
    var proHtml = '';
    $.ajax({
        url: pUrl + 'back_proList.do',
        type: 'post',
        data: {
            page: 1,
            pageSize: 50
        },
        dataType: 'json',
        success: function (res) {
            provinceList = res.result.list;
            for (var i = 0; i < provinceList.length; i++) {
                proHtml += '<option value="' + provinceList[i].id + '">' + provinceList[i].name + '</option>';
            }
            //初始化省数据
            $form.find('select[name=province]').append(proHtml);
            form.render();
            form.on('select(province)', function (data) {
                var value = data.value;
                console.log(value)
                if (value > 0) {
                    $form.find('select[name=cityId]').parent().show();
                    getCity(value);
                } else if (value == '') {
                    $form.find('select[name=cityId]').parent().hide();
                }
            });
        },
        error: function (e) {
            layer.msg('连接超时，请稍后再试');
        }
    });
}
function getCity(pro_id) {
    var cityHtml = '';
    $.ajax({
        url: pUrl + 'back_cityList.do',
        type: 'post',
        data: {
            page: 1,
            pageSize: 500,
            pro_id: pro_id
        },
        dataType: 'json',
        success: function (res) {
            var cityList = res.result.list;
            cityHtml += '<option value="">请选择市</option>'
            for (var i = 0; i < cityList.length; i++) {
                cityHtml += '<option value="' + cityList[i].id + '">' + cityList[i].name + '</option>';
            }
            //初始化省数据
            $form.find('select[name=cityId]').html(cityHtml);
            form.render();
            // form.on('select(city)', function(data) {
            //     var value = data.value;
            //     console.log(value)
            // });
        },
        error: function (e) {
            layer.msg('连接超时，请稍后再试');
        }
    });

}
