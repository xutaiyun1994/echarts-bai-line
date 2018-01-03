/**
 * 功能：表格柱状图和饼状图
 * 日期：2017/11/14
 **/
$(function () {
    //动态加载数据
    tableLoading();
    tbodyBlur()

});

/*动态加载数据*/
function tableLoading() {
    //定义求和容器
    var num = [];
    //添加日期
    var obj = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
    obj.forEach(function(item){
        $("tbody").append('<tr><td>' + item + '</td></tr>')
    });
 //添加表格内容
    $.getJSON("javascripts/data.json",function (res) {
    //添加thead
        for(var x in res){
            $("thead tr").append('<th>' + res[x].name + '</th>');
            //添加tbody
            (res[x].value).forEach(function (arr,idx) {
                $("tbody tr").eq(idx).append('<td contenteditable = "true">' + arr + '</td>')
        });
            //求和
           var str = (res[x].value).reduce(function (a,b) {
               return a + b;
           });
            num.push(str);
       }
    //添加tfoot的求和数据
        num.forEach(function (tft) {
            $("tfoot tr").append('<td>' + tft + '</td>')
        });
        //柱状图函数
        data();
        //饼状图函数
        databar()
    })

}

/*数据动态求和加载*/
function tbodyBlur() {
    $("tbody tr").on("focus","td",function(){
        $(this).addClass("checked")
    });
    $("tbody tr").on("blur","td",function(){
        $(this).removeClass("checked")
    });
//input事件
    $("tbody tr").on("input","td",function () {
        var sumArry = [];
    //获取当前失去焦点元素的文本值
     var $txt = $(this).text();
    //判断当前的值是否为空
        if($txt){
            sumArry.push($txt);
        }else {
            $(this).text("0")
        }
    // 获取当前的索引值
       var $index = $(this).index();
    //获取其他同级元素的值
        for(var i = 0; i < $(this).parent().siblings().length;i++){
            var parSch = $(this).parent().siblings().eq(i).children().eq($index).text();
        //将获取到的文本值放在一个数组里
            sumArry.push(parSch);
        }
    //求和
        var sum = sumArry.reduce(function (a,b) {
            return parseFloat(a) + parseFloat(b)
        });
    //将求和出来的数据加载出来
        $("tfoot td").eq($index).text(sum);
        //柱状图函数
        data();
    //饼状图函数
        databar()
    })
}

/**
 * 柱状图
 */
//生活消费数据
var obj = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
function data() {
    var $tr = $("tbody tr");
        // $td = $("tbody tr td");
    var str = [],
        arr = [];
    for(var i = 0; i <$tr.eq(1).children("td").length -1; i++){
        for(var x = 0; x < $tr.length; x++){
            str.push($tr.eq(x).children().eq(i + 1).text())
        }
        arr.push(str);
        str = []
    }
    //柱形图
    var myChart = echarts.init(document.getElementById('text'),"dark");
    var option = {
      //图表标题
        title: {
            show:true,
        textStyle:{
        fontFamily:"微软雅黑",
            fontSize:24,
            color:"#3e9391"
    },
    //标题的文本内容设置
    text: '本周生活消费数据'
},
    // 鼠标悬浮提示工具
    tooltip: {},
  // 图表图注
    legend: {
        //系列项
        data:['食品酒水','购物消费','居家生活','行车交通','休闲娱乐','人情费用','金融保险','药品医疗','其它'],
        orient:'vertical',
        itemGap:25,
        right:0,
        top:70,
        textStyle:{
            fontFamily:"微软雅黑",
            fontSize:14
        }
    },
    xAxis: {
        //x轴
        data: obj
    },
  //Y轴
    yAxis: {},
  //柱状图的之间的间距
    barGap:"5%",
   //系列配置
        series: [
            {
                name: '食品酒水',
                //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                type: "bar",
                data: arr[0]
            },
                {
                name: '购物消费',
                //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                type: "bar",
                data: arr[1]
            },
                {
                name: '居家生活',
                //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                type: "bar",
                data: arr[2]
            },
                {
                name: '行车交通',
                //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                type: "bar",
                data: arr[3]
            },  {
                name: '休闲娱乐',
                //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                type: "bar",
                data: arr[4]
            },
                {
                name: '人情费用',
                //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                type: "bar",
                data: arr[5]
            },
                {
                name: '金融保险',
                //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                type: "bar",
                data: arr[6]
            },
                {
                name: '药品医疗',
                //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                type: "bar",
                data: arr[7]
            },
                 {
                name: '其它',
                //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                type: "bar",
                data: arr[8]
            }
        ],
        grid:{
        left:30,
            top:50,
            right:110,
            bottom:50
    }
};
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

/**
 * 饼状图
 */
function databar() {
    var num = [];
    for(var j = 0; j < $("tfoot td").length;j++){
        var toTal = $("tfoot td").eq(j+1).text();
        num.push(toTal);
    }
    //指定图表的配置项和数据
    var myChart = echarts.init(document.getElementById('boxs'),"dark");
    option = {
        title:{
            text:"本周生活消费比重",
            textStyle:{
                fontSize:24,
                color:"#3e9391"
            }
        },
        tooltip:{},
        series : [
            {
                // name: '访问来源',
                type: 'pie',
                radius: '55%',
                data:[
                    {value:num[0], name:'食品酒水'},
                    {value:num[1], name:'购物消费'},
                    {value:num[2], name:'居家生活'},
                    {value:num[3], name:'行车交通'},
                    {value:num[4], name:'人情费用'},
                    {value:num[5], name:'金融保险'},
                    {value:num[6], name:'休闲娱乐'},
                    {value:num[7], name:'药品医疗'},
                    {value:num[8], name:'其它'}
                ]
            }
        ]
    };
// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
//窗口缩放
    window.onresize = myChart.resize;


}






















