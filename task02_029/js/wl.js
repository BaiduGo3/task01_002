var	nameinput = document.getElementById('name'),
	test = document.getElementById('test'),
	message = document.getElementById('message'),
	chineseReg = /[\u4e00-\ufa29]/g,
	lenReg = /^.{4,16}$/;  //.查找单个字符，除了换行和行结束符

var msgs = {
	right_msg:{
		"msg":"格式正确",
		"spanClass":"rightSpan",
		"inputClass":"rightInput"
	},
	error_msg:{
		"msg":"请输入长度为4~16位字符",
		"spanClass":"errorSpan",
		"inputClass":"errorInput"
	},
	blank_msg:{
		"msg":"姓名不能为空",
		"spanClass":"errorSpan",
		"inputClass":"errorInput"
	}
}

function render(condition){
	message.innerHTML = condition.msg;
	message.className = condition.spanClass;
	nameinput.className = condition.inputClass;
}

function testFun(){
	var val = nameinput.value,
		condition;
	val = val.replace(chineseReg,"--");  //用两个英文符号代替一个中文字符
	if(val.length == 0){
		condition = msgs.blank_msg;
	}else if(!lenReg.test(val)){
		condition = msgs.error_msg;
	}else{
		condition = msgs.right_msg;
	}
	render(condition);
}

test.onclick = testFun;

