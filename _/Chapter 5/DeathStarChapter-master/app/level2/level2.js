var level2 = {};
level2.data;

level2.updateElement = function() {
    levels.updateOnMove(level2.topOfScroll,level2.bottomOfScroll,level2.data.objectgroups.messages);
    levels.moveRocket(document.getElementById("rocket"));
    levels.moveSaturn(document.getElementById("saturn").getElementsByTagName('object')[0]);
    document.getElementById('objects1').style.bottom = levels.setElementBottomPosition(document.getElementById('objects1'), 1);
    document.getElementById('objects2').style.bottom = levels.setElementBottomPosition(document.getElementById('objects2'), 1)
    level2.getMovingElements(function (theObject, increment) {
        theObject.style.position = "relative";
        theObject.style.left = levels.setElementLeftPosition(theObject, increment);
    });
};


level2.topOfScroll = function(){
};
level2.bottomOfScroll = function(){
};


level2.getMovingElements = function(callback){
    for(var h = 0;h<document.getElementsByClassName("row").length;h++){
        if((window.pageYOffset + (window.innerHeight))>document.getElementsByClassName("row")[h].offsetTop && (window.pageYOffset)<(document.getElementsByClassName("row")[h].offsetTop+(window.innerHeight/2*3))){
            if(document.getElementsByClassName("row")[h].getElementsByClassName("smallship").length>0){
                for(j=0;j<document.getElementsByClassName("row")[h].getElementsByClassName("smallship").length;j++){
                    switch(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j].getAttribute('id')) {
                        case 'rocket2':
                            callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], -4);
                            break;
                        case 'falcon':
                            callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], -3);
                            break;
                        case 'x-wing':
                            callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], -2);
                            break;
                        case 'tie-fighter':
                            callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], 2);
                            break;
                        case 'satellite1':
                            callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], 7);
                            break;
                        case 'satellite2':
                            callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], 3);
                            break;
                        case 'satellite3':
                            callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], 2);
                            break;
                        default:
                            ;
                    }
                }

            }else if(document.getElementsByClassName("row")[h].getElementsByClassName("deathStarAdd").length>0&&(document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length))>=.999){

                var deathStarExplodes = document.getElementsByClassName("row")[h].getElementsByClassName("deathStarAdd")
                for (var i=0;i<deathStarExplodes.length;i++){
                    deathStarExplodes[i].classList.add('show')

                }
            }
        }
    }
};

level2.parseAjaxHome = function (xhr,id) {
    level2.data = JSON.parse(xhr.responseText);
    var homeObjectsHTMLStart = '';
    for (var key in level2.data.objectgroups.objects.starships3.objects){
        homeObjectsHTMLStart+='<div id="'+level2.data.objectgroups.objects.starships3.objects[key].type+'" class="'+level2.data.objectgroups.objects.starships3.objects[key].idclass+' '+level2.data.objectgroups.objects.starships3.objects[key].sizeclass+' '+level2.data.objectgroups.objects.starships3.objects[key].colorclass+'">';
        homeObjectsHTMLStart+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.starships3.objects[key].idclass+'.svg" >'+level2.data.objectgroups.objects.starships3.objects[key].type+'</object></div>';
    }
    for (var key in level2.data.objectgroups.objects.death_star.objects) {
        homeObjectsHTMLStart += '<div id="' + level2.data.objectgroups.objects.death_star.objects[key].type + '" class="' + level2.data.objectgroups.objects.death_star.objects[key].idclass + ' ' + level2.data.objectgroups.objects.death_star.objects[key].sizeclass + ' ' + level2.data.objectgroups.objects.death_star.objects[key].colorclass + '">';
        if(level2.data.objectgroups.objects.death_star.objects[key].type!='cloud'){
            homeObjectsHTMLStart += '<object type="image/svg+xml" data="lib/space-icons/' + level2.data.objectgroups.objects.death_star.objects[key].idclass + '.svg" >' + level2.data.objectgroups.objects.death_star.objects[key].type + '</object>';
        }
        homeObjectsHTMLStart += '</div>';
    }
    document.getElementById('homeObjects').innerHTML=homeObjectsHTMLStart;

    if(window.innerHeight>window.innerWidth){
        levels.spreadObjects(document.getElementById("homeObjects").getElementsByClassName("smallship"),120,window.innerWidth,210,30,"absolute","px");
    }else{
        levels.spreadObjects(document.getElementById("homeObjects").getElementsByClassName("smallship"),20,20,20,25,"absolute","%");
    }
};

level2.parseAjax = function (xhr,id) {

    level2.data = JSON.parse(xhr.responseText);

    var level2SaturnHTML='<div id="'+level2.data.objectgroups.objects.saturn.objects[0].type+'" class="'+level2.data.objectgroups.objects.saturn.objects[0].idclass+' '+level2.data.objectgroups.objects.saturn.objects[0].sizeclass+' '+level2.data.objectgroups.objects.saturn.objects[0].colorclass+'">';
    level2SaturnHTML+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.saturn.objects[0].idclass+'.svg" >'+level2.data.objectgroups.objects.saturn.objects[0].type+'</object></div>';
    document.getElementById('saturnObject').innerHTML=level2SaturnHTML;

    var level2StarsHtml = '<div id="stars">';
    for(i=0;i<level2.data.objectgroups.stars.objects.length;i++){
        level2StarsHtml+='<i class="'+level2.data.objectgroups.stars.objects[i].idclass+' '+level2.data.objectgroups.stars.objects[i].colorclass+'"></i>';
    }
    level2StarsHtml += '</div>';
    document.getElementById('starsObject').innerHTML=level2StarsHtml;


    var rocketObjectHTML = '<div id="rocket"><span>';
    for (var key in level2.data.objectgroups.objects.rocket.objects){
        rocketObjectHTML+='<i class="'+level2.data.objectgroups.objects.rocket.objects[key].idclass+' '+level2.data.objectgroups.objects.rocket.objects[key].sizeclass+' '+level2.data.objectgroups.objects.rocket.objects[key].colorclass+'"></i>';
    }
    rocketObjectHTML+='</span></div>';
    document.getElementById('rocketObject').innerHTML=rocketObjectHTML;

    var objects1HTMLStart = '';
    for (var key in level2.data.objectgroups.objects.starships1.objects){
        objects1HTMLStart+='<div id="'+level2.data.objectgroups.objects.starships1.objects[key].type+'" class="'+level2.data.objectgroups.objects.starships1.objects[key].idclass+' '+level2.data.objectgroups.objects.starships1.objects[key].sizeclass+' '+level2.data.objectgroups.objects.starships1.objects[key].colorclass+'">';
        objects1HTMLStart+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.starships1.objects[key].idclass+'.svg" >'+level2.data.objectgroups.objects.starships1.objects[key].type+'</object></div>';
    }
    document.getElementById('objects1').innerHTML=objects1HTMLStart;

    var objects2HTMLStart = '';
    for (var key in level2.data.objectgroups.objects.starships2.objects){
        objects2HTMLStart+='<div id="'+level2.data.objectgroups.objects.starships2.objects[key].type+'" class="'+level2.data.objectgroups.objects.starships2.objects[key].idclass+' '+level2.data.objectgroups.objects.starships2.objects[key].sizeclass+' '+level2.data.objectgroups.objects.starships2.objects[key].colorclass+'">';
        objects2HTMLStart+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.starships2.objects[key].idclass+'.svg" >'+level2.data.objectgroups.objects.starships2.objects[key].type+'</object></div>';
    }
    document.getElementById('objects2').innerHTML=objects2HTMLStart;

    var objects3HTMLStart = '';
    for (var key in level2.data.objectgroups.objects.starships3.objects){
        objects3HTMLStart+='<div id="'+level2.data.objectgroups.objects.starships3.objects[key].type+'" class="'+level2.data.objectgroups.objects.starships3.objects[key].idclass+' '+level2.data.objectgroups.objects.starships3.objects[key].sizeclass+' '+level2.data.objectgroups.objects.starships3.objects[key].colorclass+'">';
        objects3HTMLStart+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.starships3.objects[key].idclass+'.svg" >'+level2.data.objectgroups.objects.starships3.objects[key].type+'</object></div>';
    }
    document.getElementById('objects3').innerHTML=objects3HTMLStart;

    var deathStarObjectHTML = '';
    for (var key in level2.data.objectgroups.objects.death_star.objects) {
        deathStarObjectHTML += '<div id="' + level2.data.objectgroups.objects.death_star.objects[key].type + key+'" class="' + level2.data.objectgroups.objects.death_star.objects[key].idclass + ' ' + level2.data.objectgroups.objects.death_star.objects[key].sizeclass + ' ' + level2.data.objectgroups.objects.death_star.objects[key].colorclass + '">';
        if(level2.data.objectgroups.objects.death_star.objects[key].type!='cloud'){
            deathStarObjectHTML += '<object type="image/svg+xml" data="lib/space-icons/' + level2.data.objectgroups.objects.death_star.objects[key].idclass + '.svg" >' + level2.data.objectgroups.objects.death_star.objects[key].type + '</object>';
        }
        deathStarObjectHTML += '</div>';
    }
    document.getElementById('deathstarObject').innerHTML=deathStarObjectHTML;

    levels.spreadObjects(document.getElementById("stars").getElementsByTagName("i"),150,100,1,1,"fixed","%");
    levels.spreadObjects(document.getElementById("objects1").getElementsByClassName("smallship"),150,150,1,1,"relative","%");
    levels.spreadObjects(document.getElementById("objects2").getElementsByClassName("smallship"),150,150,1,1,"relative","%");
    levels.spreadObjects(document.getElementById("objects3").getElementsByClassName("smallship"),150,150,1,1,"relative","%");
};


if(window.location.hash.split('#')[1]==='home'){
    services.getPage("./app/level2/level2.json",'home',level2.parseAjaxHome,id);
}else{
    levels.load('level2.updateElement()');
    services.getPage(pageRoute.data,'level2',level2.parseAjax,id);
}