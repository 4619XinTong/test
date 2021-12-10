<template>

</template>

<script>
    import Router from "../../router";

    export default {
        name: "back1",
        setup(){
            Router.replace({
                path:'/classRoom',
                name:"classRoom"
            })
            return{

            }
        }
    }
</script>

<style scoped>

</style>
