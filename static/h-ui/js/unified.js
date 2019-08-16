//将url?name=value&name=value转换为{name:value,name:value}
function gainParameter(url){
  var urlParameter = url.split("?");
  urlParameter = urlParameter[1].split("&");
  console.log(urlParameter);
  var arr = {};
  for(var i in urlParameter){
    var parameter = urlParameter[i].split("=");
    arr[parameter[0]]=parameter[1]
  }
  return arr
}