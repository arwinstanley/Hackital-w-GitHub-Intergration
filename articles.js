function Articles(indx, desc, name) {

  this.index = indx;
  this.description = desc.toUpperCase();
  this.title = name.toUpperCase();;

  this.print = function() {
    var output = "";

    output = "[" + this.index + ": " + this.description + ": " + this.title + "]";
    console.log(output);
    return output;
  };
this.keySearch = function(key){
  var output = "";
  if(description.search(key.toUpperCase()) == -1 && title.search(key.toUpperCase()) == -1){
    return output;
  }
  if(description.search(key.toUpperCase()) !== -1 && title.search(key.toUpperCase()) !== -1){
    output = description + title;
  }
  if(description.search(key.toUpperCase()) !== -1){
    output = description;
  }
  if(title.search(key.toUpperCase()) !== -1){
    output = title;
  }
  return output;
}

};
