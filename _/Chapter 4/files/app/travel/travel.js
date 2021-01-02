var travel = {}

travel.request = function() {
    var apiKey = 'd33a54a2-9971-4119-8286-42f5566d8bea';
//https://graphhopper.com
//https://graphhopper.com/api/1/route?point=49.932707,11.588051&point=50.3404,11.64705&vehicle=car&debug=true&key=d33a54a2-9971-4119-8286-42f5566d8bea&type=json&calc_points=false&instructions=false
    var point1 = '29.66885,-95.4563095';
    var point2 = '29.7008786,-95.3985539';
    var vehicle = 'bike';
    var dataType = 'json'
    var calc_points = false;
    var instructions = false;
    var debug = true;
    var url = 'https://graphhopper.com/api/1/route?point=' + point1 + '&point=' + point2 + '&vehicle=' + vehicle + '&debug=' + debug + '&key=' + apiKey + '&type=' + dataType + '&calc_points=' + calc_points + '&instructions=' + instructions;
    services.getPage(url,'travel-list',travel.parseAjax,id);
}


travel.parseAjax = function (xhr,id){
    var data = JSON.parse(xhr.responseText);
    var travelHtml = data.paths[0].time;
    travelHtml = (travelHtml/1000/60)<<0;
    var travelSec = Math.round((travelHtml/1000)%60);
    travelHtml = travelHtml + ':' + travelSec;
    document.getElementById(id).innerHTML=travelHtml;
};

travel.request();