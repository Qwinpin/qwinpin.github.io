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
        .on('mouseover', handlover)
        .on('mouseout', handlout);
}

function handlover(d){
    var rect = d3.select(this).transition().duration(10)
        .attr('fill', '#025088')
    rect.attr('width', rect_size*2)
    rect.attr('height', rect_size*2)
        .style('stroke-width', 0);
    d3.select(this).moveToFront();
}

function handlout(d){
    var rect = d3.select(this).transition().duration(1000)
        .attr('fill', '#8d8d8e')
    rect.attr('width', (rect_size))
    rect.attr('height', (rect_size))
        .style('stroke-width', 1);
}

function space(){
    var svg = d3.select('svg');
    var width = svg.attr('width');
    var height = svg.attr('height');

    window.rect_size = width/30;

    var rect_data = [];
    var x = 0;
    for (i=0; i<30; i++){
        var y = 0;
        for (j=0; j<30; j++){
            rect_data.push([x, y]);
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
            .attr('fill', '#8d8d8e')
            .attr('id', function(d){
                return  'r' + fo(d[0]) + 'x' + fo(d[1]);
            })
            .attr('width', rect_size)
            .attr('height', rect_size)
            .attr('x', function(d){
                return d[0];
            })
            .attr('y', function(d){
                return d[1];
            })
            .attr('border', 1)
                .style('stroke', 'white')
                .style('stroke-width', 1)
            .on('mouseover', handlover)
            .on('mouseout', handlout);
}

function draw_number(){
    var list_line = number();
    var proj = [];
    for (i in list_line){
        proj.push('#r' + list_line[i][0] + 'x' + list_line[i][1])
    }
    for (i in proj){
        d3.select(proj[i]).transition().duration(1000).attr('fill', 'red')
            .style('stroke-width', 1);
    }
}

function line(a, b){
    var cord = bresenham(a, b);
    var cord_shift = [];
    for (i in cord){
        cord_shift.push([fo(cord[i][0]*rect_size), fo(cord[i][1]*rect_size)])
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