<template>
  <div>
    <div
      class="flex items-center w-full dark:bg-gray-700 p-3 cursor-pointer"
      @click="$router.back()"
    >
      <ion-icon name="arrow-back" size="small" class="text-gray-200 px-2"></ion-icon>
      <p class="text-base dark:text-gray-100">设置</p>
    </div>

    <div
      class="flex bg-gray-200 dark:bg-gray-800 p-3 h-48"
    >
      <p>
        <input type="checkbox" id="cbox1" value="first_checkbox">
        <label for="cbox1">是否在搜索结果中展示书签链接</label>
      </p>
    </div>

  </div>
</template>
