<template>
  <div class="min-w-popup">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome!'
    }
  }
}
</script>

<style>
.min-w-popup {
  width: 300px;
  height: 400px;
}
</style>
