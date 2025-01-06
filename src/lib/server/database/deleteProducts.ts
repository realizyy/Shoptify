import type { ProductCart } from '$types';
import { pool } from './connection';

export const deleteProducts = async (id: string) => {
    try {
        const result = await pool.query(`
            DELETE FROM products
            WHERE id = $1
            RETURNING *
        `, [id]);
        console.log('Deleting product item, result.rows :', result.rows);
        return result.rows[0] as ProductCart;
    } catch (error) {
        console.error('Error deleting product :', error);
        return null;
    }
}
