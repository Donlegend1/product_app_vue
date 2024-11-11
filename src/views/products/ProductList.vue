<template>
  <div class="container mx-auto px-8 sm:px-12 lg:px-16">
    <Breadcrumb :breadcrumbs="breadcrumbs" />

    <h2 class="text-2xl font-bold mb-6 text-center uppercase mt-5">Products</h2>

    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center">
      <svg class="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <p class="mt-2">Loading products...</p>
    </div>

    <!-- No Products Message -->
    <div v-else-if="products.length === 0" class="text-center text-gray-500">
      <p>No products available.</p>
    </div>

    <!-- Product List -->
    <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <li
        v-for="product in products"
        :key="product.id"
        class="bg-white border rounded-lg shadow-md p-6 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
        @click="openProductModal(product)"
      >
        <div class="flex flex-col items-center">
          <img
            v-if="product.product_img_url"
            :src="'http://127.0.0.1:8000/' + product.product_img_url"
            alt="Product Image"
            class="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 class="text-xl font-semibold text-center">{{ product.name }}</h3>
          <p class="text-gray-600 text-center">{{ product.description }}</p>
          <small class="bg-blue-500 rounded-2xl text-white mx-4 px-2">click to order</small>
        </div>
        <div class="mt-4 text-center">
          <p class="font-bold text-lg">{{ product.price }}</p>
        </div>
      </li>
    </ul>

    <!-- Product Modal -->
    <div v-if="showModal" class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div class="bg-white p-8 rounded-lg w-11/12 sm:w-2/3 lg:w-1/3">
        <h3 class="text-2xl font-bold mb-4">{{ selectedProduct.name }}</h3>
        <p class="mb-4">{{ selectedProduct.description }}</p>
        <p class="font-semibold">Price: {{ selectedProduct.price }}</p>

        <!-- Product Image in Modal -->
        <div class="my-4 flex justify-center">
          <img
            v-if="selectedProduct.product_img_url"
            :src="IMG_BASE_URL+ selectedProduct.product_img_url"
            alt="Product Image"
            class="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <!-- Order Product Button -->
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full hover:bg-blue-600 transition-colors flex items-center justify-center"
          @click="orderProduct"
          :disabled="buttonLoading"
        >
          <span v-if="buttonLoading" class="animate-spin h-5 w-5 border-t-2 border-white rounded-full mr-2"></span>
          {{ buttonLoading ? 'Ordering...' : 'Proceed' }}
        </button>
        <button
          class="mt-4 text-gray-500 hover:text-gray-700"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/BreadCrumbSection.vue"; 
import { IMG_BASE_URL } from "../../utils/constants";

export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      products: [],
      showModal: false,
       IMG_BASE_URL: IMG_BASE_URL,
      selectedProduct: null,
      loading: true,
      buttonLoading: false,
      breadcrumbs: [
        { label: "Home", path: "/" },
        { label: "Products", path: "/products" },
      ],
    };
  },
  async created() {
    try {
      const response = await api.getProducts();
      this.products = response.data;
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    // Open the product modal with selected product details
    openProductModal(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },

    // Close the modal
    closeModal() {
      this.showModal = false;
      this.selectedProduct = null;
    },

    // Order the product (You can add API call for ordering here)
    async orderProduct() {
      this.buttonLoading = true;
      try {
        const params = {
          product_id: this.selectedProduct.id,
          amount: this.selectedProduct.price, // Assuming amount is the product's price
          quantity: 1,
        };
        // Call your API to handle product ordering
        await api.orderProduct({ params });

        this.closeModal();
        Swal.fire({
          icon: "success",
          title: "Order Successful",
          text: "Your order has been placed successfully!",
        });
        this.$router.push("/order");
      } catch (error) {
        this.closeModal();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to place the order.",
        });
        console.error("Failed to order product", error);
      } finally {
        this.buttonLoading = false;
      }
    },
  },
};
</script>


