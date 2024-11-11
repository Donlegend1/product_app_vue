<template>
  <footer class="bg-gray-800 text-white py-8 mt-8">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Company</h3>
          <ul>
            <li><a href="#about" class="hover:text-gray-400">About Us</a></li>
            <li><a href="#services" class="hover:text-gray-400">Services</a></li>
            <li><a href="#careers" class="hover:text-gray-400">Careers</a></li>
            <li><a href="#privacy" class="hover:text-gray-400">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li><a href="#home" class="hover:text-gray-400">Home</a></li>
            <li><a href="#blog" class="hover:text-gray-400">Blog</a></li>
            <li><a href="#contact" class="hover:text-gray-400">Contact</a></li>
            <li><a href="#faq" class="hover:text-gray-400">FAQ</a></li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
          <p class="mb-4">Subscribe to our newsletter to receive updates and news.</p>
          <form action="#" method="post">
            <input
              type="email"
              class="w-full p-2 mb-4 text-gray-800"
              placeholder="Your email address"
            />
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
        
      </div>
      <div class="mt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 CoAmana. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
