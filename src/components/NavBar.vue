<template>
  <header class="bg-gray-800">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <!-- Logo or App Name -->
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only text-white font-semibold">My App</span>
          <h3 class=" w-auto text-white font-semibold">CoAmana</h3>
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex lg:hidden">
        <button @click="mobileMenuOpen = true" type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white">
          <span class="sr-only">Open main menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </button>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
        <router-link to="/" class="text-white text-sm font-semibold">Home</router-link>
        <router-link v-if="!authStore.isLoggedIn" to="/login" class="text-white text-sm font-semibold">Login</router-link>
        <router-link v-if="!authStore.isLoggedIn" to="/register" class="text-white text-sm font-semibold">Register</router-link>
        <router-link to="/products" v-if="authStore.isLoggedIn" class="text-white text-sm font-semibold">Products</router-link>
        <router-link to="/create-product" v-if="authStore.isLoggedIn" class="text-white text-sm font-semibold">Create Product</router-link>
        <router-link to="/order" v-if="authStore.isLoggedIn" class="text-white text-sm font-semibold">My Orders</router-link>
        <button v-if="authStore.isLoggedIn" @click="authStore.logout" class="text-white text-sm font-semibold">Logout</button>
      </div>
    </nav>

    <!-- Mobile Menu Dialog -->
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">My App</span>
            <h3 class=" w-auto text-black font-semibold">CoAmana</h3>
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link to="/" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Home</router-link>
              <router-link v-if="!authStore.isLoggedIn" to="/login" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Login</router-link>
              <router-link v-if="!authStore.isLoggedIn" to="/register" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Register</router-link>
              <router-link to="/products" v-if="authStore.isLoggedIn" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Products</router-link>
              <router-link to="/create-product" v-if="authStore.isLoggedIn" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Create Product</router-link>
              <router-link to="/order" v-if="authStore.isLoggedIn" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">My Orders</router-link>
            </div>
            <div class="py-6">
              <button v-if="authStore.isLoggedIn" @click="authStore.logout" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Logout</button>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>

  <!-- Main content -->
  <router-view></router-view>
</template>

<script>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

export default {
  setup() {
    const mobileMenuOpen = ref(false)
    // const router = useRouter()
    const authStore = useAuthStore()

    const toggleMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    authStore.checkAuthStatus()

    return {
      mobileMenuOpen,
      authStore,
      toggleMenu,
    }
  }
}
</script>

<style>
</style>
