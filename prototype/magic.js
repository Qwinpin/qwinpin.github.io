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
    var scale = d3.scaleQuantize()
        .domain([0, height-500])
        .range([1, 2, 3, 4, 5, 6, 7, 8]);
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
            set_counter();
        })
        .addTo(controller); // assign the scene to the controller
}