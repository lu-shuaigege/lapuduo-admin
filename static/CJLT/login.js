$(function () {
    /*登录点击*/
    $('#login').click(function () {
        var userName = $("#userName").val(),//后台登录账号
            pwd = $("#pwd").val();//后台登录密码
        if (userName === '') {
            layer.msg('请输入账户');
        } else if (pwd === '') {
            layer.msg('请输入密码');
        } else {
            loginFun(userName, pwd);
        }
    })
    $("body").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#login').trigger('click');
        }
    });
});

/*封装cookie存储时效7天*/
function cookies(cookieName, cookieValue) {
    $.cookie(cookieName, cookieValue, { expires: 7, path: '/' });
}


/*登录方法*/
function loginFun(userName, pwd) {
    $.ax(
        'api_back_login.do',
        {
            username: userName,
            password: pwd,
            type: 1
        },
        true,
        function (res) {
            if (res.key === 1) {
                var rr = res.result;
                cookies('adminId', rr.accountId);
                window.location.href = 'index.html';
            } else {
                layer.msg(res.message);
            }
        },
    )
}