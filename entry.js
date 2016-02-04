require("./styles/style.css");


let d3 = require("d3");
let $ = require("jquery");

let radius = 300;
let multiple = 2;
let iterations = 200;
let points = 100;


function dim() {
    let $svg = $("svg");
    return {
        height: $svg.height(),
        width: $svg.width()
    };
}

function pointPositions(numberOfPoints) {
    let results = [];
    let dimensions = dim();
    let x = dimensions.width / 2;
    let y = dimensions.height / 2;
    let incr = (2 * Math.PI) / numberOfPoints;
    let range = numberOfPoints - 1;
    for(let i = 1; i <= numberOfPoints; i++) {
        let angle = i * incr;
        results.push({
            x: Math.cos(angle) * radius + x,
            y: Math.sin(angle) * radius + y
        });
    }
    return results;
}

function linePositions(pointData) {
    let lineData = [];
    for(let i = 0; i < iterations; i++) {
        let start = i % pointData.length;
        let end = (multiple * i) % pointData.length;
        lineData.push({
            x1: pointData[start].x,
            y1: pointData[start].y,
            x2: pointData[end].x,
            y2: pointData[end].y
        });
    }
    return lineData;
}

function draw() {
    let data = [dim()];
    let svg = d3.select("svg");
    let circle = svg.selectAll("circle").data(data)
        .attr("r", (d) => radius);
    circle.enter().append("circle")
        .attr("cx", (d) => d.width / 2)
        .attr("cy", (d) => d.height / 2)
        .attr("stroke", "black")
        .attr("r", (d) => radius)
        .attr("stroke-width", "2")
        .attr("fill", "none");
    circle.exit().remove();

    let pointData = pointPositions(points);
    let pointGroup = svg.append("g").attr("class", "points");
    let point = pointGroup.selectAll("circle").data(pointData);
    point.enter().append("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 2)
        .attr("fill", "black");
    point.exit().remove();

    let lineData = linePositions(pointData);
    svg.select("g.lines").remove();
    let lineGroup = svg.append("g").attr("class", "lines");
    let line = lineGroup.selectAll("line").data(lineData)
    line.enter().append("line")
        .attr("x1", (d) => d.x1)
        .attr("x2", (d) => d.x2)
        .attr("y1", (d) => d.y1)
        .attr("y2", (d) => d.y2)
        .attr("stroke", "black")
        .attr("stroke-width", 1);
    line.exit().remove();
}

$(function() {
    $("#radius").change(function() {
        radius = $(this).val();
        draw();
    });

    $("#multiple").change(function() {
        multiple = $(this).val();
        draw();
    });

    $("#iterations").change(function() {
        iterations = $(this).val();
        draw();
    });

    $("#points").change(function() {
        points = $(this).val();
        draw();
    });

    draw();
    $(window).resize(function() { draw(); });
});


