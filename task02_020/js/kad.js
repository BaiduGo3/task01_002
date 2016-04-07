function $(id){
	return document.getElementById(id);
	//这里看到很多团队用到了querySelector()来查找元素，但貌似querySelector多用来匹配CSS选择器，在通过id查找元素上支持没有getElementById好。
}
var text = $("text");
var leftIn = $("leftIn");
var rightIn = $("rightIn");
var leftOut = $("leftOut");
var rightOut = $("rightOut");
var searchText = $("searchText");
var searchbtn = $("searchBtn");
var ulList = $("list");

var data = new Array();

function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}

function getText(){
	var content = text.value.trim();
	if(!content.match(/^[,，、\s0-9a-zA-Z\u4e00-\u9fa5]+$/)){
		alert("输入不合法！");
		text.value="";
		text.focus();
		return;
	}
	else{
		insert = content.split(/[,，、\s\n]+/);
		return insert;
	}
}

//在数组开头添加一个元素
function unshift(){
	var content = getText();
	content.forEach(function(i){
		if(i) data.unshift(i);
	})
	render();
}
//在数组末尾添加一个元素
function push(){
	var content = getText();
	content.forEach(function(i){
		if(i) data.push(i);
	})
	render();
}
//从数组移出第一个元素
function shift(){
	var num = data.shift();
	if(num){
		alert("当前删除元素值为：" + num);
		render();
	}
	else{
		alert("没有可删除的元素啦~");
	}
}
//从数组移出最后一个元素
function pop(){
	var num = data.pop();
	if(num){
		alert("当前删除元素值为：" + num);
		render();
	}
	else{
		alert("没有可删除的元素啦~");
	}
}
//点击删除元素
function del(id){
	data.splice(id, 1);
	//console.log(data);
	render();
}

function render(){
	var content = "";
	var count = 0;
	data.forEach(function(ele){
		content += "<li id=" + count +">" + ele + "</li>";
		count++;
	})
	ulList.innerHTML = content;
}

function search(){
	for(var i = 0; i < data.length; i++){
		$(i).style.background = "red";
	}
	var key = searchText.value.trim();
	if(key == ""){
		alert("请输入查询关键字~~");
	}else{
		/*不区分大小写*/
		var reg = new RegExp(key,"gi");
		for(var i = 0; i < data.length; i++){
			if(reg.test(data[i])){
				$(i).style.background = "purple";
			}
		}
	}
	
}

function init(){
	data.push("KAD");
	data.push("lz");
	data.push("kad");
	data.push("Lz");
	data.push("Kad");
	data.push(1);
	render();
	addEvent(leftIn, 'click', unshift);
	addEvent(rightIn, 'click', push);
	addEvent(leftOut, 'click', shift);
	addEvent(rightOut, 'click', pop);
	addEvent(ulList, 'click', function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		if(target && target.tagName === "li".toUpperCase()){
			del(target.id);
		}
	});
	addEvent(searchbtn, 'click', search);
}

init();
