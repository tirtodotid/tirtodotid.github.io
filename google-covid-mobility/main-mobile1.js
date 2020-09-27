var url = "2020_id_region_mobility_report_edit.csv"

var wmob = $('.mobility').width()
var hmob = $('.mobility').height()

var width = $('.container').width()
var height = $('.container').height()

var next = $('.next')
var prev = $('.previous')

prev.css("opacity", 0)
prev.css("cursor", "none")
prev.css("pointer-events", "none")

var page = 1

var story = d3.select(".story")
    .append("div")
    .attr("class", "storyline")

console.log(wmob, hmob)
console.log(width, height)
console.log(url)

var margin = {top:80, left:30, right:25, bottom:40},
    h = hmob - margin.top - margin.bottom,
    w = wmob - margin.left - margin.right;

console.log(w, h)


var svg_line = d3.select(".mobility") // MEMILIH CONTAINER
    .append("svg") // MENAMBAHKAN ELEMEN SVG
    .attr("width", wmob) // LEBAR TOTAL = LEBAR INFOGRAFIK + JARAK KIRI & KANAN
    .attr("height", hmob) // TINGGI TOTAL  = TINGGI INFOGRAFIK + JARAK ATAS & BAWAH
    .append("g") // MENAMBAHKAN ELEMEN G (GROUP)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


var parseTime = d3.timeParse("%m/%d/%Y"); // PARSE TIME UNTUK MENGUBAH STRING/num_endBER MENJADI SATUAN WAKTU
var formatTime = d3.timeFormat("%d %b"); // FORMAT TIME UNTUK MENGUBAH WAKTU MENJADI FORMAT YANG LEBIH MUDAH DIBACA
var formatTime2 = d3.timeFormat("%d %B %Y")
var formatPercent = d3.format(",.0%")

var div = d3.select(".mobility")
    .append("div")	
    .attr("class", "tooltip")		
    
var mark = d3.select(".mobility")
    .append("div")	
    .attr("class", "markertooltip")

var leg = d3.select(".mobility")
    .append("div")	
    .attr("class", "legendtooltip")	

// LOAD DATA CSV
d3.csv(url).then(function(data) {

    data.forEach(function(d) {
        d.date = parseTime(d.date); // PARSE TIME
    })
    var num_start = 0
    var num_end = 17

    var allGroup = d3.map(data, function(d){return(d.code)}).keys()
    console.log(allGroup)

    var group = data.filter(d => d.code ==allGroup[0])
    console.log(group)

    var ket = group.filter(d => d.keterangan != "")
    console.log(ket)

    groupSlice = group.slice(0,num_end + 1)
    console.log(groupSlice)

    var param = ['home', 'retail', 'grocery', 'parks', 'transit', 'work']
    console.log(param)
    console.log(data)

    var ex1 = d3.extent(groupSlice, d => + d.home)
    var ex2 = d3.extent(groupSlice, d => + d.retail)
    var ex3 = d3.extent(groupSlice, d => + d.grocery)
    var ex4 = d3.extent(groupSlice, d => + d.parks)
    var ex5 = d3.extent(groupSlice, d => + d.transit)
    var ex6 = d3.extent(groupSlice, d => + d.work)
    var val = ex1.concat(ex2, ex3, ex4, ex5, ex6)
    var ex = d3.extent(val)
    var exScale = ex.map(d => d * 1.05)
    console.log(exScale)

    var caseScale = d3.extent(groupSlice, d => + d.kasus)
    caseScale = caseScale.map(d => d * 1.05)

    var ycase = d3.scaleLinear()
        .domain(caseScale)
        .range([h,200])    

    // MENENTUKAN SKALA SUMBU X (TAHUN)
    var x = d3.scaleTime() //UNTUK KESELURUHAN GRAFIK
        // MENGAMBIL DATA MINIMUM & MAKSIMUM SEKALIGUS SEBAGAI DOMAIN
        .domain([groupSlice[0].date, groupSlice[num_end].date])
        // MENENTUKAN RANGE AKHIR BERDASARKAN LEBAR INFOGRAFIK
        .range([0,w])
        // MERAPIKAN SKALA SUMBU X

    var scale = w/(num_end+1)*group.length
    console.log(scale)

    var m = d3.scaleTime() //MARKER PERISTIWA
        .domain([group[num_start].date, group[num_end].date])
        .range([0,w])

    var k = d3.scalePoint() // HANYA UNTUK AXIS X
        .domain([data[num_start].date, data[num_end].date])
        .range([0,w])

    

    var xg = svg_line.append("g")
        .attr("class","xaxis")
        .attr("transform", "translate (0," + (h+15) + " )")
        // MENGGAMBAR SUMBU X
        .call(d3.axisBottom(k)
            .tickSize((-h-25))
            .tickFormat(formatTime)
            .ticks(2));
        
    // MENENTUKAN SKALA SUMBU Y (ANOMALI SUHU)
    var y = d3.scaleLinear()
        .domain(exScale) // SKALA AWAL DARI NILAI TERENDAH - TERTINGGI PADA DATA
        .range([h-100, 0]) // SKALA TARGET DARI TINGGI INFOGRAFIK - 0
        .nice(); // FUNGSI UNTUK MERAPIKAN AXIS
    
    var y1 =  d3.scaleLinear()
    .domain(exScale.map(d => d/100)) // SKALA AWAL DARI NILAI TERENDAH - TERTINGGI PADA DATA
    .range([h-100, 0]) // SKALA TARGET DARI TINGGI INFOGRAFIK - 0
    .nice(); // FUNGSI UNTUK MERAPIKAN AXIS

    var yg = svg_line.append("g")
        .attr("class","yaxis")
        // MENGGAMBAR SUMBU Y
        .call(d3.axisLeft(y1)
            .tickSize(-w-wmob)
            .tickFormat(formatPercent))


    var line_case = svg_line.append("path")
    .datum(group)
    .raise()
    .attr("id","line_chart_case")
    .attr("fill","none") // WARNA BIDANG (DIKOSONGKAN)
    .attr("stroke", "black") // WARNA GARIS -- PART 1 "STEELBLUE"/PART 2 "LINEAR GRADIENT"
    .attr("stroke-width", 3) // KETEBALAN GARIS
    .attr("d", d3.line()
        .curve(d3.curveMonotoneX)
        .x(function(d) {return m(d.date)}) // POSISI X
        .y(function(d) {return ycase(d.kasus)})) // POSISI Y;


    // MENGGAMBAR GRAFIK GARIS (LINE CHART) HOME
    var line_home = svg_line.append("path")
        .datum(group)
        .attr("id","line_chart_home")
        .attr("fill","none") // WARNA BIDANG (DIKOSONGKAN)
        .attr("stroke", "#d15b2c") // WARNA GARIS -- PART 1 "STEELBLUE"/PART 2 "LINEAR GRADIENT"
        .attr("stroke-width", 2) // KETEBALAN GARIS
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return m(d.date)}) // POSISI X
            .y(function(d) {return y(d.home)})) // POSISI Y;
        
    // MENGGAMBAR GRAFIK GARIS (LINE CHART) WORK
    var line_work = svg_line.append("path")
        .datum(group)
        .attr("id","line_chart_work")
        .attr("fill","none") // WARNA BIDANG (DIKOSONGKAN)
        .attr("stroke", "#3d3db7") // WARNA GARIS -- PART 1 "STEELBLUE"/PART 2 "LINEAR GRADIENT"
        .attr("stroke-width", 2) // KETEBALAN GARIS
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return m(d.date)}) // POSISI X
            .y(function(d) {return y(d.work)})); // POSISI Y

    // MENGGAMBAR GRAFIK GARIS (LINE CHART) RETAIL
    var line_retail = svg_line.append("path")
        .datum(group)
        .attr("id","line_chart_retail")
        .attr("fill","none") // WARNA BIDANG (DIKOSONGKAN)
        .attr("stroke", "#a14bc9") // WARNA GARIS -- PART 1 "STEELBLUE"/PART 2 "LINEAR GRADIENT"
        .attr("stroke-width", 2) // KETEBALAN GARIS
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return m(d.date)}) // POSISI X
            .y(function(d) {return y(d.retail)})); // POSISI Y

    // MENGGAMBAR GRAFIK GARIS (LINE CHART) GROCERY
    var line_grocery = svg_line.append("path")
        .datum(group)
        .attr("id","line_chart_grocery")
        .attr("fill","none") // WARNA BIDANG (DIKOSONGKAN)
        .attr("stroke", "#e2a539") // WARNA GARIS -- PART 1 "STEELBLUE"/PART 2 "LINEAR GRADIENT"
        .attr("stroke-width", 2) // KETEBALAN GARIS
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return m(d.date)}) // POSISI X
            .y(function(d) {return y(d.grocery)})); // POSISI Y);

    // MENGGAMBAR GRAFIK GARIS (LINE CHART) PARKS
    var line_parks = svg_line.append("path")
        .datum(group)
        .attr("id","line_chart_parks")
        .attr("fill","none") // WARNA BIDANG (DIKOSONGKAN)
        .attr("stroke", "#37aa83") // WARNA GARIS -- PART 1 "STEELBLUE"/PART 2 "LINEAR GRADIENT"
        .attr("stroke-width", 2) // KETEBALAN GARIS
        .attr("d",d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return m(d.date)}) // POSISI X
            .y(function(d) {return y(d.parks)})); // POSISI Y);

    // MENGGAMBAR GRAFIK GARIS (LINE CHART) TRANSIT
    var line_transit = svg_line.append("path")
        .datum(group)
        .attr("id","line_chart_transit")
        .attr("fill","none") // WARNA BIDANG (DIKOSONGKAN)
        .attr("stroke", "#28a8df") // WARNA GARIS -- PART 1 "STEELBLUE"/PART 2 "LINEAR GRADIENT"
        .attr("stroke-width", 2) // KETEBALAN GARIS
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return m(d.date)}) // POSISI X
            .y(function(d) {return y(d.transit)})); // POSISI Y);

    var line_zero = svg_line // TITIK 0
        .append("line") // MENAMBAH GARIS
        .attr("class", "zero")
        .style("stroke", "black") // WARNA GARIS
        .attr("x1", 0) // KOORDINAT X PERTAMA
        .attr("x2", w+margin.right) // KOORDINAT X KEDUA (MENYAMAKAN DENGAN LEBAR INFOGRAFIK)
        .attr("y1", y(0)) // KOORDINAT Y PERTAMA
        .attr("y2", y(0)); // KOORDINAT Y KEDUA (SAMA -- GARIS LURUS)

    var markergroup = svg_line.selectAll(".markergroup")
        .data(ket)
        .enter()
        .append("g")
        .attr("class", "markergroup")
        .attr("id", (d,i) => [i])

    var markerline = markergroup
        .append("line")
        .raise()
        .attr("class", "markerline")
        .style("stroke","#d10808")
        .style("stroke-width", 1)
        .attr("x1", d => m(d.date)) // KOORDINAT X PERTAMA
        .attr("x2", d => m(d.date)) // KOORDINAT X KEDUA (MENYAMAKAN DENGAN LEBAR INFOGRAFIK)
        .attr("y1", -5) // KOORDINAT Y PERTAMA
        .attr("y2", h) // KOORDINAT Y KEDUA (SAMA -- GARIS LURUS)
        .attr("pointer-events", "all") 
        .attr("cursor", "pointer")
        .attr("opacity",.3)
    
    var markercircle = markergroup
        .append("circle")
        .attr("class", "markercircle")
        .style("stroke","#d10808")
        .style("stroke-width",2)
        .style("fill","white")
        .attr("r",7)
        .attr("cx", d => m(d.date))
        .attr("cy", -10)
        .attr("pointer-events", "all") 
        .attr("cursor", "pointer")

    let locale = d3.formatLocale({
        decimal: ",",
        thousands: ".",
        grouping: [3]
    })
    
    var cases1 = svg_line
        .append("text")
        .attr("class", "casetooltip")
        .attr("dy", "0em")
        .text(group[num_end].hari+", "+formatTime2(group[num_end].date))

    var cases3 = svg_line
        .append("text")
        .attr("class", "jumlah")
        .attr("dy","1.2em")
        .attr("font-weight", "400")
        .text("Jumlah Kasus Kumulatif")

    var cases2 = svg_line
        .append("text")
        .attr("class", "number")
        .attr("dy", "2em")
        .text(locale.format(",")(group[num_end].kasus))


    line_home
        .on("mouseover", function() {
                d3
                    .selectAll("path")
                    .raise()
                    .transition()
                    .duration(200)
                    .attr("stroke-opacity", 0.2)
               
                d3
                    .select(this)
                    .transition()
                    .duration(200)
                    .attr("stroke-opacity", 1)
                
                leg
                    .transition()		
                    .duration(200)		
                    .style("opacity", .9)
    
                leg
                    .html(
                    "<span class='dot-home'></span><strong> Area Perumahan</strong>"
                     )
            })

        .on("mouseout", function() {
                d3
                    .selectAll("path")
                    .transition()
                    .duration(200)
                    .attr("stroke-opacity", 1)

                d3
                    .select(this)
                    .transition()
                    .duration(200)
                    .attr("stroke-opacity", 1)

                leg
                    .transition()		
                    .duration(200)		
                    .style("opacity", 0)
            })

    line_work
        .on("mouseover", function() {
            d3
                .selectAll("path")
                .raise()
                .transition()
                .duration(200)
                .attr("stroke-opacity", 0.2)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", .9)

            leg
                .html(
                "<span class='dot-work'></span><strong> Area Perkantoran</strong>"
                    )
        })

        .on("mouseout", function() {
            d3
                .selectAll("path")
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", 0)
        })

    line_grocery
        .on("mouseover", function() {
            d3
                .selectAll("path")
                .raise()
                .transition()
                .duration(200)
                .attr("stroke-opacity", 0.2)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", .9)

            leg
                .html(
                "<span class='dot-grocery'></span><strong> Area Perbelanjaan & Farmasi</strong>"
                    )
        })

        .on("mouseout", function() {
            d3
                .selectAll("path")
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", 0)
        })

    line_retail
        .on("mouseover", function() {
            d3
                .selectAll("path")
                .raise()
                .transition()
                .duration(200)
                .attr("stroke-opacity", 0.2)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", .9)

            leg
                .html(
                "<span class='dot-retail'></span><strong> Area Pertokoan Retail</strong>"
                    )
        })

        .on("mouseout", function() {
            d3
                .selectAll("path")
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", 0)
        })

    line_parks
        .on("mouseover", function() {
            d3
                .selectAll("path")
                .raise()
                .transition()
                .duration(200)
                .attr("stroke-opacity", 0.2)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", .9)

            leg
                .html(
                "<span class='dot-parks'></span><strong> Taman & Area Rekreasi Luar Ruang</strong>"
                    )
        })

        .on("mouseout", function() {
            d3
                .selectAll("path")
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", 0)
        })

    line_transit
        .on("mouseover", function() {
            d3
                .selectAll("path")
                .raise()
                .transition()
                .duration(200)
                .attr("stroke-opacity", 0.2)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", .9)

            leg
                .html(
                "<span class='dot-transit'></span><strong> Pusat Transportasi</strong>"
                    )
                
        })

        .on("mouseout", function() {
            d3
                .selectAll("path")
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            d3
                .select(this)
                .transition()
                .duration(200)
                .attr("stroke-opacity", 1)

            leg
                .transition()		
                .duration(200)		
                .style("opacity", 0)
        })


    markergroup
        .on("mouseover", function(d) {
            d3
                .selectAll(".markergroup")
                .transition()
                .duration(100)
                .attr("stroke-opacity", 0.2)
            
            d3
                .select(this)
                .raise()
                .transition()
                .duration(100)
                .attr("stroke-opacity",1)

            d3
                .select(this)
                .select(".markercircle")
                .transition()
                .duration(100)
                .style("fill","#d10808")

            d3
                .select(this)
                .select(".markerline")
                .transition()
                .duration(100)
                .attr("opacity", 1)
                .style("stroke-width",2)

            mark
                .transition()		
                .duration(200)		
                .style("opacity", .9)

            mark
                .html(
                "<span class='date'><strong>" + d.hari + "</strong>, "
                + "<strong>"+ formatTime2(d.date) + "</strong></span><br/>"
                + d.keterangan
                 )	
        })
        .on("mouseout", function() {
            d3
                .selectAll(".markergroup")
                .lower()
                .transition()
                .duration(100)
                .attr("stroke-opacity", 1)
            
            d3
                .select(this)
                .transition()
                .duration(100)
                .attr("stroke-opacity",1)
            
            d3
                .select(this)
                .select(".markercircle")
                .transition()
                .duration(100)
                .style("fill","white")

            d3
                .select(this)
                .select(".markerline")
                .lower()
                .transition()
                .duration(100)
                .attr("opacity", .3)
                .style("stroke-width",1)

                mark
                .transition()		
                .duration(200)		
                .style("opacity", 0)
        })

page1()
svg_line.call(hover)

next.on("click", function(){
    if (page === 1) {
        enablePrev()
        page2()
        page++
    } else if (page === 2) {
        page3()
        page++
    } else if (page === 3) {
        page4()
        page++
    } else if (page === 4) {
        page5()
        page++
    } else if (page === 5) {
        disableNext()
        page6()
        page++
    }
    console.log("Next Click","Page:",page)
}) 

prev.on("click", function() {
    if (page === 6) {
        enableNext()
        page5()
        page--
    } else if (page === 5) {
        page4()
        page--
    } else if (page === 4) {
        page3()
        page--
    } else if (page === 3) {
        page2()
        page--
    } else if (page === 2) {
        disablePrev()
        page1()
        page--
    }
    console.log("Prev Click","Page:",page)
}) 

function enablePrev() {
    prev.css("opacity", 1)
    prev.css("cursor", "pointer")
    prev.css("pointer-events", "all")
}

function disablePrev() {
    prev.css("opacity", 0)
    prev.css("cursor", "none")
    prev.css("pointer-events", "none")
}

function enableNext() {
    next.css("opacity", 1)
    next.css("cursor", "pointer")
    next.css("pointer-events", "all")
}

function disableNext() {
    next.css("opacity", 0)
    next.css("cursor", "none")
    next.css("pointer-events", "none")
}

function page1() {
    num_end = 17
    updateLine()
    story
        .html("Pemerintah Indonesia mengumumkan 2 kasus pertama Covid-19 di Indonesia (2/3/2020). "
        + "Di Cina telah ada <b>80.178 kasus</b> dan menelan <b>2.915 korban jiwa.</b> "
        + "Terjadi lonjakan pengunjung di <span class='dot-grocery1'><b>area perbelanjaan dan farmasi</b></span> karena adanya <i>panic buying</i>, umumnya untuk pembelian "
        + "masker medis "
        + "dan peralatan sanitasi")
}

function page2() {
    num_end = 34
    updateLine()
    story
        .html("Pemprov DKI Jakarta, Pemkot Bekasi, dan Pemkot Depok meliburkan kegiatan sekolah, menutup tempat wisata dan meniadakan kegiatan"
        + " seperti konser, festival & Car Free Day."
        + " Sejak keputusan ini, masyarakat lebih banyak di <span class='dot-home1'><b>rumah</b></span> dan berbagai area non hunian "
        + "mengalami penurunan pengunjung secara drastis.")
}

function page3() {
    num_end = 80
    updateLine()
    story
        .html("Grafik ini bertahan selama 2 bulan, tetapi jumlah kasus terus bertambah menunjukkan hanya sekadar berada di <span class='dot-home1'><b>rumah</b></span> "
        + "tidak segera menekan pertambahan kasus.")
}

function page4() {
    num_end = 115
    updateLine()
    story
        .html("Menjelang cuti bersama Idul Fitri, ketidaktegasan dan ketidakjelasan pemerintah mengenai larangan mudik membingungkan masyarakat. "
        +"Terjadi peningkatan pengunjung di <span class='dot-grocery1'><b>area perbelanjaan</b></span> dan <span class='dot-transit1'><b>pusat transportasi</b></span> "
        +"mengindikasikan masih ada orang yang tetap melaksanakan mudik, "
        +"sedangkan jumlah kasus terus bertambah secara eksponensial.")
}

function page5() {
    num_end = 150
    updateLine()
    story
        .html("Sejak akhir cuti bersama Idul Fitri, ada penurunan jumlah orang yang berada di <span class='dot-home1'><b>rumah</b></span>, dan peningkatan jumlah orang di seluruh area non hunian. "
        + "Jumlah kasus masih terus bertambah secara eksponensial.")
}

function page6() {
    num_end = 209
    updateLine()
    story
        .html("Walaupun berdasarkan grafik masih banyak orang yang berusaha bertahan di <span class='dot-home1'><b>rumah</b></span>,"
        + " pada hari-hari besar seperti Idul Adha maupun 17-an, terjadi peningkatan yang sangat signifikan di <span class='dot-grocery1'><b>area perbelanjaan</b></span> "
        + "dan <span class='dot-parks1'><b>taman</b></span>. Hal ini diamini dengan jumlah kasus yang terus meningkat.")
}

function hover() {

    var ex1 = d3.extent(groupSlice, d => + d.home)
    var ex2 = d3.extent(groupSlice, d => + d.retail)
    var ex3 = d3.extent(groupSlice, d => + d.grocery)
    var ex4 = d3.extent(groupSlice, d => + d.parks)
    var ex5 = d3.extent(groupSlice, d => + d.transit)
    var ex6 = d3.extent(groupSlice, d => + d.work)
    var val = ex1.concat(ex2, ex3, ex4, ex5, ex6)
    var ex = d3.extent(val)
    console.log('val',val)
    console.log(ex)
    var exScale = ex.map(d => d * 1.05)
    console.log(exScale)

    var caseScale = d3.extent(groupSlice, d => + d.kasus)
    caseScale = caseScale.map(d => d * 1.05)

    var ycase = d3.scaleLinear()
        .domain(caseScale)
        .range([h,200])

    var m = d3.scaleTime() //MARKER PERISTIWA
    .domain([group[num_start].date, group[num_end].date])
    .range([0,w])

    k = d3.scalePoint() 
        .domain([data[num_start].date, data[num_end].date])
        .range([0,w])

    // MENENTUKAN SKALA SUMBU Y
    y = d3.scaleLinear()
        .domain(exScale) // SKALA AWAL DARI NILAI TERENDAH - TERTINGGI PADA DATA
        .range([h-100, 0]) // SKALA TARGET DARI TINGGI INFOGRAFIK - 0
        .nice(); // FUNGSI UNTUK MERAPIKAN AXIS

    var bisect = d3.bisector(d => d.date).left,
        format = d3.format("+.0%"),
        dateFormat = d3.timeFormat("%d %b %Y")
    
    var focus = svg_line.append("g")
        .attr("class", "focus")
        .style("display","none")
    
    focus.append("line")
        .attr("stroke", "#666666")
        .attr("stroke-width", 1)
        .attr("y1", -h)
        .attr("y2", 0)
    
    focus.append("circle")
        .attr("class","circle_home")
        .attr("r", 5)
        .attr("fill","#d15b2c")

    focus.append("circle")
        .attr("class","circle_work")
        .attr("r", 5)
        .attr("fill","#3d3db7")

    focus.append("circle")
        .attr("class","circle_retail")
        .attr("r", 5)
        .attr("fill","#a14bc9")

    focus.append("circle")
        .attr("class","circle_grocery")
        .attr("r", 5)
        .attr("fill","#e2a539")

    focus.append("circle")
        .attr("class","circle_parks")
        .attr("r", 5)
        .attr("fill","#37aa83")

    focus.append("circle")
        .attr("class","circle_transit")
        .attr("r", 5)
        .attr("fill","#28a8df")

    focus.append("circle")
        .attr("class","circle_case")
        .attr("r", 5)
        .attr("fill","black")
    
    focus.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
    
    var overlay = svg_line.append("rect")
        .attr("class","overlay")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", h)
        .on("mouseover", () => focus.style("display", null))
        .on("mouseout", function() {
            focus
                .style("display", "none")
            div
                .transition()
                .duration(200)
                .style("opacity", 0)
        })
        .on("mousemove", mousemove)

    line_home.raise()
    line_grocery.raise()
    line_work.raise()
    line_parks.raise()
    line_retail.raise()
    line_transit.raise()
    
        function mousemove() {
            var x0 = m.invert(d3.mouse(this)[0])

            var i = bisect(group, x0, 1),
                d0 = group[i-1]
                d1 = group[i]
                d = x0 - d0.date > d1.date - x0 ? d1 : d0

            focus.select("line")
                .attr("transform", "translate(" + m(d.date) + "," + h + ")")

            focus.select(".circle_home")
                .attr("transform", "translate(" + m(d.date) + "," + y(d.home) + ")")

            focus.select(".circle_work")
                .attr("transform", "translate(" + m(d.date) + "," + y(d.work) + ")")

            focus.select(".circle_grocery")
                .attr("transform", "translate(" + m(d.date) + "," + y(d.grocery) + ")")

            focus.select(".circle_retail")
                .attr("transform", "translate(" + m(d.date) + "," + y(d.retail) + ")")

            focus.select(".circle_parks")
                .attr("transform", "translate(" + m(d.date) + "," + y(d.parks) + ")")

            focus.select(".circle_transit")
                .attr("transform", "translate(" + m(d.date) + "," + y(d.transit) + ")")

            focus.select(".circle_case")
                .attr("transform", "translate(" + m(d.date) + "," + ycase(d.kasus) + ")")

            focus.select("text")
                .attr("transform", "translate(" + m(d.date) + "," + (h+10) + ")")
                .style("font-family", "Lato")
                .style("font-size", 12)
                .text(dateFormat(d.date))
            
            div .transition()		
                .duration(200)		
                .style("opacity", .9);
                
            let locale = d3.formatLocale({
                decimal: ",",
                thousands: ".",
                grouping: [3]
            })

            div	.html(
                "<strong>" + d.hari + "</strong><br/>"
                + "<strong>"+ dateFormat(d.date) + "</strong><br/>"
                + "<table><tr>"
                + "<td><span class='dot-home'></span></td>"
                + "<td>Hunian: </td><td><strong>" + d.home + "%</strong></td></tr>"
                + "<tr>"
                + "<td><span class='dot-work'></span></td>"
                + "<td>Perkantoran: </td><td><strong>" + d.work + "%</strong></td></tr>"
                + "<tr>"
                + "<td><span class='dot-grocery'></span></td>"
                + "<td>Perbelanjaan & Farmasi: </td><td><strong>" + d.grocery + "%</strong></td></tr>"
                + "<tr>"
                + "<td><span class='dot-retail'></span></td>"
                + "<td>Pertokoan Retail: </td><td><strong>" + d.retail + "%</strong></td></tr>"
                + "<tr>"
                + "<td><span class='dot-parks'></span></td>"
                + "<td>Taman & Rekreasi Luar Ruang: </td><td><strong>" + d.parks + "%</strong></td></tr>"
                + "<tr>"
                + "<td><span class='dot-transit'></span></td>"
                + "<td>Transportasi: </td><td><strong>" + d.transit + "%</strong></td></tr>"
                + "<td><span class='dot-case'></span></td>"
                + "<td>Jumlah Kasus Positif: </td><td><strong>" + locale.format(",")(d.kasus) + "</strong></td></tr>"
                + "</table>")	
        }
}

function updateLine() {

    groupSlice = group.slice(0,num_end +1)

    var ket = group.filter(d => d.keterangan != "")

    var param = ['home', 'retail', 'grocery', 'parks', 'transit', 'work']

    var ex1 = d3.extent(groupSlice, d => + d.home)
    var ex2 = d3.extent(groupSlice, d => + d.retail)
    var ex3 = d3.extent(groupSlice, d => + d.grocery)
    var ex4 = d3.extent(groupSlice, d => + d.parks)
    var ex5 = d3.extent(groupSlice, d => + d.transit)
    var ex6 = d3.extent(groupSlice, d => + d.work)
    var val = ex1.concat(ex2, ex3, ex4, ex5, ex6)
    var ex = d3.extent(val)
    var exScale = ex.map(d => d * 1.05)

    var caseScale = d3.extent(groupSlice, d => + d.kasus)
    caseScale = caseScale.map(d => d * 1.05)

    var ycase = d3.scaleLinear()
        .domain(caseScale)
        .range([h,200])

    // MENENTUKAN SKALA SUMBU X (TAHUN)
    x = d3.scaleTime()
        // MENGAMBIL DATA MINIMUM & MAKSIMUM SEKALIGUS SEBAGAI DOMAIN
        .domain([d3.min(data,d => d.date), data[num_end].date])
        // MENENTUKAN RANGE AKHIR BERDASARKAN LEBAR INFOGRAFIK
        .range([0,w])
        // MERAPIKAN SKALA SUMBU X

    var m = d3.scaleTime() //MARKER PERISTIWA
        .domain([group[num_start].date, group[num_end].date])
        .range([0,w])

    k = d3.scalePoint() 
        .domain([data[num_start].date, data[num_end].date])
        .range([0,w])


    // MENENTUKAN SKALA SUMBU Y
    y = d3.scaleLinear()
        .domain(exScale) // SKALA AWAL DARI NILAI TERENDAH - TERTINGGI PADA DATA
        .range([h-100, 0]) // SKALA TARGET DARI TINGGI INFOGRAFIK - 0
        .nice(); // FUNGSI UNTUK MERAPIKAN AXIS

    y1 =  d3.scaleLinear()
        .domain(exScale.map(d => d/100)) // SKALA AWAL DARI NILAI TERENDAH - TERTINGGI PADA DATA
        .range([h-100, 0]) // SKALA TARGET DARI TINGGI INFOGRAFIK - 0
        .nice(); // FUNGSI UNTUK MERAPIKAN AXIS

    xg
        .transition()
        .duration(1000)
        .call(d3.axisBottom(k)
        .tickSize(-h)
        .tickFormat(formatTime)
        .ticks(2))

    yg
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y1)            
            .tickSize(-w-wmob)
            .tickFormat(formatPercent))

    line_case
        .datum(group)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return m(d.date)}) // POSISI X
            .y(function(d) {return ycase(d.kasus)})); // POSISI Y;

    // MENGGAMBAR GRAFIK GARIS (LINE CHART) HOME
    line_home
        .datum(group)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return m(d.date)}) // POSISI X
            .y(function(d) {return y(d.home)})); // POSISI Y;
    
    // MENGGAMBAR GRAFIK GARIS (LINE CHART) WORK
    line_work
        .datum(group)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return x(+d.date)}) // POSISI X
            .y(function(d) {return y(+d.work)})); // POSISI Y

    // MENGGAMBAR GRAFIK GARIS (LINE CHART) RETAIL
    line_retail
        .datum(group)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return x(+d.date)}) // POSISI X
            .y(function(d) {return y(+d.retail)})); // POSISI Y

    // MENGGAMBAR GRAFIK GARIS (LINE CHART) GROCERY
    line_grocery
        .datum(group)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return x(+d.date)}) // POSISI X
            .y(function(d) {return y(+d.grocery)})); // POSISI Y);

    // MENGGAMBAR GRAFIK GARIS (LINE CHART) PARKS
    line_parks
        .datum(group)
        .transition()
        .duration(1000)
        .attr("d",d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return x(+d.date)}) // POSISI X
            .y(function(d) {return y(+d.parks)})); // POSISI Y);

    // MENGGAMBAR GRAFIK GARIS (LINE CHART) TRANSIT
    line_transit
        .datum(group)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {return x(+d.date)}) // POSISI X
            .y(function(d) {return y(+d.transit)})); // POSISI Y);

    line_zero // TITIK 0
        .transition()
        .duration(1000)
        .attr("x1", 0) // KOORDINAT X PERTAMA
        .attr("x2", w+margin.right) // KOORDINAT X KEDUA (MENYAMAKAN DENGAN LEBAR INFOGRAFIK)
        .attr("y1", y(0)) // KOORDINAT Y PERTAMA
        .attr("y2", y(0)); // KOORDINAT Y KEDUA (SAMA -- GARIS LURUS)

    markerline
        .data(ket)
        .transition()
        .duration(1000)
        .attr("x1", d => m(d.date)) // KOORDINAT X PERTAMA
        .attr("x2", d => m(d.date)) // KOORDINAT X KEDUA (MENYAMAKAN DENGAN LEBAR INFOGRAFIK)         

    markercircle
        .data(ket)
        .transition()
        .duration(1000)
        .attr("cx", d => m(d.date))

    let locale = d3.formatLocale({
        decimal: ",",
        thousands: ".",
        grouping: [3]
    })
    
    cases1
        .transition()
        .duration(1000)
        .text(group[num_end].hari+", "+formatTime2(group[num_end].date))




    cases2
        .transition()
        .duration(1000)
        .tween("text", function() {
            var selection = d3.select(this)
            var start = parseInt(d3.select(this).text())
            var end = group[num_end].kasus
            var interpolator = d3.interpolateNumber(start, end)

            return function(t) { selection.text(locale.format(",")(Math.round(interpolator(t))))}
        })

    svg_line.call(hover)
}



            
     

}); // END D3.CSV LINE CHART

