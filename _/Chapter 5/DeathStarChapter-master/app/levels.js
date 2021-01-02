levels={};
levels.load = function(levelCallBack){

    for (i = 0;i<document.getElementsByClassName("row").length;i++){
        document.getElementsByClassName("row")[i].style.height = window.innerHeight + "px";
    }
    smoothScrollTo(document.body.scrollHeight);
    document.getElementsByTagName("body")[0].setAttribute("onscroll",levelCallBack);
    var controller = document.getElementById("controls");
    if(controller){
        controller.addEventListener("touchstart", levels.click.intervalMove, false);
        controller.addEventListener("touchend", levels.click.intervalMove, false);
    }
};

levels.spreadObjects = function(x,vm,hm,va,ha,p,e){
    for (var i=0;i<x.length;i++){
        x[i].style.position = p;
        x[i].style.top = Math.floor((Math.random()*vm)+va)+e;
        x[i].style.left = Math.floor((Math.random()*hm)+ha)+e;
    }
};

levels.moveRocket = function(rocket){
    rocket.getElementsByTagName("span")[0].style.transform = "rotate(" + (355 - (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*3) + "deg)";
    rocket.getElementsByTagName("i")[2].style.transform = "rotate(" + (259 - (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*3) + "deg)";
    rocket.getElementsByTagName("span")[0].style.bottom = 65 * (document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length)) + '%';
};

levels.moveEarth = function(earth){
    earth.style.fontSize=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) *100)+"vw";
    earth.style.left=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) + document.getElementsByClassName("row").length*2)+"px";
    earth.style.height = (window.innerHeight*(document.getElementsByClassName("row").length)-window.pageYOffset)/window.innerHeight+.5 + '%';
    earth.getElementsByTagName("i")[0].style.transform = "rotate(" + (15 + (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*4) + "deg)";
    earth.getElementsByTagName("i")[0].style.right = (window.pageYOffset/window.innerHeight*45) + '%';
    earth.getElementsByTagName("i")[0].style.bottom = (window.pageYOffset/window.innerHeight*200) + '%';
    earth.getElementsByTagName("i")[0].style.opacity = 1.3-(window.pageYOffset/(window.innerHeight*(document.getElementsByClassName("row").length)));
};

levels.moveSaturn = function(orb){
    //orb.style.fontSize=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) *100)+"vw";
    orb.style.left=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) + document.getElementsByClassName("row").length*-6)+"px";
    orb.style.height = (window.innerHeight*(document.getElementsByClassName("row").length)-window.pageYOffset)/window.innerHeight+.5 + '%';
    orb.style.bottom = (100-(window.innerHeight*(document.getElementsByClassName("row").length)-window.pageYOffset)/window.innerHeight-15) + '%';
};
levels.setElementLeftPosition = function(element,increment){
    if(isNaN(parseInt(element.style.left.split("p")[0]))){
        return ((element.getBoundingClientRect().left)+increment)+"px"
    } else {
        return ((Math.abs(parseInt(element.style.left.split("p")[0]))) + increment)+"px";
    }
};

levels.setElementBottomPosition = function(element,increment){
    if(isNaN(parseInt(element.style.bottom.split("p")[0]))){
        return ((element.getBoundingClientRect().bottom)+increment)+"px"
    } else {
        return ((Math.abs(parseInt(element.style.bottom.split("p")[0]))) + increment)+"px";
    }
};

levels.topOfScroll = function(topCallBack){
    topCallBack();
    setTimeout(function(){
        window.location.hash = '#home';
        return;
    }, 3000);
};

levels.bottomOfScroll = function(bottomCallBack){
    bottomCallBack()
    document.getElementById('curtain').className = 'fade';
};

levels.updateOnMove = function(topCallBack,bottomCallBack,messagesObject){
    levels.moveRocket(document.getElementById("rocket"));
    var ScrollPosition = Math.round(100*window.pageYOffset/(document.body.scrollHeight-document.documentElement.clientHeight));
    switch (ScrollPosition){
        case 0:
            levels.topOfScroll(topCallBack);
            break;
        case 100:
            levels.bottomOfScroll(bottomCallBack);
            break;
        default:
    }
    var scrollPosition = Math.round(100 * window.pageYOffset / (document.body.scrollHeight - document.documentElement.clientHeight));
    for(i=0;i<messagesObject.objects.length;i++){
        if(messagesObject.objects[i].position===scrollPosition){
            levels.showMessage(messagesObject.objects[i])
        }
    }
};

levels.showMessage = function(messageObject){
    document.getElementById('rocket').getElementsByClassName('fa-comment')[0].style.display = "inline";
    document.getElementById('rocket').getElementsByClassName('fa-comment')[0].innerHTML='<span>'+messageObject.text+'</span>';
    setTimeout(function(){
        document.getElementById('rocket').getElementsByClassName('fa-comment')[0].style.display = "none";
    }, messageObject.time);
};
levels.click = {};
levels.click.checkKey = function(e){
    e = e || window.event;
    switch (e.keyCode){
     case 37:
     levels.click.controlsAdjust('leftClick');
     break;
     case 39:
     levels.click.controlsAdjust('rightClick');
     break;
     }
};
levels.click.intervalMove = function() {
    var eventAction = event;
    switch (eventAction.type){
        case 'mousedown':
            controlsAdjustTimer();
            break;
        case 'mouseup':
            stopAdjustTimer();
            break;
        case 'mouseout':
            stopAdjustTimer();
            break;
        case 'touchstart':
            controlsAdjustTimer();
            break;
        case 'touchend':
            stopAdjustTimer();
            break;
    }
    function controlsAdjustTimer() {
        theTimer = setInterval(function(){
            levels.click.controlsAdjust(eventAction.target.id)
        }, 50);
        return false;
    }
    function stopAdjustTimer() {
        clearInterval(theTimer);
        return false;
    }
};
levels.click.controlsAdjust = function(clickTarget){
    console.log(clickTarget)
    smoothScrollTo(window.pageYOffset-(window.innerHeight/4));
    var sprite = document.getElementById("rocket").getElementsByTagName("span")[0];
    switch (clickTarget){
        case 'rightClick':
            sprite.style.left = levels.setElementLeftPosition(sprite,2);
            break;
        case 'leftClick':
            sprite.style.left = levels.setElementLeftPosition(sprite,-2)
            break;
    }
    document.getElementById(clickTarget).classList.add('small');
    setTimeout(function(){
        document.getElementById(clickTarget).classList.remove('small')
    }, 200);
};

window.smoothScrollTo = (function () {
    console.log('scroll')
    var timer, start, factor;

    return function (target, duration) {
        var offset = window.pageYOffset,
            delta  = target - window.pageYOffset; // Y-offset difference
        duration = duration || 1000;              // default 1 sec animation
        start = Date.now();                       // get start time
        factor = 0;

        if( timer ) {
            clearInterval(timer); // stop any running animations
        }

        function step() {
            var y;
            factor = (Date.now() - start) / duration; // get interpolation factor
            if( factor >= 1 ) {
                clearInterval(timer); // stop animation
                factor = 1;           // clip to max 1.0
            }
            y = factor * delta + offset;
            window.scrollBy(0, y - window.pageYOffset);
        }

        timer = setInterval(step,10);

        return timer;
    };
}());

document.onkeydown = levels.click.checkKey;
