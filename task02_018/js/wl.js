var btnLeftIn = $("btn1"),
	btnRightIn = $("btn2"),
	btnLeftOut = $("btn3"),
	btnRightOut = $("btn4");
var queueDiv = $("queue");
var queue = [];

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

//获取输入的值
function getValue(){
	var number = $("inputNum").value.trim();
	if(!number){
		alert("输入不能为空");
	}else if(!/^\d+$/.test(number)){
		alert("输入的值必须是数字！");
	}else{
		return number;
	}
}

//清除输入框中的值
function clearValue(){
	$("inputNum").value = "";
}

//左侧入按钮点击事件绑定
addEvent(btnLeftIn,"click",function(){
	var number = getValue();
	if(number){
		queue.unshift(number);
		renderQueue();
		clearValue();
	}
})

//右侧入按钮点击事件绑定
addEvent(btnRightIn,"click",function(){
	var number = getValue();
	if(number){
		queue.push(number);
		renderQueue();
		clearValue();
	}
	
})

//移出元素
function removeNum(num){
	if(num){
		alert(num);
		renderQueue();
		clearValue();
	}else{
		alert("无元素可移出！");
	}
}

//左侧出按钮事件绑定
addEvent(btnLeftOut,"click",function(){
	var deleteNum = queue.shift();
	removeNum(deleteNum);
})

//右侧出按钮事件绑定
addEvent(btnRightOut,"click",function(){
	var deleteNum = queue.pop();
	removeNum(deleteNum);
})

//删除队列中元素
function deleteNum(index,num){
	queue.splice(index,1);
	renderQueue()
}

function delegateEvent(ele,type,tag,handler){
	addEvent(ele,type,function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		if(target && target.tagName === tag.toUpperCase()){
			handler.call(this,target.id,target.innerHTML);
		}
	});
}

delegateEvent(queueDiv,"click","span",deleteNum);

//渲染队列
function renderQueue(){
	queueDiv.innerHTML = queue.map(function(item,index){
		return "<span id='"+index+"'>" + item + "</span>";
	}).join("");
}

renderQueue();