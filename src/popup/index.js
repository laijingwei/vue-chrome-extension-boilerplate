import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import 'babel-polyfill'

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
    console.log(error.message)
  }
})
Vue.use(VueApollo)

// eslint-disable-next-line
new Vue({
  apolloProvider,
  router,
  store,
  el: '#app',
  render: h => h(App),
})
