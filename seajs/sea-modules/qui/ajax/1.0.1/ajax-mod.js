define( 
function(require, exports) {
///////////////////////////////////////	
	    (function($)
		{
	    	
	    	$.fn.getText=function(targeturl)
	    	{
	    		var result="";
	    		$.ajax({
	    			async:false,
	    			url:targeturl,
	    			dataType:"text",
	    			success:function(data,textStatus){
	    				result=data;
	    			},
	    			error: function(XMLHttpRequest, textStatus, errorThrown){
	    				result=textStatus;
	    			}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
	    		});
	    		return result;
	    	}
	    	
	    	$.fn.getXml=function(targeturl)
	    	{
	    		var result;
	    		$.ajax({
	    			async:false,
	    			url:targeturl,
	    			dataType:"xml",
	    			success:function(data,textStatus){
	    				result=data;
	    			},
	    			error: function(XMLHttpRequest, textStatus, errorThrown){
	    				result=textStatus;
	    			}
	    		});
	    		return result;
	    	}

	    	$.fn.getHtml=function(targeturl)
	    	{
	    		var result;
	    		$.ajax({
	    			async:false,
	    			url:targeturl,
	    			dataType:"html",
	    			success:function(data,textStatus){
	    				result=data;
	    			},
	    			error: function(XMLHttpRequest, textStatus, errorThrown){
	    				result=textStatus;
	    			}
	    		});
	    		return result;
	    	}
	    	
		}
	    )(jQuery);
		
	    return jQuery;
//////////////////////////////////////	
}
);