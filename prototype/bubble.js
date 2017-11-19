function load(){
    var element = d3.select('#map').node();
    window.width = element.getBoundingClientRect().width;
    window.height = element.getBoundingClientRect().height;
    window.center = { x: width / 2, y: height / 2 };
    console.log(width)
    var svg = d3.select('#map')

    window.simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(100))
        .force('x', d3.forceX().strength(0.05).x(center.x))
        .force('y', d3.forceY().strength(0.05).y(center.y))
        .force('collision', d3.forceCollide().strength(2).radius(function(d) {
            return d.radius + 2;
        }))
        .on('tick', ticked);

    window.graph = [
        {'id': 'First', 'radius': 10},
        {'id': 'Second', 'radius': 20},
        {'id': 'Third', 'radius': 30},
        {'id': 'Fourth', 'radius': 40},
        {'id': 'Fifth', 'radius': 50},
        {'id': 'Sixth', 'radius': 60},
    ];
    window.graph_old = [
        {'id': 'First', 'radius': 10},
        {'id': 'Second', 'radius': 20},
        {'id': 'Third', 'radius': 30},
        {'id': 'Fourth', 'radius': 40},
        {'id': 'Fifth', 'radius': 50},
        {'id': 'Sixth', 'radius': 60},
    ];
    var node = svg.append("g")
        .selectAll("circle")
        .data(graph)
        .enter().append("circle")
            .attr("class", "nodes")
            .attr("r", function(d){
                return d.radius;
            })
            .attr("fill", 'grey')
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
                return d.radius;
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
    graph.forEach(function(d, i) {
        var temp = graph_old.filter(function(v){
            return v.id == d.id;
        })
        console.log(temp)
        d.radius = temp[0].radius+v/10;
    })
    simulation.alpha(0.1).force('collision', d3.forceCollide().radius(function(d) {
        return d.radius + 2;
    })).restart();
    ticked(500);
}

function ticked(dur = 0) {
    var node = d3.selectAll('circle')
        .data(graph)
    var text = d3.selectAll('text')
        .data(graph)
    node.transition().duration(dur)
        .attr("transform", function(d) { 
            return "translate("+d.x+","+d.y+")"; 
        })
        .attr('r', function(d){
            return d.radius;
        })

    text.transition().duration(dur)
        .text(function(d){
            return d.radius;
        })
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('font-size', function(d){
            return d.radius/2;
        })
}