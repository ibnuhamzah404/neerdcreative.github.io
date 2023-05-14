var time = 600;
var intr;
var min = document.querySelector('.min');
var sec = document.querySelector('.sec');

function start_timer() {
   intr = setInterval(tick, 1000);
}

function tick() {

   if (localStorage.storageTime) {
      if (localStorage.storageTime <= 0) {
         time = 5;
      } else {
         time = localStorage.storageTime;
      }

   } else {
      time = 600;
   }
   time = time - 1;
   localStorage.storageTime = time;

   var mins = Math.floor(time / 60);
   var secs = time - mins * 60;
   if (mins == 0 && secs == 0) {
      clearInterval(intr);
   }
   secs = secs >= 10 ? secs : "0" + secs;

   min.innerHTML = "0" + mins;
   sec.innerHTML = secs;

   localStorage.storageTime = time;
}

start_timer()


$(function () {
   $('a').not('#cert').click(function () { // ".scrollto" - class on links
      $("html, body").animate({
         scrollTop: $('#buyForm').offset().top - 150 // "#order_form0" block where animation scrolls
      }, 1000);
   });
});