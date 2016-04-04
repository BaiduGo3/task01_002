var btnLeftIn = $("btn1"),
	btnRightIn = $("btn2"),
	btnLeftOut = $("btn3"),
	btnRightOut = $("btn4"),
	btnRandom = $("random"),
	btnBubble = $("rank"),
	btnQuick = $("quick");
var queueDiv = $("queue");
// var queue = [12,34,56,67,89,11,22,33,44,55,
// 			66,77,88,99,13,24,36,47,57,68,
// 			79,34,45,44,65,77,89,88,90,34,
// 			13,45,66,32,76,43,23,11,45,56,
// 			34,34,56,76,86,23,23,55,67,67,
// 			23,56,32,54,23,56,77,87,87,34];
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
	}else if(number>100||number<10){
		alert("输入的值必须在10~100之间！");
	}else{
		return number;
	}
}

//清除输入框中的值
function clearValue(){
	$("inputNum").value = "";
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
			queue.unshift(number);
			renderQueue();
			clearValue();
		}
	}
});

//右侧入按钮点击事件绑定
addEvent(btnRightIn,"click",function(){
	if(getFullNum()){
		var number = getValue();
		if(number){
			queue.push(number);
			renderQueue();
			clearValue();
		}
	}
});

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
});

//右侧出按钮事件绑定
addEvent(btnRightOut,"click",function(){
	var deleteNum = queue.pop();
	removeNum(deleteNum);
});

//生成一组随机数按钮绑定事件
addEvent(btnRandom,"click",function(){
	randomNumber();
});
//冒泡排序按钮
addEvent(btnBubble,"click",function(){
	bubbleSort();
});
//快速排序按钮
addEvent(btnQuick,"click",function(){
	quickSort();
});
//删除队列中元素
function deleteNum(index,num){
	alert("删除的数字是："+num);
	queue.splice(index,1);
	renderQueue()
}

//随机生成一组数据
function randomNumber(){
	for(var i=0;i<60;i++){
		queue[i] = Math.floor(Math.random()*90)+10;
	}
	renderQueue();
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

//渲染队列
function renderQueue(){
	queueDiv.innerHTML = queue.map(function(item,index){
		return "<span id='"+index+"' title='"+item+"' style='height:"+item*3+"px;'>"+item+"</span>";
 	}).join("");
}

//冒泡排序
function bubbleSort(){
	var len = queue.length,
		i = 0,
		j = 0,
		temp,
		timer = null;
	timer = setInterval(change, 10);
	function change(){
		if(i<len-1){
			if(j<len-i){
				if(queue[j]>queue[j+1]){
					temp = queue[j+1];
					queue[j+1] = queue[j];
					queue[j] = temp;
					renderChange(j,queue[j]);
					renderChange(j+1,queue[j+1]);
				}
				j++;
			}else{
				i++;
				j = 0;
			}
		}else{
			clearInterval(timer);
			console.log(queue);
			return;
		}
	}
}

//快速排序
function quickSort(){
	var t,front,rear,first,last,span,
		que = new Array();
	que.push(0);
	que.push(queue.length-1);
	var timer = setInterval(function(){
		if(que.length==0){
			clearInterval(timer);
			return;
		}
		front = que.shift();
		rear = que.shift();
		for(var i=first;i<last;i++){
			span = $(i);
			span.style.background = "red";
		}
		t = partition(queue,front,rear);
		first = front;
		last = rear;
		if(t-1-front+1>1){
			que.push(front);
			que.push(t-1);
		}else{
			span = $(front);
			span.style.background = "red";
		}
		if(rear-(t+1)+1>1){
			que.push(t+1);
			que.push(rear);
		}else{
			span = $(rear);
			span.style.background = "red";
		}
	}, 200);
}
	
function partition(queue,first,last){
	var temp = queue[first];
	for(var i=first;i<last;i++){
		var span = $(i);
		span.style.background = "#00ff00";
	}
	while(first<last){
		while(first<last && queue[last]>temp){
			last--;
		}
		if(first<last){
			queue[first] = queue[last];
			renderChange(first,queue[first]);
			first++;
		} 
		while(first<last && queue[first]<temp){
			first++;
		}
		if(first<last){
			queue[last] = queue[first];
			renderChange(last,queue[last]);
			last--;
		}
	}
	queue[first] = temp;
	renderChange(last,queue[last]);
	return first;
}

function renderChange(index,height){
	var span = $(index);
	span.style.height = height*3 + "px";
	span.innerHTML = height;
	//span.style.background = getColor();
}

//随机生成颜色
// function getColor(){
// 	var rand = Math.floor(Math.random() * 0xffffff).toString(16);
//     if (rand.length === 6) {
//     	console.log('#'+rand);
//         return '#' + rand;
//     } else {
//         return getColor();
//     }
// }
renderQueue();