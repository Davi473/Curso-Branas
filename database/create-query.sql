DROP SCHEMA IF EXISTS ccca CASCADE;

CREATE SCHEMA ccca;

CREATE TABLE ccca.depth (
    market_id TEXT PRIMARY KEY,
    data jsonb
)