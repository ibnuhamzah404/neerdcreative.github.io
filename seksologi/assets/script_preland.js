(function() {
    window.addEventListener('load', function() {
        for ( var i=0; i < document.links.length; i++ ){
            document.links[i].setAttribute('href', landing_url);
        }
    });
})();