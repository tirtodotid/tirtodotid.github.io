//RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////////
var container = document.querySelector('.container')          //
//var w = parent.document.body.clientWidth                      //
//var h = parent.document.body.clientHeight                      //
var gw, gh;                                                   //
var font, space, mult, left, top;
                                                              //
//console.log( 'initial size','width' ,w, 'height', h) 
console.log(container.style.height)//
                                                              //
var radius // infographic radius                              //
                                                              //
if ( container.style.height == 700 ) { // MOBILE
    console.log('parent document mobile size','width' ,w, 'height', h)
    slide = 360                                               //
    //container.style.height = '600px'                          //
    //container.style.width = '330px'                           //
                                                              //
} else if ( container.style.height == 850 ) { // DESKTOP
    console.log('parent document desktop size','width' ,w, 'height', h)
    slide = 560                             //
    //container.style.height = '850px'                          //
    //container.style.width = '560px'                           //
                                                              //
};                                                            //
//END RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////

// RETURN BUTTON
var returnButton = document.querySelector('.return')

// SUB JUDUL
var subs = document.querySelector('.subtitle')

// READ BUTTON
var startRead = document.querySelector('.read')

// NEXT & PREVIOUS BUTTON
var next = document.querySelector('.next'),
    prev = document.querySelector('.previous')

// TITLE
var title = document.querySelector('#judul')

var story1 = document.querySelector('#victim-1'),
    story2 = document.querySelector('#victim-2'),
    story3 = document.querySelector('#victim-3');

title.style.opacity = 0
startRead.style.opacity = 0

var storySelect = 0
var page = 0
console.log(storySelect)

story1.addEventListener('click', () => {
    storySelect = 1
    story1.style.filter = 'grayscale(0)'
    story2.style.filter = 'grayscale(100)'
    story3.style.filter = 'grayscale(100)'
    title.style.opacity = 1
    startRead.style.opacity = 1
    title.innerHTML = 'Domba Yang Disesatkan'
    subs.innerHTML = 'Domba Yang Disesatkan'
})

story2.addEventListener('click', () => {
    storySelect = 2
    story1.style.filter = 'grayscale(100)'
    story2.style.filter = 'grayscale(0)'
    story3.style.filter = 'grayscale(100)'
    title.style.opacity = 1
    startRead.style.opacity = 1
    title.innerHTML = 'Pengakuan Dosa'
    subs.innerHTML = 'Pengakuan Dosa'
})

story3.addEventListener('click', () => {
    storySelect = 3
    story1.style.filter = 'grayscale(100)'
    story2.style.filter = 'grayscale(100)'
    story3.style.filter = 'grayscale(0)'
    title.style.opacity = 1
    startRead.style.opacity = 1
    title.innerHTML = 'Pasrah Kepada Tuhan'
    subs.innerHTML = 'Pasrah Kepada Tuhan'
})

// STORY CONTAINER
var storyContainer1 = document.querySelector('.container-long-1'), 
    storyContainer2 = document.querySelector('.container-long-2'),
    storyContainer3 = document.querySelector('.container-long-3')

    storyContainer1.style.left = 0
    storyContainer2.style.left = 0
    storyContainer3.style.left = 0

var slideStory1 = parseInt(storyContainer1.style.left),
    slideStory2 = parseInt(storyContainer2.style.left),
    slideStory3 = parseInt(storyContainer3.style.left)

// START READ
startRead.addEventListener('click', () => {    
    initialSlide()
})

// RETURN HOME
returnButton.addEventListener('click',() => {
    returnHome()
})

// NEXT
next.addEventListener('click', () => {    
    console.log('next')

    // ----------------------------------------- STORY 1
    if (storySelect == 1 && page == 1) { // ---- PAGE 1 to 2
        slide1()
        page++
        console.log(storySelect)
        console.log(page)
        enablePrev()
    }

    else if (storySelect == 1 && page == 2) { // ---- PAGE 2 to 3
        slide1()
        page++
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 1 && page == 3) { // ---- PAGE 3 to 4
        slide1()
        page++
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 1 && page == 4) { // ---- PAGE 4 to 5
        slide1()
        page++
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 1 && page == 5) { // ---- PAGE 5 to 6
        slide1()
        page++
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 1 && page == 6) { // ---- PAGE 6 to 7
        slide1()
        page++
        console.log(storySelect)
        console.log(page)
        disableNext() 
    }
    // ----------------------------------------- END STORY 1

    // ----------------------------------------- STORY 2
    else if (storySelect == 2 && page == 1) { // ---- PAGE 1 to 2
        slide2()
        page++
        console.log(storySelect)
        console.log(page)
        enablePrev()
    }

    else if (storySelect == 2 && page == 2) { // ---- PAGE 2 to 3
        slide2()
        page++
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 2 && page == 3) { // ---- PAGE 3 to 4
        slide2()
        page++
        console.log(storySelect)
        console.log(page)
        disableNext()
    }
    // ----------------------------------------- END STORY 2

    // ----------------------------------------- STORY 3
    else if (storySelect == 3 && page == 1) { // ---- PAGE 1 to 2
        slide3()
        page++
        console.log(storySelect)
        console.log(page)
        enablePrev()
    }

    else if (storySelect == 3 && page == 2) { // ---- PAGE 2 to 3
        slide3()
        page++
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 3 && page == 3) { // ---- PAGE 3 to 4
        slide3()
        page++
        console.log(storySelect)
        console.log(page)
        disableNext()
    }
    // ----------------------------------------- END STORY 3


})

// PREVIOUS
prev.addEventListener('click', () => {    
    console.log('previous')
    
    // ----------------------------------------- STORY 1
    if (storySelect == 1 && page == 7) { // ---- PAGE 7 to 6
        slideprev1()
        page--
        console.log(storySelect)
        console.log(page)
        enableNext()
    }

    else if (storySelect == 1 && page == 6) { // ---- PAGE 6 to 5
        slideprev1()
        page--
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 1 && page == 5) { // ---- PAGE 5 to 4
        slideprev1()
        page--
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 1 && page == 4) { // ---- PAGE 4 to 3
        slideprev1()
        page--
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 1 && page == 3) { // ---- PAGE 3 to 2
        slideprev1()
        page--
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 1 && page == 2) { // ---- PAGE 2 to 1
        slideprev1()
        page--
        console.log(storySelect)
        console.log(page)
        disablePrev()
    }
    // ----------------------------------------- END STORY 1

    // ----------------------------------------- STORY 2
    else if (storySelect == 2 && page == 4) { // ---- PAGE 4 to 3
        slideprev2()
        page--
        console.log(storySelect)
        console.log(page)
        enableNext()
    }

    else if (storySelect == 2 && page == 3) { // ---- PAGE 3 to 2
        slideprev2()
        page--
        console.log(storySelect)
        console.log(page)
    }

    else if (storySelect == 2 && page == 2) { // ---- PAGE 2 to 1
        slideprev2()
        page--
        console.log(storySelect)
        console.log(page)
        disablePrev()
    }
    // ----------------------------------------- END STORY 2

        // ----------------------------------------- STORY 3
        else if (storySelect == 3 && page == 4) { // ---- PAGE 4 to 3
            slideprev3()
            page--
            console.log(storySelect)
            console.log(page)
            enableNext()
        }
    
        else if (storySelect == 3 && page == 3) { // ---- PAGE 3 to 2
            slideprev3()
            page--
            console.log(storySelect)
            console.log(page)
        }
    
        else if (storySelect == 3 && page == 2) { // ---- PAGE 2 to 1
            slideprev3()
            page--
            console.log(storySelect)
            console.log(page)
            disablePrev()
        }
        // ----------------------------------------- END STORY 3


})


function disableNext() {
    next.style.pointerEvents = 'none'
    next.style.opacity = 0
}

function disablePrev() {
    prev.style.pointerEvents = 'none'
    prev.style.opacity = 0
}

function enableNext() {
    next.style.pointerEvents = 'auto'
    next.style.cursor= 'pointer'
    next.style.zIndex = 9999
    next.style.opacity = 1
}

function enablePrev() {
    prev.style.pointerEvents = 'auto'
    prev.style.cursor= 'pointer'
    prev.style.zIndex = 9999
    prev.style.opacity = 1
}

function enableReturn() {
    returnButton.style.opacity = 1
    returnButton.style.zIndex = 9999
    returnButton.style.pointerEvents = 'auto'
    returnButton.style.cursor = 'pointer'
}

function returnHome() {
    disableNext()
    disablePrev()

    storyContainer1.style.zIndex = -1
    storyContainer2.style.zIndex = -1
    storyContainer3.style.zIndex = -1

    storyContainer1.style.transition = '0.5s'
    storyContainer1.style.left = '0px'
    slideStory1 = 0
    storyContainer1.style.opacity = 0

    storyContainer2.style.transition = '0.5s'
    storyContainer2.style.left = '0px'
    slideStory2 = 0
    storyContainer2.style.opacity = 0

    storyContainer3.style.transition = '0.5s'
    storyContainer3.style.left = '0px'
    slideStory3 = 0
    storyContainer3.style.opacity = 0

    story1.style.filter = 'grayscale(100)'
    story2.style.filter = 'grayscale(100)'
    story3.style.filter = 'grayscale(100)'

    startRead.style.pointerEvents = 'auto'
    story1.style.pointerEvents = 'auto'
    story2.style.pointerEvents = 'auto'
    story3.style.pointerEvents = 'auto'

    startRead.style.cursor = 'pointer'
    story1.style.cursor = 'pointer'
    story2.style.cursor = 'pointer'
    story3.style.cursor = 'pointer'

    page = 0
    storySelect = 0

    returnButton.style.opacity = 0
    returnButton.style.zIndex = 0
    returnButton.style.cursor = 'none'
    returnButton.style.pointerEvents = 'none'

    title.style.opacity = 0
    startRead.style.opacity = 0

    subs.style.opacity = 0

}

function buttons() {

    // DISABLE MAIN PAGE CURSOR
    startRead.style.pointerEvents = 'none'
    story1.style.pointerEvents = 'none'
    story2.style.pointerEvents = 'none'
    story3.style.pointerEvents = 'none'

    // ENABLE NEXT PREVIOUS BUTTON
    next.style.pointerEvents = 'auto'
    next.style.cursor = 'pointer'
    next.style.zIndex = 9999
    next.style.transition = '0.5s'
    next.style.opacity = 1
}

function slide1() {
    storyContainer1.style.transition = '0.5s'
    console.log(slideStory1)
    storyContainer1.style.left = slideStory1 - slide + 'px'
    slideStory1 = slideStory1 - slide
    
}

function slide2() {
    storyContainer2.style.transition = '0.5s'
    storyContainer2.style.left = slideStory2 - slide + 'px'
    slideStory2 = slideStory2 - slide
}

function slide3() {
    storyContainer3.style.transition = '0.5s'
    storyContainer3.style.left = slideStory3 - slide + 'px'
    slideStory3 = slideStory3 - slide
}

function slideprev1() {
    storyContainer1.style.transition = '0.5s'
    storyContainer1.style.left = slideStory1 + slide + 'px'
    slideStory1 = slideStory1 + slide
}

function slideprev2() {
    storyContainer2.style.transition = '0.5s'
    storyContainer2.style.left = slideStory2 + slide + 'px'
    slideStory2 = slideStory2 + slide
}

function slideprev3() {
    storyContainer3.style.transition = '0.5s'
    storyContainer3.style.left = slideStory3 + slide + 'px'
    slideStory3 = slideStory3 + slide
}

function initialSlide() {

    if (storySelect == 1) { // CERITA 1

        buttons()

        // PUSH ALL CONTAINER DOWN
        storyContainer2.style.zIndex = -1
        storyContainer3.style.zIndex = -1

        storyContainer1.style.zIndex = 10
        page = 1

        storyContainer1.style.opacity = 1

        subs.style.opacity = 1

        slide1()
        enableReturn()

    } // END STORY 1

    else if (storySelect == 2) { // CERITA 2

        buttons()

        // PUSH ALL CONTAINER DOWN
        storyContainer1.style.zIndex = -1
        storyContainer3.style.zIndex = -1

        storyContainer2.style.zIndex = 10
        page = 1

        storyContainer2.style.opacity = 1

        subs.style.opacity = 1

        slide2()
        enableReturn()


    } // END STORY 2

    else if (storySelect == 3) { // CERITA 3
        buttons()

        // PUSH ALL CONTAINER DOWN
        storyContainer1.style.zIndex = -1
        storyContainer2.style.zIndex = -1

        storyContainer3.style.zIndex = 10
        page = 1

        storyContainer3.style.opacity = 1

        subs.style.opacity = 1

        slide3()
        enableReturn()

    } // END STORY 2

}

// Louis Lugas c2020 tirto.id



