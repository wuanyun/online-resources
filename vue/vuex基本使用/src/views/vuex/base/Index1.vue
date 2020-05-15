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
