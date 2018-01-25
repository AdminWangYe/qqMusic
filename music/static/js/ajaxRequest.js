/**
 * Created by 14733 on 2018/1/17.
 */

function ajaxRequest(url,method,data,callback){

	var xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function(){
		if (xhr.readyState==4) {
			if (xhr.status==200) {
				if (typeof data == "function") {
					callback = null
					data(xhr.responseText)

				} else {
					typeof callback == "function" && callback(xhr.responseText)
				}


			}else{
				console.log("请求异常："+xhr.status)
			}
		}
	}
	xhr.open(method,url,true)
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
	if (typeof data == "function") {
		xhr.send()
	} else {
		xhr.send(data)
	}

}




