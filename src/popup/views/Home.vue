<template>
  <div>
    <input
      v-model="keywords"
      @keyup="search"
      autofocus
      class="w-full border-b dark:border-gray-800 focus:outline-none bg-gray-100 dark:bg-gray-700 p-3"
      aria-label="搜索"
      placeholder="搜索..."
    >
    <div class="grid grid-cols-1">
      <div
        v-for="(item,index) in urls"
        :key="index"
        @click="urlClick(item.url)"
        :class="index === current ? 'bg-gray-200 dark:bg-gray-600' : 'bg-white dark:bg-gray-800'"
        class="grid grid-cols-8 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 cursor-pointer"
      >
        <div class="flex justify-center">
          <component :is="item.icon" theme="outline" size="20"></component>
        </div>
        <p class="col-span-6 ml-2 truncate">{{ item.title }}</p>
        <div class="flex justify-center">
          <Right theme="outline" size="24" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Github, Setting, Right, Add, Bookmark, Wifi } from '@icon-park/vue'
import zh from 'zh_cn'
import hotkeys from 'hotkeys-js'
import queryBsgExtUrls from '@/graphql/queryBsgExtUrls.gql'
import mutationUpdateExtUrl from '@/graphql/mutationUpdateExtUrl.gql'

export default {
  name: 'Home',
  components: { Github, Setting, Right, Add, Bookmark, Wifi },
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
      bookmarks: [],
      menuList: [
        { title: "新增", icon: 'Add', url: "/add" },
        { title: "设置", icon: 'Setting', url: "/setting" },
        { title: "关于", icon: 'Github', url: "/about" },
      ]
    }
  },
  computed: {
    urls() {
      let arr = this.bsgExtUrls.map(({title, url}) => {
        return { title, url, icon: 'Wifi' }
      })
      this.bookmarks.map(({title, url}) => {
        arr.push({ title, url, icon: 'Bookmark' })
      })
      let results = arr.filter(item => zh(item.title.toLowerCase()).join('').includes(this.keywords))
      return this.keywords ? results : this.menuList
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
        this.bookmarks = results
      })
    },
    arrowAction(action) {
      if (action == 'add') {
        if (this.current < this.urls.length - 1) {
          this.current++
        } else {
          this.current = 0
        }
      } else if (action == 'minus') {
        if (this.current > 0) {
          this.current--
        } else {
          this.current = this.urls.length - 1
        }
      }
    },
    enterAction() {
      let url = this.urls[this.current].url
      this.urlClick(url)
    },
    urlClick(url) {
      if (url.includes('http')) {
        chrome.tabs.create({ url })
      } else {
        this.$router.push(url)
      }
    },
    // URL计次
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
  },
  beforeDestroy() {
    hotkeys.unbind()
  }
}
</script>
