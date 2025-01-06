import type { ProductCart } from '$types';
import { pool } from './connection';

export const updateProducts = async (id: string, name: string, price: number, imageurl: string) => {
    try {
        const result = await pool.query(`
            UPDATE products
            SET name = $1, price = $2, imageurl = $3
            WHERE id = $4
            RETURNING *
        `, [name, price, imageurl, id]);
        console.log('Updating product item, result.rows :', result.rows);
        return result.rows[0] as ProductCart;
    } catch (error) {
        console.error('Error updating product :', error);
        return null;
    }
};
