const { appDataSource } = require('./data_source');
const { buildGetLecturesQuery } = require('./lectureQueryBuilder');

const getLectureByLectureId = async (lectureId) => {
    const detail = await appDataSource.query(
        `
		SELECT
	l.id,
	l.title AS lectureTitle,
	l.content AS lectureText,
	ROUND(l.price, 0) AS price,
	cate.id AS mainCategory,
	subcate.id AS subcategory,
		(SELECT 
			li.image_url
		FROM lecture_images li
		WHERE li.lecture_id = l.id
		) AS images,
		(SELECT
			u.name
		FROM users u
		WHERE u.id = l.id
		) AS lecturerName,
		(SELECT
			JSON_ARRAYAGG(
				JSON_OBJECT(
					"reviewTitle",r.title,
					"reviewText",r.text,                      
					"rating",r.rating,
					"reviewUser",u.name
					)
				) as reviews
		FROM reviews r
		JOIN lectures l ON l.id = r.lecture_id
		JOIN users u ON u.id = r.user_id
		WHERE 
		r.lecture_id = l.id AND l.id = ?
		GROUP BY 
		r.lecture_id) as review
		FROM
			lectures l
		LEFT JOIN lecture_images li ON l.id = li.lecture_id
		INNER JOIN sub_categories subcate ON l.sub_category_id =subCate.id 
		INNER JOIN categories AS cate ON subcate.category_id=cate.id
		WHERE l.id = ?
        `,
        [lectureId,lectureId]
    );
    return detail;
};

const getLectures = async (params) => {
    return await appDataSource.query(buildGetLecturesQuery(params));
};

module.exports = { getLectures, getLectureByLectureId };
