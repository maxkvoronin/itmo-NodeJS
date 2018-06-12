module.exports = class Converter {
  constructor() {
    this._UPPERCASE_CHARCODE_A = 65,
    this._UPPERCASE_CHARCODE_Z = 90;
    this._LOWERCASE_UPPERCASE_DIFFERENCE = 32;
    this._CAMEL_SYMBOL = '_';
    this._res = new String();
  }

  camel_to_snake(name) {

    this._res = "";
    name = name.slice(0, -1).slice(1);

    for (let i = 0; i < name.length; i++) {      
      let charCode =  name.charCodeAt(i);
      if (charCode <= this._UPPERCASE_CHARCODE_Z && charCode >= this._UPPERCASE_CHARCODE_A ) {
        charCode += this._LOWERCASE_UPPERCASE_DIFFERENCE;
        if (i!==0) this._res += this._CAMEL_SYMBOL;
      } 
      this._res += String.fromCharCode(charCode);
    }
  return this._res;
  }

  snake_to_camel(name) {

    this._res = "";
    name = name.slice(0, -1).slice(1);

    if (name[name.length - 1] === this._CAMEL_SYMBOL) {
      name = name.slice(0, -1);
    }

    for (let i = 0; i < name.length; i++) {      
      if (name[i] === this._CAMEL_SYMBOL) {
        this._res += String.fromCharCode(name.charCodeAt(++i) - this._LOWERCASE_UPPERCASE_DIFFERENCE);
        continue;
      }
      this._res += name[i];
    }
  return this._res;
  }
}