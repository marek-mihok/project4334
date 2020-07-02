jQuery(document).ready(function($){
    $("#toggle-chords").click(function() {
      $(".chwp-chord-lyrics-wrapper").toggleClass("chwp-chord-hidden");
    });
    
    $("#toggle-song-comments").click(function() {
      $(".chwp-comment").toggle();
    });
    
    $(".chwp-chord-lyrics-wrapper").toggleClass("chwp-chord-hidden");
});