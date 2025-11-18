DROP SCHEMA IF EXISTS ccca CASCADE;
CREATE SCHEMA ccca;

CREATE TABLE ccca.account (
    account_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    document TEXT NOT NULL,
    password TEXT NOT NULL
);


CREATE TABLE ccca.account_asset (
    account_id UUID,
    asset_id TEXT,
    quantity NUMERIC,
    PRIMARY KEY (account_id, asset_id)
)