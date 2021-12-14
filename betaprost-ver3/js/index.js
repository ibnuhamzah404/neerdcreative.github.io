
function enter() {
  $("#mcont").show();
  $("#overlay").fadeOut(1000);
  $("#warn").fadeOut(1000);
}

$(document).ready(function(){
  $("#starttest").click(function(){
    $("#starttest").hide();
    
    nextq();
  });
  
  $("#next").click(nextq);
  
/*  window.onscroll = onWndScroll;
  //showres();

var scrolled = false;
function onWndScroll() {
  if( $(window).scrollTop() > 1300 && !scrolled) {
    scrolled = true;
  }
}*/

var curq = 0;

function nextq() {
  $("div.ierr").remove();
  if( $("#qsv"+curq).val() == "0" ) {
    $("#qsv"+curq).css("border","3px solid red");
    $("#qsv" + curq).after('<div class="ierr" style="color:red;font-weight:bold;font-size:20px;">&#9650; เลือกคำตอบ &#9650;</div>');
  }
  else {
    $("#qs"+curq).hide();
    curq +=1;
    if( curq > 5 ) {
      var plus = 45 - (parseInt($("#qsv1").val()) - 18) * 0.81;
      var plus2 = plus + plus*0.41;
      var plus3 = plus2 + plus2*0.3 + parseInt($("#qsv1").val())*0.1;
      plus = plus/10;
      plus2 = plus2/10;
      plus3 = plus3/10;
      plus = plus.toFixed(2);
      plus2 = plus2.toFixed(2);
      plus3 = plus3.toFixed(2);
      
      $("#plus").html(plus);
      $("#plus2").html(plus2);
      $("#plus3").html(plus3);
    
      $("#starttest").hide();
      $("#next").hide();
      $("#skrov").hide();
      $("#num").hide();
      $("#loading").fadeIn(1000);
      setTimeout(showres, 3000);
      
      var data = "";
      
      for(var j=1; j<=5; j++) {
        data += $("#qsv"+j).val()+";";
      }
      
      data = data + plus + ";" + plus2 + ";" + plus3;

    }
    else {
    
      $("#qn").html(curq);
      $("#num").fadeIn("slow");
      $("#num").css("display", "block");


      $("#qs"+curq).fadeIn("slow");
      $("#next").fadeIn("slow");
    
    }
  }
  
}

function showres() {
  $("#starttest").hide();
  $("#loading").hide();
  $("#hres").fadeIn(800);
  $("#res").fadeIn(800);
  $("#sale").fadeIn(800);
  $("#next").hide();
  $("#skrov").hide();
  start_timer();
}

  var time = 435;
  var intr;
  function start_timer() {
    intr = setInterval(tick, 1000);
  }


  function tick() {
    time = time-1;
    var mins = Math.floor(time/60);
    var secs = time - mins*60;
    if( mins == 0 && secs == 0 ) {
      clearInterval(intr);
    }
    secs = secs >= 10 ? secs : "0"+secs;
    $("#min").html("0"+mins);
    $("#sec").html(secs);
  }
});
/*$(document).ready(function() {
  
    $('.toform').click(function (e) {
      e.preventDefault();
      var a = $('.js_submit'), b = a.closest('form');
      if ($('form#feedback').length) a = $('#feedback .js_submit'), b = a.closest('form#feedback');
      if (b.length && a.is(':visible')) {
        $("html,body").animate({ scrollTop: b.offset().top }, 1000);
      }
      return false;
    });
});*/