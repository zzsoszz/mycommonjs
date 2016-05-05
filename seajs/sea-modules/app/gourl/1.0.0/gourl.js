(function($){
	$.gourl=function()
	{
			$("a[data-href]").each(
					function()
					{
						var ele=$(this);
						var gourl=ele.val();
						gourl=encodeURIComponent(gourl);
						ele.attr("href","/com/bxtel/common/controller/go/dogo.do?url="+gourl);
					}
			);
	}
})(window.jQuery);