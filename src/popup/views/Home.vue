<template>
  <div class="home">
    <input type="text" placeholder="请输入" v-model="content">
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      content: '尾随事件预警'
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
