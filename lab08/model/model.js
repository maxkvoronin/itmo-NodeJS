const mysql = require('mysql');
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'me',
	password : 'root',
	database : 'mysite'
});

connection.connect();

//через промис
module.exports = {
  getPassFromDB: (login) => {
    return new Promise ((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE login=?', [login] , (error, results, fields) => {
        if (results.length == 0) 
          resolve([undefined, undefined]);
        else  
          resolve([results[0].pass, results[0].id]);
        if (error)  
          reject(error);
      });    
    });
  },	
  //через промис, но обрабатываем его не через then, а через async/await
  changeProfile: (login, pass, id) => {
    return new Promise ((resolve, reject) => {    
      connection.query('UPDATE user SET login=?, pass=? WHERE id=?',[login, pass, id], (error, results, fields) => {
        if (error) 
          reject(error);
        else 
          resolve(login, pass, id);
      });    
    });
  }
};