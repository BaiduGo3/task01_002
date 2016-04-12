var nameinput = $('name'),
	pwinput = $('password'),
	pwcheck = $('pwcheck'),
	email = $('email'),
	tel = $('tel'),
	submit = $('submit'),
	chineseReg = /[\u4e00-\ufa29]/g, 
	str,password;

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
function focusFun(event,str){
	event = event || window.event;
	var target = event.target || event.srcElement;
	target.nextSibling.nextSibling.innerHTML = str;
	target.nextSibling.nextSibling.className = "normal";
}

//输入框失去焦点，进行检验
function blurFun(taginput,reg){
	var msgSpan = taginput.nextSibling.nextSibling;
		content = taginput.previousSibling.previousSibling.innerHTML,
		val = taginput.value.replace(chineseReg,"--");
	password = "";
	if(val.length == 0){
		msgSpan.innerHTML = content + "不能为空";
		msgSpan.className = "errorSpan";
		taginput.className = "errorInput";
	}else if(!reg.test(val)){
		msgSpan.innerHTML = content + "输入不正确";
		msgSpan.className = "errorSpan";
		taginput.className = "errorInput";
	}else{
		msgSpan.innerHTML = "输入正确";
		msgSpan.className = "rightSpan";
		taginput.className = "rightInput";
		console.log(taginput.id);
		if(taginput.id == "password"){
			password = val;
		}
	}
}

//确认密码输入框失去焦点，进行检验
function pwcheckBlurFun(taginput){
	var msgSpan = taginput.nextSibling.nextSibling,
		val = pwcheck.value.replace(chineseReg,"--");
	if(val.length == 0){
		msgSpan.innerHTML = "确认密码不能为空";
		msgSpan.className = "errorSpan";
		pwcheck.className = "errorInput";
	}else if(val === password){
		msgSpan.innerHTML = "密码一致，输入正确";
		msgSpan.className = "rightSpan";
		pwcheck.className = "rightInput";
	}else{
		msgSpan.innerHTML = "密码不一致";
		msgSpan.className = "errorSpan";
		pwcheck.className = "errorInput";
	}
}

//提交
function submitFun(){
	var inputs = document.getElementsByTagName('input');
	var content,msgSpan;
	for(var i=0;i<inputs.length;i++){
		msgSpan = inputs[i].nextSibling.nextSibling;
		if(msgSpan.className!="rightSpan"){
			content = inputs[i].previousSibling.previousSibling.innerHTML;
			msgSpan.innerHTML = content+"不能为空";
			msgSpan.className = "errorSpan";
			inputs[i].className = "errorInput";
		}
	}
}

function init(){
	//姓名事件绑定
	addEvent(nameinput,"focus",function(event){
		str = "必填，长度为4~16个字符";
		focusFun(event,str);
	});
	addEvent(nameinput,"blur",function(){
		reg = /^.{4,16}$/;
		blurFun(nameinput,reg);
	});

	//密码事件绑定
	addEvent(pwinput,"focus",function(event){
		str = "必填，长度为8~16个字符";
		focusFun(event,str);
	});
	addEvent(pwinput,"blur",function(){
		reg = /^.{8,16}$/;
		blurFun(pwinput,reg);
	});

	//确认密码事件绑定
	addEvent(pwcheck,"focus",function(event){
		str = "必填，请再次输入密码";
		focusFun(event,str);
	});
	addEvent(pwcheck,"blur",function(){
		pwcheckBlurFun(pwcheck);
	});

	//邮箱事件绑定
	addEvent(email,"focus",function(event){
		str = "必填，请输入邮箱地址";
		focusFun(event,str);
	});
	addEvent(email,"blur",function(){
		reg = /^[A-Za-zd]+@[A-Za-zd]+\.[A-Za-zd]{2,5}$/;
		blurFun(email,reg);
	});

	//手机事件绑定
	addEvent(tel,"focus",function(event){
		str = "必填，请输入手机号码";
		focusFun(event,str);
	});
	addEvent(tel,"blur",function(){
		reg = /^1[3|4|5|8][0-9]\d{8}/;
		blurFun(tel,reg);
	});
	//提交按钮事件绑定
	addEvent(submit,"click",submitFun);
}

init();


