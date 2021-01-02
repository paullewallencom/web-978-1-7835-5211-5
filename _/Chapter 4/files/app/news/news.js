var news = {};
news.request = function(){
    var apiKey = '24e09a475c690683d9d218c1260a6ca2:5:73536423';
    var baseUrl = 'http://api.nytimes.com/svc/topstories/v1/';
    var section = 'world';
    var responseFormat = 'json';
    var url = baseUrl + section + '.' + responseFormat + '?api-key=' + apiKey;
    services.getPage(url,'news-list',news.parseAjax);
};

news.parseAjax = function(xhttp,id){
    var data = JSON.parse(xhttp.responseText);
    var newsHtml = '';
    for(i=0;i<4;i++){
        newsHtml+='<li class="ellipsis"><a href="'+data.results[i].url+'"><h4 class="dark"><i class="fa fa-newspaper-o"></i>&nbsp;'+data.results[i].title+'</h4>'
        +'<p>'+data.results[i].abstract+'</p></a></li>';
    }
    document.getElementById(id).innerHTML=newsHtml;
};

news.request();
