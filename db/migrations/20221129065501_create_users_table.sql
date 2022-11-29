-- migrate:up
CREATE TABLE genders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT genders_name_ukey UNIQUE (name)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    kakao_id BIGINT DEFAULT NULL,
    password VARCHAR(100) NOT NULL,
    point DECIMAL(9,2) NOT NULL DEFAULT 1000000,
    gender_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT users_gender_id_fkey FOREIGN KEY (gender_id) REFERENCES genders(id),
    CONSTRAINT users_email_ukey UNIQUE (email),
    CONSTRAINT users_kakao_id_ukey UNIQUE (kakao_id)
);

-- migrate:down
DROP TABLE users;
DROP TABLE genders;

