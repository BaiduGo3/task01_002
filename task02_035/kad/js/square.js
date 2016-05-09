
var mark = false;

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
