var table = document.getElementById("chessboard");
var action = document.getElementById("action");
var rowNums = document.getElementById("rowNums");
var refreshbtn = document.getElementById("refresh");
var textarea = document.getElementsByTagName("textarea")[0];

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
	console.log(len);
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
		if(ins[0] == "GO"){
			this.instructs[i] = ins[1] == undefined ? [ins[0],1] : [ins[0],ins[1]]
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
			this.direction = (this.direction + 1) % 4;
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
			this.direction = (this.direction + 2) % 4;
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
			this.direction = (this.direction + 3) % 4;
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
		default:
			row.style.background = "red";
			return false;
	}
	row.style.background = "#7700bb";
	if(this.moveDirection == 0)
		this.goUp(ins[1],move,rotate);
	else if(this.moveDirection == 1)
		this.goRight(ins[1],move,rotate);
	else if(this.moveDirection == 2)
		this.goDown(ins[1],move,rotate);
	else
		this.goLeft(ins[1],move,rotate);
}

chessBoard.prototype.goUp = function(num,move,rotate){
	if(move)
		while(this.chessTop > 40 && num > 0){
			this.chessTop -= 40;
			num--;
		}
	if(rotate)
		this.chess.style.transform = "rotate(0deg)"
	this.updateChess();
}

chessBoard.prototype.goDown = function(num,move,rotate){
	if(move)
		while(this.chessTop < this.row * 40 && num > 0){
			this.chessTop += 40;
			num--;
		}
	if(rotate)
		this.chess.style.transform = "rotate(-180deg)";
	this.updateChess();
}

chessBoard.prototype.goLeft = function(num,move,rotate){
	if(move)
		while(this.chessLeft >40 && num > 0){
			this.chessLeft -= 40;
			num--;
		}
	if(rotate)
		this.chess.style.transform = "rotate(-90deg)";
	this.updateChess();
}

chessBoard.prototype.goRight = function(num,move,rotate){
	if(move)
		while(this.chessLeft < this.col * 40 && num > 0){
			this.chessLeft += 40;
			num--;
		}
	if(rotate)
		this.chess.style.transform = "rotate(90deg)";
	this.updateChess();
}

var i = 0;

function init(){
	var chessBoardObj = new chessBoard(table,10,10);
	chessBoardObj.init();
	addEvent(execute,"click",function(){
		var success = true;
		var timer = setInterval(function(){
			var len = chessBoardObj.instructs.length;
			if(i == len){
				clearInterval(timer);
				i = 0;
				return;
			}else if(success == false){
				clearInterval(timer);
				return;
			}
			else{
				success = chessBoardObj.executeFun(chessBoardObj.instructs[i],i);
				i++;
			}
		}, 400);	
	});
	addEvent(textarea,"keyup",function(){
		chessBoardObj.renderRowNums();
	});
	addEvent(textarea,"scroll",function(){
		rowNums.scrollTop = textarea.scrollTop;
	});
	addEvent(refreshbtn,"click",function(){
		chessBoardObj.init();
		i = 0;
	});
}

init();
