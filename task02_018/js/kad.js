function $(id){
	return document.getElementById(id);
	//这里看到很多团队用到了querySelector()来查找元素，但貌似querySelector多用来匹配CSS选择器，在通过id查找元素上支持没有getElementById好。
}
var text = $("text");
var leftIn = $("leftIn");
var rightIn = $("rightIn");
var leftOut = $("leftOut");
var rightOut = $("rightOut");
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
	var num = text.value.trim();
	if(!num.match(/^[0-9]+$/)){
		alert("输入元素必须是数字！");
		text.value="";
		text.focus();
		return;
	}
	else return parseInt(num);
}

//在数组开头添加一个元素
function unshift(){
	var num = getText();
	if(num){
		data.unshift(num);
		render();
	}
}
//在数组末尾添加一个元素
function push(){
	var num = getText();
	if(num){
		data.push(num);
		render();
	}
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
		content += "<li data-id=" + count +">" + ele + "</li>";
		count++;
	})
	ulList.innerHTML = content;
}

function init(){
	data.push(99);
	data.push(1);
	data.push(523);
	render();
	addEvent(leftIn, 'click', unshift);
	addEvent(rightIn, 'click', push);
	addEvent(leftOut, 'click', shift);
	addEvent(rightOut, 'click', pop);
	addEvent(ulList, 'click', function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		if(target && target.tagName === "li".toUpperCase()){
			del(target.dataset.id);
		}
	});
}

init();
