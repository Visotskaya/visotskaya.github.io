$(window).on('load', function () {
    $('.preloader').delay(200).fadeOut().remove();
    AOS.init();
});
$(document).ready(function () {
    $('.btn-menu').on('click', function () {
        $(this).toggleClass('open');
        $('.navbar-collapse').toggleClass('open').slideToggle();
    });
    $(".getting-started").countdown('2018/02/01 12:00:00', function (event) {
        var $this = $(this).html(event.strftime('' + '<span class="number">%D</span>:' + '<span class="number">%H</span>:' + '<span class="number">%M</span>:' + '<span class="number">%S</span>'));
    });
    $('.question').on('click', function () {
        $(this).toggleClass('open').next('.answer').toggleClass('open').slideToggle();
    });
    $('.scroll-page').on('click', function (e) {
        e.preventDefault();
        var body = $('html, body');
        var $target = $($(this).attr('href'));
        if ($target.length) {
            $('html, body').animate({
                'scrollTop': $target.offset().top - $('header').outerHeight()
            }, 500);
        }
        return false;
    });

    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
            datasets: [{
                label: "",
                backgroundColor: ["#204da1","#1171bd","#019edd","#ecf0f3"],
                data: [15,15,10,60],
                borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
                borderWidth: 10
            }],
            labels: ["Marketing","Reserve","Team","Public"],
        },
        options: {
            showAllTooltips: true,
            title: {display: true, text: ''},
            tooltips: {enabled: true},
            legend: {display: false},
            cutoutPercentage: 65
        }
    });

    $('body').on('click', '.href-dropdown', function () {
        if (!$(this).parent().hasClass('open')) {
            $('body').find('.menu-dropdown').hide().parent().removeClass('open');
            $(this).next('.menu-dropdown').fadeToggle();
            $(this).parent().addClass('open');
        } else {
            $(this).parent().removeClass('open');
            $(this).next('.menu-dropdown').hide();
        }
    });

    $('body').on('click', '.menu-dropdown a', function () {
        if (!$(this).hasClass('active')) {
            $(this).parent().parent('.dropdown').find('.change-value').html($(this).html());
            $(this).parent().find('a').removeClass('active');
            $(this).addClass('active');
        }
        $(this).parent().hide().parent('.dropdown').removeClass('open');
    });
    $(document).click( function(event){
        if( $(event.target).closest(".menu-dropdown").length||$(event.target).closest(".href-dropdown").length)
            return;
        $(".menu-dropdown").css('display','none');
        if ($(".menu-dropdown").parent().hasClass('open')) {
            $(".menu-dropdown").parent().removeClass('open');
        }
    });


    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        if (scrollPos > $('header').height()) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
        if (scrollPos > 200) {
            $('#earth').addClass('transform');
        } else{
            $('#earth').removeClass('transform');
        }
        //console.log(scrollPos);
    }
    onScroll();
    $(document).on("scroll", onScroll);
});