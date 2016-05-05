function inithotel(cityname){
	var htlFromcity = new Array();
	htlFromcity ['热门城市'] = new Array(286,100,6,27,123,268,319,344,16,55,236,238,142,314,21,203,106,348,351,370);
	htlFromcity ['ABCDE'] = [[29,68,121,160,257,269,338,349,371,378,379],[0,57,69,70,107,108,122,130,131,149,223,224,258,270,285,286,310,339,350,380,381],[1,71,86,109,132,133,150,151,209,211,233,259,271,272,273,351,372,382],[2,3,4,58,87,134,135,147,178,179,260,261,311,312,328,352,353],[72,192,193]];
	htlFromcity ['FGHIJ'] = [[48,88,110,246,262,263,274],[30,59,89,111,112,123,247,297,302,354,355,356],[5,16,17,31,73,74,90,91,113,114,136,152,153,161,180,181,182,194,195,212,213,234,264,275,276,277,278,303,304,305,306,307,313,340,383,384],[-1],[18,19,32,33,46,60,61,62,92,93,162,163,183,184,196,197,226,248,249,250,265,314,315,329,330]];
	htlFromcity ['KLMNO'] = [[6,164,287,288,289],[7,8,20,49,63,64,80,115,116,124,137,138,139,154,165,176,214,227,235,266,279,316,317,318,331,332,357,358,369,373,374],[41,94,95,185,280,359,360],[9,21,43,50,51,117,166,236,237,251,361,362,375],[-1]];
	htlFromcity ['PQRST'] = [[11,45,47,52,81,167,177,252,267,363],[10,26,53,82,96,118,125,126,127,140,141,155,186,187,198,319],[320,376],[22,54,55,97,98,99,100,142,148,156,168,169,188,189,199,200,201,215,228,229,238,253,268,290,298,333,341,348,364,377],[23,34,35,36,37,40,65,75,83,128,143,157,202,230,240,282,291,292,296,321,334,342,370]];
	htlFromcity ['UVWXYZ'] = [[-1],[-1],[12,24,76,77,84,119,144,145,146,191,203,241,283,293,294,299,322,323,343],[13,28,38,67,78,79,158,170,171,172,204,205,206,207,216,217,239,242,254,281,284,308,335,344,345],[14,39,44,66,101,102,120,190,208,218,219,220,231,243,244,255,256,295,300,309,324,336,337,346,347,365,366],[15,25,27,42,56,85,103,104,105,106,129,159,173,174,175,210,221,222,225,232,245,301,325,326,327,367,368]];
	//当不选时候（默认的 城市）
	var hotList = new Array(286,100,6,27,123,268,319,344,16,55,236,238,142,314);
	//酒店城市的查询
	$('#hotelcityNameheader').querycity({'data':citys,'tabs':htlFromcity,'hotList':hotList,"sinaCityName":cityname,keyword:"keyword"});

	//酒店搜索列表
	$(".btn_search,.btn_search_htl").click(function(){
		var key=$("#keyword").get(0).defaultValue;
		if(!$.trim($("#hotelcityNameheader").val())||$("#hotelcityNameheader").val().indexOf("中文")>=0) {
			alert("请选择搜索城市！");
			if(!$("#hotelcityNameheader:disabled").size()){
				$("#hotelcityNameheader").focus();
			}
			return;
		}
		//设置时间
		setsessiondate($("#id_startDate").val(),$("#id_backDate").val());
		var serach="";
		var mark=$("#keyword").attr("mark");
		var cdtype=$("#hotelcityNameheader").attr("cdtype");
		var cdarea=$("#hotelcityNameheader").attr("cdarea");
		if(mark=="name"){//通过名称搜索
			if(cdtype==1&&cdarea!=0){
				serach="&sectionId="+cdarea;
			}
			if($.trim($("#keyword").val())!=$("#keyword").get(0).defaultValue){
				serach+="&keyword="+encodeURI($("#keyword").val());
			}
		}else if(mark=="bd"){//通过百度地图搜索
			serach+="&roadName="+encodeURI($("#keyword").val());
		}else if(mark=="sq"){//通过商圈搜索markid
			serach+="&bizSectionId="+$("#keyword").attr("markid");
		}else if(mark=="xz"){//通过行政搜索markid
			serach+="&sectionId="+$("#keyword").attr("markid");
		}
		if(($("#keyword").get(0).defaultValue==$("#keyword").val()
			||$.trim($("#keyword").val())=="")&&!(cdtype==1&&cdarea!=0)){
			serach="";
		}
//		$.cookie("cityName",$.trim($("#hotelcityNameheader").val()));
		var url = ctx+"/com/bxtel/hotel/htlList.jsp?cityCode="+$("#hotelcityNameheader").attr("cd")+serach;
		window.location.href=url;
		
	});
	//酒店地图搜索
	$("#map_search").click(function(){
		var key=$("#keyword").get(0).defaultValue;
		if(!$.trim($("#hotelcityNameheader").val())||$("#hotelcityNameheader").val().indexOf("中文")>=0) {
			alert("请选择搜索城市！");
			if(!$("#hotelcityNameheader:disabled").size()){
				$("#hotelcityNameheader").focus();
			}
			return;
		}
		//设置时间
		setsessiondate($("#id_startDate").val(),$("#id_backDate").val());
		var serach="";
		var mark=$("#keyword").attr("mark");
		var cdtype=$("#hotelcityNameheader").attr("cdtype");
		var cdarea=$("#hotelcityNameheader").attr("cdarea");
		if(mark=="name"){//通过名称搜索
			if(cdtype==1&&cdarea!=0){
				serach="&sectionId="+cdarea;
			}
			if($.trim($("#keyword").val())!=$("#keyword").get(0).defaultValue){
				serach+="&keyword="+encodeURI($("#keyword").val());
			}
		}else if(mark=="bd"){//通过百度地图搜索
			serach+="&roadName="+encodeURI($("#keyword").val());
		}else if(mark=="sq"){//通过商圈搜索markid
			serach+="&bizSectionId="+$("#keyword").attr("markid");
		}else if(mark=="xz"){//通过行政搜索markid
			serach+="&sectionId="+$("#keyword").attr("markid");
		}
		if(($("#keyword").get(0).defaultValue==$("#keyword").val()
			||$.trim($("#keyword").val())=="")&&!(cdtype==1&&cdarea!=0)){
			serach="";
		}
//		$.cookie("cityName",$.trim($("#hotelcityNameheader").val()));
		var url = ctx+"/com/bxtel/hotel/UFSHotelMapQuery.jsp?cityCode="+$("#hotelcityNameheader").attr("cd")+serach;
		window.open(url);
		
	});
}
//获取第4级城市和景区
function getArea(keyword){
	 var tmp = new Array();
	 if(keyword==null||""==keyword){
		 return tmp;
	 }
	$.ajax({
		type:"post",
		url:ctx+"/com/bxtel/hotel/controller/city/getArea.do",
		dataType:"json",
		data:{"kw":keyword},
		cache:false,
		async:false,  //同步返数据
		success:function(result) {
			$(result).each(function(e){
				var arr=this.split(",")
				tmp.push(arr);
			});
		}
	});
	return tmp;
}

//初始化页面时获取商圈和区域
function changeCity(cityCode){
	$.ajax({
		type:"post",
		url:ctx+"/com/bxtel/hotel/controller/hotel/homePageInit.do",
		dataType:"json",
		cache:false,
		data:{"cityCode":cityCode},
		success:function(result) {
			if(result.ret=="00000000"){
				var sq_list=result.data.areaList;
				var xz_list=result.data.strAreaList;
				var hotelNameList=result.data.hotelNameList;
				$("#keyword").sqxz({sq_list:sq_list,xz_list:xz_list, sq_name:"热门商圈",xz_name:"热门区域"});
				$("#keyword").suggest(hotelNameList,{hot_list:[],dataContainerName:'#keyword', attachObject:'#suggest1'});
			}
		}
	});
}
