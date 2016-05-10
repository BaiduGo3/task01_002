/**
 * ie不支持trim
 */
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
/**
 * 限定范围
 */
function bound(top, left){
	return top > 0 && top <= 500 && left >0 && left <= 500;
}
function border(x, y){
	return x >= 1 && x <= TABLE_SIZE && y >= 1 && y <= TABLE_SIZE;
}
/**
 * 验证数字
 */
function verify(val){
	return /^[0-9]+$/.test(val);
}
/**
 * textarea新输入一行
 */
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
/**
 * 处理代码左侧行的显示，有扫描和错误两种标记
 */
function render(ol, liId, str){
	for(var i = 0, len = ol.childNodes.length; i < len; i++){
		if(ol.childNodes[i].innerHTML == (liId+1)){
			if(str == "error") ol.childNodes[i].className += " error";
			else if(str == "scan") ol.childNodes[i].className += " scan";
		}
	}
}
/**
 * 代码左侧行显示清除颜色
 */
function clearColor(ol){
	for(var i = 0, len = ol.childNodes.length; i < len; i++){
		if(ol.childNodes[i].className.match(/scan/)){
			ol.childNodes[i].className = ol.childNodes[i].className.replace(/scan/i, "");
		}
	}
}
/**
 * textarea初始化，无指令代码时显示一行
 */
function textinit(text, ol){
	var order = text.value;
	order.match(/\n/g) ? addrow(ol, order.match(/\n/g).length+1) : addrow(ol, 1);
}

/**
 * 解析指令，主要解析mov to指令
 */
function parseOrders(square, text){
	var order = text.value.trim().split("\n");
	var parseOrder = {};
	for(var j = 0; j < order.length; j++){
		var one_order = order[j].trim().split(" ");
		if(one_order[0].toUpperCase() === "MOV" && one_order[1].toUpperCase() == "TO"){
			var pos = one_order[2].split(",");
			var x = parseInt(pos[0]), y = parseInt(pos[1]);
			if(border(x, y)){
				var movTo = findPath(square, square.x/50, square.y/50, x, y);
				parseOrder[j] = movTo;
			}
		}else{
			parseOrder[j] = new Array(order[j]);
			handle(square, one_order, "parse");
		}
	}
	return parseOrder;
}
/**
 * 运行指令
 * @params parseOrder 解析好的指令
 */
function runOrders(parseOrder, square, ol){
	square.x = SQUARE_RECORD.x;
	square.y = SQUARE_RECORD.y;
	square.dir = SQUARE_RECORD.dir;
	map = SQUARE_RECORD.tempMap;

	var count = 0;
	for(var i in parseOrder){
			count++;
	}

	var i = 0, j = 0;
	var timer = setInterval(function(){
		mark = false;
		clearColor(ol);
		render(ol, i, "scan");

		//单独处理寻路算法到达不了目标位置
		if(parseOrder[i].length == 0){
			console.log("can't reach can't reach the end position");
			render(ol, i, "error");
			clearInterval(timer);
			return;
		}
		
		var one_order = parseOrder[i][j].trim().split(" ");
		handle(square, one_order, "run");

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
/**
 * 处理一行指令
 * @params one_order 一行指令
 * @params tag 表示解析"parse"调用还是运行"run"调用
 */
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
		square.rotate(one_order[1], tag);
	}else if(one_order[0].toUpperCase() == "BUILD"){
		square.build(tag);
	}else if(one_order[0].toUpperCase() == "BRU" && one_order[1]){
		if(tag != "parse") square.bru(one_order[1]);
	}
}