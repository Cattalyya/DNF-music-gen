
// Doc: https://github.com/seiyria/bootstrap-slider
// Ex: https://seiyria.com/bootstrap-slider/
var initSliders = function() {
    
    var slider = new Slider("#slider1-inp");
    slider.on("slide", function(sliderValue) {
        document.getElementById("slider1-v").textContent = sliderValue;
    });

    slider.on("slideStop", function() {
        $.post("onchange", {value: slider.getValue()})
            .done(function( data ) {
              $("#pianorollimg").attr("src", "imgs/pianorolls/current.png?"+Date.now());
            });
    });
}