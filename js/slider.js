// Without JQuery

var initSlider = new Slider('#ex1', {
    formatter: function(value) {
        return 'Current value: ' + value;
    }
});
