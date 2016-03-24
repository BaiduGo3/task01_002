var aqiData = {};
function $(id){
	return document.getElementById(id);
}

/*从用户输入中获取数据，向aqiData中增加一条数据*/
function addAqiData() {
	var city = $("aqi-city-input").value.trim();
	var air = $("aqi-value-input").value.trim();
	if(!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(city)) {
		alert("城市名必须为中英文字符！");
		$("aqi-city-input").value = "";
		$("aqi-city-input").focus();
		return;
	}
	if(!air.match(/^\d+$/)) {
		alert("空气质量指数必须为整数！");
		$("aqi-value-input").value = "";
		$("aqi-value-input").focus();
		return;
	}
	aqiData[city] = air;
	console.log(aqiData);
}

/*渲染aqi-table表格 */
function renderAqiList() {
	var thead = "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>";
	var content = $("aqi-table");
	content.innerHTML = thead;
	for(city in aqiData){
		var pre = "onclick='delBtnHandle(this,"
		var last = ")'>删除</button></td></tr>"
		var mid = '\"' + city + '\"';
		content.innerHTML += "<tr><td>" + city + "</td><td>" + aqiData[city] + 
		"</td><td><button class='btn' data-city='"+city+
		"' " + "onclick='delBtnHandle(this," + '\"' + city + '\"' + ")'>删除</button></td></tr>";
	}
}

/*点击add-btn时的处理逻辑,获取用户输入，更新数据，并进行页面呈现的更新*/
function addBtnHandle() {
  	addAqiData();
  	renderAqiList();
}

/*获取哪个城市数据被删，删除数据，更新表格显示*/
function delBtnHandle(button, city) {
	button.parentNode.parentNode.remove();
	delete aqiData[city];
}

function reset(){
	$("myform").reset();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  $("add-btn").onclick = function(){addBtnHandle()};
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();