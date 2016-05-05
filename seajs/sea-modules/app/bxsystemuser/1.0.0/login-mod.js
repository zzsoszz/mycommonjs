define(["arale/validator/0.9.7/validator-debug"], 
function(require, exports) {
///////////////////////////////////////	
	    var  Validator=require("arale/validator/0.9.7/validator-debug");
	    
	    (function($){
	    	
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
	    			var self=this;
	    			this.option;
	    			this.url;
	    			this.messagebox;
	    			/*
	    			this.username;
	    			this.password;
	    			*/
	    			this.redirecturl;
	    			this.render=function()
	    			{
	    				//生成辅助html和初始化变量
	    				this.url=target.attr("action");
	    				/*
	    				this.username=target.find("[name=username]");
	    				this.password=target.find("[name=password]");
	    				*/
						var redirecturlele=target.find("[name=redirecturl]");
						if(redirecturlele!=null)
						{
							this.redirecturl=target.find("[name=redirecturl]").val();
						}
	    				this.messagebox=target.find("[name=messagebox]");
	    			};
	    			
	    			
	    			this.init=function(initoptions)
	    			{
	    				this.options=initoptions;
	    				this.render();
	    				//target.on("submit",$.proxy(this.login,this));
	    				var validator = new Validator({
	    		            element: target,
	    		            autoSubmit:false,
	    		            onItemValidated:function(error,message,element,event)
	    		            {
	    		            	if(error==null)//通过 
	    		            	{
	    		            		element.parent().removeClass("has-error");
	    		            	}else{
	    		            		element.parent().find(".ui-form-explain").html(message);
	    		            		element.parent().addClass("has-error");
	    		            		self.messagebox.text(message).show();
	    		            	}
	    		            },
	    		            onFormValidated:function(error,results,element){
	    		            	if(error!=true)
	    		            	{
	    		            		$.ajax({
	    		            			url:self.url+"?"+target.serialize(),
	    		            			context:self.messagebox,
	    		            			success:function(data, textStatus, jqXHR){
	    		            				if(data.key=="00000000")
	    		            				{
	    		            					$(this).addClass("alert-success").text("登陆成功").show();
	    		            					//redirecturl必须都是带/的
	    		            					var finalurl="";
	    		            					if(self.redirecturl!="")
	    		            					{//客户端重定向优先
	    		            						var reg=new RegExp("^http");
	    		            						if(reg.test(self.redirecturl))
	    		            						{
	    		            							finalurl=self.redirecturl;
	    		            						}
	    		            						else
	    		            						{
	    		            							finalurl=window.ctx+self.redirecturl;
	    		            						}
	    		            					}else{
	    		            					 //服务端重定向
	    		            						if(data.value.redirecturl != "")
		    		            					{
	    		            							var reg=new RegExp("^http");
	    		            							if(reg.test(data.value.redirecturl))
		    		            						{
	    		            								finalurl=data.value.redirecturl;
		    		            						}else{
		    		            							finalurl=window.ctx+data.value.redirecturl;
		    		            						}
		    		            					}
	    		            						else
	    		            						{
	    		            							finalurl=window.ctx+"/";
		    		            					}
	    		            					}
	    		            					//window.location.href=finalurl;
	    		            					//window.open(window.ctx+"/") ;
	    		            					//alert("dddd");
	    		            					//var a = $("<a id='myclick' href='"+finalurl+"' target='_blank'>Apple</a>").appendTo(document.body);
	    		            					//$("#myclick").trigger("click");
	    		            					/*
	    		            					var g=window.open(null,"_blank");
	    		            					setTimeout(function(){
	    		            						g.location=finalurl;
	    		            					}, 700);
	    		            					*/
	    		            					/*
	    		            					var a = $("<a href='"+finalurl+"' target='_blank'>Apple</a>").appendTo(document.body).get(0);
	    		            					var e = document.createEvent('MouseEvents');
	    		            					e.initEvent('click',true,true );
	    		            					a.dispatchEvent(e);
	    		            					*/
	    		            					var a = $("<a href='"+finalurl+"' target='_blank'><span id='awindowopen'>Apple</span></a>");
	    		            					a.appendTo(document.body);
	    		            					a.find("#awindowopen").trigger("click");
	    		            					if(navigator.userAgent.indexOf("Chrome")>=0)
	    		            					{
	    		            						window.location.href=finalurl;
	    		            					}
	    		            					
	    		            					
	    		            				}
	    		            				else
	    		            				{
	    		            					$(this).addClass("alert-danger").text("您输入的帐号或密码有误").show();
	    		            				}
	    		            			}
	    		            		});
	    		            	}
	    		            },
	    		            onFormValidate:function(element)
	    		            {
	    		            	//console.log(element);
	    		            }
	    		        });
	    				/*
	    		        validator.addItem({
	    		            element: '[name=j_username]',
	    		            required: true,
	    		            rule: 'mobile',
	    		            display:"手机号码"
	    		        });
	    		        */
	    				 validator.addItem({
		    		            element: '[name=j_username]',
		    		            required: true,
		    		            rule: 'minlength{min:11}',
		    		            display:"手机号码"
		    		    });
	    		        validator.addItem({
	    		            element: '[name=j_password]',
	    		            required: true,
	    		            rule: 'minlength{min:5}',
	    		            display:"密码"
	    		        });
	    		        
	    		        
	    			}
	    		}
	    		
	    	
		})(window.jQuery);
		
	    return window.jQuery;
//////////////////////////////////////	
}
);