const { buildWhereClause } = require('../utils/queryBuilder');

const minPriceFilterBuilder = (minPrice) => {
    return minPrice && `l.price >= ${minPrice}`;
};

const maxPriceFilterBuilder = (maxPrice) => {
    return maxPrice === undefined ? maxPrice : `l.price <= ${maxPrice}`;
};

const dateFilterBuilder = (date) => {
    return date && `lto.lecture_time = ${date}`;
};

const categoryFilterBuilder = (category) => {
    return category && `c.id = ${category}`;
};

const subCategoryFilterBuilder = (subCategory) => {
    return subCategory && `sc.id = ${subCategory}`;
};

const builderSet = Object.freeze({
    minPrice: minPriceFilterBuilder,
    maxPrice: maxPriceFilterBuilder,
    date: dateFilterBuilder,
    category: categoryFilterBuilder,
    subCategory: subCategoryFilterBuilder,
});

const buildLimitClause = (limit = 100, offset = 0) => {
    return `LIMIT ${limit} OFFSET ${offset}`;
};

const buildGetLecturesQuery = (params) => {
    const query = `SELECT
                    l.id lectureId,
                    l.title lectureTitle,
                    u.name lecturerName,
                    c.id categoryId,
                    sc.id subCategoryId,
                    ROUND(l.price,0) price,
                    (SELECT
                        JSON_ARRAYAGG(li.image_url)
                    FROM lecture_images li
                    WHERE li.lecture_id = l.id
                    GROUP BY li.lecture_id
                    ) images
                FROM lectures l
                LEFT JOIN 
                    lecture_time_options lto ON lto.lecture_id = l.id
                JOIN 
                    sub_categories sc ON sc.id = l.sub_category_id
                JOIN
                    categories c ON c.id = sc.category_id
                JOIN 
                    users u ON u.id = l.user_id
                ${buildWhereClause(params, builderSet)}
                GROUP BY l.id
                ORDER BY l.price DESC     
                ${buildLimitClause(params?.limit, params?.offset)} 
                `;
    return query;
};

module.exports = { buildGetLecturesQuery };
