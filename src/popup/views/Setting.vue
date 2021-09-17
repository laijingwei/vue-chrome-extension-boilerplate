<template>
  <div>
    <div
      class="flex items-center w-full dark:bg-gray-700 p-3 cursor-pointer"
      @click="$router.back()"
    >
      <Left theme="outline" size="24" fill="#eee" />
      <p class="text-base dark:text-gray-100 ml-2">设置</p>
    </div>

    <div
      class="flex bg-gray-200 dark:bg-gray-800 p-3 h-48"
    >
      <p>
        <input type="checkbox" id="cbox1" value="first_checkbox">
        <label for="cbox1" class="text-gray-200 text-base">是否在搜索结果中展示书签链接</label>
      </p>
    </div>

  </div>
</template>

<script>
import { Left } from '@icon-park/vue'

export default {
  name: 'Setting',
  components: { Left },
}
</script>
