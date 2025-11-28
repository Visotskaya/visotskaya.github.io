$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#064cbe",
        backgroundColor: "#132033",
        percentage: true,
        barHeight: 3,
        minimumTime: 200,
        fadeOutTime: 1000
    });
    AOS.init({
        duration: 800,
        delay: 100
    });
    /*$(".getting-started").countdown('2018/05/01 12:00:00', function (event) {
        var $this = $(this).html(event.strftime('' + '<div class="date-number">%D <div class="date-title">Days</div></div>:' + '<div class="date-number">%H <div class="date-title">Hours</div></div>:' + '<div class="date-number">%M <div class="date-title">Minutes</div></div>:' + '<div class="date-number">%S <div class="date-title">Seconds</div></div>'));
    });*/
    $('.header-menu').on('click', function () {
        $(this).toggleClass('open');
        //$('#menu').toggleClass('open').fadeToggle();
        $('body').toggleClass('menu-open');
    });
    function onScroll(e) {
        var scrollPos = $(document).scrollTop();
        if (scrollPos > 0) {
            if (!$('header').hasClass('scroll')) $('header').addClass('scroll');
        } else {
            if ($('header').hasClass('scroll')) $('header').removeClass('scroll');
        }
    }

    onScroll();
    $(document).on("scroll", onScroll);

    //$('.header').midnight();

    $(document).on('click', '[data-dismiss^=modal]', function() {
        if ($('body').hasClass('menu-open'))  $('body').removeClass('menu-open');
        if ($('.header-menu').hasClass('open'))  $('.header-menu').removeClass('open');
    });

    $(document).on('click', '.close', function() {
        $(".modal-video iframe").each(function () {
            $(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        });
    });
    $(document).on('click', '.toggle-open', function() {
        $(this).toggleClass('open').next($(this).data('toggle-next')).slideToggle();
    });
    $(document).on('click', '.toggle-nav', function() {
        $(this).toggleClass('open').next().fadeToggle();
    });

    /*var marquee = $(".currencies-scroll");
    var marqueeWidth = marquee.width()*2;
    marquee.css({"overflow": "hidden", "width": "100%"});
    marquee.wrapInner("<span class='currencies-line'>");
    marquee.find(".currencies-line").css({ "width": "50%", "display": "inline-block", "text-align":"center" });
    marquee.append(marquee.find(".currencies-line").clone()); // тут у нас два span с текстом
    marquee.wrapInner("<div class='currencies-content'>");
    marquee.find(".currencies-content").css("width", marqueeWidth);
    var reset = function() {
        $(this).css("margin-left", "0%");
        $(this).animate({ "margin-left": "-100%" }, 12000, 'linear', reset);
    };
    reset.call(marquee.find(".currencies-content"));*/

    $('.autoplay').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        arrows:false,
        autoplaySpeed: 0,
        infinite: true,
        speed: 5000,
        cssEase: 'linear',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 3
          }
        }

      ]
    });
    $('.autoplay2').slick({
        slidesToShow: 11,
        slidesToScroll: 1,
        autoplay: true,
        arrows:false,
        autoplaySpeed: 0,
        infinite: true,
        speed: 5000,
        cssEase: 'linear',
        rtl: true,
        responsive: [
            {
                breakpoint: 2600,
                settings: {
                    slidesToShow: 9
                }
            },
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 8
                }
            },
            {
                breakpoint:1380,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint:1024,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint:1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 340,
                settings: {
                    slidesToShow: 1.5
                }
            }

        ]
    });

});
