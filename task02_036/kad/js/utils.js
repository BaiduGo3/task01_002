/**
 * ie不支持trim
 */
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
/**
 * 验证指令
*/
function checkCmd(one_order){
	var regGo = /^GO(\s\d+)?$/i;
	// var regGo = new RegExp("GO(\s\d+)?", "i");
	var regTun = /^TUN\s(LEF|RIG|TOP|BOT)$/i;
    var regTraMov = /^(TRA|MOV)\s(LEF|RIG|TOP|BOT)(\s\d+)?$/i;
    var regBuild = /^BUILD$/i;
    var regBru = /^BRU\s(#[0-9A-Fa-f]{3}|#[0-9A-Fa-f]{6}|[A-Za-z]+)$/i;
    var regMovTo = /^MOV\sTO\s\d+,\d+$/i;
    return !regGo.test(one_order) && !regTun.test(one_order) && !regTraMov.test(one_order) && !regBuild.test(one_order) && !regBru.test(one_order) && !regMovTo.test(one_order);
}
/**
 * textarea新输入一行
 */
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
/**
 * 处理代码左侧行的显示，有扫描和错误两种标记
 */
function sideRender(ol, liId, flag){
	for(var i = 0, len = ol.childNodes.length; i < len; i++){
		if(ol.childNodes[i].innerHTML == (liId+1)){
			if(flag == "error") ol.childNodes[i].className += " error";
			else if(flag == "scan") ol.childNodes[i].className += " scan";
		}
	}
}
/**
 * 代码左侧行显示清除颜色
 */
function clearColor(ol){
	for(var i = 0, len = ol.childNodes.length; i < len; i++){
		if(ol.childNodes[i].className.match(/scan/)){
			ol.childNodes[i].className = ol.childNodes[i].className.replace(/scan/i, "");
		}
	}
}
/**
 * textarea初始化，无指令代码时显示一行
 */
function textinit(text, ol){
	var order = text.value;
	order.match(/\n/g) ? addrow(ol, order.match(/\n/g).length+1) : addrow(ol, 1);
}
