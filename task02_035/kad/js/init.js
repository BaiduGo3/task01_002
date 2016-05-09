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
		var i = 0, len = order.length;
		var timer = setInterval(function(){
			if(i == order.length){
				clearInterval(timer);
				return;
			}
			mark = false;
			clearColor(ol);
			render(ol, i, "scan");
			var one_order = order[i].trim().split(" ");
			if(one_order[0].toUpperCase() == "GO"){
				var num = one_order[1];
				if(num === undefined){
					square.go(1);
				}else if(verify(num) === true){
					square.go(num);
				}
			}else if(one_order[0].toUpperCase() == "MOV" && one_order[1]){
				var num = one_order[2];
				if(num === undefined){
					square.movAction(one_order[1], 1);
				}else if(verify(num) === true){
					square.movAction(one_order[1], num);
				}
			}else if(one_order[0].toUpperCase() == "TRA" && one_order[1]){
				var num = one_order[2];
				if(num === undefined){
					square.traAction(one_order[1], 1);
				}else if(verify(num) === true){
					square.traAction(one_order[1], num);
				}
			}
			if(mark === false){
				//console.log("error", i);
				render(ol, i, "error");
				clearInterval(timer);
				return;
			}
			i++;
		}, 400);
	});

	var reset = $("reset");
	addEvent(reset, "click", function(){
		square.init();
	})
}
init();