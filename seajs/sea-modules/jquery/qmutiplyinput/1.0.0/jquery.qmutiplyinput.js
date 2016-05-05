(function($)
{
		var  defaultoptions = {
              selector      : this.selector
   		};
		var plugname="qmutiplyinput";
		
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
		
		var i=0;
		function PluginObject(target)
		{
		/*
				$("#containerinput").qmutiplyinput({
					value:"高手,你好",
					name:"otherguest",
					resultele:$("#result")
				});
		*/
				this.options;
				this.inputs;
				this.render=function(value)
				{
					if(value!=null)
					{
						var  inputstrarray=value.split(",");
						this.change(inputstrarray.length);
						var itemsarray=target.find(".item");
						$.each(inputstrarray,
							function(index,obj)
							{
								$(itemsarray.get(index)).val(obj);
							}
						);
						this.putValue();
					}
				};
				this.addfirst=function()
				{
					var input;
					if(this.options.additionClass)
					{
						input=$('<input class="'+this.options.additionClass+'">');
					}else{
						input=$("<input>");
					}
					input.attr("id",this.options.name+"_"+i++).attr("name",this.options.name).addClass("item");
					
					var wrapinput;
					if(this.options.wrapele)
					{
						wrapinput=$(this.options.wrapele).append(input);
					}else{
						wrapinput=input;
					}
					
					target.prepend(wrapinput);
					this.putValue();
					if(typeof this.options.onAdd == "function")
					{
						this.options.onAdd.apply(this,input)
					}
				};
				this.addlast=function()
				{
					var input;
					if(this.options.additionClass)
					{
						input=$('<input class="'+this.options.additionClass+'">');
					}else{
						input=$("<input>");
					}
					input.attr("id",this.options.name+"_"+i++).attr("name",this.options.name).addClass("item");
					
					var wrapinput;
					if(this.options.wrapele)
					{
						wrapinput=$(this.options.wrapele).append(input);
					}else{
						wrapinput=input;
					}
					
					target.append(wrapinput);
					this.putValue();
					if(typeof this.options.onAdd == "function")
					{
						this.options.onAdd.apply(this,input)
					}
				};
				this.removefirst=function()
				{
					var input=target.find(".item:first");
					if(this.options.wrapele){
						input.parent().remove();
					}else{
						input.remove();
					}
					
					this.putValue();
					
					if(typeof this.options.onRemove == "function")
					{
						this.options.onRemove.apply(this,input)
					}
				};
				this.removelast=function()
				{
					var input=target.find(".item:first");
					if(this.options.wrapele){
						input.parent().remove();
					}else{
						input.remove();
					}
					
					this.putValue();
					
					if(typeof this.options.onRemove=="function")
					{
						this.options.onRemove.apply(this,input)
					}
				};
				this.putValue=function()
				{
					if(this.options.resultele!=null)
					{
						this.options.resultele.val(this.getValue());
					}
				};
				this.getValue=function()
				{
						var result = target.find(".item").map(function() {
							if(this.value != null && this.value!='')
							{
								return this.value;
							}
						}).get().join(",");
						return result;
				};
				this.change=function(count)
				{
					var total=target.find(".item").size();
					if(count>total)
					{
						//增加input
						var addcount=count-total;
						for(var i=0;i<addcount;i++)
						{
							this.addlast();
						}
					}
					else if(count<total && count>=0)
					{
						for(var i=count;i<total;i++)
						{
							//减少input
							this.removelast();
						}
					}
				};
				this.init=function(initoptions)
				{
					this.options=initoptions;
					this.render(this.options.value);
					target.on("change",".item",
						$.proxy(function()
						{
							this.putValue();
						},this)
					);
				};
		}
		
}
)(jQuery)