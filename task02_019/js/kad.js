function $(id){
	return document.getElementById(id);
}
var text = $("text");
var leftIn = $("leftIn");
var rightIn = $("rightIn");
var leftOut = $("leftOut");
var rightOut = $("rightOut");
var randomData = $("randomData");
var quicksortData = $("quicksortData");
var mergesortData = $("mergesortData");
var wrap = $("wrap");

var data = new Array();
var high = 300;

function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}

function clear(){
	text.value="";
	text.focus();
}

function getText(){
	var num = text.value.trim();
	if(!num.match(/^[0-9]+$/)){
		alert("请输入10-100内的数字！");
		clear();
		return;
	}
	else {
		num = parseInt(num);
		if(!(num >= 10 && num <= 100)){
			alert("请输入10-100内的数字！");
			clear();
			return;
		}
		else 
			return num;

	}
}

//左侧入
function unshift(){
	var ifok = limit();
	if(ifok == 0){
		var num = getText();
		if(num){
			data.unshift(num);
			render();
		}
	}
	
}
//右侧入
function push(){
	var ifok = limit();
	if(ifok == 0){
		var num = getText();
		if(num){
			data.push(num);
			render();
		}
	}
}
//左侧出
function shift(){
	var num = data.shift();
	if(num){
		alert("当前删除元素值为：" + num);
		render();
	}
	else{
		alert("没有可删除的元素啦~");
	}
}
//右侧出
function pop(){
	var num = data.pop();
	if(num){
		alert("当前删除元素值为：" + num);
		render();
	}
	else{
		alert("没有可删除的元素啦~");
	}
}
//点击删除
function del(id){
	data.splice(id, 1);
	render();
}
//限制元素最多为60个
function limit(){
	var len = data.length;
	if(len >= 60){
		alert("已经添加到上限60个啦~");
		return 1;
	}
	else
		return 0;
}
//随机生成10-100数据
function getrandomData(){
	data = [];
	var count = 0;
	while(count < 60){
		var temp = Math.floor(Math.random()*100);
		if(temp >= 10 && temp <= 100){
			count++;
			data.push(temp);
		}
	}
	render();
}
//随机颜色
function getrandomColor(){
	var color = Math.floor(Math.random() * 0xffffff).toString(16);
	if(color.length == 6){
		return '#' + color;
	}
	else{
		return getrandomColor();
	}
}
//QuickSort
function Partition(f, l){
	var temp = data[f];
	while(f < l){
		while((f < l) && (temp < data[l])) l--;
		if(f < l) data[f++] = data[l];
		while((f < l) && (temp > data[f])) f++;
		if(f < l) data[l--] = data[f]; 
	}
	if(f == l) data[f] = temp;
	return f;
}
function QuickSort(f, l){
	if(f < l){
		var q = Partition(f, l);
		QuickSort(f, q - 1);
		QuickSort(q + 1, l);
	}
}

//MergeSort
var tempArr = new Array(65);
function Merge(s, q, e){
	var ls = s, le = q;//left substring
	var rs = q + 1, re = e;//right substring
	var k = s;//index of Array tempArr
	while((ls <= le) && (rs <= re)){
		if(data[ls] < data[rs]) tempArr[k++] = data[ls++];
		else tempArr[k++] = data[rs++];
	}
	while(ls <= le) tempArr[k++] = data[ls++];
	while(rs <= re) tempArr[k++] = data[rs++];
	for(var i = s; i <= e; i++){
		data[i] = tempArr[i];
	}
}
function MergeSort(s, e){
	if(s < e){
		var q = parseInt((s + e)/2);
		MergeSort(s, q);
		MergeSort(q + 1, e);
		Merge(s, q, e);
	}
}

function render(){
	var content = "";
	wrap.innerHTML = "";
	var count = 0;
	data.forEach(function(i){
		//content += "<li data-id = "+ count +" style='height:"+ (i/100 * high) +"px;'>" + i + "</li>";
		var li = document.createElement("li");
		li.style.height = (i/100 * high) + "px";
		li.style.background = getrandomColor();
		li.title = "No." + count;
		li.innerHTML = i;
		li.setAttribute("data-id", count);
		wrap.appendChild(li);
		count++;
	})
	// wrap.innerHTML = content;
}

function init(){
	data.push(99);
	data.push(10);
	data.push(23);
	render();
	addEvent(leftIn, 'click', unshift);
	addEvent(rightIn, 'click', push);
	addEvent(leftOut, 'click', shift);
	addEvent(rightOut, 'click', pop);
	addEvent(wrap, 'click', function(event){
		var event = event || window.event;
		var target = event.target || event.srcElement;
		if(target && target.tagName === "li".toUpperCase()){
			del(target.dataset.id);
		}
	});
	addEvent(randomData, 'click', getrandomData);
	addEvent(mergesortData, 'click', function(){
		MergeSort(0, data.length - 1);
		render();
		console.log(data);
	});
	addEvent(quicksortData, 'click', function(){
		QuickSort(0, data.length - 1);
		render();
		console.log(data);
	});
}
init();