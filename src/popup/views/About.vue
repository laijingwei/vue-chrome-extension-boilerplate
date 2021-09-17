<template>
  <div>
    <div
      class="flex items-center w-full dark:bg-gray-700 p-3 cursor-pointer"
      @click="$router.back()"
    >
      <Left theme="outline" size="24" fill="#eee" />
      <p class="text-base dark:text-gray-100 ml-2">关于</p>
    </div>

    <div
      class="flex bg-gray-200 dark:bg-gray-800 p-3 h-48"
    >
      <Like theme="filled" size="24" fill="#eee" />
      <p class="text-base text-gray-200 ml-2">{{ bsgExtAnnouncement }}</p>
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
