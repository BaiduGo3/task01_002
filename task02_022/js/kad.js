function $(id){
	return document.getElementById(id);
}

var randombtn = $("randombtn");
var prebtn = $("prebtn");
var inbtn = $("inbtn");
var postbtn = $("postbtn");
var resetbtn = $("resetbtn");
var text = $("text");
var addbtn = $("addbtn");
var inputError = $("inputError");
var bitreeDiv = $("bitreeDiv");

var biTree = new Tree();

function Tree(){
	this.data = new Array(50);
	this.traversal = new Array();
	this.lock = false;
}

Tree.prototype.clear = function(arr){
	arr.splice(0, arr.length);
}
Tree.prototype.render = function(){
	bitreeDiv.innerHTML = "";
	var layer = 1;
	var i = 1;
	var ul = document.createElement('ul');
	while(i < this.data.length){
		if(i <= Math.pow(2, layer)-1){
			var li = document.createElement('li');
			var span = document.createElement('span');
			if(this.data[i]){
				span.innerHTML = this.data[i];
				span.style.padding = "10px";
				span.style.background = "red";
				span.setAttribute("id", i);
			}
			li.style.width = 100/Math.pow(2, layer-1) + '%';
			li.appendChild(span);
			ul.appendChild(li);
			i++;
		}
		else{
			bitreeDiv.appendChild(ul);
			layer++;
			ul = document.createElement('ul');
		}
	}
	bitreeDiv.appendChild(ul);
}
Tree.prototype.show = function(index){
	if($(index).style.backgroundColor == "red"){
		$(index).style.background = "purple";
	}else{
		$(index).style.background = "red";
	}
}
Tree.prototype.preOrder = function(index){
	if(this.data[index]){
		this.traversal.push(index);
		this.preOrder(index * 2);
		this.preOrder(index * 2 + 1);
	}
}
Tree.prototype.inOrder = function(index){
	if(this.data[index]){
		this.inOrder(index * 2);
		this.traversal.push(index);
		this.inOrder(index * 2 + 1);
	}
}
Tree.prototype.postOrder = function(index){
	if(this.data[index]){
		this.postOrder(index * 2);
		this.postOrder(index * 2 + 1);
		this.traversal.push(index);
	}
}
Tree.prototype.nodeCount = function(){
	var count = 0;
	for(var i = 0; i < this.data.length; i++){
		if(this.data[i]) count++;
	}
	return count;
}

function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}

//验证输入框数据
function verifyText(event){
	event = event || window.event;
	var target = event.target || event.srcElement;
	var val = target.value;
	if(val < 0 || val > 100){
		inputError.innerHTML = "请输入0-100内的数字!";
	}else{
		inputError.innerHTML = "";
	}
}

//构建二叉排序树
function buildTree(num, index){
	if(biTree.data[index]){
		if(num < biTree.data[index]){
			buildTree(num, index * 2);
		}else{
			buildTree(num, index * 2 + 1);
		}
	}else{
		biTree.data[index] = num;
	}
}
//随机生成二叉排序树
function getrandomTree(){
	biTree.clear(biTree.data);
	biTree.data[1] = 50;
	var index = 1;
	for(var i = 0; i < 10; i++){
		var num = Math.floor(Math.random() * 100);
		buildTree(num, index);
	}
	//console.log(biTree.data);
	biTree.render();
}

//设置间隔开始遍历二叉树
function beginTraversal(kind){
	if(!biTree.lock){
		biTree.clear(biTree.traversal);
		biTree.lock = true;
		if(kind == "preOrder") biTree.preOrder(1);
		else if(kind == "inOrder") biTree.inOrder(1);
		else if(kind == "postOrder") biTree.postOrder(1);
		var i = 0;
		var timer = setInterval(function(){
			if(i == biTree.traversal.length){
				clearInterval(timer);
				biTree.lock = false;
				return;
			}else{
				biTree.show(biTree.traversal[i]);
				i++;
			}
		}, 400);
	}else{
		alert("遍历中~稍后再操作");
	}
}

function init(){
	text.onkeyup = verifyText;
	addEvent(randombtn, 'click', function(){
		if(!biTree.lock){
			getrandomTree();
		}else{
			alert("遍历中~稍后再操作");
		}
	});
	addEvent(prebtn, 'click', function(){
		beginTraversal("preOrder");
	});
	addEvent(inbtn, 'click', function(){
		beginTraversal("inOrder");
	});
	addEvent(postbtn, 'click', function(){
		beginTraversal("postOrder");
	});
	addEvent(resetbtn, 'click', function(){
		biTree.clear(biTree.data);
		biTree.render();
	})
	addEvent(addbtn, 'click', function(){
		if(inputError.innerHTML == "" && biTree.nodeCount() <= 15){
			buildTree(text.value, 1);
			biTree.render();
			text.value = "";
		}
	})
}

init();