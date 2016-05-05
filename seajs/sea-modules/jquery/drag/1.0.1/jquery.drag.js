/*
  137573155@qq.com
  支持子容器
  支持边栏双击收缩
  节流优化 Debounce and throttle 
*/

(function($)
{

		var  defaultoptions = {
			    axis       :   null,      // String        设置拖拽的方向，x是横向，y是纵向
				container  :   null,      // String|Element|jQuery Object 设置拖拽范围的元素
		};
		
		$.fn.drag=function()
		{
			
		}
}
)(jQuery);


var deltaX;
var deltaY;
$(document).ready(
	function()
	{
		$("#drag").on("mousedown",
			function(ex)
			{
					deltaX = ex.pageX-parseInt($(ex.target).offset().left);
					deltaY = ex.pageY-parseInt($(ex.target).offset().top);
				   
				   
					$("#drag").on("mousemove",function(event)
					   {
							$(event.target).css("left",event.pageX-deltaX);
							$(event.target).css("top",event.pageY-deltaY);
					   }
				   );
				   
					$("#drag").on("mouseup",function()
					   {
							 $("#drag").off("mousemove").off("mouseup");
					   }
				   );
			}
		);

	}
);

