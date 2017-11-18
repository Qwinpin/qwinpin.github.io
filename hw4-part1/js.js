var graph = [];
window.crit = 'population';
window.layout = 'nope'
window.agg = true;
window.cirk= true;

function change_crit(val){
    crit = val;
    console.log(crit, layout)
    switch (layout){
        case 'rank':{
            ranked();
            break;
        }
        case 'rank_dist':{
            ranked_dist();
            break;
        }
        case 'circle':{
            circular_layout();
            break;
        }
        default:{
            break;
        }
    }
}

function data_load(){
    d3.json("https://raw.githubusercontent.com/avt00/dvcourse/master/countries_2012.json", dat)
}

function dat(data){
    console.log(data)
    var dass = [];
    for (i in data){
        var obj2 = {};
        obj2.id = data[i]['name'];
        obj2.group = data[i]['continent'];
        obj2.gdp = data[i]['gdp']
        obj2.population = data[i]['population']
        obj2.longitude = data[i]['longitude']
        obj2.latitude = data[i]['latitude']
        dass.push(obj2);
    }
    graph.nodes = dass;
    console.log(graph.nodes)
}

function field(){
    var svg = d3.select("#svg")
    window.width = +svg.attr("width")
    window.height = +svg.attr("height");
    window.center = { x: width / 2, y: height / 2 };
    window.yearCenters = {
        'Asia': { x: width / 5, y: height / 2 },
        'Africa': { x: width / 3, y: height / 2 },
        'Americas': { x: width / 2, y: height / 2 },
        'Europe': { x: 2 * width / 3, y: height / 2 },
        'Oceania': { x: 4 * width / 5, y: height / 2 }
    };
    window.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody().strength(-200))
        .force('x', d3.forceX().strength(0.5).x(center.x))
        .force('y', d3.forceY().strength(0.5).y(center.y))

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
            .attr("r", 5)
            .attr("fill", 'grey')
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

    var text = svg.append('g')
        .attr('class', 'text')
        .selectAll('text')
        .data(graph.nodes)
        .enter().append('text')
            .text(function(d){
                return d.id;
            })
            .attr('font-size', 15)
            .attr('dx', 15)
            .attr('dy', 4)

    simulation
        .nodes(graph.nodes)
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

function in_line(){
    simulation.stop()
    var max = 0;
    graph.nodes.forEach(function(d, i) {
        d.y = 10 + i*13;
        if (d.y > max){
            max = d.y;
        }
        d.x = 10;
    })
    d3.select('#svg').attr('height', max + 100)
    ticked(500);
}

function ranked_dist(){
    d3.select('#svg').attr('height', 600)
    layout = 'rank_dist';
    simulation.stop();
    var max = d3.max(graph.nodes, function(d){
        return d[crit];
    })
    var scale = d3.scaleLinear()  
        .domain([0, max])
        .range([d3.select('#svg').attr('height'), 0]);
    console.log(max)
    var max = 0;
    graph.nodes.forEach(function(d, i) {
        d.y = 10 + 13*scale(d[crit]);
        if (d.y > max){
            max = d.y;
        }
        d.x = 10;
    })
    d3.select('#svg').attr('height', max + 100)
    ticked(500);
}

function ranked(){
    d3.select('#svg').attr('height', 600)
    layout = 'rank';
    simulation.stop();
    graph.nodes.sort(function(a, b){
        return d3.descending(a[crit], b[crit])
    })
    console.log(max)
    var max = 0;
    graph.nodes.forEach(function(d, i) {
        d.y = 10 + 13*i;
        if (d.y > max){
            max = d.y;
        }
        d.x = 10;
    })
    d3.select('#svg').attr('height', max + 100)
    ticked(500);
}

function scatter_rank(){
    d3.select('#svg').attr('height', 600)
    layout = 'scat_rank';
    simulation.stop()
    var max = d3.max(graph.nodes, function(d){
        return d.population;
    })
    var scaleY = d3.scaleLinear()  
        .domain([0, max])
        .range([0, d3.select('#svg').attr('height')-100]);
    var max = d3.max(graph.nodes, function(d){
        return d.gdp;
    })
    var scaleX = d3.scaleLinear()  
        .domain([0, max])
        .range([0, d3.select('#svg').attr('width')-100]);
    graph.nodes.forEach(function(d, i) {
        d.y = 10 + scaleY(d.population);
        if (d.y > max){
            max = d.y;
        }
        d.x = 10 + scaleX(d.gdp);
    })
    ticked(500);
}

function scatter_map(){
    d3.select('#svg').attr('height', 600)
    layout = 'scat_map';
    simulation.stop()
    var max = d3.max(graph.nodes, function(d){
        return d.latitude;
    })
    var min = d3.min(graph.nodes, function(d){
        return d.latitude;
    })
    var scaleY = d3.scaleLinear()  
        .domain([max, min])
        .range([10, d3.select('#svg').attr('height')-100]);
    var max = d3.max(graph.nodes, function(d){
        return d.longitude;
    })
    var min = d3.min(graph.nodes, function(d){
        return d.longitude;
    })
    var scaleX = d3.scaleLinear()  
        .domain([min, max])
        .range([10, d3.select('#svg').attr('width')-100]);
    graph.nodes.forEach(function(d, i) {
        d.y = 10 + scaleY(d.latitude);
        if (d.y > max){
            max = d.y;
        }
        d.x = 10 + scaleX(d.longitude);
    })
    ticked(500);
}

function circular_layout() {
    d3.select('#svg').attr('height', 600)
    layout = 'circle';
    simulation.stop();
    
    var r = Math.min(height, width)/2;
    
    var arc = d3.arc()
        .outerRadius(r);
    
    var pie = d3.pie()
        .sort(function(a, b) { return a[crit] - b[crit];}) // Sorting by categories
        .value(function(d, i) { 
            return 1;  // We want an equal pie share/slice for each point
        });
    
    graph.nodes = pie(graph.nodes).map(function(d, i) {
        // Needed to caclulate the centroid
        d.innerRadius = 0;
        d.outerRadius = r;
        
            // Building the data object we are going to return
        d.data.x = arc.centroid(d)[0]+width/2;
        d.data.y = arc.centroid(d)[1]+height/2;
        
        return d.data;
    })

    ticked(500);
}

function group(){
    function nodePos(d) {
        return yearCenters[d.group].x;
    }
    if (agg){
        simulation.force('x', d3.forceX().strength(0.5).x(nodePos));
        simulation.alpha(1).restart();
        agg = !agg;
    } else{
        simulation.force('x', d3.forceX().strength(0.5).x(center.x));
        simulation.force('y', d3.forceY().strength(0.5).y(center.y));
        simulation.alpha(1).restart();
        agg = !agg;
    }
}

function circular_force() {
    d3.select('#svg').attr('height', 600)
    layout = 'circle';
    //simulation.stop();
    if (cirk){
        var r = Math.min(height, width)/2;
        
        var arc = d3.arc()
            .outerRadius(r);
        
        var pie = d3.pie()
            .value(function(d, i) { 
                return 1;  // We want an equal pie share/slice for each point
            });
        var wop = [
            {x: 0, y: 0, id: 'Asia'},
            {x: 0, y: 0, id: 'Africa'},
            {x: 0, y: 0, id: 'Americas'},
            {x: 0, y: 0, id: 'Europe'},
            {x: 0, y: 0, id: 'Oceania'},
        ]
        
        wop = pie(wop).map(function(d, i) {
            // Needed to caclulate the centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            
                // Building the data object we are going to return
            d.x = arc.centroid(d)[0]+width/2;
            d.y = arc.centroid(d)[1]+height/2;
            
            return d;
        })
        function nodePosX(d){
            switch(d.group){
                case 'Asia':{
                    return wop[0].x
                }
                case 'Africa':{
                    return wop[1].x
                }
                case 'Americas':{
                    return wop[2].x
                }
                case 'Europe':{
                    return wop[3].x
                }
                case 'Oceania':{
                    return wop[4].x
                }
            }
        }
        function nodePosY(d){
            switch(d.group){
                case 'Asia':{
                    return wop[0].y
                }
                case 'Africa':{
                    return wop[1].y
                }
                case 'Americas':{
                    return wop[2].y
                }
                case 'Europe':{
                    return wop[3].y
                }
                case 'Oceania':{
                    return wop[4].y
                }
            }
        }
        simulation.force('x', d3.forceX().strength(0.5).x(nodePosX));
        simulation.force('y', d3.forceY().strength(0.5).y(nodePosY));
        simulation.alpha(1).restart();
        var max = 0;
        graph.nodes.forEach(function(d, i) {
            if (d.y > max){
                max = d.y;
            }
        })
        cirk = !cirk;
        d3.select('#svg').attr('height', max + 200)
    }else{
        simulation.force('x', d3.forceX().strength(0.5).x(center.x));
        simulation.force('y', d3.forceY().strength(0.5).y(center.y));
        simulation.alpha(1).restart();
        cirk = !cirk;
    }
}

function ticked(dur = 0) {
    var node = d3.selectAll('circle');
    var text = d3.selectAll('text');
    node.transition().duration(dur)
        .attr("transform", function(d) { 
            return "translate("+d.x+","+d.y+")"; 
        });
    text.transition().duration(dur)
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
}