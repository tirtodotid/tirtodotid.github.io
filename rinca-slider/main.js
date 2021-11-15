var $slide = $('.slide-tahun');
var $tahun  = $('.tahun');
var val = $slide.val();
var url1 = "/img/peta-curah-hujan-pulau-rinca-png-sequence00";
var url2 = "/img/peta-curah-hujan-pulau-rinca-png-sequence0";
var sub = document.getElementsByClassName('subsiden');
var $play = $('.play');
var $prev = $('.prev');
var $next = $('.next');

var count = 0;

play();

$play.on('click', function() {
    count = 0;
    $slide.val(0);
    play()
})

$next.on('click', function() {
    val = $slide.val();
          $slide[0].stepUp(1);
          val = $slide.val();
     
      if (val < 10 ) {
          sub[0].src = url1 + val + '.png';
      } else if (val > 9) {
          sub[0].src = url2 + val + '.png';
      }
    })

$prev.on('click', function() {
    val = $slide.val();
          $slide[0].stepDown(1);
          val = $slide.val();
     
      if (val < 10 ) {
          sub[0].src = url1 + val + '.png';
      } else if (val > 9) {
          sub[0].src = url2 + val + '.png';
      }
    })


function play() {
    count = 0;
    var slide = setInterval(function(){
      // whatever code
      $slide[0].stepUp(1);
      val = $slide.val();
      $tahun.html(parseInt(val)+1997);
      //console.log(count)
      if ( count == 22 ) clearInterval(slide);
      count++;
      if (val < 10 ) {
          sub[0].src = url1 + val + '.png';
      } else if (val > 9) {
          sub[0].src = url2 + val + '.png';
      }
  }, 50);

}


$slide.on('input', function() {
    var val = $slide.val();
    if (val < 10 ) {
        sub[0].src = url1 + val + '.png';
    } else if (val > 9) {
        sub[0].src = url2 + val + '.png';
    }
    console.log(val);
})

var width = $slide.width();
var width2 = $('.container').width()
var height = $('.container').height()

var svg = d3.select('.container')
    .append('svg')
    .attr('width', width2 )
    .attr('height', 560 )
    .attr('id', 'svg');

var data = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];

var selisih = (width2 - width) /2 ;

var mul = ((width - 18) / 23);

svg
    .selectAll('line')
    .data(data)
    .enter()
    .append('line')
    .attr('x1', i => i * mul +39)
    .attr('x2', i => i * mul +39)
    .attr('y1', 93/100 * height - 1 )
    .attr('y2', 93/100 * height + 20 )
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('stroke-linecap', 'round');
