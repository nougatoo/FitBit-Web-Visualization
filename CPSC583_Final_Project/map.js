var width = 800;
var height = 800;

var svg = d3.select("#graphics")
			.attr("width", width)
			.attr("height", height);

var projection = d3.geo.albers()
					.scale(500) // scales your map
					//.center( [0, 42.313] )
					//.rotate( [71.057,0] )
					.translate([width / 2, height / 2]); // centers in SVG

var path = d3.geo.path()
			.projection(projection);

svg.append("g").attr("class", "map")
	.selectAll("path") // selects path elements, will make them if they don't exist
		//.data(_.filter(countries, function(d) { return d.code === "CA"; })[0].borders) // iterates over geo feature
		.data(usaMap.features)
		.enter() // adds feature if it doesn't exist as an element
		.append("path") // defines element as a path
		.attr("d", path)
		.style("fill", "red")
		.style("stroke", "black")
		.on("click", function(d) {
			console.log("click", d);
			if (d.clicked === undefined) {
				d.clicked = false;
			}
			d.clicked = !d.clicked;
			if (d.clicked == true) {
				d3.select(this).style("fill", "green");
			} else {
				d3.select(this).style("fill", "red");
			}
		})
		.on("mouseover", function(d) {
			console.log("mouse over", d);
			if (d.clicked == false || d.clicked === undefined) {
				d3.select(this).style("fill", "blue");
			}
		})
		.on("mouseout", function(d) {
			if (d.clicked == false || d.clicked === undefined) {
				d3.select(this).style("fill", "orange");
			}
		}); // path generator translates geo data to SVG

var drag = d3.behavior.drag()
        .on("dragstart", function () {
			console.log("dragStart");
		})
        .on("drag", function () {
			var mouse = d3.mouse(this);
			console.log("drag", d3.mouse(this));
		})
        .on("dragend", function () {
			console.log("dragEnd");
		});
		
svg.select(".map")
	.call(drag);
	/*.on("mouseover", function(e) {
		console.log(e);
	});*/