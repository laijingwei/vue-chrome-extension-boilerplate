<template>
  <div>
    <div
      class="w-full text-base dark:bg-gray-700 p-2 cursor-pointer dark:text-gray-100"
      @click="$router.back()"
    >关于</div>

    <div
      class="bg-gray-200 dark:bg-gray-800 p-4 h-48"
    >
      <p class="text-sm text-gray-200">{{ bsgExtAnnouncement }}</p>
    </div>

  </div>
</template>

<script>
import queryBsgExtAnnouncement from '@/graphql/queryBsgExtAnnouncement.gql'

export default {
  name: 'Home',
  apollo: {
    bsgExtAnnouncement: {
      query: queryBsgExtAnnouncement,
      update: (data) => data.bsgExtAnnouncement.title
    },
  },
}
</script>
