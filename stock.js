function Stock(smbl, prc) {
  this.symbol = smbl.toUpperCase();
  //this.name = nm;
  this.price = Math.round(prc * 100) / 100;
  this.avg = this.price + random(0, 100);
  this.format = " : $";
  this.displayName = this.symbol + this.format + this.price;

  this.width = textWidth(this.displayName);
  this.x = 20;
  this.padding = 10;


  //Rounds to 2 decimal places
  //this.fPrice = function(rawPrice) {
  //  return Math.round(rawPrice * 100) / 100;
  //}

  this.show = function(offset) {
    textSize(25);
    fill(255,255,255);	//Color to white
    text(this.displayName, this.x, 50 + 50 * offset); 	//width and height are native vars to use too
    fill(10,255,10);	//TODO make the color change according to $$ or alg
    this.currentBar(offset);
    this.avgBar(offset);
  }

  this.currentBar = function(offset) {
    push()
strokeWeight(2);
stroke(255);
if(this.price > this.avg) { //Above Avg
fill(50, 200, 50, 255); //transparent
} else { //Below Avg
fill(200, 50, 50, 255); //transparent
}
rect(this.width + this.padding + this.x, 30 + 50*offset, this.price/2, 20, 20, 1, 20, 1);
pop();
  }

  this.avgBar = function(offset) {
    push();
    strokeWeight(2);
    stroke(255);
    fill(200, 200, 200, 200); //transparent
    rect(this.width + this.padding + this.x, 30 + 50*offset, this.avg/2, 20, 20, 1, 20, 1);
    pop();
  }
  this.relevantArticles = function(arr, name){ //takes in an array of articles and the stocks name as a string
    var relevant = [];
    var scores =[];
     for(int i = 0; i< arr.length; i++){
         if(arr[i].keySearch(name) !== ""){
           relevant.push(arr[i]);
         }
     }
    return relevant;
  }
}
