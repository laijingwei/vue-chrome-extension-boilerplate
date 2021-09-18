<template>
  <div>
    <div
      class="flex items-center border-b dark:border-gray-800 w-full bg-gray-100 dark:bg-gray-700 p-3 cursor-pointer"
      @click="$router.replace('/')"
    >
      <Left theme="outline" size="24" />
      <p class="ml-2">设置</p>
    </div>

    <div
      class="flex flex-col bg-white dark:bg-gray-800 p-3 h-48"
    >
      <label class="inline-flex items-center">
        <input type="checkbox" :checked="showBookmark">
        <span class="ml-2">显示博思高链接</span>
      </label>
      <label class="inline-flex items-center">
        <input type="checkbox" :checked="showBookmark">
        <span class="ml-2">显示最常访问</span>
      </label>
      <label class="inline-flex items-center">
        <input type="checkbox" :checked="showBookmark">
        <span class="ml-2">显示书签链接</span>
      </label>
      <label class="inline-flex items-center">
        <input type="checkbox" :checked="showBookmark">
        <span class="ml-2">显示浏览历史</span>
      </label>
    </div>

  </div>
</template>

<script>
import { Left } from '@icon-park/vue'
import hotkeys from "hotkeys-js"

export default {
  name: 'Setting',
  components: { Left },
  data() {
    return {
      showBookmark: false,
    }
  },
  methods: {
    init() {
      hotkeys.filter = (event) => true
      hotkeys('left', (event, handler) => {
        this.$router.replace('/')
      });
    },
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    hotkeys.unbind()
  }
}
</script>
