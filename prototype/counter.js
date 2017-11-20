function death_rate(){
    window.counted = false;
    window.rate = 7500000;
}

function set_counter(){
    var format = d3.format(",d");
    if (!counted){
        counted = !counted;
        d3.select('#test')
        .transition()
        .duration(5000)
            .tween("text", function() {
                var that = d3.select(this),
                    i = d3.interpolateNumber(that.text(), rate);
                    return (function(t) {
                        that.text(format(i(t)));
                    });
            })
        }
}