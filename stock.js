function Stock(smbl, prc) {
  this.symbol = smbl.toUpperCase();
  //this.name = nm;
  this.price = Math.round(prc * 100) / 100;

  this.format = " : $"
  this.displayName = this.symbol + this.format + this.price

  this.width = textWidth(this.displayName);
  this.x = 20;
  this.padding = 10;


}
