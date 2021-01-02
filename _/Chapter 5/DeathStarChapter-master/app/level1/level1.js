level1={};

level1.parseAjaxHome = function (xhr,id){
    level1.data = JSON.parse(xhr.responseText);
    console.log(level1.data.objectgroups)
    var level1StarsHTML = '<i class="'+level1.data.objectgroups.moon.objects[0].idclass+' '+level1.data.objectgroups.moon.objects[0].sizeclass+' '+level1.data.objectgroups.moon.objects[0].colorclass+'"></i>';
    level1StarsHTML += '<div id="stars">';
    for(i=0;i<level1.data.objectgroups.stars.objects.length/4;i++){
        level1StarsHTML+='<i class="'+level1.data.objectgroups.stars.objects[i].idclass+' '+level1.data.objectgroups.stars.objects[i].colorclass+'"></i>';
    }
    level1StarsHTML += '</div>';
    document.getElementById('p0').innerHTML=level1StarsHTML;
    if(window.innerHeight>window.innerWidth){
        levels.spreadObjects(document.getElementById("stars").getElementsByTagName("i"),100,window.innerWidth,100,1,"absolute","px");
    }else{
        levels.spreadObjects(document.getElementById("stars").getElementsByTagName("i"),20,25,20,1,"absolute","%");
    }
};

level1.parseAjax = function (xhr,id){
    level1.data = JSON.parse(xhr.responseText);
    document.getElementById('p0').innerHTML = '<i class="'+level1.data.objectgroups.moon.objects[0].idclass+' '+level1.data.objectgroups.moon.objects[0].sizeclass+' '+level1.data.objectgroups.moon.objects[0].colorclass+'"></i>';

    var level1StarsHTML = '<div id="stars">';
    for(i=0;i<level1.data.objectgroups.stars.objects.length;i++){
        level1StarsHTML+='<i class="'+level1.data.objectgroups.stars.objects[i].idclass+' '+level1.data.objectgroups.stars.objects[i].colorclass+'"></i>';
    }
    level1StarsHTML += '</div>';
    document.getElementById('p1').innerHTML=level1StarsHTML;

    for (var key in level1.data.objectgroups.clouds){
        var cloudHTMLStart = '<div class="clouds">';
        for(var key0 in level1.data.objectgroups.clouds[key].objects){
            cloudHTMLStart+='<i class="'+level1.data.objectgroups.clouds[key].objects[key0].idclass+' '+level1.data.objectgroups.clouds[key].objects[key0].sizeclass+' '+level1.data.objectgroups.clouds[key].objects[key0].colorclass+'"></i>';
        }
        cloudHTMLStart+= '</div>';
        document.getElementById(key).innerHTML=cloudHTMLStart;
    }

    var objectsHTMLStart = '';
    for (var key in level1.data.objectgroups.objects){
        objectsHTMLStart+='<div id="'+key+'">';
        if(key==='rocket')
            objectsHTMLStart+='<span>';
        for(var key0 in level1.data.objectgroups.objects[key].objects){
            objectsHTMLStart+='<i class="'+level1.data.objectgroups.objects[key].objects[key0].idclass+' '+level1.data.objectgroups.objects[key].objects[key0].sizeclass+' '+level1.data.objectgroups.objects[key].objects[key0].colorclass+'"></i>';
        }
        if(key==='rocket')
            objectsHTMLStart+='</span>';
        objectsHTMLStart+='</div>';
    }
    document.getElementById('objects').innerHTML=objectsHTMLStart;
    var terraHTMLStart = '<div id="ground">';
    for (var key in level1.data.objectgroups.terra){
        terraHTMLStart+='<div class="'+key+'">';
        for(var key0 in level1.data.objectgroups.terra[key].objects){
            terraHTMLStart+='<i class="'+level1.data.objectgroups.terra[key].objects[key0].idclass+' '+level1.data.objectgroups.terra[key].objects[key0].sizeclass+' '+level1.data.objectgroups.terra[key].objects[key0].colorclass+'"></i>';
        }
        terraHTMLStart+='</div>';
    }
    terraHTMLStart+='</div>';
    document.getElementById('terra').innerHTML=terraHTMLStart;
    levels.spreadObjects(document.getElementById("stars").getElementsByTagName("i"),150,100,1,1,"fixed","%");
    levels.spreadObjects(document.getElementById("ground").getElementsByClassName("fa-tree"),0,14,-(window.innerHeight/28),1,"relative","px");
    levels.spreadObjects(document.getElementById("ground").getElementsByClassName("right")[0].getElementsByClassName("small"),0,14,-(window.innerHeight/13),1,"relative","px");
    levels.spreadObjects(document.getElementById("ground").getElementsByClassName("right")[0].getElementsByClassName("large"),0,14,-(window.innerHeight/15),1,"relative","px");
    for (var i = 0; i < document.getElementsByClassName("clouds").length; i++){
        levels.spreadObjects(document.getElementsByClassName("clouds")[i].getElementsByTagName("i"),window.innerHeight*.75,window.innerWidth*.75,1,1-(window.innerWidth/2),"relative","px");
    }
};

level1.topOfScroll = function(){
    console.log('l-top')
};

level1.bottomOfScroll = function(){
    console.log('l-bottom')
};

level1.updateElement = function() {
    levels.updateOnMove(level1.topOfScroll,level1.bottomOfScroll,level1.data.objectgroups.messages);
    level1.getMovingElements(function (theObject,increment){
        theObject.style.position = "relative";
        theObject.style.left = levels.setElementLeftPosition(theObject,increment);
    });
    levels.moveEarth(document.getElementById("earth"));
    for (var i =0; i < document.getElementById("stars").getElementsByTagName("i").length; i++){
        document.getElementById("stars").getElementsByTagName("i")[i].style.opacity = (1-(window.pageYOffset/(window.innerHeight*(document.getElementsByClassName("row").length))) -.3);
    }
};


level1.cloudCall = function(clouds){
    for (var k=0;k<clouds.classList.length;k++){
        switch (clouds.classList[k]){
            case 'fa-2x':
                clouds.style.left = levels.setElementLeftPosition(clouds,1);
                break;
            case 'fa-3x':
                clouds.style.left = levels.setElementLeftPosition(clouds,2);
                break;
            case 'fa-4x':
                clouds.style.left = levels.setElementLeftPosition(clouds,3);
                break;
            case 'fa-5x':
                clouds.style.left = levels.setElementLeftPosition(clouds,4);
                break;
            default:
                clouds.style.left = levels.setElementLeftPosition(clouds,.5);
                ;
        }
    }
};


level1.getMovingElements = function(callback){
    for(var i = 0;i<document.getElementsByClassName("row").length;i++){
        if((window.pageYOffset + (window.innerHeight))>document.getElementsByClassName("row")[i].offsetTop && (window.pageYOffset)<(document.getElementsByClassName("row")[i].offsetTop+(window.innerHeight/2*3))){
            for(j=0;j<document.getElementsByClassName("row")[i].getElementsByTagName("i").length;j++){
                for(k=0;k<document.getElementsByClassName("row")[i].getElementsByTagName("i")[j].classList.length;k++){
                    switch(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j].classList[k]){
                        case 'fa-cloud':
                            level1.cloudCall(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j]);
                            break;
                        case 'fa-plane':
                            callback(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j],3);
                            break;
                        case 'fa-moon-o':
                            callback(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j],6);
                            break;
                        case 'fa-twitter':
                            callback(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j],2)
                            break;
                        default:
                            ;
                    }
                }
            }
        }
    }
};




if(window.location.hash.split('#')[1]==='home'){
    services.getPage("./app/level1/level1.json",'home',level1.parseAjaxHome,id);
}else{
    levels.load('level1.updateElement()');
    services.getPage(pageRoute.data,'level1',level1.parseAjax,id);
}
