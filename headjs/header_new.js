$(document).ready(function(){
	//头部菜单鼠标移动事件
	title_menu_hover();
	//头部子菜单鼠标移动事件
	title_submenu_hover();
	//获取当前城市
	getlocalCityName();
	//登陆展示
	userlog();
	//头部浮动
	floatheader();
	//返回顶部
	$('#contentBtn .vm-gotop').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});
	//滚动
	$(window).scroll(function(){
		if($(window).scrollTop() >= 150){
				$('#contentBtn .vm-gotop').fadeIn(300); 
		}else{    
				$('#contentBtn .vm-gotop').fadeOut(300);    
		} 
	});
});
function userlog(){
	//信息展开 
	$("#get_user_info").hover(function(){		
		/*打开列表*/		
		$("#more_list").fadeIn();
		$("#get_user_info").css({
			"background-color":"#fff",
			"border":"1px solid #efedee",
			"border-width":"0px 1px 0px 1px"
		});
		$(".head_get_more").css("background","url('"+ctx+"/images/member/member_list_more.gif') no-repeat scroll  0px -43px ");				
	},function(){
		/*收起列表*/
		$("#more_list").fadeOut();
		$("#get_user_info").css({
			"background-color":"#f5f5f5",
			"border":"1px solid #f5f5f5",
			"border-width":"0px 1px 0px 1px"
		});
		$(".head_get_more").css("background","url('"+ctx+"/images/member/head_more.gif') no-repeat scroll 0px -43px");
	}); }
var timer;
function title_menu_hover(){
	$("#head_navigation>.nav_parts,#head_navigation>.nav_sp").hover(function(){
		var partsthis=$(this);
		timer = setTimeout(function(){//鼠标停留300毫秒后执行
			if(partsthis.index()==2&&partsthis.hasClass("lxj_parts")){
				partsthis.removeClass("lxj_parts");
			}
			if(partsthis.index()!=2){
				$(".calendar-bounding-box").hide();
				$("#suggest1").hide();
			}
					var mark=partsthis.attr("mark");
					partsthis.removeAttr("mark");//获取并移除
					if(mark!=undefined){
						loadscript(mark);//动态加载需要用的js
					}
					partsthis.children(".child_parts").stop(true,true).slideDown(200);
					partsthis.siblings(".nav_parts").children(".child_parts").stop(true,true).hide();
		},300);
	},function(){
		clearTimeout(timer);//没有停留够1秒将取消执行事件
		if($(this).index()==2&&$(this).hasClass("lxj_parts")){
			$(this).removeClass("lxj_parts");
			return;
		}
		$(this).children(".child_parts").stop(true,true).slideUp(200);
	});
	/**
	 * 为旅行家添加class属性
	 */
	$(document).click(function(e){
		var el = e.target;
		if($(el).closest($(".child_parts")).length||$(el).closest($(".calendar-bounding-box")).length){
			$("#lxjpark").addClass("lxj_parts");
		}
		if(!$(el).closest($(".child_parts")).length&&!$(el).closest($(".calendar-bounding-box")).length){
				$("#head_navigation>.nav_parts").children(".child_parts").hide();
		}
	});
}
var timer2;
function title_submenu_hover(){
	$("#head_navigation>.nav_parts .nav_set>li").hover(function(){
		var lithis=$(this);
		timer2 = setTimeout(function(){//鼠标停留300毫秒后执行
			var mark=lithis.attr("mark");
			lithis.removeAttr("mark");//获取并移除
			if(mark!=undefined){
				loadscript(mark);//动态加载需要用的js
			}
			lithis.addClass("check2").siblings().removeClass("check2");
			var index=lithis.index();
			lithis.closest(".head_nav_list").children(".head_nav_detail1").children("div")
				.eq(index).show().siblings("div").hide();
		},300);	
	},function(){
		clearTimeout(timer2);//没有停留够300毫秒将取消执行事件
	});
}
function getlocalCityName(){
	cityName=$.cookie("cityName");
	if(cityName==null){//加载js
		var _src="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js";
		var _type="text/ecmascript";
		createScript(_src,_type);
		setTimeout(function(){
			try{
				cityName=remote_ip_info["city"];
			}catch(e){
				cityName="北京";//400毫秒后获取不到城市默认北京
			}
			$.cookie("cityName",cityName);
		},400);
	}
}
function loadscript(mark){
	var _type="text/javascript";
	if(mark=="goods")//商品
	{
		createScript(ctx+"/js/commonjs/headjs/header_sp.js",_type);
	}else if(mark=="hotel")//酒店
	{
		createScript(ctx+"/js/aircity.js",_type);
		createScript(ctx+"/js/cityjs/hotelquerycity.js",_type);
		createScript(ctx+"/js/yui-min.js",_type);
		createScript(ctx+"/js/j.suggest.js",_type);
		createScript(ctx+"/js/hotel/j.shangquan.js",_type);
		createScript(ctx+"/js/hotel/baidusq.js",_type);
		createScript(ctx+"/js/commonjs/headjs/header_htl.js",_type);
		setTimeout(function(){//延迟循环加载
			var int=window.setInterval(function(){
				try{
					createScript(ctx+"/js/js/calendar.js",_type);
					window.clearInterval(int);
				}catch(e){}
			}, 1000); 
		},200);
		setTimeout(function(){//延迟循环加载
			var int=window.setInterval(function(){
				try{
					inithotel(cityName);
					changeCity($("#hotelcityNameheader").attr("cd"));
					window.clearInterval(int);
				}catch(e){}
			}, 1000); 
		},200);
	}else if(mark=="ticket")//机票
	{
		createScript(ctx+"/js/flyCity.js",_type);
		createScript(ctx+"/js/flight/querycity.js",_type);
		createScript(ctx+"/js/flight/calendar.js",_type);
		createScript(ctx+"/js/commonjs/headjs/header_flight.js",_type);
	}else if(mark=="group")//团购
	{
		createScript(ctx+"/js/aircity.js",_type);
		createScript(ctx+"/js/cityjs/tuancityquery.js",_type);
		createScript(ctx+"/js/commonjs/headjs/header_tuan.js",_type);
		setTimeout(function(){
			var int=window.setInterval(function(){
				try{
					inittuan(cityName);
					window.clearInterval(int);
				}catch(e){}
			}, 1000); 
		},200);
	}
}
function createScript(_src,_type){
	var oHead = document.getElementsByTagName('HEAD').item(0); 
	 var oScript= document.createElement("script"); 
	    oScript.type =_type; 
	    oScript.src=_src; 
	    oHead.appendChild( oScript); 
}

function setsessiondate(startdate,enddate){
	$.ajax({
		type:"post",
		url:ctx+"/com/bxtel/hotel/controller/hotelnew/setsessiondate.do",
		dataType:"json",
		async:false,
		data:{"startdate":startdate,"enddate":enddate}
	});
}
//图片缓慢加载
function imglazzay(obj,obj1){
	$(obj).delayLoading({
		errorImg: "",                        // 读取图片错误时替换图片(默认：与defaultImg一样)
		imgSrcAttr: "src_",           // 记录图片路径的属性(默认：originalSrc，页面img的src属性也要替换为originalSrc)
		beforehand: 400,                       // 预先提前多少像素加载图片(默认：0)
		obj:obj1,						//#
		event: "scroll",                     // 触发加载图片事件(默认：scroll)
		duration: "normal",                  // 三种预定淡出(入)速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认:"normal"
		container: window,                   // 对象加载的位置容器(默认：window)
		success: function (imgObj) {},      // 加载图片成功后的回调函数(默认：不执行任何操作)
		error: function (imgObj) {}         // 加载图片失败后的回调函数(默认：不执行任何操作)
	});
}
function floatheader(){
	var header_height=$(".uicontainer").height();
	if(btnlogin()!="Safari"&&btnlogin()!="MSIE"){//谷歌,ie
		$(".uicontainer").css("height",header_height);
	}
	$(window).scroll(function(){
		var header_top=getElementViewTop($("#headermark").get(0));
		if(header_top<=0){
			$(".bg_black").css("position","fixed")
				.css("width",$(window).width()).css("top","0").css("z-index","100");
		}else{
			$(".bg_black").css("position","static");
		}
	});
}
//获取元素到可见窗口的距离
function getElementViewTop(element){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null){
		actualTop += current. offsetTop;
		current = current.offsetParent;
	}
	if (btnlogin() == "Safari"){
		var elementScrollTop=document.body.scrollTop;//chrome
	} else {
		var elementScrollTop=document.documentElement.scrollTop; //firefox与ie
	}
	return actualTop-elementScrollTop;
}
//判定浏览器类型
function btnlogin(){
	  	if(navigator.userAgent.indexOf("MSIE")>0)  return "MSIE"; 
	    if(navigator.userAgent.indexOf("Firefox")>0) return "Firefox"; 
	    if(navigator.userAgent.indexOf("Opera")>0)  return "Opera"; 
	    if(navigator.userAgent.indexOf("Safari")>0)  return "Safari"; 
	    if(navigator.userAgent.indexOf("Camino")>0) return "Camino";
	    if(navigator.userAgent.indexOf("Gecko")>0) return "Gecko";
}


