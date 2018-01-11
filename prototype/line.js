window.current_year_ss = '2015';

function data_load_ss(){
        d3.csv(".//data//second_story_data.csv", function(data) {
            load_ss(data);
        });
}
function load_ss(data){
    window.second_story = data
    var years = ['1', '1-4', '5-14', '15-24', '25-34', '35-54', '55-74', '75']
    window.df_old = d3.nest()
        .key(function(d) { return d.Age })
        .rollup(function(b) { return d3.sum(b, function(d) { return d[current_year_ss]; }); })
        .entries(second_story);
    window.df = d3.nest()
        .key(function(d) { return d.Age })
        .rollup(function(b) { return d3.sum(b, function(d) { return d[current_year_ss]; }); })
        .entries(second_story);
    console.log(df)

    var x = d3.scaleBand()
        .domain(years)
        .range([0, ss_width-190])

    var y = d3.scaleLog()
        .domain([10, d3.max(df, function(d){ return d.value })])
        .range([800, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.key); })
        .y(function(d) { return y(d.value); });
    console.log(x('5-14'))
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('#map')
        //.append("g")
        //.attr("transform", "translate(190," + 50 + ")")

    // Add the valueline path.
    svg.append("path")
        .attr("transform", "translate(150,0)")
        .datum(df)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(150," + 800 + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .attr("transform", "translate(150,0)")
        .call(d3.axisLeft(y))
    }