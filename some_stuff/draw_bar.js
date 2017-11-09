function create_bar(data){
    var margin = {top: 50, bottom: 40, left:50, right: 40};
    var width = width_page/3;
    var bar_height = 7;
    var height = bar_height*data.length;
    d3.select('#starter')
    var svg = d3.select("#bar").append("svg")
                .attr("width", width+margin.left+margin.right)
                .attr("height", height+margin.top+margin.bottom);
 
    var max = d3.max(data, function(d) { return d.Year; } );
    var min = d3.min(data, function(d) { return d.Year; } );;
    console.log(max ,min)
    var xScale = d3.scaleLinear().range([0, width/2]);
    
    xScale.domain([0, max]);
    
    var add_y = 0;
    var bar = svg.selectAll('g')
            .data(data)
        .enter().append('g')
            .attr('transform', function(d, i) { 
                console.log(i)
                if (i%2 == 0){
                    add_y = add_y + 20;
                }
                return "translate(0," + Number(i * bar_height + add_y) + ")"; 
            });

    var yScale = d3.scaleBand().rangeRound([0, height+add_y], .8, 0);
    var names = data.map(function(d){
        return d.Country;
    })
    yScale.domain(names)

    svg.attr('height', height+margin.top+margin.bottom + add_y)
    
    bar.append('rect').transition().duration(1000)
        .attr('width', function(d) { return xScale(d.Year); })
        .attr('height', bar_height - 1)
        .attr('x', 150)
        .attr('fill', function(d){
            console.log(d.Sex)
            if (d.Sex == 'Male'){
                return '#06BCEF';
            } else{
                return '#ffffff';
            }
        });
    var yAxis = d3.axisLeft(yScale)
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + 150 + ',' + 5 + ')')
        .call(yAxis)

    d3.selectAll('text').classed('axis', true);
            
}