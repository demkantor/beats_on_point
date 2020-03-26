--create database
CREATE DATABASE beats_on_point;

--create tables
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "zip_code" varchar,
  "band" boolean DEFAULT false,
  "venue" boolean DEFAULT false,
  "photo" bytea
);

CREATE TABLE "venues" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(120) DEFAULT 'add venue name',
  "user_name_id" int,
  "address" varchar(120) DEFAULT 'add address',
  "phone" varchar(30) DEFAULT 'add phone number',
  "description" varchar DEFAULT 'add bio',
  "twitter" varchar DEFAULT 'add twitter link',
  "facebook" varchar DEFAULT 'add facebook link',
  "www" varchar DEFAULT 'add website link',
  "youtube" varchar DEFAULT 'add youtube link',
  "venue_photo" bytea
);

CREATE TABLE "bands" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) DEFAULT 'add band name',
  "user_name_id" int,
  "description" varchar DEFAULT 'add bio',
  "twitter" varchar DEFAULT 'add twitter link',
  "facebook" varchar DEFAULT 'add facebook link',
  "www" varchar DEFAULT 'add website link',
  "youtube" varchar DEFAULT 'add youtube link',
  "band_photo" bytea
);

CREATE TABLE "calendar" (
  "id" SERIAL PRIMARY KEY,
  "bands_id" int,
  "venues_id" int,
  "date" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
  "cost" int
);

CREATE TABLE "genres" (
  "id" SERIAL PRIMARY KEY,
  "genre" varchar(50)
);

-- CREATE JUNCTION TABLE
CREATE TABLE "bands_genres" (
  "id" SERIAL PRIMARY KEY,
  "bands_id" int NOT NULL REFERENCES "bands",
  "genres_id" int NOT NULL REFERENCES "genres"
);

--create foreign keys
ALTER TABLE "venues" ADD FOREIGN KEY ("user_name_id") REFERENCES "user" ("id");
ALTER TABLE "bands" ADD FOREIGN KEY ("user_name_id") REFERENCES "user" ("id");
ALTER TABLE "bands_genres" ADD FOREIGN KEY ("bands_id") REFERENCES "bands" ("id");
ALTER TABLE "bands_genres" ADD FOREIGN KEY ("genres_id") REFERENCES "genres" ("id");
ALTER TABLE "calendar" ADD FOREIGN KEY ("bands_id") REFERENCES "bands" ("id");
ALTER TABLE "calendar" ADD FOREIGN KEY ("venues_id") REFERENCES "venues" ("id");

--enter some started data
INSERT INTO "genres" ("genre")
VALUES ('Rock'), ('Pop'), ('Hip-Hop'), ('Alternative'), ('Indie'), ('Jazz'),
('Electronic'), ('Folk'), ('Latin'), ('R&B / Soul'), ('Reggae'),('Blues'),
('Metal'), ('Punk'), ('Grunge'), ('Classical'), ('Country');

