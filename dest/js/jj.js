$(document).ready(function () {
    $('.section').addClass('animate');
    var $surveyBox = $('#sWrap');
    var surveyDelay = 30; //in Seconds

    initSurveyBlock();

    function triggerScroll() {
        $(window).trigger('scroll').trigger('touchmove');
        $(document).trigger('scroll').trigger('touchmove'); //crossb

    }

    $(document).on('change', '#pure-toggle', function () {
        if ($('#pure-toggle').is(':checked')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    });


    if (window.location.hash) {
        $('.item-question.open').parents('.box-question').find('.body-question').hide();
        $('.item-question.open').removeClass('open');
        $(window.location.hash).find('.item-question').addClass('open');
        $(window.location.hash).find('.body-question').css('display', 'block');
    }

    triggerScroll();
    /*$(window).load(function () {

     if (window.location.hash) {
     var lhash = window.location.hash;
     if ($(lhash).length > 0) {
     var newH = $(lhash).offset().top - 115;  //115 - some magic constant here (height of the overlat menu)
     var animT = 550;
     $('html, body').animate({scrollTop: newH}, {
         duration: animT, complete: function () {
         triggerScroll();
         }
     });

     }
     }
     });*/
    initScrollSpy();
    triggerScroll();

    /*$(window).on('hashchange', function () {
     var lhash = window.location.hash;
     if ($(lhash).length > 0) {
     var newH = $(lhash).offset().top - 115;  //115 - some magic constant here (height of the overlat menu)
     var animT = 550;
     $('html, body').animate({scrollTop: newH}, {
     duration: animT, complete: function () {
     $(window).trigger('scroll').trigger('touchmove');
     $(document).trigger('scroll').trigger('touchmove'); //crossb
     window.location.hash = "";
     }
     }
     );

     }
     });*/


    $('#frameBox').on({
        'DOMMouseScroll mousewheel wheel': function (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    });


    //asd
    function initSurveyBlock() {
        /*var showSurveySrc = '<script src="//www.questionpro.com/javascript/embedsurvey.js?version=1"></script>';

         var timeOut = getSurveyTimeout();
         //console.log('got timeout: ' + timeOut);
         if (timeOut) {
         setTimeout(showSurveyBlock, timeOut);
         }

         function showSurveyBlock() {
         var sg_div = document.createElement("div");
         var ihml = "<img id='sCloseBtn' src='/media/5d418b77-1435-4339-90ab-c2db36bc72a1/JR3cvA/img/fileclose' class='clSurv'/><div class='inner'>";
         ihml += "<h1>You have been selected for a survey</h1>";
         ihml += "<p>We appreciate your feedback!</p>";
         ihml += "<a href=\"http://www.surveygizmo.com/s3/2691961/ecoPayz-website\" target='_blank'>Please click here start it now.</a>";
         ihml += "<a class='clSurv'>No, thank you.</a>";
         ihml += "</div>";
         sg_div.innerHTML = ihml;
         sg_div.id = "sg-popup";
         document.body.appendChild(sg_div);
         return;
         $('body').prepend(showSurveySrc);
         $surveyBox.fadeIn(350);
         }

         $(document).on('click', '.clSurv', function () {
         $('#sg-popup').fadeOut(350, function () {
         $('#sg-popup').remove();
         fireIntroAnims();
         })
         })
         $(document).on('click', '#sCloseBtn', function () {

         return;
         $surveyBox.fadeOut(350, function () {
         $surveyBox.remove();
         fireIntroAnims();
         })
         });




         function getSurveyTimeout() {
         if (typeof sessionStorage == "undefined") {
         return surveyDelay * 1000;
         }

         var sessionStartTime = sessionStorage.getItem('sessionStartTime');
         //console.log('got time from session:');
         //console.log(sessionStartTime);
         if (!sessionStartTime) {
         sessionStartTime = Math.round(Date.now() / 1000);
         try {
         sessionStorage.setItem('sessionStartTime', sessionStartTime);
         } catch (e) {
         }

         }
         var fireSurveyAt = parseInt(sessionStartTime) + parseInt(surveyDelay);
         var now = Math.round(Date.now() / 1000);
         var timeOut = parseInt(fireSurveyAt) - parseInt(now);
         //console.log('session start time: ' + sessionStartTime + ', fire survey at: ' + fireSurveyAt + ', now: ' + now + ', delay: ' + timeOut);
         if (timeOut < 0) return null;

         return timeOut * 1000;
         }*/
    }


    var introAnimFired = false;

    function fireIntroAnims() {
        if (introAnimFired) return;
        introAnimFired = true;
        $('.block-intro').addClass('animate');
    }

    function initScrollSpy() {
        var animSelector = ".section";
        var winH = $(window).height();
        var triggerIntroH = Math.round( $('.block-intro').height() );
        var animSections = calculateSectionBreakdowns(animSelector, winH);

        //recalculate on resize
        $(window).on('resize', function () {
            winH = $(window).height();
            animSections = calculateSectionBreakdowns(animSelector, winH);
            animateVisibleSection();
        });

        //fire intro slide anims
        if ($(document).scrollTop() <= triggerIntroH) {
            if (!$surveyBox.is(':visible')) fireIntroAnims();
        }

        //check the scroll pos
        $(document).scroll(animateVisibleSection);

        function animateVisibleSection() {
            var viewportTop = $(document).scrollTop();
            var viewportBot = viewportTop + winH;

            //fire intro slide anims
            if ($(document).scrollTop() <= triggerIntroH) {
                if (!$surveyBox.is(':visible')) fireIntroAnims();
                $(animSelector).removeClass('active');
            }

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
                    //$(animSelector).removeClass('active');
                    showSection.$el.addClass('active');
                } else{
                    showSection.$el.next(animSelector).removeClass('active');
                }
            } else {
                //$(animSelector).removeClass('active');

            }
        }

        $(window).load(function () {
            //console.log('inda load');
            winH = $(window).height();
            animSections = calculateSectionBreakdowns(animSelector, winH);
        })

        function calculateSectionBreakdowns(animSelector, winH) {
            var animSections = [];

            $(animSelector).each(function () {
                var a = {};
                a.$el = $(this);
                a.h = a.$el.outerHeight();
                a.top = a.$el.offset().top;
                if (a.$el.find('.box-animate-bottom').length > 0) {
                    var $anBl = a.$el.find('.box-animate-bottom')
                    a.showOn = $anBl.offset().top + Math.round($anBl.outerHeight() / 2);

                    //console.log('outerH:' + $anBl.outerHeight());
                    //console.log('show at: ' + a.showOn);
                } else {
                    a.showOn = a.top + Math.round(a.h / 2);
                }

                animSections.push(a);
            });
            return animSections;
        }
    }


});

