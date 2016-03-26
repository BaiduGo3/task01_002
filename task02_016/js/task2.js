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
	var table = $("aqi-table");
	table.innerHTML = thead;
	for(city in aqiData){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		td1.innerHTML = city;
		var td2 = document.createElement("td");
		td2.innerHTML = aqiData[city];
		var td3 = document.createElement("td");
		var btn = document.createElement("button");
		btn.setAttribute("data-city",city);
		btn.innerHTML = "删除";
		td3.appendChild(btn);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
}

function reset(){
	$("myform").reset();
}

/*点击add-btn时的处理逻辑,获取用户输入，更新数据，并进行页面呈现的更新*/
function addBtnHandle() {
  	addAqiData();
  	renderAqiList();
}

/*获取哪个城市数据被删，删除数据，更新表格显示*/
function delBtnHandle(city) {
	delete aqiData[city];
	renderAqiList();
}

//Browser Support
function addEvent(element, eventName, func) {
    if (element.addEventListener) {
        element.addEventListener(eventName, func, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, func);
    } else {
        element["on" + eventName] = func;
    }
}
function delegateEvent(element, tag, eventName, func) {
    addEvent(element, eventName, function (event) {
    	console.log(event);
    	//console.log(arguments[0]);
    	/*事件处理函数的第一个参数argument[0]默认为是该事件的event对象*/
        var event = event || window.event;
        var target = event.target || event.srcElement;
        console.log(target);
        if(target && target.tagName === tag.toUpperCase()) {
        	console.log(event.target.dataset.city);
        	func.call(null, event.target.dataset.city);//这里暂时不明白为什么要传入第一个null参数，只传第二个参数会是undefined。
        }
    });
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  addEvent($("add-btn"), "click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  delegateEvent($("aqi-table"), "button", "click", delBtnHandle);
}

init();