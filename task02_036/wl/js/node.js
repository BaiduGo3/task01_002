function Node(x,y,parNode){
	this.x = x;
	this.y = y;
	this.parNode = parNode;  //父节点
	this.g;   //当前节点到起点的移动耗费
	this.h;   //当前节点到终点的移动耗费，即曼哈顿距离|x1-x2|+|y1-y2|(忽略障碍物)
	this.f;   //f = g + h
}