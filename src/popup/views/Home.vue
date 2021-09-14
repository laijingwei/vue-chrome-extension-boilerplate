<template>
  <div>
    <input
      v-model="search"
      autofocus
      class="w-full text-base dark:bg-gray-800 mb-2 p-1 border-2 dark:border-gray-600 dark:text-gray-100 rounded"
      aria-label="搜索"
      placeholder="搜索..."
    >
    <div class="grid grid-cols-1 gap-1">
      <template v-if="posts.length > 0">
        <template v-for="(item,index) in posts">
          <div
            @click="addCountBsgExtUrls(item.id, item.sort, item.url)"
            :class="index === current ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-800'"
            class="hover:bg-gray-300 dark:hover:bg-gray-600 text-blue-400 hover:text-white dark:text-blue-400 dark:hover:text-blue-200 text-base cursor-pointer text-center truncate p-2 rounded hover:shadow-2xl"
          >{{ item.title }}</div>
        </template>
      </template>
      <template v-if="posts.length === 0">
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-3 rounded text-center">无相关记录</p>
      </template>
    </div>
    <template v-if="announcement">
      <p class="text-sm text-yellow-600 mt-3 rounded text-center">{{ announcement }}</p>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

const server = 'http://api.local.laijw.com/graphql';
const limit = 5;

export default {
  name: 'Home',
  data() {
    return {
      current: 0,
      announcement: "",
      search: "",
      posts: [],
    }
  },
  methods: {
    async http(query, variables) {
      try {
        let {data} = await axios.post(server, {query, variables})
        return data.data.bsgExtUrls
      } catch (e) {
        return [{ id: 0, title: '无法连接至服务器', url: '', sort: 0 }]
      }
    },
    async queryBsgExtAnnouncement() {
      let query = `
        query {
          bsgExtAnnouncement {
            title
          }
        }
      `;
      try {
        let {data} = await axios.post(server, {query})
        return data.data.bsgExtAnnouncement.title
      } catch (e) {
        return '无法连接至服务器'
      }
    },
    async queryBsgExtUrls() {
      let query = `
        query ($limit: Int!) {
          bsgExtUrls(limit: $limit, sort: "sort:desc") {
            id
            title
            url
            sort
          }
        }
      `;
      return await this.http(query, {limit})
    },
    async searchBsgExtUrls(keywords) {
      let query = `
        query ($limit: Int!, $keywords: String!) {
          bsgExtUrls(limit: $limit, sort: "sort:desc", where: { _q: $keywords }) {
            id
            title
            url
            sort
          }
        }
      `;
      return await this.http(query, {keywords,limit})
    },
    async addCountBsgExtUrls(id, sort, url) {
      let query = `
        mutation ($input: updateBsgExtUrlInput!) {
          updateBsgExtUrl(input: $input) {
            bsgExtUrl {
              id
              title
              url
              sort
            }
          }
        }
      `;
      let input = {
        where: { id },
        data: { sort: sort + 1 },
      }
      try {
        let {data} = await axios.post(server, {query, variables: {input}})
        window.open(url, '_blank')
        return data.data.bsgExtUrls
      } catch (e) {
        return { id: 0, title: '无法连接至服务器', url: '', sort: 0 }
      }
    }
  },
  mounted() {
    this.posts = this.queryBsgExtUrls();
    this.announcement = this.queryBsgExtAnnouncement()
  }
}
</script>
