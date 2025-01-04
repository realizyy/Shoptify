import type { ProductCart } from '$types';
import { pool } from './connection';

export const updateCarts = async (user_id: string, id: string, quantity: number) => {
    try{
        const result = await pool.query(`
            UPDATE carts
            SET quantity = $1
            WHERE user_id = $2 AND id = $3
            RETURNING *
        `, [quantity, user_id, id]);
        console.log('Updating cart item, result.rows :', result.rows);
        return result.rows[0] as ProductCart;
    } catch (error) {
        console.error('Error updating cart :', error);
        return null;
    }
};