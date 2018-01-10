function death_rate(){
    window.counted = false;
    window.rate = '1979';
    window.cause = 'neoplazm';
}

function set_counter(){
    var format = d3.format("d");
    if (!counted){
        //counted = !counted;
        d3.select('#test')
        .transition()
        .duration(1000)
            .tween("text", function() {
                var that = d3.select(this),
                    i = d3.interpolateNumber(that.text(), Math.round(rate));
                    return (function(t) {
                        that.text(format(i(t)));
                    });
            })
        d3.select('#test2')
        .transition()
        .duration(500)
            .tween("text", function() {
                var that = d3.select(this),
                    i = d3.interpolateNumber(that.text(), Math.round(summ_death));
                    return (function(t) {
                        that.text(format(i(t)));
                    });
            })
        d3.select('#Cause').text(cause)
        d3.select('#Year').text(current_year)
        }
}