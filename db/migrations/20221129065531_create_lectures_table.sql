-- migrate:up
CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT categories_name_ukey UNIQUE (name)
);

CREATE TABLE sub_categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    CONSTRAINT sub_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT sub_categories_name_ukey UNIQUE (name)
);

CREATE TABLE lectures (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT DEFAULT NULL,
    price DECIMAL(9,2) NOT NULL DEFAULT 10000,
    sub_category_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT lectures_sub_category_id_fkey FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id),
    CONSTRAINT lectures_title_user_id_unq UNIQUE (title,user_id)
);

CREATE TABLE lecture_time_options (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    lecture_id INT NOT NULL,
    lecture_time DATETIME NOT NULL,
    is_reserved BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT lecture_time_options_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures(id),
    CONSTRAINT lecture_time_options_lecture_id_lecture_time_unq UNIQUE (lecture_id, lecture_time)
);

CREATE TABLE lecture_images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(1000) NOT NULL,
    lecture_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT lecture_images_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures(id)
);


-- migrate:down
DROP TABLE lecture_images;
DROP TABLE lecture_time_options;
DROP TABLE lectures;
DROP TABLE sub_categories;
DROP TABLE categories;

