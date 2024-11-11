<template>
  <nav aria-label="breadcrumb" class="mb-4 py-4  my-4 bg-cover bg-center text-white" :style="{ backgroundImage: 'url()' }">
    <ol class="flex flex-wrap text-sm space-x-2">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <span v-if="index !== breadcrumbs.length - 1">
          <router-link :to="crumb.path" class="hover:underline">{{ crumb.label }}</router-link>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </span>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
nav {
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
}

ol li a {
  color: #ffffff;
}

ol li span {
  color: #ffffff;
}
</style>
