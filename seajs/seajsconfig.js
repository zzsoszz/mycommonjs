seajs.config({
    base: ctx+"/js/commonjs/seajs/sea-modules",
    alias: {
      "seajs-debug": "seajs/seajs-debug/1.1.1/seajs-debug",
      "seajs-style": "seajs/seajs-style/1.0.2/seajs-style",
      "seajs-log":  "seajs/seajs-log/1.0.1/seajs-log"
    },
    map : 
    [
    	[/bui\/(.*).js/,'bui/$1-min.js'],
    	[ /^(.*\.(?:css|js))(.*)$/i, '$1?'+curversion ]
    	//[/jquery\/(.*).js/,'jquery/$1-debug.js'],
    ]
    //debug: false,
	//preload:["seajs-style",'seajs-debug','seajs-log']
});
define( "$-debug", [], function () { return window.jQuery; } );