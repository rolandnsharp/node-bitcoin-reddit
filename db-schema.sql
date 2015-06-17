DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
  "id" SERIAL,
  "text" varchar(1000) NOT NULL,
  "timestamp" bigint NOT NULL,
  "forum" varchar(50) NOT NULL,
  "username" varchar(24) NOT NULL,
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
  "username" varchar(24) NOT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  "id" SERIAL,
  "username" varchar(24) NOT NULL,
  "email" varchar(24) NOT NULL,
  "password_hash" varchar(44) NOT NULL,
  "salt" varchar(24) NOT NULL,
  "key" varchar(64) NOT NULL,
  "address" varchar(35) NOT NULL,
  "balance" bigint DEFAULT NULL,
  "joined" bigint NOT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS Votes;
CREATE TABLE Votes (
  "id" SERIAL,
  "user_id" int NOT NULL,
  "post_id" int NOT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS Payment;
CREATE TABLE Payment (
  "id" SERIAL,
  "amount" bigint DEFAULT NULL,
  "transaction_hash" varchar(64) NOT NULL,
  "username" varchar(24),
  "kind" varchar(24),
  "timestamp" bigint NOT NULL,
  PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS Wallet;
CREATE TABLE Wallet (
  "id" SERIAL,
  "key" varchar(64) NOT NULL,
  "address" varchar(35) NOT NULL,
  "balance" bigint DEFAULT NULL,  
  "username" varchar(24),
  PRIMARY KEY ("id")
);



