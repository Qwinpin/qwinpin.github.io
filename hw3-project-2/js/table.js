/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     */
    constructor(teamData, treeObject) {

        //Maintain reference to the tree Object; 
        this.tree = null; 

        // Create list of all elements that will populate the table
        // Initially, the tableElements will be identical to the teamData
        this.tableElements = null; // 

        ///** Store all match data for the 2014 Fifa cup */
        this.teamData = teamData;

        //Default values for the Table Headers
        this.tableHeaders = ["Delta Goals", "Result", "Wins", "Losses", "TotalGames"];

        /** To be used when sizing the svgs in the table cells.*/
        this.cell = {
            "width": 70,
            "height": 20,
            "buffer": 15
        };

        this.bar = {
            "height": 20
        };

        /** Set variables for commonly accessed data columns*/
        this.goalsMadeHeader = 'Goals Made';
        this.goalsConcededHeader = 'Goals Conceded';

        /** Setup the scales*/
        this.goalScale = null; 

        /** Used for games/wins/losses*/
        this.gameScale = null; 

        /**Color scales*/
        /**For aggregate columns  Use colors '#ece2f0', '#016450' for the range.*/
        this.aggregateColorScale = null; 

        /**For goal Column. Use colors '#cb181d', '#034e7b'  for the range.*/
        this.goalColorScale = null; 
    }


    /**
     * Creates a table skeleton including headers that when clicked allow you to sort the table by the chosen attribute.
     * Also calculates aggregate values of goals, wins, losses and total games as a function of country.
     *
     */
    createTable() {

        // ******* TODO: PART II *******
        
        //Update Scale Domains
        console.log(this.teamData)
        var table = d3.select('#matchTable');

        var maxGoalsMadeTeam = this.teamData.reduce(function(prev, curr) {
            return prev.value['Goals Made'] > curr.value['Goals Made'] ? prev : curr;
        });

        var maxGoals = maxGoalsMadeTeam.value['Goals Made'];

        var maxGamesTeam = this.teamData.reduce(function(prev, curr) {
            return prev.value['TotalGames'] > curr.value['TotalGames'] ? prev : curr;
        });
        
        var maxGames = maxGamesTeam.value['TotalGames'];

        
        window.goalScale = d3.scaleLinear()
            .domain([0, maxGoals])
            .range([0, this.cell.width+30]);

        window.gameScale = d3.scaleLinear()
            .domain([0, maxGames])
            .range([0, this.cell.width]);

        window.colorScale = d3.scaleLinear()
            .domain([0, maxGames])
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb("#ece2f0"), d3.rgb('#016450')]);

        console.log(gameScale(maxGames-3))
        var xAxis = d3.axisBottom(goalScale);
        d3.select('#goalHeader').append('svg')
            .attr('width', this.cell.width+40)
            .append('g')
                .style('font', '8px sans-serif')
                .attr('transform', 'translate(' + 5 + ',' + 5 + ')')
                .call(xAxis);

        window.tableElements = this.teamData.slice(0);
        window.data = tableElements;
        // Create the x axes for the goalScale.

        //add GoalAxis to header of col 1.

        // ******* TODO: PART V *******

        // Set sorting callback for clicking on headers

        // Clicking on headers should also trigger collapseList() and updateTable(). 

       
    }


    /**
     * Updates the table contents with a row for each element in the global variable tableElements.
     */
    updateTable() {
        // ******* TODO: PART III *******
        //Create table rows
        //console.log(tableElements)
        var self = this;
        var body = d3.select('tbody');
        var tr = body.selectAll('tr');
        
        tr
            .data(data, function(d){
                return d;
            })
            .enter()
            .append('tr')
            .attr('class', 'row');
        tr.exit().remove();
        //let tdr = tr.selectAll("td").data(function(d){ return d });

        var td = body.selectAll('tr').selectAll('td');
        td
            .data(function(row, i){
                var name = {'i': i, 'type': row.value.type, 'vis': 'text1', 'value': row.key};
                var goals = {'type': row.value.type, 'vis': 'goal', 'value': {'made': row.value['Goals Made'], 'conc': row.value['Goals Conceded']}};
                var res = {'type': row.value.type, 'vis': 'text2', 'value': row.value.Result.label};
                var win = {'type': row.value.type, 'vis': 'bar', 'value': row.value.Wins};
                var lose = {'type': row.value.type, 'vis': 'bar', 'value': row.value.Losses};
                var total = {'type': row.value.type, 'vis': 'bar', 'value': row.value.TotalGames};
                return [name, goals, res, win, lose, total];
            })
            .enter()
            .append('td');
        td.exit().remove();
        var visual = ['text1', 'text2', 'goal', 'bar'];
        for (var i in visual){
            var c = visual[i];
            var name = body.selectAll('tr').selectAll('td')
            .filter(function(d){
                return d.vis == c;
            })
            console.log(c);
            switch(c){
                case 'text1':{
                    name.text(function(d){
                        return d.value;
                        })
                    name.on('click', function(d){
                        self.updateList(d);
                    })
                    break;
                }
                case 'text2':{
                    name.text(function(d){
                        return d.value;
                    });
                    break;
                }

                case 'bar':{
                    name.select('svg').remove();
                    var bar = name.append('svg')
                        .attr('width', this.cell.width)
                        .attr('height', this.cell.height);
                    bar
                        .append('rect')
                            .attr('height', this.cell.height)
                            .attr('width', function(d){
                                var val = gameScale(d.value);
                                //console.log(val)
                                return val;
                            })
                            .attr('fill', function(d){
                                return colorScale(d.value);
                            })
                        
                    bar.append('g')
                        .append('text')
                                .text(function(d){
                                    return (d.value);
                                })
                        .attr('text-anchor', 'end')
                        .attr('fill', 'white')
                        .attr('dy', '14px')
                        .attr('dx', '10px')
                    break;
                }
                case 'goal':{
                    name.select('svg').remove();
                    var goal = name.append('svg')
                        .attr('width', this.cell.width+50)
                        .attr('height', this.cell.height)
                    
                    goal
                        .append('rect')
                            .attr('x', function(d){
                                return goalScale(Math.min(d.value.made, d.value.conc));
                            })
                            .attr('y', (this.cell.height/2 - 5))
                            .attr('width', function(d){
                                return Math.abs(goalScale(d.value.made) - goalScale(d.value.conc));
                            })
                            .attr('height', function(d){
                                if (d.type == 'aggregate'){
                                    return 10;
                                } else{
                                    return 3;
                                }
                            })
                            .attr('fill', function(d){
                                if (d.value.made > d.value.conc){
                                    return '#363377';
                                } else{
                                    return '#AA3939';
                                }
                            })
                    goal
                        .append('circle')
                            .attr('cx', function(d){
                                console.log(goalScale(d.value.made))
                                return goalScale(d.value.made);
                            })
                            .attr('cy', this.cell.height/2)
                            .attr('r', '5')
                            .attr('class', function(d){
                                if (d.type == 'aggregate'){
                                    return 'madeGoal';
                                } else{
                                    return 'madeGoal_f';
                                }
                            })

                    goal
                        .append('circle')
                            .attr('cx', function(d){
                                return goalScale(d.value.conc);
                            })
                            .attr('cy', this.cell.height/2)
                            .attr('r', '5')
                            .attr('class', function(d){
                                if (d.value.made == d.value.conc){
                                    if (d.type == 'aggregate'){
                                        return 'grey';
                                    } else{
                                        return 'grey_f';
                                    }
                                }
                                if (d.type == 'aggregate'){
                                    return 'concGoal';
                                } else{
                                    return 'concGoal_f';
                                }
                            })
                        break;
                }
            };
        }
    }

    /**
     * Updates the global tableElements variable, with a row for each row to be rendered in the table.
     *
     */
    updateList(i) {
        // ******* TODO: PART IV *******
        console.log(i)
       //tableElements = tableElements.slice(1);
       this.updateTable();
    
        //Only update list for aggregate clicks, not game clicks
        
    }

    /**
     * Collapses all expanded countries, leaving only rows for aggregate values per country.
     *
     */
    collapseList() {
        
        // ******* TODO: PART IV *******

    }


}
