const { appDataSource } = require('./data_source');

const getLectureTimeOptionsByLectureId = async (lectureId) => {
    const data = await appDataSource.query(
        `SELECT
            l.id lectuerId,
            l.title lectureTitle,
            u.name lecturerName,
            l.price price,
            JSON_ARRAYAGG(li.image_url) images,
            (SELECT
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "lectureTimeId",id,
                        "isReserved",is_reserved,
                        "lectureTime",DATE_FORMAT(lecture_time, '%y%m%d')
                    )
                )
            FROM lecture_time_options
            WHERE lecture_id = l.id
            GROUP BY lecture_id
            ) timeOptions
        FROM lectures l
        LEFT JOIN users u ON l.user_id = u.id
        LEFT JOIN lecture_images li ON li.lecture_id = l.id
        WHERE l.id = ?
        GROUP BY l.id
        `,
        [lectureId]
    );
    return data[0];
};

module.exports = { getLectureTimeOptionsByLectureId };
