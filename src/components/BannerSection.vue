<template>
  <section class="relative bg-cover bg-center h-screen" style="background-image: url('/images/details.jpg')">
    <div class="absolute inset-0 bg-black opacity-40"></div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide flex justify-center items-center text-center">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 text-white">
            <div class="pb-12 pt-32 md:pb-20 md:pt-40">
              <div class="pb-12 text-center md:pb-16">
                <h1 class="mb-6 text-5xl font-bold md:text-6xl">
                  The website builder you're <br class="max-lg:hidden" />
                  looking for
                </h1>
                <p class="mb-8 text-lg md:text-xl">
                  Simple is a modern website builder powered by AI that changes
                  how companies create user interfaces together.
                </p>
                <div class="relative">
                  <div class="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                    <a
                      class="btn group mb-4 w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                      href="#0"
                    >
                      
                    </a>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
       
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  mounted() {
    new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 5000,
      },
      effect: 'fade',
    });
  },
};
</script>

<style scoped>
.swiper-container {
  position: relative;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.swiper-pagination-bullet {
  background-color: white;
  opacity: 0.7;
}

.swiper-pagination-bullet-active {
  background-color: #0077ff;
  opacity: 1;
}
</style>
