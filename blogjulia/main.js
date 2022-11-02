var wheel = document.querySelector('.wheel-img');
var resultWrapper = document.querySelector('.spin-result-wrapper');

// запускаем колесо по клику
$('.cursor-text').click(function () {
	$('.cursor-text').css('pointer-events', 'none');
	if (wheel.classList.contains('rotated')) {
		resultWrapper.style.display = "block";
	} else {
		wheel.classList.add('super-rotation');
		setTimeout(function () {
			resultWrapper.style.display = "block";
		}, 8000);
		setTimeout(function () {
			$('.spin-wrapper').slideUp();
			$('.order_block').slideDown();
			start_timer();
		}, 10000);
		wheel.classList.add('rotated');
	}
});

$('.pop-up-button').click(function (e) {
	e.preventDefault();
	$('.spin-result-wrapper').fadeOut();
	var top = $('#toForm').offset().top;
	$('body,html').animate({
		scrollTop: top
	}, 800);
});


$(function () {
	$('a').not('#cert, .pop-up-button').click(function () { // ".scrollto" - class on links
		$("html, body").animate({
			scrollTop: $('#toForm').offset().top // "#order_form0" block where animation scrolls
		}, 800);
	});
});


var time = 600;
var intr;

function start_timer() {
	intr = setInterval(tick, 1000);
}

function tick() {
	time = time - 1;
	var mins = Math.floor(time / 60);
	var secs = time - mins * 60;
	if (mins == 0 && secs == 0) {
		clearInterval(intr);
	}
	secs = secs >= 10 ? secs : "0" + secs;
	mins = mins >= 10 ? mins : "0" + mins;
	$("#min").html(mins);
	$("#sec").html(secs);
}