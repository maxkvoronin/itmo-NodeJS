/*3*. Работа с файлами. Файл "data.txt" заполнен случайными целыми числами, 
числа разделены одним пробелом.
Сформировать файл "out-1.txt" из элементов файла "data.txt", делящихся 
без остатка на 2. Сформировать файл "out-2.txt" из элементов файла "data.txt", 
возведенных в степень 3. Тестовый набор данных для тестирования можно 
скачать отсюда: https://yadi.sk/d/s7Gz7ypi3XCBXP 
Для записи текстовых файлов воспользуйтесь функцией 
writeFile описанной в документации: 
https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback
или в русской версии: 
https://js-node.ru/site/article?id=23#fs_fs_writefile_file_data_options_callback
*/

const fs = require('fs');
const util = require('util');

let files = {
  input:     'data/data.txt',
  outputMod: 'data/out-1.txt',
  outputPow: 'data/out-2.txt'
};

let readFile = util.promisify(fs.readFile);

async function getData() {
  return await readFile(files.input);
}

getData().then(data => {
  let dataMod = '', dataPow = '';

  data.toString().split(' ').forEach(elem => {
    if(parseInt(elem) %2 === 0) {
      dataMod += `${elem} `;
    }
    dataPow += `${Math.pow(parseInt(elem), 3)} `;
  });

  fs.writeFile(files.outputMod, dataMod, err => {
    if (err) return console.log(err);
  });

  fs.writeFile(files.outputPow, dataPow, err => {
    if (err) return console.log(err);
  });
});