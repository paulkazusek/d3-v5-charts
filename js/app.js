var height = 800
var width = 800
var margin = { top: 30, left: 30, right: 30, bottom: 30 }

var maxY = 100
const data = [{ x: 0, y: 10 }, { x: 10, y: 50 }, { x: 20, y: 25 }, { x: 25, y: 30 }]

var yScale, xScale

const curves = [
    'curveLinear',
    'curveBasis',
    'curveBundle',
    'curveCardinal',
    'curveCatmullRom',
    'curveMonotoneX',
    'curveMonotoneY',
    'curveNatural',
    'curveStep',
    'curveStepAfter',
    'curveStepBefore',
    'curveBasisClosed'
]

var svg = d3.select("body").append("svg")
    .attr("class", "axis")
    .attr("width", width)
    .attr("height", height);

function renderXAxis() {
    xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, quadrantWidth()]);

    var xAxis = d3.axisBottom()
        .scale(xScale);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", function () {
            return "translate(" + xStart() + "," + yStart() + ")";
        })
        .call(xAxis);

    d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - quadrantHeight());
}

function renderYAxis() {
    yScale = d3.scaleLinear()
        .domain([100, 0])
        .range([0, quadrantHeight()]);

    var yAxis = d3.axisLeft()
        .scale(yScale);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", function () {
            return "translate(" + xStart() + "," + yEnd() + ")";
        })
        .call(yAxis);

    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", quadrantWidth())
        .attr("y2", 0);
}

function renderLine() {
    var line = d3.line()
        .x(function (d) { return xScale(d.x); })
        .y(function (d) { return yScale(d.y); })
        .curve(d3[curves[0]]);

    svg.append('path')
        .datum(data)
        .attr('class', 'data-line glowed')
        .style('stroke', '#ff0000')
        .style('stroke-width', 2)
        .style('fill', 'none')
        //.attr('d', line)
        .attr("d", function (d) { return line(d); })
        .attr("transform", "translate("
            + xStart() + ","
            + yEnd() + ")")

}

function renderDots() {
    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y))
        .attr('r', 4)
        .style('fill', '#ff0000')
        .style('stroke', '#000000')
        .style('stroke-width', 2)
        .attr("transform", "translate("
            + xStart() + ","
            + yEnd() + ")")
}

function xStart() {
    return margin.left;
}

function yStart() {
    return height - margin.bottom;
}

function xEnd() {
    return width - margin.right;
}

function yEnd() {
    return margin.top;
}

function quadrantWidth() {
    return width - margin.left - margin.right;
}

function quadrantHeight() {
    return height - margin.top - margin.bottom;
}

renderYAxis();
renderXAxis();
renderLine();
renderDots();