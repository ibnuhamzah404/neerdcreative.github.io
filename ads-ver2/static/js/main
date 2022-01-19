$('.toggle').click(function(e) {
    e.preventDefault();

    var $this = $(this);

    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
        $this.children('.fa').removeClass('fa-angle-down');
    } else {
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.parent().parent().find('.fa-angle-down').removeClass('fa-angle-down');
        $this.parent().parent().find('.fa').addClass('fa-angle-right');
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
        $this.children('.fa').addClass('fa-angle-down');  
    }
});

// js sidebar menu 

function showhideMenu() {
    var menubtn1 = document.getElementById("menubtn");
    var menu = document.getElementById("sidebar-wrapper");
    var menuover = document.getElementById("sidebar-overlay");
    var navcus = document.getElementById("navbar-cus");
    var main2 = document.getElementById("iframe_idn");

    if (menu.style.width === "250px") {
        menu.style.width = "0px";
        menu.style.opacity = "0";
        menuover.style.width = "0px";
        main2.style.marginLeft = "0px";
        main2.style.width = "100%";
    } else {
        menu.style.width = "250px";
        menu.style.opacity = "1";
        menuover.style.width = "100vw";
        main2.style.marginLeft = "250px";
        main2.style.width = "calc(100% - 250px)";
    }
}

function showhideMenu2() {
    var menubtn1 = document.getElementById("menubtn");
    var menu = document.getElementById("sidebar-wrapper");
    var menuover = document.getElementById("sidebar-overlay");
    var navcus = document.getElementById("navbar-cus");     
    var main2 = document.getElementById("iframe_idn");

    if (menu.style.width === "250px") {
        menu.style.width = "0px";
        menu.style.opacity = "0";
        navcus.style.display = "none"; 
        menuover.style.width = "0px";
        main2.style.marginLeft = "0px";
        main2.style.width = "100%";
    } else {
        menu.style.width = "250px";
        menu.style.opacity = "1";
        navcus.style.display = "block";
        menuover.style.width = "100vw";
        main2.style.marginLeft = "250px";
        main2.style.width = "calc(100% - 250px)";
    }
}

// js is active

$('.inner').on('click', 'li a', function() {
    $('.inner li a.aktif').removeClass('aktif');
    $(this).addClass('aktif');
});
       

        
// js remove home change to iframe        

function remove_home() {
    document.getElementById("dn1").style.display = "none";
    document.getElementById("dn2").style.display = "none";
    document.getElementById("home_awal").style.display = "none";
    document.getElementById("menubtn").style.opacity = "1";
    document.getElementById("iframe_idn").style.display = "block";
    document.getElementById("ytbg").style.display = "none";
}

// hide menu on mobile

function remove_home_mobile() {
    document.getElementById("dn1").style.display = "none";
    document.getElementById("dn2").style.display = "none";
    document.getElementById("home_awal").style.display = "none";
    document.getElementById("menubtn").style.opacity = "1";
    document.getElementById("iframe_idn").style.display = "block";
    document.getElementById("sidebar-wrapper").style.width = "0px";
    document.getElementById("sidebar-overlay").style.width = "0px";
    document.getElementById("iframe_idn").style.width = "100%";
    document.getElementById("iframe_idn").style.marginLeft = "0px";
}
  