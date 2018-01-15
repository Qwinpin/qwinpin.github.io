window.current_year_ss = '2015';

function data_load_ss(){
        d3.csv(".//data//second_story_data.csv", function(data) {
            d3.csv(".//data//second_story_data2.csv", function(data2) {
                load_ss(data, data2);
            })
        });
}
function load_ss(data, data2){
    window.second_story = data
    window.second_story2 = data2
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

    window.df_ss2 = d3.nest()
        .key(function(d) { return d.Age })
        .rollup(function(b) { return d3.sum(b, function(d) { return d[current_year_ss]; }); })
        .entries(second_story2);

    window.line_height = right_height*0.7;
    window.x = d3.scaleBand()
        .domain(years)
        .range([0, right_width-190])

    window.y = d3.scaleLog()
        .domain([d3.max(df_ss, function(d){ return d.value }), 1])
        .range([line_height-margin.bottom, 10]);
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('#map').append('g').attr('id', 'bars')
    var svg2 = d3.select('#map').append('g').attr('id', 'bars2')
    window.step = 141 + (x(['1-4']) - x(['1']))/2
    var bars = svg.selectAll('rect')
        .data(df_ss)
        .enter().append('rect')
    bars.style('fill', 'grey').attr('class', 'bar')
        .attr('x', function(d){ return step + (x(d.key));})
        .transition().duration(1000)
        .attr('width', 10)
        .attr('height', function(d){ return y(d.value) })
        .attr('y', function(d){ return line_height-margin.bottom - y(d.value); })

    var bars2 = svg2.selectAll('rect')
        .data(df_ss2)
        .enter().append('rect')
    bars2.style('fill', '#FF4040').attr('class', 'bar')
        .attr('x', function(d){ return 10 + step + (x(d.key));})
        .transition().duration(1000)
        .attr('width', 10)
        .attr('height', function(d){ return y(d.value) })
        .attr('y', function(d){ return line_height-margin.bottom - y(d.value); })
    svg.append("g").attr('class', 'axis')
        .attr("transform", "translate(150," + 0 + ")")
        .transition().duration(500)
        .attr("transform", "translate(150," + (line_height-margin.bottom) + ")")
        .call(d3.axisBottom(x));
    svg.append("g").attr('class', 'axis')
        .attr("transform", "translate(150," + 0 + ")")
        .transition().duration(500)
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
        .text('Количество смертей от всех локализаций рака')

    d3.select('.legend').append('rect').style('fill', '#FF4040')
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', 0)
        .attr('y', 55)
    d3.select('.legend').append('text')
        .attr('x', 15)
        .attr('y', 65)
        .text('Количество смертей от рака шейки матки')
    d3.select('#map').append('text').attr('id', 'bars_y')
        .attr('x', -right_width*0.5)
        .attr('y', right_height*0.12)
        .text('Количество смертей').attr("transform", "rotate(-90)");
    df_ss.sort(function(a, b){
        return years.indexOf(a.key) > years.indexOf(b.key) 
    })
    df_ss2.sort(function(a, b){
        return years.indexOf(a.key) > years.indexOf(b.key) 
    })
    // console.log(df_ss, df)
    // var lineFunction = d3.line()
    //     .x(function(d) { return (step + (x(d.key) + 5)); })
    //     .y(function(d) { return (line_height-margin.bottom - y(d.value)); })
    // var lineGraph = d3.select('#bars').append("path")
    //     .attr("d", lineFunction(df_ss))
    //     .attr("stroke", "grey")
    //     .attr("stroke-width", 1)
    //     .attr("fill", "none");
    // var lineFunction = d3.line()
    //     .x(function(d) { return (step + (x(d.key) + 5)); })
    //     .y(function(d) { return (line_height-margin.bottom - y(d.value)); })
    // var lineGraph = d3.select('#bars').append("path")
    //     .attr("d", lineFunction(df_ss))
    //     .attr("stroke", "#FF4040")
    //     .attr("stroke-width", 1)
    //     .attr("fill", "none");
    // var lineFunction2 = d3.line()
    //     .x(function(d) { return (step + (x(d.key) + 5)); })
    //     .y(function(d) { return (line_height-margin.bottom - y(d.value)); })
    // var lineGraph2 = d3.select('#bars2').append("path")
    //     .attr("d", lineFunction2(df_ss2))
    //     .attr("stroke", "#FF4040")
    //     .attr("stroke-width", 1)
    //     .attr("fill", "none");
}

function update_ss(year){
    var years = ['1', '1-4', '5-14', '15-24', '25-34', '35-54', '55-74', '75']
    current_year_ss = year;
    set_counter(year);
    df_ss.forEach(function(d, j) {
        var temp = d3.nest()
            .key(function(d) { return d.Age;})
            .rollup(function(b) { return d3.sum(b, function(d) { return d[year]; }); })
            .entries(second_story);
        d.value = temp[j].value;
    })

    df_ss2.forEach(function(d, j) {
        var temp = d3.nest()
            .key(function(d) { return d.Age;})
            .rollup(function(b) { return d3.sum(b, function(d) { return d[year]; }); })
            .entries(second_story2);
            d.value = temp[j].value;
    })
    var svg = d3.select('#map').select('#bars')
    var bars = svg.selectAll('rect')
        .data(df_ss).transition().duration(100)
        .attr('height', function(d){ return y(d.value) })
        .attr('y', function(d){ return line_height-margin.bottom - y(d.value); })

    var svg2 = d3.select('#map').select('#bars2')
    var bars2 = svg2.selectAll('rect')
        .data(df_ss2).transition().duration(100)
        .attr('height', function(d){
            return y(d.value)
            })
        .attr('y', function(d){ 
            return line_height-margin.bottom - y(d.value);})
//     d3.select('#bars').select("path").remove().transition().duration(100)
//     d3.select('#bars2').select("path").remove().transition().duration(100)
    
//    var lineFunction = d3.line()
//         .x(function(d) { return (step + (x(d.key) + 5)); })
//         .y(function(d) { return (line_height-margin.bottom - y(d.value)); })
//     var lineGraph = d3.select('#bars').append("path")
//         .attr("d", lineFunction(df_ss))
//         .attr("stroke", "#FF4040")
//         .attr("stroke-width", 1)
//         .attr("fill", "none");
//     var lineFunction2 = d3.line()
//         .x(function(d) { return (step + (x(d.key) + 5)); })
//         .y(function(d) { return (line_height-margin.bottom - y(d.value)); })
//     var lineGraph2 = d3.select('#bars2').append("path")
//         .attr("d", lineFunction(df_ss2))
//         .attr("stroke", "#FF4040")
//         .attr("stroke-width", 1)
//         .attr("fill", "none");
}

function remove_ss(){
    var svg = d3.select('#map').select('#bars')
    var bars = svg.selectAll('rect').remove().transition().duration(1000)
        .attr('height', function(d){ return 0 })
        .attr('y', function(d){ return line_height-margin.bottom; })

    d3.selectAll('.axis').remove().transition().duration(1000)
}