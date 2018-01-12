window.current_year_ss = '2015';

function data_load_ss(){
        d3.csv(".//data//second_story_data.csv", function(data) {
            load_ss(data);
        });
}
function load_ss(data){
    window.second_story = data
    var years = ['1', '1-4', '5-14', '15-24', '25-34', '35-54', '55-74', '75']
    var margin = {top: 5, right: 5, bottom: 50, left: 55};
    var width = d3.select('#map').attr('width');
    var height = d3.select('#map').attr('height');
    window.df_ss_old = d3.nest()
        .key(function(d) { return d.Age })
        .rollup(function(b) { return d3.sum(b, function(d) { return d[current_year_ss]; }); })
        .entries(second_story);
    window.df_ss = d3.nest()
        .key(function(d) { return d.Age })
        .rollup(function(b) { return d3.sum(b, function(d) { return d[current_year_ss]; }); })
        .entries(second_story);

    var x = d3.scaleBand()
        .domain(years)
        .range([0, ss_width-190])

    var y = d3.scaleLog()
        .domain([10, d3.max(df_ss, function(d){ return d.value })])
        .range([0, 600]);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('#map').append('g').attr('id', 'bars')
    var bars = svg.selectAll('rect')
        .data(df_ss)
        .enter().append('rect')
    bars.style('fill', 'grey').attr('class', 'bar')
        .attr('x', function(d){ return 182 + (x(d.key));})
        .transition().duration(500)
        .attr('width', 10)
        .attr('height', function(d){ return y(d.value) })
        .attr('y', function(d){ return 600 - y(d.value); })
        //.attr('height', function(d){ return height-margin.top-margin.bottom - dataScale(d[selectedDimension]); })
        
        //.on("click", barChart.chooseCup)
    // Add the X Axis
    svg.append("g").transition().duration(1000)
        .attr("transform", "translate(150," + 600 + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g").transition().duration(1000)
        .attr("transform", "translate(150,0)")
        .call(d3.axisLeft(y))
}

function update_ss(year){
    current_year_ss = year;
    set_counter(year);
    var y = d3.scaleLog()
        .domain([10, d3.max(df_ss, function(d){ return d.value })])
        .range([0, 600]);
    df_ss.forEach(function(d, j) {
        var temp = d3.nest()
            .key(function(d) { return d.Age;})
            .rollup(function(b) { return d3.sum(b, function(d) { return d[year]; }); })
            .entries(second_story);
        d.value = temp[j].value;
    })
    var svg = d3.select('#map').select('#bars')
    var bars = svg.selectAll('rect')
        .data(df_ss).transition().duration(60)
        .attr('height', function(d){ return y(d.value) })
        .attr('y', function(d){ return 600 - y(d.value); })
}