function $(id){
  return document.getElementById(id);
}
var time = $("form-gra-time");
var radio = document.getElementsByName("gra-time");
var city = $("city-select");
var text = $("text");
var wrap = $("aqi-chart-wrap");


//Browser Support
function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}
function removeEvent(element, eventName, listener){
  if(element.removeEventListener){
    element.removeEventListener(eventName, listener, false);
  }else if(element.detachEvent){
    element.detachEvent("on" + eventName, listener);
  }
}


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

function getTime(){
  switch(pageState.nowGraTime){
    case "day":
      return "每日";
    case "week":
      return "周平均";
    case "month":
      return "月平均";
  }
}

//随机颜色
function randomColor() {
  var rand = Math.floor(Math.random() * 0xffffff).toString(16);
  if (rand.length === 6) {
      return '#' + rand;
  } else {
      return randomColor();
  }
}

/**对父级元素添加mouse事件监听有问题
function hoverDetail(){
  wrap.childNodes[0].style.visibility = 'visible';
  try{
    var title= event.target.childNodes[0];
    title.style.visibility='visible';
  }catch(e){

  }
  
}
function hideDetail(){
  wrap.childNodes[0].style.visibility = 'visible';
  try{
    var title= event.target.childNodes[0];
    title.style.visibility='hidden';
  }catch(e){

  }
}
**/

function getEventTarget(e){
  e = e || window.event;
  return e.target || e.srcElement;
}

 //渲染图表
function renderChart() {
  var content = "";
  //console.log(chartData);
  for(var i in chartData){
    content += "<div class='item "+ pageState.nowGraTime +"' style='height:"+chartData[i]
    +"px;background-color:"+randomColor()+"' >";
    content += "<span class='title'>Date: "+ i +"<br/>AQI: " + chartData[i] +"</span>";
    content += "</div>";
  }
  wrap.innerHTML = content;
  var textTitle = city.value + "市" + getTime() + "空气质量数据";
  text.innerHTML = textTitle;
  var items = document.querySelectorAll(".item");
  //console.log(items);
  for(var i in items){
    addEvent(items[i], 'mouseover', function(event){
      var target = getEventTarget(event);
      var title= target.childNodes[0];
      title.style.visibility='visible';
    })
    addEvent(items[i], 'mouseout', function(event){
      var target = getEventTarget(event);
      var title= target.childNodes[0];
      title.style.visibility='hidden';
    })
  }
}


//日、周、月的radio事件点击时的处理函数
function graTimeChange() {
  var current;
  for(var i = 0; i < radio.length; i++){
    if(radio[i].checked){
      current = radio[i].value;
    }
  }
  pageState.nowGraTime = current;
  initAqiChartData();
}

//select发生变化时的处理函数
function citySelectChange() {
  var current = city.value;
  if(current != pageState.nowSelectCity){
    pageState.nowSelectCity = current;
    initAqiChartData();
  }
}


//初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
function initGraTimeForm() {
  addEvent(time, 'click', graTimeChange);
  //addEvent(document, 'mouseover', hoverDetail);
  //addEvent(document, 'mouseout', hideDetail);
}

//初始化城市Select下拉选择框中的选项
function initCitySelector() {
  var content = "";
  for(var i in aqiSourceData){
    content += "<option>" + i + "</option>";
  }
  city.innerHTML = content;
  addEvent(city, 'change', citySelectChange);
}

//初始化图表需要的数据格式
function initAqiChartData() {
  chartData = {};
  switch (pageState.nowGraTime){
    case "day":
        chartData = aqiSourceData[city.value];
        break;
    case "week"://sunday:0,mon~sat:1~6
        var count = 0, total = 0;//record days within a week and one week's total AQI
        var week = 1, date, weekDay, weekMonth = 0;
        for(var i in aqiSourceData[city.value]){
          date = new Date(i);
          weekDay = date.getDay();
          var m = date.getMonth() + 1;
          if(weekDay == 0) weekDay = 7;
          if(weekMonth == date.getMonth()){
            total += aqiSourceData[city.value][i];
            count++;
            if(weekDay == 7){
              chartData[m + "月第" + week + "周"] = parseInt(total/count);
              count = 0;
              total = 0;
              week++;
            }
          }
          else {
            if(count != 0){
              chartData[date.getMonth() + "月第" + week + "周"] = parseInt(total/count);
            }
            weekMonth = date.getMonth();
            total = 0;
            count = 0;
            week = 0;
            total += aqiSourceData[city.value][i];
            count++;
            week++;
          }
        }
        chartData[m + "月第" + week + "周"] = parseInt(total/count);
        break;
    case "month"://Jan~Dec:0~11
        var count = 0, total = 0, month = 0, date;
        for(var i in aqiSourceData[city.value]){
          date = new Date(i);
          if(date.getMonth() != month){
            month = date.getMonth();
            chartData[month + "月"] = parseInt(total/count);
            count = 0;
            total = 0;
          }
          total += aqiSourceData[city.value][i];
          count++;
        }
        month++;
        chartData[month + "月"] = parseInt(total/count);
        break;
  }
  renderChart();
}

//初始化函数
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();