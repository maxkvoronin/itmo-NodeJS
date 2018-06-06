/**
 * 1. Требуется реализовать декоратор с параметрами pause, 
 * который откладывает выполнение функции на указанное 
 * количество секунд. Пример использования:
 * function func() {
 *       console.log('Функция выполниться с задержкой в 2 секунды!');
 * }
 *  pause(func, 2);
 *
*/

function func(...args) {
    console.log(`Функция выполниться с задержкой в ${args[1]} секунды!`);
}

function decorator(func){
    function wrapper(...args) {
        setTimeout(()=>{return func(...args)},args[1]*1000); 
    } 
    return wrapper;
}

var pause = decorator(func);
pause(func,2);

/*
 *  2*. Требуется реализовать декоратор с параметрами returnObject, 
 * который в случае, если функция возвращает массив, подменяет 
 * его объектом. Имена задаются в параметрах декоратора. Декоратор 
 * универсальный, количество имен переменное.
 * Пример использования №1:
 * function func(){
 *   return [1, 2]
 * }
 * r = return_object (func, 'one', 'two');
 * console.log(r.one); // 1
 * console.log(r.two); //2
 * Пример использования №2:
 *  function func(){
 *   return ['Python', 'is', 'programming language']
 * }
 * r = return_object (func, 'a', 'b', 'c');
 * console.log(r.c) // 'programming language'
 */

function func1(){
        return ['Python', 'is', 'programming language'];
}

var r = return_object (func1, 'a', 'b', 'c');
console.log(r.c); // 1

function return_object(func, ...args){
    function wrapper(args) {
        var temp = func(...args);   

        if (Array.isArray(temp)) {
            var obj = {};
            args.forEach((elem, i)=>{
                obj[elem] = temp[i];
            })
            return obj;
        }

        return temp;
    }
    return wrapper(args);
}



