var $tahun = $('.tahun');
var $slidetahun = $('.slide-tahun');
var $val = $slidetahun.val();
var $s1 = $('#slide-1');
var $s2 = $('#slide-2');
var $s3 = $('#slide-3');
var playstate = 0;
var $replay = $('.play');
var $prev = $('.prev');
var $next = $('.next');
var a = 1;



$(document).ready(function() {
    playImage();
    playstate = 1;

})

$replay.on('click', function() {
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

    setTimeout(function() { //slide 1
        slide1();
    }, 0)

    setTimeout(function() { //slide 2
        slide2()
    }, 2000)

    setTimeout(function() { //slide 3
        slide3();
    }, 4000)

    setTimeout(function() {
        $replay.css('transition', '0.5s')
        $replay.css('opacity',1)
        $next.css('transition', '0.5s')
        $next.css('opacity',1)
        $prev.css('transition', '0.5s')
        $prev.css('opacity',1)
    }, 4250)
};

function slide1() {
    $s1.css('transition','1.5s')
    $s1.css('opacity',1);
    $s2.css('opacity',0);
    $s3.css('opacity',0);
    $tahun.html('1976');
    $slidetahun.val(1);
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
    $slidetahun.val(1);
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
