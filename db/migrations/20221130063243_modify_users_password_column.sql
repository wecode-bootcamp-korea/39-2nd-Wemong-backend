-- migrate:up
ALTER TABLE users MODIFY password VARCHAR(100) NULL;

