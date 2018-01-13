window.current_year_ss = '2015';

function data_load_ss(){
        d3.csv(".//data//second_story_data.csv", function(data) {
            load_ss(data);
        });
}
function load_ss(data){
    window.second_story = data
    var years = ['1', '1-4', '5-14', '15-24', '25-34', '35-54', '55-74', '75']
    window.margin = {top: 50, right: 5, bottom: 50, left: 55};
    
    window.df_ss_old = d3.nest()
        .key(function(d) { return d.Age })
        .rollup(function(b) { return d3.sum(b, function(d) { return d[current_year_ss]; }); })
        .entries(second_story);
    window.df_ss = d3.nest()
        .key(function(d) { return d.Age })
        .rollup(function(b) { return d3.sum(b, function(d) { return d[current_year_ss]; }); })
        .entries(second_story);
    window.line_height = right_height*0.7;
    var x = d3.scaleBand()
        .domain(years)
        .range([0, right_width-190])

    var y = d3.scaleLog()
        .domain([d3.max(df_ss, function(d){ return d.value }), 1])
        .range([line_height-margin.bottom, 10]);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('#map').append('g').attr('id', 'bars')
    var step = 145 + (x(['1-4']) - x(['1']))/2
    console.log(step)
    var bars = svg.selectAll('rect')
        .data(df_ss)
        .enter().append('rect')
    bars.style('fill', 'grey').attr('class', 'bar')
        .attr('x', function(d){ return step + (x(d.key));})
        .transition().duration(1000)
        .attr('width', 10)
        .attr('height', function(d){ return y(d.value) })
        .attr('y', function(d){ return line_height-margin.bottom - y(d.value); })
        //.attr('height', function(d){ return height-margin.top-margin.bottom - dataScale(d[selectedDimension]); })
        
        //.on("click", barChart.chooseCup)
    // Add the X Axis
    svg.append("g").attr('class', 'axis').transition().duration(1000)
        .attr("transform", "translate(150," + (line_height-margin.bottom) + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g").attr('class', 'axis').transition().duration(1000)
        .attr("transform", "translate(150,0)")
        .call(d3.axisLeft(y))

    svg.append('g').attr('class', 'legend')
        .attr("transform", "translate(150," + (line_height-margin.bottom) + ")")
        .append('rect').style('fill', 'grey')
            .attr('width', 10)
            .attr('height', 10)
            .attr('x', 0)
            .attr('y', 35)
    d3.select('.legend').append('text')
        .attr('x', 15)
        .attr('y', 45)
        .text('Значения по всем локализациям рака')

    d3.select('.legend').append('rect').style('fill', '#FF4040')
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', 0)
        .attr('y', 55)
    d3.select('.legend').append('text')
        .attr('x', 15)
        .attr('y', 65)
        .text('Значения по раку шейки матки')
}

function update_ss(year){
    current_year_ss = year;
    set_counter(year);
    if (typeof(df_ss) == 'undefined'){
        load_ss();
    }
    var y = d3.scaleLog()
        .domain([d3.max(df_ss, function(d){ return d.value }), 1])
        .range([line_height-margin.bottom, 10]);
    df_ss.forEach(function(d, j) {
        var temp = d3.nest()
            .key(function(d) { return d.Age;})
            .rollup(function(b) { return d3.sum(b, function(d) { return d[year]; }); })
            .entries(second_story);
        d.value = temp[j].value;
    })
    var svg = d3.select('#map').select('#bars')
    var bars = svg.selectAll('rect')
        .data(df_ss).transition().duration(100)
        .attr('height', function(d){ return y(d.value) })
        .attr('y', function(d){ return line_height-margin.bottom - y(d.value); })
}

function remove_ss(){
    var svg = d3.select('#map').select('#bars')
    var bars = svg.selectAll('rect').remove().transition().duration(1000)
        .attr('height', function(d){ return 0 })
        .attr('y', function(d){ return line_height-margin.bottom; })

    d3.selectAll('.axis').remove().transition().duration(1000)
}