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
Square.prototype.init = function(){
	this.sq.style.display = "block";
	this.sq.style.top = "300px";
	this.sq.style.left = "300px";
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
Square.prototype.action = function(val){
	var val = val.trim().toUpperCase();
	if(val == "TRA LEF"){
		this.traleft();
	}else if(val == "TRA TOP"){
		this.tratop();
	}else if(val == "TRA RIG"){
		this.traright();
	}else if(val == "TRA BOT"){
		this.trabottom();
	}else if(val == "MOV LEF"){
		if(this.dir != -1){
			this.rotate("left");
		}
		this.traleft();
	}else if(val == "MOV TOP"){
		if(this.dir != 0){
			this.rotate("top");
		}
		this.tratop();
	}else if(val == "MOV RIG"){
		if(this.dir != 1){
			this.rotate("right");
		}
		this.traright();
	}else if(val == "MOV BOT"){
		if(this.dir != 2){
			this.rotate("bottom");
		}
		this.trabottom();
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
	square.init();
	var traleft = $("traleft");
	var tratop = $("tratop");
	var traright = $("traright");
	var trabottom = $("trabottom");
	var movleft = $("movleft");
	var movtop = $("movtop");
	var movright = $("movright");
	var movbottom = $("movbottom");
	addEvent(traleft, "click", function(){
		square.traleft();
	});
	addEvent(tratop, "click", function(){
		square.tratop();
	});
	addEvent(traright, "click", function(){
		square.traright();
	});
	addEvent(trabottom, "click", function(){
		square.trabottom();
	});
	addEvent(movleft, "click", function(){
		if(square.dir != -1){
			square.rotate("left");
		}
		square.traleft();
	});
	addEvent(movtop, "click", function(){
		if(square.dir != 0){
			square.rotate("top");
		}
		square.tratop();
	});
	addEvent(movright, "click", function(){
		if(square.dir != 1){
			square.rotate("right");
		}
		square.traright();
	});
	addEvent(movbottom, "click", function(){
		if(this.dir != 2){
			square.rotate("bottom");
		}
		square.trabottom();
	})

	var text = $("text");
	text.onkeyup = function(event){
		if(event.keyCode == 13){
			square.action(text.value);
		}else if(event.keyCode == 38){//top
			square.tratop();
		}else if(event.keyCode == 40){//bottom
			square.trabottom();
		}else if(event.keyCode == 37){//left
			square.traleft();
		}else if(event.keyCode == 39){//right
			square.traright();
		}
	}
	var execute = $("execute");
	addEvent(execute, "click", function(){
		square.action(text.value);
	});
}
init();