declare module 'midtrans-client' {
    class Snap {
        constructor(config: { isProduction: boolean; serverKey: string; clientKey: string });
        createTransaction(parameter: {
            transaction_details: { order_id: string; gross_amount: number };
            customer_details: { first_name: string; last_name: string; email: string; phone: string };
        }): Promise<{ token: string }>;
    }
}
