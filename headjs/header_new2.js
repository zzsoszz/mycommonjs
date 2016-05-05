$(document).ready(function(){
	//头部子菜单鼠标移动事件
	title_submenu_hover();
	//头部悬浮
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
	//显示头部
	var mark=$("head").attr("mark").split("_");
	try{
		if(mark[0]=="sph"){
			$("#head_navigation>li").eq(1).show();
			$("#head_navigation>li").eq(1).children("dl").children("dd").eq(mark[1]).addClass("curr")
			$("#logimage").attr("src",ctx+"/images/index_new/logo_sph.png");
		}else if(mark[0]=="lxj"){
			$("#head_navigation>li").eq(2).show();
			$("#head_navigation>li").eq(2).children("dl").children("dd").eq(mark[1]).addClass("curr")
			$("#logimage").attr("src",ctx+"/images/index_new/logo_lxj.png");
		}else if(mark[0]=="yqt"){
			$("#head_navigation>li").eq(3).show();
			$("#head_navigation>li").eq(3).children("dl").children("dd").eq(mark[1]).addClass("curr")
			$("#logimage").attr("src",ctx+"/images/index_new/logo_yqt.png");
			$(".search_key").show();
		}else if(mark[0]=="msc"){
			$("#head_navigation>li").eq(4).show();
			$("#head_navigation>li").eq(4).children("dl").children("dd").eq(mark[1]).addClass("curr")
		}
	}catch(e){};
});
var timer3;
function title_submenu_hover(){
	$("#head_navigation .nav_parts").hover(function(){
		var heaerthis=$(this);
		timer3 = setTimeout(function(){//鼠标停留300毫秒后执行
			heaerthis.children(".head_nav_detail1").slideDown(200);
			heaerthis.siblings(".nav_parts").children(".head_nav_detail1").hide();
		},300);	
	},function(){
		clearTimeout(timer3);//没有停留够300毫秒将取消执行事件
		$("#head_navigation .nav_parts").children(".head_nav_detail1").hide()
	});
}
function floatheader(){
	var header_height=$("#uicontainer").height();
	$("#uicontainer").css("height",header_height);
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
function setsessiondate(startdate,enddate){
	$.ajax({
		type:"post",
		url:ctx+"/com/bxtel/hotel/controller/hotelnew/setsessiondate.do",
		dataType:"json",
		async:false,
		data:{"startdate":startdate,"enddate":enddate}
	});
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
//图片缓慢加载
function imglazzay(obj,obj1){
	$(obj).delayLoading({
		errorImg: "",                        // 读取图片错误时替换图片(默认：与defaultImg一样)
		imgSrcAttr: "src_",           // 记录图片路径的属性(默认：originalSrc，页面img的src属性也要替换为originalSrc)
		beforehand:400,                       // 预先提前多少像素加载图片(默认：0)
		obj:obj1,						//#
		event: "scroll",                     // 触发加载图片事件(默认：scroll)
		duration: "normal",                  // 三种预定淡出(入)速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认:"normal"
		container: window,                   // 对象加载的位置容器(默认：window)
		success: function (imgObj) {},      // 加载图片成功后的回调函数(默认：不执行任何操作)
		error: function (imgObj) {}         // 加载图片失败后的回调函数(默认：不执行任何操作)
	});
}