define(['jquery'], 
function(require, exports) {
///////////////////////////////////////	
		
		var  defaultoptions = {
			param1      : "value",
		};
		var  plugname="loginable";
		$.fn[plugname]=function()
		{
			var isMethodCall=arguments.length>0 && typeof arguments[0] === "string";
			if(isMethodCall)
			{
				//调用函数
				var methodname=arguments[0];
				var args = Array.prototype.slice.call(arguments,1);
				this.each(function() {
					var instance = $.data( this,plugname);
					if(instance && $.isFunction( instance[methodname] ))
					{
						var method=instance[options];
						method.apply(instance,args);
					}
				});
			}
			else
			{
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
								instance=new PlugObject(target);
								instance.init(optionsnew);
								$(this).data(plugname,instance);
							}
						}
					);
					return this;
			};
		}
		
		/*
		 * PlugObject 可以改成你的插件名字对象，可以不改
		 */
		function PlugObject(target)
		{
			this.option;
			this.element=target;//html元素
			this.render=function()
			{
				//生成辅助html
			};
			this.init=function(initoptions)
			{
				this.options=initoptions;
				this.render();
			}
		}
//////////////////////////////////////	
}
);