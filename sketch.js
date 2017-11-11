//QuickStock$®
<<<<<<< HEAD
var stocks = [];	//Array of stocks
var symbols = ["aapl"] //,"googl", "aac", "mmm"];	//Stocks to fetch, TODO get from user input?
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

	$(document).ready(function() {	//jQuery funciton, only called once the document is "ready" wtf that means..
		for(j = 0; j < symbols.length; j++) {	//Iterate through the supplied symbols
			var symbol = symbols[j];	//Grab current symbol
			var key = 'N6N8STFNCERJ1DTH';	//Personal API Key
			var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+symbol+'&interval=1min&apikey='+key;

			$.getJSON(URL, function(data) {	//Grabs the JSON from the URL, and calls a function
				console.log(data);

				if(typeof data["Meta Data"]["2. Symbol"] !== "undefined" ) {	//Verifies the fetch was successful
					var iSymbol = data["Meta Data"]["2. Symbol"]; //Grabs official symbol from data rather than str passed by user
					var weeks = data["Weekly Time Series"];
					var lastWeek = data["Meta Data"]["3. Last Refreshed"];
					var price = weeks[lastWeek]["1. open"];//Grabs open price from last week

					stocks.push(new Stock(iSymbol, price) );
				} else {
					console.log("data missing?")
				}
			});
		}
	});

	console.log(stocks);
}

function draw() {	//TODO not drawing to the currect canvas?
	background(50);

	textSize(25)
	clock.update();
	clock.show()

	textSize(25)
	for(var i = 0; i < stocks.length; i++) {
		stocks[i].show(i);	//Dras the stocks to the screen
	}
}

function keyPressed() {
	console.log(key);
}

//Counts number of object in an object
function ObjectLength( object ) {
    var length = 0;
    for(var key in object ) {
        if(object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
}
=======
var stocks = []; //Array of stocks
var symbols = ["aapl", "googl", "aac", "mmm"]; //Stocks to fetch, TODO get from user input?
var list;
//Jared's Stuff
//var list = new LinkedList();


function setup() {
  createCanvas(windowWidth, windowHeight);

  $(document).ready(function() { //jQuery funciton, only called once the document is "ready" wtf that means..
    for (j = 0; j < symbols.length; j++) { //Iterate through the supplied symbols
      var symbol = symbols[j]; //Grab current symbol
      var key = 'N6N8STFNCERJ1DTH'; //Personal API Key
      var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&interval=1min&apikey=' + key;

      $.getJSON(URL, function(data) { //Grabs the JSON from the URL, and calls a function
        //console.log(data);

        var iSymbol = data["Meta Data"]["2. Symbol"]; //Grabs official symbol from data rather than str passed by user
        var weeks = data["Weekly Time Series"];
        var lastWeek = data["Meta Data"]["3. Last Refreshed"];
        var price = weeks[lastWeek]["1. open"]; //Grabs open price from last week

        stocks.push(new Stock(iSymbol, price));
      });
    }
  });

  //Jared's Code
  $(document).ready(function() { //jQuery funciton, only called once the document is "ready" wtf that means..


    var URL2 = 'https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=1e4eec7a67aa42a49ff34214aebe4f86';

    $.getJSON(URL2, function(data) { //Grabs the JSON from the URL, and calls a function

      var desc = "";
      var index = i;
      var title = "";
      list = new LinkedList();
      for (var i = 0; i < data.articles.length; i++) {

        desc = data.articles[i].description;
				index = i;
				title =  data.articles[i].title;
				console.log(desc);
        //list.append(new Articles(data.articles[i].description, i, data.articles[i].title));
        //  list.append(new Articles("Hey", i, "Hey"));
      }

      console.log(data);
    //  console.log(data.articles[0].author);

    });
  });





}



//TODO cool idea, have all stocks slide down/up from $500 for animation
function draw() {
  //Setup
  background(30);

  //CLOCK modulefunction Clock(m, d, h, mn, s)
  var time = month() + "/" + day() + " " + hour() % 12 + ":" + minute() + ":" + second();
  fill(255, 255, 255); //Color to white
  textSize(50)
  text(time, width - textWidth(time) - 50, height / 2);
  //
  textSize(25)


  for (var i = 0; i < stocks.length; i++) {
    //begin temp changes
    textSize(25)
    fill(255, 255, 255); //Color to white
    text(stocks[i].displayName, stocks[i].x, 50 + 50 * i) //width and height are native vars to use too
    fill(10, 255, 10); //TODO make the color change according to $$ or alg
    push()
    stroke(255, 255, 255);
    strokeWeight(2)
    rect(stocks[i].width + stocks[i].padding + stocks[i].x, 30 + 50 * i, stocks[i].price / 2, 20, 20, 1, 20, 1);
    pop() //Revert to old graphics setting
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
};
>>>>>>> Jared
