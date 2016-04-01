/****************************************
Name: Brandon Brien
ID: 10079883

TODO: 
	- Legened for main grid (white = no data available)
	- Count for each color. (could be month, week, year...not sure yet)
	- Reorganize code



*****************************************/





var xScale = d3.scale.linear().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);

var barChartSetup = false;
var svg2;

var width = 960,
    height = 150,
    cellSize = 17, // cell size
    week_days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
	para_choices = ['Calories Burned', 'Steps', 'Distance', 'Floors', 'Minutes Sedentary', 'Minutes Lightly Active', 'Minutes Fairly Active'
					, 'Minutes Very Active', 'Activity Calories', 'Minutes Asleep', 'Minutes Awake', 'Number of Awakenings', 'Time in Bed'],
	color_choices = ["#4292c6", "#74c476", "#74c476", "#fd8d3c", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#de2d26", "#df65b0", "#66c2a4", "#969696", "#969696"],
	maxValuesBar = [7000, 31000, 17, 200, 1500, 800, 220, 250, 6500, 680, 250, 50, 1000],
	color = null,
	barChartIndex = 0,
	barChartDate = null,
	parameter_choice = 0;

	
// Format for the date
var percent = d3.format(".1%"),
    //format = d3.time.format("%m/%d/%Y");
    format = d3.time.format("%Y-%m-%d");

// Initial state of the diagram (calories burned)
change_color_domain(4143);

// Changes the color-scale domain when the parameter changes	
function change_color_domain(new_max)
{

	var r_ange =5;
	
	//Special range for active minutes selection
	if(barChartIndex == 4 || barChartIndex == 5 || barChartIndex == 6  || barChartIndex == 7)
	{
		var r_ange = 7;
	}
	color = d3.scale.quantize()
		//.domain([-.05, .05])
		.domain([0, new_max])
		.range(d3.range(r_ange).map(function(d) { 
			return "q" + d + "-" + parameter_choice; 
		}
		));
}



// Sets up the body 
var svg = d3.select("body").selectAll("svg")
    .data(d3.range(2014, 2017))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "RdYlGn")
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 50) / 2) + "," + (height - cellSize * 7 - 1) + ")");

// Text to show the year
svg.append("text")
    .attr("transform", "translate(-40," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

// Sets up the day/tile for each day
var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })	
  .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return d3.time.weekOfYear(d) * cellSize; })
    .attr("y", function(d) { return d.getDay() * cellSize; })
	
	.on("click", function() {
		barChartDate = d3.select(this).select("title").text();
		barChartDate = barChartDate.split(" ", 1)[0];
		loadBarChart();})
	.on("mouseover", function() {
		d3.select(this).style("box-shadow", "box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)");
		})
    .datum(format);

// Append a title for mouse over on each block1
rect.append("title")
    .text(function(d) { return d; });

// Setting up the month so that we can have month paths
svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("class", "month")
    .attr("d", monthPath)
	

// Create buttons and choics menus
createButtons();
	
// Initally start with the first option on the menu (calories burned) 
update_vis_data(0);

// Handles the parameter changes and updates the visualization and data fixing
function update_vis_data (to_show) {
d3.csv("All_data.csv", function(error, csv) {
  if (error) throw error;
	//console.log(csv);
  var data = d3.nest()
    .key(function(d) {return d.Date; })
	.key(function(d) {
		
		//Deals with the different parameters the user can choose
		switch(to_show) {
			case 0:
				change_color_domain(4143);
				return d['Calories Burned'];
				break;
			case 1:
				change_color_domain(15000);
				return d.Steps;
				break;
			case 2:
				change_color_domain(9.135);
				return d.Distance;
				break;
			case 3:
				change_color_domain(36.17);
				return d.Floors;
				break;
			case 4:
				change_color_domain(1436);
				return d['Minutes Sedentary'];
				break;
			case 5:
				change_color_domain(289);
				return d['Minutes Lightly Active'];
				break;
			case 6:
				change_color_domain(124);
				return d['Minutes Fairly Active'];
				break;
			case 7:
				change_color_domain(62);
				return d['Minutes Very Active'];
				break;
			case 8:
				change_color_domain(2188);
				return d['Activity Calories'];
				break;
			case 9:
				change_color_domain(484);
				return d['Minutes Asleep'];
				break;
			case 10:
				change_color_domain(44.67);
				return d['Minutes Awake'];
				break;
			case 11:
				change_color_domain(24.00);
				return d['Number of Awakenings'];
				break;
			case 12:
				change_color_domain(516);
				return d['Time in Bed'];
				break;
			default:
				console.log("Derp");
		}
		
		
		return d.Steps; 
			
		})

    .map(csv); 

	//console.log(data);
	for(var key in data)	
	{	
		var total = 0;
		for(var key1 in data[key])
		{
			total += Number(key1);
		}
		data[key] = Math.round((total/Object.keys(data[key]).length)*100)/100;
	}
	//console.log(data);
	rect.filter(function(d) { return d in data; })
  		.transition()
		.duration(0)
		.delay(function(d, i) {
			if (true) {
				return i *4;
			} else {
				return 0
			};
		}) 
		.attr("class", function(d) { 
	  

		return "day " + color(data[d]); 
	  
	  
		})
    .select("title")
      .text(function(d) { return d + " : " + data[d]; })
	});

}

// Creates a path around the month of each year
function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
      d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}


// Creates a month legend
var legend = svg.selectAll(".legend")
      .data(month)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + (((i+1) * 75)-20) + ",0)"; });

// Appends the month text to the legend
legend.append("text")
   .attr("class", function(d,i){ return month[i] })
   .style("text-anchor", "end")
   .attr("dy", "-.25em")
   .text(function(d,i){ return month[i] });
   
   
// Creates the day of the month text
for (var i=0; i<7; i++)
{    
	svg.append("text")
		.attr("transform", "translate(-5," + cellSize*(i+1) + ")")
		.style("text-anchor", "end")
		.style("font-size", "10px")
		.attr("dy", "-.25em")
		.text(function(d) { return week_days[i]; }); 
 }
 

 
 // Creates the buttons and option menus that we need
function createButtons() {

	var buttonsData = [
		{name:"", target: "paras"},
	];
	
	var color_index = 0;

	var buttonGroups = d3.select("#buttons").selectAll(".buttonGroup")
		.data(buttonsData).enter()
		.append("span").attr("class", "buttonGroup");

	buttonGroups.append("label").html(function(d){return d.name;});
	
	buttonGroups.style("font-size", "12px");
	buttonGroups.append("select")
		.on("change", function(d) {
			var selectedIndex = d3.select(this).property('selectedIndex');
			if (d.target == "paras") {
				xAxisIndex = selectedIndex;
			}
			barChartIndex = selectedIndex;
			parameter_choice = selectedIndex;
			update_vis_data(selectedIndex);
		})
		.selectAll("option")
			.data(para_choices).enter()
			.append("option")
			.text(function(d) { return d; })
			.style("background-color",  function() {
			
				return color_choices[color_index++];
			});
}


function toggleBorders() {
	

	var is_on = d3.select(".month").attr("d");
	if (is_on != null) {
		svg.selectAll(".month")
		.attr("d", null);
	}
	else {
	svg.selectAll(".month")
		.attr("d", monthPath);
	}
}
function loadScript(url)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;



    // Fire the loading
    head.appendChild(script);
}











//loadBarChart();
function loadBarChart()
{
	d3.select("#BARCHART").remove();
	//console.log(barChartDate);
	
var margin = {top: 150, right: 20, bottom: 30, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//var x = d3.scale.ordinal()
  //  .rangeRoundBands([0, width], .1);
  
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<style='color:red'><center>" + d[para_choices[barChartIndex]].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</center></span>";
  })	

svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.attr("id","BARCHART")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	barChartSetup = true;
	
svg.call(tip);
/*	
var asdfasdf = null;	
d3.tsv("data.tsv", type, function(error, data) {
  if (error) throw error;
  
  console.log(data);
  x.domain(data.map(function(d) { return names}));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
	asdfasdf = data;
  /*
  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
	.append("text")
		.attr("y", 30)
		.style("text-anchor", "middle")
		.text("User");
	
  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg2.selectAll(".bar")
      .data(dataTEST)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });
	  
	  
});

*/

var names = [];

d3.csv("All_data.csv", function(error, csv) {


	if (error) throw error;

	var dataT = [];
	//console.log(csv);
	//console.log(csv.length);
	for(i =0;i<csv.length;i++)
	{
		if (csv[i].Date === barChartDate)
		{
			//csv.splice(i, 1);
			dataT.push(csv[i]);
		}
		else{
			//console.log(csv[i].Date);
			//console.log(barChartDate);
			//console.log();
		}
	
	}
	//console.log(barChartDate);
	//console.log(csv);
	console.log(dataT);

	//Cleans data
	var list_len = dataT.length;
	var delete_num = 0;
	
	for(i=0;i<dataT.length;i++)
	{
		if(dataT[i][para_choices[barChartIndex]] === 0 || dataT[i][para_choices[barChartIndex]] === "0")
		{
			
			dataT.splice(i,1);
			i--;
		}
	}
	
	//Sorts Data
	dataT.sort(function(a, b) {
		return parseFloat(b[para_choices[barChartIndex]]) - parseFloat(a[para_choices[barChartIndex]]);
	});
	
	var data = d3.nest()
		.key(function(d) {return d.Name; })
		.key(function(d) {return d.Date; })
		//.key(function(d) {return d.Steps; })
		//.rollup(function(d) {return d[0].Steps})
		.map(csv);
	//console.log(data);
	// Gets the data and puts it into a nice dictionary
	var testing = 0;
	for(var key2 in data)
	{
		//console.log(data[key2]);
		for(var key in data[key2])	
		{	
			//console.log("asdfasdfasdfasdfasffasd");
			//console.log(barChartDate);
			if (key == barChartDate)
			{
				//console.log(data["Brandon"][key]);
				//data["Brandon"] = Number(data["Brandon"][key]);
				data[key2] = Number(data[key2][key]);
			}
		}
	}
	
	for(var key in data)
	{
		if (typeof data[key] === 'object')
		{
			delete data[key];
		}
			
	}
	//console.log(data);



//console.log(asdfasdf);
	for(var key in data)
	{
		names.push(data[key]);
	}
	


	x.domain(dataT.map(function(d) { return d["Name"]}));
	y.domain([0, d3.max(dataT, function(d) { return maxValuesBar[barChartIndex]})]); //CHANGE
	
	
	svg2.append("rect")
		.attr("x", (width /2)-150)
		.attr("y", -80)
		.attr("width", 300)
		.attr("height", 50)
		.style("fill", "#4292c6");
		
		
	svg2.append("text")
        .attr("x", (width / 2))             
        .attr("y", -60)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")
		.style("fill", "white")
        .text(para_choices[barChartIndex]);
		
	svg2.append("text")
        .attr("x", (width / 2))             
        .attr("y", -40)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px")
		.style("fill", "white")
        .text(barChartDate);
	

	svg2.append("g")
		.attr("class", "yAxis")
		.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.style("text-anchor", "end")
			
	svg2.append("g")
		.attr("class", "xAxis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.append("text")
			.attr("y", 30)
			.attr("x", width/2)
			.style("text-anchor", "middle")
			.text("User");
		
	svg2.selectAll(".bar")
		.data(dataT)
    .enter().append("rect")
      .attr("class", "bar")
     // .attr("x",  function(d, i) {
			// this function is called for each data element (therefore for each new <rect>)
			// 'd' is the data element itself, 'i' is its index
		//	return i * 25;
		//})
		.attr("x", function(d) { return x(d["Name"]); })
		.attr("width", x.rangeBand())
		.attr("height", function(d) { return height - y(d[para_choices[barChartIndex]]); })
		.attr("y", function(d) { 
			var displacement = d3.select(this).attr("height");
			return height-displacement;
		})
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)
		.style("border", "2px solid black")
		.append("text")
			.text("User1")
			.attr("y", 30);

	  

	
});






function type(d) {
  d.frequency = +d.frequency;
  return d;
}

}
