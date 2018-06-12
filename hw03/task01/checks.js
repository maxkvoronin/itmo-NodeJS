const assert = require('assert');

let getFreeLand = require('./getFreeLand.js');

assert.equal(getFreeLand([100, '1:1'], [15, 25]), 250, "Тестовый набор данных №1");
assert.throws(function(){getFreeLand([0, '1:1'], [5, 0])}, /Не задана площадь участка/, "Тестовый набор данных №2");
assert.throws(function(){getFreeLand([100, '1:1'], [5, 0])}, /Не задана площадь грядки/, "Тестовый набор данных №3");
assert.throws(function(){getFreeLand([6, '3:2'], [40, 28])}, /Размер грядки больше размера участка/, "Тестовый набор данных №4");

console.log('ok');