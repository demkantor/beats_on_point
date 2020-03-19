--create database
CREATE DATABASE beats_on_point;

--create tables
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
  "zip_code" varchar,
  "band" boolean DEFAULT false,
  "venue" boolean DEFAULT false
);

CREATE TABLE "venues" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(120),
  "user_name_id" int,
  "address" varchar(120),
  "description" varchar,
  "image" bytea,
  "twiter" varchar,
  "facebook" varchar,
  "www" varchar,
  "youtube" varchar
);

CREATE TABLE "bands" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "user_name_id" int,
  "description" varchar,
  "image" bytea,
  "twiter" varchar,
  "facebook" varchar,
  "www" varchar,
  "youtube" varchar,
  "genres_id" int 
);

CREATE TABLE "calendar" (
  "id" SERIAL PRIMARY KEY,
  "bands_id" int,
  "venues_id" int,
  "date" date,
  "cost" int
);

CREATE TABLE "genres" (
  "id" SERIAL PRIMARY KEY,
  "genre" varchar(50)
);

--create foreign keys
ALTER TABLE "venues" ADD FOREIGN KEY ("user_name_id") REFERENCES "users" ("id");
ALTER TABLE "bands" ADD FOREIGN KEY ("user_name_id") REFERENCES "users" ("id");
ALTER TABLE "bands" ADD FOREIGN KEY ("genres_id") REFERENCES "genres" ("id");
ALTER TABLE "calendar" ADD FOREIGN KEY ("bands_id") REFERENCES "bands" ("id");
ALTER TABLE "calendar" ADD FOREIGN KEY ("venues_id") REFERENCES "venues" ("id");