CREATE DATABASE imtixon;

CREATE TABLE users(
    id serial NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    surname VARCHAR(32) NOT NULL,
    password text NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT false,
    ball FLOAT NOT NULL DEFAULT 0,
    guruh INTEGER not NULL,
    file text
);

CREATE TABLE imtixon(
    id serial NOT NULL PRIMARY KEY,
    filename text NOT NULL,
    create_at text NOT NULL,
    guruh INTEGER NOT NULL,
    timeoff VARCHAR(16) NOT NULL
);
CREATE TABLE file(
    id serial NOT NULL PRIMARY KEY,
    filename text NOT NULL,
    create_at text NOT NULL
);