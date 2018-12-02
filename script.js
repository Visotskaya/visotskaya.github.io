$(document).ready(function () {
    $('.next-step').on('click', function () {
        var parentStep= $(this).parentsUntil('.item-step').parent('.item-step');
        parentStep.removeClass('active');
        $('.' + $(this).data('step')).addClass('active');
        if ($(this).data('step')=='step-two'){
            $('.item-present').removeClass('open');
        }
        if ($(this).data('step')=='step-three'){
            $('.item-present').addClass('hover');
        }

    });
    $('.item-present').on('click', function () {
        if ($(this).hasClass('hover')){
            $('.item-present').removeClass('open');
            $(this).addClass('open');
        }
    });
    $('.btn-filter,.for-men').on('click', function () {
        if (!$(this).hasClass('active')){
            $(this).parent().find('a').removeClass('active');
            $(this).addClass('active');
        }
    });
    function hideScroll(){
        if ($(window).width()<=1024){
            $(".box-scroll").getNiceScroll().remove();
            $(".box-scroll").addClass('normal');
        } else{
            initScroll();
            $(".box-scroll").removeClass('normal');
        }
    }
    $(window).on("load resize", function () {
            hideScroll();
    });
    function initScroll(){
        $(".box-scroll").niceScroll({
            background: "#f1f1ef",
            cursorborder: '0',
            scrollspeed: 30,
            cursorcolor: "#D4D2CE",
            mousescrollstep: 60,
            cursoropacitymin: 0.5,
            zindex: 101,
            cursorwidth: '5px'
        });
    }
    if ($('.modal').hasClass('open')) {
        $('.modal.open').show();
        $('body').addClass('modal-open');
        $(".box-scroll").getNiceScroll().resize();
    }
    $('.open-modal').on('click', function () {
        $('.modal').hide();
        var idForm = $(this).attr('href');
        $(idForm).fadeIn(400).addClass('open');
        $('body').addClass('modal-open');
        setTimeout(function () {
            if ($(window).width()>1024){
                $(".box-scroll").getNiceScroll().show();
                $(".box-scroll").getNiceScroll().resize();
            }
            $('.slide-center').slick("refresh");
        }, 500);
        return false;
    });
    $('.modal .close-modal').on('click', function () {
        $(this).parentsUntil('.modal').parent('.modal').fadeOut(250).removeClass('open');
        $('body').removeClass('modal-open');
        $(".box-scroll").getNiceScroll().hide();
    });
    $('.modal .modal-bg').on('click', function () {
        $(this).parent('.modal').fadeOut(500).removeClass('open');
        $('body').removeClass('modal-open');
        $(".box-scroll").getNiceScroll().hide();
    });
    $('.slide-center').slick({
        centerMode: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    });
    $("body").queryLoader2({
        barColor: "#e02b15",
        backgroundColor: "#efefef",
        percentage: true,
        barHeight: 1,
        completeAnimation: "grow",
        minimumTime: 100,
        onComplete: function () {
            $('#loading_overlay').remove();
        }
    });
    CountBox();
});
function CountBox() {
    dateFuture= new Date(2017, 1, 23, 0, 0, 0, 0);
    dateNow = new Date();
    amount = ((23 - dateNow.getHours())*60*60 + (59 - dateNow.getMinutes())*60 + (60 - dateNow.getSeconds()))*1000;
    delete dateNow;
    if (amount < 0) {
        out = "<div id='countbox-days'><span></span>0<div id='countbox-days-text'></div></div>" + "<div id='countbox-hours'><span></span>0<div id='countbox-hours-text'></div></div>" + "<div id='countbox-mins'><span></span>0<div id='countbox-mins-text'></div></div>" + "<div id='countbox-secs'><span></span>0<div id='countbox-secs-text'></div></div>";
        document.getElementById("countbox").innerHTML = out;
        setTimeout("CountBox()", 10000)
    } else {
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
        out = "<div id='countbox-days'><span></span>" + days + "<div id='countbox-days-text'></div></div>" + "<div id='countbox-hours'><span></span>" + hours + "<div id='countbox-hours-text'></div></div>" + "<div id='countbox-mins'><span></span>" + mins + "<div id='countbox-mins-text'></div></div>" + "<div id='countbox-secs'><span></span>" + secs + "<div id='countbox-secs-text'></div></div>";
        document.getElementById("countbox").innerHTML = out;
        setTimeout("CountBox()", 1e3)
    }
}