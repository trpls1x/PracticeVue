import Vue from 'vue'
import Vuex from 'vuex'
import createPersisteadState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersisteadState()],
    state: {
      count: 0,
      change:(localStorage.getItem('change') === 'true')
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        setStyle: (state, change) => state.change = change,
    },
    getters: {
        getCount: (state) =>
        {
            return state.count
        },
        getChange: (state) => {
            
            return state.change
        },
    }
  })
  export default store;