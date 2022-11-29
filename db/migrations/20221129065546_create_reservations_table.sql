-- migrate:up
CREATE TABLE reservation_status (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT reservation_status_name_ukey UNIQUE (name)
);

CREATE TABLE reservations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    lecture_time_option_id INT NOT NULL,
    user_id INT NOT NULL,
    reservation_status_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT reservations_lecture_time_option_id_fkey FOREIGN KEY (lecture_time_option_id) REFERENCES lecture_time_options(id),
    CONSTRAINT reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT reservations_reservation_status_id_fkey FOREIGN KEY (reservation_status_id) REFERENCES reservation_status(id),
    CONSTRAINT reservations_lecture_time_user_reservation_status_unq UNIQUE (lecture_time_option_id, user_id, reservation_status_id)
);

-- migrate:down
DROP TABLE reservations;
DROP TABLE reservation_status;

