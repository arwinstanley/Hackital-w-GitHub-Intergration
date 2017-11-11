function LinkedList() {
  this.head = null;

  this.isEmpty = function() {
    return (this.head === null);
  };

  //[10] -> [20] -> [30] -> null
  this.size = function() {
    var current = this.head;
    var count = 0;
    while (current !== null) {
      count++;
      current = current.next;
    }

    return count;
  };

  this.prepend = function(val) {

    var newNode = {
      data: val,
      next: this.head
    };
    this.head = newNode;
  };

  this.append = function(val) {
    var newNode = {
      data: val,
      next: null
    };

    if (this.isEmpty()) {
      this.head = newNode;
      return;
    }
    var current = this.head;

    while (current.next != null) {
      current = current.next;
    }
    current.next = newNode;

  };

  this.contains = function(val) {
    var current = this.head;

    while (current !== null) {
      if (current.val === val) {
        return true;
      }
      current = current.next;
    }

    return false;
  };


  this.remove = function(val) {
    if (!this.contains(val)) {
      return;
    }
    if (this.head.data === val) {
      this.head = this.head.next;
      return;
    }

    var prev = null;
    var curr = this.head;

    while (curr.data !== val) {
      prev = curr;
      curr = curr.next;
    }
    prev.next = curr.next;
  };

  //[5, 10, 15]

  this.print = function() {
    var output = '[';
    var current = this.head;
    while (current !== null) {
      output += current.data;
      if (current.next !== null) {
        output += ',';
      }
      current = current.next;
    }
    output += ']';
    console.log(output);
  };


};
