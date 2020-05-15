import store from './store/index'

new Vue({
  router,
  render: (h) => h(App),
  store
}).$mount('#app')
