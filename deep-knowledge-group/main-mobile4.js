var url = "/index.csv"
var lefttransform = 100

var winner = $('.inner').width()
var hinner = $('.inner').height()

var width = $('.container').width()
var height = $('.container').height()

console.log(winner, hinner)
console.log(width, height)
console.log(url)

var margin = {top:80, left:30, right:25, bottom:80},
    h = hinner - margin.top,
    w = winner - margin.right;

console.log(w, h)

var parseTime = d3.timeParse("%m/%d/%Y"); // PARSE TIME UNTUK MENGUBAH STRING NUMBER MENJADI SATUAN WAKTU
var formatTime = d3.timeFormat("%d %b"); // FORMAT TIME UNTUK MENGUBAH WAKTU MENJADI FORMAT YANG LEBIH MUDAH DIBACA
var formatTime2 = d3.timeFormat("%d %B %Y")
var formatPercent = d3.format(",.0%")

var select = $('.sort-select')

// SVG CONTAINER
svg = d3
    .select(".inner")
    .append("svg")
    .attr("class","svgcontainer")
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("height", h)
    .attr("transform","translate(0)");

//TOOLTIP
var tooltip = d3.select(".inner")
    .append("div")	
    .attr("class", "tooltip")	

// LOAD DATA CSV
d3.csv(url).then(function(data) {

    ///////////////////////////////////////////////////////////////////////////////////////
    // COLOR VARIABLE
    var colorCat1 = "#4f7aa8"
    var colorCat2 = "#f28e29"
    var colorCat3 = "#e05759"
    var colorCat4 = "#76b7b2"
    var colorCat5 = "#59a14e"
    var colorCat6 = "#edc849"
    var colorGray = "#d4d4d4"

    ///////////////////////////////////////////////////////////////////////////////////////



    data.sort(function(a, b) { return b.total - a.total;});
    console.log(data)
    
        var xMax = d3.max(data, d => parseInt(d.tesharian))
        console.log(xMax)
    
        // Add Y axis
        var y = d3
            .scaleBand()
            .domain(data.map(d => {return d.negara}))
            .range([0, h])
            .padding([0.15])
            
        var yAxis = svg
            .append("g")
            .attr("class","yaxis")
            .attr("transform","translate("+(lefttransform-10)+",0)")
            .call(d3.axisLeft(y)
                .tickSizeOuter(0)
                .tickSize(0));

        yAxis
        .selectAll('text')
        .filter(function(){
            return d3.select(this).text() == 'Indonesia'
        })
        .style('color','#bf0000')
        .style('font-weight', 800)
    
        // Add X axis
        var x = d3 //x - scale
            .scaleLinear()
            .domain([0,xMax])
            .range([0,w-150]);

        var bar = svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .style("fill","#76b7b2")
        .attr("x", lefttransform)
        .attr("y", d => y(d.negara))
        .attr("width", d => x(d.tesharian))
        .attr("height",y.bandwidth())
        .on("mouseover",function(d) {            
            tooltip
            .html("<strong>" + d.negara + "</strong>" + "<br>" + d3.format(",.2r")(d.tesharian))
            //
            d3
            .select(this)
            .style("stroke","black")
            .style("stroke-width", 1.5)
            tooltip
            .transition()
            .duration(100)
            .style("opacity",1)
        })
        .on("mousemove",function(){
            let top = d3.mouse(this)[1]+70
            let left = d3.mouse(this)[0]+40
            tooltip
            .style("top",top+"px")
            .style("left",left+"px")
        })
        .on("mouseout",function(d){
            tooltip
            .transition()
            .duration(100)
            .style("opacity",0)
            d3
            .select(this)
            .style("stroke", "none")
        })

        svg
        .append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "legend-total")
        .style("fill","black")
        .attr("x", d => x(d.tesharian)+lefttransform+5)
        .attr("y", d => y(d.negara)+10)
        .text(function(d) { return d3.format(",.2r")(d.tesharian)})  



      


}); // END D3.CSV LINE CHART

//Copyright Louis Lugas // tirto.id

