/*
2*. Генератор случайных паролей. Требуется реализовать генератор
(function*) случайных паролей указанной длины. В пароле можно 
использовать любые символы в верхнем и нижнем регистре. 
Например: password_generator(16), вернет случайный пароль 
длиной 16 символов.
*/

function* randPass (length) {
  let str;
  let randCharCode;

  //чаркоды от 48 до 122 это любые символы в верхнем и нижнем регистре, 
  //либо можно было сделать алфавит допустимых символов и по нему случайно бегать.
  while(true) {
    str = [];

    for(let i=0;i<length;i++) {
      randCharCode = Math.floor( Math.random()*74 ) + 48;
      str.push(String.fromCharCode(randCharCode));
    }

    yield str.join('');
  }
}

let gen = randPass(16)
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);







