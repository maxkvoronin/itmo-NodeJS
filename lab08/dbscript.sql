CREATE DATABASE mysite CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON mysite.* TO 'admin'@'localhost';
USE mysite;

CREATE TABLE user
(
 id INT NOT NULL AUTO_INCREMENT,
 login varchar(30) default NULL,
 hash varchar(50) default NULL,
 PRIMARY KEY (id)
) ENGINE = InnoDB
 DEFAULT CHARACTER SET = utf8;
 
INSERT INTO user(login, hash) VALUES('admin','7488e331b8b64e5794da3fa4eb10ad5d');
INSERT INTO user(login, hash) VALUES('max1','b54abd4de4e21f5b0275e85d34a3b43d');
INSERT INTO user(login, hash) VALUES('natali','88c5e0aaa1a3e8146017d394252bec83');