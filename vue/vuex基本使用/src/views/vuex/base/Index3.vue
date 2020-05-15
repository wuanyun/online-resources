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
