var inschool = $('inschool'),
	outschool = $('outschool'),
	SHOW = $('show');

var school = {
	"北京":["北京大学","清华大学","北京外国语大学","中国人民大学"],
	"上海":["上海交通大学","上海外国语大学","复旦大学","同济大学"],
	"大连":["大连理工大学","大连海事大学","大连医科大学","东北财经大学"],
	"长春":["吉林大学","东北师范大学","长春中医药大学","吉林农业大学"]
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

//添加选项
function addOption(arr){
	var html;
	for(var item in arr){
		html += "<option value='" + arr[item] + "'>" + arr[item] +"</option>";
	}
	return html;
}

//选择在校生
function inschoolFun(){
	show.innerHTML = "<span>学校</span><select id='city'></select><select id='university'></select>";
	var citySelect = $('city'),
		universitySelect = $("university"),
		citys = Object.getOwnPropertyNames(school);
	citySelect.innerHTML = addOption(citys);
	universitySelect.innerHTML = addOption(school[citySelect.value]);
	addEvent(citySelect,"change",cityChange);
}

//城市改变时，大学下拉菜单随之改变
function cityChange(){
	var universitySelect = $("university");
	var city = $("city").value;
	var html;
	universitySelect.innerHTML = addOption(school[city]);
}

//选择非在校生
function outschoolFun(){
	show.innerHTML = "<label for='compony'><span>就业单位</span><input type='text' id='compony'></label>"
}

//初始化
function init(){
	inschoolFun();
	addEvent(inschool,"click",inschoolFun);
	addEvent(outschool,"click",outschoolFun);
}

init();