/**
 * | yDate.js | Copyright (c) 2013 yao.yl | email: redrainyi@126.com | Date: 2012-09-03 |
// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new YDate()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new YDate()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
// (new YDate()).format("yyyy年mm月dd日")
 */
(function(global) {
	
	var objectPrototypeToString = Object.prototype.toString;

	var isDate = function(value) {
		return objectPrototypeToString.call(value) === '[object Date]';
	};
	
	function parseDate(dateString, pattern) {
			try {
				dateString=dateString.replace("年","-").replace("月","-").replace("日","-").replace("/","-");
				var matchs1 = (pattern || (dateString.length === 10 ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss')).match(/([yMdHsm])(\1*)/g);
				var matchs2 = dateString.match(/(\d)+/g);
				if (matchs1.length === matchs2.length) {
					var $d = new Date(1970, 0, 1);
					for (var i = 0; i < matchs1.length; i++) {
						var $i = parseInt(matchs2[i], 10);
						switch (matchs1[i].charAt(0) || '') {
							case 'y' :
								$d.setFullYear($i);
								break;
							case 'M' :
								$d.setMonth($i - 1);
								break;
							case 'd' :
								$d.setDate($i);
								break;
							case 'H' :
								$d.setHours($i);
								break;
							case 'm' :
								$d.setMinutes($i);
								break;
							case 's' :
								$d.setSeconds($i);
								break;
							default :
								//
						}
					}
					return $d;
				}
			} catch (err) {
				alert(err)
			}
			return null;
	};
	
	
	var YDate = function(pDate) {
		var p0 = arguments[0];
		var p1 = arguments[1];
		if (typeof p0 === 'number' && isFinite(value)) {
			this.vDate = new Date(p0);//millis
		} else if (isDate(p0)) {
			this.vDate = new Date(p0.getTime());
		} else if (typeof p0 === 'string') {
			if (typeof p1 === 'string' || typeof p1 === 'undefined') {
				this.vDate = parseDate(p0, p1);
			}
		} else if (arguments.length == 0) {
			this.vDate = new Date();
		} else {
			throw 'YDate Constructor Error!';
		}
		//相当于下面
		//this.vDate = new Date();
		//this.vDate.setFullYear(pDate.getFullYear());
		//this.vDate.setMonth(pDate.getMonth());
		//this.vDate.setDate(pDate.getDate());
		//this.vDate.setHours(pDate.getHours());
		//this.vDate.setMinutes(pDate.getMinutes());
		//this.vDate.setSeconds(pDate.getSeconds());
	};
	
	
	YDate.prototype={
		format:function(fmt) 
		{ //author: meizz 
		  var o = { 
			"M+" : this.vDate.getMonth()+1,                 //月份 
			"d+" : this.vDate.getDate(),                    //日 
			"h+" : this.vDate.getHours(),                   //小时 
			"m+" : this.vDate.getMinutes(),                 //分 
			"s+" : this.vDate.getSeconds(),                 //秒 
			"q+" : Math.floor((this.vDate.getMonth()+3)/3), //季度 
			"S"  : this.vDate.getMilliseconds()             //毫秒 
		  }; 
		  if(/(y+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, (this.vDate.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		  }
		  for(var k in o)
		  {
			if(new RegExp("("+ k +")").test(fmt))
			{
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
			}
		  }
		  return fmt; 
		}
		,
		toDate:function()
		{
			return this.vDate;
		}
		,
		getYear:function()
		{
			return this.vDate.getYear();
		}
		,
		getFullYear:function()
		{
			return this.vDate.getFullYear();
		}
		,
		getMonth:function()
		{
			return this.vDate.getMonth()+1;
		}
		,
		getDate:function()
		{
			return this.vDate.getDate();
		}
		,
		getHours:function()
		{
			return this.vDate.getHours();
		}
		,
		getMinutes:function()
		{
			return this.vDate.getMinutes();
		}
		,
		getSeconds : function() {
			return this.vDate.getSeconds();
		}
		,
		getDay:function()
		{
			return this.vDate.getDay();
		}
		,
		setYear:function(value)
		{
			this.vDate.setYear(value);
		}
		,
		setFullYear:function(value)
		{
			this.vDate.setFullYear(value);
		}
		,
		setMonth:function(value)
		{
			this.vDate.setMonth(value-1);
		}
		,
		setDate:function(value)
		{
			this.vDate.setDate(value);
		}
		,
		setHours:function(value)
		{
			this.vDate.setHours(value);
		}
		,
		setMinutes:function(value)
		{
			this.vDate.setMinutes(value);
		}
		,
		setSeconds : function(value) {
			this.vDate.setSeconds(value);
		}
		,
		/*//http://www.php100.com/html/webkaifa/javascript/2012/0314/10037.html
		 * 	获得指定日期的星期数，1-6为星期一到星期六，0为星期天
		 *	@y 年份
		 *	@m 月份
		 *	@d 日
		 */
		getWeek : function() {
			var y=this.vDate.getFullYear();
			var m=this.vDate.getMonth()+1;
			var d=this.vDate.getDate();
			var _int = parseInt,c = _int(y/100);
			y = y.toString().substring(2, 4);
			y = _int(y, 10);
			if(m === 1) {
				m = 13;
				y--;
			} else if(m === 2) {
				m = 14;
				y--;
			};
			var w = y + _int(y/4) + _int(c/4) - 2*c + _int(26*(m+1)/10) + d - 1;
			w = w%7;
			return w >= 0 ? w : w+7;
		}
		,//根据年月算这个月的天数
		getDays:function() {
				var year=this.vDate.getFullYear();
				var month=this.vDate.getMonth()+1;
				var day = 0;
				// 判断大月份
				if (month == 1 || month == 3 || month == 5 || month == 7|| month == 8 || month == 10 || month == 12)
				{
					day = 31;
				}
				// 判断小月
				if (month == 4 || month == 6 || month == 9 || month == 11)
				{
					day = 30;
				}
				// 判断平年与闰年
				if (month == 2)
				{
					if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
					{
						day = 29;
					}
					else
					{
						day = 28;
					}
				}
				return day;
		}
	};
	global.YDate = YDate;
})(window);
