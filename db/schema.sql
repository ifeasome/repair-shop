DROP DATABASE IF EXISTS user_db;

CREATE DATABASE user_db;

\c user_db;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);