const buildWhereClause = (params, builderSet) => {
    const wherePhrase = Object.entries(params)
        .filter(([key, value]) => value !== undefined && key in builderSet)
        .map(([key, value]) => {
            return builderSet[key](value);
        });

    if (wherePhrase.length !== 0) {
        return `WHERE ${wherePhrase.join(' AND ')}`;
    } else {
        return ' ';
    }
};

module.exports = { buildWhereClause };
