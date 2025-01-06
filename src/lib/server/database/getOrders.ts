import type { Order } from "$types";
import { pool } from './connection';

export const getOrders = async (): Promise<Order[]> => {
    try {
        const ordersResult = await pool.query('SELECT * FROM orders ORDER BY id ASC');
        const orders = ordersResult.rows;

        for (const order of orders) {
            const productsResult = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
            order.orders = productsResult.rows;
        }

        return orders;
    } catch (error) {
        console.error('Error fetching orders', error);
        return [];
    }
};