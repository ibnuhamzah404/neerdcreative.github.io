var a = {
    subtract: function(b) {
        var d = $(".prod_left_val").html() - 0;
        var c = d - b;
        c = (c < 5 ? 5 : c);
        $(".prod_left_val").html(c)
    }
};
$(document).ready(function() {
    setTimeout(function() {
        a.subtract(2);
        setInterval(function() {
            a.subtract(Math.floor(Math.random() * (4 - 2)) + 2)
        }, (Math.floor(Math.random() * (25 - 20)) + 20) * 1000)
    }, 2000)
});
$(document).ready(function() {
    $("[data-toggle=scroll]").on("click", function() {
        var c = $(this).attr("href");
        var b = $(c).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: b
        }, 2000);
        return false
    })
});
document.addEventListener("DOMContentLoaded", Datee);

function Datee() {
    var c = 86400000,
        s = 33,
        d, l = "sg",
        q = false,
        n = new Date();
    switch (l) {
        case "it":
            d = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
            break;
        case "es":
            d = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            break;
        case "fr":
            d = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            break;
        case "pt":
            d = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            break;
        case "de":
            d = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            break;
        case "bg":
            d = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
            break;
        case "pl":
            d = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            break;
        case "ro":
            d = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
            break;
        case "hu":
            d = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
            break;
        case "gr":
        case "cy":
            d = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"];
            break;
        case "ru":
            d = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
            break;
        case "ph":
            d = ["Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre"];
            break;
        case "sg":
            d = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            break
    }
    if (q) {
        for (var m = 0; m < d.length; m++) {
            d[m] = d[m].slice(0, 3).toLowerCase()
        }
    }
    for (var b = 0; b < s; b++) {
        var p = "date-" + b,
            g = document.getElementsByClassName(p),
            f = new Date(n.getTime() - b * c),
            j = 0;
        timeArray = e(g);
        timeArray = h(timeArray);
        for (var m = 0; m < g.length; m++) {
            var k = g[m].dataset;
            if (k.format) {
                g[m].innerHTML = r(f, k.format)
            } else {
                g[m].innerHTML = r(f)
            }
            if (g[m].className.match(/\btime\b/)) {
                g[m].innerHTML += " " + timeArray[j];
                j++
            }
        }
    }

    function e(u, t) {
        var w = [];
        for (var v = 0; v < u.length; v++) {
            if (u[v].className.match(/\btime\b/)) {
                w.push(o())
            }
        }
        if (t) {
            w.sort(function(x, i) {
                return i - x
            })
        } else {
            w.sort(function(x, i) {
                return x - i
            })
        }
        return w
    }

    function o() {
        return Math.round(0 + Math.random() * 1440)
    }

    function h(u) {
        var z = [];
        for (var w = 0; w < u.length; w++) {
            var y = Math.floor(u[w] / 60),
                x = u[w] % 60,
                t = y < 10 ? "0" + y : y,
                v = x < 10 ? "0" + x : x;
            z.push(t + ":" + v)
        }
        return z
    }

    function r(v, u) {
        var i = "",
            t = v.getDate(),
            x = v.getFullYear(),
            y = v.getMonth() + 1,
            w = u || true;
        switch (w) {
            case "mm.dd.yyyy":
                i += (y < 10) ? ("0" + y) : y;
                i += ".";
                i += (t < 10) ? ("0" + t) : t;
                i += "." + x;
                return i;
            case "dd month yyyy":
                i += (t < 10) ? ("0" + t) : t;
                i += " ";
                i += d[y - 1];
                i += " " + x;
                return i;
            case "yyyy":
                i += " " + x;
                return i;
            case "dd month":
                i += (t < 10) ? ("0" + t) : t;
                i += " ";
                i += d[y - 1];
                return i;
            case "day dd, month yyyy":
                var z = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
                i += z[new Date(x, y - 1, t).getDay()];
                i += " ";
                i += (t < 10) ? ("0" + t) : t;
                i += " ";
                i += d[y - 1];
                i += " " + x;
                return i;
            case "dd/mm/yyyy":
                i += (t < 10) ? ("0" + t) : t;
                i += "/";
                i += (y < 10) ? ("0" + y) : y;
                i += "/" + x;
                return i;
            case "dd-mm-yyyy":
                i += (t < 10) ? ("0" + t) : t;
                i += "-";
                i += (y < 10) ? ("0" + y) : y;
                i += "-" + x;
                return i;
            default:
                i += (t < 10) ? ("0" + t) : t;
                i += ".";
                i += (y < 10) ? ("0" + y) : y;
                i += "." + x;
                return i
        }
    }
}
var resultWrapper = document.querySelector(".spin-result-wrapper");
var wheel = document.querySelector(".wheel-img");

function spin() {
    if (!wheel.classList.contains("rotated")) {
        wheel.classList.add("super-rotation");
        setTimeout(function() {
            resultWrapper.style.display = "block"
        }, 8000);
        setTimeout(function() {
            $(".spin-wrapper").slideUp();
            $(".order_block").slideDown();
            start_timer()
        }, 10000);
        wheel.classList.add("rotated")
    }
}
var closePopup = document.querySelector(".close-popup");
$(".close-popup, .pop-up-button").click(function(c) {
    c.preventDefault();
    $(".spin-result-wrapper").fadeOut();
    var b = $("#form").offset().top;
    $("body,html").animate({
        scrollTop: b
    }, 800)
});
var time = 600;
var intr;

function start_timer() {
    intr = setInterval(tick, 1000)
}

function tick() {
    time = time - 1;
    var c = Math.floor(time / 60);
    var b = time - c * 60;
    if (c == 0 && b == 0) {
        clearInterval(intr)
    }
    b = b >= 10 ? b : "0" + b;
    $("#min").html("0" + c);
    $("#sec").html(b)
};