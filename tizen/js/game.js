var game = function () {
	var me = this;
	var step_completed = false;

	me.init = function () {

		me.init_next_step();
		me.init_code_runner();
		me.init_last_step_click_handler();
	};

	me.slide_to = function(id) {
		var me = $('.game_slide.current');
		var next = $('#' +  id);
		var delta = 960 + 200;
		next.css('left', delta +'px');
		next.show();

		me.animate({left: '-' + delta +'px'}, 750);
		next.animate({left: '0px'}, 750);
		me.removeClass('current');
		next.addClass('current');
		$('.code').removeClass('colored');
		$('.c_game_bg').removeClass('intro');
		if (id == 'game_slide4') $('.c_game_bg').addClass('subscribe');
	}

	me.init_next_step = function () {
		$('.switch_slide').on('click', function () {
			var target = $(this).data('target');

			if (target != 'game_slide1') {

				if (!me.step_completed) {
					alert('bad code');
					return false;
				}
			}

			me.slide_to($(this).data('target'));
		})
	}

	me.init_code_runner = function () {
		$('#run_code1').on('click', function () {
			var ethalon = '<img id="cat" src="cat.jpg">';
			me.run_code(1, ethalon);
		});

		$('#run_code2').on('click', function () {
			var ethalon = '<audio id="purr" src="cat.wav">';
			me.run_code(2, ethalon);
		});

		$('#run_code3').on('click', function () {
			var ethalon = "cat.addEventListener('click', function () {";
			me.run_code(3, ethalon);
		})

	}


	me.run_code = function (step, ethalon) {
		var code = $('.game_slide.current').find('input[name="code"]').val();


		$('#no_code_err' + step).hide();
		$('#bad_code_err' + step).hide();

		if (code == '') {
			$('#no_code_err' + step).fadeIn();
			$('.code').removeClass('colored');
			$('#good_code' + step).fadeOut();

			me.run_bad_code(step);
			return;
		}


		$('.game_slide.current').find('.switch_slide').hide();

		if (me.good_code(code, ethalon)) {
			me.run_good_code(step);

			$('.code').addClass('colored');
			$('#good_code' + step).fadeIn();
			me.step_completed = true;
			$('.game_slide.current').find('.switch_slide').fadeIn();

			return true;
		}

		$('#bad_code_err' + step).fadeIn();
		$('.code').removeClass('colored');
		$('#good_code' + step).fadeOut();

		me.run_bad_code(step);
		me.step_completed = false;

	}

	me.run_good_code = function (step) {
		if (step == 1) {
			$('#game1_cat').fadeIn();
			return;
		}

		if (step == 2) {
			me.playSound();
		}

		if (step == 3) {

			$('#hand_code3').show();
			$('#hand_code3').addClass('animate')
			setTimeout(function() {
				$('#hand_code3').removeClass('animate');
			}, 350);
		}
	}

	me.run_bad_code = function (step) {
		if (step == 1) {
			$('#game1_cat').fadeOut();
			return;
		}
		if (step == 3) {
			$('#hand_code3').hide();
		}


	}


	me.init_last_step_click_handler = function () {
		$('.step3_cat').on('click', function () {
			console.log('zxc');
			console.log(me.step_completed);
			console.log($('#good_code3:visible').length);
			if (me.step_completed && $('#good_code3:visible').length > 0) {
				console.log('ok');
				me.playSound();
			}

		})
	}

	me.clean_code = function (str) {
		str = str.replace(/\s/g, '');
		str = str.replace(/'/g, '"');
		str = str.toLowerCase();
		return str;
	}

	me.good_code = function (code, ethalon) {
		code = me.clean_code(code);
		ethalon = me.clean_code(ethalon);
		if (code == ethalon) return true;
		return false;
	}

	me.playSound = function () {
		var el = $('#player');
		var soundfile = $('#player').data('sound');
		if (el.mp3) {
			if (el.mp3.paused) el.mp3.play();
			else el.mp3.pause();
		} else {
			el.mp3 = new Audio(soundfile);
			el.mp3.play();
		}

	}

};
