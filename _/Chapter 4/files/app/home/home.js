var home = {};
home.dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
home.monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
home.getTime = function(){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var d=home.dayArray[today.getDay()];
    var mo=home.monthArray[today.getMonth()];
    var y=today.getFullYear();
    m = home.correctDigit(m);
    s = home.correctDigit(s);
    document.getElementById('time').innerHTML = "<br><h1 class='large'>"+h+":"+m+":"+s+"</h1>&nbsp;<span class='dark'>"+d+",</span class='dark'>&nbsp;<span class='dark'>"+mo+"</span>&nbsp;<span class='dark'>"+y+"</span>";
    var t = setTimeout(function(){home.getTime()},500);
};
home.correctDigit = function(i){
    if (i<10)i = "0" + i;  // add zero in front of numbers < 10
    return i;
};


home.loadSections = function() {
    for (i = 0; i < routing.routesArray.length; i++) {
        routing.routesArray[i].callBack.call();
        services.getPage(pageRoute.partial,routing.routesArray[i].path,services.routing.writeHTML);
        if(routing.routesArray[i].path!='home'){
            services.getPage(pageRoute.script,'head',services.routing.writeScript,routing.routesArray[i].path);
            }
    }
};

home.loadSections();
home.getTime();