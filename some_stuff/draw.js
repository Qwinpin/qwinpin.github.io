window.x_shift = 0.5;
window.y_shift = 0.5;
window.col_1 = '#22252c';
window.col_2 = '#dcd9c6';
function handlover(d){
    
    var rect = d3.select(this);
    var count = 2;
    window.y = Number(rect.attr('y')) -y_shift - count;
    window.x = Number(rect.attr('x')) -x_shift - count;
    var id = rect.attr('id');
    
    

    window.y = rect.attr('y');
    window.color = rect.attr('fill');
    //neib_handover(id, 2);
    rect.transition().duration(100)
        .attr('fill', '#9e0314')
        .attr("transform", 'translate(' + (-15) + "," + (-25) + ')')
        //.attr('x', x)
        //.attr('y', y)
    //d3.select(this).moveToFront();
    console.log(id)
    //up_left(id, count)
}

function up_left(id, count){
    if (count > 0){
        var cord = get_neib(id);
        var x1 = Number(cord[0]);
        var y1 = Number(cord[1]);
        var id_left = '#r' + String(x1-1) + 'x' + String(y1);
        var id_right = '#r' + String(x1+1) + 'x' + String(y1);
        var id_top = '#r' + String(x1) + 'x' + String(y1-1);
        var id_bottom = '#r' + String(x1) + 'x' + String(y1+1);
        var rect1 = d3.select(id_left);
        var rect2 = d3.select(id_right);
        var rect3 = d3.select(id_top);
        var rect4 = d3.select(id_bottom);

        var del_y = Number(fo(y_shift*count));
        var del_x = Number(fo(x_shift*count));
        console.log(del_x, del_y)
        var y2 = Number(rect1.attr('y')) - del_y;
        var x2 = Number(rect1.attr('x')) - del_x;

        var y3 = Number(rect2.attr('y')) - del_y;
        var x3 = Number(rect2.attr('x')) - del_x;

        var y4 = Number(rect3.attr('y')) - del_y;
        var x4 = Number(rect3.attr('x')) - del_x;

        var y5 = Number(rect4.attr('y')) - del_y;
        var x5 = Number(rect4.attr('x')) - del_x;
        console.log
        rect1
            //.attr('fill', 'red')
            .attr('x', x2)
            .attr('y', y2)

        rect2
            //.attr('fill', 'red')
            .attr('x', x3)
            .attr('y', y3)
        
        rect3
            //.attr('fill', 'red')
            .attr('x', x4)
            .attr('y', y4)

        rect4
            //.attr('fill', 'red')
            .attr('x', x5)
            .attr('y', y5)

        count = count - 0.5;
        up_left(id_left, count);
        up_left(id_right, count);
        up_left(id_top, count);
        up_left(id_bottom, count);
        
    }
}


function handlout(d){
    var rect = d3.select(this);
    var count = 2;
    //var y = Number(rect.attr('y'));
    //var x = Number(rect.attr('x'));
    var id = rect.attr('id');
    console.log(x, y)
    //down_left(id, count);

    window.y = rect.attr('y');
    //neib_handover(id, 2);
    if (rect.attr('class').indexOf('data') != -1){
        rect.transition().duration(100)
        .attr('fill', color)
        .attr("transform", "translate(-45,-45)")
    }else{
        if (rect.attr('class').indexOf('sel') != -1){
            rect.transition().duration(100)
            .attr('fill', color)
            .attr("transform", "translate(-10,-30)")
        } else{
            rect.transition().duration(100)
            .attr('fill', color)
            .attr("transform", 'translate(' + 0 + "," + 0 + ')')
            //.style('stroke', 'white')
            //.attr('x', x)
            //.attr('y', y)
        }
    }
    //d3.select(this).moveToFront();
    console.log(id)
}

function down_left(id, count){
    if (count > 0){
        var cord = get_neib(id);
        var x1 = Number(cord[0]);
        var y1 = Number(cord[1]);
        var id_left = '#r' + String(x1-1) + 'x' + String(y1);
        var id_right = '#r' + String(x1+1) + 'x' + String(y1);
        var id_top = '#r' + String(x1) + 'x' + String(y1-1);
        var id_bottom = '#r' + String(x1) + 'x' + String(y1+1);
        var rect1 = d3.select(id_left);
        var rect2 = d3.select(id_right);
        var rect3 = d3.select(id_top);
        var rect4 = d3.select(id_bottom);

        var del_y = Number(fo(y_shift*count));
        var del_x = Number(fo(x_shift*count));
        var y2 = (Number(rect1.attr('y')) + del_y);
        var x2 = (Number(rect1.attr('x')) + del_x);
        
        var y3 = (Number(rect2.attr('y')) + del_y);
        var x3 = (Number(rect2.attr('x')) + del_x);

        var y4 = (Number(rect3.attr('y')) + del_y);
        var x4 = (Number(rect3.attr('x')) + del_x);

        var y5 = (Number(rect4.attr('y')) + del_y);
        var x5 = (Number(rect4.attr('x')) + del_x);
        console.log
        rect1.style('stroke', 'white')
            .attr('x', x2)
            .attr('y', y2)

        rect2.style('stroke', 'white')
            .attr('x', x3)
            .attr('y', y3)
        
        rect3.style('stroke', 'white')
            .attr('x', x4)
            .attr('y', y4)

        rect4.style('stroke', 'white')
            .attr('x', x5)
            .attr('y', y5)

        count = count - 0.5;
        down_left(id_left, count);
        down_left(id_right, count);
        down_left(id_top, count);
        down_left(id_bottom, count);
        
    }
}

function move(id){
    var rect = d3.select(id);
    //var rand = Math.random() * (3 - 1) + 1;

    var y = Number(rect.attr('y')) -20;
    var x = Number(rect.attr('x')) -10;

    rect.transition().duration(1000)
        .attr('y', y)
        .attr('x', x)
        .attr('fill', '#dde5f2')
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
        .attr('fill', col_1)
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
                .attr('fill', '#dde5f2')
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
            .attr('fill', '#e14658')
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
        rect.classed('sel', false).transition().duration(2000)
            .attr('fill', col_1)
            .attr("transform", "translate(0,0)")
            
        select_ids = false;
    }
    if (country != current_country_name){
        if (current_country_name.length != 0){
            d3.selectAll(('.' + current_country_name)).classed('sel', false).transition().duration(2000)
                .attr('fill', col_1)
                .attr("transform", "translate(0,0)");
        }
        current_country_name = country;
        d3.selectAll(('.' + current_country_name)).classed('sel', true).transition().duration(2000)
            .attr('fill', col_2)
            .attr("transform", "translate(-10,-30)");
    } else{
        d3.selectAll(('.' + current_country_name)).classed('sel', false).transition().duration(2000)
            .attr('fill', col_1)
            .attr("transform", "translate(0,0)");
        current_country_name = '';
    }
    console.log('1')
}

window.current_country_name = '';
window.select_ids = false;
window.current_country = '';
window.old = []
