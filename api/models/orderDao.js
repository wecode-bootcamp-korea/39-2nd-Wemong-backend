const { appDataSource } = require('./data_source');

const orderItemsTransaction = async (userId, ltoId) => {
    return await appDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.query(
            `INSERT INTO 
            reservations(
                user_id,
                lecture_time_option_id,
                reservation_status_id
            ) VALUES (?,?,1);
            `,
            [userId, ltoId]
        );

        await transactionalEntityManager.query(
            `
            UPDATE lecture_time_options
            SET is_reserved = 1
            WHERE id =?    
            `,
            [ltoId]
        );
    });
};

module.exports = { orderItemsTransaction };
