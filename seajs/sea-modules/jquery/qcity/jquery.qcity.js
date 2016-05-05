(function($)
		{
			var  defaultoptions = {
				  selector      : this.selector
			};
			var plugname="qcity";
			
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
			
			
			/*
			 * 思路
			 * 初始化插件:设定panel头和 panel脚 panel体
			 * show根据input位置改变panel位置
			 */
			function PluginObject(target)
			{
					var self=this;
					var options;
					var citybox;
					var provincepanel;
					var citypanel;
					var areapanel;
					var selectedprovince;
					var selectedcity;
					var selectedarea;
					
					this.show=function()
					{
						
					};
					
					
					this.hide=function()
					{
						self.citybox.hide();
					};
					
					
					this.hideAll=function()
					{
						self.citypanel.hide();
						self.areapanel.hide();
						self.provincepanel.hide();
					}
					
					this.setResult=function()
					{
						target.val( self.selectedprovince.text()+"-"+self.selectedcity.text()+"-"+self.selectedarea.text() );
					}
					
					this.loadCity=function()
					{
						
						/*
						var provinceid=this.selectedprovince.data("id");
						var url=ctx+"/com/bxtel/bxorderhotel/controller/bxorderhotelt/docreateorderforjson.do?provinceid="+provinceid;
						$.ajax({
							url:url,
							type:"get",
							contentType : 'application/json',
							dataType:"json",
							success:function(data, textStatus, jqXHR)
							{
								var items='';
								for(var item:data)
								{
									items+='<span class="item" id="area_'+item.id+'">'+item.name+'</span>';
								}
								self.areapanel.empty().append($(item));
								//展开城市菜单
								self.hideAll();
								self.citypanel.show();
							},
							complete:function()
							{
								
							}
						});
						*/
						
						var item=$('<span class="item" id="city_1">成都</span>');
						self.citypanel.empty().append(item);
						self.hideAll();
						self.citypanel.show();
					}
					
					this.loadArea=function()
					{
						/*
						var areaid=this.selectedcity.data("id");
						var url=ctx+"/com/bxtel/bxorderhotel/controller/bxorderhotelt/docreateorderforjson.do?cityid="+areaid;
						$.ajax({
							url:url,
							type:"get",
							contentType : 'application/json',
							dataType:"json",
							success:function(data, textStatus, jqXHR)
							{
								var items='';
								for(var item:data)
								{
									items+='<span class="item" id="area_'+item.id+'">'+item.name+'</span>';
								}
								self.areapanel.empty().append($(item));
								self.hideAll();
								self.areapanel.show();
							},
							complete:function()
							{
								
							}
						});
						*/
						
						var item=$('<span class="item" id="area_1">青羊区</span>');
						self.areapanel.empty().append(item);
						self.hideAll();
						self.areapanel.show();
					}
					
					
					this.init=function(initoptions)
					{
						this.options=initoptions;
						
						this.citybox=$("#cityboxdemo").clone();
						this.citybox.attr("id", target.attr("id")+"_citybox" );
						this.citybox.css("position","absolute").css("");
						this.citybox.css("top",target.offset().top+target.outerHeight());
						this.citybox.css("left",target.offset().left);
						
						
						this.provincepanel=this.citybox.find(".provincepanel");
						this.citypanel=this.citybox.find(".citypanel");
						this.areapanel=this.citybox.find(".areapanel");
						
						this.selectedprovince=this.citybox.find(".selectedprovince");
						this.selectedcity=this.citybox.find(".selectedcity");
						this.selectedarea=this.citybox.find(".selectedarea");
						
						this.selectedprovince.click(
							function()
							{	
								self.hideAll();
								self.provincepanel.show();
							}
						);
						
						this.selectedcity.click(
							function()
							{
								self.hideAll();
								self.citypanel.show();
							}
						);
						
						this.selectedarea.click(
							function()
							{
								self.hideAll();
								self.areapanel.show();
							}
						);
						
						this.provincepanel.on("click",".item",
							function()
							{
								var  provincename=$(this).text();
								var  provincid=$(this).attr("id");
								
								self.selectedprovince.data("id",provincid);
								self.selectedprovince.text(provincename);
								
								self.loadCity();
							}
						);
						
						this.citypanel.on("click",".item",
							function()
							{
								var  cityname=$(this).text();
								var  cityid=$(this).attr("id");
								
								self.selectedcity.data("id",cityid);
								self.selectedcity.text(cityname);
								
								self.loadArea();
							}
						);
						
						
						this.areapanel.on("click",".item",
							function()
							{
								var  areaname=$(this).text();
								var  areaid=$(this).attr("id");
								
								self.selectedarea.text(areaname);
								self.selectedcity.data("id",areaid);
								
								
								self.hideAll();
								self.hide();
								self.setResult();
							}
						);
						
						
						target.click(
							function()
							{
								self.citybox.show();
							}
						);
						
						this.citybox.appendTo(document.body);
						
						$(document).bind('click',
							$.proxy(
							function(event){
							  if( !$(event.target).closest(target).length && (!$(event.target).closest(self.citybox).length) ) 
							  {
								  this.hide();
							  }
							},self)
						);
						
						
					};
					
					
			}
	}
)(jQuery);
	