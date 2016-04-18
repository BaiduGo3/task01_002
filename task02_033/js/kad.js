function $(id){
	return document.getElementById(id);
}

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
Square.prototype.init = function(top, left){
	this.sq.style.top = top + "px";
	this.sq.style.left = left + "px";
}
Square.prototype.rotate = function(dir){
	if(dir == "left") this.deg += -90;
	else if(dir == "right") this.deg += 90;
	else if(dir == "back") this.deg += 180;
	this.sq.style.transform = "rotate(" + this.deg + "deg)";
	this.dir = this.deg/90%4;
}
Square.prototype.move = function(){
	var top = parseInt(this.sq.style.top.split("px")[0]);
	var left = parseInt(this.sq.style.left.split("px")[0]);
	if(this.dir == -1 || this. dir == 3){
		if(bound(top, left-50)){
			left -= 50;
			this.init(top, left);
		}
	}else if(this.dir == 1 || this.dir == -3){
		if(bound(top, left+50)){
			left += 50;
			this.init(top, left);
		}
	}else if(this.dir == 0){
		if(bound(top-50, left)){
			top -= 50;
			this.init(top, left);
		}
	}else if(this.dir == -2 || this.dir == 2){
		if(bound(top+50, left)){
			top += 50;
			this.init(top, left);
		}
	}
}
Square.prototype.action = function(val){
	var val = val.trim().toUpperCase();
	if(val == "GO"){
		this.move();
	}else if(val == "TUN LEF"){
		this.rotate("left");
	}else if(val == "TUN RIG"){
		this.rotate("right");
	}else if(val == "TUN BAC"){
		this.rotate("back");
	}else{
		alert("指令有误！");
	}
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

function bound(top, left){
	return top > 0 && top <= 500 && left >0 && left <= 500;
}

function init(){
	var table = new Table();
	table.init();
	var square = new Square($("square"));
	square.init(300, 300);
	var go = $("go");
	var left = $("left");
	var right = $("right");
	var back = $("back");
	addEvent(left, "click", function(){
		square.rotate("left");
	});
	addEvent(right, "click", function(){
		square.rotate("right");
	});
	addEvent(back, "click", function(){
		square.rotate("back");
	});
	addEvent(go, "click", function(){
		square.move();
	});
	var text = $("text");
	text.onkeyup = function(event){
		if(event.keyCode == 13){
			square.action(text.value);
		}
	}
	var execute = $("execute");
	addEvent(execute, "click", function(){
		square.action(text.value);
	});
}
init();