<template>
  <div>
    <div
      class="flex items-center border-b dark:border-gray-800 w-full bg-gray-100 dark:bg-gray-700 p-3 cursor-pointer"
      @click="$router.replace('/')"
    >
      <Left theme="outline" size="24" />
      <p class="ml-2">新增</p>
    </div>

    <div
      class="flex flex-col bg-white dark:bg-gray-800 p-3"
    >
      <label class="block">
        <span>标题</span>
        <input type="text" class="mt-1 block w-full bg-gray-100 dark:bg-gray-700" placeholder="" />
      </label>
      <label class="block mt-2">
        <span>链接</span>
        <input type="text" class="mt-1 block w-full bg-gray-100 dark:bg-gray-700" placeholder="" />
      </label>
      <button class="py-2 mt-4 rounded shadow bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500">确定</button>
    </div>

  </div>
</template>

<script>
import { Left, Like } from '@icon-park/vue'
import queryBsgExtAnnouncement from '@/graphql/queryBsgExtAnnouncement.gql'
import hotkeys from "hotkeys-js"

export default {
  name: 'Add',
  components: { Left, Like },
  apollo: {
    bsgExtAnnouncement: {
      query: queryBsgExtAnnouncement,
      update: (data) => data.bsgExtAnnouncement.title
    },
  },
  data() {
    return {
      bsgExtAnnouncement: '',
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
