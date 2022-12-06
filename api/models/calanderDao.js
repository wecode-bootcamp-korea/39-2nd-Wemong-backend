const { appDataSource } = require('./data_source');

const getLectureTimeByLectureId = async( lectureId )=> {
	const lectureTimeOption = await appDataSource.query(
		`
		SELECT
		l.id lectureId,
		l.title lectureTitle,
		l.content lectureText,
		ROUND(l.price, 0) AS price,
		(SELECT
		JSON_ARRAYAGG(
		JSON_OBJECT(
		"lectureTimeOptionId",lto.id,
		"isReserved", lto.is_reserved,
		"lectureDate", DATE_FORMAT(
			lecture_time, '%Y, %m, %e')
		))
		FROM lecture_time_options lto
		WHERE lto.lecture_id = l.id
		GROUP BY lecture_id
		) AS lectureDate,
		(SELECT 
			li.image_url
		FROM lecture_images li
		WHERE li.lecture_id = l.id
		) AS images,
		(SELECT
			u.name
		FROM users u
		WHERE u.id = l.id
		) AS lecturerName
	FROM lectures l
	WHERE l.id = ?
		`,[lectureId]
	)
	return lectureTimeOption
};

module.exports = { getLectureTimeByLectureId}