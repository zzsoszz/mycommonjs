define(['jquery',"jquery/qtable/1.0.0/jquery.qtable.css","handlebars","qpager"], 
function(require, exports) {
	
	//var $ = require('$');
	var handlebars= require('handlebars');
	var qpager= require('qpager');
	
	(function($)
	{
			var  defaultoptions = {
	            selector      : this.selector
	 		};
			
			$.fn.qtable=function(options)
			{
				var options = $.extend( {}, defaultoptions, options );
				$(this).each(
					function ()
					{
						var target=$(this);
						$(this).data("qtabledata",new QTable(target,options));
					}
				);
			};
			
			function QTable(showtarget, options)
			{
				this.render=function(data)
				{
					$.handlebars({
				    templatePath: ctx+'/js/commonjs/seajs/sea-modules/jquery/qtable/1.0.0',
				    templateExtension: 'hbs'
					});
					$(showtarget).render('qtable',data,
						function()
						{
							var totalpagev=Math.ceil(data.total/options.pagesize);
							$(".qpager").qpager({totalpage:totalpagev,initpage:data.curpage,pagechange:function(page){	}});
						}
					);
				};
				this.init=function()
				{
					if(options.data!=null)
					{
						this.render(options.data);
					}
					else
					{
						$.get(options.url, function (data) {
							this.render(data);
						}, 'json');
					}
				}
				this.init();
			}
	}
	)(jQuery);

}
);