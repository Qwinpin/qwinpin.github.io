d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

function delet(){
    var rect = d3.select('rect');
    window.width_old = rect.attr('width');
    window.height_old = rect.attr('height');
    rect
        .on('click', handlover)
        //.on('mouseout', handlout);
}

function handlover(d){
    
    var rect = d3.select(this);
    var id = rect.attr('id');
    window.y = rect.attr('y');
    //neib_handover(id, 2);
    rect.transition().duration(10)
        .attr('fill', '#8C0023')
    //    .attr('width', rect_size*1.5)
     //   .attr('height', rect_size*1.5)
    d3.select(this).moveToFront();
    console.log(id)
}

function handlout(d){
    var rect = d3.select(this)
    var id = rect.attr('id');
    //neib_handout(id, 2);
    rect.transition().duration(1000)
        .attr('fill', 'rgb(31, 30, 34)')
    //    .attr('width', (rect_size))
    //    .attr('height', (rect_size))
}

function neib_handover(index, i){
    var id = get_neib(index);
    var scale = i-0.5;

    var left_x = Number(id[0]) - 1;
    var right_x = Number(id[0]) + 1;
    var rect_left = '#' + 'r' + left_x + 'x' + id[1];
    var rect_right = '#' + 'r' + right_x + 'x' + id[1];

    var top_y = Number(id[1]) - 1;
    var down_y = Number(id[1]) + 1;
    var rect_top = '#' + 'r' + id[0] + 'x' + top_y;
    var rect_down = '#' + 'r' + id[0] + 'x' + down_y;

    d3.select(rect_left).transition().duration(500)
        .attr('fill', '#8C0023')
        .attr('width', rect_size*scale)
        .attr('height', rect_size*scale)
    

    d3.select(rect_top).transition().duration(500)
        .attr('fill', '#8C0023')
        .attr('width', rect_size*scale)
        .attr('height', rect_size*scale)
    

    d3.select(rect_right).transition().duration(500)
        .attr('fill', '#8C0023')
        .attr('width', rect_size*scale)
        .attr('height', rect_size*scale)
    

    d3.select(rect_down).transition().duration(500)
        .attr('fill', '#8C0023')
        .attr('width', rect_size*scale)
        .attr('height', rect_size*scale)
    if (i == 1){
        d3.select(rect_left).moveToFront();
        d3.select(rect_top).moveToFront();
        d3.select(rect_right).moveToFront();
        d3.select(rect_down).moveToFront();
    }
    
    if (i > 1){
        neib_handover(rect_left, i-0.5);
        neib_handover(rect_right, i-0.5);
        neib_handover(rect_top, i-0.5);
        neib_handover(rect_right, i-0.5);
    }
}

function neib_handout(index, i){
    var id = get_neib(index);
    var scale = i-0.5;

    var left_x = Number(id[0]) - 1;
    var right_x = Number(id[0]) + 1;
    var rect_left = '#' + 'r' + left_x + 'x' + id[1];
    var rect_right = '#' + 'r' + right_x + 'x' + id[1];

    var top_y = Number(id[1]) - 1;
    var down_y = Number(id[1]) + 1;
    var rect_top = '#' + 'r' + id[0] + 'x' + top_y;
    var rect_down = '#' + 'r' + id[0] + 'x' + down_y;

    d3.select(rect_left).transition().duration(1000)
        .attr('fill', 'rgb(31, 30, 34)')
        .attr('width', (rect_size))
        .attr('height', (rect_size))

    d3.select(rect_top).transition().duration(1000)
        .attr('fill', 'rgb(31, 30, 34)')
        .attr('width', (rect_size))
        .attr('height', (rect_size))

    d3.select(rect_right).transition().duration(1000)
        .attr('fill', 'rgb(31, 30, 34)')
        .attr('width', (rect_size))
        .attr('height', (rect_size))

    d3.select(rect_down).transition().duration(1000)
        .attr('fill', 'rgb(31, 30, 34)')
        .attr('width', (rect_size))
        .attr('height', (rect_size))

    if (i > 1){
        neib_handout(rect_left, i-0.5);
        neib_handout(rect_right, i-0.5);
        neib_handout(rect_top, i-0.5);
        neib_handout(rect_right, i-0.5);
    }
}

function space(){
    var svg = d3.select('svg');
    var width = svg.attr('width');
    var height = svg.attr('height');

    window.rect_size = width/75;

    var rect_data = [];
    var x = 0;
    for (i=0; i<75; i++){
        var y = 0;
        for (j=0; j<50; j++){
            rect_data.push([i, j, x, y]);
            y = y + rect_size;
        }
        x = x + rect_size;
    }
    return rect_data;
}

function create_rect_field(){
    window.fo = d3.format(".0f");
    var data = space();
    var place = d3.select('svg').selectAll('rect').data(data)
        .enter()
        .append('rect')
            .attr('fill', 'rgb(31, 30, 34)')
            .attr('id', function(d){
                return  'r' + fo(d[0]) + 'x' + fo(d[1]);
            })
            .attr('width', rect_size)
            .attr('height', rect_size)
            .attr('x', function(d){
                return d[2];
            })
            .attr('y', function(d){
                return d[3];
            })
            .attr('border', 1)
                .style('stroke', 'white')
                .style('stroke-width', rect_size/100)
            .on('click', handlover)
            //.on('mouseout', handlout);
    //d3.select('svg')
        //.attr('transform', 'skewX(30)');
    perspective()
}

function draw_number(){
    var list_line = number();
    var proj = [];
    for (i in list_line){
        proj.push('#r' + list_line[i][0] + 'x' + list_line[i][1])
    }
    for (i in proj){
        d3.select(proj[i]).transition().duration(1000).attr('fill', 'red')
            .attr('y', list_line[i][1]+1)
    }
}

function line(a, b){
    var cord = bresenham(a, b);
    var cord_shift = [];
    for (i in cord){
        cord_shift.push([fo(cord[i][0]), fo(cord[i][1])])
    }
    return cord_shift;
}

function number(){
    var l = [[1,2],[2,1],[3,2],[3,4],[2,5],[1,6],[1,7],[2,7],[3,7]]
    var all = [];

    for (var i=0; i<(l.length-1); i++){
        var a = l[i];
        var b = l[i+1];
        //console.log(a, b);
        var temp = line(a,b);
        all.push.apply(all, temp);
    }
    return all;
}

function get_neib(id){
    var reg = /\d+/g;
    return id.match(reg);
}


function perspective(){
    var svg = d3.select('svg');
    var width = svg.attr('width');
    var height = svg.attr('height');
    var sourcePoints = [[0, 0], [width, 0], [width, height], [0, height]],
        targetPoints = [[80, -100], [(width-200), -100], [width, height-100], [0, height-100]];
    var fast = transformed(sourcePoints, targetPoints);
    console.log(fast);
    svg.style('transform', "matrix3d(" + fast + ")");
    console.log(svg);
}

function transformed(sourcePoints, targetPoints) {
    var fr = d3.format(".6f");

    for (var a = [], b = [], i = 0, n = sourcePoints.length; i < n; ++i) {
        var s = sourcePoints[i], t = targetPoints[i];
        a.push([s[0], s[1], 1, 0, 0, 0, -s[0] * t[0], -s[1] * t[0]]), b.push(t[0]);
        a.push([0, 0, 0, s[0], s[1], 1, -s[0] * t[1], -s[1] * t[1]]), b.push(t[1]);
    }
  
    var X = solve(a, b, true), matrix = [
        X[0], X[3], 0, X[6],
        X[1], X[4], 0, X[7],
         0,    0, 1,    0,
        X[2], X[5], 0,    1
    ].map(function(x) {
        return fr(x);
    });
    return matrix;
  }

function move(id){
    var rect = d3.select(id);

    var y = Number(rect.attr('y')) -20;
    var x = Number(rect.attr('x')) -10;

    rect.transition().duration(1000)
        .attr('y', y)
        .attr('x', x)
        .attr('fill', '#8C0023')
        .attr('height', rect_size*0.9)
    d3.select(id).moveToFront();
}

function back(id){
    var rect = d3.select(id)
    var y = Number(rect.attr('y')) +20;
    var x = Number(rect.attr('x')) +10;
    //var id = rect.attr('id');
    //neib_handout(id, 2);
    rect.transition().duration(1)
        .attr('y', y)
        .attr('x', x)
        //.attr('y', (y+0.1))
        .attr('fill', 'rgb(31, 30, 34)')
        .attr('height', rect_size)
}

function draw(ids){
    
    for (i in heart){
        move(heart[i]);
    }

    for (i in ids){
        move(ids[i])
    }
}

function clear(ids){
    for (i in heart){
        back(heart[i]);
    }

    for (i in ids){
        back(ids[i])
    }
}

function readTextFile(country)
{   
    if (old_ids.length != 0){
        clear(old_ids);
    }
    file = country + '.txt';
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var ids = rawFile.responseText.split(',');
                old_ids = ids;
                draw(ids);
            }
        }
    }
    rawFile.send(null);
}

function to_id(x, y){
    return ('#r' + x + 'x' + y);
}

window.old_ids = []
window.heart = ['#r12x15','#r11x14','#r10x13','#r9x12','#r8x11','#r7x10','#r6x9','#r6x8','#r6x7','#r7x6','#r8x5','#r9x5','#r10x5','#r11x6','#r12x7','#r13x6','#r14x5','#r15x5','#r16x5','#r17x6','#r18x7','#r18x8','#r18x9','#r17x10','#r16x11','#r15x12','#r14x13','#r13x14']