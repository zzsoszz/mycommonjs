(function($)
			{
				var  defaultoptions = {
		              selector      : this.selector
		   		};
				var plugname="qpanel";
				
				$.fn[plugname]=function()
				{
					var isMethodCall=arguments.length>0 && typeof arguments[0] === "string";
					if(isMethodCall)
					{
						//
						var methodname=arguments[0];
						var args = Array.prototype.slice.call(arguments,1);
						this.each(function() {
							var instance = $.data( this,plugname);
							if(instance && $.isFunction( instance[methodname] ))
							{
								var method=instance[methodname];
								method.apply(instance,args);
							}
						});
					}else{
						var inputoptions = arguments;
						$(this).each(
								function ()
								{
									var optionsnew = $.extend( {}, defaultoptions);
									if(inputoptions.length>0)
									{
											optionsnew=$.extend(optionsnew,inputoptions[0]);
									}
									var instance=$(this).data(plugname);
									if(instance)
									{
										instance.init(optionsnew);
									}else
									{
										var target=$(this);
										instance=new PluginObject(target);
										instance.init(optionsnew);
										$(this).data(plugname,instance);
									}
								}
							);
							return this;
					};
				}
				
				
				function PluginObject(target)
				{
						this.options;
						
						this.poppanel;
						this.popcontent;
						this.popfooter;
						this.pophead;
						this.render=function()
						{
							var pophead=$('<div class="pophead"></div>');
							if(this.options.pophead)
							{
								var  ph= this.options.pophead.clone();
								ph.show();
								pophead.append(ph);
							}
							
							var popcontent=$('<div class="popcontent"></div>');
							if(this.options.popcontent)
							{
								var  pc= this.options.popcontent.clone();
								pc.show();
								popcontent.append(pc);
							}
							
							var popfooter=$('<div class="popfooter"></div>');
							if(this.options.popfooter)
							{
								var  pf= this.options.popfooter.clone();
								popfooter.append(pf);
							}
							
							var poppanel=$('<div class="poppanel"  ></div>').hide().append(pophead).append(popcontent).append(popfooter);
							poppanel.css("position","absolute");
							poppanel.offset(({ top: target.offset().top+target.outerHeight(), left: target.offset().left }));;
							
							this.poppanel=poppanel;
							this.pophead=pophead;
							this.popcontent=popcontent;
							this.popfooter=popfooter;
							$("body").append(this.poppanel);
						};
						
						
						this.init=function(initoptions)
						{
							
							this.options=initoptions;
							
							this.render();
							
							this.popcontent.click($.proxy(
								function()
								{
								  var e = arguments[0] || window.event;
								  var etarget = e.srcElement ? e.srcElement : e.target;
								  if($(etarget).hasClass("chooseitem"))
								  {
									  target.val($.trim($(etarget).text()));
									  target.change();
									  this.poppanel.hide();
								  }
								  return false;
								},this)
							);
							
							this.popcontent.find(".chooseitem").hover(
								function()
								{
								  var e = arguments[0] || window.event;
								  var etarget = e.srcElement ? e.srcElement : e.target;
								  if($(etarget).hasClass("chooseitem"))
								  {
									 $(etarget).addClass("popcontent-hover");
								  }
								},
								function() {
									var e = arguments[0] || window.event;
									var etarget = e.srcElement ? e.srcElement : e.target;
									if($(etarget).hasClass("chooseitem"))
									{
										$(etarget).removeClass("popcontent-hover");
									}
								}
							);
							
							target.click(
									 $.proxy(
										function()
										{
											this.poppanel.show();
										}
									,this)
							);
							
							$(document).bind('click',
							    $.proxy(
								function(event){
								  if( !$(event.target).closest(target).length && (!$(event.target).closest(this.poppanel).length) ) 
								  {
									  this.poppanel.hide();
								  }
								},this)
							);
							
						};
				}
		}
	)(jQuery);