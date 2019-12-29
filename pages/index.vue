<template>
  <div style="padding: 30px;">
    <h2>{{ counter }}</h2>
    <button @click="increment(2)">increment</button>
    <button @click="decrement(1)">decrement</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, State, Mutation } from 'nuxt-property-decorator'
import { run } from '~/db'

@Component({})
class Root extends Vue {
  @State counter: number
  @Mutation increment: (value: number) => void
  @Mutation decrement: (value: number) => void

  mounted() {
    run()
  }
}

export default Root
</script>
