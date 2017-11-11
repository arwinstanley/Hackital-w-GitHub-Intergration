//QuickStock$®
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
