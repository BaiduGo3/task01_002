//ie不支持trim
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

//限定范围
function bound(top, left){
	return top > 0 && top <= 500 && left >0 && left <= 500;
}
//验证数字
function verify(val){
	return /^[0-9]+$/.test(val);
}
//处理输入行
function addrow(ol, len){
	ol.innerHTML = "";
	var top = text.scrollTop;
	for(var i = 0; i < len; i++){
		var li = document.createElement("li");
		li.innerHTML = i + 1;
		ol.appendChild(li);
	}
	ol.scrollTop = top;
}
//处理扫描和错误标记
function render(ol, liId, str){
	for(var i = 0, len = ol.childNodes.length; i < len; i++){
		if(ol.childNodes[i].innerHTML == (liId+1)){
			if(str == "error") ol.childNodes[i].className += " error";
			else if(str == "scan") ol.childNodes[i].className += " scan";
		}
	}
}
//清除颜色
function clearColor(ol){
	for(var i = 0, len = ol.childNodes.length; i < len; i++){
		if(ol.childNodes[i].className.match(/scan/)){
			ol.childNodes[i].className = ol.childNodes[i].className.replace(/scan/i, "");
		}
	}
}
//textarea初始化
function textinit(text, ol){
	var order = text.value;
	order.match(/\n/g) ? addrow(ol, order.match(/\n/g).length+1) : addrow(ol, 1);
}