$(document).ready(function(){
	//巨便宜
	getJPYBigTypeList();
	//聚返利
	getJFLMiddleTypeList();
	//热卖商家
	getbussiness();
/*	
	//热卖品牌
	getHotBrandName();
	//热卖商品
	getHotJPY();
*/	
});

function getJPYBigTypeList(){
	$.ajax({
		type:"post",
		url:ctx+"/com/bxtel/taoshoping/controller/taonewfront/getJPYBigTypeList.do",
		dataType:"json",
		cache:false,
		success:function(result) {
			var jflstr='<a target="_blank" class="sph_jfl" href="'+ctx+'/com/bxtel/shopping/shop_jpy.jsp?id=-1">8.8包邮</a>';
			$(result).each(function(){
				jflstr+='<a target="_blank" class="sph_jfl" href="'+ctx+'/com/bxtel/shopping/shop_jpy.jsp?id='+this.id+'">'+this.name+'</a>';

			});
			$("#spindex").removeClass("back_wrap");
			$("#spjpy").empty().append(jflstr);
		}
	});
}
function getJFLMiddleTypeList(){
	$.ajax({
		type:"post",
		url:ctx+"/com/bxtel/taoshoping/controller/taonewfront/getJFLBigTypeList.do",
		dataType:"json",
		cache:false,
		success:function(result) {
			var jflstr="";
			$(result).each(function(){
				jflstr+='<a target="_blank" class="sph_jfl" href="'+ctx+'/com/bxtel/shopping/shopIndex.jsp#'+this.id+'">'+this.name+'</a>';
			});
			$("#spindex").removeClass("back_wrap");
			$("#spjfl").removeClass("back_wrap").empty().append(jflstr);
		}
	});
}
function getbussiness(){
	$.ajax({
		type:"post",
		url:ctx+"/com/bxtel/shopping/controller/shopping/getBusinessList.do",
		dataType:"json",
		cache:false,
		success:function(result) {
			var merchantStr="";
			$(result).each(function(e){
				if(e<7){
					merchantStr+='<a target="_blank" href="'+ctx+'/com/bxtel/shopping/shop_citydetail.jsp?tempId='+this.busId+'" class="list_shop"><img src="'+this.busImage+'" title="'+this.busName+'"  />'+this.busDescribe+'</a>';
				}
			});
			merchantStr+='<a target="_blank" href="'+ctx+'/com/bxtel/shopping/shop_citylist.jsp"   class="list_shop"><div class="get_shopcity_more">更多</div></a>';
			$("#spindex").removeClass("back_wrap");
			$("#hotelsc").empty().append(merchantStr);
		}
	});
}

/*
function getHotBrandName(){
	$.ajax({
		type:"post",
		url:ctx+"/com/bxtel/taoshoping/controller/taonewfront/getHotBrandName.do",
		dataType:"json",
		cache:false,
		success:function(result) {
			var brandstr="";
			$(result).each(function(){
				var a="";
				if(this.ishot==1){
					a="<font  color='red'>"+this.logoName+"</font>";
				}else{
					a=this.logoName;
				}
				brandstr+="<span><a href='"+ctx+"/com/bxtel/shopping/shop_brand.jsp?brandId="+this.id+"'>"+a+"</a></span>";
			});
			$("#hotelbrand").empty().append(brandstr);
		}
	});
}
function getHotJPY(){
	$.ajax({
		type:"post",
		url:ctx+"/com/bxtel/taoshoping/controller/taonewfront/getHotJPY.do",
		dataType:"json",
		cache:false,
		success:function(result) {
			var brandstr="";
			$(result).each(function(){
				var a="";
				if(this.ishot==1){
					a="<font  color='red'>"+this.title+"</font>";
				}else{
					a=this.title;
				}
				brandstr+='<span><a target="_blank" onclick="jumpurlT(\''+this.url+'\',\''+this.sourceUrl+'\',\''+this.proId+'\')"  title="">'+a+'</a></span>';
			});
			$("#hotelsp").empty().append(brandstr);
		}
	});
}
*/
