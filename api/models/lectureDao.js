const { appDataSource } = require('./data_source');

const getLectureByLectureId  = async ( lectureId ) => {
    const detail = await appDataSource.query(
        `
		SELECT
			l.id,
			l.title AS lectureTitle,
			l.content AS lectureText,
		ROUND(l.price, 0) AS price,
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
			subcate.name
		FROM sub_categories subcate
		WHERE subcate.id = l.sub_category_id
		) AS subCategory
		FROM
			lectures l
		LEFT JOIN lecture_images li ON l.id = li.lecture_id
		LEFT JOIN sub_categories subCate ON l.sub_category_id =subCate.id 
		WHERE l.id =?
        `,[lectureId]
    );
    return detail
};

module.exports = { getLectureByLectureId };
