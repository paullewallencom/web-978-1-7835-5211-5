var tasks = {};
tasks.request = function() {
    var url = 'app/tasks/data.json';

    services.getPage(url,'tasks-list',tasks.parseAjax,id);
};

tasks.parseAjax = function (xhr,id){
    var data = JSON.parse(xhr.responseText);
    var tasksHtml = '';
    for(i=0;i<4;i++){
        tasksHtml+='<li class="ellipsis"><h4 class="dark"><i class="fa fa-calendar-check-o"></i>&nbsp;'+data.events[i].time+'</h4>'
            +'<p>'+data.events[i].title+'</p></li>';
    }
    document.getElementById(id).innerHTML=tasksHtml;
};

tasks.request();
