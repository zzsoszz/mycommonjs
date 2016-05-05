/*
 * 首字母大写转换
 * @param { String } 要转换的字符串
 * @return { String } 转换后的字符串 top => Top
 */    
function capitalize( str ){
	var firstStr = str.charAt(0);
	return firstStr.toUpperCase() + str.replace( firstStr, '' );
}
		

/*    
 * 获取拖拽元素相对于包含元素的上下左右的边界值
 * 如果拖拽元素是fixed定位，则其包含元素自动设置成当前窗口
 * @param { jQuery Object } 包含元素
 * @param { jQuery Object } 拖拽元素
 * @return { Object } 包含了上下左右的边界值的对象
 */       
getBoundary : function( container, target ){
	var isWindow = $.isWindow( container[0] ),
		borderTopWidth = 0,
		borderRightWidth = 0,
		borderBottomWidth = 0,
		borderLeftWidth = 0,
		cOffset = container.offset(),               
		tOffset = target.offset(),
		tTop = target.css( 'top' ),
		tLeft = target.css( 'left' ),
		cOffsetTop, cOffsetLeft;
		
	if( tTop === 'auto' ){
		tTop = easyDrag.getPosition( target, 'top' );
	}
	
	if( tLeft === 'auto' ){
		tLeft = easyDrag.getPosition( target, 'left' );
	}

	if( isWindow ){
		cOffsetTop = container.scrollTop();
		cOffsetLeft = container.scrollLeft();
	}
	else{
		cOffsetTop = cOffset.top;
		cOffsetLeft = cOffset.left; 
		borderTopWidth = container.css( 'borderTopWidth' );
		borderRightWidth = container.css( 'borderRightWidth' );
		borderBottomWidth = container.css( 'borderBottomWidth' );
		borderLeftWidth = container.css( 'borderLeftWidth' );

		if( borderTopWidth === 'medium' ){
			borderTopWidth = '0px';
		}
		
		if( borderRightWidth === 'medium' ){
			borderRightWidth = '0px';
		}
		
		if( borderBottomWidth === 'medium' ){
			borderBottomWidth = '0px';
		}

		if( borderLeftWidth === 'medium' ){
			borderLeftWidth = '0px';
		}
		
		borderTopWidth = parseFloat( borderTopWidth );
		borderRightWidth = parseFloat( borderRightWidth );
		borderBottomWidth = parseFloat( borderBottomWidth );
		borderLeftWidth = parseFloat( borderLeftWidth );
	}      
	
	// 绝对距离+相对位置就是边界的位置
	cOffsetTop = cOffsetTop - tOffset.top + parseFloat( tTop );
	cOffsetLeft = cOffsetLeft - tOffset.left + parseFloat( tLeft );
	  
	return {    
		top : cOffsetTop + borderTopWidth,
		right : cOffsetLeft + container.outerWidth() - target.outerWidth() - borderRightWidth,
		left : cOffsetLeft + borderLeftWidth,            
		bottom : cOffsetTop + container.outerHeight() - target.outerHeight() - borderBottomWidth
	};
}


/*    
 * 获取元素在设置了position后其精确的定位值
 * @param { jQuery Object } 
 * @return { String } 定位的属性名
 */        
getPosition : function( elem, name ){
	var posType = elem.css( 'position' );
	
	// static
	if( posType === 'static' ){
		return 'auto';
	}
	
	// relative
	if( posType === 'relative' ){
		return '0px';
	}
	
	var posName = posParams[ name ][0],
		upName = capitalize( posName ),
		offset = elem.offset()[ posName ],        
		isSub = name === 'right' || name === 'bottom',
		borderWidth = 0,
		offsetParent, parent, parentOffset, posSize;
		
	if( posType === 'absolute' ){
		offsetParent = elem[0].offsetParent;
		
		if( offsetParent.tagName === 'BODY' || offsetParent.tagName === 'HTML' ){                
			offsetParent = window;
		}
		
		parent = $( offsetParent );
		
		if( !$.isWindow(offsetParent) ){
			borderWidth = parseFloat( parent.css('border' + upName + 'Width') );
		}
		
		parentOffset = parent.offset()[ posName ] + borderWidth; 
	}
	// fixed
	else{
		parent = $( window );
		parentOffset = parent[ 'scroll' + upName ]();
	}

	offset -= parentOffset; 
	
	// right = offsetParent.innerWidth - self.outerWidth - left 
	// bottom = offsetParent.innerWidth - self.outerWidth - top 
	if( isSub ){            
		posSize = posParams[ name ][1];
		return parent[ 'inner' + posSize ]() - elem[ 'outer' + posSize ]() - offset + 'px';
	}

	// top、left
	return offset + 'px';       
}

 /*    
 * 将源元素的位置复制给目标元素，不管两个元素的定位方式是否相同
 * 该方法用于代理拖拽时，代理元素和拖拽元素之间的位置复制
 * @param { jQuery Object } 源元素
 * @param { jQuery Object } 目标元素
 */     
copyPosition : function( source, target ){
	var sOffset = source.offset(),
		tOffset = target.offset(),
		top = target.css( 'top' ),
		left = target.css( 'left' );
		
	if( top === 'auto' ){
		top = easyDrag.getPosition( target, 'top' );
	}
	
	if( left === 'auto' ){
		left = easyDrag.getPosition( target, 'left' );
	}
	
	// 绝对距离+相对位置就是目标元素的位置    
	target.animate({                
		top : sOffset.top - tOffset.top + parseInt( top ) + 'px',
		left : sOffset.left - tOffset.left + parseInt( left ) + 'px'
	});               
}

