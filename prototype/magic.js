window.start_check_fs = false;
window.start_check_ss = false;
function start(){
    window.fs_height = d3.select('#text1')['_groups'][0][0]['offsetHeight'];
    window.ss_height = d3.select('#text3')['_groups'][0][0]['offsetHeight'];
    window.ss_width = d3.select('.right')['_groups'][0][0]['offsetWidth'];
    window.left_width = d3.select('.left')['_groups'][0][0]['offsetWidth'];
    window.right_height = d3.select('.right')['_groups'][0][0]['offsetHeight'];
    window.right_width = d3.select('.right')['_groups'][0][0]['offsetWidth'];
    d3.select('.top').style('width', (left_width + 10 + 'px'))

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
    ts_trigger()
    head()
}

function year_trigger(){
    var height = d3.select('#first_story').attr('height');
    var foo = [];
    for (var i=1979; i<2014; i += 1){
        foo.push(i);
    }
    var scale = d3.scaleQuantile()
        .domain([250, fs_height-300])
        .range(foo);
    window.controller_fs = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: 0,    // the scene should last for a scroll distance of 100px
        offset: 100,    // start this scene after scrolling for 50px
    })
        .on('update', function(e){
            if (e.scrollPos <= fs_height){
                sizing(scale(e.scrollPos))
                d3.select('#Year').text(scale(e.scrollPos))
                console.log(scale(e.scrollPos))
            }else{
            }
            
        })
        .addTo(controller_fs); // assign the scene to the controller
}

function year_trigger_ss(){
    var height = d3.select('#second_story').attr('height');
    var foo = [];
    for (var i=1979; i<2015; i += 1){
        foo.push(i);
    }
    var scale_ss = d3.scaleQuantile()
        .domain([fs_height+200, fs_height + ss_height-500])
        .range(foo);
    window.controller_ss = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: ss_height,    // the scene should last for a scroll distance of 100px
        offset: fs_height+100,    // start this scene after scrolling for 50px
    })
        .on('update', function(e){
                update_ss(scale_ss(e.scrollPos))
                d3.select('.ss').text(scale_ss(e.scrollPos))
        })
        .addTo(controller_ss); // assign the scene to the controller
}

function rate_trigger(){
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: fs_height,    // the scene should last for a scroll distance of 100px
        offset: 250,    // start this scene after scrolling for 50px
    })
        .on('start', function(e){
            if (e.scrollDirection == 'FORWARD'){
                if (start_check_fs == false){
                    data_load();
                    year_trigger();
                    start_check_fs = true;
                    d3.select('#Year').attr('class', 'fs')
                }
            } else{
                df.forEach(function(d, j) {
                    d.value = 1;
                })
                //d3.select('#map').selectAll("*").remove();
            }
        })
        .addTo(controller); // assign the scene to the controller
}

function ss_trigger(){
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: 0,    // the scene should last for a scroll distance of 100px
        offset: fs_height,    // start this scene after scrolling for 50px
    })
        .on('start', function(e){
            if (e.scrollDirection == 'FORWARD'){
                df.forEach(function(d, j) {
                    d.value = 1;
                })
                ticked();
            if (start_check_ss == false){
                data_load_ss();
                year_trigger_ss()
                start_check_ss = true;
                cause = ' '
                d3.selectAll('.test').style('visibility', 'hidden')
                d3.select('#Year').attr('class', 'ss')
            }
            }else{
                d3.select('#map').select('#bars').remove().transition().duration(60);
                //remove_ss();
                //controller_ss.removeScene(scene);
                start_check_ss = false;
                cause = 'neoplazm';
                d3.selectAll('.test').style('visibility', 'visible')
                d3.select('#Year').attr('class', 'fs')
                sizing(2013)
            }
        })
        .addTo(controller); // assign the scene to the controller
}

function ts_trigger(){
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: 0,    // the scene should last for a scroll distance of 100px
        offset: fs_height + ss_height,    // start this scene after scrolling for 50px
    })
        .on('start', function(e){
            if (e.scrollDirection == 'FORWARD'){
                d3.select('#map').select('#bars').remove().transition().duration(60);
                //remove_ss();
                //controller_ss.removeScene(scene);
                start_check_ss = false;
                console.log('hi')
            }else{
                if (start_check_ss == false){
                    data_load_ss();
                    year_trigger_ss()
                    start_check_ss = true;
                    cause = ' '
                    d3.selectAll('.test').style('visibility', 'hidden')
                    d3.select('#Year').attr('class', 'ss')
                }
            }
        })
        .addTo(controller); // assign the scene to the controller
}

function head(){
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        triggerElement: '#head_fs',
        triggerHook: 0.15
    })
        .on('start', function(e){
            if (e.scrollDirection == 'FORWARD'){
                d3.select('#main_head').text(d3.select('#head_fs').text())
            } else{
                d3.select('#main_head').text('Рак помолодел?')
            }
        })
        .addTo(controller); 

    var scene2 = new ScrollMagic.Scene({
        triggerElement: '#head_ss',
        triggerHook: 0.15
    })
        .on('start', function(e){
            if (e.scrollDirection == 'FORWARD'){
                d3.select('#main_head').text(d3.select('#head_ss').text())
            } else{
                d3.select('#main_head').text(d3.select('#head_fs').text())
            }
        })
        .addTo(controller);

    var scene2_2 = new ScrollMagic.Scene({
        triggerElement: '#head_ss2',
        triggerHook: 0.15
    })
        .on('start', function(e){
            if (e.scrollDirection == 'FORWARD'){
                d3.select('#main_head').text(d3.select('#head_ss2').text())
            } else{
                d3.select('#main_head').text(d3.select('#head_ss').text())
            }
        })
        .addTo(controller);

    var scene3 = new ScrollMagic.Scene({
        triggerElement: '#head_ts',
        triggerHook: 0.15
    })
        .on('start', function(e){
            if (e.scrollDirection == 'FORWARD'){
                d3.select('#main_head').text(d3.select('#head_ts').text())
            } else{
                d3.select('#main_head').text(d3.select('#head_ss2').text())
            }
        })
        .addTo(controller);
}