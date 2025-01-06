<script lang="ts">
    import type { PageData } from './$types';
    import { toast } from 'svelte-5-french-toast';
    export let data: PageData;
    import SidebarAdmin from '../../../../components/sidebarAdmin.svelte';

    type Product = {
        id: string;
        name: string;
        price: number;
        imageurl: string;
    };

    let showSidebar = false;
    let showAddModal = false;
    let showEditModal = false;
    let showDeleteModal = false;
    let selectedProduct: Product | null = null;

    function toggleSidebar() {
        showSidebar = !showSidebar;
    }

    function closeAddModal() {
        showAddModal = false;
    }


    function openAddModal() {
        selectedProduct = {
            id: '',
            name: '',
            price: 0,
            imageurl: ''
        };
        showAddModal = true;
    }

    function openEditModal(product: Product) {
        selectedProduct = product;
        showEditModal = true;
    }

    function closeEditModal() {
        showEditModal = false;
        selectedProduct = null;
    }

    function openDeleteModal(product: Product) {
        selectedProduct = product;
        showDeleteModal = true;
    }

    function closeDeleteModal() {
        showDeleteModal = false;
        selectedProduct = null;
    }

    function exportProduct() {
        toast("Export clicked");
    }

    async function addProduct() {
        try {
            const response = await fetch(`/api/product/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedProduct)
            });
            if (!response.ok) {
                toast.error("Failed : " + response.statusText + " - " + response.status);
            }
        } catch (error: any) {
            toast.error("Failed : " + error.message);
        }
        closeAddModal();
        toast.success("Product added successfully");
    }

    async function updateProduct() {
        try {
            const response = await fetch(`/api/product/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedProduct)
            });
            if (!response.ok) {
                toast.error("Failed : " + response.statusText + " - " + response.status);
            }
        } catch (error: any) {
            toast.error("Failed : " + error.message);
        }
        closeEditModal();
        toast.success("Product updated successfully");
    }

    async function deleteProduct() {
        try {
            const response = await fetch(`/api/product/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedProduct)
            });
            if (!response.ok) {
                toast.error("Failed : " + response.statusText + " - " + response.status);
            }
        } catch (error: any) {
            toast.error("Failed : " + error.message);
        }
        closeDeleteModal();
        toast.success("Product deleted successfully");
    }
</script>

<div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    {#if showSidebar}
        <SidebarAdmin />
    {/if}
    <div class="flex-1 transition-all duration-300 ease-in-out p-4">
        <button on:click={toggleSidebar} class="mb-4 bg-gray-800 text-white p-2 rounded-md">
            {#if showSidebar}☰ Show{/if}
            {#if !showSidebar}☰ Hide{/if}
        </button>
        <div class="container mx-auto">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-8 mx-4">
                <h2 class="text-3xl font-bold">Produk kamu</h2>
                <div class="flex space-x-2">
                    <button on:click={() => openAddModal()} class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
                    <button on:click={() => exportProduct()} class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Export</button>
                </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow">
                {#if data.product && data.product.length !== 0}
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {#each data.product as product}
                            <div class="border border-gray-200 rounded-lg p-4">
                                <img src=.{product.imageurl} alt={product.name}
                                     class="w-full h-48 object-cover rounded-lg mb-2"/>
                                <h3 class="font-semibold text-lg">{product.name}</h3>
                                <p class="text-gray-600">Rp {Intl.NumberFormat('id-ID').format(product.price)}</p>
                                <div class="mt-4 flex justify-end space-x-2">
                                    <button on:click={() => openEditModal(product)}
                                            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit
                                    </button>
                                    <button on:click={() => openDeleteModal(product)}
                                            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <p>No products available.</p>
                {/if}
            </div>
        </div>

        <!-- Modal edit product -->
        {#if showEditModal && selectedProduct}
            <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <input type="text" bind:value={selectedProduct.name} class="w-full p-2 mb-4 border rounded" placeholder="Product Name" />
                    <input type="text" bind:value={selectedProduct.price} class="w-full p-2 mb-4 border rounded" placeholder="Product Price" />
                    <input type="text" bind:value={selectedProduct.imageurl} class="w-full p-2 mb-4 border rounded" placeholder="Product Image URL" />
                    <div class="flex justify-end space-x-2">
                        <button on:click={closeEditModal}
                                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel
                        </button>
                        <button on:click={updateProduct}
                                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save
                        </button>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Modal delete product -->
        {#if showDeleteModal}
            <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <h2 class="text-2xl font-bold mb-4">Delete Product</h2>
                    <p>Are you sure you want to delete {selectedProduct?.name}?</p>
                    <div class="flex justify-end space-x-2 mt-4">
                        <button on:click={closeDeleteModal}
                                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel
                        </button>
                        <button on:click={deleteProduct}
                                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete
                        </button>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Modal add product -->
        {#if showAddModal && selectedProduct}
            <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <input type="text" bind:value={selectedProduct.name} class="w-full p-2 mb-4 border rounded" placeholder="Product Name" />
                    <input type="text" bind:value={selectedProduct.price} class="w-full p-2 mb-4 border rounded" placeholder="Product Price" />
                    <input type="text" bind:value={selectedProduct.imageurl} class="w-full p-2 mb-4 border rounded" placeholder="Product Image URL" />
                    <div class="flex justify-end space-x-2">
                        <button on:click={closeAddModal}
                                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel
                        </button>
                        <button on:click={addProduct}
                                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save
                        </button>
                    </div>
                </div>
            </div>
        {/if}

    </div>
</div>