import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        dados:[],
        lstDados: [],
    },
    mutations:{
        setDados(state, dados){
            state.dados = dados
        }
    }
})

export default store