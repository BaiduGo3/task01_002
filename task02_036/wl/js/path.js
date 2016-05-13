var COST_STRAIGHT = 10;  //垂直方向或水平方向移动的路径评分
var COST_DIAGONAL = 14;  //斜方向移动的路径评分


function Astar(row,col){
	// this.map = map;   //地图  0：有墙不可通过  1：可以通过 2：标记路径
	this.row = row;
	this.col = col;
	this.openList = [];
	this.closeList = [];
	// this.resultList = [];
}

//查找坐标，错误返回-1  没找到返回0   找到了返回路径
Astar.prototype.searchPos = function(x1,y1,x2,y2){
	if(x1<40 || x2>this.col*40 || y1<40 || y2>this.row*40)
		return -1;
	if(wallArr[y1/40-1][x1/40-1]==0 || wallArr[y2/40-1][x2/40-1]==0)
		return -1;
	var sNode = new Node(x1,y1,null);
	sNode.g = 0;
	var eNode = new Node(x2,y2,null);
	this.openList.push(sNode); //将起点压入开始列表
	var resultList = this.searchPath(sNode,eNode);
	if(resultList.length == 0)
		return 0;
	// for(var i=0,len=resultList.length;i<len;i++)
	// 	wallArr[resultList[i].y/40-1][resultList[i].x/40-1] = 2;
	return resultList;
}

Astar.prototype.searchPath = function(sNode,eNode){
	var resultList = [];
	var isFind = false;
	var node = null;
	while(this.openList.length > 0){
		//取出开启列表中最低F值，即第一个存储的值的F为最低的
		node = this.openList.shift();  
		//判断是否找到目标点
		if(node.x == eNode.x && node.y == eNode.y){
			isFind = true;
			break;
		}
		var topWall = false,rigWall = false,botWall = false,lefWall = false;
		//上
		if(node.y-40 >= 40)
			topWall = this.checkPath(node.x,node.y-40,node,eNode,COST_STRAIGHT);
		//下
		if(node.y+40 <= 40*this.row)
			botWall = this.checkPath(node.x,node.y+40,node,eNode,COST_STRAIGHT);
		//左
		if(node.x-40 >= 40)
			lefWall = this.checkPath(node.x-40,node.y,node,eNode,COST_STRAIGHT);
		//右
		if(node.x+40 <= 40*this.col)
			rigWall = this.checkPath(node.x+40,node.y,node,eNode,COST_STRAIGHT);
		//左上
		if(topWall!=-1 && lefWall!=-1)
			if(node.x-40 >= 40 && node.y-40 >= 40)
				this.checkPath(node.x-40,node.y-40,node,eNode,COST_DIAGONAL);
		//左下
		if(botWall!=-1 && lefWall!=-1)
			if(node.x-40 >= 40 && node.y+40 <= 40*this.row)
				this.checkPath(node.x-40,node.y+40,node,eNode,COST_DIAGONAL);
		//右上
		if(topWall!=-1 && rigWall!=-1)
			if(node.x+40 <= 40*this.col && node.y-40 >= 40)
				this.checkPath(node.x+40,node.y-40,node,eNode,COST_DIAGONAL);
		//右下
		if(botWall!=-1 && lefWall!=-1)
			if(node.x+40 <= 40*this.col && node.y+40 <= 40*this.row)
				this.checkPath(node.x+40,node.y+40,node,eNode,COST_DIAGONAL);
		//从开始列表中删除，添加到关闭列表中
		this.closeList.push(this.openList.shift());
		//开始列表中排序，把F值最低的放到最低端
		this.openList.sort(function(a,b){
			return a.f - b.f;
		});
	}
	if(isFind)
		this.getPath(resultList,node);
	return resultList;
}

Astar.prototype.checkPath = function(x,y,parNode,eNode,cost){
	var node = new Node(x,y,parNode);
	//查找地图中是否能通过
	if(wallArr[y/40-1][x/40-1] == 0){
		this.closeList.push(node);
		return -1;
	}
	//查找关闭列表中是否存在
	if(this.isListContains(this.closeList,x,y) != -1){
		return false;
	}

	//查找开启列表中是否存在
	var index = this.isListContains(this.openList,x,y);
	if(index != -1){
		//G值是否更小，即是否更新G,F值
		if(parNode.g+cost < this.openList[index].g){
			node.parNode = parNode;
			this.countG(node,eNode,cost);
			this.countF(node);
			this.openList[index] = node;
		}
	}else{
		//添加到开启列表中
		node.parNode = parNode;
		this.count(node,eNode,cost);
		this.openList.push(node);
	}
	return true;
}

//集合中是否包含元素（-1：没有找到，否则返回所在的索引）
Astar.prototype.isListContains = function(list,x,y){
	for(var i=0,len=list.length;i<len;i++){
		if(list[i].x == x && list[i].y == y)
			return i;
	}
	return -1;
}

//从终点往返回到起点
Astar.prototype.getPath = function(resultList,node){
	if(node.parNode != null){
		this.getPath(resultList,node.parNode);
	}
	resultList.push(node);
}

//计算G，H，F值
Astar.prototype.count = function(node,eNode,cost){
	this.countG(node,eNode,cost);
	this.countH(node,eNode);
	this.countF(node);
}

//计算G值
Astar.prototype.countG = function(node,eNode,cost){
	if(node.parNode == null)
		node.g = cost;
	else
		node.g = node.parNode.g + cost;
}

//计算H值
Astar.prototype.countH = function(node,eNode){
	node.h = (Math.abs(node.x - eNode.x)/40 + Math.abs(node.y - eNode.y)/40) * 10;
}

//计算F值
Astar.prototype.countF = function(node){
	node.f = node.g + node.h;
}