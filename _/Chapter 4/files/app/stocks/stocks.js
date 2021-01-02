var stocks = {};
stocks.request = function() {
    var apiKey = '24e09a475c690683d9d218c1260a6ca2:5:73536423';
    var section = 'world';
    var responseFormat = 'json';
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
    var html = ['']
    services.getPage(url,'stocks-list',stocks.parseAjax,id);
};

stocks.parseAjax = function(xhr,id) {
    var data = JSON.parse(xhr.responseText);
    var stocksHtml = '';
    console.log(data)
    for(i=0;i<1;i++){
        stocksHtml += '<li><h2 class=""><i class="fa fa-line-chart"></i>'+data.query.results.quote[i].Symbol+'</h2></li>'
            +'<li><ul><li class="left"><span>'+data.query.results.quote[i].Ask+'</span></li><li class="right"><span>'+data.query.results.quote[i].Change+'</span></li></ul></li> <li><button onclick="doSomething()" class="wet-asphalt">more</button></li></ul>';
    }
    document.getElementById(id).innerHTML=stocksHtml;
};

stocks.request();