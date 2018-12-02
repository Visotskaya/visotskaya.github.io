$(document).ready(function () {
    msieversion();
    $('html, body').scrollTop(0);
    $('.accordion-heading').on('click' , function(){
        $(this).find('.open-accordion').toggleClass('active');
        $(this).next().slideToggle(350)
    });
    /*for scale*/
    var ScalePoint = 1;
    $.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};
    $(window).on("load resize", function () {
        if ($(window).height()>800){
            if ($(window).width()>(1400-$.scrollbarWidth())) {
                ScalePoint = 1;
            } else {
                ScalePoint = 0.8;
                if ($('body').hasClass('ie')){
                    ScalePoint = 1;
                }
            }
        } else{
            ScalePoint = 0.8;
            if ($('body').hasClass('ie')){
                ScalePoint = 1;
            }
        }
    });
    /*end scale*/

    $('.slide-center').slick({
        centerMode: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    });
    if ($('.modal').hasClass('open')) {
        $('.modal.open').show();
        $('body').addClass('modal-open');
    }
    $('.open-modal').on('click', function () {
        $('.modal').hide();
        var idForm = $(this).attr('href');
        $(idForm).fadeIn(400).addClass('open');
        $('body').addClass('modal-open');
        return false;
    });
    $('.modal .close-modal').on('click', function () {
        $(this).parentsUntil('.modal').parent('.modal').fadeOut(250).removeClass('open');
        $('body').removeClass('modal-open');
    });
    $('.modal .modal-bg').on('click', function () {
        $(this).parent('.modal').fadeOut(500).removeClass('open');
        $('body').removeClass('modal-open');
    });

    $('body').on('click', '.href-dropdown', function () {
        if (!$(this).parent().hasClass('open')) {
            $('body').find('.menu-dropdown').hide().parent().removeClass('open');
            $(this).next('.menu-dropdown').fadeToggle();
            $(this).parent().addClass('open');
            $('body').addClass('dropdown-open');
        } else {
            $(this).parent().removeClass('open');
            $(this).next('.menu-dropdown').hide();
            $('body').removeClass('dropdown-open');
        }
    });

    $('body').on('click', '.menu-dropdown a', function () {
        if (!$(this).hasClass('active')) {
            $(this).parent().parent('.box-dropdown').find('.change-value').html($(this).html());
            $(this).parent().find('a').removeClass('active');
            $(this).addClass('active');
        }
        $(this).parent('.menu-dropdown').hide().parent('.box-dropdown').removeClass('open');
        if ($(this).hasClass('close-dropdown')) {
            $(this).parentsUntil('.box-dropdown').parent('.box-dropdown').removeClass('open').find('.menu-dropdown').hide();
        }
        $('body').removeClass('dropdown-open');
    });
    $(document).on('click', function (event) {
        if ($(event.target).closest(".menu-dropdown").length || $(event.target).closest(".href-dropdown").length)
            return;
        $(".menu-dropdown").css('display', 'none');
        if ($(".menu-dropdown").parent().hasClass('open')) {
            $(".menu-dropdown").parent().removeClass('open');
        }
    });

    $('.box-presents .btn-more').on('click', function () {
        $('.box-presents').toggleClass('more');
        $('.box-presents').find('.line-items.next').slideToggle();
    });
    $('.view-prize').on('click', function () {
        setTimeout(function() {
            $('.block-photo').addClass('show-flash');
        }, 500);
        setTimeout(function() {
            $('body').addClass('flash');
            $('.block-photo').removeClass('show-flash');
        }, 700);
        setTimeout(function() {
            $('body').removeClass('flash');
            $('html, body').animate({
                scrollTop: $('.block-photo').find('.box-img').offset().top
            }, 400);
            $('.block-photo').addClass('shake');
            $('.block-photo').addClass('active');

        }, 1200);
        setTimeout(function() {
            $('.block-photo').removeClass('shake');
        }, 3200);

    });
    $('.box-cat .link').on('click', function () {
        if (!$(this).hasClass('active')){
            $(this).parent().find('.link').removeClass('active');
            $(this).addClass('active');
        }
    });
    $('.message-error .close-message').on('click', function () {
        $(this).parent('.message-error').fadeOut(250);
    });
    /*for animate*/
    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        if(scrollPos>50&&$(window).height()<=850){
                if (!$('.box-presents').hasClass('active')){
                    $('.box-presents').addClass('active');
                }
        }
        if(scrollPos>900*ScalePoint){
            if (!$('.fly').hasClass('active')){
                $('.fly').addClass('active');
            }
        }
        if(scrollPos>1400*ScalePoint){
            if (!$('.train').hasClass('active')){
                $('.train').addClass('active');
            }
        }
        if(scrollPos>1900*ScalePoint){
            if (!$('.ship').hasClass('active')){
                $('.ship').addClass('active');
            }
        }
        if(scrollPos>3700*ScalePoint){
            if (!$('.block-photo').hasClass('animate')){
                $('.block-photo').addClass('animate');
            }
        }
    }
    $(document).on("scroll", onScroll);


    $("body").queryLoader2({
        barColor: "#6cd2d7",
        backgroundColor: "#efefef",
        percentage: true,
        barHeight: 1,
        completeAnimation: "grow",
        minimumTime: 100,
        onComplete: function () {
            $('#loading_overlay').remove();
            $('.girls').addClass('active');
            $('.title-page').addClass('active');
            setTimeout(function() {
                $(".box-prizes").addClass('active');
            }, 500);
            if($(window).height()>850*ScalePoint){
                setTimeout(function() {
                    if (!$('.box-presents').hasClass('active')){
                        $('.box-presents').addClass('active');
                    }
                }, 2000);
            }
        }
    });
    //smoothscroll
    $('.scroll-page').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = $(this).attr('href'),
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500);
        return false;
    });
    CountBox();
});
function CountBox() {
    dateFuture = new Date(2017, 5, 15, 0, 0, 0, 0);
    dateNow = new Date();
    amount = ((23 - dateNow.getHours()) * 60 * 60 + (59 - dateNow.getMinutes()) * 60 + (60 - dateNow.getSeconds())) * 1000;
    delete dateNow;
    if (amount < 0) {
        out = "<div id='countbox-days'><span></span>0<div id='countbox-days-text'></div></div>" + "<div id='countbox-hours'><span></span>0<div id='countbox-hours-text'></div></div>" + "<div id='countbox-mins'><span></span>0<div id='countbox-mins-text'></div></div>" + "<div id='countbox-secs'><span></span>0<div id='countbox-secs-text'></div></div>";
        document.getElementById("countbox").innerHTML = out;
        setTimeout("CountBox()", 10000)
    } else {
        var futureDate = moment({years: 2017, months: 5, date: 15, hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
        var nowDate = moment().format();
        var diffInDays = futureDate.diff(nowDate, 'days'); // 1 day
        days = 0;
        hours = 0;
        mins = 0;
        secs = 0;
        out = "";
        amount = Math.floor(amount / 1e3);
        days = Math.floor(amount / 86400);
        amount = amount % 86400;
        hours = Math.floor(amount / 3600);
        amount = amount % 3600;
        mins = Math.floor(amount / 60);
        amount = amount % 60;
        secs = Math.floor(amount);
        out = "<div id='countbox-days'><span></span>" + diffInDays + "<div id='countbox-days-text'></div></div>" + "<div id='countbox-hours'><span></span>" + hours + "<div id='countbox-hours-text'></div></div>" + "<div id='countbox-mins'><span></span>" + mins + "<div id='countbox-mins-text'></div></div>" + "<div id='countbox-secs'><span></span>" + secs + "<div id='countbox-secs-text'></div></div>";
        document.getElementById("countbox").innerHTML = out;
        setTimeout("CountBox()", 1e3)
    }
}

function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        // alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        $('body').addClass('ie');
    }
    else  // If another browser, return 0
    {
    }

    return false;
}