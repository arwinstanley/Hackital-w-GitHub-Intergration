function Articles(indx, desc, name) {

  this.description = desc;
  this.index = indx;
  this.title = name;



this.print = function(){
var output = "";

output = "[" + this.index + ": " + this.description + ": " + this.title + "]";
console.log(output);
return output;
};


};
