import type { Product } from '$types';
import { pool } from './connection';

export const getProducts = async (): Promise<Product[] | null> => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching products', error);
        return null;
    }
};
