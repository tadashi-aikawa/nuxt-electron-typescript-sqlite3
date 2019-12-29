export interface State {
  counter: number
}

export const state = (): State => ({
  counter: 0
})

export const mutations = {
  increment(state: State, value: number) {
    state.counter += value
  },
  decrement(state: State, value: number) {
    state.counter -= value
  }
}
