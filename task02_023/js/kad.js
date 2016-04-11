function $(id){
	return document.getElementById(id);
}
var lock = false;
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
			if(data[i].style.backgroundColor == "red"){
				data[i].style.backgroundColor = "white";
			}
		}
	}
}

function find(node){
	if(node.firstChild.nodeValue.trim().toLowerCase() == searchkey.value.toLowerCase()){
		return true;
	}else{
		return false;
	}
}

function init(){
	addEvent(dfsbtn, "click", function(){
		if(lock){
			alert("遍历中，稍后再操作！");
		}else{
			tree.dfsTraversal();
			tree.render();
		}
	});
	addEvent(bfsbtn, "click", function(){
		if(lock){
			alert("遍历中，稍后再操作！");
		}else{
			tree.bfsTraversal();
			tree.render();
		}
	});
	addEvent(dfssearch, "click", function(){
		if(lock){
			alert("遍历中，稍后再操作！");
		}else{
			tree.dfsTraversal();
			tree.render("search");
		}
	});
	addEvent(bfssearch, "click", function(){
		if(lock){
			alert("遍历中，稍后再操作！");
		}else{
			tree.bfsTraversal();
			tree.render("search");
		}
	});
}

init();