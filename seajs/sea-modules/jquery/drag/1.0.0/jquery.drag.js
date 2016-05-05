
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

