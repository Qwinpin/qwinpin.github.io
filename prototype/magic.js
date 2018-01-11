function start(){
    window.fs_height = d3.select('#text1')['_groups'][0][0]['offsetHeight'];
    window.ss_height = d3.select('#text3')['_groups'][0][0]['offsetHeight'];
    window.ss_width = d3.select('.right')['_groups'][0][0]['offsetWidth'];
    d3.select('.middle').append('svg')
        .attr('id', 'trigger_field')
        .attr('height', function(d){
            //return 2926;
            return d3.select('.left')['_groups'][0][0]['offsetHeight'];
        })
        .attr('width', '10px')

    d3.select('#trigger_field').append('svg')
        .attr('id', 'first_story')
        .attr('y', 150)
        .attr('height', function(d){
            return fs_height;
            //return d3.select('.left')['_groups'][0][0]['offsetHeight'];
        })
        .attr('width', '10px')

    d3.select('#trigger_field').append('svg')
        .attr('id', 'second_story')
        .attr('y', 150 + fs_height)
        .attr('height', function(d){
            return ss_height;
            //return d3.select('.left')['_groups'][0][0]['offsetHeight'];
        })
        .attr('width', '10px')
    //year_trigger();
    rate_trigger()
    ss_trigger()
}

function year_trigger(){
    var height = d3.select('#first_story').attr('height');
    var foo = [];
    for (var i=1979; i<2014; i += 2){
        foo.push(i);
    }
    var scale = d3.scaleQuantile()
        .domain([150, height-500])
        .range(foo);
    window.controller_fs = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: 1,    // the scene should last for a scroll distance of 100px
        offset: 100,    // start this scene after scrolling for 50px
    })
        .on('update', function(e){
            sizing(scale(e.scrollPos))
        })
        .addTo(controller_fs); // assign the scene to the controller
}

function year_trigger_ss(){
    var height = d3.select('#second_story').attr('height');
    var foo = [];
    for (var i=1979; i<2014; i += 2){
        foo.push(i);
    }
    var scale = d3.scaleQuantile()
        .domain([fs_height, fs_height + ss_height-500])
        .range(foo);
    window.controller_ss = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: ss_height,    // the scene should last for a scroll distance of 100px
        offset: fs_height,    // start this scene after scrolling for 50px
    })
        .on('update', function(e){
            console.log(scale(e.scrollPos))
        })
        .addTo(controller_ss); // assign the scene to the controller
}

function rate_trigger(){
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: 1,    // the scene should last for a scroll distance of 100px
        offset: 150,    // start this scene after scrolling for 50px
    })
        .on('start', function(e){
            if (e.scrollDirection == 'FORWARD'){
                data_load();
                year_trigger();
            } else{
                df.forEach(function(d, j) {
                    d.value = 1;
                })
                ticked();
                //d3.select('#map').selectAll("*").remove();
                set_counter();
            }
        })
        .addTo(controller); // assign the scene to the controller
}

function ss_trigger(){
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: 1,    // the scene should last for a scroll distance of 100px
        offset: fs_height,    // start this scene after scrolling for 50px
    })
        .on('start', function(e){
            if (e.scrollDirection == 'FORWARD'){
                df.forEach(function(d, j) {
                    d.value = 1;
                })
                ticked();
                controller_fs.removeScene(scene);
                data_load_ss();
                year_trigger_ss()
            }else{
                data_load();
                year_trigger();
            }
        })
        .addTo(controller); // assign the scene to the controller
}