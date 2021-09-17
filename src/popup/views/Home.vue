<template>
  <div>
    <input
      v-model="keywords"
      @keyup.down="currentAdd"
      @keyup.up="currentMinus"
      @keyup.enter="goTo"
      autofocus
      class="w-full border-b dark:border-gray-800 focus:outline-none bg-gray-100 dark:bg-gray-700 p-3"
      aria-label="搜索"
      placeholder="搜索..."
    >
    <div class="grid grid-cols-1">

      <template v-if="keywords">
        <div
          v-for="(item,index) in bsgExtUrls"
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
import { Github, Setting, Right } from '@icon-park/vue'
import queryBsgExtUrls from '@/graphql/queryBsgExtUrls.gql'
import mutationUpdateExtUrl from '@/graphql/mutationUpdateExtUrl.gql'

export default {
  name: 'Home',
  components: { Github, Setting, Right },
  apollo: {
    bsgExtUrls: {
      query: queryBsgExtUrls,
      variables() {
        return {
          keywords: this.keywords
        }
      },
      update: (data) => data.bsgExtUrls
    },
  },
  data() {
    return {
      current: -1,
      keywords: '',
      menuList: [
        { title: "设置", icon: 'Setting', url: "/setting" },
        { title: "关于", icon: 'Github', url: "/about" },
      ]
    }
  },
  methods: {
    currentAdd() {
      if (this.current < this.menuList.length - 1) this.current++
    },
    currentMinus() {
      if (this.current > 0) this.current--
    },
    goTo() {
      if (this.bsgExtUrls.length > 0) window.open(this.bsgExtUrls[this.current].url, '_blank')
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
          window.open(url, "_blank")
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
}
</script>
