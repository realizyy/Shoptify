import type { ProductCart } from '$types';
import { pool } from './connection';

export const getCarts = async (): Promise<ProductCart[] | null> => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching carts :', error);
        return null;
    }
};