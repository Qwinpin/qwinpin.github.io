//to front
d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

function space(del){
    var svg = d3.select('svg');
    var width = svg.attr('width');
    var height = svg.attr('height');
    svg.attr('x', 0)
    window.rect_size = 800/del;

    var rect_data = [];
    var x = 0;
    for (i=0; i<del; i++){
        var y = 0;
        for (j=0; j<(del/1.5); j++){
            rect_data.push([i, j, x, y]);
            y = y + rect_size;
        }
        x = x + rect_size;
    }
    return rect_data;
}

function create_rect_field(){
    window.fo = d3.format(".0f");
    var data = space(100);
    var place = d3.select('#space').append('g').selectAll('rect').data(data)
        .enter()
        .append('rect')
            .attr('fill', col_1)
            .attr('id', function(d){
                return  'r' + fo(d[0]) + 'x' + fo(d[1]);
            })
            .attr('class', 'rect')
            .attr('width', rect_size)
            .attr('height', rect_size)
            .attr('x', function(d){
                return d[2]+100;
            })
            .attr('y', function(d){
                return d[3]+100;
            })
            .attr('border', 1)
                .style('stroke', col_2)
                .style('stroke-width', 0.1)
            .on('mouseover', handlover)
            .on('mouseout', handlout);
    perspective()
    classing()
}

function classing(){
    var names = Object.keys(map);
    for (i=0; i<100; i++){
        var y = 0;
        for (j=0; j<(100/1.5); j++){
            var id = '#r' + i + 'x' + j;
            for (k in names){
                if (map[names[k]].indexOf(id) != -1){
                    d3.select(id)
                        .classed(names[k], true);
                }
            }
        }
    }
    console.log('done');
}

function perspective(){
    var svg = d3.select('#space');
    var width = svg.attr('width');
    var height = svg.attr('height');
    var sourcePoints = [[0, 0], [width, 0], [width, height], [0, height]],
        targetPoints = [[300, 0], [(width-100), 0], [width, height-200], [0, height-200]];
    var fast = transformed(sourcePoints, targetPoints);
    console.log(fast);
    svg.style('transform-origin', "15% 0%");
    svg.style('transform', "matrix3d(" + fast + ")");
    
    console.log(svg);
}

function transformed(sourcePoints, targetPoints) {
    var fr = d3.format(".4f");

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