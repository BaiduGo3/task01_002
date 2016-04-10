function $(id){
	return document.getElementById(id);
}

//构造函数，代码复用
function GetObj(ul){
	this.data = new Array();
	this.render = function(){
		var content = this.data.reduce(function(first, second) {
			//console.log('#',first,'#',second,'#');
			return first + "<li>" + second + "</li>"
		},"");
		ul.innerHTML = content;
		addDelEvent(ul, this);
	}
	this.unshift = function(str){
		this.data.unshift(str);
	}
	this.push = function(str){
		this.data.push(str);
	}
	this.pop = function(){
		this.data.pop();
	}
	this.shift = function(){
		this.data.shift();
	}
	this.limit = function(){
		if(this.data.length > 10){
			this.data.shift();
		}
	}
}

var input = $("input");
var tagul = $("tag");
var textarea = $("textarea");
var hobbyul = $("hobby");
var hobbybtn = $("hobbybtn");

var tagList = new GetObj(tagul, true);
var hobbyList = new GetObj(hobbyul, false);

function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}

function getTarget(event){
	event = event || window.event;
	var target = event.target || event.srcElement;
	return target;
}

function addDelEvent(eventName, obj){
	for(var i = 0; i < eventName.childNodes.length; i++){
		addEvent(eventName.childNodes[i], 'mouseover',function(event){
			var target = getTarget(event);
			target.innerHTML = "点击删除 " + target.innerHTML;
			target.style.background = "red";
		})
		addEvent(eventName.childNodes[i], 'mouseout',function(event){
			var target = getTarget(event);
			target.innerHTML = target.innerHTML.split("点击删除 ")[1];
			target.style.background = "purple";
		})
		addEvent(eventName.childNodes[i], 'click',function(i,event){
			var target = getTarget(event);
			//做个闭包传入i值
			return function(){
				//console.log(i);
				obj.data.splice(i, 1);
				obj.render();
			};
		}(i))
	}
}

//输入空格，逗号，回车时，插入tag
function insertTag(event){
	var reg = /，|,| |\s/;
	var val = this.value;
	if(reg.test(val)){
		var match = val.match(reg);
		var str = match.input;
		str = str.substring(0, str.length-1);
		if(tagList.data.indexOf(str.trim()) == -1 && str != ""){
			tagList.push(str);
			tagList.limit();
			tagList.render();
		}else{
			alert("输入有重复 或者为 空字符！");
		}
		this.value = "";
	}else if(event.keyCode === 13){
		val = val.trim();
		if(tagList.data.indexOf(val) == -1 && val != ""){
			tagList.push(val);
			tagList.limit();
			tagList.render();
		}else{
			alert("输入有重复或者为空字符！");
		}
		this.value = "";
	}
}

function getTextarea(){
	var content = textarea.value.trim();
	return content.split(/[,，、\s\n]+/);
}

function insertHobby(){
	var val = getTextarea();
	if(val){
		val.forEach(function(i){
			if(hobbyList.data.indexOf(i) == -1 && i != ""){
				hobbyList.data.push(i);
				hobbyList.limit();
				hobbyList.render();
			}
		})
		textarea.value = "";
	}
}

function init(){
	input.onkeyup = insertTag;
	addEvent(hobbybtn, 'click', insertHobby);
}

init();