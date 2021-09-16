# vue chrome extension

## Roadmap
- 集成本地书签
- 用户提交链接
- 网络接口调试界面
- 接口缓存至vuex
- 支持英文模糊匹配

## Install TailwindCSS

```bash
yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 postcss-class-rename@^1 postcss-remove-selectors@^2 postcss-scss@^3
npx tailwindcss init -p
yarn add -D postcss-cli@^7 postcss-loader@^4.2.0 cross-env
```

tailwind.config.js

```js
module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: 'media',
  theme: {
    minWidth: {
      '0': '0',
      'popup': '350px',
      full: '100%'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

App.vue

```html
<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
```

## Install vue-apollo

```bash
yarn add vue-apollo graphql apollo-boost
```

main.js

```js
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  uri: 'http://192.168.110.165:1337/graphql'
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network'
    }
  },
  errorHandler (error) {
    console.error(error)
  }
})
Vue.use(VueApollo)

new Vue({
  apolloProvider,
  router,
  store,
  el: '#app',
  render: h => h(App),
})
```

App.vue

```js
import gql from 'graphql-tag'

export default {
  apollo: {
    bsgExtAnnouncement: {
      query: gql`query {
        bsgExtAnnouncement {
          title
        }
      }`,
      variables() {
        return {
          keywords: '物业'
        }
      },
      update: (data) => data.bsgExtAnnouncement.title
    },
  },
}
```
