$(function () {
  $("#SignOut").click(function () {
    cookies('adminId', '');
    window.location.href = 'login.html';
  });
});
// // $('.tishi').hide();
// // $('.tishi1').hide();
// // $('.tishi2').hide();
// function loadRootdept() {
//   $.ajax({
//     type: 'post',
//     url: pUrl + 'back_checkAudit.do',
//     data: {
//       page: 1,
//       pageSize: 100
//     },
//     dataType: 'json',
//     success: function (data) {
//       // var sel = {
//       //   "code": data.key, //解析接口状态
//       //   "msg": data.message, //解析提示文本
//       //   "count": data.result.total, //解析数据长度
//       //   "data": data.result.list, //解析数据列表
//       // };
//       // console.log(data);
//       // for (var dian in data.result) {
//       //   console.log(dian);
//       //   console.log(dian, ':', data.result[dian])

//       //   // var demandAudit = data.result[dian];
//       //   // var goodsAudit = data.result[dian];
//       // }
//       var demandAudit = data.result.demandAudit;
//       var goodsAudit = data.result.goodsAudit;
//       // console.log(demandAudit)
//       // console.log(goodsAudit)





//       if (demandAudit == "1") {
//         $('.tishi1').show();
//       } else if (demandAudit == "2") {
//         $('.tishi1').hide();
//       };
//       if (goodsAudit == "1") {
//         $('.tishi').show();
//       } else if (goodsAudit == "2") {
//         $('.tishi').hide();
//       }
//     }
//   })
// }
// loadRootdept()

// function applyList() {
//   $.ajax({
//     type: 'post',
//     url: pUrl + 'back_applyList.do',
//     data: {
//       page: 1,
//       pageSize: 100
//     },
//     dataType: 'json',
//     success: function (data) {
//       // console.log(data)
//       // var sel = {
//       //   "code": data.key, //解析接口状态
//       //   "msg": data.message, //解析提示文本
//       //   "count": data.result.totalCount, //解析数据长度
//       //   "data": data.result.list //解析数据列表
//       // };

//       // for (var result in data) {
//       //   var demandAudit = data[result].demandAudit;
//       //   var goodsAudit = data[result].goodsAudit;
//       // }

//       // console.log(sel)
//       if (data.result.totalCount == 0) {
//         $('.tishi2').hide();
//       }
//     }
//   })
// }
// applyList()


// function bondList() {
//   $.ajax({
//     type: 'post',
//     url: pUrl + 'back_bondList.do',
//     data: {
//       page: 1,
//       pageSize: 100,
//       type: 1
//     },
//     dataType: 'json',
//     success: function (data) {
//       // console.log(data)
//       // var sel = {
//       //   "code": data.key, //解析接口状态
//       //   "msg": data.message, //解析提示文本
//       //   "count": data.result.total, //解析数据长度
//       //   "data": data.result.list //解析数据列表
//       // };

//       // for (var result in data) {
//       //   // var demandAudit = data[result].list;
//       //   var total = data[result].total;
//       // }

//       // console.log(sel)
//       // if (sel.count > 0) {
//       //   $('.tishi2').show();
//       // } else if (sel.count = 0) {
//       //   $('.tishi2').hide();
//       // }
//       if (data.result.total == 0) {
//         $('.tishi3').hide();
//       }
//     }
//   })
// }
// bondList()
