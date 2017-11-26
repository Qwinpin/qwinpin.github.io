
class YearChart {

    /**
     * Constructor for the Year Chart
     *
     * @param electoralVoteChart instance of ElectoralVoteChart
     * @param tileChart instance of TileChart
     * @param votePercentageChart instance of Vote Percentage Chart
     * @param electionInfo instance of ElectionInfo
     * @param electionWinners data corresponding to the winning parties over mutiple election years
     */
    constructor (electoralVoteChart, tileChart, votePercentageChart, electionWinners) {

        //Creating YearChart instance
        this.electoralVoteChart = electoralVoteChart;
        this.tileChart = tileChart;
        this.votePercentageChart = votePercentageChart;
        // the data
        this.electionWinners = electionWinners;
        
        // Initializes the svg elements required for this chart
        this.margin = {top: 10, right: 20, bottom: 30, left: 50};
        let divyearChart = d3.select("#year-chart").classed("fullView", true);

        //fetch the svg bounds
        this.svgBounds = divyearChart.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 100;

        //add the svg to the div
        this.svg = divyearChart.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
    };


    /**
     * Returns the class that needs to be assigned to an element.
     *
     * @param party an ID for the party that is being referred to.
     */
    chooseClass (data) {
        if (data == "R") {
            return "yearChart republican";
        }
        else if (data == "D") {
            return "yearChart democrat";
        }
        else if (data == "I") {
            return "yearChart independent";
        }
    }

    /**
     * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
     */
    update () {
        var width = this.svg.attr('width')
        var height = this.svg.attr('height')
        //Domain definition for global color scale
        let domain = [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60];

        //Color range for global color scale
        let range = ["#063e78", "#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];

        //ColorScale be used consistently by all the charts
        this.colorScale = d3.scaleQuantile()
            .domain(domain)
            .range(range);

        var my_this = this;

        var scaleX = d3.scaleLinear()
            .range([100, this.svg.attr('width')])
            .domain([0, this.electionWinners.length])
        this.svg.append('line')
            .style("stroke-dasharray", ("3, 3"))
            .attr('x1', 0)
            .attr('y1', height/2)
            .attr('x2', width)
            .attr('y2', height/2)
            .attr("stroke-width", 2)
            .attr("stroke", "grey");

        this.svg.append('g')
            .selectAll('circles').data(this.electionWinners)
                .enter().append('circle')
                    .attr('class', function(d){
                        return my_this.chooseClass(d.PARTY)
                    })
                    .attr('r', 15)
                    .attr('cx', function(d, i){
                        return scaleX(i)
                    })
                    .attr('cy', function(d){
                        return my_this.svg.attr('height')/2
                    })
                    .on('mouseover', mouseover)
                    .on('mouseout', mouseout)
                    .on('click', click)
        this.svg.append('g')
            .selectAll('text')
            .data(this.electionWinners)
            .enter().append('text')
                .attr('class', 'yeartext')
                .text(function(d){
                    return d.YEAR;
                })
                .attr('x', function(d, i){
                    return scaleX(i)
                })
                .attr('y', function(d){
                    return my_this.svg.attr('height')/2
                })
                .attr('dx', 0)
                .attr('dy', 40)

        function mouseover (d){
            d3.select(this).classed('highlighted', true)
        }

        function mouseout (d){
            d3.select(this).classed('highlighted', false)
        }

        function click (d){
            d3.selectAll('circle').classed('selected', false)
            d3.select(this).classed('selected', true)
            name = './data//Year_Timeline_' + String(d.YEAR) + '.csv'
            d3.csv(name, function (error, data) {
                my_this.electoralVoteChart.update(data, my_this.colorScale)
                my_this.votePercentageChart.update(data, my_this.colorScale)
                my_this.tileChart.update(data, my_this.colorScale)
        })}
       // ******* TODO: PART I *******

    // Create the chart by adding circle elements representing each election year
    //The circles should be colored based on the winning party for that year
    //HINT: Use the .yearChart class to style your circle elements
    //HINT: Use the chooseClass method to choose the color corresponding to the winning party.

    //Append text information of each year right below the corresponding circle
    //HINT: Use .yeartext class to style your text elements

    //Style the chart by adding a dashed line that connects all these years.
    //HINT: Use .lineChart to style this dashed line

    //Clicking on any specific year should highlight that circle and  update the rest of the visualizations
    //HINT: Use .highlighted class to style the highlighted circle

    //Election information corresponding to that year should be loaded and passed to
    // the update methods of other visualizations


    //******* TODO: EXTRA CREDIT *******

    //Implement brush on the year chart created above.
    //Implement a call back method to handle the brush end event.
    //Call the update method of shiftChart and pass the data corresponding to brush selection.
    //HINT: Use the .brush class to style the brush.

    };

};