// we define two variables to hold the column/category headers and the country data itself
var headers;
var countries;

/* this code doesn't quite work because of CORS security restrictions
// we get around this by importing countries.js
d3.json("data.json",
	function(error, data) {
		if (error) {
			console.log("we got an error", error);
			return;
		} else {
			console.log("data loaded ok");
		}
		
		//formatData();
		//createVis();
		//etc.
	}
);
*/

// this object is used to reference the "root" svg element that we will add graphical objects to
var root;
rawData = [
	{
		"type": "indicators",
		"values": ["Rooms per person","Household net financial wealth","Employment rate","Job security","Personal earnings","Educational attainment","Student skills","Years in education","Air pollution","Water quality","Voter turnout","Life expectancy","Self-reported health","Life satisfaction","Assault rate","Homicide rate"]
	},
	{
		"type": "country",
		"name": "Australia",
		"continent": "Oceania",
		"values": [2.3,32178,73,12.4,43908,73,519,18.5,14,91,93,82,85,7.2,2.1,1]
	},
	{
		"type": "country",
		"name": "Austria",
		"continent": "Europe",
		"values": [1.7,47458,72,9.5,43688,82,487,16.9,27,96,82,81.1,69,7.4,3,0.6]
	},
	{
		"type": "country",
		"name": "Belgium",
		"continent": "Europe",
		"values": [2.2,74007,62,7.4,44321,70,509,18.7,21,80,89,80.5,73,6.9,6.7,1.7]
	},
	{
		"type": "country",
		"name": "Canada",
		"continent": "N. America",
		"values": [2.6,63852,72,11.3,42253,88,527,17,16,89,61,81,88,7.4,1.3,1.6]
	},
	{
		"type": "country",
		"name": "Chile",
		"continent": "S. America",
		"values": [1.3,16972,61,10.5,15820,71,439,16.2,53,77,88,78.3,59,6.5,8.3,3.7]
	},
	{
		"type": "country",
		"name": "Czech Republic",
		"continent": "Europe",
		"values": [1.4,14749,66,6.7,19312,92,490,17.8,17,84,63,78,59,6.3,3,1.7]
	},
	{
		"type": "country",
		"name": "Denmark",
		"continent": "Europe",
		"values": [1.9,36184,73,12.9,45802,76,499,18.8,16,94,88,79.9,70,7.5,3.9,0.9]
	},
	{
		"type": "country",
		"name": "Estonia",
		"continent": "Europe",
		"values": [1.6,8802,65,10.7,17323,89,514,17.4,9,75,64,76.3,51,5.4,5.5,5.2]
	},
	{
		"type": "country",
		"name": "Finland",
		"continent": "Europe",
		"values": [1.9,22335,69,14.5,36468,83,543,19.6,15,92,69,80.6,69,7.4,2.4,2.2]
	},
	{
		"type": "country",
		"name": "France",
		"continent": "Europe",
		"values": [1.8,46520,64,9.3,37505,71,497,16.4,12,81,80,82.2,67,6.6,5,1.1]
	},
	{
		"type": "country",
		"name": "Germany",
		"continent": "Europe",
		"values": [1.8,44938,73,8.3,39593,86,510,17.9,16,93,71,80.8,64,6.7,3.6,0.8]
	},
	{
		"type": "country",
		"name": "Greece",
		"continent": "Europe",
		"values": [1.2,13428,56,4.7,28011,65,473,18.5,31,69,62,80.7,76,5.1,3.7,1.5]
	},
	{
		"type": "country",
		"name": "Hungary",
		"continent": "Europe",
		"values": [1,12390,56,7.8,19437,81,496,17.5,15,76,47,75,55,4.7,3.6,1.3]
	},
	{
		"type": "country",
		"name": "Iceland",
		"continent": "Europe",
		"values": [1.6,31182,79,10.8,37290,67,501,19.4,16,97,85,82.4,77,7.6,2.7,0.3]
	},
	{
		"type": "country",
		"name": "Ireland",
		"continent": "Europe",
		"values": [2.1,27378,60,6.9,50109,73,497,17.9,12,84,70,80.6,83,7,2.6,1.2]
	},
	{
		"type": "country",
		"name": "Israel",
		"continent": "Asia",
		"values": [1.1,49240,61,10.5,28629,82,459,15.8,23,66,65,81.8,82,7.1,6.5,2.1]
	},
	{
		"type": "country",
		"name": "Italy",
		"continent": "Europe",
		"values": [1.4,55255,57,6.9,33947,55,486,17.1,21,71,81,82.7,64,5.8,4.7,0.9]
	},
	{
		"type": "country",
		"name": "Japan",
		"continent": "Asia",
		"values": [1.8,74966,70,10.5,35143,92,529,18.7,25,86,69,82.7,30,6,1.4,0.4]
	},
	{
		"type": "country",
		"name": "Korea",
		"continent": "Asia",
		"values": [1.4,26036,64,24.3,35406,80,541,17.7,33,78,76,81.1,37,6,2.1,2.6]
	},
	{
		"type": "country",
		"name": "Luxembourg",
		"continent": "Europe",
		"values": [1.9,66917,65,5.4,52847,78,482,14.9,13,87,91,81.1,72,7,4.3,2.5]
	},
	{
		"type": "country",
		"name": "Mexico",
		"continent": "S. America",
		"values": [1,9946,60,21.4,9885,36,420,14.9,33,78,63,74.2,66,7.3,13.1,23.7]
	},
	{
		"type": "country",
		"name": "Netherlands",
		"continent": "Europe",
		"values": [2,66869,75,8.8,44321,73,519,17.8,30,90,75,81.3,76,7.5,4.9,1.1]
	},
	{
		"type": "country",
		"name": "New Zealand",
		"continent": "Oceania",
		"values": [2.3,33421,73,10.5,30420,73,524,18.2,12,88,74,81.2,89,7.2,2.2,0.9]
	},
	{
		"type": "country",
		"name": "Norway",
		"continent": "Europe",
		"values": [2,6905,75,7.9,43990,81,500,17.9,15,96,76,81.4,73,7.7,3.3,0.6]
	},
	{
		"type": "country",
		"name": "Poland",
		"continent": "Europe",
		"values": [1,9222,60,8.1,19806,89,501,18.2,34,79,55,76.9,57,5.9,1.8,1.1]
	},
	{
		"type": "country",
		"name": "Portugal",
		"continent": "Europe",
		"values": [1.6,28408,64,8.7,24384,32,490,18,20,86,58,80.8,49,5,5.8,1.2]
	},
	{
		"type": "country",
		"name": "Slovak Republic",
		"continent": "Europe",
		"values": [1.2,7798,59,5,19335,91,488,16.4,12,81,59,76.1,62,5.9,3,1.5]
	},
	{
		"type": "country",
		"name": "Slovenia",
		"continent": "Europe",
		"values": [1.4,18065,64,7.7,32480,83,499,18.4,26,87,66,80.1,60,6.1,3.9,0.7]
	},
	{
		"type": "country",
		"name": "Spain",
		"continent": "Europe",
		"values": [1.8,21636,58,10.9,34769,53,484,17.3,25,79,69,82.4,75,6.3,4.2,0.8]
	},
	{
		"type": "country",
		"name": "Sweden",
		"continent": "Europe",
		"values": [1.7,44889,74,13.9,37094,87,496,19.2,10,95,85,81.9,80,7.6,5.1,1]
	},
	{
		"type": "country",
		"name": "Switzerland",
		"continent": "Europe",
		"values": [1.8,99209,79,8.4,50323,86,517,17.2,22,95,49,82.8,81,7.8,4.2,0.7]
	},
	{
		"type": "country",
		"name": "Turkey",
		"continent": "Asia",
		"values": [0.9,10524,48,25.8,19032,31,455,15.2,37,61,88,74.6,67,5.3,5.1,3.3]
	},
	{
		"type": "country",
		"name": "United Kingdom",
		"continent": "Europe",
		"values": [1.8,62965,70,6.8,44743,75,500,16.6,13,97,66,81.1,77,6.8,1.9,1.2]
	},
	{
		"type": "country",
		"name": "United States",
		"continent": "N. America",
		"values": [2.3,115918,67,11.4,54450,89,496,17.1,18,87,70,78.7,90,7,1.5,4.8]
	},
	{
		"type": "country",
		"name": "Brazil",
		"continent": "S. America",
		"values": [1.4,5861,68,14,10905,41,401,16.3,19,75,78,73.5,69,6.7,7.9,21]
	},
	{
		"type": "country",
		"name": "Russian Federation",
		"continent": "Asia",
		"values": [0.9,15142,68,10.5,19719,91,469,16.6,16,49,65,69.8,37,5.6,2.8,10.2]
	}
]
var margin = 50; // all margins will be 50px
var width = 800 - margin * 2;
var height = 800 - margin * 2;

var xScale = d3.scale.linear().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);
var sizeScale = d3.scale.linear().range([3, 20]);

var xAxis = d3.svg.axis().orient("bottom");
var yAxis = d3.svg.axis().orient("left");

var xAxisIndex = 0, yAxisIndex = 0, sizeIndex = 0;

formatData(rawData);
createVis();
updateVis();

function formatData(data) {
	// extract the row of the data array which has the column names (indicators)
	headers = data.filter(
		function (d) {
			return d.type == "indicators";
		}
	);
	// the filter() function we called above will give us an array so we should
	// extract the first element of this array, which has the headers
	headers = headers[0].values;
	
	// do the same thing with countries, but this time filter by "country"
	countries = data.filter(
		function (d) {
			return d.type == "country";
		}
	);
}

function createVis() {
	// this uses d3 to select the #chart element (which is a div)
	// and underneath that select all svg elements, which there is one of
	root = d3.select("#graphics")
		.attr("width", width + margin * 2)
		.attr("height", height + margin * 2);

	// first thing we should do is to create a group element inside the <svg>
	// this will position our scatterplot so that there are margins separating it from the edge of the <svg> canvas
	// we will also redefine our root variable to be this new <g> html object instead of the <svg #graphics> html object that we previous defined it as
	root = root.append("g")
// !!!!!! these .attr setters don't work. the <g> tag does not have x and y properties
		//.attr("x", margin).attr("y", margin)
// we must set the position using the transform property
		.attr("transform", "translate(" + margin + "," + margin + ")"); // we are creating this string: translate(50,50)

	// now we will add two <g> tags, each will contain a scale
	root.append("g")
		.attr("class", "xAxis")
		.attr("transform", "translate(0," + height + ")")
		// this is what creates the axis, tick marks, and text inside of this <g> element
		.call(xAxis)
			// and we also add a <text> element under this <group> with class "label"
			// note that the .attr() calls are only affected the <text> element, not the <g> parent element
			.append("text")
			// by giving this <text> element a class, it allows us to change what the axis text will say in updateVis()
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -6)
			.style("text-anchor", "end");

	root.append("g")
		.attr("class", "yAxis")
		.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end");
		
	root.selectAll(".country").data(countries)
		// we enter the selection and add a <g> for each piece of data
		.enter()
		// the <g> tag will contain a circle
		// we will position the circle by changing the "transform" property of the <g>, NOT the x and y coordinates of the circle
		// this way, if we want to add a label to the circle, we only need to add it to this parent <g> tag and it will take care of positioning the label along with the circle
		.append("g")
		.attr("class", "country")
			.append("circle")
			.style("fill", "#ff0000") // hardcoded styling, not great but c'est la vie
			.style("stroke", "#000000") // would be better to put this in the stylesheet
			.style("stroke-width", 1);
}

// we give the updateVis function a flag to tell it whether or not to animate
function updateVis(animate) {
	// compute the max value for the x and y and size scales
	var maxValX = d3.max(countries, function (d) { return d.values[xAxisIndex];});
	var maxValY = d3.max(countries, function (d) { return d.values[yAxisIndex];});
	var maxValSize = d3.max(countries, function (d) { return d.values[sizeIndex];});
	// and recompute the domain for each axis based on these max values
	// note that we are making the assumption that our measures are starting at 0 (no negative values)
	xScale.domain([0, maxValX]);
	yScale.domain([0, maxValY]);
	sizeScale.domain([0, maxValSize]);

	sizeScale.domain([0, d3.max(countries, function(d){return d.values[sizeIndex]})]);

	// this is the animation duration in ms
	// if animate is true then 500ms, otherwise 0ms (no animation)
	var duration = animate ? 500 : 0;

	// here we will change the position and radius of each circle
	root.selectAll(".country")
		.transition()
		.duration(duration)
		.delay(function(d, i) {
			if (animate) {
				return i * 10;
			} else {
				return 0
			};
		})
		
		// lets not forget that this selection is actually giving us the <g> element that contains the <circle> element
		// (see createVis() for how this is constructed)
		.attr("transform", function(d) {
			// we change the transform property to position the <g>
			// using our scales, we give it the value and it will give us screen coordinates
			// similar to the map() function from processing
			var xValue = xScale(d.values[xAxisIndex]);
			var yValue = yScale(d.values[yAxisIndex]);
			// once again we construct this string translate(x,y)
			return "translate(" +
				xValue + "," + 
				yValue + ")";
		})
		// we also want to change the radius of the circle, first we must select the circle that sits inside of our <g> tag
		.select("circle")
			// change the radius similar to how we changed the transform property
			.attr("r", function(d) {
				// here we return an integer, not a string as above
				return sizeScale(d.values[sizeIndex]);
			});


	// update the scales for the x and y axes
	xAxis.scale(xScale);
	yAxis.scale(yScale);
	
	// this will redraw the axis, ticks, and labels
	root.select(".xAxis").call(xAxis)
		// here is where the axis label is changed!
		// by using the class "label", we can select the <text> tag under the <g class="xAxis"> element
		// and change it's text based on the headers array
		.select(".label").text(headers[xAxisIndex]);
	root.select(".yAxis").call(yAxis)
		.select(".label").text(headers[yAxisIndex]);
}


















