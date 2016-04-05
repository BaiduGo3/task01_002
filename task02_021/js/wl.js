var tag = $("tag"),
	tagBox = $("tagBox"),
	textarea = $("textarea"),
	checkHobby = $("checkHobby"),
	hobbyBox = $("hobbyBox"),
	tagArr = [],
	hobbyArr = [];

function $(id){
	return document.getElementById(id);
}

//事件绑定，浏览器兼容
function addEvent(ele,type,handler){
	if(ele.addEventListener){
		ele.addEventListener(type,handler,false);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,handler);
	}
	else{
		ele["on"+type] = handler;
	}
}

//事件代理
function addMouseEvent(ele,type,tag,handler){
	addEvent(ele,type,function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		if(target && target.tagName === tag.toUpperCase()){
			handler.call(this,target.id,target.innerHTML);
		}
	});
}

//鼠标悬停时tag前增加删除二字
function addDelete(id,html){
	var span = $(id);
	span.innerHTML = "点击删除"+html;
	span.style.background = "#ff0000";
	span.style.color = "#000000";
}

//鼠标移出时去掉tag前的删除二字
function delDelete(id,html){
	var span = $(id);
	span.innerHTML = html.slice(4);
	span.style.background = "#00bbff";
	span.style.color = "#ffffff";
}

//鼠标点击tag时删除相应tag
function deleteTag(id,html){
	tagArr.splice(id,1);
	render(tagBox,tagArr);
}

//input函数浏览器兼容
function addInputEvent(ele,type,handler){
	var testInput = document.createElement('input');
	if('oninput' in testInput){
		addEvent(ele,type,handler);
	}else{
		object.onpropertychange = handler;
	}
}

//清除输入框中的值
function clearValue(area){
	$(area).value = "";
}

//获取textarea输入的值
function getHobbys(){
	var text = $("textarea").value;
	var regex = /[,，、\s]/;
	var append;
	if(!text){
		alert("输入不能为空！");
	}else if(!/^[,，、\s\da-zA-Z\u4e00-\u9fa5]+$/.test(text)){
		alert("输入不合法！");
	}else{
		append = text.split(regex);
		return append;
	}
}

//去重处理
function clearRepeat(arr,append){
	var flag = false;
	for(var i in arr){  
		if(arr[i]==append){
			flag = true;
			break;
		}
	}
	return flag;
}

//判断是否超过10个
function isOverTen(arr,append){
	if(arr.length<10){
		arr.push(append);
	}else{
		arr.shift();
		arr.push(append);
	}
	return arr;
}

//tag输入触发事件
function tagInput(){
	var text = $('tag').value;
	var regex = /[,，\s]+/;
	var tagContent,flag;
	if(regex.test(text)){
		tagContent = text.slice(0,-1).trim();
		if(tagContent){
			flag = clearRepeat(tagArr,tagContent);
			if(!flag){
				tagArr = isOverTen(tagArr,tagContent);
				render(tagBox,tagArr);
				clearValue("tag");
			}else{
				clearValue("tag");
			}
		}
	}
}

//点击确认兴趣爱好按钮后，添加hobby
function appendHobby(){
	var hobbys = getHobbys();
	var flag;
	if(hobbys){
		for(var i=0;i<hobbys.length;i++){
			if(hobbys[i]){
				flag = clearRepeat(hobbyArr,hobbys[i]);
				if(!flag){
					hobbyArr = isOverTen(hobbyArr,hobbys[i]);
					render(hobbyBox,hobbyArr);
				}else{
					clearValue("textarea");
				}
			}
		}
		render(hobbyBox,hobbyArr);
	}
}

//渲染
function render(box,arr){
	box.innerHTML = arr.map(function(item,index){
		return "<span id='" + index +"'>" + item + "</span>";
	}).join("");
}

//事件绑定
function init(){
	addInputEvent(tag,"input",tagInput);
	addEvent(tag,"click",function(){
		clearValue("tag");
	});
	addEvent(textarea,"click",function(){
		clearValue("textarea");
	});
	addMouseEvent(tagBox,"mouseover","span",addDelete);
	addMouseEvent(tagBox,"mouseout","span",delDelete);
	addMouseEvent(tagBox,"click","span",deleteTag);
	addEvent(checkHobby,"click",appendHobby);
}

init();
