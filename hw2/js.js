open_json = function (){
    d3.json('countries_2012.json', show);
}

open_json2 = function (){
    d3.json('countries_2012.json', update);
}

open_json3 = function (){
    d3.json('countries_1995_2012.json', data_loader);
}

var agg = false;
aggregate = function(sup){
    if (sup == true){
        agg = true;
    } else{
        agg = false;
    }
    update2();
}

show = function (data){
    filter = cont_filter();
    var columns = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year'];
    new_data = [];
    for_sort = [];
    for (i in data){
        if (1){
            var obj = {};
            var obj2 = {};
            obj.name = data[i]['name'];
            obj.continent = data[i]['continent'];
            obj.gdp = data[i]['gdp'];
            obj.life_expectancy = data[i]['life_expectancy'];
            obj.population = data[i]['population'];
            obj.year = data[i]['year'];
            new_data.push(obj);
        }
    }    

    var table = d3.select('body').append('table');
    var thead = table.append('thead').attr('class', 'thead');
    var tbody = table.append('tbody');
    
    table.append('caption').html('Rank of counties');
    thead.append('tr').selectAll('th').data(columns)
    .enter()
        .append('th')
        .text(function(d){
            return d;
        })
        .on('click', function(header, i) {
            tbody.selectAll("tr").sort(function(a, b) {
                if (header == '1gdp'){
                    return Number(a[header]) - Number(b[header]);
                } else{
                    return d3.descending(a[header], b[header]);
                }
            });
            style();
        });

        var rows = tbody.selectAll('tr.row')
            .data(new_data)
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

style = function(){
    var t = d3.selectAll('tr.row');
    t.style("background-color", function(d, i) { 
        if (i % 2){
            return '#eeeeee';
        } else{
            return '#dddddd';
        }
    });
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

update = function(data) {
    new_data = [];
    agg_data = [];
    filter = cont_filter();
    var columns = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year'];
    for (i in data){
        if (filter.length == 0 || filter.indexOf(data[i]['continent']) != -1){
            var obj = {};
            var obj2 = {};
            obj.name = data[i]['name'];
            obj.continent = data[i]['continent'];
            obj.gdp = data[i]['gdp'];
            obj.life_expectancy = data[i]['life_expectancy'];
            obj.population = data[i]['population'];
            obj.year = data[i]['year'];
            new_data.push(obj);
        }
    }
    if (agg){
        var aggg = d3.nest()
            .key(function(d) {return d.continent;})
            .entries(new_data);
        for (var i in aggg){
            var list = aggg[i].values;
            for (var j in list){
                agg_data.push(list[j]);
            }
        }
        new_data = agg_data;
    }
    //god, i DONT KNOW why does it work properly only with loop
    for(var i = 0; i < 2; i++){
        var rows = d3.select('table').select('tbody').selectAll('tr.row')
            .data(new_data);

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
            .data(new_data)
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
var new_data = [];
var check = false;
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
    console.log(new_data);
    show2();
}

show2 = function (data, year = 1997){
    filter = cont_filter();
    data = new_data;
    var columns = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year'];
    var n = [];
    for (i in data){
        var obj = {};
        for (j in data[i]['years']){
            if (data[i]['years'][j]['year'] == year){
                obj.name = data[i]['name'];
                obj.continent = data[i]['continent'];
                obj.gdp = data[i]['years'][j]['gdp'];
                obj.life_expectancy = data[i]['years'][j]['life_expectancy'];
                obj.population = data[i]['years'][j]['population'];
                obj.year = data[i]['years'][j]['year'];
            }
        }
        n.push(obj);
    }
    console.log(n);

    var table = d3.select('body').append('table');
    var thead = table.append('thead').attr('class', 'thead');
    var tbody = table.append('tbody');
    
    table.append('caption').html('Rank of counties');
    thead.append('tr').selectAll('th').data(columns)
    .enter()
        .append('th')
        .text(function(d){
            return d;
        })
        .on('click', function(header, i) {
            tbody.selectAll("tr").sort(function(a, b) {
                if (header == '1gdp'){
                    return Number(a[header]) - Number(b[header]);
                } else{
                    return d3.descending(a[header], b[header]);
                }
            });
            style();
        });

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

update2 = function(year = 1996) {
    filt_data = [];
    agg_data = [];
    data = new_data;
    filter = cont_filter();
    var columns = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year'];
    for (i in data){
        if (filter.length == 0 || filter.indexOf(data[i]['continent']) != -1){
            var obj = {};
            for (j in data[i]['years']){
                if (data[i]['years'][j]['year'] == year){
                    obj.name = data[i]['name'];
                    obj.continent = data[i]['continent'];
                    obj.gdp = data[i]['years'][j]['gdp'];
                    obj.life_expectancy = data[i]['years'][j]['life_expectancy'];
                    obj.population = data[i]['years'][j]['population'];
                    obj.year = data[i]['years'][j]['year'];
                }
            }
        }
        if (obj != undefined && filt_data.indexOf(obj) == -1){
            filt_data.push(obj);
        }
    }
    console.log(filt_data);
    if (agg){
        var aggg = d3.nest()
            .key(function(d) {return d.continent;})
            .entries(filt_data);
        for (var i in aggg){
            var list = aggg[i].values;
            for (var j in list){
                agg_data.push(list[j]);
            }
        }
        filt_data = agg_data;
    }
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