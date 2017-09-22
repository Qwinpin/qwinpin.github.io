var list_of_quotes = [
  '"Genius is one percent inspiration and ninety-nine percent perspiration." - Thomas Edison', 
  '"Difficulties increase the nearer we get to the goal." - Johann Wolfgang von Goethe', 
  '"God always takes the simplest way." - Albert Einstein'
];

var num_of_quote = Math.floor(Math.random() * list_of_quotes.length);

var list_show = [];

function changeQ(id){
  old_num = num_of_quote;
  while (num_of_quote == old_num){
    num_of_quote = Math.floor(Math.random() * list_of_quotes.length);
  }
  id.innerHTML = list_of_quotes[num_of_quote];
}

var show = false;
var sorted = false;
var load_JSON = false;
var authors_upd = true;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function add_quote(id){
  if (show == true){
    var div_old = document.getElementById("change");
    id.removeChild(div_old);

    var div_new = document.createElement("div");
    div_new.id = 'change';
    id.appendChild(div_new);
    
    show = false;
    var button_text = document.getElementById('button_load');
    button_text.innerHTML = "<p>Show qoutes</p>";
    //document.getElementById('button_sort').style.visibility = 
    //  'hidden';
    list_show = [];  
  }
  var new_div = document.getElementById("change");
  console.log(prepare_list());
  for (var i = 0; i < list_show.length; i++){
    var bq = document.createElement("blockquote");
    var para = document.createElement("p");
    para.className = 'quote';
    var text = document.createTextNode(list_show[i]);
    para.appendChild(text);
    bq.appendChild(para);
    new_div.appendChild(bq);
  }
  show = true;
  sorted = false;
  var button_text = document.getElementById('button_load');
  button_text.innerHTML = "<p>Update quotes</p>";
    document.getElementById('button_sort').style.visibility =
      'visible';
}

function sort(id){
  if (sorted == false){
    var sort_list = list_show;
    sort_list.sort();
    var div_old = document.getElementById("change");
    id.removeChild(div_old);
    var div_new = document.createElement("div");
    div_new.id = 'change';
    for (var i = 0; i < sort_list.length; i++){
      var bq = document.createElement("blockquote");
      var para = document.createElement("p");
      para.className = 'quote';
      var text = document.createTextNode(sort_list[i]);
      para.appendChild(text);
      bq.appendChild(para);
      div_new.appendChild(bq);
      id.appendChild(div_new);
    }
    sorted = true;
  }
}

function get_JSON(){
  if (load_JSON == false){
    var new_quotes = [];
    var xhttp = new XMLHttpRequest();
    document.getElementById("get_JSON").innerHTML = 
      "<p> Loading now </p>";
    document.getElementById("get_JSON").className = 
      "button";
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var text = JSON.parse(this.responseText);
        for (var i = 0; i < text.length; i++){
          list_of_quotes.push('"' + text[i].quoteText + '"' + ' - ' 
            + text[i].quoteAuthor);
        }
        load_JSON = true;
        authors_upd = false;
        update_select();
        document.getElementById("get_JSON").innerHTML = 
          "<p> New loaded </p>";
        document.getElementById("get_JSON").className = 
          "button";
        console.log(text[0]);
      }
    }
    xhttp.open("GET", "https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json", true);
    xhttp.send();
  }
}

function prepare_list(){
  var author = "All";
  select = document.getElementById("selector");
  author = select.options[select.selectedIndex].value;
  if (author == 'All'){
    var number_chosen = [];
    for(var i = 0; i < 3; i++){
      do{
        num_of_quote = Math.floor(Math.random() * list_of_quotes.length);
      } while (number_chosen.indexOf(num_of_quote) !== -1);
      number_chosen.push(num_of_quote);
      list_show.push(list_of_quotes[num_of_quote]);
    }
  } else {
      var newq = [];
      for (var i = 0; i < list_of_quotes.length; i++){
        if (list_of_quotes[i].search(author) !== -1){
          newq.push(list_of_quotes[i]);
        }
      }
      var len = newq.length;
      if (len > 3){
        len = 3;
      }
      for(var i = 0; i < len; i++){
        var number_chosen = [];
        do{
          num_of_quote = Math.floor(Math.random() * newq.length);
        } while (number_chosen.indexOf(num_of_quote) !== -1);
        number_chosen.push(num_of_quote);
        list_show.push(newq[num_of_quote]);
      }
  }
}

function update_select(){
  if (authors_upd == false){
    var select = document.getElementById("selector");
    var parser = /- [^0-9]+/;
    var list_of_names = [];
    for (var i = 0; i < list_of_quotes.length; i++){
      var name = (parser.exec(list_of_quotes[i]));
      if (name != null){
        list_of_names.push(name);
      }
    }
    list_of_names.sort();
    list_of_names = unique(list_of_names);
    authors_upd = true;
    for (var i = 0; i < list_of_names.length; i++){
      option = document.createElement('option');
      option.value = option.text = list_of_names[i];
      select.add( option );
    }
  }
}

function unique(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true;
  }
  return Object.keys(obj);
}