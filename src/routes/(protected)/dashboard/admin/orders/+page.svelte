<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    console.log(data);
</script>

<div class="container mx-auto">
    <h1 class="text-2xl font-semibold mb-4">Orders</h1>
    <div class="bg-white shadow-md rounded my-6">
        <table class="w-full table-auto">
            <thead>
            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th class="py-3 px-6 text-left">ID</th>
                <th class="py-3 px-6 text-left">Product</th>
                <th class="py-3 px-6 text-left">Customer</th>
                <th class="py-3 px-6 text-center">Total</th>
                <th class="py-3 px-6 text-center">Status</th>
                <th class="py-3 px-6 text-center">Payment</th>
                <th class="py-3 px-6 text-center">Payment Status</th>
                <th class="py-3 px-6 text-center">Date</th>
                <th class="py-3 px-6 text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            {#each data.orders as order}
                <tr class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="py-3 px-6 text-left whitespace-nowrap">
                        {order.id}
                    </td>
                    <td class="py-3 px-6 text-left whitespace-nowrap truncate">
                        {#each order.orders as product}
                            <p>{product.name} @ {product.quantity}</p>
                        {/each}
                    </td>
                    <td class="py-3 px-6 text-left">
                        {order.user_id}
                    </td>
                    <td class="py-3 px-6 text-center">
                        Rp {Intl.NumberFormat('id-ID').format(order.total)}
                    </td>
                    <td class="py-3 px-6 text-center">
                        {order.status}
                    </td>
                    <td class="py-3 px-6 text-center">
                        {order.payment_method}
                    </td>
                    <td class="py-3 px-6 text-center">
                        {order.payment_status}
                    </td>
                    <td class="py-3 px-6 text-center">
                        {new Date(order.order_date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                    <td class="py-3 px-6 text-center">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>