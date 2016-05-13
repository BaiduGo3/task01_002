
function chessBoard(table,col,row){
	this.table = table;
	this.col = Math.floor(col);
	this.row = Math.floor(row);
	this.chess;
	this.chessTop;
	this.chessLeft;
	this.instructs;
	this.direction = 0;  //0：上  1：右  2： 下   3：左
	this.moveDirection = 0;
}

chessBoard.prototype.init = function(){
	this.chessTop = 40 * this.row / 2;
	this.chessLeft = 40 * this.col / 2;
	this.createChessBoard();
	this.createChess();
	this.renderRowNums();
	wallArr = new Array(this.row);
	for(var i=0;i<this.row;i++){
		wallArr[i] = new Array(this.col);
		for(var j=0;j<this.col;j++)
			wallArr[i][j] = 1;
	}
}

chessBoard.prototype.createChessBoard = function(){
	var html = "";
	//thead部分
	html += "<thead><tr><th></th>";    
	for(var i=1;i<=this.col;i++)
		html += "<th>" + i + "</th>";
	html += "</tr></thead><tbody>";
	//tbody部分
	for(var i=1;i<=this.row;i++){            
		html += "<tr><td>" + i + "</td>";
		for(var j=1;j<=this.col;j++){
			html += "<td></td>";
		}
		html += "</tr>";
	}
	html += "</tbody>"
	this.table.innerHTML = html;
}

chessBoard.prototype.createChess = function(){
	var chess = document.getElementById("chess");
	if(chess)
		chess.remove();
	this.chess = document.createElement("div"); 
	this.chess.className = "chess";
	this.chess.id = "chess";
	this.updateChess();
	this.table.parentNode.insertBefore(this.chess,this.table);
}

chessBoard.prototype.updateChess = function(){
	this.chess.style.top = this.chessTop + "px";
	this.chess.style.left = this.chessLeft + "px";
}

chessBoard.prototype.renderRowNums = function(){
	var len = textarea.value.split("\n").length;
	var html = "";
	for(var i=1;i<=len;i++){
		html += "<span>" + i + "</span>";
	}
	rowNums.innerHTML = html;
	this.handleInstructs();
}

chessBoard.prototype.handleInstructs = function(){
	this.instructs = textarea.value.split("\n")
	for(var i=0,len=this.instructs.length;i<len;i++){
		var ins = this.instructs[i].trim().toUpperCase().split(" ");
		if(ins[0] == "GO" || ins[0] == "BUILD" || ins[0] == "BRU"){
			this.instructs[i] = ins[1] == undefined ? [ins[0],1] : [ins[0],ins[1]]
		}else if(ins[1] && ins[1] == "TO"){
			this.instructs[i] = [ins[0] + ins[1],ins[2]];
		}else{
			this.instructs[i] = ins[2] == undefined ? [ins[0]+ins[1],1] : [ins[0] + ins[1],ins[2]]
		}
	}
}

chessBoard.prototype.clearBgColor = function(){
	var spans = document.getElementsByTagName("span");
	for(var i=0,len=spans.length;i<len;i++){
		spans[i].style.background = "#d3d3d3";
	}
}

chessBoard.prototype.executeFun = function(ins,i){
	var row = document.getElementsByTagName("span")[i];
	var rotate,move;
	this.clearBgColor();
	row.style.background = "#7700bb";
	switch(ins[0]){
		case "GO":
			move = true;
			rotate = false;
			break;
		case "TRATOP":
			this.moveDirection = 0;
			move = true;
			rotate = false;
			break;
		case "MOVTOP":
			this.direction = 0;
			this.moveDirection = 0;
			move = true;
			rotate = true;
			break;
		case "TUNRIG": 
			this.direction = (this.direction + 1) % 4;
			this.moveDirection = this.direction;
			move = false;
			rotate = true;
			break;
		case "TRARIG":
			this.moveDirection = 1;
			move = true;
			rotate = false;
			break;
		case "MOVRIG":
			this.direction = 1;
			this.moveDirection = 1;
			move = true;
			rotate = true;
			break;
		case "TUNBAK": 
			this.direction = (this.direction + 2) % 4;
			this.moveDirection = this.direction;
			move = false;
			rotate = true;
			break;
		case "TRABOT":
			this.moveDirection = 2;
			move = true;
			rotate = false;
			break;
		case "MOVBOT":
			this.direction = 2;
			this.moveDirection = 2;
			move = true;
			rotate = true;
			break;
		case "TUNLEF": 
			this.direction = (this.direction + 3) % 4;
			this.moveDirection = this.direction;
			move = false;
			rotate = true;
			break;
		case "TRALEF":
			this.moveDirection = 3;
			move = true;
			rotate = false;
			break;
		case "MOVLEF":
			this.direction = 3;
			this.moveDirection = 3;
			move = true;
			rotate = true;
			break;
		case "BUILD":
			this.createWall();
			return;
		case "BRU":
			this.brushWall(ins[1]);
			return;
		case "MOVTO":
			var pos = ins[1].split(",");
			this.movTo(this.chessLeft,this.chessTop,pos[1]*40,pos[0]*40);
			return;
		default:
			row.style.background = "red";
			return false;
	}
	if(this.moveDirection == 0)
		this.goUp(ins[1],move,rotate);
	else if(this.moveDirection == 1)
		this.goRight(ins[1],move,rotate);
	else if(this.moveDirection == 2)
		this.goDown(ins[1],move,rotate);
	else
		this.goLeft(ins[1],move,rotate);
}

chessBoard.prototype.getWallPos = function(){
	var wallX, wallY;
	if(this.direction == 0){
		wallX = this.chessLeft;
		wallY = this.chessTop - 40;
	}else if(this.direction == 1){
		wallX = this.chessLeft + 40;
		wallY = this.chessTop;
	}else if(this.direction == 2){
		wallX = this.chessLeft;
		wallY = this.chessTop + 40;
	}else{
		wallX = this.chessLeft - 40;
		wallY = this.chessTop;
	}
	return {"x":wallX,"y":wallY};
}

chessBoard.prototype.createWall = function(){
	var wall = this.getWallPos();
	if(!this.isBound(wall.x,wall.y) && !this.hasWall(wall.x,wall.y)){
		var wallDiv = document.createElement("div"); 
		wallDiv.className = "wall";
		wallDiv.style.left = wall.x + "px";
		wallDiv.style.top = wall.y + "px";
		wallArr[wall.y/40-1][wall.x/40-1] = 0;
		this.table.parentNode.insertBefore(wallDiv,this.table);
	}else if(this.isBound(wall.x,wall.y)){
		console.log("到达边界");
	}else{
		console.log("已经有墙");
	}
}

chessBoard.prototype.isBound = function(x,y){
	if(x >= 40 && x <= this.col * 40 && y >= 40 && y <= this.row * 40)
		return false;
	else
		return true;
}

chessBoard.prototype.hasWall = function(x,y){
	if(wallArr[y/40-1][x/40-1] == 0)
		return true;
	else
		return false;
}

chessBoard.prototype.clearWall = function(){
	var walls = document.getElementsByClassName("wall");
	for(var i=walls.length-1;i>=0;i--)
		walls[i].remove();
}

chessBoard.prototype.brushWall = function(color){
	var wall = this.getWallPos();
	if(this.hasWall(wall.x,wall.y)){
		var wallDiv = document.createElement("div");
		wallDiv.className = "wall";
		wallDiv.style.left = wall.x + "px";
		wallDiv.style.top = wall.y + "px";
		wallDiv.style.background = color;
		this.table.parentNode.insertBefore(wallDiv,this.table);
	}else{
		console.log("没有墙");
	}
}

chessBoard.prototype.randomCreateWall = function(){
	var wallNum = Math.floor(Math.random() * 9 + 1);
	var wallX;
	var wallY;
	for(var i=0;i<wallNum;i++){
		wallX = Math.floor(Math.random() * 10 + 1) * 40;
		wallY = Math.floor(Math.random() * 10 + 1) * 40;
		if((wallX == this.chessLeft && wallY == this.chessTop) || this.hasWall(wallX,wallY))
			continue;
		var wallDiv = document.createElement("div");
		wallDiv.className = "wall";
		wallDiv.style.left = wallX + "px";
		wallDiv.style.top = wallY + "px";
		wallArr[wallY/40-1][wallX/40-1] = 0;
		this.table.parentNode.insertBefore(wallDiv,this.table);
	}
}

chessBoard.prototype.goUp = function(num,move,rotate){
	if(move){
		while(!this.isBound(this.chessLeft,this.chessTop-40) && num > 0 && !this.hasWall(this.chessLeft,this.chessTop-40)){
			this.chessTop -= 40;
			num--;
		}
		if(this.isBound(this.chessLeft,this.chessTop-40))
			console.log("到达边界");
		else if(this.hasWall(this.chessLeft,this.chessTop-40))
			console.log("有墙");
	}
	if(rotate)
		this.chess.style.transform = "rotate(0deg)"
	this.updateChess();
}

chessBoard.prototype.goDown = function(num,move,rotate){
	if(move){
		while(!this.isBound(this.chessLeft,this.chessTop+40) && num > 0 && !this.hasWall(this.chessLeft,this.chessTop+40)){
			this.chessTop += 40;
			num--;
		}
		if(this.isBound(this.chessLeft,this.chessTop+40))
			console.log("到达边界");
		else if(this.hasWall(this.chessLeft,this.chessTop+40))
			console.log("有墙");
	}
	if(rotate)
		this.chess.style.transform = "rotate(-180deg)";
	this.updateChess();
}

chessBoard.prototype.goLeft = function(num,move,rotate){
	if(move){
		while(!this.isBound(this.chessLeft-40,this.chessTop) && num > 0 && !this.hasWall(this.chessLeft-40,this.chessTop)){
			this.chessLeft -= 40;
			num--;
		}
		if(this.isBound(this.chessLeft-40,this.chessTop))
			console.log("到达边界");
		else if(this.hasWall(this.chessLeft-40,this.chessTop))
			console.log("有墙");
	}
	if(rotate)
		this.chess.style.transform = "rotate(-90deg)";
	this.updateChess();
}

chessBoard.prototype.goRight = function(num,move,rotate){
	if(move){
		while(!this.isBound(this.chessLeft+40,this.chessTop) && num > 0 && !this.hasWall(this.chessLeft+40,this.chessTop)){
			this.chessLeft += 40;
			num--;
		}
		if(this.isBound(this.chessLeft+40,this.chessTop))
			console.log("到达边界");
		else if(this.hasWall(this.chessLeft+40,this.chessTop))
			console.log("有墙");
	}
	if(rotate)
		this.chess.style.transform = "rotate(90deg)";
	this.updateChess();
}

chessBoard.prototype.movTo = function(x1,y1,x2,y2){
	var astar = new Astar(this.row,this.col);
	var resultList = astar.searchPos(x1,y1,x2,y2);
	if(resultList == -1)
		alert("坐标有误或终点是墙");
	else if(resultList == 0)
		alert("不存在路径");
	else{
		var i = 0;
		var timer = setInterval(function(){
			var len = resultList.length;
			if(i == len){
				clearInterval(timer);
				i = 0;
				return;
			}
			this.chess.style.top = resultList[i].y + "px";
			this.chess.style.left = resultList[i].x + "px";
			i++;
		}, 500);
	}
}