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

function reversePrint_v1 (obj) {
    var arr = [];
    while(true) {
        arr.unshift(obj.value);
        if (obj.next === null)
            break;
        obj = obj.next;
    }
    console.log(arr);
}

function reversePrint_v2 (obj, arr) {
    if (arr === undefined)
        arr = [];
    arr.unshift(obj.value);
    if (obj.next !== null)
        return reversePrint_v2(obj.next, arr);
    else
        console.log(arr);
}

reversePrint_v1(someList);
reversePrint_v2(someList);
