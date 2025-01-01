import type { ProductCart } from '$types';
import { pool } from './connection';

export const getCarts = async (): Promise<ProductCart[] | null> => {
    try {
        const result = await pool.query(`
            SELECT 
                carts.id, 
                carts.user_id, 
                carts.product_id, 
                carts.quantity, 
                products.name AS product_name, 
                products.price AS product_price, 
                products.imageUrl AS product_imageUrl
            FROM carts
            JOIN products ON carts.product_id = products.id
            ORDER BY carts.id ASC
        `);
        // console.log('result.rows :', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error fetching carts :', error);
        return null;
    }
};