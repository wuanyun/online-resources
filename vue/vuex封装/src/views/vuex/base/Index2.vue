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
