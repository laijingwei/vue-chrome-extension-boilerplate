<template>
  <div>
    <input
      v-model="keywords"
      autofocus
      class="w-full border-b dark:border-gray-800 focus:outline-none bg-gray-100 dark:bg-gray-700 p-3"
      aria-label="搜索"
      placeholder="搜索..."
    >
    <div class="grid grid-cols-1">

      <template v-if="keywords">
        <div
          v-for="(item,index) in results"
          :key="index"
          @click="addCountBsgExtUrls(item.id, item.sort, item.url)"
          :class="index === current ? 'bg-gray-200 dark:bg-gray-600' : 'bg-white dark:bg-gray-800'"
          class="flex justify-between hover:bg-gray-200 dark:hover:bg-gray-600 p-3 cursor-pointer"
        >
          <p>{{ item.title }}</p>
        </div>
      </template>

      <template v-else>
        <div
          v-for="(item,index) in menuList"
          :key="index"
          @click="$router.push(item.url)"
          :class="index === current ? 'bg-gray-200 dark:bg-gray-600' : 'bg-white dark:bg-gray-800'"
          class="flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600 p-3 cursor-pointer"
        >
          <div class="flex items-center">
            <component :is="item.icon" theme="outline" size="20"></component>
            <p class="ml-2">{{ item.title }}</p>
          </div>
          <Right theme="outline" size="24" />
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import { Github, Setting, Right, Add } from '@icon-park/vue'
import zh from 'zh_cn'
import hotkeys from 'hotkeys-js'
import queryBsgExtUrls from '@/graphql/queryBsgExtUrls.gql'
import mutationUpdateExtUrl from '@/graphql/mutationUpdateExtUrl.gql'

export default {
  name: 'Home',
  components: { Github, Setting, Right, Add },
  apollo: {
    bsgExtUrls: {
      query: queryBsgExtUrls,
      update: (data) => {
        chrome.storage.local.set({ bsgExtUrls: data.bsgExtUrls }, () => {
          console.log('bsgExtUrls has been set')
        })
        return data.bsgExtUrls
      }
    },
  },
  data() {
    return {
      current: -1,
      keywords: '',
      bsgExtUrls: [],
      menuList: [
        { title: "新增", icon: 'Add', url: "/add" },
        { title: "设置", icon: 'Setting', url: "/setting" },
        { title: "关于", icon: 'Github', url: "/about" },
      ]
    }
  },
  computed: {
    results() {
      return this.bsgExtUrls.filter(item => zh(item.title.toLowerCase()).join('').includes(this.keywords))
    },
  },
  methods: {
    init() {
      chrome.storage.local.get(['bsgExtUrls'], results => {
        this.bsgExtUrls = results.bsgExtUrls
      })
      hotkeys.filter = (event) => true
      hotkeys('enter,up,down,right', (event, handler) => {
        switch (handler.key) {
          case 'enter': this.enterAction();
            break;
          case 'up': this.arrowAction('minus');
            break;
          case 'down': this.arrowAction('add');
            break;
          case 'right': this.enterAction();
            break;
          default: console.log(handler.key);
        }
      });
    },
    search() {
      chrome.bookmarks.search(this.keywords, results => {
        this.bsgExtUrls = results
      })
    },
    arrowAction(action) {
      if (action == 'add') {
        if (this.keywords) {
          if (this.current < this.results.length - 1) {
            this.current++
          } else {
            this.current = 0
          }
        } else {
          if (this.current < this.menuList.length - 1) {
            this.current++
          } else {
            this.current = 0
          }
        }
      } else if (action == 'minus') {
        if (this.keywords) {
          if (this.current > 0) {
            this.current--
          } else {
            this.current = this.results.length - 1
          }
        } else {
          if (this.current > 0) {
            this.current--
          } else {
            this.current = this.menuList.length - 1
          }
        }
      }
    },
    enterAction() {
      if (this.keywords) {
        if (this.results.length > 0) chrome.tabs.create({ url: this.results[this.current].url })
      } else {
        this.$router.push(this.menuList[this.current].url)
      }
    },
    addCountBsgExtUrls(id, sort, url) {
      let input = {
        where: { id },
        data: { sort: sort + 1 },
      }
      this.$apollo
        .mutate({
          mutation: mutationUpdateExtUrl,
          variables: { input },
        })
        .then((data) => {
          console.log(data)
          chrome.tabs.create({ url })
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.init()
  }
}
</script>
