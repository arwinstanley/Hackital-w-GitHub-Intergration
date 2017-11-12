function Clock() {
  var hr, mn, sc, time, d, mnth, yr, tZone;
  angleMode(DEGREES);

  this.update = function() {
     hr = hour()%12;
     mn = minute();
     sc = second();
     time = hr + ":" + mn + ":" + sc;

     d = day();
     mnth = month();
     yr = year();
  }

  this.show = function() {
    clear()
    push()
      translate(width - width/4, height/2);
      rotate(-90);  //puts top at 12 o clock
      strokeCap(SQUARE);  //Sharp type *_*
      stroke(255);  //White stroke
      noFill(); //Removes ugly

      //SECONDS
      strokeWeight(6);
      var endSC = map(sc, 0, 60, 0, 360);
      stroke(255, 255, 255, endSC);
          //x ,           y,       ,hrad, vrad, how many
      arc(0, 0, 280, 280, 0, endSC);

      //MINUTES
      strokeWeight(10);  //Size
      var endMN = map(mn, 0, 60, 0, 360);
      stroke(255, 255, 255, endMN);
      arc(0, 0, 300, 300, 0, endMN);

      //HOURS
      strokeWeight(14);  //Size
      var endHR = map(mn, 0, 24, 0, 360);
      stroke(255, 255, 255, endHR);
      arc(0, 0, 328, 328, 0, endHR);
    pop();

    //Text formatting
    push()
      translate(width - width/4, height/2);
      textSize(40);
      fill(255);
      text(time, -textWidth(time)/2, 0);
    pop()
  }
  //Converts the num to a day
  this.numToMonth = function(num) {
    var result;
    switch (num) {
    case 1:
        result = "Janury";
        break;
    case 2:
        day = "February";
        break;
    case 3:
        day = "March";
        break;
    case 4:
        day = "April";
        break;
    case 5:
        day = "May";
        break;
    case 6:
        day = "June";
        break;
    case 7:
        day = "July";
        break;
    case 8:
        day = "August";
        break;
    case 9:
        day = "September";
        break;
    case 10:
        day = "October";
        break;
    case 11:
        day = "November";
        break;
    case 12:
        day = "December";
        break;
      }
    }
}
