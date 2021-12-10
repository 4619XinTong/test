<template>

</template>

<script>
    import Router from '../../router'
    export default {
        name: "back",
        setup(){
            Router.replace({
                path:'/student',
                name:"student"
            })
            return{

            }
        }
    }
</script>

<style scoped>

</style>
