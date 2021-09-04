var width = 0;
$(document).ready(function () {
 width = $(window).width();
})
$(window).scroll(function(){
 if (width > 991) {
     var $pos =  $("#scrollFixed").offset().top - $("body").offset().top;
     var $scroll = $(this).scrollTop()
     if($pos < $scroll){
         $(".slide").css({
             'position':'fixed',
             'top':'10px'
         })
     } else {
         $(".slide").css({
             'position':'relative'
         })
     }
 } else {
     $(".slide").css({
         'position':'relative'
     })
 }
})

$(window).resize(function () {
 width = $(window).width();
 var $pos =  $("#scrollFixed").offset().top - $("body").offset().top;
 var $scroll = $(this).scrollTop()
 if(width > 991) {
     if($pos < $scroll){
         $(".slide").css({
             'position':'fixed',
             'top':'10px'
         })
     } else {
         $(".slide").css({
             'position':'relative'
         })
     }
 } else {
     $(".slide").css({
         'position':'relative'
     })
 }
})