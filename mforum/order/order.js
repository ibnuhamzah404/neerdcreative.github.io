//server 1
$(document).ready(function(){

	$("#form").on("submit", function(event){

	  event.preventDefault(); // menghentikan sejenak proses submit form

	  let name  = $("#name").val(); // mengambil data dari input name
	  let hp = $("#phone").val(); // mengambil data dari input phone
	  let page = $("#page").val(); // mengambil data dari input phone

	  console.log(name, hp);

	  let fields = { // field yang dikirimkan ke server
	    name,
	    hp,
	    page
	  };

	  let token = 'keyTrpHYG7ZXBUxRR'; // token untuk autentikasi api

	  axios.post('https://api.airtable.com/v0/appIThdR8xqGUVXTa/Table%201', { // proses pengiriman data ke server menggunakan axios
	      fields
	  },{
	      headers: {
	          'Authorization': 'Bearer ' + token ,
	          'Content-Type': 'application/json'
	      },
	  })
	  .then(data => {
	    console.log('testing');
	    $(this).unbind('submit').submit(); // continue the submit unbind preventDefault
	  })

	});

var forms = document.getElementsByTagName('form');
	for (var i = 0; i < forms.length; i++) {
		forms[i].setAttribute('action', 'order/thanks-indo.html');
		forms[i].setAttribute('method', 'get');
};

var tmp = new Array();
var tmp2 = new Array();
var param = new Array();

var get = location.search;
if(get != '') {
	tmp = (get.substr(1)).split('&');
	for(var i=0; i < tmp.length; i++) {
		tmp2 = tmp[i].split('=');
		param[tmp2[0]] = tmp2[1];
		}
	}
jQuery.each( $('form[action="order/thanks-indo.html"]'), function( i, val ) {
		for (var key in param) {
			if ($(val).find("input[name=" + key + "]").length == 0) {
			$(val).append("<input type=\"hidden\" name=\"" + key + "\" value=\"" + param[key]+ "\" />");
			}
			else {var oldInput = $(val).find('input[name=' + key + ']');
				oldInput[0].value = param[key];
			};
		};
	});
});
