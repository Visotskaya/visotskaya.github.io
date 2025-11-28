$(window).on('load', function () {
  AOS.init({
    duration: 750
  });
});
//timer
if (($("#timer")).length != 0) {
  function updateTimer() {
    future = Date.parse("May 1, 2018 00:00:00");
    now = new Date();
    diff = future - now;
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);
    if (days < 0) {
      document.getElementById("timer")
        .innerHTML =
        '<div class="timer__number-container">' +
        '<span class="timer__number-title">Days</span>' +
        '<span class="timer__digit">' + 0 + '</span>' +
        '<span class="timer__digit">' + 0 + '</span>' +
        '</div>' +
        '<span class="timer__colon">:</span>' +
        '<div class="timer__number-container">' +
        '</span>' + '<span class="timer__number-title">Hours</span>' +
        '<span class="timer__digit">' + 0 + '</span>' +
        '<span class="timer__digit">' + 0 +
        '</div>' +
        '<span class="timer__colon">:</span>' +
        '<div class="timer__number-container">' +
        '<span class="timer__number-title">Minutes</span>' +
        '<span class="timer__digit">' + 0 + '</span>' +
        '<span class="timer__digit">' + 0 + '</span>' +
        '</div>' +
        '<span class="timer__colon">:</span>' +
        '<div class="timer__number-container">' +
        '<span class="timer__number-title">Seconds</span>' +
        '<span class="timer__digit">' + 0 + '</span>' +
        '<span class="timer__digit">' + 0 + '</span>' +

        '</div>';
      return;
    }
    function parseNumbers(number) {
      if (number / 10 > 1) {
        return {
          decades: (number).toString()[0],
          units: (number).toString()[1]
        };
      } else {
        return {
          decades: 0,
          units: (number).toString()[0]
        };
      }
    }

    d = parseNumbers(days);
    h = parseNumbers(hours - days * 24);
    m = parseNumbers(mins - hours * 60);
    s = parseNumbers(secs - mins * 60);
    document.getElementById("timer")
      .innerHTML =
      '<div class="timer__number-container">' +
      '<span class="timer__number-title">Days</span>' +
      '<span class="timer__digit">' + d.decades + '</span>' +
      '<span class="timer__digit">' + d.units + '</span>' +
      '</div>' +
      '<span class="timer__colon">:</span>' +
      '<div class="timer__number-container">' +
      '</span>' + '<span class="timer__number-title">Hours</span>' +
      '<span class="timer__digit">' + h.decades + '</span>' +
      '<span class="timer__digit">' + h.units +
      '</div>' +
      '<span class="timer__colon">:</span>' +
      '<div class="timer__number-container">' +
      '<span class="timer__number-title">Minutes</span>' +
      '<span class="timer__digit">' + m.decades + '</span>' +
      '<span class="timer__digit">' + m.units + '</span>' +
      '</div>' +
      '<span class="timer__colon">:</span>' +
      '<div class="timer__number-container">' +
      '<span class="timer__number-title">Seconds</span>' +
      '<span class="timer__digit">' + s.decades + '</span>' +
      '<span class="timer__digit">' + s.units + '</span>' +
      '</div>';
  }
  setInterval('updateTimer()', 1000);
}

$(document).ready(function(){
    $('.btn-menu').on('click', function () {
        $(this).toggleClass('open');
        $('.header-nav').toggleClass('open').fadeToggle();
        $('body').toggleClass('menu-open');
    });

    var markerFirstScroll = true;

    $('.scroll-page').on('click', function (e) {
        e.preventDefault();
        var body = $('html, body');
        var $target = $($(this).attr('href'));
        if ($target.length) {
            $('html, body').animate({
                'scrollTop': $target.offset().top - $('header').outerHeight()
            }, {duration:500}
            );
        }
        markerFirstScroll = false;
        return false;
    });
    function onScroll(e) {
        var scrollPos = $(document).scrollTop();
        if (scrollPos > $('header').height()/2) {
            if (!$('header').hasClass('scroll')) $('header').addClass('scroll');
        } else {
            if ($('header').hasClass('scroll')) $('header').removeClass('scroll');
        }
    }

    onScroll();
    $(document).on("scroll", onScroll);
});
