var leaderboard = {};

leaderboard.parseAjax = function (xhr,id){
    var data = JSON.parse(xhr.responseText);
    var leaderboardLength = window.location.hash.split('#')[1]==='home'?4:data.objectgroups.leaderboard.objects.length;
    var leaderboardHTML = '';
    for(i=0;i<leaderboardLength;i++){
        leaderboardHTML+='<li><span><i class="fa fa-fort-awesome"></i>&nbsp;'+data.objectgroups.leaderboard.objects[i].person+'</span>:&nbsp;' +'<span>' +data.objectgroups.leaderboard.objects[i].score+'</span></li>';
    }

    document.getElementById('leaderboard-list').innerHTML=leaderboardHTML;
    document.getElementById('curtain').className = 'fade';
};

if(window.location.hash.split('#')[1]==='home'){
    services.getPage("./app/leaderboard/leaderboard.json",'leaderboard',leaderboard.parseAjax,id);
}else{
    services.getPage(pageRoute.data,'leaderboard',leaderboard.parseAjax,id);
}

