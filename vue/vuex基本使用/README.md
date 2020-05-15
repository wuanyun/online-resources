# 基于vue-cli4创建的项目，根据网上的资料整理的vuex的基本使用

### 1. 安装依赖
`cnpm i vuex -S`
### 2. 配置vuex
创建`/src/store/index.js`，内容如下：

```
import Vuex from 'vuex'
import Vue from 'vue'
import mod from './modules/mod'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 1,
    title: 'vuex Title'
  },
  mutations: {
    increment(state) {
      state.count++
    },
    updateTitle(state, str) {
      state.title += ',' + str
    }
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    asyncUpdateTitle({ commit }, str) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('updateTitle', str)
          resolve()
        }, 1000)
      })
    }
  },
  getters: {
    formatTitle(state) {
      return state.title.toUpperCase()
    },
    formatTitle2(state) {
      return function (flag) {
        if (flag) {
          return state.title.toUpperCase()
        }
        return state.title.toLowerCase()
      }
    }
  },
  modules: {
    mod
  }
})

export default store

```

创建`/src/store/modules/mod.js`，内容如下：
```
const state = () => ({
  count: 1,
  title: 'vuex Title'
})

const mutations = {
  increment(state) {
    state.count++
  },
  updateTitle(state, str) {
    state.title += ',' + str
  }
}

const actions = {
  asyncIncrement({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  },
  asyncUpdateTitle({ commit }, str) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('updateTitle', str)
        resolve()
      }, 1000)
    })
  }
}

const getters = {
  formatTitle(state) {
    return state.title.toUpperCase()
  },
  formatTitle2(state) {
    return function (flag) {
      if (flag) {
        return state.title.toUpperCase()
      }
      return state.title.toLowerCase()
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

```

### 3. 挂载vuex

修改`/src/main.js`，引用vuex并挂载上去，主要修改的内容如下：
```
import store from './store/index'

new Vue({
  router,
  render: (h) => h(App),
  store
}).$mount('#app')

```

### 4. 使用vuex
##### 4.1 第一种方法使用
###### 4.1.1 使用根目录的数据
```
<template>
  <div>
    {{ this.$store.state.count }}
    {{ this.$store.state.title }}
    {{ this.$store.getters.formatTitle }}
    {{ this.$store.getters.formatTitle2(true) }}
    {{ this.$store.getters.formatTitle2(false) }}

    <button v-on:click="add">add</button>
    <button v-on:click="update">update title</button>
    <button v-on:click="addAsync">addAsync</button>
    <button v-on:click="updateAsync">update title async</button>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.commit('increment')
    },
    update() {
      this.$store.commit('updateTitle', 'add new word success')
    },
    addAsync() {
      this.$store.dispatch('asyncIncrement')
      console.log(this.$store.state.count)
    },
    updateAsync() {
      this.$store
        .dispatch('asyncUpdateTitle', 'add new word by async success')
        .then(() => {
          console.log(this.$store.state.title)
        })
    }
  }
}
</script>

```
###### 4.1.2 使用modules/mod中的数据
```
<template>
  <div>
    {{ this.$store.state.mod.count }}
    {{ this.$store.state.mod.title }}
    {{ this.$store.getters['mod/formatTitle'] }}
    {{ this.$store.getters['mod/formatTitle2'](true) }}
    {{ this.$store.getters['mod/formatTitle2'](false) }}
    <button v-on:click="add">add</button>
    <button v-on:click="update">update title</button>
    <button v-on:click="addAsync">addAsync</button>
    <button v-on:click="updateAsync">update title async</button>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.commit('mod/increment')
    },
    update() {
      this.$store.commit('mod/updateTitle', 'add new word success')
    },
    addAsync() {
      this.$store.dispatch('mod/asyncIncrement')
      console.log(this.$store.state.mod.count)
    },
    updateAsync() {
      this.$store
        .dispatch('mod/asyncUpdateTitle', 'add new word by async success')
        .then(() => {
          console.log(this.$store.state.mod.title)
        })
    }
  }
}
</script>

```
##### 4.2 第二种方法使用
###### 4.2.1 使用根目录的数据
```
<template>
  <div>
    {{ count }}
    {{ title }}
    {{ formatTitle }}
    {{ formatTitle2(true) }}
    {{ formatTitle2(false) }}

    <button v-on:click="increment">add</button>
    <button v-on:click="updateTitle('add new word success')">
      update title
    </button>
    <button v-on:click="asyncIncrement">addAsync</button>
    <button v-on:click="updateAsync">
      update title async
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapMutations(['increment', 'updateTitle']),
    ...mapActions(['asyncIncrement', 'asyncUpdateTitle']),
    updateAsync() {
      this.asyncUpdateTitle(
        'asyncUpdateTitle',
        'add new word by async success'
      ).then(() => {
        console.log(this.title)
      })
    }
  },
  computed: {
    ...mapState(['count', 'title']),
    ...mapGetters(['formatTitle', 'formatTitle2'])
  }
}
</script>

```

###### 4.2.2 使用modules/mod中的数据
```
<template>
  <div>
    {{ count }}
    {{ title }}
    {{ formatTitle }}
    {{ formatTitle2(true) }}
    {{ formatTitle2(false) }}
    <button v-on:click="increment">add</button>
    <button v-on:click="updateTitle('add new word success')">
      update title
    </button>
    <button v-on:click="asyncIncrement">addAsync</button>
    <button v-on:click="updateAsync">
      update title async
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      increment: 'mod/increment',
      updateTitle: 'mod/updateTitle'
    }),
    ...mapActions({
      asyncIncrement: 'mod/asyncIncrement',
      asyncUpdateTitle: 'mod/asyncUpdateTitle'
    }),
    updateAsync() {
      this.asyncUpdateTitle(
        'asyncUpdateTitle',
        'add new word by async success'
      ).then(() => {
        console.log(this.title)
      })
    }
  },
  computed: {
    ...mapState({
      count: (state) => state.mod.count,
      title: (state) => state.mod.title
    }),
    ...mapGetters({
      formatTitle: 'mod/formatTitle',
      formatTitle2: 'mod/formatTitle2'
    })
  }
}
</script>

```
