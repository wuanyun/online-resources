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
