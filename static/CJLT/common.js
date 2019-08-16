/*统一接口前缀*/
// <<<<<<< .mine
// var pUrl = 'http://192.168.1.121:8888/qyzj/',
// ||||||| .r218
// var pUrl = 'http://532ms2.natappfree.cc/qyzj/',
// =======
// var pUrl = 'http://mobile.qunyanzhujia.com/qyzj/',
var pUrl = 'http://test.lapador.com.cn/lpd/',                             //调试接口        
    // >>>>>>> .r222
    // pUrl = 'https://aicv.hrbc.org.cn/cjlt/',
    imgdelUrl = 'http://test.lapador.com.cn/lpd/deleteFile.do?fileId=',   //图片地址前缀     //删除图片
    imgUrl = 'http://test.lapador.com.cn/lpd/downloadFile.do?id=',        //图片地址前缀     //图片展示
    openUrl = 'login.html',
    accReg = /^[A-Za-z0-9]+$/,
    numberReg = /^[A-Za-z0-9.]+$/,
    OfficialId = 2//官方账号;
/**
 * ajax封装
 * url 发送请求的地址
 * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
 *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
 * successfn 成功回调函数
 */
//没有判断是否登录的封装的ajax方法
jQuery.ax = function (url, data, async, successFn) {
    data = (data == null || data == "" || typeof (data) == "undefined") ? { "date": new Date().getTime() } : data;
    async = (async == null || async == "" || typeof (async) == "undefined") ? "true" : async;
    $.ajax({
        url: pUrl + url,
        type: 'post',
        data: data,
        async: async,
        dataType: 'json',
        success: function (d) {
            successFn(d);
        },
        error: function (e) {
            layer.msg('连接超时，请稍后再试');
        }
    });
};
//有判断是否登录的封装的ajax方法
jQuery.axa = function (url, data, async, successFn) {
    data = (data == null || data == "" || typeof (data) == "undefined") ? { "date": new Date().getTime() } : data;
    async = (async == null || async == "" || typeof (async) == "undefined") ? "true" : async;
    if (login()) {
        $.ajax({
            url: pUrl + url,
            type: 'post',
            data: data,
            async: async,
            dataType: 'json',
            success: function (d) {
                successFn(d);
            },
            error: function (e) {
                layer.msg('连接超时，请稍后再试');
            }
        });
    }
};
jQuery.Huitab = function (tabBar, tabCon, class_name, tabEvent, i) {
    var $tab_menu = $(tabBar);
    // 初始化操作
    $tab_menu.removeClass(class_name);
    $(tabBar).eq(i).addClass(class_name);
    $(tabCon).hide();
    $(tabCon).eq(i).show();

    $tab_menu.bind(tabEvent, function () {
        $tab_menu.removeClass(class_name);
        $(this).addClass(class_name);
        var index = $tab_menu.index(this);
        $(tabCon).hide();
        $(tabCon).eq(index).show()
    })
};

/*封装cookie存储时效7天*/
function cookies(cookieName, cookieValue) {
    $.cookie(cookieName, cookieValue, { expires: 7, path: '/' });
}

/*将url?name=value&name=value转换为{name:value,name:value}*/
function gainParameter(url) {
    var urlParameter = url.split("?");
    urlParameter = urlParameter[1].split("&");
    var arr = {};
    for (var i = 0; i < urlParameter.length; i++) {
        var parameter = urlParameter[i].split("=");
        arr[parameter[0]] = parameter[1]
    }
    return arr
}

/*url参数返回封装*/
function parameter() {
    return gainParameter(decodeURI(window.location.href));
}

/*判断是否登录*/
function login() {
    var a = false,
        basis = $.cookie('adminId');
    if (basis == null || basis == '' || basis == undefined || basis == 'null') {
        layer.msg('登录失效，请重新登录');
        setTimeout(function () {
            top.location.href = openUrl;
        }, 2000);
    } else {
        a = true;
    }
    return a
}

$('.skin-minimal input').iCheck({
    checkboxClass: 'icheckbox-blue',
    radioClass: 'iradio-blue',
    increaseArea: '20%'
});

/*新增弹出*/
function newAdd(title, url, w, h) {
    layer_show(title, url, w, h);
}

/*编辑弹出*/
function Edit(title, url, id, w, h) {
    layer_show(title, url + '?id=' + id, w, h);
}

/*查看详情*/
function seeDetail(title, url, id, type, w, h) {
    layer_show(title, url + '?id=' + id + '&type=' + type, w, h);
}

/*二级页面*/
function two_list(title, url) {
    var index = layer.open({
        type: 2,
        title: title,
        content: url
    });
    layer.full(index);
}

/*获取当前日期*/
function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    var hh = now.getHours();
    var mm = now.getMinutes();

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    // if (hh < 10)
    //   clock += "0";
    //
    // clock += hh + ":";
    // if (mm < 10) clock += '0';
    // clock += mm;
    return (clock);
}

$.fn.numeral = function () {
    $(this).css("ime-mode", "disabled");
    this.bind("keypress", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
        if (e.keyCode == 0x8)  //火狐下不能使用退格键
        {
            return;
        }
        return code >= 48 && code <= 57;
    });
    this.bind("blur", function () {
        if (isNaN(this.value)) {
            this.value = "";
        }
    });
    // this.bind("paste", function() {
    //   var s = clipboardData.getData('text');
    //   if (!/\D/.test(s));
    //   value = s.replace(/^0*/, '');
    //   return false;
    // });
    this.bind("dragenter", function () {
        return false;
    });
    this.bind("keyup", function () {
        // if (/(^0+)/.test(this.value)) {
        //   this.value = this.value.replace(/^0*/, '');
        // }
    });
};

function decimal(that) {
    /*
     * 获取输入的值
     * 值不是数字或者.将其删除
     * 判断第一个数字是不是0或者值是否为空，
     * 不为0清空，为空也清空
     * 判断前两个字符是否为0.
     * 不是则将至替换为0
     * 判断前三个字符为0..
     * 是则将值改为0.
     * 通过判断将原有值替换
     * */
    var str = $(that).val();
    var num = /[^\d.]/ig;
    str = str.replace(num, '');
    var attr = str.split("");
    if (str == '') {
        str = '';
    } else if (str.substr(0, 3) == '0..') {
        str = '0.'
    } else if (str.substr(0, 2) == '00') {
        str = '0'
    } else if (str.split(".").length - 1 >= 2) {
        str = str.substring(0, str.length - 1);
    }
    $(that).val(str);
}
function price(that) {
    /*
     * 获取输入的值
     * 值不是数字或者.将其删除
     * 判断第一个数字是不是0或者值是否为空，
     * 不为0清空，为空也清空
     * 判断前两个字符是否为0.
     * 不是则将至替换为0
     * 判断前三个字符为0..
     * 是则将值改为0.
     * 通过判断将原有值替换
     * */
    var str = $(that).val();
    var num = /[^\d.]/ig;
    str = str.replace(num, '');
    var attr = str.split("");
    if (str == '') {
        str = '';
    } else if (str.substr(0, 3) == '0..') {
        str = '0.'
    } else if (str.substr(0, 2) == '00') {
        str = '0'
    } else if (str.split(".").length - 1 >= 2) {
        str = str.substring(0, str.length - 1);
    } else if (str > 9999) {
        str = 1;
    }
    $(that).val(str);
}

function timeStamp2String(time) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date;
}

// 城市选择框联动

// 获取省份列表
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
// 获取城市列表
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

        },
        error: function (e) {
            layer.msg('连接超时，请稍后再试');
        }
    });

}