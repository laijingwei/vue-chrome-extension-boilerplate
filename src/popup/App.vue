<template>
  <div class="min-w-popup text-gray-800 dark:text-gray-200 text-base">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$router.push('/')
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
