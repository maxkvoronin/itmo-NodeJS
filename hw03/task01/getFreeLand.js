/**
 * 1*. Напишите функцию getFreeLand, которая принимает 
два аргумента, оба из которых массивы:
- первый массив: площадь садового участка в сотках и соотношение сторон
- второй массив: ширину и длину одной грядки в метрах.
Функция разбивает грядки на участке и возвращает количество 
незанятого места в квадратных метрах.
1 сотка - это квадрат земли площадью 100м2.
В случаи ошибок нужно выбросить исключение типа Error с сообщеним:
"Не задана площадь участка"
"Не задана площадь грядки"
"Размер грядки больше размера участка"
Тестовый набор данных №1
[100, '1:1']
[15, 25]
Выходные данные
250
Тестовый набор данных №2
Входные данные
[0, '1:1']
[15, 25]
Выходные данные
Error:Не задана площадь участка
Тестовый набор данных №3
Входные данные
[100, '1:1']
[5, 0]
Выходные данные
Error:Не задана площадь грядки
Тестовый набор данных №4
Входные данные
[6, '3:2']
[40, 28]
Выходные данные
Error:Размер грядки больше размера участка
 */
module.exports = ([gardenArea, gardenRatio], [bedHeigth, bedWidth]) => {

  gardenRatio = gardenRatio.split(':');

  if (gardenArea === undefined || gardenArea <= 0 || gardenRatio === undefined)
    throw new Error ('Не задана площадь участка');
  if (bedHeigth <=0 || bedWidth<=0)  
    throw new Error ('Не задана площадь грядки');
  
  gardenArea *= 100;

  let x = Math.sqrt( gardenArea/( gardenRatio[0] * gardenRatio[1] ) );
  let gardenHeight = x * gardenRatio[0];
  let gardenWidth = x * gardenRatio[1];

  if ((gardenHeight < bedHeigth || gardenWidth < bedWidth) &&
       gardenHeight < bedWidth || gardenWidth < bedHeigth)
      throw new Error ('Размер грядки больше размера участка');

  return gardenArea % (bedHeigth * bedWidth);
}