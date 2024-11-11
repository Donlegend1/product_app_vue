<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Create Product</h2>
      
      <!-- Loading Spinner -->
      <div v-if="loading" class="flex justify-center items-center mb-4">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>

      <form @submit.prevent="createProduct">
        <!-- Product Name Field -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-600">Product Name:</label>
          <input
            type="text"
            v-model="name"
            id="name"
            
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
          <span v-if="errors.product_name" class="text-red-500 text-sm">{{ errors.product_name[0] }}</span>
        </div>

        <!-- Product Price Field -->
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-600">Price:</label>
          <input
            type="number"
            v-model="price"
            id="price"
           
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product price"
          />
          <span v-if="errors.product_price" class="text-red-500 text-sm">{{ errors.product_price[0] }}</span>
        </div>
        
        <!-- Product Description Field -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-600">Product Description:</label>
          <input
            type="text"
            v-model="description"
            id="description"
           
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
          />
          <span v-if="errors.product_description" class="text-red-500 text-sm">{{ errors.product_description[0] }}</span>
        </div>

        <!-- Clickable Image Card -->
        <div class="mb-6">
          <label for="image" class="block text-sm font-medium text-gray-600">Product Image:</label>
          <div 
            @click="triggerFileInput" 
            class="cursor-pointer border p-6 rounded-md border-dashed border-gray-300 text-center"
            :class="{'bg-gray-100': !image && !imagePreview, 'bg-gray-200': image || imagePreview}"
          >
            <p v-if="!image && !imagePreview" class="text-sm text-gray-500">Click to select an image</p>
            <div v-if="imagePreview" class="mt-2">
              <img :src="imagePreview" alt="Image Preview" class="max-w-full h-auto rounded-md"/>
            </div>
            <input 
              type="file" 
              ref="fileInput" 
              accept="image/*" 
              class="hidden" 
              @change="previewImage"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          :disabled="loading"
        >
          Create Product
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      name: '',
      price: '',
      description: '',
      image: null,
      imagePreview: null,
      loading: false,
      errors: {}
    }
  },
  methods: {
    // Reference input to trigger file input
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    // Preview image after selection
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.imagePreview = URL.createObjectURL(file);
        this.image = file;
      }
    },

    // Handle product creation
    async createProduct() {
      this.loading = true;
      this.errors = {}; // Reset errors

      try {
        const formData = new FormData();
        formData.append('product_name', this.name);
        formData.append('product_price', this.price);
        formData.append('product_description', this.description);    

        if (this.image) {
          formData.append('product_img_url', this.image);
        }
        
        const response = await api.createProduct(formData);
        console.log('Product Created:', response.data);

        Swal.fire({
          icon: 'success',
          title: 'Product Created',
          text: 'Product created successfully',
        });

        this.$router.push('/products');
      } catch (error) {
        console.error('Failed to create product', error);

        if (error.response && error.response.data && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create product',
          });
        }
      } finally {
        this.loading = false; 
      }
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  border: 2px dashed #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
}

.card:hover {
  background-color: #e0e0e0;
}

.card img {
  max-width: 100%;
  max-height: 100%;
}
</style>
