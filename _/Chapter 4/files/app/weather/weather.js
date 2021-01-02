var weather = {}

weather.request = function(){

    var url = 'http://api.openweathermap.org/data/2.5/weather?q=Houston,tx&APPID=e502ef3373e0f8ce33bf8aade934f8d4';
    var url2 = 'http://api.wunderground.com/api/2f6a955101b9b690/conditions/q/TX/Houston.json';
    //var pollenUrl = 'https://www.claritin.com/webservice/allergyforecast.php?zip=77030';
    var forecastURL = 'http://api.wunderground.com/api/2f6a955101b9b690/forecast/q/TX/Houston.json';
    var id1 = ['humidity','pressure','today-high','today-low','wind','weather-icon'];
    var id3 = ['forecast-day-','forecast-day-temp-','weather-icon-']
    services.getPage(url,id1,weather.parseAjax,id);
    services.getPage(url2,'precipitation',weather.parseAjax2,id);
    services.getPage(forecastURL,id3,weather.parseAjax3,id);
};
weather.parseAjax = function(xhr,id){
    var data = JSON.parse(xhr.responseText);
    document.getElementById(id[0]).innerHTML=data.main.humidity+'%';
    document.getElementById(id[1]).innerHTML=data.main.pressure;
    document.getElementById(id[2]).innerHTML=Math.round((data.main.temp_max*9/5)-459.67);
    document.getElementById(id[3]).innerHTML=Math.round((data.main.temp_min*9/5)-459.67);
    document.getElementById(id[4]).innerHTML=data.wind.speed;
    weather.setIcon(id[5],data.weather[0].main);
};

weather.parseAjax2 = function(xhr,id){
    var data = JSON.parse(xhr.responseText);
    document.getElementById(id).innerHTML=data.current_observation.precip_today_in;
};
weather.parseAjax3 = function(xhr,id){
    var data = JSON.parse(xhr.responseText);
    for(i=0;i<data.forecast.simpleforecast.forecastday.length;i++){
        document.getElementById(id[0]+[i]).innerHTML = data.forecast.simpleforecast.forecastday[i].date.weekday_short;
        document.getElementById(id[1]+[i]).innerHTML = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;;
        weather.setIcon(id[2]+i,data.forecast.simpleforecast.forecastday[i].icon)
    }
};
weather.setIcon = function(id,weather){
    weather = weather.toUpperCase();
    switch(weather){
        case 'CLOUDS':
            document.getElementById(id).setAttribute('class','wi wi-day-cloudy-high');
            break;
        case 'CLEAR':
            document.getElementById(id).setAttribute('class','wi wi-day-sunny');
            break;
        case 'RAIN':
            document.getElementById(id).setAttribute('class','wi wi-day-rain');
            break;
        case 'CHANCERAIN':
            document.getElementById(id).setAttribute('class','wi wi-day-sprinkle');
            break;
        case 'PARTLYCLOUDY':
            document.getElementById(id).setAttribute('class','wi wi-day-cloudy');
            break;
        default:
            document.getElementById(id).setAttribute('class','wi wi-hot');
    }
};
weather.request();



