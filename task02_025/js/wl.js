var directory = $('directory'),
	delbtn = $('delete'),
	addinput = $('addinput'), 
	addbtn = $('add'),
	searchinput = $('searchinput'),
	searchbtn = $('search'),
	lis = document.getElementsByTagName('li'),
	spans = document.getElementsByTagName('span'),
	body = document.body,
	selected = false;

function $(id){
	return document.getElementById(id);
}

//事件绑定，浏览器兼容
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

//事件代理
function clickEvent(ele,type,tag,handler){
	addEvent(ele,type,function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		if(target&&target.tagName===tag.toUpperCase()){
			handler.call(null,target);
			stopPro(event);
		}
	});
}

//阻止事件冒泡
function stopPro(event){
	event = event || window.event;
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
}

//点击收起展开函数
function clickLiFun(tag){
	var ul,i1,i2,span;
	if(tag.nodeName == "I" && tag.parentNode.nodeName == "LI" || tag.nodeName == "SPAN"){
		tag = tag.parentNode;
	}
	else if(tag.nodeName == "I" && tag.parentNode.nodeName == "SPAN"){
		tag = tag.parentNode.parentNode;
	}
	ul = tag.getElementsByTagName('ul')[0];
	span = tag.getElementsByTagName('span')[0];
	i1 = tag.getElementsByTagName('i')[0];
	i2 = tag.getElementsByTagName('i')[1];
	if(ul){
		if(ul.style.display == ""){
			ul.style.display = "none";
			span.style.background = "#fff";
			span.style.border = "none";
			i1.innerHTML = "&#xe620";
			i2.innerHTML = "&#xe6a7";
			clearSpanColor();
		}else if(ul.style.display == "none"){
			ul.style.display = "block";
			i1.innerHTML = "&#xe63c";
			i2.innerHTML = "&#xe632";
		}else if(ul.style.display == "block"){
			ul.style.display = "none";
			i1.innerHTML = "&#xe620";
			i2.innerHTML = "&#xe6a7";
			clearSpanColor();
		}
	}
}

//清除所有span背景颜色
function clearSpanColor(){
	for(var i=0;i<spans.length;i++){
		spans[i].style.background = "#fff";
		spans[i].style.border = "none";
		spans[i].style.color = "#000";
	}
}

//选中某个节点
function chooseLiFun(tag){
	clearSpanColor();
	tag.style.background = "linear-gradient(#cceeff,#77ddff)";
	tag.style.border = "1px solid #dcdcdc";
	selected = tag;
}

//删除节点
function deleteLiFun(){
	var parent = selected.parentNode.parentNode;
	parent.removeChild(selected.parentNode);
	selected = false;
}

//增加节点
function addLiFun(){
	var content = addinput.value.trim();
	if(!selected){
		alert("请先选中一个节点！");
	}else if(!content){
		alert("请输入要添加节点的内容");
	}else{
		ul = selected.parentNode.getElementsByTagName('ul')[0];
		console.log(ul);
		if(ul == undefined){
			ul = document.createElement('ul');
			selected.parentNode.appendChild(ul);
			i1 = document.createElement('i');
			i1.setAttribute('class','iconfont');
			i1.innerHTML = "&#xe63c;";
			i2 = document.createElement('i');
			i2.setAttribute('class','iconfont');
			i2.innerHTML = "&#xe632;";
			selected.insertBefore(i2,selected.firstChild);
			selected.parentNode.insertBefore(i1,selected);
		}
		ul.innerHTML = ul.innerHTML + "<li><span>" + content + "</span></li>";
		selected.style.background = "#fff";
		selected.style.border = "none";
		selected = false;
	}
}

//查询
function searchFun(){
	var content = searchinput.value.trim();
	var count = 0;
	clearSpanColor();
	for(var i=0;i<spans.length;i++){
		if(spans[i].lastChild.nodeValue == content){
			spans[i].style.color = "red";
			if(spans[i].getElementsByTagName('i')[0]){
				spans[i].getElementsByTagName('i')[0].style.color = "#000";
			}
			if(spans[i].parentNode.parentNode.style.display == "none"){
				spans[i].parentNode.parentNode.style.display = "block";
			}
			count++;
		}
	}
	alert("共找到" + count + "个同名文件");
}

//初始化
function init(){
	clickEvent(directory,"dblclick","span",clickLiFun);
	clickEvent(directory,"click","span",chooseLiFun);
	clickEvent(directory,"click","i",clickLiFun);
	addEvent(document,"click",function(){
		if(selected){
			selected.style.background = "linear-gradient(#dddddd,#fff)";
			selected = false;
		}
	});
	addEvent(delbtn,"click",function(event){
		if(selected){
			deleteLiFun();
			stopPro(event);
		}else{
			alert("请选中一个要删除的节点");
		}
	});
	addEvent(addbtn,"click",addLiFun);
	addEvent(addinput,"click",function(event){
		stopPro(event);
	});
	addEvent(searchbtn,"click",function(){
		if(false){
			alert("正在查询中，请稍后再试！");
		}else{
			if(!searchinput.value){
				alert("请输入要查询的内容！");
				return;
			}else{
				searchFun();
			}
		}
	});
}

init();