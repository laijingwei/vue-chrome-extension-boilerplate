<template>
  <div>
    <input
      v-model="keywords"
      @keyup.down="currentAdd"
      @keyup.up="currentMinus"
      @keyup.enter="goTo"
      autofocus
      class="w-full text-base focus:outline-none dark:bg-gray-700 p-3 dark:text-gray-100"
      aria-label="搜索"
      placeholder="搜索..."
    >
    <div class="grid grid-cols-1">

      <template v-if="keywords">
        <div
          v-for="(item,index) in bsgExtUrls"
          :key="index"
          @click="addCountBsgExtUrls(item.id, item.sort, item.url)"
          :class="index === current ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-800'"
          class="flex justify-between hover:bg-gray-300 dark:hover:bg-gray-600 p-3 cursor-pointer"
        >
          <p class="text-gray-200 text-base">{{ item.title }}</p>
        </div>
      </template>

      <template v-else>
        <div
          v-for="(item,index) in menuList"
          :key="index"
          @click="$router.push(item.url)"
          :class="index === current ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-800'"
          class="flex items-center justify-between hover:bg-gray-300 dark:hover:bg-gray-600 p-3 cursor-pointer"
        >
          <div class="flex items-center">
            <ion-icon :name="item.icon" size="small" class="text-gray-200 mr-2"></ion-icon>
            <p class="text-gray-200 text-base">{{ item.title }}</p>
          </div>
          <ion-icon name="arrow-forward" size="small" class="text-gray-200 px-2"></ion-icon>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import queryBsgExtUrls from '@/graphql/queryBsgExtUrls.gql'
import mutationUpdateExtUrl from '@/graphql/mutationUpdateExtUrl.gql'

export default {
  name: 'Home',
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
        { title: "设置", icon: 'settings-outline', url: "/about" },
        { title: "关于", icon: 'logo-github', url: "/about" },
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
