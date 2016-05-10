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
		//处理指令前先保存小方块状态
		SQUARE_RECORD.x = square.x;
		SQUARE_RECORD.y = square.y;
		SQUARE_RECORD.dir = square.dir;
		SQUARE_RECORD.tempMap = [];//不能直接赋值，传递的是引用！
		for(var i = 0; i < map.length; i++){
			SQUARE_RECORD.tempMap[i] = map[i].slice(0);
		}

		var parseOrder = parseOrders(square, text);
		runOrders(parseOrder, square, ol);
	});

	
	addEvent($("reset"), "click", function(){
		square.init();
	});
	addEvent($("build"), "click", function(){
		table.wall();
	});

}
init();