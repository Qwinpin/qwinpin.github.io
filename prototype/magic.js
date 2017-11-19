function start(){
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        duration: 100,    // the scene should last for a scroll distance of 100px
        triggerElement: '#text2',    // start this scene after scrolling for 50px
    })
        .on('enter', function(e){
            if (controller.info('scrollDirection') == 'FORWARD'){
                sizing(100);
            } else{
                sizing(-100);
            }
            console.log(controller.info('scrollDirection'))
        })
        .addTo(controller); // assign the scene to the controller

    var start = scene.scrollOffset();
    var end = scene.scrollOffset() + scene.duration();
    console.log("the scene starts at", start, "and ends at", end);
}