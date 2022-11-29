-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lecture_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT likes_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures(id),
    CONSTRAINT likes_user_id_lecture_id_unq UNIQUE (user_id, lecture_id)
);

-- migrate:down
DROP TABLE likes;

