import type { ProductCart } from '$types';
import { pool } from './connection';

export const addProducts = async (name: string, price: number, imageurl: string) => {
    try {
        const result = await pool.query(`
            INSERT INTO products (name, price, imageurl)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [name, price, imageurl]);
        console.log('Adding product item, result.rows :', result.rows);
        return result.rows[0] as ProductCart;
    } catch (error) {
        console.error('Error adding product :', error);
        return null;
    }
}
