var container = $("container"),
	create = $("create"),
	inputBox = $("inputBox"),
	chineseReg = /[\u4e00-\ufa29]/g,
	style1 = $("style1"),
	style2 = $("style2"),
	password,
	msg = {
		"名称":["名称",/^.{4,16}$/,"必填，长度为4-16个字符","格式正确","格式错误","不能为空"],
		"密码":["密码",/^.{8,16}$/,"必填，长度为8~16个字符","格式正确","格式错误","不能为空"],
		"确认密码":["确认密码",/d/,"必填，请再次输入密码","密码一致，输入正确","密码不一致","不能为空"],
		"邮箱":["邮箱",/^[A-Za-zd]+@[A-Za-zd]+\.[A-Za-zd]{2,5}$/,"必填，请输入邮箱地址","格式正确","格式错误","不能为空"],
		"手机":["手机",/^1[3|4|5|8][0-9]\d{8}/,"必填，请输入手机号码","输入正确","格式错误","不能为空"]
	};

function $(id){
	return document.getElementById(id);
}

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

//输入框获取焦点
function focusFun(event,str,style){
	event = event || window.event;
	var target = event.target || event.srcElement;
	target.nextSibling.innerHTML = str;
	if(style.id == "style2"){
		target.nextSibling.className = ".spanstyle";
	}
}

//输入框失去焦点，进行检验
function blurFun(taginput,reg,empty,fail,success){
	var msgSpan = taginput.nextSibling;
		content = taginput.previousSibling.innerHTML,
		val = taginput.value.replace(chineseReg,"--");
	if(val.length == 0){
		console.log("length=0");
		msgSpan.innerHTML = content + empty;
		msgSpan.className = "errorSpan";
		taginput.className = "errorInput";
	}else if(reg.test(val) || val === password){
		console.log("val:"+val);
		console.log("password:"+password);
		msgSpan.innerHTML = success;
		msgSpan.className = "rightSpan";
		taginput.className = "rightInput";
		if(content === "密码"){
			password = val;
		}
	}else{
		console.log("else");
		msgSpan.innerHTML = fail;
		msgSpan.className = "errorSpan";
		taginput.className = "errorInput";
	}
}

//生成表单对象
function createInputObj(msgArr){
	var inputObj = {};
	inputObj.labelName = msgArr[0];
	inputObj.reg = msgArr[1];
	inputObj.rule = msgArr[2];
	inputObj.success = msgArr[3];
	inputObj.fail = msgArr[4];
	inputObj.empty = msgArr[5];
	return inputObj;
}

function render(checkedArr,style){
	var inputObj = createInputObj(checkedArr);
	var div = document.createElement("div");
	div.className = "row";
	var label = document.createElement("label");
	label.innerHTML = inputObj.labelName;
	var input = document.createElement("input");
	if(checkedArr[0].indexOf("密码")>=0){
		input.setAttribute("type","password");
	}else{
		input.setAttribute("type","text");
	}
	var span = document.createElement("span");
	if(style.id == "style2"){
		label.className = "labelstyle";
		span.style.left = "0px";
		span.style.top = "0px";
	}
	div.appendChild(label);
	div.appendChild(input);
	div.appendChild(span);
	inputBox.appendChild(div);
	addEvent(input,"focus",function(event){
		focusFun(event,inputObj.rule,style);
	});
	addEvent(input,"blur",function(){
		blurFun(input,inputObj.reg,inputObj.empty,inputObj.fail,inputObj.success);
	});
	if(checkedArr[0]=="密码"){
		render(msg["确认密码"],style);
	}
}

//提交
function submitFun(){
	var inputs = document.getElementsByTagName('input');
	var content,msgSpan;
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].type=="text"){
			msgSpan = inputs[i].nextSibling;
			if(msgSpan.className!="rightSpan"){
				content = inputs[i].previousSibling.innerHTML;
				msgSpan.innerHTML = content+"不能为空";
				msgSpan.className = "errorSpan";
				inputs[i].className = "errorInput";
			}
		}
	}
}

//点击生成表单按钮，自动生成表单
function createInput(){
	var checkboxs = document.getElementsByTagName("input");
	var checked;
	var style,count = 0;
	inputBox.innerHTML = "";
	if(style1.checked){
		style = style1;
	}else{
		style = style2;
	}
	for(var i=0;i<checkboxs.length;i++){
		if(checkboxs[i].type=="checkbox" && checkboxs[i].checked){
			checked = checkboxs[i].nextSibling.nodeValue.trim();
			render(msg[checked],style);
			count++;
		}
	}
	if(count == 0){
		alert("请选择要生成的表单名称");
	}else{
		var submitbtn = document.createElement("button");
		inputBox.appendChild(submitbtn);
		submitbtn.className = "subbtnstyle";
		if(style.id == "style2"){
			submitbtn.style.left = "444px";
		}
		submitbtn.innerHTML = "提交";
		addEvent(submitbtn,"click",submitFun);
	}
}

//初始化
function init(){
	addEvent(create,"click",createInput);
}

init();