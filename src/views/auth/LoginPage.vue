<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
      
      <!-- Loading Spinner -->
      <div v-if="loading" class="text-center mb-4">
        <span class="text-blue-500">Logging in...</span>
        <div class="loader mt-2"></div> 
      </div>

      <form v-else @submit.prevent="login">
        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="email"
            v-model="email"
            id="email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password Field -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
          <input
            type="password"
            v-model="password"
            id="password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Login
        </button>
      </form>

      <!-- Forgot Password Link -->
      <div class="mt-4 text-center">
        <a href="#" class="text-sm text-blue-500 hover:underline">Forgot your password?</a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'
import Swal from 'sweetalert2'
import { useAuthStore } from "../../stores/authStore";

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false, 
    }
  },

  methods: {
    async login() {
      this.loading = true; 
      try {
        const response = await api.login({ email: this.email, password: this.password });
        const { token, user, message } = response.data;
        if (token) {
           const authStore = useAuthStore();
            authStore.login(user, token);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: message || 'You have successfully logged in!',
          });
          this.$router.push('/products');
        }
      } catch (error) {
        console.error('Login failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.response?.data?.message || 'An error occurred during login.',
        });
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
