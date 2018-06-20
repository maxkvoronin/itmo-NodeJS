/*
 * Парсит главную страницу сайта http://agstuning.ru
 * Сохраняет картинки витрины в папку img
 * Формирует прайс-лист price.json;
*/

const http = require('http');
const cheerio = require('cheerio');
const fs = require('fs');

const uploadDir = "img/";
const site 			= "http://agstuning.ru";
const priceName = "price.json";

let req = http.get(site, (res) => {
	console.log(`Cтатус: ${res.statusCode}`);

	let data = new String();
	
	res.on('data', (chunk) => {
	 	data += chunk;
	});
	
	res.on('end', () => {
		let $ = cheerio.load(data);
		
		let img_links = $('.product__item .product__item__img').map((index, el) => {
			return site + $(el).attr('src');
		}).toArray();

		let title_names = $('.product__item .product__item__title__link').map((index, el) => {
			return $(el).text().trim();
		}).toArray();

		let prices = $('.product__item .product__item__price').map((index, el) => {
			return $(el).text().trim();
		}).toArray();

		let ids = $('.product__item .product__item__article').map((index, el) => {
			return $(el).text().trim().slice(9);
		}).toArray();

		let base = Array();

		img_links.forEach( (fileName, i) => {
			let file = fs.createWriteStream(`${uploadDir}${title_names[i]}.jpg`);
			http.get(fileName, res => {
		 		console.log(`>${title_names[i]}: OK`);
			res.pipe(file);
			});

			base.push({id: ids[i], title: title_names[i], price: prices[i]});
		})
		
		let json = JSON.stringify(base, null, '  ');

		fs.writeFile(priceName, json, 'utf8', err => {
				if (err) return console.log('Ошибка записи прайса');
				else {
					console.log(`Прайс: ${priceName} сформирован`);
					req.destroy();
				} 
		});
	});	
})