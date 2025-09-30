CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userEmail" varchar(255) NOT NULL,
	"userName" varchar(255),
	"userPassword" varchar(255) NOT NULL,
	"otp" integer,
	CONSTRAINT "users_userEmail_unique" UNIQUE("userEmail")
);
