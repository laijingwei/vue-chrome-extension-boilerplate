<template>
  <div>
    <div
      class="flex items-center border-b dark:border-gray-800 w-full bg-gray-100 dark:bg-gray-700 p-3 cursor-pointer"
      @click="$router.replace('/')"
    >
      <Left theme="outline" size="24" />
      <p class="ml-2">新增</p>
    </div>

    <div class="grid grid-cols-1 gap-2 bg-white dark:bg-gray-800 p-3">
      <input type="text" v-model="title" class="mt-1 block w-full bg-gray-100 dark:bg-gray-700" placeholder="标题" />
      <input type="text" v-model="url" class="mt-1 block w-full bg-gray-100 dark:bg-gray-700" placeholder="链接" />
      <button
        class="py-2 mt-2 shadow rounded bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"
        @click="submit"
      >确定</button>
    </div>

  </div>
</template>

<script>
import { Left, Like } from '@icon-park/vue'
import hotkeys from "hotkeys-js"
import mutationCreateBsgExtUrl from '@/graphql/mutationCreateBsgExtUrl.gql'

export default {
  name: 'Add',
  components: { Left, Like },
  data() {
    return {
      title: '',
      url: '',
    }
  },
  methods: {
    init() {
      hotkeys.filter = (event) => true
      hotkeys('left', (event, handler) => {
        this.$router.replace('/')
      });
    },
    submit() {
      let { title, url } = this
      if (!title || !url || !url.includes('http')) {
        chrome.notifications.clear('validate')
        chrome.notifications.create('validate', {
          type: 'basic',
          iconUrl: 'assets/icons/icon_128.png',
          title: '博思高',
          message: '内容不合法'
        })
        return
      }
      let input = {
        data: { title, url },
      }
      this.$apollo
        .mutate({
          mutation: mutationCreateBsgExtUrl,
          variables: { input },
        })
        .then((data) => {
          chrome.notifications.clear('success')
          chrome.notifications.create('success', {
            type: 'basic',
            iconUrl: 'assets/icons/icon_128.png',
            title: '博思高',
            message: '添加成功'
          })
          this.$router.replace('/')
        })
        .catch((error) => {
          chrome.notifications.clear('error')
          chrome.notifications.create('error', {
            type: 'basic',
            iconUrl: 'assets/icons/icon_128.png',
            title: '博思高',
            message: '添加失败'
          })
        })
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
