import type { ProductCart } from '$types';
import { pool } from './connection';

export const addCart = async (user_id: string, product_id: string) => {
    try {
        const result = await pool.query(`
            INSERT INTO carts (user_id, product_id, quantity)
            VALUES ($1, $2, 1)
            RETURNING *
        `, [user_id, product_id]);
        console.log('result.rows :', result.rows);
        return result.rows[0] as ProductCart;
    } catch (error) {
        console.error('Error adding cart :', error);
        return null;
    }
};