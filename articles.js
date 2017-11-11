function Articles(indx, desc, name) {

  this.description = desc.toUpperCase();
  this.index = indx;
  this.title = name.toUpperCase();;



  this.print = function() {
    var output = "";

    output = "[" + this.index + ": " + this.description + ": " + this.title + "]";
    console.log(output);
    return output;
  };


};
