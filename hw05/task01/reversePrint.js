/*1**. 
Напишите код функции reversePrint(), которая выведет значения переданного ей 
односвязного списка в обратном порядке (4, 3, 2, 1). 
Для вывода значений используйте функцию console.log().
	
function reversePrint(linkedList) {
    // ...
}

var someList = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

reversePrint(someList);

Напишите код функции reversePrint(), которая выведет значения переданного ей 
односвязного списка в обратном порядке (4, 3, 2, 1). 
Для вывода значений используйте функцию console.log().*/


var someList = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

function reversePrint (obj) {
    var arr = [];
    while(true) {
        arr.push(obj.value);
        if (obj.next === null)
            break;
        obj = obj.next;
    }
    console.log(arr.reverse().join(', '));
}

reversePrint(someList);