/*
 * ����ĸ��дת��
 * @param { String } Ҫת�����ַ���
 * @return { String } ת������ַ��� top => Top
 */    
function capitalize( str ){
	var firstStr = str.charAt(0);
	return firstStr.toUpperCase() + str.replace( firstStr, '' );
}
		

/*    
 * ��ȡ��קԪ������ڰ���Ԫ�ص��������ҵı߽�ֵ
 * �����קԪ����fixed��λ���������Ԫ���Զ����óɵ�ǰ����
 * @param { jQuery Object } ����Ԫ��
 * @param { jQuery Object } ��קԪ��
 * @return { Object } �������������ҵı߽�ֵ�Ķ���
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
	
	// ���Ծ���+���λ�þ��Ǳ߽��λ��
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
 * ��ȡԪ����������position���侫ȷ�Ķ�λֵ
 * @param { jQuery Object } 
 * @return { String } ��λ��������
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

	// top��left
	return offset + 'px';       
}

 /*    
 * ��ԴԪ�ص�λ�ø��Ƹ�Ŀ��Ԫ�أ���������Ԫ�صĶ�λ��ʽ�Ƿ���ͬ
 * �÷������ڴ�����קʱ������Ԫ�غ���קԪ��֮���λ�ø���
 * @param { jQuery Object } ԴԪ��
 * @param { jQuery Object } Ŀ��Ԫ��
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
	
	// ���Ծ���+���λ�þ���Ŀ��Ԫ�ص�λ��    
	target.animate({                
		top : sOffset.top - tOffset.top + parseInt( top ) + 'px',
		left : sOffset.left - tOffset.left + parseInt( left ) + 'px'
	});               
}

