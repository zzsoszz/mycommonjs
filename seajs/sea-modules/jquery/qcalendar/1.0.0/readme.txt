// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}

var time1 = new Date().format("yyyy-MM-dd HH:mm:ss");   

var time2 = new Date().format("yyyy-MM-dd");  



////////////////////////////////////////

<mce:script language="javascript" type="text/javascript"><!--
      
/**      
 * 对Date的扩展，将 Date 转化为指定格式的String      
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
 * eg:      
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */        
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}       
     
var date = new Date();      
window.alert(date.pattern("yyyy-MM-dd hh:mm:ss"));
// --></mce:script>    




/////////////////////////////////////////
Date.prototype.format = function(mask) {      
     
    var d = this;      
     
    var zeroize = function (value, length) {      
     
        if (!length) length = 2;      
     
        value = String(value);      
     
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {      
     
            zeros += '0';      
     
        }      
     
        return zeros + value;      
     
    };        
     
    return mask.replace(/"[^"]*"|'[^']*'|/b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])/1?|[lLZ])/b/g, function($0) {      
     
        switch($0) {      
     
            case 'd':   return d.getDate();      
     
            case 'dd':  return zeroize(d.getDate());      
     
            case 'ddd': return ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'][d.getDay()];      
     
            case 'dddd':    return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];      
     
            case 'M':   return d.getMonth() + 1;      
     
            case 'MM':  return zeroize(d.getMonth() + 1);      
     
            case 'MMM': return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];      
     
            case 'MMMM':    return ['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()];      
     
            case 'yy':  return String(d.getFullYear()).substr(2);      
     
            case 'yyyy':    return d.getFullYear();      
     
            case 'h':   return d.getHours() % 12 || 12;      
     
            case 'hh':  return zeroize(d.getHours() % 12 || 12);      
     
            case 'H':   return d.getHours();      
     
            case 'HH':  return zeroize(d.getHours());      
     
            case 'm':   return d.getMinutes();      
     
            case 'mm':  return zeroize(d.getMinutes());      
     
            case 's':   return d.getSeconds();      
     
            case 'ss':  return zeroize(d.getSeconds());      
     
            case 'l':   return zeroize(d.getMilliseconds(), 3);      
     
            case 'L':   var m = d.getMilliseconds();      
     
                    if (m > 99) m = Math.round(m / 10);      
     
                    return zeroize(m);      
     
            case 'tt':  return d.getHours() < 12 ? 'am' : 'pm';      
     
            case 'TT':  return d.getHours() < 12 ? 'AM' : 'PM';      
     
            case 'Z':   return d.toUTCString().match(/[A-Z]+$/);      
     
            // Return quoted strings with the surrounding quotes removed      
     
            default:    return $0.substr(1, $0.length - 2);      
     
        }      
     
    });      
     
};    








/////////////////////////////////////////////////////////

/**
 * | yDate.js | Copyright (c) 2013 yao.yl | email: redrainyi@126.com | Date: 2012-09-03 |
 */
(function(global) {

	var objectPrototypeToString = Object.prototype.toString;

	var isDate = function(value) {
		return objectPrototypeToString.call(value) === '[object Date]';
	};

	var cloneDate = function(pDate, process) {
		var vDate = new Date(pDate.getTime());
		var year = vDate.getFullYear(), //
		month = vDate.getMonth(), //
		date = vDate.getDate(), //
		hours = vDate.getHours(), //
		minutes = vDate.getMinutes(), // 
		seconds = vDate.getSeconds();//
		(!!process) && process(vDate, year, month, date, hours, minutes, seconds);
		return vDate;
	};

	var parseDate = function(dateString, pattern) {
		try {
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

	var formatDate = (function() {
		var SIGN_RG = /([yMdHsm])(\1*)/g;
		function padding(s, len) {
			var len = len - (s + "").length;
			for (var i = 0; i < len; i++) {
				s = "0" + s;
			}
			return s;
		}
		return function(value, pattern) {
			if (!isDate(value)) {
				return '';
			}
			try {
				pattern = pattern || 'yyyy-MM-dd HH:mm:ss';
				return pattern.replace(SIGN_RG, function($0) {
					switch ($0.charAt(0)) {
						case 'y' :
							return padding(value.getFullYear(), $0.length);
						case 'M' :
							return padding(value.getMonth() + 1, $0.length);
						case 'd' :
							return padding(value.getDate(), $0.length);
						case 'w' :
							return value.getDay() + 1;
						case 'H' :
							return padding(value.getHours(), $0.length);
						case 'm' :
							return padding(value.getMinutes(), $0.length);
						case 's' :
							return padding(value.getSeconds(), $0.length);
						case 'q' :
							return Math.floor((this.getMonth() + 3) / 3);
						default :
							return '';
					}
				});
			} catch (err) {
				return '';
			}
		};
	})();

	var getActualMaximum = function(date) {
		var vDate = new Date(date.getTime());
		vDate.setMonth(vDate.getMonth() + 1);
		vDate.setDate(0);
		return vDate.getDate();
	}

	var YDate = function() {
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
		this.$year = this.vDate.getFullYear();
		this.$month = this.vDate.getMonth();
		this.$date = this.vDate.getDate();
		this.$hours = this.vDate.getHours();
		this.$minutes = this.vDate.getMinutes();
		this.$seconds = this.vDate.getSeconds();
		this.$day = this.vDate.getDay();
	};

	YDate.prototype = {
		plusYear : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setFullYear(year + value);
			}));
		},
		plusMonth : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setMonth(month + value);
			}));
		},
		plusDate : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setDate(date + value);
			}));
		},
		plusHours : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setHours(hours + value);
			}));
		},
		plusMinutes : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setMinutes(minutes + value);
			}));
		},
		plusSeconds : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setSeconds(seconds + value);
			}));
		},
		minusYear : function(value) {
			return this.plusYears(-value);
		},
		minusMonth : function(value) {
			return this.plusMonths(-value);
		},
		minusDate : function(value) {
			return this.plusDate(-value);
		},
		minusHours : function(value) {
			return this.plusHours(-value);
		},
		minusMinutes : function(value) {
			return this.plusMinutes(-value);
		},
		minusSeconds : function(value) {
			return this.plusSeconds(-value);
		},
		setYear : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setFullYear(value);
			}));
		},
		setMonth : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setMonth(value);
			}));
		},
		setDate : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setDate(value);
			}));
		},
		setHours : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setHours(value);
			}));
		},
		setMinutes : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setMinutes(value);
			}));
		},
		setSeconds : function(value) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				vDate.setSeconds(value);
			}));
		},
		getYear : function() {
			return vDate.getFullYear();
		},
		getMonth : function() {
			return vDate.getMonth();
		},
		getDate : function() {
			return vDate.getDate();
		},
		getHours : function() {
			return vDate.getHours();
		},
		getMinutes : function() {
			return vDate.getMinutes();
		},
		getSeconds : function() {
			return vDate.getSeconds();
		},
		getDayOfWeek : function() {
			return vDate.getDay();
		},
		toDate : function() {
			return cloneDate(this.vDate);
		},
		calculate : function(expression) {

		},
		clone : function() {
			return new YDate(cloneDate(this.vDate));
		},
		getBegin : function(field) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				switch (field) {
					case 'yyyy' ://year
						vDate.setMonth(0);
						vDate.setDate(1);
						vDate.setHours(0);
						vDate.setMinutes(0);
						vDate.setSeconds(0);
						break;
					case 'MM' ://month
						vDate.setDate(1);
						vDate.setHours(0);
						vDate.setMinutes(0);
						vDate.setSeconds(0);
					case 'dd' ://date
						vDate.setHours(0);
						vDate.setMinutes(0);
						vDate.setSeconds(0);
						break;
					default :
						//Ignore
				}
			}));
		},
		getEnd : function(field) {
			return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
				switch (field) {
					case 'yyyy' ://year
						vDate.setMonth(11);
						vDate.setDate(31);
						vDate.setHours(23);
						vDate.setMinutes(59);
						vDate.setSeconds(59);
						break;
					case 'MM' ://month
						vDate.setDate(getActualMaximum(vDate));
						vDate.setHours(23);
						vDate.setMinutes(59);
						vDate.setSeconds(59);
					case 'dd' ://date
						vDate.setHours(23);
						vDate.setMinutes(59);
						vDate.setSeconds(59);
						break;
					default :
						//Ignore
				}
			}));
		},
		toString : function(pattern) {
			return formatDate(this.vDate, pattern);
		}
	};
	global.YDate = YDate;
})(window);






<!Doctype html>
<html>
	<head>
		<title>yDate.test</title>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
		<script type="text/javascript" src="yDate.js">
		</script>
	</head>
	<body>
		<script type="text/javascript">

//创建一个YDate日期对象
var date1 = new YDate('2013-01-01 11:50:20');
alert(date1.toString());
//获得JS Date对象
alert(date1.toDate());

var date2 = new YDate('2012-02-11');
alert(date2.toString());
//format日期对象
alert(date2.toString('yyyy年MM月dd日'));

//获得本月最后时刻的日期
var date3 = date2.getEnd('MM');//yyyy MM dd
alert(date3.toString());

//获得本年最初时刻的日期
var date4 = date2.getBegin('yyyy');
alert(date4.toString());

		</script>
	</body>
</html>













