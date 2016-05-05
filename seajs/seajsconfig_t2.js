seajs.config({
    base: ctx+"/js/commonjs/seajs/sea-modules",
    alias: {
      "seajs-debug": "seajs/seajs-debug/1.1.1/seajs-debug",
      "seajs-style": "seajs/seajs-style/1.0.2/seajs-style",
      "seajs-log":  "seajs/seajs-log/1.0.1/seajs-log",
      "$": 	    		"jquery/jquery/1.9.1/jquery.js",
      "$-debug": 	    "jquery/jquery/1.9.1/jquery.js",
      "jquery": 	    "jquery/jquery/1.9.1/jquery.js",
      "jqueryui":       "jquery/jquery-ui/1.8.23/js/jquery-ui-mod.js",
      "bootstrap":      "jquery/bootstrap/3.0.3/js/bootstrap-mod",
      "jqgrid":		    "jquery/jqgrid/jquery.jqgrid-4.4.0/js/jquery.jqgrid-mod.js",
      "qpanel":		    "jquery/qpanel/1.0.0/qpanel-mod.js",
      "timepicker":	    "jquery/jquery-validate/jquery.validate-mod.js",
	  "qpager":		    "jquery/qpager/1.0.1/qpager-mod.js",
	  "handlebars":	    "jquery/jquery-handlebars/1.1.5/jquery-handlebars-mod.js",
	  "qtable":		    "jquery/qtable/1.0.0/qtable-mod.js",
	  "qsplitter":		"jquery/qsplitter/1.0.4/qsplitter-mod.js"
    },
    map : 
    [
    	[/bui\/(.*).js/,'bui/$1-min.js']
    	//[/jquery\/(.*).js/,'jquery/$1-debug.js'],
    ]
    //debug: false,
	//preload:["seajs-style",'seajs-debug','seajs-log']
});


seajs.use(['jquery/jquery/1.9.1/jquery',"$","$-debug"], 
	function(jquery,jquery2,jquery3) 
	{
			 window.$=window.jQuery ;
	}
);
 