import { createStore } from "vuex";

const store = createStore({
    state () {
      return {
        isLogged: false
      }
    },
    mutations: {
      setLogged (state, value) {
        state.isLogged = value;
      }
    }
});

export default store;
