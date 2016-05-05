var labelFromcity = new Array();
	labelFromcity ['热门城市'] = new Array(286,100,6,27,260,268,319,344,16,55,236,238,142,314,21,203,106,348,351,370);
	labelFromcity ['ABCDE'] = [[29,68,121,160,257,269,338,349,371,378,379],[0,57,69,70,107,108,122,130,131,149,223,224,258,270,285,286,310,339,350,380,381],[1,71,86,109,132,133,150,151,209,211,233,259,271,272,273,351,372,382],[2,3,4,58,87,134,135,147,178,179,260,261,311,312,328,352,353],[72,192,193]];
	labelFromcity ['FGHIJ'] = [[48,88,110,246,262,263,274],[30,59,89,111,112,123,247,297,302,354,355,356],[5,16,17,31,73,74,90,91,113,114,136,152,153,161,180,181,182,194,195,212,213,234,264,275,276,277,278,303,304,305,306,307,313,340,383,384],[-1],[18,19,32,33,46,60,61,62,92,93,162,163,183,184,196,197,226,248,249,250,265,314,315,329,330]];
	labelFromcity ['KLMNO'] = [[6,164,287,288,289],[7,8,20,49,63,64,80,115,116,124,137,138,139,154,165,176,214,227,235,266,279,316,317,318,331,332,357,358,369,373,374],[41,94,95,185,280,359,360],[9,21,43,50,51,117,166,236,237,251,361,362,375],[-1]];
	labelFromcity ['PQRST'] = [[11,45,47,52,81,167,177,252,267,363],[10,26,53,82,96,118,125,126,127,140,141,155,186,187,198,319],[320,376],[22,54,55,97,98,99,100,142,148,156,168,169,188,189,199,200,201,215,228,229,238,253,268,290,298,333,341,348,364,377],[23,34,35,36,37,40,65,75,83,128,143,157,202,230,240,282,291,292,296,321,334,342,370]];
	labelFromcity ['UVWXYZ'] = [[-1],[-1],[12,24,76,77,84,119,144,145,146,191,203,241,283,293,294,299,322,323,343],[13,28,38,67,78,79,158,170,171,172,204,205,206,207,216,217,239,242,254,281,284,308,335,344,345],[14,39,44,66,101,102,120,190,208,218,219,220,231,243,244,255,256,295,300,309,324,336,337,346,347,365,366],[15,25,27,42,56,85,103,104,105,106,129,159,173,174,175,210,221,222,225,232,245,301,325,326,327,367,368]];
//当不选时候（默认的 城市）
var hotList = new Array(286,100,6,27,260,268,319,344,16,55,236,238,142,314);

//初始化方法	
function inittuan(cityName){
		$("#yqtheader").click(function(){
			window.location.href=ctx+"/com/bxtel/tuan/tuan_index.jsp?city="+encodeURI(encodeURI($("#tuancity").val()));
		})
		$('#tuancity').querycity({'data':citys,'tabs':labelFromcity,'hotList':hotList,"sinaCityName":cityName});
		searchcate();
		$("#tuan_search").click(function(){//团购点击搜索按钮
			var keyword=null;
			if($.trim($("#tuan_keyword").val())!=""){
				keyword=$.trim($("#tuan_keyword").val());
			}
			gototuansearch(null,null,keyword);
		});
};
//跳转二级页面
function gototuansearch(category_name,category,keyword){
	//city:城市，region：行政区，regionids：商圈，category_name：分类，category：二级分类
	var search="";
	search+="city="+encodeURI(encodeURI($("#tuancity").val()));
	if(category_name!=null) search+="&category_name="+encodeURI(encodeURI(category_name));
	if(category!=null) search+="&category="+encodeURI(encodeURI(category));
	if(keyword!=null) search+="&keyword="+encodeURI(encodeURI(keyword));
	var url=ctx+"/com/bxtel/tuan/tuan_search.jsp?"+search;
	window.open(url);
};
//获取分类栏目
function searchcate(){
	$.ajax({
		url:ctx+"/com/bxtel/orderdetails/controller/eatery/categories.do",
		type:"post",
		data:{},
		dataType:"json",
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		cache:false,
		success:function(result){
			var fl="";
			$(result.cateNameBeans).each(function(){
				var cate2=this.subcategories;
				var fl2="";
				for(var i=0;i<cate2.length;i++){
					fl2=fl2+"<span><a href='"+this.category_name+"'>"+cate2[i]+"</a></span>";
				}
				if(this.category_name=="电影"||this.category_name=="抽奖"||this.category_name=="旅游"){
				}else{
					fl=fl+"<b>"+this.category_name+"</b>"+
				 	"<p>"+fl2+"</p>";
				}
			});
			$("#tuanchoise").empty().removeClass("back_wrap").append(fl).slideDown();
		//	绑定点击事件
			$("#tuanchoise a,#tuanhot a").click(function(){
				var queryname=$(this).attr("href");
				var name=$(this).html();
				if($.trim($(this).html())=="电影"||$.trim($(this).html())=="旅游"){
					 name=null;
				};
				gototuansearch(queryname,name);
				return false;
			});
		}
	});
}