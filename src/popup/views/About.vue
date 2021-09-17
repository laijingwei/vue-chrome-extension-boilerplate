<template>
  <div>
    <div
      class="flex items-center border-b dark:border-gray-800 w-full bg-gray-100 dark:bg-gray-700 p-3 cursor-pointer"
      @click="$router.back()"
    >
      <Left theme="outline" size="24" />
      <p class="ml-2">关于</p>
    </div>

    <div
      class="flex bg-white dark:bg-gray-800 p-3 h-48"
    >
      <Like theme="filled" size="24" class="text-pink-400" />
      <p class="ml-2">{{ bsgExtAnnouncement }}</p>
    </div>

  </div>
</template>

<script>
import { Left, Like } from '@icon-park/vue'
import queryBsgExtAnnouncement from '@/graphql/queryBsgExtAnnouncement.gql'

export default {
  name: 'About',
  components: { Left, Like },
  apollo: {
    bsgExtAnnouncement: {
      query: queryBsgExtAnnouncement,
      update: (data) => data.bsgExtAnnouncement.title
    },
  },
}
</script>
