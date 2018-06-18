
let checkParams = function (obj) {
  const params = ["method", "name", "phone", "ip", "key"];  
  for(let i = 0; i < params.length; i++) {
    if(!Object.keys(obj).includes(params[i]))
      return false;
  }
  return true;
}

let generateKey = function() {
    let alf = 'qwertyuiopasdfghjklzxcvbnm0123456789', json = {'key': ''};
    for(let i = 0; i< 16; i++) {
      let char = alf[Math.floor(Math.random()*36)];
      json.key+=(Math.random() > 0.5) ? char : char.toUpperCase();
    }
    return json;
  }

  module.exports.generateKey = generateKey;
  module.exports.checkParams = checkParams;