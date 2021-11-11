CREATE TABLE users(
    id int PRIMARY KEY,
    login varchar(255),
    password varchar(255),
    age smallint,
    is_deleted boolean
);

INSERT INTO users(id, login, password, age, is_deleted) 
VALUES(1, 'abraham', '34g34hh', 41, false);

INSERT INTO users(id, login, password, age, is_deleted) 
VALUES(2, 'boris', 'g34gdsgw', 35, true);

INSERT INTO users(id, login, password, age, is_deleted) 
VALUES(3, 'clair', 'g34g34d4', 44, false);

