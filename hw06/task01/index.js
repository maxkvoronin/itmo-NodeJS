/* govnokod */

class Node {
  constructor (value, next) {
    this._value = value;
    this._next = next;
  }
}

class LinkedList {
  constructor () {
      this.lst = null;
      this.size = arguments.length;

      for (var i = arguments.length - 1; i >= 0; i--) {
          this.lst = new Node(arguments[i], this.lst); 
      }
      
  }
  add (elem) {
    this.map = new Map();

    let i = 0;
    while (this.lst!==null) {
      this.map.set(i, this.lst._value);
      this.lst = this.lst._next;
      i++;
    }

    this.map.set(i, elem);

    for (let j = this.map.size - 1; j >= 0; j--) {
       this.lst = new Node(this.map.get(j), this.lst); 
    }

    return this.lst;    
  }

  insert (index, value) { 
    this.map = new Map();

    let i = 0;
    while (this.lst!==null) {
      this.map.set(i, this.lst._value);
      this.lst = this.lst._next;
      i++;
    }

    let size = this.map.size;
    if (index > size) index = size;

    for (let i = size; i >= 0; i--) {
      this.map.set(i, this.map.get(i-1));
      if (i === index) {
        this.map.set(i, value);
        break;
      }
    }

    for (let j = this.map.size - 1; j >= 0; j--) {
      this.lst = new Node(this.map.get(j), this.lst); 
    }

    return this.lst;
  }

  get (index) {
    if (this.map.get(index) === undefined)
      throw new Error('invalid index');

    return this.map.get(index);
  }

  remove (value) {
    this.map = new Map();

    let i = 0;
    while (this.lst!==null) {
      this.map.set(i, this.lst._value);
      this.lst = this.lst._next;
      i++;
    }

    let size = this.map.size;
    let nwmap = new Map();
    for (let i = 0; i < size; i++) {
      if(this.map.get(i) === value) {
        for (let j = i; j < size - 1; j++) {
          nwmap.set(j, this.map.get(j+1));
        }
        break;
      }
      nwmap.set(i, this.map.get(i));
    }

    for (let j = nwmap.size - 1; j >= 0; j--) {
      this.lst = new Node(nwmap.get(j), this.lst); 
    }

    return this.lst;
  }

  removeAt (index) {
    this.map = new Map();

    let i = 0;
    let value;

    while (this.lst!==null) {
      this.map.set(i, this.lst._value);
      this.lst = this.lst._next;
      i++;
    }

    let size = this.map.size;
    let nwmap = new Map();
    for (let i = 0; i < size; i++) {
      if(i === index) {
        for (let j = i; j < size - 1; j++) {
          nwmap.set(j, this.map.get(j+1));
        }
        break;
      }
      value = this.map.get(i);
      nwmap.set(i, this.map.get(i));
    }

    for (let j = nwmap.size - 1; j >= 0; j--) {
      this.lst = new Node(nwmap.get(j), this.lst); 
    }

    if (this.map.get(index) === undefined)
      throw new Error('invalid index');

    return value;
  }

  contains (value) {
    this.map = new Map();

    let i = 0;
    while (this.lst!==null) {
      this.map.set(i, this.lst._value);
      this.lst = this.lst._next;
      i++;
    }

    let size = this.map.size;
    let toggle = 0;

    for (let i = 0; i < size; i++) {
      if(this.map.get(i) === value) {
        toggle = 1;
      }
    }

    for (let j = this.map.size - 1; j >= 0; j--) {
      this.lst = new Node(this.map.get(j), this.lst); 
    }

    
    if (toggle === 1)
      return true;
    else 
      return false;

  }

  len () {
    this.map = new Map();
    let i = 0;
    while (this.lst!==null) {
      this.map.set(i, this.lst._value);
      this.lst = this.lst._next;
      i++;
    }

    for (let j = this.map.size - 1; j >= 0; j--) {
      this.lst = new Node(this.map.get(j), this.lst); 
    }

    return i;
  }

  is_empty() {
    if (this.len() === 0)
      return true;
    else
      return false;
  }

  clear() {
    this.lst = null;
  }

  [Symbol.iterator]() {

    this.map = new Map();
    let i = 0;
    while (this.lst!==null) {
      this.map.set(i, this.lst._value);
      this.lst = this.lst._next;
      i++;
    }
    var j = 0;

    return {
      next: () => ({ value: this.map.get(j), done: j++ === this.map.size})
    };
  };
}

var list = new LinkedList(1, 2, 3);
console.log(list.add(10));
console.log(list.add(11));
console.log(list.get(4));
console.log(list.insert(5,88));
console.log(list.remove(88));
console.log(list.removeAt(4));
console.log(list.contains(10));
console.log(list.len());
//console.log(list.is_empty());
console.log(list.insert(5,100));
console.log(list.remove(1));
console.log(list.remove(2));
console.log(list.clear());
console.log(list.insert(2,88));
console.log(list.clear());
console.log(list.add(11));
console.log(list.clear());
console.log(list.is_empty());

var ll2 = new LinkedList('item1', 'item2', 'item3');

for (item of ll2){
	console.log(item); // 'item1', затем 'item2', затем 'item3'
}



