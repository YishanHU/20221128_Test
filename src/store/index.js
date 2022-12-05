import Vue from 'vue'
import Vuex from 'vuex'
import actions from "@/store/actions";
import state from "@/store/state";
import getters from "@/store/getters";
import mutations from "@/store/mutations";

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
