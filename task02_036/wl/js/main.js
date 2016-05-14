var table = $("chessboard");
var action = $("action");
var rowNums = $("rowNums");
var refreshbtn = $("refresh");
var textarea = document.getElementsByTagName("textarea")[0];
var createWallBtn = document.getElementById("createWall");
var wallArr;

function $(id){
	return document.getElementById(id);
}

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
		chessBoardObj.handleInstructs();
		//states为“movto”时执行mov to指令及由mov to解析出来的移动分解指令，为“error”时指令有误，“continue”执行其他指令
		//j记录由mov to指令解析出来的移动分解指令的索引
		//len记录由mov to指令解析出来的移动分解指令的条数
		var state = "continue",j=0,len=0; 
		var timer = setInterval(function(){
			//inslen记录总指令的长度
			var inslen = chessBoardObj.instructs.length;
			if(state == "movto"){
				if(j==0){
					i--;
					len = chessBoardObj.instructs[i].length;
					state = chessBoardObj.executeFun(chessBoardObj.instructs[i][j],i);
					j++;
				}else if(j<len){
					state = chessBoardObj.executeFun(chessBoardObj.instructs[i][j],i);
					j++;
				}else{
					j=0;
					len=0;
					i++;
					state = "continue"
				}
			}else if(i == inslen){
				clearInterval(timer);
				i = 0;
				return;
			}else if(state == "error"){
				clearInterval(timer);
				return;
			}else{
				state = chessBoardObj.executeFun(chessBoardObj.instructs[i],i);
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
		textarea.value = "MOV RIG 4\nTRA BOT 3\nMOV LEF\nGO 6\nbuild\nbru red\nmov to 5,8\nMOV top 3\nTRA rig 4\nmov top 10\nbru #ff0000\n MOV bot 2\nGO 3\nmov to 3,4";
	});
	addEvent(createWallBtn,"click",function(){
		chessBoardObj.randomCreateWall();
	})
}

init();
