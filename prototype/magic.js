function start(){
    d3.select('.middle').append('svg')
        .attr('id', 'trigger_field')
        .attr('height', function(d){
            return d3.select('.left')['_groups'][0][0]['offsetHeight'];
        })
        .attr('width', '1px')
    year_trigger();
    rate_trigger()
}

function year_trigger(){
    var height = d3.select('#trigger_field').attr('height');
    var foo = [];
    for (var i=1979; i<2014; i += 1){
        foo.push(i);
    }
    var scale = d3.scaleQuantile()
        .domain([100, height-500])
        .range(foo);
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: 0,    // the scene should last for a scroll distance of 100px
        offset: 0,    // start this scene after scrolling for 50px
    })
        .on('update', function(e){
            sizing(scale(e.scrollPos))
            
        })
        .addTo(controller); // assign the scene to the controller
}

function rate_trigger(){
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: 0,    // the scene should last for a scroll distance of 100px
        triggerElement: '#test',    // start this scene after scrolling for 50px
    })
        .on('start', function(e){
            //set_counter();
        })
        .addTo(controller); // assign the scene to the controller
}