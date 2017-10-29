function handlover(d){
    
    var rect = d3.select(this);
    var id = rect.attr('id');
    window.y = rect.attr('y');
    window.color = rect.attr('fill');
    //neib_handover(id, 2);
    rect.transition().duration(10)
        .attr('fill', '#ffffff')
        .attr('width', rect_size*1.15)
        .attr('height', rect_size*1.15)
    //d3.select(this).moveToFront();
    console.log(id)
}


function handlout(d){
    var rect = d3.select(this);
    var id = rect.attr('id');
    window.y = rect.attr('y');
    //neib_handover(id, 2);
    rect.transition().duration(10)
        .attr('fill', color)
        .attr('width', rect_size)
        .attr('height', rect_size)
    //d3.select(this).moveToFront();
    console.log(id)
}

function move(id){
    var rect = d3.select(id);
    //var rand = Math.random() * (3 - 1) + 1;

    var y = Number(rect.attr('y')) -20;
    var x = Number(rect.attr('x')) -10;

    rect.transition().duration(1000)
        .attr('y', y)
        .attr('x', x)
        .attr('fill', '#F2F2F2')
        .attr('height', rect_size*0.7)
    d3.select(id).moveToFront();
}

function back(id){
    var rect = d3.select(id)
    var y = Number(rect.attr('y')) +20;
    var x = Number(rect.attr('x')) +10;
    //var id = rect.attr('id');
    //neib_handout(id, 2);
    rect
        .attr('y', y)
        .attr('x', x)
        //.attr('y', (y+0.1))
        .attr('fill', 'rgb(31, 30, 34)')
        .attr('height', rect_size)
}

function draw(country){
    current_country_name = country;
    if (current_country != map[country]){
        select_ids = [];
        for (i in current_country){
            back(current_country[i])
        }
        current_country = map[country];
        for(i in current_country){
            move(current_country[i]);
        }
    }
}

function fill_data(data){
    var number_squares = current_country.length;
    
    var base = data.base;
    var target = data.cancer;
    var fill_squares = (fo((target/base)*number_squares));

    console.log(number_squares, base, target, fill_squares);
    if (select_ids.length != 0){
        for (var i = 0; i < select_ids.length; i++){
            //var rand = fo(Math.random() * (number_squares - i) + i);
            //var id = current_country[rand];
            d3.select(select_ids[i]).transition().duration(1000)
                .attr('fill', '#F2F2F2');
        }
        select_ids = [];
    }
    for (var i = 0; i < fill_squares; i++){
        //var rand = fo(Math.random() * (number_squares - i) + i);
        var id = current_country[i];
        d3.select(id).transition().duration(3000)
            .attr('fill', '#550000');
        select_ids.push(id);
    }
    console.log(select_ids)
}

function data_prepare(){
    console.log(current_country_name)
    var show = dataset[current_country_name]['2014'];
    console.log(show)
    fill_data(show)
}

function readTextFile(country)
{   
    switch(country){
        case 'russia': {
            draw(russia);
            break;
        }
        case 'usa':{
            draw(usa);
            break;
        }
        default: {
            console.log('1')
            break;
        }
    }
    /*if (old_ids.length != 0){
        clear(old_ids);
    }
    file = country + '.txt';
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var ids = rawFile.responseText.split(',');
                old_ids = ids;
                draw(ids);
            }
        }
    }
    rawFile.send(null);*/
}
window.current_country_name = '';
window.select_ids = [];
window.current_country = '';
window.old = []
