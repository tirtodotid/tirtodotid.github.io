var $button = $('#button');
var $tebak = $('#tebak');
var $jakarta = $('.jakarta');
var $pluit = $('.pluit');
var $j17 = $('.j17');
var $pluitxt = $('.pluit-text');
var $map = $('.map');
var $map1 = $('.map1');
var $mappluit = $('.mappluit');
var $replay = $('#replay');
var $t1 = $('.text-1');
var $t2 = $('.text-2');
var $next = $('.next');
var $prev = $('.previous');
var page = 1;
var $s0 = $('#slide-0');
var $st = $('#slide-tebak');
var $s1 = $('#slide-1');
var $s2 = $('#slide-2');
var $s3 = $('#slide-3');
var $l0 = parseInt($s0.css('left'), 10);
var $lt = parseInt($st.css('left'), 10);
var $l1 = parseInt($s1.css('left'), 10);
var $l2 = parseInt($s2.css('left'), 10);
var $l3 = parseInt($s3.css('left'), 10);
var slide = 560;
var slideduration = '0.5s';
var $hiroshi = $('.hiroshi');

// variabel button cek jawaban
var $bc1 = $('#bc-1');
var $bc2 = $('#bc-2');
var $bc3 = $('#bc-3');

$button.on('click', function() {
    $jakarta.addClass('animate');
    $pluit.addClass('animate');
    $j17.addClass('animate');
    $pluitxt.addClass('animate');
    $map.addClass('animate');
    $mappluit.addClass('animate');
    $t1.addClass('animate');
    $t2.addClass('animate');
    $button.css('opacity',0);
    $button.css('pointer-events','none');
    $map1.css('transition', '3s');
    $map1.css('transition-timing-function', 'ease-in-out')
    $map1.css('opacity', 0);

    //$replay.css('opacity',1);

setTimeout(function() {
    $hiroshi.css('opacity', 2)
    $hiroshi.css('transition', '1s')
},14000)

    // tombol next & previous
    setTimeout(function() {
        $prev.css('transition','1s');
        $prev.css('opacity', 0.25);
    },23000)

    // automatic slide awal
    initialslide();

});

function initialslide() {
    setTimeout(function() {
        $s0.css('transition',slideduration);
        $s0.css('left', + ( $l0 - slide ) + 'px');
        $st.css('transition',slideduration)
        $st.css('left', + ( $lt - slide ) + 'px');
        $s1.css('transition',slideduration)
        $s1.css('left', + ( $l1 - slide ) + 'px');
        $s2.css('transition',slideduration)
        $s2.css('left', + ( $l2 - slide ) + 'px');
        $s3.css('transition',slideduration)
        $s3.css('left', + ( $l3 - slide ) + 'px');
        $l0 = $l0 - slide;
        $lt = $lt - slide;
        $l1 = $l1 - slide;
        $l2 = $l2 - slide;
        $l3 = $l3 - slide;
        page++;


    }, 23000);
}

function slidenext() {
    $s0.css('transition',slideduration);
    $s0.css('left', + ( $l0 - slide ) + 'px');
    $st.css('transition',slideduration)
    $st.css('left', + ( $lt - slide ) + 'px');
    $s1.css('transition',slideduration);
    $s1.css('left', + ( $l1 - slide ) + 'px');
    $s2.css('transition',slideduration);
    $s2.css('left', + ( $l2 - slide ) + 'px');
    $s3.css('transition',slideduration);
    $s3.css('left', + ( $l3 - slide ) + 'px');
    $l0 = $l0 - slide;
    $lt = $lt - slide;
    $l1 = $l1 - slide;
    $l2 = $l2 - slide;
    $l3 = $l3 - slide;
    page++;


}

function slideprev() {
    $s0.css('transition',slideduration);
    $s0.css('left', + ( $l0 + slide ) + 'px');
    $s0.css('transition',slideduration);
    $st.css('left', + ( $lt + slide ) + 'px');
    $s1.css('transition',slideduration);
    $s1.css('left', + ( $l1 + slide ) + 'px');
    $s2.css('transition','1s');
    $s2.css('left', + ( $l2 + slide ) + 'px');
    $s3.css('transition',slideduration);
    $s3.css('left', + ( $l3 + slide ) + 'px');
    $l0 = $l0 + slide;
    $lt = $lt + slide;
    $l1 = $l1 + slide;
    $l2 = $l2 + slide;
    $l3 = $l3 + slide;
    page--;


}

$tebak.on('click', function() {
    slidenext();

    $next.css('opacity', 0.25);
})

$next.on('click',function(){
    if ( page == 1 ) { // halaman 1
        slidenext();
        $prev.css('opacity', 0.25);

    } else if ( page == 2 ) { // halaman 2
        slidenext();

    } else if ( page == 3 ) { // halaman 3
        slidenext();

    } else if ( page == 4 ) { // halaman 4
        slidenext();
        $next.css('opacity', 0);
    }
})

$prev.on('click',function(){
    if ( page == 5 ) { // halaman 5
        slideprev();
        $next.css('opacity', 0.25);

    } else if ( page == 4 ) { // halaman 4
        slideprev();

    } else if ( page == 3 ) { // halaman 3
        slideprev();

    } else if ( page == 2 ) { // halaman 2
        slideprev();
        $prev.css('opacity', 0);
    }
})

var person = [
    {
        fill: "white",
        d: "M56.8,114c-1.1,3.4,0.7,7.1,4.1,8.2h0c3.4,1.1,7.1-0.7,8.2-4.1l10.7-31.6c1.1-1.3,1.4,0.5,1.4,0.5l-2.5,39.7h0c0,0.1,0,0.2,0,0.3l-2.4,51.7c-0.2,5.3,3.9,9.9,9.3,10.2l0,0c5.3,0.2,9.9-3.9,10.2-9.3l2.4-51c0.7-1.3,1.4-1.7,2-1.7c0.6,0,1.3,0.5,2,1.7l2.4,51c0.2,5.3,4.8,9.5,10.2,9.3h0c5.3-0.2,9.5-4.8,9.3-10.2l-2.4-51.7c0-0.1,0-0.2,0-0.3h0L118.8,87l1.4-0.5l10.7,31.6c1.1,3.4,4.8,5.2,8.2,4.1h0c3.4-1.1,5.2-4.8,4.1-8.2l-20.1-59.6c-1-2.8-3.7-4.6-6.6-4.4l0,0H100H83.5l0,0c-2.9-0.2-5.6,1.6-6.6,4.4L56.8,114z",
        cx: "100",
        cy: "27.3",
        r: "17.3",
        transform: "matrix(0.7248 -0.6889 0.6889 0.7248 8.6908 76.4152)"
    }
]

var width = 200;
var height = 200;

var i;
$button.on('click', function() {
    for ( i = 0; i <= 200; i++ ){

    var angle = Math.random()*Math.PI*2;

    var radius = Math.random()*115;

    var posx = Math.cos(angle)*radius + 390;
    var posy = Math.sin(angle)*radius + 600;

    var svgperson = d3.select('#slide-0')
        .append('svg')
        .attr('width', 560)
        .attr('height',850)
        .style('position', 'absolute')

    var g1 = svgperson
        .append('g')
        .style('stroke', '#262626')
        .style('stroke-width', 2)
        .style('opacity', 0)
        .attr('transform', 'translate(280,240) scale(0.01)'); //start x 180 y 275 | end x 300 y 520

    g1.each(function(){
        d3.select(this)
        .raise()
        .transition()
        .duration((Math.random() * 1000) + 3000)
        .ease(d3.easeExp)
        .style('opacity' , 1)
        .delay((Math.random() * 5000) + 14500)
        .attr('transform', 'translate('+ posx +','+ posy +') scale(0.15)');
    });

    var bodyperson = g1.selectAll('path')
        .data(person)
        .enter()
        .append('path')
        .attr('d', d => d.d )
        .style('fill', d => d.fill );

    var headperson = g1.selectAll('circle')
        .data(person)
        .enter()
        .append('circle')
        .attr('r', d => d.r )
        .attr('cx', d => d.cx )
        .attr('cy', d => d.cy)
        .style('fill', d => d.fill );

    } //endforloop
})//end button click


//slider value
var w = 448;
var wplus = 560;
var h = 150;
var hplus = 850;

var $persen1 = $('#persen-1');
var $persen2 = $('#persen-2');
var $persen3 = $('#persen-3');

var val1 = $persen1.val() * (w - 15) / 100 + 33.5;
var val2 = $persen2.val() * (w - 15) / 100 + 33.5;
var val3 = $persen3.val() * (w - 15) / 100 + 33.5;

var v = $persen1.val();
var v2 = $persen2.val();
var v3 = $persen3.val();

// on input slider 1
$persen1.on('input', function() {
    val1 = $persen1.val() * (w - 15)  / 100 + 33.5;
    v = $persen1.val();

    line1
        .transition()
        .duration(1)
        .ease(d3.easeLinear)
        .attr('x1', val1)
        .attr('x2', val1);

    textpersen1
        .transition()
        .duration(1)
        .ease(d3.easeLinear)
        .attr('x', val1)
        .text(v +'%')
});

$persen1.on('change', function() {
    $bc1.css('transition-duration','0.5s')
    $bc1.css('opacity',1)
});

// on input slider 2
$persen2.on('input', function() {
    val2 = $persen2.val() * (w - 15)  / 100 + 33.5;
    v2 = $persen2.val();

    line2
        .transition()
        .duration(1)
        .ease(d3.easeLinear)
        .attr('x1', val2)
        .attr('x2', val2);

    textpersen2
        .transition()
        .duration(1)
        .ease(d3.easeLinear)
        .attr('x', val2)
        .text(v2 +'%')
});

$persen2.on('change', function() {
    $bc2.css('transition-duration','0.5s')
    $bc2.css('opacity',1)
});

// on input slider 3
$persen3.on('input', function() {
    val3 = $persen3.val() * (w - 15)  / 100 + 33.5;
    v3 = $persen3.val();

    line3
        .transition()
        .duration(1)
        .ease(d3.easeLinear)
        .attr('x1', val3)
        .attr('x2', val3);

    textpersen3
        .transition()
        .duration(1)
        .ease(d3.easeLinear)
        .attr('x', val3)
        .text(v3 +'%')
});

$persen3.on('change', function() {
    $bc3.css('transition-duration','0.5s')
    $bc3.css('opacity',1)
});

var svgslide = d3.select('#slide-1')
    .append('svg')
    .attr('width', wplus)
    .attr('height', hplus)
    .append('g')
    .attr('transform', 'translate(30,320)');

var svgslide2 = d3.select('#slide-2')
    .append('svg')
    .attr('width', wplus)
    .attr('height', hplus)
    .append('g')
    .attr('transform', 'translate(30,320)');

var svgslide3 = d3.select('#slide-3')
    .append('svg')
    .attr('width', wplus)
    .attr('height', hplus)
    .append('g')
    .attr('transform', 'translate(30,320)');

// line slider
var line1 = svgslide
    .append('line')
    .style('stroke', 'orange')
    .style('stroke-width', 2)
    .style('stroke-dasharray', 6)
    .attr('x1', val1)
    .attr('x2', val1)
    .attr('y1', 20)
    .attr('y2', h -7.5)

var line2 = svgslide2
    .append('line')
    .style('stroke', 'orange')
    .style('stroke-width', 2)
    .style('stroke-dasharray', 6)
    .attr('x1', val2)
    .attr('x2', val2)
    .attr('y1', 20)
    .attr('y2', h -7.5)

var line3 = svgslide3
    .append('line')
    .style('stroke', 'orange')
    .style('stroke-width', 2)
    .style('stroke-dasharray', 6)
    .attr('x1', val3)
    .attr('x2', val3)
    .attr('y1', 20)
    .attr('y2', h -7.5)

// text slider
var textpersen1 = svgslide
    .append('text')
    .attr('class','txtpersen')
    .attr('x', val1)
    .attr('y', 14)
    .text(v +'%')
    .style('fill', 'white')
    .attr('text-anchor', 'middle')

var textpersen2 = svgslide2
    .append('text')
    .attr('class','txtpersen')
    .attr('x', val2)
    .attr('y', 14)
    .text(v +'%')
    .style('fill', 'white')
    .attr('text-anchor', 'middle')

var textpersen3 = svgslide3
    .append('text')
    .attr('class','txtpersen')
    .attr('x', val3)
    .attr('y', 14)
    .text(v +'%')
    .style('fill', 'white')
    .attr('text-anchor', 'middle')


// variabel jawaban
var $j1 = $('#j1');
var $j2 = $('#j2');
var $j3 = $('#j3');
var $j4 = $('#j4');
var $j5 = $('#j5');
var $j6 = $('#j6');
var $j7 = $('#j7');
var $j8 = $('#j8');
var $j9 = $('#j9');

// grafik 1
var rect1 = svgslide
    .append('rect')
    .lower()
    .style('fill', 'orangered')
    .attr('height', h - 20)
    .attr('width', ( w - 15 ) * 0)
    .style('opacity', 0.8)
    .attr('transform', 'translate(33.5,25)')

var w1 = ((w - 15) * 0.855 + 33.5);

var rect2 = svgslide
    .append('rect')
    .lower()
    .style('fill', 'darkorange')
    .attr('height', h - 20)
    .attr('width', ( w - 15 ) * 0)
    .style('opacity', 0.8)
    .attr('transform', 'translate(' + w1 + ',25)')


// Cek Jawaban 1
$bc1.on('click', function() {
    setTimeout(function() {
        $persen1.css('opacity',0);
        $persen1.css('transition','0.25s');
        $persen1.css('pointer-events', 'none');
        $bc1.css('opacity',0);
        $bc1.css('transition', '0.5s');
        $bc1.css('pointer-events', 'none');
        $j1.css('opacity', 1);
        $j1.css('transition', '1s');

        rect1
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr('width', ( w - 15 ) * 0.855)
    },0);
    setTimeout(function() {
        $j2.css('opacity', 1);
        $j2.css('transition', '1s');

        rect2
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr('width', ( w - 15 ) * 0.145)
    },2500);
    setTimeout(function() {
        slidenext()
    }, 5000);
})

// grafik 2
var rect3 = svgslide2
    .append('rect')
    .lower()
    .style('fill', 'orangered')
    .attr('height', h - 20)
    .attr('width', (w-15) * 0)
    .style('opacity', 0.8)
    .attr('transform', 'translate(33.5,25)')

var w2 = ((w-15)*0.14+33.5);

var rect4 = svgslide2
    .append('rect')
    .lower()
    .style('fill', 'darkorange')
    .attr('height', h - 20)
    .attr('width', (w-15) * 0)
    .style('opacity', 0.8)
    .attr('transform', 'translate(' + w2 + ',25)')

var w3 = ((w-15)*0.684+33.5);

var rect5 = svgslide2
    .append('rect')
    .lower()
    .style('fill', 'orange')
    .attr('height', h - 20)
    .attr('width', (w-15) * 0)
    .style('opacity', 0.8)
    .attr('transform', 'translate(' + w3 + ',25)')

var w4 = ((w-15)*0.889+33.5);

var rect6 = svgslide2
    .append('rect')
    .lower()
    .style('fill', 'lightsalmon')
    .attr('height', h - 20)
    .attr('width', (w-15) * 0)
    .style('opacity', 0.8)
    .attr('transform', 'translate(' + w4 + ',25)')



// Cek Jawaban 2
$bc2.on('click', function() {
    setTimeout(function() {
        $persen2.css('opacity',0);
        $persen2.css('transition','0.25s');
        $persen2.css('pointer-events', 'none');
        $bc2.css('opacity',0);
        $bc2.css('transition', '0.5s');
        $bc2.css('pointer-events', 'none');
        $j3.css('opacity', 1);
        $j3.css('transition', '1s');

        rect3
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr('width', (w-15) * 0.14)
    },0);
    setTimeout(function() {
        $j4.css('opacity', 1);
        $j4.css('transition', '1s');

        rect4
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr('width', (w-15) * 0.544)
    },2500);
    setTimeout(function() {
        $j5.css('opacity', 1);
        $j5.css('transition', '1s');

        rect5
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr('width', (w-15) * 0.205)
    }, 5000);
    setTimeout(function() {
        $j6.css('opacity', 1);
        $j6.css('transition', '1s');

        rect6
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr('width', (w-15) * 0.111)
    }, 7500);
    setTimeout(function() {
        slidenext()
        $next.css('opacity', 0);
    }, 9000);
})

// grafik 3
var rect7 = svgslide3
    .append('rect')
    .lower()
    .style('fill', 'orangered')
    .attr('height', h - 20)
    .attr('width', (w-15) * 0)
    .style('opacity', 0.8)
    .attr('transform', 'translate(33.5,25)')

var w5 = ((w-15)*0.95+33.5);

var rect8 = svgslide3
    .append('rect')
    .lower()
    .style('fill', 'darkorange')
    .attr('height', h - 20)
    .attr('width', (w-15) * 0)
    .style('opacity', 0.8)
    .attr('transform', 'translate(' + w5 + ',25)')

var w6 = ((w-15)*0.99+33.5);

var rect9 = svgslide3
    .append('rect')
    .lower()
    .style('fill', 'orange')
    .attr('height', h - 20)
    .attr('width', (w-15) * 0)
    .style('opacity', 0.8)
    .attr('transform', 'translate(' + w6 + ',25)')


// Cek Jawaban 3
$bc3.on('click', function() {
    setTimeout(function() {
        $persen3.css('opacity',0);
        $persen3.css('transition','0.25s');
        $persen3.css('pointer-events', 'none');
        $bc3.css('opacity',0);
        $bc3.css('transition', '0.5s');
        $bc3.css('pointer-events', 'none');
        $j7.css('opacity', 1);
        $j7.css('transition', '1s');

        rect7
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr('width', (w-15) * 0.95)
    },0);
    setTimeout(function() {
        $j8.css('opacity', 1);
        $j8.css('transition', '1s');

        rect8
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr('width', (w-15) * 0.04)
    },2500);
    setTimeout(function() {
        $j9.css('opacity', 1);
        $j9.css('transition', '1s');

        rect9
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr('width', (w-15) * 0.01)
    },5000);
})
