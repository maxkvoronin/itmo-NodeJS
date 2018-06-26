const mysql = require('mysql');
const crypto = require('crypto');

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'me',
	password : 'root',
	database : 'mysite'
});

connection.connect();

//через промис
module.exports = {
  getHashFromDB: (login) => {
    return new Promise ((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE login=?', [login] , (error, results, fields) => {
        if (results.length == 0) 
          resolve([undefined, undefined]);
        else  
          resolve([results[0].hash, results[0].id]);
        if (error)  
          reject(error);
      });    
    });
  },	
  //через промис, но обрабатываем его не через then, а через async/await
  changeProfile: (login, pass, id) => {
    return new Promise ((resolve, reject) => {
      let hash = crypto.createHash('md5').update(login).update(pass).digest('hex');

      connection.query('UPDATE user SET login=?, hash=? WHERE id=?',[login, hash, id], (error, results, fields) => {
        if (error) 
          reject(error);
        else 
          resolve(login, hash, id);
      });    
    });
  },
  checkHash: (hash) => {
    return new Promise ((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE hash=?', [hash] , (error, results, fields) => {
        if (results.length == 0) 
          resolve(false);
        else  
          resolve(true);
        if (error)  
          reject(error);
      });
    });
  }
};