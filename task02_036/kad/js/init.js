var SQUARE_RECORD = {
	x: 0,
	y: 0,
	dir: -10,
	map: [],
};
var mark = false;//judge whether order is right

function init(){
	var table = new Table();
	table.init();
	var square = new Square($("square"));
	square.init();
	var ol = $("line");
	var text = $("text");
	textinit(text, ol);
	addEvent(text, "focus", function(){
		if(text.value == ""){
			addrow(ol, 1);
		}
	});
	addEvent(text, "keyup", function(event){
		textinit(text, ol);
	});
	addEvent(text, "scroll", function(){
		var top = text.scrollTop;
		ol.scrollTop = top;
	});

	var execute = $("execute");
	addEvent(execute, "click", function(){

		var order = text.value.trim().split("\n");
		// for(var i = 0, len = order.length; i < len; i++){
		// 	if(checkCmd(order))
		// }

		var i = 0, j = 0, cot = 0;
		var movToOrder = [];
		var timer = setInterval(function(){
			clearColor(ol);
			sideRender(ol, i, "scan");
			if(i == order.length){
				clearInterval(timer);
				return;
			}
			if(!checkCmd(order[i])){
				if(/^MOV\sTO\s\d+,\d+$/i.test(order[i])){
					if(j == 0){
						var one_order = order[i].trim().split(" ");
						var pos = one_order[2].split(",");
						var endx = parseInt(pos[0]), endy = parseInt(pos[1]);
						if(square.bound(endx, endy)) {
							movToOrder = square.findPath(endx, endy);
							cot = movToOrder.length;
						}
					}
					if(j == cot){
						j = 0;
						i++;
					}else{
						square.operation(movToOrder[j++]);
					}
				}else{
					square.operation(order[i]);
					i++;
				}
			}else{
				sideRender(ol, i, "error");
				clearInterval(timer);
			}
		}, 500);
	});

	
	addEvent($("reset"), "click", function(){
		square.init();
	});
	addEvent($("build"), "click", function(){
		table.wall();
	});
	document.addEventListener("keydown", function(event){
		if (event.target.tagName == 'BODY') {
    		var dir = {37: 3, 38: 0, 39: 1, 40: 2}[event.keyCode];
    		var direc = {0: "TOP", 1: "RIG", 2:"BOT", 3:"LEF"};
    		if (typeof dir != 'undefined') {
    			event.preventDefault();
    			if(dir == square.dir){
    				square.go(1);
    			}else{
    				square.rotate(direc[dir]);
    			}
    		}else if(event.keyCode == 32){
    			square.build();
    		}
    	}
	});
}
init();