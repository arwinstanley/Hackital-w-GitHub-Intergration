//QuickStock$®
var stocks = []; //Array of stocks
var symbols = [] //["aapl","googl", "aac", "mmm"];
var symbolJSON = 'stocks.json';
var yearWeeks = ["2017-10-20", "2017-09-22", "2017-08-11", "2017-07-14", "2017-06-23", "2017-05-12", "2017-04-21", "2017-03-17", "2017-02-03", "2017-01-20"]; //YEARS IN A WEEK

var btcMonths = [739.00, 966.19, 1189.10, 1081.30, 1435.00, 2191.83, 2191.83, 2420.60, 2854.30, 4718.30, 4366.60, 6450.20];
var btc; //BTC IS TREATED LIKE A STOCK
var names = ["apple", "google", "aac holdings", "3m"]

var articles = [];
var chyX = 0;
//Jared
var newsOrg = ["business-insider", "fortune"];

var singleArticle;

var yearWeeks = ["2017-10-20", "2017-09-22", "2017-08-11", "2017-07-14", "2017-06-23", "2017-05-12", "2017-04-21", "2017-03-17", "2017-02-03", "2017-01-20"]; //YEARS IN A WEEK


////////FACTORS/////////
var ratingFactor = [];



//
function preload() {
  stockFont = loadFont('assets/BebasNeue.otf');
}

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  //clockCanvas = createCanvas(windowWidth, windowHeight);
  //Import parrticles?
  particlesJS.load('particles-js', 'particles.json', function() {
    //console.log('callback - particles.js config loaded');
  });

  //Graphical Setup
  clock = new Clock();
  background(50, 50, 50, 0); //gray bg
  textFont(stockFont);

  $(document).ready(function() { //jQuery funciton, only called once the document is "ready" wtf that means..
    doArticles();
    doStocks();
    doBTC();


  });



}

function draw() { //TODO not drawing to the currect canvas?
  background(50, 50, 50, 0);
  textSize(25)

  //Clock Ish
  clock.update();
  clock.show()

  //Stock ish
  textSize(25)
  for (var i = 0; i < stocks.length; i++) {
    stocks[i].show(i);

  }
  //coin

  //Article ish
  var chyron = "";
  for (var i = 0; i < articles.length; i++) {
    chyron += articles[i].title + "\t\t | \t\t";
  }
  if (chyX < textWidth(chyron)) { //Repeats
    chyX += 3;
  } else {
    chyX = 0;
  }

  //News ish
  push();
  fill(255, 255, 255, 150);
  text(chyron, width - chyX, height - 2);
  pop();
}

//Peter
function doStocks() {
  $.getJSON('stocks.json', function(data) { //populates symbols from Json
    for (var name in data) { //Iterates through stocks.json
      symbols[name] = data[name]; //copies json to array
      var nm = symbols[name];
      var symbol = symbols[name]; //Grab current symbol
      var key = 'N6N8STFNCERJ1DTH'; //Personal API Key
      var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&interval=1min&apikey=' + key;

      $.getJSON(URL, function(data) { //Grabs the JSON from the URL, and calls a function

        if (typeof data["Meta Data"] !== "undefined") { //Verifies the fetch was successful
          var iSymbol = data["Meta Data"]["2. Symbol"]; //Grabs official symbol from data rather than str passed by user
          var weeks = data["Weekly Time Series"];
          var lastWeek = data["Meta Data"]["3. Last Refreshed"];
          var price = weeks[lastWeek]["1. open"]; //Grabs open price from last week
          var avg = getAvg(weeks);
          stocks.push(new Stock(iSymbol, name, price, avg));
          getRating();
          getScore(stocks[1]);
        } else {
          console.log("data missing?")
        }
      });
    }
  });
}

//Creates a bitcoin ticker
function doBTC() {
  var URL = 'https://blockchain.info/ticker';
  $.getJSON(URL, function(data) {

    var price = data.USD.buy;
    var symbol = "BTC";
    var name = "Bitcoin";
    var avg = getBTCAvg();
    btc = new Stock(symbol, name, price, avg);
    stocks.push(btc);

  });
}

function getBTCAvg() {
  var sum = 0;

  for (var i = 0; i < btcMonths.length; i++) {
    sum += Math.round(btcMonths[i] * 100) / 100;
  }
  return sum / 12;
}

//Peter
function getAvg(x) {
  var sum = 0;

  for (var i = 0; i < yearWeeks.length; i++) {
    sum += Math.round(x[yearWeeks[i]]["1. open"] * 100) / 100; //Converts from string to num
  }
  return sum / 12; //Returns the avg price of the last year
}

//JAred
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
        articles.push(new Articles(index, desc, title));

      }
console.log(articles);
    });

  }

}

function getRating() {
  for (var i = 0; i < stocks.length; i++) {
    ratingFactor[i] = stocks[i].ratingPrice();
  }

}

function getScore(stock) {
  if (articles.length > 0) {
    var relevantArticlesList = [];
    var output = [];

    var score = 0;
    relevantArticlesList = stock.relevantArticles(articles);
    $.getJSON('keywords.json', function(data) {

      for (var name in data) { //Iterates through stocks.json
				console.log(name);
        for (var i = 0; i < relevantArticlesList.length; i++) {
          if (relevantArticlesList[i].keySearch(name) !== "") {
            output.push(data[name]);
          }else { output.push(2)}
        }


			//console.log(relevantArticlesList)

      }
			for (var j = 0; j < output.length; j++) {
				score += output[j];

			}
			console.log(output);
			console.log(score);
			   console.log(score / (output.length));
			return (score/(output.length));
    });
  } else {
    return -1;
  }
}
