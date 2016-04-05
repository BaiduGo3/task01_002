var btnLeftIn = $("btn1"),
	btnRightIn = $("btn2"),
	btnLeftOut = $("btn3"),
	btnRightOut = $("btn4"),
	btnSearch = $("btnSearch");
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
	var text = $("textarea").value;
	var regex = /[,，、\s]/;
	var append;
	if(!text||regex.test(text)){
		alert("输入不能为空！");
	}else if(!/^[,，、\s\da-zA-Z\u4e00-\u9fa5]+$/.test(text)){
		alert("输入不合法！");
	}else{
		append = text.split(regex);
		console.log(append);
		return append;
	}
}


//清除输入框中的值
function clearValue(area){
	$(area).value = "";
}

//判断是否已满
function getFullNum(){
	if(queue.length>=60){
		alert("队列已满，不能继续添加！");
		return false;
	}else{
		return true;
	}
}

//左侧入按钮点击事件绑定
addEvent(btnLeftIn,"click",function(){
	if(getFullNum()){
		var number = getValue();
		if(number){
			for(var i=0;i<number.length;i++){
				if(number[i]){
					queue.unshift(number[i]);
				}
			}
			renderQueue();
			clearValue("textarea");
		}
	}
});

//右侧入按钮点击事件绑定
addEvent(btnRightIn,"click",function(){
	if(getFullNum()){
		var number = getValue();
		if(number){
			for(var i=0;i<number.length;i++){
				if(number[i]){
					queue.push(number[i]);
				}
			}
			renderQueue();
			clearValue("textarea");
		}
	}
});

//移出元素
function removeNum(num){
	if(num){
		alert(num);
		renderQueue();
		clearValue("textarea");
	}else{
		alert("无元素可移出！");
	}
}

//左侧出按钮事件绑定
addEvent(btnLeftOut,"click",function(){
	var deleteNum = queue.shift();
	removeNum(deleteNum);
});

//右侧出按钮事件绑定
addEvent(btnRightOut,"click",function(){
	var deleteNum = queue.pop();
	removeNum(deleteNum);
});


//删除队列中元素
function deleteNum(index,num){
	alert("删除的元素是："+num);
	queue.splice(index,1);
	renderQueue()
}


function delegateEvent(ele,type,tag,handler){
	addEvent(ele,type,function(event){
		event = event || window.event;
		console.log(event);
		var target = event.target || event.srcElement;
		if(target && target.tagName === tag.toUpperCase()){
			handler.call(this,target.id,target.innerHTML);
		}
	});
}

delegateEvent(queueDiv,"click","span",deleteNum);

//查询按钮事件绑定
addEvent(btnSearch,"click",function(){
	var searchText = $("searchInput").value.trim();
	for(var i =0; i<queue.length; i++){
		if(queue[i].indexOf(searchText)>=0){
			var span = $(i);
			span.style.background = "green";
			span.style.color = "black";
		}
	}
	clearValue("searchInput");
});



//渲染队列
function renderQueue(){
	queueDiv.innerHTML = queue.map(function(item,index){
		return "<span id='"+index+"' title='"+item+"'>"+item+"</span>";
 	}).join("");
}

renderQueue();