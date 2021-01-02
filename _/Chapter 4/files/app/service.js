var services = {};
services.getPage = function(url,id,callBack,hash){
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callBack(xhttp,id,hash);
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
};

services.routing = {};
services.routing.register = function(path, callBack){
    var routeObject = {};
    routeObject.path = path;
    routeObject.callBack = callBack;
    routing.routesArray.push(routeObject);
};
services.routing.getLocationHash = function(){
    if(!window.location.hash)
        window.location.hash = '#home';
    services.routing.useArray(window.location.hash.split('#')[1])
};
services.routing.useArray = function(hash){
    for(i=0;i<routing.routesArray.length;i++){
        if(routing.routesArray[i].path===hash)
            routing.routesArray[i].callBack.call();
    }
    services.getPage(pageRoute.page,'content',services.routing.writeHTML,hash);
    services.getPage(pageRoute.script,'head',services.routing.writeScript,hash);
};
services.routing.writeHTML = function(xhr,id){
    if(document.getElementById(id)!=null)
    document.getElementById(id).innerHTML = xhr.responseText;
};
services.routing.writeScript = function(xhr,id,hash){
    var newScript = document.createElement('script');
    newScript.text = 'var id= "'+hash+'";';
    newScript.text += xhr.responseText;
    document.getElementsByTagName(id).item(0).appendChild(newScript);
};
services.routing.writeJSON = function(xhr){
    var data = JSON.parse(xhr.responseText);
};
