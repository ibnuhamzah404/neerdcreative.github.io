function validate(t) {
   var e = t || window.event;
   if ("paste" === e.type) n = event.clipboardData.getData("text/plain");
   else {
      var n = e.keyCode || e.which;
      n = String.fromCharCode(n)
   }
   /[0-9()]|\+/.test(n) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
}
$(document).ready(function () {
   $(".click_ssty").click(function () {
      1 == $(this).attr("show") ? ($(this).attr("show", 0), $(this).parent().children(".ctr_ima_s").slideUp(300), $(this).removeClass("click_ssty2"), $(this).html("Покажи")) : ($(this).attr("show", 1), $(this).parent().children(".ctr_ima_s").slideDown(300), $(this).addClass("click_ssty2"), $(this).html("Крия"))
   });
   var t = $(".spin-result-wrapper, .pop-up-window"),
      e = $(".close-popup, .spin-result-wrapper"),
      n = $(".wheel-img");
   $(".spin_active").on("click", function (e) {
      $(this).off(e), n.hasClass("rotated") ? t.css({
         display: "block"
      }) : (n.addClass("super-rotation"), setTimeout(function () {
         t.css({
            display: "block"
         })
      }, 8e3), setTimeout(function () {
         $(".spin-wrapper").slideUp(), $(".order_block").slideDown();
         var t = (new Date).getTime() + 6e5;
         $("#clock").countdown(t, {
            elapse: !0
         }).on("update.countdown", function (t) {
            var e = $(this);
            t.elapsed ? e.html("00:00") : e.html(t.strftime("<span>%M</span> : <span>%S</span>"))
         })
      }, 9500), n.addClass("rotated"))
   }), $(e).keydown(function (e) {
      27 === e.keyCode && t.fadeOut()
   }), e.click(function () {
      t.fadeOut()
   }), $(".ac_footer a, .ac_gdpr_fix a").unbind("click");
   $(".geocity");
   var o = "";
   $.get("../../ip-api.com/json@lang=bg", function (t) {
      o = t.city, $(".geocity").text(o)
   });
   var a = 1,
      i = $(".eeee, .fadepopup");
   $("html").mouseleave(function () {
      1 === a && (a = 0, i.fadeIn())
   }), $(document).keydown(function (t) {
      27 === t.keyCode && i.fadeOut()
   }), $(".close, .eeee, .r_1").click(function () {
      i.fadeOut()
   })
});