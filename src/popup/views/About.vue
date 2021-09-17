<template>
  <div>
    <div
      class="flex items-center w-full dark:bg-gray-700 p-3 cursor-pointer"
      @click="$router.back()"
    >
      <ion-icon name="arrow-back" size="small" class="text-gray-200 px-2"></ion-icon>
      <p class="text-base dark:text-gray-100">关于</p>
    </div>

    <div
      class="flex bg-gray-200 dark:bg-gray-800 p-3 h-48"
    >
      <ion-icon name="heart" size="small" class="text-pink-400 px-2"></ion-icon>
      <p class="text-sm text-gray-200">{{ bsgExtAnnouncement }}</p>
    </div>

  </div>
</template>

<script>
import queryBsgExtAnnouncement from '@/graphql/queryBsgExtAnnouncement.gql'

export default {
  name: 'About',
  apollo: {
    bsgExtAnnouncement: {
      query: queryBsgExtAnnouncement,
      update: (data) => data.bsgExtAnnouncement.title
    },
  },
}
</script>
