<template>
  <div class="p-4 min-w-popup dark:bg-gray-700">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome!",
    }
  },
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
