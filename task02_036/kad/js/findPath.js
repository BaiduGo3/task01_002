/**
* @constructor
* @params x:方块到达位置的x坐标
* @params y:方块到达位置的y坐标
* @params dir:方块的方向，顺时针 top|0 right|1 bottom|2 left|3
*/
var PosObj = function(x, y, dir){
	this.x = x;
	this.y = y;
	this.dir = dir;
}
/**
 * BFS实现寻路算法
 * @returns {array}
 */
function findPath(square, startx, starty, endx, endy){
	mark = true;
	var dirx = [-1, 0, 1, 0],
		diry = [0, 1, 0, -1];
	var queue = [];//队列实现bfs
	var pre = [];//记录节点的前驱节点
	var flag = [];//标记节点是否访问过

	for(var i = 0; i <= TABLE_SIZE; i++){
		flag[i] = [];
		pre[i] = [];
		for(var j = 0; j <= TABLE_SIZE; j++){
			flag[i][j] = 0;
			pre[i][j] = new PosObj(-1, -1, -10);
		}
	}
	//起点
	var posObj = new PosObj(startx, starty, -10);
	queue.push(posObj);
	flag[posObj.x][posObj.y] = 1;

	var ans = 0;//标记是否到达终点(endx,endy)
	while(queue.length > 0)
	{
		var now = queue.shift();
		if(now.x == endx && now.y == endy){
			ans = 1;
			break;
		}
		for(var k = 0; k < 4; k++){
			var nx = now.x + dirx[k], ny = now.y + diry[k];
			if(border(nx, ny) && !flag[nx][ny] && !map[nx][ny]){
				flag[nx][ny] = 1;
				queue.push(new PosObj(nx, ny, k));
				pre[nx][ny] = new PosObj(now.x, now.y, k);
			}
		}
	}
	var order = [];
	if(ans == 1){
		var tempx = endx, tempy = endy;
		var path = [];
		while(tempx != -1 && tempy != -1){
			path.push(new PosObj(tempx,tempy, pre[tempx][tempy].dir) );
			var nx = tempx, ny = tempy;
			tempx = pre[nx][ny].x;
			tempy = pre[nx][ny].y;
		}
		path.reverse();
		for(var i = 0; i < path.length; i++){
			if(path[i].dir == 0){
				square.dir = 0;
				order.push("MOV TOP");
			}else if(path[i].dir == 1){
				square.dir = 1;
				order.push("MOV RIG");
			}else if(path[i].dir == 2){
				square.dir = 2;
				order.push("MOV BOT");
			}else if(path[i].dir == 3){
				square.dir = -1;
				order.push("MOV LEF");
			}
		}
	}else{
		mark = false;
		console.log("can't reach the end position");
	}
	
	return order;
}