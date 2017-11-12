//QuickStock$®
var stocks = []; //Array of stocks
var symbols = ["aapl", "googl"] //,"googl", "aac", "mmm"];	//Stocks to fetch, TODO get from user input?
//Jared
var newsOrg = ["business-insider", "fortune"];

var singleArticle;

var yearWeeks = ["2017-10-20", "2017-09-22", "2017-08-11", "2017-07-14", "2017-06-23", "2017-05-12", "2017-04-21", "2017-03-17", "2017-02-03", "2017-01-20"]; //YEARS IN A WEEK


//
function preload() {
  stockFont = loadFont('assets/BebasNeue.otf');
}

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  //Import parrticles?
  particlesJS.load('particles-js', 'particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

  //Graphical Setup
  clock = new Clock();
  background(50); //gray bg
  textFont(stockFont);

  $(document).ready(function() { //jQuery funciton, only called once the document is "ready" wtf that means..
    doStocks();
    //  doArticles();

  });


}

function draw() { //TODO not drawing to the currect canvas?
  background(50);

  textSize(25)
  clock.update();
  clock.show()

  textSize(25)
  for (var i = 0; i < stocks.length; i++) {
    stocks[i].show(i); //Dras the stocks to the screen
  }
}

function keyPressed() {
  console.log(key);
}

//Counts number of object in an object
function ObjectLength(object) {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
}


function doStocks() {
  for (j = 0; j < symbols.length; j++) { //Iterate through the supplied symbols
    var symbol = symbols[j]; //Grab current symbol
    var key = 'N6N8STFNCERJ1DTH'; //Personal API Key
    var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&interval=1min&apikey=' + key;

    $.getJSON(URL, function(data) { //Grabs the JSON from the URL, and calls a function

      if (typeof data["Meta Data"] !== "undefined") { //Verifies the fetch was successful
        var iSymbol = data["Meta Data"]["2. Symbol"]; //Grabs official symbol from data rather than str passed by user
        var weeks = data["Weekly Time Series"];
        var lastWeek = data["Meta Data"]["3. Last Refreshed"];
        var price = weeks[lastWeek]["1. open"]; //Grabs open price from last week
        var avg = getAvg(weeks);

        stocks.push(new Stock(iSymbol, price, avg));
				stocks[0].ratingPrice();
				stocks[1].ratingPrice();
				console.log("total "+  stocks[0].ratingPrice() + stocks[1].ratingPrice());


      } else {
        console.log("data missing?")
      }

    });
  }
	console.log(stocks);

};

function doArticles() {
  for (j = 0; j < newsOrg.length; j++) {
    var newsOrganization = newsOrg[j];

    var URL2 = 'https://newsapi.org/v1/articles?source=' + newsOrganization + '&sortBy=top&apiKey=1e4eec7a67aa42a49ff34214aebe4f86';

    $.getJSON(URL2, function(data) { //Grabs the JSON from the URL, and calls a function

      var desc = "";
      var index = i;
      var title = "";


      for (var i = 0; i < data.articles.length; i++) {

        desc = data.articles[i].description;
        index = i;
        title = data.articles[i].title;
        singleArticle = new Articles(index, desc, title);

        singleArticle.print();
      }

    });
  }
};


function getAvg(x) {
  var sum = 0;
  //console.log(x);
  for (var i = 0; i < yearWeeks.length; i++) {
    sum += Math.round(x[yearWeeks[i]]["1. open"] * 100) / 100; //Converts from string to num
  }
  return sum / 12; //Returns the avg price of the last year
}
