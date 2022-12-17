_oeLoad();

var _oeLock = false, _oeReady = false;
function _oeLoad() {            
    if( window.jquery ) $.noConflict();
    $(function(){
       _oeBody(); 
        if( window.opera ) {
            $('html').bind('mouseleave', function(){
                if( !_oeLock && _oeReady ) {                
                    _oeLock = true;                
                    _oeShow();
                    if( !confirm(_oeSettings.closeText) ) { _oeOnStay(); }else{ _oeOnStay(); }
                }                
            });
            return;
        }    
        $(window).bind('beforeunload', function(){          
            if( !_oeLock && _oeReady ) {
                _oeLock = true;
                setTimeout(function(){_oeOnStay();}, 1);
                return _oeShow();           
            }else {
                _oeSettings.ga();
            }
        }); 
    });    
}
function _oeOnStay() {    
    if( _oeSettings.banner.show ) { $('#_oeBanner').remove(); }
    if( _oeSettings.audio.enable ) { document.getElementById('_oeAudio').pause(); }
    _oeSettings.ga();
}
function _oeShow() {
    $('body, html').css({
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
    });           
    $('#_oeContent').hide();    
    if( _oeSettings.banner.show ) { $('#_oeBanner').show(); }    
    if( _oeSettings.audio.enable ) { var audio = document.getElementById('_oeAudio'); if(audio) {audio.play(); } }    
    $('#_oeFrame').show();            
    return _oeSettings.closeText;
}
function _oeFrameReady(){ _oeReady = true; }
function _oeBody() {    
    var bodyContent = $('body').html();          
    $('body').html( '<div id="_oeContent">' + bodyContent + '</div>');    
    if( _oeSettings.banner.show ) { $('body').append('<div id="_oeBanner" style="display: none; text-align: center;"><img src="' + _oeSettings.banner.src + '" style="border: none;"></div>'); }
    if( _oeSettings.audio.enable ) { $('body').append('<audio id="_oeAudio"><source src="' + _oeSettings.audio.src.ogg + '" type="audio/ogg" ><source src="' + _oeSettings.audio.src.mp3 + '" type="audio/mp3" ></audio>'); }
    $('body').append('<iframe id="_oeFrame" src="' + _oeSettings.target + '" onload="_oeFrameReady()" style="width: 100%; height: 100%; border: none; display: none;"></iframe>');        
}