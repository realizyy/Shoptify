import type { Order, OrderItem } from "$types";
import { pool } from './connection';

export const addOrders = async (order: Order, orderItems: OrderItem[]) => {
    try {
        const result = await pool.query(`
            INSERT INTO orders (user_id, total, status, payment_method, payment_status, order_date)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [order.user_id, order.total, order.status, order.payment_method, order.payment_status, order.order_date]);
        console.log('Adding order, result.rows :', result.rows);
        const order_id = result.rows[0].id;
        const orderItemsResult = await Promise.all(orderItems.map(async (orderItem) => {
            const result = await pool.query(`
                INSERT INTO order_items (order_id, product_id, quantity, product_name, product_price, product_imageurl)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `, [order_id, orderItem.product_id, orderItem.quantity, orderItem.product_name, orderItem.product_price, orderItem.product_imageurl]);
            return result.rows[0];
        }));
        console.log('Adding order items, orderItemsResult :', orderItemsResult);
        return result.rows[0] as Order;
    } catch (error) {
        console.error('Error adding order :', error);
        return null;
    }
};