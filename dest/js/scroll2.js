$(document).ready(function(){
    var lastScrollTop = 0;
    if (!$('.section:first-child').hasClass('active')) $('.section:first-child').addClass('active');
    function onScrollSection(e) {
        var scrollPos = $(document).scrollTop();
        if ($('div').is('.section.active')){
             if(scrollPos < lastScrollTop ) {
                 //console.log('up');
                 var target = $('.section.active').prev('.section');
                 if (target.length>0){
                     if (scrollPos<target.offset().top+$('header').outerHeight()){
                        $('.section.active').removeClass('active').prev('.section').addClass('active');
                     }
                 }
             }
            else {
                //console.log('down');
                 var target = $('.section.active').next('.section');
                 if (scrollPos>$('.section.active').offset().top){
                     $('.section.active').removeClass('active').next('.section').addClass('active');
                     $('html, body').animate({
                        'scrollTop': calcTop(target) - $('header').outerHeight()
                     }, 500);
                 }
             }
         }
        lastScrollTop = scrollPos;
    }
    function calcTop(el) {
        var position = el.offset().top;
        if (el.innerHeight()<$(window).height()){
            position = position - ($(window).height()-$('header').height()-el.innerHeight())/2;
        }
        return position;
    }
    $(document).on("scroll", onScrollSection);
});