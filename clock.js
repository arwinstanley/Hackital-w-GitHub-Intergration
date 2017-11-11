function Clock() {
  var hr, mn, sc, time;
  angleMode(DEGREES);


  this.update = function() {
     hr = hour();
     mn = minute();
     sc = second();

    time = hr + ":" + mn + ":" + sc;
  }

  this.show = function() {
    push()
    strokeCap(SQUARE);
      strokeWeight(8);
      stroke(255);
      noFill();
      ellipse(width - width/4, height/2, 300);

      
      strokeWeight(4);
      stroke(255, 100, 150);
          //x ,           y,       ,hrad, vrad, how many
      arc(width - width/4, height/2, 300, 300, 0, 360)

    pop()


    //Text formatting
    push()
      textSize(40)
      fill(255);
      text(time, width - width/4, height/2)
    pop()
  }
}
