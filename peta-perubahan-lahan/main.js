var $tahun = $('.tahun');
var $slidetahun = $('.slide-tahun');
var $val = $slidetahun.val();
var $s1 = $('#slide-1');
var $s2 = $('#slide-2');
var $s3 = $('#slide-3');
var $replay = $('.play');
var $prev = $('.prev');
var $next = $('.next');
var a = 1;
var count = 0;
var width = $('.container').width();
var height = $('.container').height();

function start() {
    $s1.css('opacity',1);
    $s2.css('opacity',0);
    $s3.css('opacity',0);
    $tahun.html('1976');
}

$(document).ready(function() {
    $slidetahun.val(0);
    start()
    playImage();

})

$replay.on('click', function() {
    count = 0;
    $slidetahun.val(0);
    start()
    playImage()
})

$next.on('click', function() {
    if ( a == 1 ) {
        slide2a();
    } else if ( a == 2 ) {
        slide3a();
    }
})

$prev.on('click', function() {
    if ( a == 3 ) {
        slide2a();
    } else if ( a == 2 ) {
        slide1a();
    }
})

function playImage() {

    var slide = setInterval(function(){
      // whatever code
      $slidetahun[0].stepUp(1);
      val = $slidetahun.val();
      //console.log(count)
      if ( count == 120 ) clearInterval(slide);
      if ( val == 0 ) {
          $s1.css('opacity',1);
          $s2.css('opacity',0);
          $s3.css('opacity',0);
          $tahun.html('1976');
          a = 1;
      } else if ( val == 60 ) {
          $s1.css('opacity',0);
          $s2.css('opacity',1);
          $s3.css('opacity',0);
          $tahun.html('2006');
          a = 2;
      } else if ( val == 120 ) {
          $s1.css('opacity',0);
          $s2.css('opacity',0);
          $s3.css('opacity',1);
          $tahun.html('2019');
          a = 3;
      }
      count++;
  }, 30);


};

function slide1() {
    $s1.css('transition','1.5s')
    $s1.css('opacity',1);
    $s2.css('opacity',0);
    $s3.css('opacity',0);
    $tahun.html('1976');
    $slidetahun.val(0);
    a=1;
}

function slide2() {
    $s1.css('opacity',1);
    $s2.css('transition','1.5s')
    $s2.css('opacity',1);
    $s3.css('opacity',0);
    $tahun.html('2006');
    $slidetahun.val(60);
    a=2
}

function slide3() {
    $s1.css('opacity',0);
    $s2.css('opacity',1);
    $s3.css('transition','1.5s')
    $s3.css('opacity',1);
    $tahun.html('2019');
    $slidetahun.val(120);
    a=3;
}

function slide1a() {
    noTransition();
    $s1.css('opacity',1);
    $s2.css('opacity',0);
    $s3.css('opacity',0);
    $tahun.html('1976');
    $slidetahun.val(0);
    a=1
}

function slide2a() {
    noTransition();
    $s1.css('opacity',0);
    $s2.css('opacity',1);
    $s3.css('opacity',0);
    $tahun.html('2006');
    $slidetahun.val(60);
    a=2;
}

function slide3a() {
    noTransition();
    $s1.css('opacity',0);
    $s2.css('opacity',0);
    $s3.css('opacity',1);
    $tahun.html('2019');
    $slidetahun.val(120);
    a=3;
}

$slidetahun.on('input', function() {
    if ( $slidetahun.val() == 1 ) {
        slide1a();
    } else if ( $slidetahun.val() == 60 ) {
        slide2a();
    } else if ( $slidetahun.val() == 120 ) {
        slide3a();
    }
})

function noTransition() {
    $s1.css('transition','0s');
    $s2.css('transition','0s');
    $s3.css('transition','0s');
}

var svg = d3.select('.container')
    .append('svg')
    .attr('width', width )
    .attr('height', height )
    .attr('id', 'svg');

var data = [0,60,120];

var data2 = [1976, 2006, 2019];

var scale = d3.scaleLinear()
    .domain(data)
    .range(data2);


var w = $slidetahun.width();

var selisih = (width - w) / 2;

var mul = ((w - 18) / 120);

svg
    .selectAll('line')
    .data(data)
    .enter()
    .append('line')
    .attr('x1', d => d * mul + selisih + 11)
    .attr('x2', d => d * mul + selisih + 11)
    .attr('y1', 512 )
    .attr('y2', 535 )
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('stroke-linecap', 'round');

svg
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('id', 'year')
    .attr('x', d => d * mul + selisih + 11)
    .attr('y', 560 )
    .text(d => scale(d) )
    .attr('text-anchor', 'middle')
    .style('z-index', 5)
    .style('color', 'black');


$slidetahun.on('change', function() {
    val = $slidetahun.val();
    if ( val <= 30 ) {
        $slidetahun.val(0);
        val = $slidetahun.val();
        $tahun.html('1976');
    } else if ( val > 30 && val <= 90 ) {
        $slidetahun.val(60);
        val = $slidetahun.val();
        $tahun.html('2006');
    } else if ( val > 90 && val <= 120 ) {
        $slidetahun.val(120);
        val = $slidetahun.val();
        $tahun.html('2019');
    }
})
