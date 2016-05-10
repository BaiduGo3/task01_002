//ie不支持trim
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

//限定范围
function bound(top, left){
	return top > 0 && top <= 500 && left >0 && left <= 500;
}
function border(x, y){
	return x >= 1 && x <= TABLE_SIZE && y >= 1 && y <= TABLE_SIZE;
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

//执行指令
var timer;
function testa(){
	console.log(map);
}
function parseOrders(square, text){
	console.log("in", map[2][3]);


	var order = text.value.trim().split("\n");
	

	var parseOrder = {};
	SQUARE_POS.x = square.x/50;
	SQUARE_POS.y = square.y/50;

	for(var j = 0; j < order.length; j++){
		var one_order = order[j].trim().split(" ");
		if(one_order[0].toUpperCase() === "MOV" && one_order[1].toUpperCase() == "TO"){
			var pos = one_order[2].split(",");
			var x = parseInt(pos[0]), y = parseInt(pos[1]);
			if(border(x, y)){
				var movTo = findPath(square, SQUARE_POS.x, SQUARE_POS.y, x, y);
				parseOrder[j] = movTo;
			}
		}else{
			parseOrder[j] = new Array(order[j]);
			handle(square, one_order, "parse");
		}
	}

	return parseOrder;
}
function runOrders(parseOrder, square, ol){
	square.dir = SQUARE_RECORD.dir;
	map = SQUARE_RECORD.tempMap;

	var count = 0;
	for(var i in parseOrder){
			count++;
	}

	var i = 0, j = 0;
	timer = setInterval(function(){
		mark = false;
		clearColor(ol);
		render(ol, i, "scan");

		//单独处理寻路算法到达不了目标位置
		if(parseOrder[i].length == 0){
			render(ol, i, "error");
			clearInterval(timer);
			return;
		}
		
		var one_order = parseOrder[i][j].trim().split(" ");
		handle(square, one_order, "move");

		if(mark === false){
			render(ol, i, "error");
			clearInterval(timer);
			return;
		}

		j++;
		if(j == parseOrder[i].length){
			i++;
			j = 0;
		}
		if(i == count){
			clearInterval(timer);
			return;
		}
	}, 500);

}


function handle(square, one_order, tag){
	if(one_order[0].toUpperCase() == "GO"){
		var num = one_order[1];
		if(num === undefined){
			square.go(1, tag);
		}else if(verify(num) === true){
			square.go(num, tag);
		}
	}else if(one_order[0].toUpperCase() == "MOV" && one_order[1]){
		var num = one_order[2];
		if(num === undefined){
			square.movAction(one_order[1], 1, tag);
		}else if(verify(num) === true){
			square.movAction(one_order[1], num, tag);
		}
	}else if(one_order[0].toUpperCase() == "TRA" && one_order[1]){
		var num = one_order[2];
		if(num === undefined){
			square.traAction(one_order[1], 1, tag);
		}else if(verify(num) === true){
			square.traAction(one_order[1], num, tag);
		}
	}else if(one_order[0].toUpperCase() == "TUN" && one_order[1]){
		if(tag != "parse") square.rotate(one_order[1], tag);
	}else if(one_order[0].toUpperCase() == "BUILD"){
		square.build(tag);
	}else if(one_order[0].toUpperCase() == "BRU" && one_order[1]){
		if(tag != "parse") square.bru(one_order[1]);
	}
}