function handlover(d){
    
    var rect = d3.select(this);
    var id = rect.attr('id');
    window.y = rect.attr('y');
    window.color = rect.attr('fill');
    //neib_handover(id, 2);
    rect.transition().duration(10)
        .attr('fill', '#ffffff')
        .attr('width', rect_size*1.15)
        .attr('height', rect_size*1.15)
    //d3.select(this).moveToFront();
    console.log(id)
}


function handlout(d){
    var rect = d3.select(this);
    var id = rect.attr('id');
    window.y = rect.attr('y');
    //neib_handover(id, 2);
    rect.transition().duration(10)
        .attr('fill', color)
        .attr('width', rect_size)
        .attr('height', rect_size)
    //d3.select(this).moveToFront();
    console.log(id)
}

function move(id){
    var rect = d3.select(id);
    //var rand = Math.random() * (3 - 1) + 1;

    var y = Number(rect.attr('y')) -20;
    var x = Number(rect.attr('x')) -10;

    rect.transition().duration(1000)
        .attr('y', y)
        .attr('x', x)
        .attr('fill', '#F2F2F2')
        .attr('height', rect_size*0.7)
    d3.select(id).moveToFront();
}

function back(id){
    var rect = d3.select(id)
    var y = Number(rect.attr('y')) +20;
    var x = Number(rect.attr('x')) +10;
    //var id = rect.attr('id');
    //neib_handout(id, 2);
    rect
        .attr('y', y)
        .attr('x', x)
        //.attr('y', (y+0.1))
        .attr('fill', 'rgb(31, 30, 34)')
        .attr('height', rect_size)
}

function data_prepare(){
    console.log(current_country_name)
    var show = dataset[current_country_name]['2014'];
    console.log(show)
    fill_data(show)
}

function fill_data(data){
    var number_squares = map[current_country_name].length;
    
    var base = data.base;
    var target = data.cancer;
    var fill_squares = (fo((target/base)*number_squares));

    console.log(number_squares, base, target, fill_squares);
    if (select_ids){
            var rect = d3.selectAll('.data');
            rect
                .classed('data', false)
                .transition().duration(2000)
                .attr('fill', '#F2F2F2')
                .attr("transform", "translate(0,0)");
            select_ids = false;
    }
    for (var i = 0; i < fill_squares; i++){
        //var rand = fo(Math.random() * (number_squares - i) + i);
        var id = map[current_country_name][i];
        var rect = d3.select(id);
        rect
            .classed('data', true)
            .transition().duration(1000)
            .attr('fill', '#550000')
            .attr("transform", "translate(-45,-45)");
        select_ids = true;
    }
    console.log(select_ids)
}

function get_neib(id){
    var reg = /\d+/g;
    return id.match(reg);
}

function draw(country){
    //current_country_name = country;
    if (select_ids){
        var rect = d3.selectAll('.data');
        rect.transition().duration(2000)
            .attr('fill', 'rgb(31, 30, 34)')
            .attr("transform", "translate(0,0)");
        select_ids = false;
    }
    if (country != current_country_name){
        if (current_country_name.length != 0){
            d3.selectAll(('.' + current_country_name)).transition().duration(1000)
                .attr('fill', 'rgb(31, 30, 34)')
                .attr("transform", "translate(0,0)");
        }
        current_country_name = country;
        d3.selectAll(('.' + current_country_name)).transition().duration(1000)
            .attr('fill', '#F2F2F2')
            .attr("transform", "translate(-10,-20)");
    } else{
        d3.selectAll(('.' + current_country_name)).transition().duration(1000)
            .attr('fill', 'rgb(31, 30, 34)')
            .attr("transform", "translate(0,0)");
        current_country_name = '';
    }
}

window.current_country_name = '';
window.select_ids = false;
window.current_country = '';
window.old = []
