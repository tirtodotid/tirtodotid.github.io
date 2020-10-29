//RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////////
var inner = $('.inner')         //
var w = window.screen.width,                                  //
    h = window.screen.height                                  //
var gw, gh;                                                   //
var font, space, mult, left, top;
var mapxup, mapyup, mapxdn, mapydn, zoom, weight,
    dash, exup, exdn, exstat, x, y, mult, innerRadius;
                                                              //
//console.log( 'initial size','width' ,w, 'height', h)          //
                                                              //
                                                              //
                                                              //
if ( w < h ) { // MOBILE                                      //
    exup = '370px'
    exdn = '95px' 
    mapxup = -15.5
    mult = 0.38
    innerRadius = 80
                         //
                                                              //
} else if ( w > h ) { // DESKTOP
    exup = '382px'
    exdn = '107px'   
    mapxup = -10.9                                            //
    mult = 0.43
    innerRadius = 120
                         //
                                                              //
};                                                            //
//END RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////

var url1 = "produksi-nikel-2014.csv"

var data2014 = [
    {"company": "PT Vale Indonesia Tbk", "nick": "Vale", "percent": 77},
    {"company": "PT Aneka Tambang Tbk", "nick": "Antam", "percent": 19},
    {"company": "Lainnya", "nick": "Lainnya", "percent": 3}
  ]

var data2018 = [
    {"company": "IMIP", "nick": "IMIP", "percent": 50},
    {"company": "PT Vale Indonesia Tbk", "nick": "Vale", "percent": 22},
    {"company": "Virtual Dragon Nickel Industry", "nick": "VD", "percent": 11},
    {"company": "Harita Group", "nick": "Harita", "percent": 6},
    {"company": "PT Aneka Tambang Tbk", "nick": "Antam", "percent": 6},
    {"company": "Lainnya", "nick": "Lainnya", "percent": 6}
]

console.log(data2014)
console.log(data2018)

var height = (inner.height() - 40) * mult
var width = inner.width()
var radius = height / 2

//////////////////////////////////////////////////////////////////////

var div1 = d3
    .select(".chart2014")
    .append("div")	
    .attr("class", "tooltip1")

var svg1 = d3
    .select('.chart2014')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate('+width/2+','+height/2+')')

var color1 = d3
    .scaleOrdinal()
    .domain(data2014.map(d => d.company))
    .range(["#f28e2b", "#59a14f", "#edc948"])

function arcLabel1() {
    const radius = Math.min(width, height) / 2 * 0.8;
    return d3.arc().innerRadius(radius).outerRadius(radius);
}

var arc1 = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)

var pie1 = d3.pie()
    .sort(null)
    .value(d => d.percent)

var arcs1 = pie1(data2014)

svg1
    .append('g')
    .attr('stroke','white')
    .selectAll('path')
    .data(arcs1)
    .join('path')
        .attr('fill',d => color1(d.data.company))
        .attr('d',arc1)
        .on('mouseover', function(d) {
            svg1
                .selectAll('path')
                .transition()
                .duration(500)
                .style("fill","lightgrey")
            d3
                .select(this)
                .transition()
                .duration(500)
                .style("fill",d => color1(d.data.company)); 
            div1
                .style("color", color1(d.data.company));

            div1
                .html(
                    d.data.company + "</br>"
                    + "<span class='percent'>"+ d.data.percent + "%</span>"
                )
        })
        .on('mouseout',function() {
            svg1
                .selectAll('path')
                .transition()
                .duration(500)
                .style("fill",d => color1(d.data.company));
            })

svg1
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs1)
    .join("text")
    .attr("transform", d => `translate(${arcLabel1().centroid(d)})`)
    .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.1).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .style("font-weight", 600)
        .style("font-size", '10pt')
        .style('fill', 'white')
        .text(d => d.data.nick));

/////////////////////////////////////////////////////////////////////////

var div2 = d3
    .select(".chart2018")
    .append("div")	
    .attr("class", "tooltip2")	

var svg2 = d3
    .select('.chart2018')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate('+width/2+','+height/2+')')

var color2 = d3
    .scaleOrdinal()
    .domain(data2018.map(d => d.company))
    .range(d3.schemeTableau10)

function arcLabel2() {
    const radius = Math.min(width, height) / 2 * 0.8;
    return d3.arc().innerRadius(radius).outerRadius(radius);
}

var arc2 = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)

var pie2 = d3.pie()
    .sort(null)
    .value(d => d.percent)

var arcs2 = pie2(data2018)

svg2
    .append('g')
    .attr('stroke','white')
    .selectAll('path')
    .data(arcs2)
    .join('path')
        .attr('fill',d => color2(d.data.company))
        .attr('d',arc2)
        .on('mouseover', function(d) {
            svg2
                .selectAll('path')
                .transition()
                .duration(500)
                .style("fill","lightgrey")
            d3
                .select(this)
                .transition()
                .duration(500)
                .style("fill",d => color2(d.data.company));

            div2
                .style("color", color2(d.data.company));

            div2
                .html(
                    d.data.company + "</br>"
                    + "<span class='percent'>"+ d.data.percent + "%</span>"
                )

        })
        .on('mouseout',function() {
            svg2
                .selectAll('path')
                .transition()
                .duration(500)
                .style("fill",d => color2(d.data.company));
            })

svg2
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs2)
    .join("text")
    .attr("transform", d => `translate(${arcLabel2().centroid(d)})`)
    .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .style("font-weight", 600)
        .style("font-size", '10pt')
        .style('fill', 'white')
        .text(d => d.data.nick));



//COPYRIGHT 2020 LOUIS LUGAS WICAKSONO // TIRTO.ID
