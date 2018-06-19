
module.exports = () => {
  let alf = 'qwertyuiopasdfghjklzxcvbnm0123456789', json = {'key': ''};
  for(let i = 0; i< 16; i++) {
    let char = alf[Math.floor(Math.random()*36)];
    json.key+=(Math.random() > 0.5) ? char : char.toUpperCase();
  }
  return json;
}