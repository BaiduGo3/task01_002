/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var aqi_table = document.getElementById("aqi-table");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
String.prototype.trim = function(){
	return this.replace(/(^\s+)|(\s+$)/g,'');
}

function addAqiData() {
	var city = document.getElementById("aqi-city-input").value.trim();
	var aq = document.getElementById("aqi-value-input").value.trim();
	if(!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(city)){
		alert("城市名必须为中英文字符");
		document.getElementById("aqi-city-input").value = "";
		return;
	}
	if(!/^[1-9]\d*$|^0$/.test(aq)){
		alert("空气质量指数必须为整数");
		document.getElementById("aqi-value-input").value = "";
		return;
	}
	aqiData[city] = aq;
	document.getElementById("aqi-city-input").value = "";
	document.getElementById("aqi-value-input").value = "";
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var header = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
	var tr = ""
	for(var city in aqiData){
		tr += "<tr><td>" + city + "</td><td>" + aqiData[city] +"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
	}
	aqi_table.innerHTML = header+tr;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(ct) {
  // do sth.
  delete aqiData[ct];
  renderAqiList();
}

function getEventTarget(e){
	e = e || window.event;
	return e.target || e.srcElement;
}

//跨浏览器的事件处理程序
function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else if(obj.attachEvent){
		obj.attachEvent("on"+type,fn);
	}
	else{
		obj["on"+type] = fn;
	}
}

function deleteBtnEvent(obj,tag,type,fn){
	addEvent(obj,type,function(event){
		var target = getEventTarget(event);
		if(target && target.tagName === tag.toUpperCase()){
			fn(event.target.dataset.city);
			//fn.call(null, event.target.dataset.city);
		}
	});
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var button = document.getElementById("add-btn");
  addEvent(button,"click",addBtnHandle)
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  deleteBtnEvent(aqi_table, "button", "click", delBtnHandle);
}

init();