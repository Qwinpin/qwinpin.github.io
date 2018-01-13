window.current_year = '1979';
window.dur = 0;

function data_load(){
        d3.csv(".//data//first_story_data.csv", function(data) {
            load(data)
        });
}

function load(data){
    window.first_story = data
    window.df_old = d3.nest()
        .key(function(d) { return d.Cause })
        .rollup(function(b) { return d3.sum(b, function(d) { return d[current_year]; }); })
        .entries(first_story);
    window.df = d3.nest()
        .key(function(d) { return d.Cause })
        .rollup(function(b) { return d3.sum(b, function(d) { return d[current_year]; }); })
        .entries(first_story);
    window.summ_death = 0;
    for (i in df){
        summ_death += df[i].value;
    }
    var element = d3.select('#map').node();
    //window.width = element.getBoundingClientRect().width;
    //window.height = element.getBoundingClientRect().height;
    window.center = { x: right_width / 2, y: right_height / 2 };
    var svg = d3.select('#map')
    window.simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(5))
        .force('x', d3.forceX().strength(0.1).x(center.x))
        .force('y', d3.forceY().strength(0.1).y(center.y))
        .force('collision', d3.forceCollide().strength(0.2).radius(function(d) {
            return d.value / summ_death * 100;
        }))
        .on('tick', ticked);
    sizing(1970);
    var node = svg.append("g").attr('id', 'bubble')
        .selectAll("circle")
        .data(df)
        .enter().append("circle")
            .attr("class", "nodes")
            .attr("r", function(d){
                return d.value / summ_death * right_width/2;
            })
            .attr("fill", function(d){
                if (d.key == 'neoplazm'){
                    return '#FF4040';
                } else{
                    return 'grey';
                }
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
            
            node.on('click', hovered)
            .on('mouseout', hovered_out)
    /*var text = svg.append('g')
        .selectAll('text')
        .data(df)
        .enter().append('text')
            .attr('class', 'text')
            .text(function(d){
                return d.key;
            })
            .attr('font-size', function(d){
                return d.value / summ_death * 300;
            })
            .attr('dx', function(d){
                return -d.value / summ_death * 300;
            })
            .attr('dy', function(d){
                return d.value / summ_death * 300;
            })*/
    
    simulation
        .nodes(df)
        .on("tick", ticked);
    simulation.alpha(0.5).force('collision', d3.forceCollide().radius(function(d) {
        return d.value / summ_death * right_width/2;
    })).restart();
    ticked();
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.05).restart();
            d.fx = d.x;
            d.fy = d.y;
    }
    
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
    }

    function hovered(){
        rate = d3.select(this).data()[0].value;
        cause = d3.select(this).data()[0].key;
        set_counter();
    }

    function hovered_out(){
    }
}

function sizing(v){
    if (v != current_year){
        current_year = v;
        current_year_ss = current_year;
        df.forEach(function(d, j) {
            var temp = d3.nest()
                .key(function(d) { return d.Cause;})
                .rollup(function(b) { return d3.sum(b, function(d) { return d[v]; }); })
                .entries(first_story);
            summ_death = 0;
            for (i in temp){
                summ_death += temp[i].value;
            }
            d.value = temp[j].value;
        })
        simulation.alpha(0.5).force('collision', d3.forceCollide().radius(function(d) {
            return d.value / summ_death * right_width/2;
        })).restart();
        ticked();
        for (i in df){
            if (df[i].key == cause){
                rate = df[i].value; 
            }
        }
    }
    set_counter(v);
}

function ticked() {
    var node = d3.select('#map').selectAll('circle')
        .data(df)
    var text = d3.select('#map').selectAll('text')
        .data(df)
        
    node.transition().duration(60)
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")"; 
        })
        .attr('r', function(d){
            return d.value / summ_death * right_width/2;
        })

    /*text.transition().duration(dur)
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('font-size', function(d){
            return d.value / summ_death * 300;
        })*/
}

function close_fs(){

}