/** Class implementing the votePercentageChart. */
class VotePercentageChart {

    /**
     * Initializes the svg elements required for this chart;
     */
    constructor(){
	    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
	    let divvotesPercentage = d3.select("#votes-percentage").classed("content", true);

	    //fetch the svg bounds
	    this.svgBounds = divvotesPercentage.node().getBoundingClientRect();
	    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
	    this.svgHeight = 200;

	    //add the svg to the div
	    this.svg = divvotesPercentage.append("svg")
	        .attr("width",this.svgWidth)
	        .attr("height",this.svgHeight)

    }


	/**
	 * Returns the class that needs to be assigned to an element.
	 *
	 * @param party an ID for the party that is being referred to.
	 */
	chooseClass(data) {
	    if (data == "R"){
	        return "republican";
	    }
	    else if (data == "D"){
	        return "democrat";
	    }
	    else if (data == "I"){
	        return "independent";
	    }
	}

	/**
	 * Renders the HTML content for tool tip
	 *
	 * @param tooltip_data information that needs to be populated in the tool tip
	 * @return text HTML content for toop tip
	 */
	tooltip_render (tooltip_data) {
	    let text = "<ul>";
	    tooltip_data.result.forEach((row)=>{
	        text += "<li class = " + this.chooseClass(row.party)+ ">" + row.nominee+":\t\t"+row.votecount+"("+row.percentage+"%)" + "</li>"
	    });

	    return text;
	}

	/**
	 * Creates the stacked bar chart, text content and tool tips for Vote Percentage chart
	 *
	 * @param electionResult election data for the year selected
	 */
	update (electionResult){
		var my_this = this;
		var width = this.svg.attr('width')
		var height = this.svg.attr('height')

		var indep_p = Number(electionResult[0].I_PopularPercentage.slice(0,-1));
		var dep_p = Number(electionResult[0].D_PopularPercentage.slice(0,-1));
		var res_p = Number(electionResult[0].R_PopularPercentage.slice(0,-1));

		var indep = electionResult.filter(function(d){
			return d['State_Winner'] == 'I'
		})
		var dem = electionResult.filter(function(d){
			return d['State_Winner'] == 'D'
		})
		var res = electionResult.filter(function(d){
			return d['State_Winner'] == 'R'
		})
		var total = d3.nest()
			.key(function(d){ return d.State_Winner})
			.rollup(function(v){ return d3.sum(v, function(d){ return d.Total_EV})})
			.entries(electionResult)
		var all_data = indep.concat(dem, res)
		
	        //for reference:https://github.com/Caged/d3-tip
			//Use this tool tip element to handle any hover over the chart
		let tip = d3.tip().attr('class', 'd3-tip').html(function(d) { 
			var daaa = {
				'result':[
					{'nominee': d[0].I_Nominee_prop, 'votecount': d[0].I_Votes, 'percentage': d[0].I_Percentage, 'perty': 'I'},
					{'nominee': d[0].D_Nominee_prop, 'votecount': d[0].D_Votes, 'percentage': d[0].D_Percentage, 'perty': 'D'},
					{'nominee': d[0].R_Nominee_prop, 'votecount': d[0].R_Votes, 'percentage': d[0].R_Percentage, 'perty': 'R'}
				]
			}
			return my_this.tooltip_render(daaa);
		});
		this.svg.call(tip)
		var sum = indep_p + dep_p + res_p;
		var x = d3.scaleLinear()
			.domain([0, sum])
			.range([0, width-100]);
		var shift = 0;
		this.svg.selectAll('rect')
			.data([indep, dem, res])
			.attr('x', function(d){
				var s = shift;
				if (d.length == 0){
					return s;
				}
				if (d[0].State_Winner == 'I'){
					var p = Number(d[0].I_PopularPercentage.slice(0,-1))
					shift += x(p)
					return s;
				}
				if (d[0].State_Winner == 'R'){
					var p = Number(d[0].R_PopularPercentage.slice(0,-1))
					shift += x(p)
					return s;
				}
				if (d[0].State_Winner == 'D'){
					var p = Number(d[0].D_PopularPercentage.slice(0,-1))
					shift += x(p)
					return s;
				}
			})
			.attr('y', height/2)
			.attr('width', function(d){
				if (d.length == 0){
					return 0;
				}
				if (d[0].State_Winner == 'I'){
					var p = Number(d[0].I_PopularPercentage.slice(0,-1))
					return x(p);
				}
				if (d[0].State_Winner == 'R'){
					var p = Number(d[0].R_PopularPercentage.slice(0,-1))
					return x(p);
				}
				if (d[0].State_Winner == 'D'){
					var p = Number(d[0].D_PopularPercentage.slice(0,-1))
					return x(p);
				}
			})
			.attr('height', height/5)
			.attr('class', 'electoralVotes')
			.attr('class', function(d){
				if (d.length == 0){
					return my_this.chooseClass('I')
				}
				return my_this.chooseClass(d[0].State_Winner)
			})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)

		this.svg.selectAll('rect')
			.data([indep, dem, res]).enter().append('rect')
			.attr('x', function(d){
				var s = shift;
				if (d.length == 0){
					return s;
				}
				if (d[0].State_Winner == 'I'){
					var p = Number(d[0].I_PopularPercentage.slice(0,-1))
					shift += x(p)
					return s;
				}
				if (d[0].State_Winner == 'R'){
					var p = Number(d[0].R_PopularPercentage.slice(0,-1))
					shift += x(p)
					return s;
				}
				if (d[0].State_Winner == 'D'){
					var p = Number(d[0].D_PopularPercentage.slice(0,-1))
					shift += x(p)
					return s;
				}
			})
			.attr('y', height/2)
			.attr('width', function(d){
				if (d.length == 0){
					return 0;
				}
				if (d[0].State_Winner == 'I'){
					var p = Number(d[0].I_PopularPercentage.slice(0,-1))
					return x(p);
				}
				if (d[0].State_Winner == 'R'){
					var p = Number(d[0].R_PopularPercentage.slice(0,-1))
					return x(p);
				}
				if (d[0].State_Winner == 'D'){
					var p = Number(d[0].D_PopularPercentage.slice(0,-1))
					return x(p);
				}
			})
			.attr('height', height/5)
			.attr('class', 'electoralVotes')
			.attr('class', function(d){
				if (d.length == 0){
					return my_this.chooseClass('I')
				}
				return my_this.chooseClass(d[0].State_Winner)
			})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)

		this.svg.select('line').remove()
		this.svg.append('line')
			.attr('x1', x(sum/2))
			.attr('y1', height/2 - 5)
			.attr('x2', x(sum/2))
			.attr('y2', height/2 + height/5 + 5)
			.attr("stroke-width", 5)
			.attr("stroke", "#444444");
		this.svg.selectAll('.electoralVoteText').remove()
		this.svg.append('g')
			.append('text')
			.text(function(d){
				return 'Popular Vote (50%)'
			})
			.style('font-size', '36px')
			.style('text-anchor', 'middle')
			.classed('electoralVoteText', true)
			.attr('x', x(sum/2))
			.attr('y', height/3)
		this.svg
			.selectAll('text').data(['I', 'D', 'R'])
			.enter().append('text')
			.text(function(d){
				if (d == 'I'){
					return res[0].I_PopularPercentage;
				}
				if (d == 'D'){
					return res[0].D_PopularPercentage;
				}
				if (d == 'R'){
					return res[0].R_PopularPercentage;
				}
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
				return my_this.chooseClass(d)
			})
			.classed('electoralVoteText', true)
			.attr('x', function(d){
				if (d == 'I'){
					return 0;
				}
				if (d == 'D'){
					return Number(res[0].I_PopularPercentage.slice(0,-1))*width/100+100;
				}
				if (d == 'R'){
					return width-100;
				}
			})
			.attr('y', height/3)
   			  // ******* TODO: PART III *******

		    //Create the stacked bar chart.
		    //Use the global color scale to color code the rectangles.
		    //HINT: Use .votesPercentage class to style your bars.

		    //Display the total percentage of votes won by each party
		    //on top of the corresponding groups of bars.
		    //HINT: Use the .votesPercentageText class to style your text elements;  Use this in combination with
		    // chooseClass to get a color based on the party wherever necessary

		    //Display a bar with minimal width in the center of the bar chart to indicate the 50% mark
		    //HINT: Use .middlePoint class to style this bar.

		    //Just above this, display the text mentioning details about this mark on top of this bar
		    //HINT: Use .votesPercentageNote class to style this text element

		    //Call the tool tip on hover over the bars to display stateName, count of electoral votes.
		    //then, vote percentage and Number of votes won by each party.

		    //HINT: Use the chooseClass method to style your elements based on party wherever necessary.

	};


}