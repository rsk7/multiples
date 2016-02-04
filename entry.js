require("./styles/style.css");


let d3 = require("d3");
let $ = require("jquery");

function dim() {
    let $svg = $("svg");
    return {
        height: $svg.height(),
        width: $svg.width()
    };
}

function draw() {
    let data = [dim()];
    let svg = d3.select("svg");
    let circle = svg.selectAll("circle").data(data);
    let circleEnter = circle.enter().append("circle")
        .attr("cx", (d) => d.width / 2)
        .attr("cy", (d) => d.height / 2)
        .attr("r", 300)
        .attr("stroke", "black")
        .attr("stroke-width", "3")
        .attr("fill", "none");
}

$(function() {
    draw();
    $(window).resize(function() { draw(); });
});


