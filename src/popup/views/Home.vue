<template>
  <div>
    <input
      v-model="keywords"
      @keyup.down="currentAdd"
      @keyup.up="currentMinus"
      @keyup.enter="goTo"
      autofocus
      class="w-full text-base dark:bg-gray-800 mb-2 p-1 border-2 dark:border-gray-600 dark:text-gray-100 rounded"
      aria-label="搜索"
      placeholder="搜索..."
    >
    <div class="grid grid-cols-1 gap-1">
      <template v-if="bsgExtUrls">
        <template v-for="(item,index) in bsgExtUrls">
          <div
            @click="addCountBsgExtUrls(item.id, item.sort, item.url)"
            :class="index === current ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-800'"
            class="hover:bg-gray-300 dark:hover:bg-gray-600 text-blue-400 hover:text-white dark:text-blue-400 dark:hover:text-blue-200 text-base cursor-pointer text-center truncate p-2 rounded hover:shadow-2xl"
          >{{ item.title }}</div>
        </template>
      </template>
      <template v-else>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-3 rounded text-center">无相关记录</p>
      </template>
    </div>
    <p class="text-sm text-yellow-600 mt-3 rounded text-center">{{ bsgExtAnnouncement }}</p>
  </div>
</template>

<script>
import queryBsgExtAnnouncement from '@/graphql/queryBsgExtAnnouncement.gql'
import queryBsgExtUrls from '@/graphql/queryBsgExtUrls.gql'
import mutationUpdateExtUrl from '@/graphql/mutationUpdateExtUrl.gql'

export default {
  name: 'Home',
  apollo: {
    bsgExtAnnouncement: {
      query: queryBsgExtAnnouncement,
      update: (data) => data.bsgExtAnnouncement.title
    },
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
      current: 0,
      keywords: '',
    }
  },
  methods: {
    currentAdd() {
      if (this.current < this.bsgExtUrls.length - 1) this.current++
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
