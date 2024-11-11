<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl mb-4 font-semibold text-gray-800">Orders List</h2>

    <!-- Filters Section -->
    <div class="mb-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input v-model="filters.fullname" placeholder="Filter by fullname" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input v-model="filters.product" placeholder="Filter by product" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input v-model="filters.amount" placeholder="Filter by amount" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input v-model="filters.order_number" placeholder="Filter by order number" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <button @click="fetchOrders" class="mt-4 px-6 py-2 flex float-right bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Apply Filters</button>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center mt-4">
      <span>Loading...</span>
    </div>

    <!-- Orders Table Card -->
    <div v-if="!loading" class="bg-white p-6 shadow-lg rounded-lg mt-6">
      <div class="overflow-x-auto">
        <table class="table-auto w-full text-gray-800">
          <thead class="border-b">
            <tr>
              <th class="px-4 py-2 text-left font-semibold">ORDER ID</th>
              <th class="px-4 py-2 text-left font-semibold">ORDER #</th>
              <th class="px-4 py-2 text-left font-semibold">USERNAME</th>
              <th class="px-4 py-2 text-left font-semibold">PRODUCT</th>
              <th class="px-4 py-2 text-left font-semibold">QUANTITY</th>
              <th class="px-4 py-2 text-left font-semibold">AMOUNT</th>
              <th class="px-4 py-2 text-left font-semibold">DATE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id" class="border-b">
              <td class="px-4 py-2">{{ order.id }}</td>
              <td class="px-4 py-2">{{ order.order_number }}</td>
              <td class="px-4 py-2">{{ order.user.fullname }}</td>
              <td class="px-4 py-2">{{ order.product.name }}</td>
              <td class="px-4 py-2">{{ order.quantity }}</td>
              <td class="px-4 py-2">{{ order.amount }}</td>
              <td class="px-4 py-2">{{ new Date(order.created_at).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  data() {
    return {
      orders: [],  
      filters: {
        fullname: '',
        product: '',
        amount: '',
        order_number: ''
      },
      loading: false, 
    }
  },
  methods: {
    async fetchOrders() {
      this.loading = true; 
      try {
        const response = await api.getOrders(this.filters); 
        this.orders = response.data; 
      } catch (error) {
        console.error('Failed to fetch orders', error); 
      } finally {
        this.loading = false; 
      }
    }
  },
  mounted() {
    this.fetchOrders(); 
  }
}
</script>

