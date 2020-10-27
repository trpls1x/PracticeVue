import Vue from 'vue'
import Vuex from 'vuex'
import createPersisteadState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersisteadState()],
    state: {
      count: 0,
      change:(localStorage.getItem('change') === 'true'),
      user: null
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        setStyle: (state, change) => state.change = change,
        setUser: (state, user) => state.user = user
    },
    getters: {
        getCount: (state) =>
        {
            return state.count
        },
        getChange: (state) => 
        {
            return state.change
        },
        getUser: (state) => 
        {
            return state.user
        }
    }
  })
  export default store;