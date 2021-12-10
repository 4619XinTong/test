<template>
    <div class="navigation" @click="thisclick">
<!--        学校内信息导航栏-->
        <div :class="{active:isactive}"><slot></slot></div>

<!--        <div class="navigation-stu">学生</div>-->
<!--        <div class="navigation-teacher">老师</div>-->
<!--        <div class="navigation-room">教室</div>-->
    </div>
</template>

<script>
    export default {
        name: "navigation",
        props:{
            path:String
        },
        methods:{
            thisclick() {
                this.$router.replace(this.path)
            }
        },
        computed:{
            isactive(){
                return this.$route.path.indexOf(this.path) !=-1
            }
        }
    }
</script>

<style scoped>
    .navigation{
        margin-left: 10%;
        background-color: #fafafa;
        width: 220px;
    }
    .navigation div{
        height: 50px;
        margin: 2px 0;
        width: 100%;
        text-align: center;
        line-height: 45px;
        border: 1px solid rgba(238, 238, 238, 0.94);
    }
    .active{
        color: #0022ff;
        background-color: #efefef;
    }
</style>