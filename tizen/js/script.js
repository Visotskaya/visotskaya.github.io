$(document).ready(function () {

	$("body").queryLoader2({
		barColor: "#2285cb",
		backgroundColor: "#ebeaf1",
		percentage: true,
		barHeight: 1,
		completeAnimation: "grow",
		minimumTime: 100,
		onComplete: function () {
			$('#loading_overlay').remove();
		}
	});

	$('.box-slider-game').bxSlider({
        mode:'fade',
        pager:'true',
        controls:false,
        pagerSelector:'.box-page',
        onSliderLoad: function(){
            $('.box-slider-game .slider-game').css('z-index','');
        },
        onSlideAfter: function(){
            $('.box-slider-game .slider-game').css('z-index','');
        }

    });

    $('#lazy_load').remove();
	$('#loading_overlay').remove();

	init_subscription();


    function show_scrollTop() {

        $('#detail-one').css('top',550-$(window).scrollTop()/4+'px');
        $('#detail-two').css('top',450-$(window).scrollTop()/6+'px');
        if($(window).scrollTop()>420){
            $('#slider-game .box-page').css('z-index','50');
         }else $('#slider-game .box-page').css('z-index','57');
        if($(window).scrollTop()>1380){
            $('#slide2 .content_holder .box-btn').css('z-index','55');
        }else $('#slide2 .content_holder .box-btn').css('z-index','57');
        if($(window).scrollTop()>1550){
            $('#slide2 .content_holder .box-btn').css('display','none');
        }else $('#slide2 .content_holder .box-btn').css('display','block');
        if($(window).scrollTop()>1600){
            $('#slide2 .content_holder .box-events').css('z-index','55');
        }else $('#slide2 .content_holder .box-events').css('z-index','57');

    }

    $(window).scroll(function () {
        show_scrollTop();
    });
    function home_parallax() {
        $(window).scroll(function() {
            var yPos = -($(window).scrollTop() / 2);

            // Put together our final background position
            var coords =  yPos + 'px';

            // Move the background
            //$('.page-title-wrapper').css({ backgroundPosition: coords });
            $('.home-parallax').css({ backgroundPositionY: coords });

        });
    }

    home_parallax();
    $(window).bind('load', function () {
        parallaxInit();
    });

    function parallaxInit() {
        testMobile = isMobile.any();

        if (testMobile == null)
        {
            $('#inform').parallax('none',0.1);
            $('#detail-clock').parallax('none',0.7);
            $('#detail-one').parallax('none',1);
            $('#detail-two').parallax('none',0.1);

        }
    }

	var mygame = new game();
	mygame.init();


})




function init_subscription() {
	$('.do_subs').on('click', function (){
		$('#subscribe_input').focus();
	})
}
/*----------------------------------------------------*/
/* MOBILE DETECT FUNCTION
 /*----------------------------------------------------*/

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
$(document).ready(function () {
    var s = skrollr.init();
})