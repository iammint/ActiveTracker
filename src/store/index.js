import { createStore } from "vuex"

export default createStore({
  state() {
    return {
      user: null,
    }
  },
  mutations: {
    setUser(state, value) {
      state.user = value ? value.user : null
    },
  },
})
