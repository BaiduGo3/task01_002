var prebtn = $("pre"),
	inbtn = $("in"),
	postbtn = $("post"),
	boxes = document.getElementsByTagName("span"),
	indexArr = [];
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

//先序遍历
function preOrder(index){
	if(boxes[index]){
		indexArr.push(index);
		preOrder(index*2+1);
		preOrder(index*2+2);
	}
}

//中序遍历
function inOrder(index){
	if(boxes[index]){
		inOrder(index*2+1);
		indexArr.push(index);
		inOrder(index*2+2);
	}
}

//后序遍历
function postOrder(index){
	if(boxes[index]){
		postOrder(index*2+1);
		postOrder(index*2+2);
		indexArr.push(index);
	}
}

//渲染
function render(){
	var timer = setInterval(change, 500);
	var i=0;
	function change(){
		if(i==0){
			boxes[indexArr[i]].style.background = "#00dd00";
			i++;
		}else if(i<indexArr.length){
			boxes[indexArr[i]].style.background = "#00dd00";
			boxes[indexArr[i-1]].style.background = "#ff0000";
			i++;
		}else{
			boxes[indexArr[i-1]].style.background = "#ff0000";
			clearInterval(timer);
			indexArr = [];
		}
	}
}

//初始化
function init(){
	addEvent(prebtn,"click",function(){
		preOrder(0);
		render();
	});
	addEvent(inbtn,"click",function(){
		inOrder(0);
		render();
	});
	addEvent(postbtn,"click",function(){
		postOrder(0);
		render();
	});
}

init();