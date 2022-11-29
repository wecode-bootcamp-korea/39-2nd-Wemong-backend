-- migrate:up
CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    text VARCHAR(500) DEFAULT NULL,
    rating DECIMAL(2,1) NOT NULL,
    user_id INT NOT NULL,
    lecture_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT reviews_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures(id)
);

-- migrate:down
DROP TABLE reviews;

