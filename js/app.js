var height = 800,
    width = 800,
    margin = 25;

var svg = d3.select("body").append("svg")
    .attr("class", "axis")
    .attr("width", width)
    .attr("height", height);

function renderXAxis() {
    var axisLength = width - 2 * margin;

    var scale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, axisLength]);

    var xAxis = d3.axisBottom()
        .scale(scale);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", function () {
            return "translate(" + margin + "," + (height - margin) + ")";
        })
        .call(xAxis);

    d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (height - 2 * margin));
}

function renderYAxis() {
    var axisLength = height - 2 * margin;

    var scale = d3.scaleLinear()
        .domain([100, 0])
        .range([0, axisLength]);

    var yAxis = d3.axisLeft()
        .scale(scale);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", function () {
            return "translate(" + margin + "," + margin + ")";
        })
        .call(yAxis);

    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", axisLength)
        .attr("y2", 0);
}

renderYAxis();
renderXAxis();