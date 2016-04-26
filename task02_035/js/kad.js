//ie不支持trim
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

var mark = false;

function Table(){
}
Table.prototype.init = function(){
	var tbody = document.getElementsByTagName("tbody")[0];
	tbody.innerHTML = "";
	var content = "";
	for(var i = 0; i <= 10; i++){
		content += "<tr>";
		for(var j = 0; j <= 10; j++){
			if(i == 0 && j != 0){
				content += "<td>" + j + "</td>";
			}else if(i != 0 && j == 0){
				content += "<td>" + i + "</td>";
			}else{
				content += "<td></td>";
			}
		}
		content += "</tr>";
	}
	tbody.innerHTML = content;
}

function Square(sq){
	this.sq = sq;
	this.dir = 0;
	this.deg = 0;
}
Square.prototype.init = function(){
	this.sq.style.display = "block";
	this.sq.style.top = "50px";
	this.sq.style.left = "50px";
	this.sq.style.transform = "rotate(0deg)";
}
Square.prototype.position = function(top, left){
	this.sq.style.top = top + "px";
	this.sq.style.left = left + "px";
}
Square.prototype.rotate = function(dir){
	if(dir == "left") this.deg = -90;
	else if(dir == "right") this.deg = 90;
	else if(dir == "bottom") this.deg = 180;
	else if(dir == "top") this.deg = 0;
	this.sq.style.transform = "rotate(" + this.deg + "deg)";
	this.dir = this.deg/90%4;
}
Square.prototype.traleft = function(){
	var top = parseInt(this.sq.style.top.split("px")[0]);
	var left = parseInt(this.sq.style.left.split("px")[0]);
	if(bound(top, left-50)){
		left -= 50;
		this.position(top, left);
	}
}
Square.prototype.tratop = function(){
	var top = parseInt(this.sq.style.top.split("px")[0]);
	var left = parseInt(this.sq.style.left.split("px")[0]);
	if(bound(top-50, left)){
		top -= 50;
		this.position(top, left);
	}
}
Square.prototype.traright = function(){
	var top = parseInt(this.sq.style.top.split("px")[0]);
	var left = parseInt(this.sq.style.left.split("px")[0]);
	if(bound(top, left+50)){
		left += 50;
		this.position(top, left);
	}
}
Square.prototype.trabottom = function(){
	var top = parseInt(this.sq.style.top.split("px")[0]);
	var left = parseInt(this.sq.style.left.split("px")[0]);
	if(bound(top+50, left)){
		top += 50;
		this.position(top, left);
	}
}
Square.prototype.go = function(num){
	if(this.dir == -1){
		mark = true;
		for(var i = 0; i < num; i++){
			this.traleft();
		}
	}else if(this.dir == 1){
		mark = true;
		for(var i = 0; i < num; i++){
			this.traright();
		}
	}else if(this.dir == 0){
		mark = true;
		for(var i = 0; i < num; i++){
			this.tratop();
		}
		// var i = 0;
		// var _super = this;
		// var timer = setInterval(function(){
		// 	if(i == num){
		// 		clearInterval(timer);
		// 		return;
		// 	}
		// 	if(bound(top-50, left)){
		// 		top -= 50;
		// 		_super.position(top, left);
		// 	}
		// 	i++;
		// }, 400);
	}else if(this.dir == 2){
		mark = true;
		for(var i = 0; i < num; i++){
			this.trabottom();
		}
	}
}
Square.prototype.traAction = function(val, num){
	var val = val.trim().toUpperCase();
	if(val == "LEF"){
		mark = true;
		for(var i = 0; i < num; i++){
			this.traleft();
		}
	}else if(val == "TOP"){
		mark = true;
		for(var i = 0; i < num; i++){
			this.tratop();
		}
	}else if(val == "RIG"){
		mark = true;
		for(var i = 0; i < num; i++){
			this.traright();
		}
	}else if(val == "BOT"){
		mark = true;
		for(var i = 0; i < num; i++){
			this.trabottom();
		}
	}
}
Square.prototype.movAction = function(val, num){
	var val = val.trim().toUpperCase();
	if(val == "LEF"){
		mark = true;
		for(var i = 0; i < num; i++){
			if(this.dir != -1){
				this.rotate("left");
			}
			this.traleft();
		}
	}else if(val == "TOP"){
		mark = true;
		for(var i = 0; i < num; i++){
			if(this.dir != 0){
				this.rotate("top");
			}
			this.tratop();
		}
	}else if(val == "RIG"){
		mark = true;
		for(var i = 0; i < num; i++){
			if(this.dir != 1){
				this.rotate("right");
			}
			this.traright();
		}
	}else if(val == "BOT"){
		mark = true;
		for(var i = 0; i < num; i++){
			if(this.dir != 2){
				this.rotate("bottom");
			}
			this.trabottom();
		}
	}
}

//限定范围
function bound(top, left){
	return top > 0 && top <= 500 && left >0 && left <= 500;
}
//验证数字
function verify(val){
	return /^[0-9]+$/.test(val);
}
//处理输入行
function addrow(ol, len){
	ol.innerHTML = "";
	var top = text.scrollTop;
	for(var i = 0; i < len; i++){
		var li = document.createElement("li");
		li.innerHTML = i + 1;
		ol.appendChild(li);
	}
	ol.scrollTop = top;
}
//处理扫描和错误标记
function render(ol, liId, str){
	for(var i = 0, len = ol.childNodes.length; i < len; i++){
		if(ol.childNodes[i].innerHTML == (liId+1)){
			if(str == "error") ol.childNodes[i].className += " error";
			else if(str == "scan") ol.childNodes[i].className += " scan";
		}
	}
}
//清除颜色
function clearColor(ol){
	for(var i = 0, len = ol.childNodes.length; i < len; i++){
		if(ol.childNodes[i].className.match(/scan/)){
			ol.childNodes[i].className = ol.childNodes[i].className.replace(/scan/i, "");
		}
	}
}
//textarea初始化
function textinit(text, ol){
	var order = text.value;
	order.match(/\n/g) ? addrow(ol, order.match(/\n/g).length+1) : addrow(ol, 1);
}


function init(){
	var table = new Table();
	table.init();
	var square = new Square($("square"));
	square.init();
	var ol = $("line");
	var text = $("text");
	textinit(text, ol);
	addEvent(text, "focus", function(){
		if(text.value == ""){
			addrow(ol, 1);
		}
	});
	addEvent(text, "keyup", function(event){
		textinit(text, ol);
	});
	addEvent(text, "scroll", function(){
		var top = text.scrollTop;
		ol.scrollTop = top;
	});

	var execute = $("execute");
	addEvent(execute, "click", function(){
		var order = text.value.trim().split("\n");
		var i = 0, len = order.length;
		var timer = setInterval(function(){
			if(i == order.length){
				clearInterval(timer);
				return;
			}
			mark = false;
			clearColor(ol);
			render(ol, i, "scan");
			var one_order = order[i].trim().split(" ");
			if(one_order[0].toUpperCase() == "GO"){
				var num = one_order[1];
				if(num === undefined){
					square.go(1);
				}else if(verify(num) === true){
					square.go(num);
				}
			}else if(one_order[0].toUpperCase() == "MOV" && one_order[1]){
				var num = one_order[2];
				if(num === undefined){
					square.movAction(one_order[1], 1);
				}else if(verify(num) === true){
					square.movAction(one_order[1], num);
				}
			}else if(one_order[0].toUpperCase() == "TRA" && one_order[1]){
				var num = one_order[2];
				if(num === undefined){
					square.traAction(one_order[1], 1);
				}else if(verify(num) === true){
					square.traAction(one_order[1], num);
				}
			}
			if(mark === false){
				//console.log("error", i);
				render(ol, i, "error");
				clearInterval(timer);
				return;
			}
			i++;
		}, 400);
	});

	var reset = $("reset");
	addEvent(reset, "click", function(){
		square.init();
	})
}
init();