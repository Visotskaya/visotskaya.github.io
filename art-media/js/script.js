$(window).on('load', function () {
  $('.preloader .load').fadeOut();
  $('.preloader').delay(400).fadeOut().remove();
  AOS.init();
});

$(document).ready(function () {
    function onScroll(event){
        var scrollPos = $(document).scrollTop();

        if(scrollPos>$('header').outerHeight()){
            $('header,.block-join').addClass('scroll');
        } else{
            $('header,.block-join').removeClass('scroll');
        }
    }
    onScroll();
    $(document).on("scroll", onScroll);
    initScrollSpy();
    function initScrollSpy() {
        var animSelector = ".action-animate";
        var winH = $(window).height();
        var animSections = calculateSectionBreakdowns(animSelector, winH);

        //recalculate on resize
        $(window).on('resize', function () {
            winH = $(window).height();
            animSections = calculateSectionBreakdowns(animSelector, winH);
            animateVisibleSection();
        });

        //check the scroll pos
        $(document).scroll(animateVisibleSection);

        function animateVisibleSection() {
            var viewportTop = $(document).scrollTop();
            var viewportBot = viewportTop + winH;

            //get the last section to animate
            var showSection = null;
            for (var i in animSections) {
                var el = animSections[i];
                if (viewportTop <= el.showOn && el.showOn <= viewportBot) {
                    showSection = el;
                }
            }


            if (showSection) {
                //toggle currently active section
                if (!showSection.$el.hasClass('active')) {
                   // $(animSelector).removeClass('active');
                    showSection.$el.addClass('active');
                }
            } else {
               // $(animSelector).removeClass('active');
            }
        }

        function calculateSectionBreakdowns(animSelector, winH) {
            var animSections = [];

            $(animSelector).each(function () {
                var a = {};
                a.$el = $(this);
                a.h = a.$el.outerHeight();
                a.top = a.$el.offset().top;
                a.showOn = a.top + Math.round(a.h / 2);
                animSections.push(a);
            });
            return animSections;
        }
    }
    $('.honeycombs').honeycombs({
        combWidth:230,  // width of the hexagon
        margin: 5,		// spacing between hexagon
        threshold: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    combWidth:190
                }
            }
    ]
    });
    $('.nav-main a[href^="#"][href!="#"]').on('click', function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href'));
        var $parentHeight = 0;
        if ($(this).hasClass('nav-main')) $parentHeight = $(this).parent().outerHeight();
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - $('header').outerHeight() - $parentHeight
            }, 500);
        }
        return false;
    });
    $('body').scrollspy({target: '#navbar-scroll'});

    (function() {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function() {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function() {
                    return this.replace(rtrim, '');
                };
            })();
        }

        [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
            // in case the input is already filled..
            if( inputEl.value.trim() !== '' ) {
                classie.add( inputEl.parentNode, 'input--filled' );
            }

            // events:
            inputEl.addEventListener( 'focus', onInputFocus );
            inputEl.addEventListener( 'blur', onInputBlur );
        } );

        function onInputFocus( ev ) {
            classie.add( ev.target.parentNode, 'input--filled' );
        }

        function onInputBlur( ev ) {
            if( ev.target.value.trim() === '' ) {
                classie.remove( ev.target.parentNode, 'input--filled' );
            }
        }
    })();

    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });

        // Firefox bug fix
        input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
        input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    $('.slider-history').on('init', function ($sl) {
        $('.slider-history .slick-prev.slick-arrow').hide();
    });
    $('.slider-history').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        initialSlide:0,
        slidesToScroll: 2,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1170,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 720,
                settings: {
                    initialSlide: 0,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: false
                }
            }
        ]

    });

    $('.slider-history').on('beforeChange', function ($sl, cur, sl, next) {
        if (next <= 1) {
            $('.slick-prev.slick-arrow').hide();
        } else {
            $('.slick-prev.slick-arrow').show();
        }
    });
});