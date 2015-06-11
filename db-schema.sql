DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
  "id" SERIAL,
  "text" varchar(1000) NOT NULL,
  "timestamp" bigint NOT NULL,
  "forum" varchar(50) NOT NULL,
  "userName" int NOT NULL,
  "parent" int DEFAULT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts (
  "id" SERIAL,
  "title" varchar(150) NOT NULL,
  "text" varchar(1000) NOT NULL,
  "url" varchar(250) NOT NULL,
  "timestamp" bigint NOT NULL,
  "forum" varchar(50) NOT NULL,
  "userName" int DEFAULT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  "id" SERIAL,
  "userName" varchar(24) NOT NULL,
  "balance" bigint DEFAULT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS Votes;
CREATE TABLE Votes (
  "id" SERIAL,
  "user_id" int NOT NULL,
  "post_id" int NOT NULL,
  PRIMARY KEY ("id")
);