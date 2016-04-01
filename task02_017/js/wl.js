/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
function $(id){
  return document.getElementById(id);
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
  var datStr = '';
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
var title = $("title");
/**
 * 渲染图表
 */
function renderChart() {
    var html="";
    for(var item in chartData.dataList){
        html+="<div class='box "+pageState['nowGraTime']+"'>";
        html+="<div class='rectangle' style='height:"
            +chartData.dataList[item]+"px;background-color:"
            +getRandomColor()+"' title='"+item+":"
            +chartData.dataList[item]+"'></div>";
        html+="</div>";
    };
    document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML=html;
    var items = document.querySelectorAll(".rectangle");
    for(var i in items){
        addEvent(items[i], 'mouseover', function(event){
            var event = event || window.event;
            var target = event.target || event.srcElement;
            title.innerHTML = target.title;
            title.style.position = "absolute";
            title.style.left = event.clientX;
            title.style.top = event.clientY;
        })
        addEvent(items[i], 'mouseout', function(event){
            var event = event || window.event;
            var target = event.target || event.srcElement;
            title.style.display = "none";
        })
    }
}

function getRandomColor(){
    var rand = Math.floor(Math.random() * 0xffffff).toString(16);
    if (rand.length === 6) {
        return '#' + rand;
    } else {
        return getRandomColor();
    }
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */
var change = false;

function graTimeChange(radio) {
  // 确定是否选项发生了变化 
  if(radio.value == pageState["nowGraTime"]){
    change = false;
  }
  else{
    change = true;
    pageState["nowGraTime"] = radio.value;
  }
  if(change){
    // 调用图表渲染函数
    initAqiChartData();
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var city = this.value;
  if(city!==pageState["nowSelectCity"]){
    // 设置对应数据
    pageState["nowSelectCity"] = city;
    // 调用图表渲染函数
    initAqiChartData();
    renderChart();
  }
}

function addEvent(ele,event,fn){
  if(ele.addEventListener){
    ele.addEventListener(event,fn,false);
  }
  else if(ele.attachEvent){
    ele.attachEvent("on"+event,fn);
  }
  else{
    ele["on"+event] = fn;
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radios = document.getElementsByName("gra-time");
  for(var i=0;i<radios.length;i++){
    (function(a){
      addEvent(radios[a],"click",function(){
        graTimeChange(radios[a]);
      })
    })(i)
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city_select = $("city-select");
  // 使用for in遍历
  city_select.innerHTML = "";
  for(var key in aqiSourceData){
    var option = document.createElement("option");
    option.value = key;
    option.innerHTML = key;
    city_select.appendChild(option);
  }
  pageState.nowSelectCity = city_select.value;
  //使用Object.keys()获取对象自身可枚举的属性键。
  //var cityArr = Object.keys(aqiSourceData)
  //使用getOwnPropertyNames()方法获取对象自身的全部属性名。
  //var cityArr = Object.getOwnPropertyNames(aqiSourceData);
  //使用map()方法
  //var html = cityArr.map(function(item){
    //return "<option value='"+item+"'>"+item+"</option>";
  //});
  //city_select.innerHTML = html;
  //pageState.nowSelectCity = cityArr[0];
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEvent(city_select,"change",citySelectChange);
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var time = pageState["nowGraTime"];
  var city = pageState["nowSelectCity"];
  var tempData = aqiSourceData[city];
  var tempArr = Object.getOwnPropertyNames(tempData);
  var dataList={};
  switch(time){
    case "day":
      dataList = tempData;
      break;
    case "week":
      var week="", day = 0, weekday = 5, flag = false,
          sum = 0, aver = 0, month = tempArr[0].slice(5,7), weekNum = 0;
      for(var i=0;i<tempArr.length;i++){
        if(month == tempArr[i].slice(5,7)){
          flag = false;
        }else{
          flag = true;
          month = tempArr[i].slice(5,7);
        }
        if(weekday%7==0||i==tempArr.length-1||flag){
          if(flag&&(weekday-1)%7!=0){
            weekNum++;
            aver = Math.floor(sum/day);
            week = tempArr[i-1].slice(5,7) + "月第"+weekNum+"周";
            dataList[week] = aver;
            weekday++;
            sum = tempData[tempArr[i]];
            weekNum = 0;
            day = 1;
          }else if(flag&&(weekday-1)%7==0){
            sum = tempData[tempArr[i]];
            weekday++;
            weekNum = 0;
            day = 1;
          }else{
            weekday++,day++;
            aver = Math.floor(sum/day);
            weekNum++;
            week = month + "月第"+weekNum+"周";
            dataList[week] = aver;
            day = 0,sum = 0,aver = 0;
          }
        }else{
          sum += tempData[tempArr[i]];
          weekday++;
          day++;
        }
      }
      break;
    case "month":
      var sum = 0, aver = 0, month = "", m = 0; monthArr = ['31','28','31'];
      for(var i=0;i<tempArr.length;i++){
        sum += tempData[tempArr[i]];
        if(tempArr[i].slice(-2)==monthArr[m]){
          aver = Math.floor(sum/monthArr[m]);
          month = tempArr[i].slice(5,7)+"月";
          dataList[month] = aver;
          m++;
          sum = 0;
        }
      }
      break;
  }
  // 处理好的数据存到 chartData 中
  chartData.dataList = dataList;
  chartData.city = city;
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();