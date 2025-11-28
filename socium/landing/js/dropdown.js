/*dropdown*/
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