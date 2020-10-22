var url = "c19_regional_safety_assessment.csv"

var winner = $('.inner').width()
var hinner = $('.inner').height()

var width = $('.container').width()
var height = $('.container').height()

console.log(winner, hinner)
console.log(width, height)
console.log(url)

var margin = {top:80, left:30, right:25, bottom:40},
    h = hinner - margin.top - margin.bottom,
    w = winner;

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
    .attr("width", w)
    .attr("height", h)
    .attr("transform","translate(0,90)")
    .append("g")
    .attr("height", h);

//TOOLTIP
var tooltip = d3.select(".inner")
    .append("div")	
    .attr("class", "tooltip")	

// LOAD DATA CSV
d3.csv(url).then(function(data) {

    ///////////////////////////////////////////////////////////////////////////////////////
    // GROUPING VARIABLE
    var subgroups = ["quar", "gov", "monitor", "healthcare", "vulner", "emergency"]
    // COLOR VARIABLE
    var colorCat1 = "#4f7aa8"
    var colorCat2 = "#f28e29"
    var colorCat3 = "#e05759"
    var colorCat4 = "#76b7b2"
    var colorCat5 = "#59a14e"
    var colorCat6 = "#edc849"
    var colorGray = "#d4d4d4"
    var rangeColor = [colorCat1,colorCat2,colorCat3,colorCat4,colorCat5,colorCat6]
    var rangeQuar = [colorCat1,colorGray,colorGray,colorGray,colorGray,colorGray]
    var rangeGov = [colorGray,colorCat2,colorGray,colorGray,colorGray,colorGray]
    var rangeMon = [colorGray,colorGray,colorCat3,colorGray,colorGray,colorGray]
    var rangeHealth = [colorGray,colorGray,colorGray,colorCat4,colorGray,colorGray]
    var rangeVul = [colorGray,colorGray,colorGray,colorGray,colorCat5,colorGray]
    var rangeEmer = [colorGray,colorGray,colorGray,colorGray,colorGray,colorCat6]
    ///////////////////////////////////////////////////////////////////////////////////////



    data.sort(function(a, b) { return b.total - a.total;});

    var country = d3.map(data, function(d){return(d.country)}).keys() // PER NEGARA dari data (100 row)
    
        //var groups = d3.map(data, function(d){return(d.country)}).keys() // PER NEGARA dari data (252 row)
    
        var xMax = d3.max(data, d => + d.total)
        console.log(xMax)
    
        // Add Y axis
        var y = d3
            .scaleBand()
            .domain(country)
            .range([0, h])
            .padding([0.15])
        var yAxis = svg
            .append("g")
            .attr("class","xaxis")
            .attr("transform","translate(90,0)")
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
            .range([100,w-50]);

        var color = d3
        .scaleOrdinal(rangeColor)
        .domain(subgroups);
    
        var stackedData = d3
            .stack()
            .keys(subgroups)
            (data)
        console.log(stackedData)

        var stackbar = svg
        .append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })

        var stack = stackbar
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d.data.country); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height",y.bandwidth())
        .on("mouseover",function(d) {
            let a = d3.select(this.parentNode).datum().key
            let v = d.data[a]
            let c = d3.select(this).datum().data.country
            let b
            if (a == "quar") {
                b = "Efisiensi Karantina"
            } else if (a == "gov") {
                b = "Efisiensi Pemerintahan"
            } else if (a == "monitor") {
                b = "Deteksi & Pemantauan"
            } else if (a == "healthcare") {
                b = "Kesiapan Fasilitas Kesehatan"
            } else if (a == "vulner") {
                b = "Kerentanan Negara"
            } else if (a == "emergency") {
                b = "Kesiapan dalam Kondisi Darurat"
            }
            console.log(a)
            console.log(v)
            console.log(c)
            tooltip
            .html("<strong>" + c + "</strong>" + "<br>" + b + "<br>" + "<strong>" + v + "</strong>")
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
            let top = d3.mouse(this)[1]+120
            tooltip
            .style("top",top+"px")
            .style("left",d3.mouse(this)[0]+"px")
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

        var textTotal = stackbar
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "legend-total")
        .attr("x", function(d) { return x(d.total)+10; })
        .attr("y", function(d) { return y(d.country)+10; })
        .style("fill","black")
        .text(function(d) { return d.total})        
        
        function changeStackedQuar() { //START CHANGE STACK QUAR
        console.log("change")
        
        data.sort(function(a, b) { return b.quar - a.quar; });  
        
        groups = d3.map(data, function(d){return(d.country)}).keys() // PER NEGARA
        
        // Add Y axis
        y = d3
            .scaleBand()
            .domain(groups)
            .range([0, h])
            .padding([0.15])
        yAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y)
                .tickSizeOuter(0)
                .tickSize(0));
            
        color = d3
        .scaleOrdinal(rangeQuar)
        .domain(subgroups);
        
        stackedData = d3
            .stack()
            .keys(subgroups)
            (data)
            
        console.log(stackedData)
        
        stackbar
        .data(stackedData)
        .transition()
        .duration(1000)
        .attr("fill", function(d) { return color(d.key); })
        
        stack
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d.data.country); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height",y.bandwidth())

        textTotal
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d.quar)+10; })
        .attr("y", function(d) { return y(d.country)+10; })
        .text(function(d) { return d.quar})    
        
        } // END CHANGE STACKED QUAR
        
        function changeStackedGov() { //START CHANGE STACK GOV
        console.log("change")
        
        data.sort(function(a, b) { return b.gov - a.gov; });     
        
        groups = d3.map(data, function(d){return(d.country)}).keys() // PER NEGARA
        
        // Add Y axis
        y = d3
            .scaleBand()
            .domain(groups)
            .range([0, h])
            .padding([0.15])
        yAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y)
                .tickSizeOuter(0)
                .tickSize(0));
            
        color = d3
        .scaleOrdinal(rangeGov)
        .domain(subgroups);
        
        stackedData = d3
            .stack()
            .keys(subgroups)
            (data)
            
        console.log(stackedData)
        
        stackbar
        .data(stackedData)
        .transition()
        .duration(1000)
        .attr("fill", function(d) { return color(d.key); })
        
        stack
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d.data.country); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height",y.bandwidth())

        textTotal
        .transition()
        .duration(1000)
        .attr("x", function(d) { return (x(d.gov) + x(d.quar))-90})
        .attr("y", function(d) { return y(d.country)+10; })
        .text(function(d) { return d.gov})  
        
        } // END CHANGE STACKED GOV
        
        function changeStackedMon() { //START CHANGE STACK MONITOR
        console.log("change")
        data.sort(function(a, b) { return b.monitor - a.monitor; });
        
        groups = d3.map(data, function(d){return(d.country)}).keys() // PER NEGARA
        
        // Add Y axis
        y = d3
            .scaleBand()
            .domain(groups)
            .range([0, h])
            .padding([0.15])
        yAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y)
                .tickSizeOuter(0)
                .tickSize(0));
        
        // Add X axis
        x = d3 //x - scale
            .scaleLinear()
            .domain([0,xMax])
            .range([100,w-50]);
            
        color = d3
        .scaleOrdinal(rangeMon)
        .domain(subgroups);
        
        stackedData = d3
            .stack()
            .keys(subgroups)
            (data)
            
        console.log(stackedData)
        
        stackbar
        .data(stackedData)
        .transition()
        .duration(1000)
        .attr("fill", function(d) { return color(d.key); })
        
        stack
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d.data.country); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height",y.bandwidth())

        textTotal
        .transition()
        .duration(1000)
        .attr("x", function(d) { return (x(d.gov) + x(d.quar) + x(d.monitor))-190})
        .attr("y", function(d) { return y(d.country)+10; })
        .text(function(d) { return d.monitor})  
        
        } // END CHANGE STACKED MONITOR
        
        function changeStackedHealth() { //START CHANGE STACK HEALTH
        console.log("change")
        data.sort(function(a, b) { return b.healthcare - a.healthcare; });
        
        groups = d3.map(data, function(d){return(d.country)}).keys() // PER NEGARA
        
        // Add Y axis
        y = d3
            .scaleBand()
            .domain(groups)
            .range([0, h])
            .padding([0.15])
        yAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y)
                .tickSizeOuter(0)
                .tickSize(0));
            
        color = d3
        .scaleOrdinal(rangeHealth)
        .domain(subgroups);
        
        stackedData = d3
            .stack()
            .keys(subgroups)
            (data)
            
        console.log(stackedData)
        
        stackbar
        .data(stackedData)
        .transition()
        .duration(1000)
        .attr("fill", function(d) { return color(d.key); })
        
        stack
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d.data.country); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height",y.bandwidth())

        textTotal
        .transition()
        .duration(1000)
        .attr("x", function(d) { return (x(d.gov) + x(d.quar) + x(d.monitor) + x(d.healthcare))-290})
        .attr("y", function(d) { return y(d.country)+10; })
        .text(function(d) { return d.healthcare})  
        
        
        } // END CHANGE STACKED HEALTH
        
        function changeStackedVul() { //START CHANGE STACK VULNERABILITY
        console.log("change")
        data.sort(function(a, b) { return b.vulner - a.vulner; });
        
        groups = d3.map(data, function(d){return(d.country)}).keys() // PER NEGARA
        
        // Add Y axis
        y = d3
            .scaleBand()
            .domain(groups)
            .range([0, h])
            .padding([0.15])
        yAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y)
                .tickSizeOuter(0)
                .tickSize(0));
            
        color = d3
        .scaleOrdinal(rangeVul)
        .domain(subgroups);
        
        stackedData = d3
            .stack()
            .keys(subgroups)
            (data)
            
        console.log(stackedData)
        
        stackbar
        .data(stackedData)
        .transition()
        .duration(1000)
        .attr("fill", function(d) { return color(d.key); })
        
        stack
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d.data.country); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height",y.bandwidth())

        textTotal
        .transition()
        .duration(1000)
        .attr("x", function(d) { return (x(d.gov) + x(d.quar) + x(d.monitor) + x(d.healthcare) + x(d.vulner))-390})
        .attr("y", function(d) { return y(d.country)+10; })
        .text(function(d) { return d.vulner})  
        
        } // END CHANGE STACKED VULNERABILITY
        
        function changeStackedEmer() { //START CHANGE STACK EMEREGENCY
        console.log("change")
        data.sort(function(a, b) { return b.emergency - a.emergency; });
        
        groups = d3.map(data, function(d){return(d.country)}).keys() // PER NEGARA
        
        // Add Y axis
        y = d3
            .scaleBand()
            .domain(groups)
            .range([0, h])
            .padding([0.15])
        yAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y)
                .tickSizeOuter(0)
                .tickSize(0));
            
        color = d3
        .scaleOrdinal(rangeEmer)
        .domain(subgroups);
        
        stackedData = d3
            .stack()
            .keys(subgroups)
            (data)
            
        console.log(stackedData)
        
        stackbar
        .data(stackedData)
        .transition()
        .duration(1000)
        .attr("fill", function(d) { return color(d.key); })
        
        stack
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d.data.country); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height",y.bandwidth())

        textTotal
        .transition()
        .duration(1000)
        .attr("x", function(d) { return (x(d.gov) + x(d.quar) + x(d.monitor) + x(d.healthcare) + x(d.vulner) + x(d.emergency))-490})
        .attr("y", function(d) { return y(d.country)+10; })
        .text(function(d) { return d.emergency})  
        
        } // END CHANGE STACKED EMERGENCY
        
        function changeStackedTotal() { //START CHANGE STACK TOTAL
        console.log("change")
        data.sort(function(a, b) { return b.total - a.total; });
        
        groups = d3.map(data, function(d){return(d.country)}).keys() // PER NEGARA
        
        // Add Y axis
        y = d3
            .scaleBand()
            .domain(groups)
            .range([0, h])
            .padding([0.15])
        yAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y)
                .tickSizeOuter(0)
                .tickSize(0));
        
            
        color = d3
        .scaleOrdinal(rangeColor)
        .domain(subgroups);
        
        stackedData = d3
            .stack()
            .keys(subgroups)
            (data)
            
        console.log(stackedData)
        
        stackbar
        .data(stackedData)
        .transition()
        .duration(1000)
        .attr("fill", function(d) { return color(d.key); })
        
        stack
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d.data.country); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height",y.bandwidth())

        textTotal
        .transition()
        .duration(1000)    
        .attr("x", function(d) { return (x(d.total))+10})
        .attr("y", function(d) { return y(d.country)+10; })
        .text(function(d) { return d.total})  
        
        } // END CHANGE STACKED TOTAL
        
        
        
        select.change(function() {
        let selVal = select.val()
        if (selVal == "quar") {
            console.log("KARANTINA")
            changeStackedQuar()
        } else if (selVal == "gov") {
            console.log("GOVERNMENT")
            changeStackedGov()
        } else if (selVal == "mon") {
            console.log("MONITOR")
            changeStackedMon()
        } else if (selVal == "health") {
            console.log("HEALTHCARE")
            changeStackedHealth()
        } else if (selVal == "vul") {
            console.log("VULNERABILITY")
            changeStackedVul()
        } else if (selVal == "emer") {
            console.log("EMERGENCY")
            changeStackedEmer()
        } else if (selVal == "total") {
            console.log("TOTAL")
            changeStackedTotal()
        }
        })

    


}); // END D3.CSV LINE CHART

//Copyright Louis Lugas // tirto.id

