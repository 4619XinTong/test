import { createStore } from "vuex";
// import Vue from 'vue';
// import Vuex from 'vuex';
// import createPersistedState from "vuex-persistedstate"

// const store = new Vuex.Store({
//   plugins:[createPersistedState(
//       {
//     storage:window.sessionStorage,
//     reducer(data){
//       return{
//         schoolflag:false
//       }
//     }
//       }
//       )
//   ]
// })
export default createStore({
  state: {
    schoolname:'',
    schoolflag:true,
    tabflag:true,
    updatanum:'',
    schoolid:'',
  },
  mutations: {
    thisschoolname(state,aaa){
      state.schoolname=aaa
    },
    thisschoolflag(state){
      state.schoolflag=false
    },
    thistabflagT(state){
      state.tabflag=true
    },
    thistabflagF(state){
      state.tabflag=false
    },
    thisupdatanum(state,bbb){
      state.updatanum=bbb
    },
    thisschoolid(state,ccc){
      state.schoolid=ccc
    },
  },
  actions: {

  },
  modules: {

  },
});
