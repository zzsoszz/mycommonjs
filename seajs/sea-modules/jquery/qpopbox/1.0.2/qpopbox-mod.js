define(["jquery/qoverlay/1.0.0/jquery.qoverlay.css"], 
function(require, exports) {
	
	(function($)
	{
			
			var  defaultoptions = {
				  selector      : this.selector
			};
			var plugname="qpopbox";
			
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
					this.wrapdiv;
					this.shandowdiv;
					this.render=function()
					{
						target.css("position","relative");
						this.shandowdiv=$('<div class="shandowdiv" style="position:absolute; top:0px;left: 0px;background: none repeat scroll 0% 0% rgb(66, 66, 66); opacity: 0.6;">').css("width",target.width()+'px').css("height",target.height()+'px');
						this.wrapdiv=$('<div class="wrapdiv">').css({
						'position':'absolute',
						'width':target.width()+'px',
						'height':target.height()+'px',
						'top':'0px',
						'left':'0px'
						});
						
						var leftv=(target.width()-this.options.messagebox.width())/2;
						var topv=(target.height()-this.options.messagebox.height())/2;
						this.options.messagebox.addClass("messagebox").css("position","absolute").css("left",leftv+"px").css("top",topv+"px");
						
						this.wrapdiv.append(this.options.messagebox);
						target.append(this.shandowdiv);
						target.append(this.wrapdiv);
						
					};
					this.show=function()
					{
						this.shandowdiv.show();
						this.wrapdiv.show();
						this.options.messagebox.show();
					};
					this.hide=function()
					{
						this.shandowdiv.hide();
						this.wrapdiv.hide();
						this.options.messagebox.hide();
					};
					this.save=function()
					{
						this.hide();
						if(typeof this.options.save =='function' )
						{
							this.options.save.apply(this);
						}
					};
					this.close=function()
					{
						this.hide();
						if(typeof this.options.close =='function' )
						{
							this.options.close.apply(this);
						}
					};
					this.init=function(initoptions)
					{
						this.options=initoptions;
						this.render();
						this.hide();
						//this.options.messagebox.find(".btn.btn-primary").on("click",$.proxy(this.save,this));
						//this.options.messagebox.find(".btn.btn-default").on("click",$.proxy(this.close,this));
						this.options.messagebox.find(".dosubmit").on("click",$.proxy(this.save,this));
						this.options.messagebox.find(".doelse").on("click",$.proxy(this.close,this));//.btn.btn-default
					};
			}
	}
	)(jQuery);

	return jQuery;
}
);