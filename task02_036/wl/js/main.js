var table = document.getElementById("chessboard");
var action = document.getElementById("action");
var rowNums = document.getElementById("rowNums");
var refreshbtn = document.getElementById("refresh");
var textarea = document.getElementsByTagName("textarea")[0];
var createWallBtn = document.getElementById("createWall");
var wallArr;

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
		}, 1000);	
	});
	addEvent(textarea,"keyup",function(){
		chessBoardObj.renderRowNums();
	});
	addEvent(textarea,"scroll",function(){
		rowNums.scrollTop = textarea.scrollTop;
	});
	addEvent(refreshbtn,"click",function(){
		chessBoardObj.init();
		chessBoardObj.clearWall();
		i = 0;
		textarea.value = "MOV RIG 4\nTRA BOT 3\nMOV LEF\nGO 6\nbuild\nbru red\nMOV top 3\nTRA rig 4\nbru #ff0000\n MOV bot 2\nGO 3\nmov to 3,4";
	});
	addEvent(createWallBtn,"click",function(){
		chessBoardObj.randomCreateWall();
	})
}

init();
