function data_load_ts(){
     data = [{'sex':'male', 'loc':'Предстательная железа', 'n1997':9057, 'v1997':68.8, 'n2015':38812, 'v2015':69.6},
         {'sex':'male', 'loc':'Кожа', 'n1997':19644, 'v1997':65.2, 'n2015':26874, 'v2015':68.0},
         {'sex':'male', 'loc':'Легкое', 'n1997':55207, 'v1997':63.1, 'n2015':48139, 'v2015':64.8},
         {'sex':'female', 'loc':'Кожа', 'n1997':30826, 'v1997':67.8, 'n2015':46491, 'v2015':70.3},
         {'sex':'female', 'loc':'Легкое', 'n1997':10453, 'v1997':66.8, 'n2015':12212, 'v2015':67.4},
         {'sex':'female', 'loc':'Молочная железа', 'n1997':40360, 'v1997':58.6, 'n2015':66621, 'v2015':61.3},
         {'sex':'female', 'loc':'Тело матки', 'n1997':14227, 'v1997':61.4, 'n2015':24422, 'v2015':62.4},
         {'sex':'female', 'loc':'Шейка матки', 'n1997':11822, 'v1997':56.1, 'n2015':16710, 'v2015':52.0},
         {'sex':'male', 'loc':'Мозг', 'n1997':2517, 'v1997':46.4, 'n2015':4377, 'v2015':51.3},
         {'sex':'female', 'loc':'Мозг', 'n1997':2277, 'v1997':48.1, 'n2015':4519, 'v2015':55.6},
         {'sex':'male', 'loc':'Желудок', 'n1997':29410, 'v1997':62.8, 'n2015':21416, 'v2015':65.6},
         {'sex':'female', 'loc':'Желудок', 'n1997':21689, 'v1997':66.7, 'n2015':16435, 'v2015':69.1},
         {'sex':'male', 'loc':'Колоректальный рак', 'n1997':18821, 'v1997':65.2, 'n2015':30685, 'v2015':66.4},
         {'sex':'female', 'loc':'Колоректальный рак', 'n1997':24480, 'v1997':67.0, 'n2015':37379, 'v2015':68.2},
        //{'sex':'male', 'loc':'skin', 'n1997':19644, 'v1997':68.8},
    ]
    load_ts(data)
}

function load_ts(data){
    var my_this = this;
    var f = d3.format(",d");
    function tooltip_render(tooltip_data) {
        let text = "<h3 class ='tips'>Локализация: " + tooltip_data.loc + "</h3>";
        text += '\t1997 год: '
        text += "<ul>"
        text += '<li>' + 'Число поставленных диагнозов - <span class="light">' + f(tooltip_data['n1997']) + '</span></li>'
        text += '<li>' + 'Средний возраст - <span class="light">' + tooltip_data['v1997'] + '</span> года</li>'
        text += "</ul>";
        text += '\t2015 год: '
        text += "<ul>"
        text += '<li>' + 'Число поставленных диагнозов - <span class="light">' + f(tooltip_data['n2015']) + '</span></li>'
        text += '<li>' + 'Средний возраст - <span class="light">' + tooltip_data['v2015'] + '</span> года</li>'
        text += "</ul>";
        return text;
    }

    let tip = d3.tip().attr('class', 'd3-tip')
        .direction('nw')
        .offset(function() {
            return [0,0];
        })
        .html((d)=>{
            let tooltip_data = {
            "loc": d.loc,
            "n1997": d['n1997'],
            "v1997": d['v1997'],
            "n2015": d['n2015'],
            "v2015": d['v2015']
            }
            return tooltip_render(tooltip_data);
        });
    d3.select('#map').call(tip)
    // d3.select("#map").append('g').attr('id', 'ts').append("image").attr('id', 'man_map')
    //     .attr("xlink:href",".//pict.svg")
    //     .attr("width", right_width/2)
    //     .attr("height", right_height/2)
    //     .attr('x', right_width*0.3)
    //     .attr('y', right_height*0.1)
    d3.select('#map').append('g').attr('id', 'ts').append('g').attr('id', 'ts1')
    d3.select('#ts').append('g').attr('id', 'ts2')
    d3.selectAll("#ts1").append("image")
        .attr("xlink:href", ".//pict.svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("transform", "translate(" + 100 + ',' + 10 + ")")
    var man = d3.select('#ts2')
    man.selectAll('cirle').data(data)
        .enter()
        .append('circle').attr('class', 'man_node')
        .attr('r', function(d){
            return right_width/70
        })
        .attr('transform', translate)
        .attr('fill', 'white')
        .style("stroke", "grey")
        .on('mouseover', function(d){
            d3.select(this)
                .attr("fill", "#FF4040")
                .attr('stroke', 'white')
            tip.show(d);
        })
        .on('mouseout', function(d){
            d3.select(this)
                .attr("fill", 'white')
                .attr('stroke', 'grey')
            tip.hide(d);
        })

    function translate(d) {
        var x = 0;
        var y = 0;
        if (d.loc == 'Кожа'){
            if (d.sex == 'male'){
                x = 500*0.25;
                y = 500*0.4;
            }else{
                x = 500*1.15;
                y = 500*0.45;
            }
        }
        if (d.loc == 'Легкое'){
            if (d.sex == 'male'){
                x = 500*0.44;
                y = 500*0.38;
            }else{
                x = 500*0.85;
                y = 500*0.48;
            }
        }
        if (d.loc == 'Предстательная железа'){
            x = 500*0.49;
            y = 500*0.55;
        }
        if (d.loc == 'Молочная железа'){
            x = 500*0.95;
            y = 500*0.45;
        }
        if (d.loc == 'Тело матки'){
            x = 500*0.89;
            y = 500*0.63;
        }
        if (d.loc == 'Шейка матки'){
            x = 500*0.93;
            y = 500*0.63;
        }
        if (d.loc == 'Мозг'){
            if (d.sex == 'male'){
                x = 500*0.49;
                y = 500*0.15;
            }else{
                x = 500*0.91;
                y = 500*0.22;
            }
        }
        if (d.loc == 'Желудок'){
            if (d.sex == 'male'){
                x = 500*0.49;
                y = 500*0.45;
            }else{
                x = 500*0.91;
                y = 500*0.55;
            }
        }
        if (d.loc == 'Колоректальный рак'){
            if (d.sex == 'male'){
                x = 500*0.49;
                y = 500*0.49;
            }else{
                x = 500*0.91;
                y = 500*0.59;
            }
        }
        return "translate(" + x + "," + y + ")";
    }

    function info(d){
        console.log(d)
    }
}