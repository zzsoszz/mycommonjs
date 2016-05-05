define('qpanel', ['jquery',"jquery/qpanel/1.0.0/jquery.qpanel.css"], 
function(require, exports) {
	
	(function($)
	{


			$.fn.qpanel=function(options)
			{
				 var settings = $.extend({
				  selector      : this.selector
				}, options);
				
				$(this).each(
					function ()
					{
						var qinput=$(this);
					
						var pophead=$('<div class="pophead"></div>');
						if($(settings.pophead))
						{
							var  ph= $(settings.pophead).clone();
							ph.show();
							pophead.append(ph);
						}
						
						
						var popcontent=$('<div class="popcontent"></div>');
						if($(settings.popcontent))
						{
							var  pc= $(settings.popcontent).clone();
							pc.show();
							popcontent.append(pc);
							popcontent.click(
								function()
								{
								  var e = arguments[0] || window.event;
								  var target = e.srcElement ? e.srcElement : e.target;
								  if($(target).hasClass("chooseitem"))
								  {
									 $(qinput).val($.trim($(target).text()));
									 $(qinput).change();
								  }
								  return false;
								}
							);
							popcontent.find(".chooseitem").hover(
								function()
								{
								  var e = arguments[0] || window.event;
								  var target = e.srcElement ? e.srcElement : e.target;
								  
								  if($(target).hasClass("chooseitem"))
								  {
									 
									 $(target).addClass("popcontent-hover");
								  }
								},
								function() {
									var e = arguments[0] || window.event;
									var target = e.srcElement ? e.srcElement : e.target;
									if($(target).hasClass("chooseitem"))
									{
										//alert($(target));
										$(target).removeClass("popcontent-hover");
									}
								}
							);
						}
						
						
						var popfooter=$('<div class="popfooter"></div>');
						if($(settings.popfooter))
						{
							var  pf= $(settings.popfooter).clone();
							popfooter.append(pf);
						}
						
						
						
						var poppanel=$('<div class="poppanel"  ></div>').hide().append(pophead).append(popcontent).append(popfooter);
						poppanel.css("position","absolute");
						poppanel.offset(({ top: qinput.offset().top+20, left: qinput.offset().left }));;
						$("body").append(poppanel);
						$(this).click(
							function()
							{
								$(poppanel).show();
							}
						);
						var dompanel=$("body").find(poppanel);
						
						$(document).bind('click', function(event){
							//alert($(event.target).closest(  dompanel ).length  );
						  if( !$(event.target).closest( $(qinput) ).length && (!$(event.target).closest(dompanel).length) ) {
							 $(poppanel).hide();
							// alert(event.target);
						  }
						});
					
					
					}
				);
				
				
			}
	}
	)(jQuery);
	return jQuery;
});