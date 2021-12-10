<template>
  <div id="app">
      <school-name v-if="$store.state.schoolflag"></school-name>
      <div v-else>
          <isheader></isheader>
          <allbody></allbody>
      </div>
  </div>
</template>
<script>
    //对接home.js
    import {getHomeMultidata} from "./network/home";
    import SchoolName from "./components/SchoolName";
    import isheader from "./components/isheader";
    import allbody from "./components/allbody";

    export default {
        name: 'App',
        components:{
            SchoolName,
            isheader,
            allbody
        },
        data(){
            return{
                schoolname:'',
            }
        },
        created() {
        },
        methods:{
        }
    }
</script>
<style lang="stylus">
@import "assets/css/base.css"
</style>
