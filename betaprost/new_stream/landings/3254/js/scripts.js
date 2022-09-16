$(document).ready(function () {
  $("[href*='#']").click(function (e) {
    e.preventDefault();
    $([document.documentElement, document.body]).animate({
      scrollTop: $($(this).attr("href")).offset().top
    }, 1200);
  });

  start_timer();
});

// let prodLeft = [2, 3, 4, 6, 7, 8, 9, 9, 11, 11, 12, 14, 14, 15, 15, 16, 16, 16, 17, 17, 18, 18];

var time = 900;
var intr;

function pad(num) {
  return ("0" + num).substr(-2);
}

function start_timer() {
  intr = setInterval(tick, 1000);
}

function tick() {
  if (localStorage.vietnam43) {
    if (localStorage.vietnam43 <= 0) {
      time = 59;
    } else {
      time = localStorage.vietnam43;
    }

  } else {
    time = 900;
  }
  time = time - 1;
  localStorage.vietnam43 = time;

  var mins = Math.floor(time / 60) % 60;
  var secs = time - mins * 60;
  var hours = Math.floor(time / 3600);
  if (mins == 0 && secs == 0) {
    clearInterval(intr);
  }

  // $(".timer .hours").html(pad(hours));
  $(".timer .minutes").html(pad(mins));
  $(".timer .seconds").html(pad(secs));

  localStorage.vietnam43 = time;
}

let prodLeft = [2, 3, 4, 6, 7, 8, 9, 9, 11, 11, 12, 14, 14, 15, 15, 16, 16, 16, 17, 17, 18, 18];

function start_counting_timer(limitedSeconds) {
  let timeLeft = limitedSeconds;
  let secondsLeft, minutesLeft;
  let timerElement = document.querySelector('.timer');
  let count = setInterval(function () {
    if (timeLeft <= 0) {
      clearTimeout(count);
    } else {
      timeLeft--;
      let min = parseInt(timeLeft / 60);
      minutesLeft = min.toString();
      if (minutesLeft.length === 1) {
        minutesLeft = '0' + minutesLeft;
      }
      let sec = timeLeft % 60;
      secondsLeft = sec.toString();
      if (secondsLeft.length === 1) {
        secondsLeft = '0' + secondsLeft;
      }
      if (sec === 0) {
        document.querySelector('.prod_left_val').innerHTML = prodLeft[min];
      }
      timerElement.innerHTML = minutesLeft + ":" + secondsLeft;
    }
  }, 1000);

}

document.addEventListener('DOMContentLoaded', function () {
  let tstamp = window.localStorage.getItem('tstamp-l2xyg239');
  let limitedSeconds = 1278;
  let prodElement = document.querySelector('.prod_left_val');

  if (tstamp !== null) {
    let now = Math.round(new Date().getTime() / 1000);
    let then = tstamp;
    limitedSeconds = limitedSeconds - (now - then);
    let prod = Math.floor(limitedSeconds / 60);
    if (prod < 0) prod = 0;
    prodElement.innerHTML = prodLeft[prod];
  } else {
    tstamp = Math.round(new Date().getTime() / 1000);
    window.localStorage.setItem('tstamp-l2xyg239', tstamp);
    prodElement.innerHTML = 19;
  }

  start_counting_timer(limitedSeconds);

});

