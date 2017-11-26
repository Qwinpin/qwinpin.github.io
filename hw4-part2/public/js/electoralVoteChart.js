   
class ElectoralVoteChart {
    /**
     * Constructor for the ElectoralVoteChart
     *
     * @param shiftChart an instance of the ShiftChart class
     */
    constructor (shiftChart){
        this.shiftChart = shiftChart;
        
        this.margin = {top: 30, right: 20, bottom: 30, left: 50};
        let divelectoralVotes = d3.select("#electoral-vote").classed("content", true);

        //Gets access to the div element created for this chart from HTML
        this.svgBounds = divelectoralVotes.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 150;

        //creates svg element within the div
        this.svg = divelectoralVotes.append("svg")
            .attr("width",this.svgWidth)
            .attr("height",this.svgHeight)
        this.svg.append('g')
    };

    /**
     * Returns the class that needs to be assigned to an element.
     *
     * @param party an ID for the party that is being referred to.
     */
    chooseClass (party) {
        if (party == "R"){
            return "republican";
        }
        else if (party == "D"){
            return "democrat";
        }
        else if (party == "I"){
            return "independent";
        }
    }


    /**
     * Creates the stacked bar chart, text content and tool tips for electoral vote chart
     *
     * @param electionResult election data for the year selected
     * @param colorScale global quantile scale based on the winning margin between republicans and democrats
     */

   update (electionResult, colorScale){
    var my_this = this;
    var width = this.svg.attr('width')
    var height = this.svg.attr('height')

    var indep = electionResult.filter(function(d){
        return d['State_Winner'] == 'I'
    })
    var dem = electionResult.filter(function(d){
        return d['State_Winner'] == 'D'
    })
    var res = electionResult.filter(function(d){
        return d['State_Winner'] == 'R'
    })

    dem.sort(function(a, b){
        return d3.ascending(Number(a.RD_Difference), Number(b.RD_Difference))
    })
    res.sort(function(a, b){
        return d3.ascending(Number(a.RD_Difference), Number(b.RD_Difference))
    })
    
    var all_data = indep.concat(dem, res)
    console.log(all_data)
    var sum = d3.sum(all_data, function(d){
        return Number(d.Total_EV)
    })
    var mean = sum/2;
    var x = d3.scaleLinear()
        .domain([0, sum])
        .range([0, width-100]);

    var shift = 0;
    this.svg.select('g').selectAll('rect')
        .data(all_data)
        .attr('x', function(d){
            var s = shift;
            shift += Number(x(Number(d.Total_EV)))
            return s;
        })
        .attr('y', height/2)
        .attr('width', function(d){
            return x(Number(d.Total_EV))
        })
        .attr('height', height/3)
        .attr('class', 'electoralVotes')
        .style('fill', function(d){
            if (d.State_Winner == 'I'){
                return 'green'
            }
            return colorScale(Number(d.RD_Difference))
        })

    this.svg.select('g')
        .selectAll('rect').data(all_data)
            .enter().append('rect')
            .attr('x', function(d){
                var s = shift;
                shift += Number(x(Number(d.Total_EV)))
                return s;
            })
            .attr('y', height/2)
            .attr('width', function(d){
                return x(Number(d.Total_EV))
            })
            .attr('height', height/3)
            .attr('class', 'electoralVotes')
            .style('fill', function(d){
                if (d.State_Winner == 'I'){
                    return 'green'
                }
                return colorScale(Number(d.RD_Difference))
            })
    this.svg.select('line').remove()
    this.svg.append('line')
        .attr('x1', x(mean))
        .attr('y1', height/2-5)
        .attr('x2', x(mean))
        .attr('y2', height/2 + height/3 + 5)
        .attr("stroke-width", 5)
        .attr("stroke", "#444444");
    this.svg.selectAll('.electoralVoteText').remove()
    this.svg.append('g')
        .append('text')
        .text(function(d){
            return 'Electoral vote (' + String(mean) + ' needed to win)'
        })
        .style('font-size', '36px')
        .style('text-anchor', 'middle')
        .classed('electoralVoteText', true)
        .attr('x', x(mean))
        .attr('y', height/3)

    var sum_indep = d3.sum(indep, function(d){
        return d.Total_EV
    })
    var sum_dem = d3.sum(dem, function(d){
        return d.Total_EV
    })
    var sum_res = d3.sum(res, function(d){
        return d.Total_EV
    })

    this.svg
        .selectAll('text').data([[0, sum_indep, 'I'], [sum_indep, sum_dem, 'D'], [sum, sum_res, 'R']])
        .enter().append('text')
        .text(function(d){
            return d[1];
        })
        .style('font-size', '36px')
        .style('text-anchor', function(d, i){
            if (i == 2){
                return 'end'
            } else{
                return 'start'
            }
        })
        .attr('class', function(d){
            return my_this.chooseClass(d[2])
        })
        .classed('electoralVoteText', true)
        .attr('x', function(d){
            return x(d[0])
        })
        .attr('y', height/3)

          // ******* TODO: PART II *******

    //Group the states based on the winning party for the state;
    //then sort them based on the margin of victory

    //Create the stacked bar chart.
    //Use the global color scale to color code the rectangles.
    //HINT: Use .electoralVotes class to style your bars.

    //Display total count of electoral votes won by the Democrat and Republican party
    //on top of the corresponding groups of bars.
    //HINT: Use the .electoralVoteText class to style your text elements;  Use this in combination with
    // chooseClass to get a color based on the party wherever necessary

    //Display a bar with minimal width in the center of the bar chart to indicate the 50% mark
    //HINT: Use .middlePoint class to style this bar.

    //Just above this, display the text mentioning the total number of electoral votes required
    // to win the elections throughout the country
    //HINT: Use .electoralVotesNote class to style this text element

    //HINT: Use the chooseClass method to style your elements based on party wherever necessary.
    var brush = d3.brushX()
        .extent([[0, height/2 - 5], [width-100, height/2 + height/3 + 5]])
        .on("end", brushmoved);

    this.svg.append('g').attr('class', 'brush').call(brush)

    function brushmoved(){
        var s = d3.event.selection;
        var selected = []
        var a = d3.selectAll('rect').filter(function(d){
            return d3.select(this).attr('x') > s[0] && d3.select(this).attr('x') < s[1]
        })
        a.filter(function(d){
            selected.push(d.State)
        })
        my_this.shiftChart.update(selected)
    }
    //******* TODO: PART V *******
    //Implement brush on the bar chart created above.
    //Implement a call back method to handle the brush end event.
    //Call the update method of shiftChart and pass the data corresponding to brush selection.
    //HINT: Use the .brush class to style the brush.


    };

    
}
