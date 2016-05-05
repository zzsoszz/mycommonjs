	var labelFromcity = new Array();
	labelFromcity ['热门城市'] = new Array(7,133,22,26,43,94,187,130,136,94,68,64,126,184,100,14,147,172,182,117);
	labelFromcity ['ABCDE'] = [[2,35,92,128,151,169,190,194,197,198],[3,7,8,29,30,101,102,155,165],[67,77,93,103,136,148],[16,54,94,97,116,125,137,168,171],[49,63,104],[-1]];
	labelFromcity ['FGHIJ'] =[[4,9,21],[22,31,36,86,113,138,140,202],[5,6,23,42,44,56,57,69,70,78,105,106,129,156,157,180,183],[-1],[15,17,24,41,58,59,74,87,88,89,90,99,117,118,135],[-1]];
	labelFromcity ['KLMNO'] = [[139,152,153,158,159,172,199],[10,18,32,37,50,51,79,119,146,149,150,173,174],[25,55,60,107,142,170],[33,52,80,81,91,143,164,182],[-1],[-1]];
	labelFromcity ['PQRST'] = [[144,176],[0,12,19,45,61,120,154,186,200],[1],[13,14,26,43,46,82,96,100,133,134,160,175],[20,39,47,75,108,126,147,161,166,191,192,193,196,203],[-1]];
	labelFromcity ['UVWXYZ'] = [[-1],[-1],[11,34,64,83,109,111,121,122,162,177,184,188],[38,48,65,84,98,110,114,130,141,178,189],[62,66,71,76,85,112,115,123,127,131,132,145,163,167,181],[27,28,40,53,68,72,73,95,124,179,185,187,195,201,204]];
	
	//当不选时候（默认的 城市）
	var hotList = new Array(35,92,128,151,169,190,194);
	var sinaCityName="北京";

$(document).ready(function(){
	$(".fly_method").click(function(){
			var flyMethod=$(this).val();
			if(flyMethod==0){
				$("#fly_backdate").css("color","#CCCCCC");
				$("#fly_backdate input").attr("disabled","disabled");
			}else if(flyMethod==1){
				$("#fly_backdate").css("color","#030303");
				$("#fly_backdate input").removeAttr("disabled");
			}
	});
	setTimeout(function(){//延迟循环加载
		var int=window.setInterval(function(){
			try{
				$('#oaCity').queryflight({'data':fightCitys,'tabs':labelFromcity,'hotList':hotList,"sinaCityName":sinaCityName});
				$('#aaCity').queryflight({'data':fightCitys,'tabs':labelFromcity,'hotList':hotList,"sinaCityName":sinaCityName});
				window.clearInterval(int);
			}catch(e){}
		}, 1000); 
	},200);

	$("#btn_search,.btn_search_fly").click(function(){
		//出发城市
		var oaCity=$("#oaCity").attr("aa");
		//抵达城市
		var aaCity=$("#aaCity").attr("aa");
		//名称
		oaName=$("#oaCity").val();
		aaName=$("#aaCity").val();
		if(oaName=="中文/拼音"?true:false){
			$("#oaCity").focus();
			return;
		}
		if(aaName=="中文/拼音"?true:false){
			$("#aaCity").focus();
			return;
		}
		//起飞时间
		var	fDate=$("#fDate").val();
		var flyMethod=$(".fly_method:checked").val();
		var	eDate="";
		if(flyMethod!=0){
			//返航时间
		eDate="~"+$("#eDate").val();
			//判断起飞时间与返程时间
			var data_n=getDateDiff(fDate,$("#eDate").val());
			if(data_n<=0){
				$("#eDate").trigger("click");
				return;
			}
		}
		if(oaCity==aaCity){
			alert("起飞城市不能与到达城市不能相同！");
			return;
		}
		var para=flyMethod+"~"+oaCity+"~"+aaCity+"~"+oaName+"~"+aaName+"~"+fDate+eDate;
		para=encodeURIComponent(encodeURIComponent(para));
		var url=ctx+"/com/bxtel/flight/flights_result.jsp?para="+para;
		setTimeout(function(){
			window.location.href=url;
		},10);
	});
	
});