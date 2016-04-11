function $(id){
	return document.getElementById(id);
}
var lock = false;

//构造函数
function Tree(root){
	this.data = new Array();
	this.root = root;
}
Tree.prototype.dfsTraversal = function(){
	var data = new Array();
	(function dfs(node){
		data.push(node);
		for(var i = 0; i < node.children.length; i++){
			if(node.children[i]) dfs(node.children[i]);
		}
	})(this.root);
	this.data = data;
}
Tree.prototype.bfsTraversal = function(){
	var data = new Array();
	var q = new Array();
	q.push(this.root);
	data.push(this.root);
	while(q.length > 0){
		var now = q.shift();
		for(var i = 0; i < now.children.length; i++){
			q.push(now.children[i]);
			data.push(now.children[i]);
		}
	}
	this.data = data;
}
Tree.prototype.render = function(kind){
	var i = 0;
	lock = true;
	var data = this.data;
	var timer = setInterval(function(){
		showColor(data, kind);
		if(i < data.length){
			data[i].style.backgroundColor = "red";
			i++;
		}else{
			clearInterval(timer);
			lock = false;
			return;
		}
	}, 400);
}

var dfsbtn = $("dfsbtn");
var bfsbtn = $("bfsbtn");
var root = $("root");
var searchkey = $("searchkey");
var dfssearch = $("dfssearch");
var bfssearch = $("bfssearch");
var delbtn = $("delbtn");
var addText = $("addText");
var addbtn = $("addbtn");
var div = document.getElementsByTagName("div");

var tree = new Tree(root);

function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}

function showColor(data, kind){
	for(var i = 0; i < data.length; i++){
		if(kind == "search"){
			if(!find(data[i]) && data[i].style.backgroundColor == "red"){
				data[i].style.backgroundColor = "white";
			}
		}else{
			if(data[i].style.backgroundColor != "white"){
				data[i].style.backgroundColor = "white";
			}
		}
	}
}

function find(node){
	if(node.firstChild.nodeValue.trim().toLowerCase() == searchkey.value.trim().toLowerCase()){
		return true;
	}else{
		return false;
	}
}


var selected = "";

function executeClick(dorb, traorsear){
	if(lock){
		alert("遍历中，稍后再操作！");
	}else{
		if(dorb == "dfs") tree.dfsTraversal();
		else if(dorb == "bfs") tree.bfsTraversal();
		if(traorsear == "tra") tree.render();
		else if(traorsear == "search") tree.render("search");
	}
}

function init(){
	//dfs
	addEvent(dfsbtn, "click", function(){
		executeClick("dfs", "tra");
	});
	//bfs
	addEvent(bfsbtn, "click", function(){
		executeClick("bfs", "tra");
	});
	//dfssearch
	addEvent(dfssearch, "click", function(){
		if(searchkey.value.trim() == ""){
			alert("请输入查找节点内容！");
			return;
		} 
		executeClick("dfs", "search");
	});
	//bfssearch
	addEvent(bfssearch, "click", function(){
		if(searchkey.value.trim() == ""){
			alert("请输入查找节点内容！");
			return;
		} 
		executeClick("bfs", "search");
	});
	//select node
	addEvent(root, 'click', function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		for(var i = 0; i < div.length; i++){
			div[i].style.backgroundColor = "white";
		}
		if(target && target.tagName === "div".toUpperCase()){
			target.style.backgroundColor = "purple";
			selected = target;
		}else{
			selected = "";
		}
	});
	//delete node
	addEvent(delbtn, "click", function(){
		if(selected != ""){
			selected.parentNode.removeChild(selected);
			selected = "";
		}else{
			alert("还未选中节点！");
		}
	});
	//add node
	addEvent(addbtn, 'click', function(){
		var addkey = addText.value.trim();
		if(selected == ""){
			alert("还未选中节点！");
		}else if(addkey == ""){
			alert("请输入节点内容！");
		}else{
			var tag = document.createElement("div");
			tag.innerHTML = addkey;
			selected.appendChild(tag);
		}
	})
}

init();