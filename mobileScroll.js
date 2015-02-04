/*
Plugin: MobileScroll
Author: Davide Calignano
*/

(function ( $ ) {

	$.fn.mobileScroll = function( options ) {

		//Options
		var settings = $.extend({	
			glimpse: 	0,
			maxwidth: 	768,
			height: 	400,
			speed: 		200
		}, options );
		

		$(this).each(function(){
			//Vars
			var that 		= this;
			var $s 			= $(this);
			var $scroller 	= $s.children('.mobile-scroll-er');
			var $wrap 		= $scroller.children('.mobile-scroll-wrap');
			var $slide 		= $wrap.children();
			that.w 			= $s.width();
			that.nSlide 	= $slide.length;

			//Adjust width 
			if( that.w > settings.maxwidth ) that.w = settings.maxwidth;		

			//Apply width
			$wrap.css('width', (that.w-settings.glimpse)*that.nSlide);
			$slide.css({
				'width': 	that.w-settings.glimpse,
				'height': 	settings.height 
			});

			//Add class after dom manipolation
			$s.addClass('ready');

			//Buttons events
			$s.children('.arrow').on('touchstart, click', function(){
				scrollSlide($(this).data('arrow'), $scroller, that.w);
				return false;
			});

		});


		var scrollSlide = function(direction, swipe, w){
			var nslide 		= swipe.nSlide;
			var position 	= swipe.scrollLeft();
			var item 		= w-settings.glimpse;

			if(direction == 'prev'){
				var newPosition = ((position/(item))*(item))%(item)
				var moveTo 		= position-(newPosition)

				if(position%(item)==0){
					moveTo 		= moveTo - (item)
				}
			}else{
				var newPosition	= ((position/(item))*(item))%(item)
				var moveTo 		= (position-(newPosition))+(item)
			}

			//Animate
			swipe.animate({	scrollLeft: moveTo }, settings.speed);
		}
	};
}( jQuery ));

