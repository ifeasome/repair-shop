DROP DATABASE IF EXISTS repair_db;

CREATE DATABASE repair_db;

\c repair_db;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  street VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state CHAR(2) NOT NULL,
  postal_code INTEGER NOT NULL
);

CREATE TABLE shipments (
  id SERIAL PRIMARY KEY,
  tracking_number VARCHAR(50),
  expected_arrival TIMESTAMP NOT NULL,
  address_id INTEGER REFERENCES addresses(id) ON DELETE SET NULL
);

CREATE TABLE shipping_updates (
  id SERIAL PRIMARY KEY,
  updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
  status VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  shipment_id INTEGER REFERENCES shipments(id) ON DELETE CASCADE
);

CREATE TABLE platforms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE models (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  screen_size NUMERIC(3,1) NOT NULL,
  platform_id INTEGER NOT NULL REFERENCES platforms(id) ON DELETE CASCADE
);

CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  condition SMALLINT NOT NULL CHECK (condition BETWEEN 1 AND 10),
  notes TEXT,
  date_received TIMESTAMP NOT NULL DEFAULT NOW(),
  model_id INTEGER NOT NULL REFERENCES models(id) ON DELETE CASCADE
);