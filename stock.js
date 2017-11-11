function Stock(smbl, prc) {
  this.symbol = smbl.toUpperCase();
  //this.name = nm;
  this.price = Math.round(prc * 100) / 100;

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
    push();
      stroke(255,255,255);
      strokeWeight(2);
      var tWidth = 0;
      while(tWidth <= this.price) {
        rect(this.width + this.padding + this.x, 30 + 50*offset, tWidth/2, 20, 20, 1, 20, 1);
        tWidth++;
      }
    pop();//Revert to old graphics setting
  }
}
