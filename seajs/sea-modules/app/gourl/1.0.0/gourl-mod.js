define(function(require, exports) 
	{
		(function($){
	    	var  plugname="gourl";
	    	$.fn[plugname]=function()
	    	{
	    			$("a[name]").each(
	    					function()
	    					{
	    						var ele=$(this);
	    						var gourl=ele.val();
	    						var u=encodeURIComponent(urlall);
	    						ele.val(ctx+"/com/bxtel/common/controller/go/dogo.do?url="gourl);
	    					}
	    			);
	    	}
		})(window.jQuery);
		return window.jQuery;
	}
);