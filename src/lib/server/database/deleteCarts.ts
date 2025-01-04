import type { ProductCart } from '$types';
import { pool } from './connection';

export const deleteCarts = async (user_id: string, id: string) => {
    try{
        const result = await pool.query(`
            DELETE FROM carts
            WHERE user_id = $1 AND id = $2
            RETURNING *
        `, [user_id, id]);
        console.log('Deleting cart item, result.rows :', result.rows);
        return result.rows[0] as ProductCart;
    } catch (error) {
        console.error('Error deleting cart :', error);
        return null;
    };
};