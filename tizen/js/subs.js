function getToken(token) {
	$("#token").val(token);
}
jQuery(function () {
//DO NOT TOUCH THIS CODE. THIS IS USER TIMEOFFSET FOR CALL CENTER
	x = new Date();
	$("#timeoffset").val(-x.getTimezoneOffset() / 60);
	$(window).bind('message', function (e) {
		var data = e['data'] || e.originalEvent.data;
		var json = JSON.parse(data);
		if (json["SubscribeResult"] > 0) {
			$('#subs_form').remove();
			$('#good_res').fadeIn();
		}
		else {
			alert('Произошла ошибка, попробуйте еще раз.');
			$('#subs_form_btn').removeClass('disabled');
		}
	});
});

$('#subs_form_btn').on('click', function() {
	if ($(this).hasClass('disabled')) return false;

	$('span.error').text('');
	var hasErr = false;
	if ($.trim( $('#inp_name').val() ) == '') {
		$('span[for="inp_name"]').text('Необходимо заполнить поле «Имя».');
		hasErr = true;
	}
	if ($.trim( $('#inp_lastname').val() ) == '') {
		$('span[for="inp_lastname"]').text('Необходимо заполнить поле «Фамилия».');
		hasErr = true;
	}
	if ($.trim( $('#inp_email').val() ) == '') {
		$('span[for="inp_email"]').text('Необходимо заполнить поле «Email».');
		hasErr = true;
	}
	else if (!validEmail( $('#inp_email').val() ) ) {
		$('span[for="inp_email"]').text('Введите корректный email');
		hasErr = true;
	}

	if (hasErr) return false;


	$('#subs_form').submit();
	$('#subs_form_btn').addClass('disabled');

})

function validEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}