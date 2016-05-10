var SQUARE_SIZE = 50;
var mark = false;//judge whether order is right

var SQUARE_POS = {
	x: 0,
	y: 0,
	dir: -10
};

function Square(sq){
	this.sq = sq;
	this.dir = 0;//-1:left, 0:top, 1:right, 2:bottom
	this.deg = 0;
}
Square.prototype.init = function(){
	this.sq.style.display = "block";
	this.sq.style.top = SQUARE_SIZE*4 + "px";
	this.sq.style.left = SQUARE_SIZE*4 + "px";
	this.sq.style.transform = "rotate(0deg)";
	this.x = SQUARE_SIZE*4;
	this.y = SQUARE_SIZE*4;
}
Square.prototype.position = function(top, left, tag){
	if(tag == "parse"){
		SQUARE_POS.x = top/50;
		SQUARE_POS.y = left/50;
	}else{
		this.sq.style.top = top + "px";
		this.sq.style.left = left + "px";
		this.x = top;
		this.y = left;
	}
}
Square.prototype.rotate = function(dir, tag){
	mark = true;
	dir = dir.toLowerCase();
	if(dir == "lef") this.deg = -90;
	else if(dir == "rig") this.deg = 90;
	else if(dir == "bot") this.deg = 180;
	else if(dir == "top") this.deg = 0;
	this.dir = this.deg/90%4;

	if(tag != "parse") this.sq.style.transform = "rotate(" + this.deg + "deg)";
	
}
Square.prototype.traleft = function(flag, tag){
	console.log(flag, tag);
	mark = true;
	// var top = this.x;
	// var left = this.y;
	var top, left;
	if(tag === "parse"){
		top = SQUARE_POS.x*50;
		left = SQUARE_POS.y*50;
	}else{
		top = this.x;
		left = this.y;
	}

	var x = top/SQUARE_SIZE, y = (left-SQUARE_SIZE)/SQUARE_SIZE;
	console.log("++++++++++++++++++++++", bound(top, left-SQUARE_SIZE), map[x][y], x, y, map);
	if(bound(top, left-SQUARE_SIZE)  && !map[x][y] ){
		console.log("++++++++++++++++++++++");





		if(flag === "build"){
			// console.log("++++++++++++++++++++++");
			var id = x + "_" + y;
			map[x][y] = 1;
			if(tag != "parse") {
				// console.log("++++++++++++++++++++++");
				$(id).className = "wall";
				// console.log("++++++++++++++++++++++");
			}
		}else{
			left -= SQUARE_SIZE;
			this.position(top, left, tag);
		}
	}else{
		console.log("wall ahead or out of bound");
	}
}
Square.prototype.tratop = function(flag, tag){
	mark = true;
	// var top = this.x;
	// var left = this.y;
	var top, left;
	if(tag === "parse"){
		top = SQUARE_POS.x*50;
		left = SQUARE_POS.y*50;
	}else{
		top = this.x;
		left = this.y;
	}

	var x = (top-SQUARE_SIZE)/SQUARE_SIZE, y = left/SQUARE_SIZE;
	if(bound(top-SQUARE_SIZE, left)  && !map[x][y] ){
		if(flag === "build"){
			var id = x + "_" + y;
			map[x][y] = 1;
			if(tag != "parse") $(id).className = "wall";
		}else{
			top -= SQUARE_SIZE;
			this.position(top, left, tag);
		}
	}else{
		console.log("wall ahead or out of bound");
	}
}
Square.prototype.traright = function(flag, tag){
	mark = true;
	// var top = this.x;
	// var left = this.y;

	var top, left;
	if(tag === "parse"){
		top = SQUARE_POS.x*50;
		left = SQUARE_POS.y*50;
	}else{
		top = this.x;
		left = this.y;
	}

	var x = top/SQUARE_SIZE, y = (left+SQUARE_SIZE)/SQUARE_SIZE;
	// console.log(x, y, map, bound(top, left+SQUARE_SIZE));
	if(bound(top, left+SQUARE_SIZE) && !map[x][y]){
		if(flag === "build"){
			var id = x + "_" + y;
			console.log("^^^^^^^^^^^^^^^^^^^^^^^^", x, y);
			map[x][y] = 1;
			if(tag != "parse") $(id).className = "wall";
		}else{
			left += SQUARE_SIZE;
			this.position(top, left, tag);
		}
	}else{
		console.log("wall ahead or out of bound");
	}
}
Square.prototype.trabottom = function(flag, tag){
	mark = true;
	// var top = this.x;
	// var left = this.y;
	var top, left;
	if(tag === "parse"){
		top = SQUARE_POS.x*50;
		left = SQUARE_POS.y*50;
	}else{
		top = this.x;
		left = this.y;
	}

	var x = (top+SQUARE_SIZE)/SQUARE_SIZE, y = left/SQUARE_SIZE;
	if(bound(top+SQUARE_SIZE, left) && !map[x][y] ){
		if(flag === "build"){
			var id = x + "_" + y;
			map[x][y] = 1;
			if(tag != "parse") $(id).className = "wall";
		}else{
			top += SQUARE_SIZE;
			this.position(top, left, tag);
		}
	}else{
		console.log("wall ahead or out of bound");
	}
}
Square.prototype.go = function(num, tag){
	if(this.dir == -1){
		for(var i = 0; i < num; i++){
			this.traleft("", tag);
		}
	}else if(this.dir == 1){
		for(var i = 0; i < num; i++){
			this.traright("", tag);
		}
	}else if(this.dir == 0){
		for(var i = 0; i < num; i++){
			this.tratop("", tag);
		}
	}else if(this.dir == 2){
		for(var i = 0; i < num; i++){
			this.trabottom("", tag);
		}
	}
}
Square.prototype.traAction = function(val, num, tag){
	var val = val.trim().toUpperCase();
	if(val == "LEF"){
		for(var i = 0; i < num; i++){
			this.traleft("", tag);
		}
	}else if(val == "TOP"){
		for(var i = 0; i < num; i++){
			this.tratop("", tag);
		}
	}else if(val == "RIG"){
		for(var i = 0; i < num; i++){
			this.traright("", tag);
		}
	}else if(val == "BOT"){
		for(var i = 0; i < num; i++){
			this.trabottom("", tag);
		}
	}
}
Square.prototype.movAction = function(val, num, tag){
	var val = val.trim().toUpperCase();
	if(val == "LEF"){
		for(var i = 0; i < num; i++){
			this.rotate("lef", tag);
			this.traleft("", tag);
		}
	}else if(val == "TOP"){
		for(var i = 0; i < num; i++){
			this.rotate("top", tag);
			this.tratop("", tag);
		}
	}else if(val == "RIG"){
		for(var i = 0; i < num; i++){
			this.rotate("rig", tag);
			this.traright("", tag);
		}
	}else if(val == "BOT"){
		for(var i = 0; i < num; i++){
			this.rotate("bot", tag);
			this.trabottom("", tag);
		}
	}
}
Square.prototype.build = function(tag){
	if(this.dir == -1){
		this.traleft("build", tag);
	}else if(this.dir == 0){
		this.tratop("build", tag);
	}else if(this.dir == 1){
		this.traright("build", tag);
	}else if(this.dir == 2){
		this.trabottom("build", tag);
	}
}
Square.prototype.bru = function(color){
	mark = true;
	var top = this.x;
	var left = this.y;
	if(this.dir == -1){
		var x = top/SQUARE_SIZE, y = (left-SQUARE_SIZE)/SQUARE_SIZE;
		if(map[x][y] === 1){
			var id = x + "_" + y;
			$(id).style.backgroundColor = color;
		}else{
			console.log("no wall ahead, can't bru");
		}
	}else if(this.dir == 0){
		var x = (top-SQUARE_SIZE)/SQUARE_SIZE, y = left/SQUARE_SIZE;
		if(map[x][y] === 1){
			var id = x + "_" + y;
			$(id).style.backgroundColor = color;
		}else{
			console.log("no wall ahead, can't bru");
		}
	}else if(this.dir == 1){
		var x = top/SQUARE_SIZE, y = (left+SQUARE_SIZE)/SQUARE_SIZE;
		if(map[x][y] === 1){
			var id = x + "_" + y;
			$(id).style.backgroundColor = color;
		}else{
			console.log("no wall ahead, can't bru");
		}
	}else if(this.dir == 2){
		var x = (top+SQUARE_SIZE)/SQUARE_SIZE, y = left/SQUARE_SIZE;
		if(map[x][y] === 1){
			var id = x + "_" + y;
			$(id).style.backgroundColor = color;
		}else{
			console.log("no wall ahead, can't bru");
		}
	}
}