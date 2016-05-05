  /*
 * 	获得指定日期的星期数，1-6为星期一到星期六，0为星期天
 *	@y 年份
 *	@m 月份
 *	@d 日
 */
function getWeek(y, m, d) {
	var _int = parseInt,
		c = _int(y/100);
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