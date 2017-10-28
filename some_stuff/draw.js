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
    var rand = Math.random() * (3 - 1) + 1;

    var y = Number(rect.attr('y')) -20;
    var x = Number(rect.attr('x')) -10;

    rect.transition().duration(1000)
        .attr('y', y)
        .attr('x', x)
        .attr('fill', '#F2F2F2')
        .attr('height', rect_size*0.9)
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

function draw(ids){
    
    /*for (i in heart){
        move(heart[i]);
    }*/

    for (i in ids){
        move(ids[i])
    }
}

function clear(ids){
    /*for (i in heart){
        back(heart[i]);
    }*/

    for (i in ids){
        back(ids[i])
    }
}

function readTextFile(country)
{   
    if (old_ids.length != 0){
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
    rawFile.send(null);
}
window.old_ids = []
window.heart = ['#r12x15','#r11x14','#r10x13','#r9x12','#r8x11','#r7x10','#r6x9','#r6x8','#r6x7','#r7x6','#r8x5','#r9x5','#r10x5','#r11x6','#r12x7','#r13x6','#r14x5','#r15x5','#r16x5','#r17x6','#r18x7','#r18x8','#r18x9','#r17x10','#r16x11','#r15x12','#r14x13','#r13x14']