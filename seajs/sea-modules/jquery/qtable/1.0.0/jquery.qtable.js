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
			$.handlebars({
			    templatePath: ctx+'/js/jquery/qtable/qtable-v1.0.0',
			    templateExtension: 'hbs'
			});
			
			$(showtarget).render('qtable',options.data);
		}
}
)(jQuery);