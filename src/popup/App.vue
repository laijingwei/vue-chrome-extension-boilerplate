<template>
  <div class="min-w-popup">
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
