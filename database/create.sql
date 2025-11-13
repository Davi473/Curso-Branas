DROP SCHEMA IF EXISTS ccca CASCADE;
CREATE SCHEMA ccca;

CREATE TABLE ccca.account (
    account_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    document TEXT NOT NULL,
    password TEXT NOT NULL
);
