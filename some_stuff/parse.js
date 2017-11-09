window.data_both_sex = [];
window.data;
window.data_graph;
window.data_map;
window.selected_year = '2014';
window.selected_issue = 'Neoplazm';
window.sex_aggregate = false;
window.selected_country = 'Japan'

function p(){
    d3.csv("C://github//qwinpin.github.io//some_stuff//data//death_book.csv", function(load) {
        data = load;
    });
    
}

function bar_data_list_of_countries(){
    data_both_sex_one_issue = [];
    data_sep_sex_one_issue = [];
    all_cause = [];
    for (i in data){
        if (data[i][selected_year] != '' && data[i]['Cause'] == selected_issue && data[i]['Sex'] == 'All'){
            data_both_sex_one_issue.push({'Country': data[i].Countries, 'Year': data[i][selected_year], 'Sex': data[i].Sex})
        }
    }
    for (i in data){
        if (data[i][selected_year] != '' && data[i]['Cause'] == selected_issue && data[i]['Sex'] != 'All'){
            data_sep_sex_one_issue.push({'Country': data[i].Countries, 'Year': data[i][selected_year], 'Sex': data[i].Sex})
        }
    }
    var mid_out = d3.nest()
        .key(function(d){
            return d.Country;
        })
        .entries(data_sep_sex_one_issue)
    var output = [];
    for (i in mid_out){
        console.log(mid_out)
        output.push(mid_out[i].values[1], mid_out[i].values[0])
    }
    create_bar(output);
    console.log(output)
}

function bar_data_list_of_issues(){
    data_bar = [];
    all_cause = [];
    for (i in data_both_sex){
        if (data_both_sex[i][selected_year] != '' && data_both_sex[i]['Cause'] != 'All'){
            data_bar.push([data_both_sex[i].Countries, data_both_sex[i][selected_year]])
        }
    } 
    console.log(data_bar, all_cause)
}