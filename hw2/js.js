open_json3 = function (){
    d3.json('countries_1995_2012.json', data_loader);
}

var agg = false;
var year = 1995;
var new_data = [];
var check = false;
var crit = 'population';
var sorting = 'name';
var show = 'bar';

set_show = function(s){
    show = s;
    console.log(show)
    loader();
}

loader = function(){
    if (show == 'bar'){
        d3.select('table').remove();
        chart();
    } else{
        d3.select('svg').remove();
        show2();
    }
}

updater = function(){
    if (show == 'bar'){
        chart_update();
    } else{
        update2();
    }
}

aggregate = function(sup){
    if (sup == true){
        agg = true;
    } else{
        agg = false;
    }
    updater();
}

set_sort = function(s){
    sorting = s;
    updater();
}

set_criteria = function(p){
    crit = p;
    updater();
}

change_date = function(value){
    year = value;
    updater();
}

style = function(){
    var t = d3.selectAll('tr.row');
    t.style("background-color", function(d, i) { 
        if (i % 2){
            return '#1f1f1f';
        } else{
            return '#2f2f2f';
        }
    });
}

style2 = function(){
    var t = d3.selectAll('rect');
    t.attr("fill", function(d, i) {
        return getRandomColor();
    });
}

function getRandomColor(data, max){
    var ty = data/max * 100;
    if (ty < 20){
        return '#8dd0ff';
    } else{
        if ((ty >= 20) && (ty <= 60)){
            return '#2a9ae9';
        } else{
            return '#453bec';
        }
    }
  }

cont_filter = function(){
    var g = [];
    d3.selectAll("input").each(function(d) {
        if(d3.select(this).attr("type") == "checkbox" && d3.select(this).node().checked) {
           g.push(d3.select(this).attr("value"));
        }
    })
    return g;
}

data_loader = function(data){
    for (i in data){
        var obj = {};
        obj.name = data[i]['name'];
        obj.continent = data[i]['continent'];
        obj.years = [];
        for (j in data[i]['years']){
            var year_data = {};
            year_data.year = data[i]['years'][j]['year'];
            year_data.gdp = data[i]['years'][j]['gdp'];
            year_data.life_expectancy = data[i]['years'][j]['life_expectancy'];
            year_data.population = data[i]['years'][j]['population'];
            obj.years.push(year_data);
        }
        new_data.push(obj);
    }
    loader();
}

chart = function(){
    filt_data = data_me();

    var margin = {top: 50, bottom: 10, left:50, right: 40};
    var width = 800 - margin.left - margin.right;
    var bar_height = 15;
    var height = bar_height*filt_data.length - margin.top - margin.bottom;
 
    var xScale = d3.scaleLinear().range([0, width]);
    var yScale = d3.scaleBand().rangeRound([0, height], .8, 0);
 
    var svg = d3.select("body").select('#forbar').append("svg")
                .attr("width", width+margin.left+margin.right)
                .attr("height", height+margin.top+margin.bottom);
 
    var max = d3.max(filt_data, function(d) { return d.population; } );
    var min = 0;

    xScale.domain([min, max]);
    yScale.domain(filt_data.map(function(d) { return d.name; }));
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .tickSize(0,0);

    svg.append("g")
        .call(yAxis);
    var bar = svg.selectAll('g')
            .data(filt_data)
        .enter().append('g')
            .attr('transform', function(d, i) { return "translate(0," + i * bar_height + ")"; });

    bar.append('rect').transition().duration(1000)
        .attr('width', function(d) { return xScale(d.population); })
        .attr('height', bar_height - 1)
        .attr('x', 150)
        .attr('fill', function(d) { return getRandomColor(d.population, max); });

    bar.append('text')
        .text(function(d){
            return d.name;
        })
        .attr('y', function(d, i){
            return i + 9;
        })
        .attr('class', 'lable');

    
    style2();
}

chart_update = function(){
    filt_data = data_me(year);
    var margin = {top: 50, bottom: 10, left:50, right: 40};
    var width = 800 - margin.left - margin.right;
    var bar_height = 15;
    var height = bar_height*filt_data.length - margin.top - margin.bottom;
    var xScale = d3.scaleLinear().range([0, width]);
    var yScale = d3.scaleBand().rangeRound([0, height], .8, 0);
 
    var svg = d3.select("svg")
        .attr("height", height+margin.top+margin.bottom);

    var max = d3.max(filt_data, function(d) { return d.population; } );
    var min = 0;
    
    xScale.domain([min, max]);
    yScale.domain(filt_data.map(function(d) { return d.name; }));
    
    var old_bar = svg.selectAll('g')
        .data(filt_data);

    old_bar.select('rect').transition().duration(1000)
        .attr('width', function(d) { return xScale(d.population); })
        .attr('fill', function(d) { return getRandomColor(d.population, max) })
        .attr('height', bar_height - 1)
        .attr('x', 150);

    old_bar.select('text')
        .text(function(d){
            return d.name;
        })
        .attr('class', 'lable');

    old_bar.exit().transition().duration(200).remove();
    old_bar.selectAll('text').remove();

    var new_bar = svg.selectAll('g')
        .data(filt_data);

    new_bar.enter().append('g').attr('transform', function(d, i) { return "translate(0," + i * bar_height + ")"; })
        .append('rect').transition().duration(1000)
        .attr('fill', function(d) { return getRandomColor(d.population, max); })
        .attr('width', function(d) { return xScale(d.population); })
        .attr('height', bar_height - 1)
        .attr('x', 150);

    var new_text = svg.selectAll('g').append('text')
        .text(function(d){
            return d.name;
        })
        .attr('y', function(d, i){
            return i + 9;
        })
        .attr('class', 'lable');
}

data_me = function(year = 1995){
    var data = new_data;
    var filt_data = [];
    var agg_data = [];
    var criteria = crit;
    var filter = cont_filter();
    var sort = sorting;
    for (i in data){
        if (filter.length == 0 || filter.indexOf(data[i]['continent']) != -1){
            var obj = {};
            for (j in data[i]['years']){
                if (data[i]['years'][j]['year'] == year){
                    obj.name = data[i]['name'];
                    obj.continent = data[i]['continent'];
                    obj.gdp = data[i]['years'][j]['gdp'];
                    obj.life_expectancy = data[i]['years'][j]['life_expectancy'];
                    if (show == 'bar'){
                        obj.population = data[i]['years'][j][crit];
                    }else{
                        obj.population = data[i]['years'][j]['population'];
                        obj.year = data[i]['years'][j]['year'];}
                }
            }
        }
        if (obj != undefined && filt_data.indexOf(obj) == -1){
            filt_data.push(obj);
        }
    }
    console.log(sort);
    filt_data.sort(function(a, b) {
        if (sort == 'name'){
            return d3.ascending(a[sort], b[sort]);
        } else{
            return d3.descending(a[sort], b[sort]);
        }
    })

    if (agg){
        var aggg = d3.nest()
            .key(function(d) {return d.continent;})
            .rollup(function(v) { return {
                count: v.length,
                total_pop: d3.sum(v, function(d) { return d.population; }),
                sum_gdp: d3.sum(v, function(d) { return d.gdp; }),
                avg_life: d3.mean(v, function(d) { return d.life_expectancy; })}})
            .entries(filt_data);
        console.log(aggg[0]['key'])
        for (i in aggg){
            var obj = {}
            obj.name = aggg[i].key;
            obj.gdp = aggg[i].value.sum_gdp;
            obj.life_expectancy = aggg[i].value.avg_life;
            obj.population = aggg[i].value.total_pop;
            agg_data.push(obj);
        }
        console.log(agg_data)
        agg_data.sort(function(a, b) {
            if (sort == 'name'){
                return d3.ascending(a[sort], b[sort]);
            } else{
                return d3.descending(a[sort], b[sort]);
            }
        })
        console.log(aggg);
        filt_data = agg_data;
    }
    console.log(filt_data);
    return filt_data
}

form = function(key, data){
    switch (key){
        case 'gdp':
            return d3.format('.4s')(data);
        case 'life_expectancy':
            return d3.format('.3g')(data);
        case 'population':
            return d3.format(',')(data);
        default:
            return data;
    }
}

show2 = function (){
    n = data_me(year);
    if (agg){
        var columns = ['name', 'life_expectancy', 'gdp', 'population'];
    } else{
        var columns = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year'];
    }

    var table = d3.select('body').select('#fortable').append('table');
    var thead = table.append('thead').attr('class', 'thead');
    var tbody = table.append('tbody');
    
    table.append('caption').html('Rank of counties');
    thead.append('tr').selectAll('th').data(columns)
    .enter()
        .append('th')
        .text(function(d){
            return d;
        })

        var rows = tbody.selectAll('tr.row')
            .data(n)
            .enter()
            .append('tr')
            .attr('class', 'row');

        var cells = rows.selectAll('td')
            .data(function(row) {
                return d3.range(Object.keys(row).length).map(function(column, i) {
                    return form(Object.keys(row)[i], row[Object.keys(row)[i]]);
                });
            })
                .enter()
                .append("td")
                .text(function(d) { return d; })
        style();
}

update2 = function() {
    filt_data = data_me(year);
    if (agg){
        var columns = ['name', 'gdp', 'life_expectancy', 'population'];
    } else{
        var columns = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year'];
    }

    var head = d3.select('thead').select('tr').selectAll('th').data(columns)
        .text(function(d){return d});
    head.exit().remove();
    var new_head = d3.select('thead').select('tr').selectAll('th').data(columns)
        .enter()
            .append('th')
            .text(function(d){return d});

    //god, i DONT KNOW why does it work properly only with loop
    for(var i = 0; i < 2; i++){
        var rows = d3.select('table').select('tbody').selectAll('tr.row')
            .data(filt_data);

        var cells = rows.selectAll('td')
            .data(function(row) {
                return d3.range(Object.keys(row).length).map(function(column, i) {
                    return form(Object.keys(row)[i], row[Object.keys(row)[i]]);
                })
            });

        cells.enter().append('td');

        cells.text(function(d) { return d; })

        cells.exit()
            .remove();

        var new_rows = d3.select('table').select('tbody').selectAll('tr.row')
            .data(filt_data)
            .enter()
            .append('tr')
            .attr('class', 'row');

        var new_cells = rows.selectAll('td');

        new_cells.append('td')
            .data(function(rows) {
                return d3.range(Object.keys(rows).length).map(function(column, i) {
                    return form(Object.keys(rows)[i], rows[Object.keys(rows)[i]]);
                })
            });
        new_cells.text(function(d) { return d; })

        rows.exit().remove();
        d3.select('table').selectAll('td')
            .text(function(d) { return d; })
        
        style();
        }
}