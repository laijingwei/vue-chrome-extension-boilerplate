<template>
  <div>
    <div
      class="flex items-center border-b dark:border-gray-800 w-full bg-gray-100 dark:bg-gray-700 p-3 cursor-pointer"
      @click="this.$router.replace('/')"
    >
      <Left theme="outline" size="24" />
      <p class="ml-2">设置</p>
    </div>

    <div
      class="flex bg-white dark:bg-gray-800 p-3 h-48"
    >
      <p>
        <input type="checkbox" id="cbox1" value="first_checkbox">
        <label for="cbox1">是否在搜索结果中展示书签链接</label>
      </p>
    </div>

  </div>
</template>

<script>
import { Left } from '@icon-park/vue'
import hotkeys from "hotkeys-js"

export default {
  name: 'Setting',
  components: { Left },
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
  }
}
</script>
