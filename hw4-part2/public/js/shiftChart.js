/** Class implementing the shiftChart. */
class ShiftChart {

    /**
     * Initializes the svg elements required for this chart;
     */
    constructor(){
        this.divShiftChart = d3.select("#shiftChart").classed("sideBar", true);
    };

    /**
     * Creates a list of states that have been selected by brushing over the Electoral Vote Chart
     *
     * @param selectedStates data corresponding to the states selected on brush
     */
    update(selectedStates){
        console.log(selectedStates)
        var lst = d3.select('#stateList')
        lst.select('ul').remove()
        lst.selectAll('li').remove()
        lst.append('ul')
        selectedStates = selectedStates.filter(function(n){ return n != undefined }); 
        lst.selectAll('li').data(selectedStates)
            .enter()
            .append('li')
            .html(String);
     // ******* TODO: PART V *******
    //Display the names of selected states in a list

    //******** TODO: PART VI*******
    //Use the shift data corresponding to the selected years and sketch a visualization
    //that encodes the shift information

    //******** TODO: EXTRA CREDIT I*******
    //Handle brush selection on the year chart and sketch a visualization
    //that encodes the shift informatiomation for all the states on selected years

    //******** TODO: EXTRA CREDIT II*******
    //Create a visualization to visualize the shift data
    //Update the visualization on brush events over the Year chart and Electoral Vote Chart

    };


}
