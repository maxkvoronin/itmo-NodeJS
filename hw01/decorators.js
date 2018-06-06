/*
 * 1. Требуется реализовать декоратор с параметрами pause, 
 * который откладывает выполнение функции на указанное 
 * количество секунд. Пример использования:
 * function func() {
 *	 console.log('Функция выполниться с задержкой в 2 секунды!');
 * }
 * let paused = pause(func, 2);
 * paused();
 */

function func() {
	console.log(`Функция выполниться с задержкой в ${arguments[1]} секунды!`);
}
let paused = pause(func, 2);
paused();

function pause(func) {
    	return () => {
    		setTimeout(func, arguments[1]*1000, ...arguments); 
    	} 
}

/*
 * 2*. Требуется реализовать декоратор с параметрами returnObject, 
 * который в случае, если функция возвращает массив, подменяет 
 * его объектом. Имена задаются в параметрах декоратора. Декоратор 
 * универсальный, количество имен переменное.
 * Пример использования №1:
 * function func(){
 * 	return [1, 2]
 * }
 * let func_decoreted = return_object(func, 'one', 'two');
 * let r = func_decoreted();
 * console.log(r.one); // 1
 * console.log(r.two); //2
 * Пример использования №2:
 * function func(){
 * 	return ['Python', 'is', 'programming language']
 * }
 * r = return_object (func, 'a', 'b', 'c')();
 * console.log(r.c) // 'programming language'
 * */

function func1(){
	return [1, 2]
}
let func_decoreted = return_object(func1, 'one', 'two');

let r = func_decoreted();
console.log(r.one); // 1
console.log(r.two); //2

function return_object(func, ...args){
	return () => {
		let arr = func();   
			if (Array.isArray(arr)) {
				let obj = {};
				for(let i=0;i<=arr.length;i++) {
					obj[args[i]] = arr[i];
				}
			return obj;
		}
	return arr;
	}
}