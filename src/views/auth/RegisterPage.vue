<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
      
      <!-- Loading Spinner -->
      <div v-if="loading" class="text-center mb-4">
        <span class="text-blue-500">Registering...</span>
        <div class="loader mt-2"></div> 
      </div>

      <form v-else @submit.prevent="register">
        <!-- Full Name Field -->
        <div class="mb-4">
          <label for="fullname" class="block text-sm font-medium text-gray-600">Full Name:</label>
          <input
            type="text"
            v-model="fullname"
            id="fullname"
            
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
          <div v-if="errors.fullname" class="text-red-500 text-sm mt-1">{{ errors.fullname }}</div>
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="email"
            v-model="email"
            id="email"
            
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
          <input
            type="password"
            v-model="password"
            id="password"
            
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <div v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-6">
          <label for="password_confirmation" class="block text-sm font-medium text-gray-600">Confirm Password:</label>
          <input
            type="password"
            v-model="password_confirmation"
            id="password_confirmation"
            
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
          <div v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation }}</div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Register
        </button>
      </form>

      <!-- Already have an account link -->
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Already have an account? 
          <router-link to="/login" class="text-blue-500 hover:underline">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../services/api'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      password_confirmation: '',
      loading: false,
      errors: {} // Add errors object to store validation errors
    }
  },
  methods: {
    async register() {
      this.loading = true;
      this.errors = {}; // Clear previous errors

      try {
        const response = await api.register({
          fullname: this.fullname,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
        console.log('Registration successful', response.data);
        const { message } = response.data;
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: message || 'You have successfully registered!',
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed', error);
        if (error.response && error.response.data && error.response.data.errors) {
          this.errors = error.response.data.errors; // Capture validation errors
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: error.response?.data?.message || 'An error occurred during registration.',
          });
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
