<template>

</template>

<script>
    import Router from "../../router";

    export default {
        name: "back2",
        setup(){
            Router.replace({
                path:'/Jiaoshi',
                name:"Jiaoshi"
            })
            return{

            }
        }
    }
</script>

<style scoped>

</style>
