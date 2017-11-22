window.current_year = 2;
window.dur = 0;
function load(){
    var element = d3.select('#map').node();
    window.width = element.getBoundingClientRect().width;
    window.height = element.getBoundingClientRect().height;
    window.center = { x: width / 2, y: height / 2 };
    console.log(width)
    var svg = d3.select('#map')

    window.simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(100))
        .force('x', d3.forceX().strength(0.1).x(center.x))
        .force('y', d3.forceY().strength(0.1).y(center.y))
        .force('collision', d3.forceCollide().strength(2).radius(function(d) {
            return d.radius + 2;
        }))
        .on('tick', ticked);

    window.graph = [
        {'id': '1', 'radius': 10},
        {'id': '2', 'radius': 20},
        {'id': '3', 'radius': 30},
        {'id': '4', 'radius': 40},
        {'id': '5', 'radius': 50},
        {'id': '6', 'radius': 60},
    ];
    window.graph_old = [
        {'id': '1', '1': 15, '2': 10, '3': 115, '4': 20, '5': 10, '6': 25, '7': 15, '8': 10},
        {'id': '2', '1': 45, '2': 20, '3': 5, '4': 21, '5': 75, '6': 26, '7': 25, '8': 10},
        {'id': '3', '1': 25, '2': 30, '3': 35, '4': 13, '5': 46, '6': 37, '7': 35, '8': 10},
        {'id': '4', '1': 55, '2': 40, '3': 25, '4': 57, '5': 16, '6': 45, '7': 45, '8': 10},
        {'id': '5', '1': 15, '2': 50, '3': 33, '4': 12, '5': 45, '6': 58, '7': 55, '8': 10},
        {'id': '6', '1': 95, '2': 60, '3': 45, '4': 29, '5': 15, '6': 78, '7': 65, '8': 10},
    ];
    var node = svg.append("g")
        .selectAll("circle")
        .data(graph)
        .enter().append("circle")
            .attr("class", "nodes")
            .attr("r", function(d){
                return d.radius;
            })
            .attr("fill", '#FF5D5D')
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

    var text = svg.append('g')
        .selectAll('text')
        .data(graph)
        .enter().append('text')
            .attr('class', 'text')
            .text(function(d){
                return d.id;
            })
            .attr('font-size', function(d){
                return d.radius/2;
            })
            .attr('dx', function(d){
                return -d.radius/2;
            })
            .attr('dy', function(d){
                return d.radius/4;
            })

    simulation
        .nodes(graph)
        .on("tick", ticked);

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
    }
    
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
    }
}

function sizing(v){
    if (v != current_year){
        current_year = v;
        graph.forEach(function(d, i) {
            var temp = graph_old.filter(function(v){
                return v.id == d.id;
            })
            d.radius = temp[0][v];
        })
        simulation.alpha(0.5).force('collision', d3.forceCollide().radius(function(d) {
            return d.radius + 2;
        })).restart();
        ticked();
    }
}

function ticked() {
    var node = d3.select('#map').selectAll('circle')
        .data(graph)
    var text = d3.select('#map').selectAll('text')
        .data(graph)
        
    node.transition().duration(dur)
        .attr("transform", function(d) { 
            return "translate("+d.x+","+d.y+")"; 
        })
        .attr('r', function(d){
            return d.radius;
        })

    text.transition().duration(dur)
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('font-size', function(d){
            return d.radius/3;
        })
}

function duration_set(v){
    dur = v;
}