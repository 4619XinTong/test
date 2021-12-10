<template>
    <div class="allbody">
        <div class="allbody-one">
<!--            主体部分进行分区-->
            <navigation path=""><div class="navigation-school">学校信息管理系统</div></navigation>
            <navigation path="/student">学生信息</navigation>
            <navigation path="/teacher">老师信息</navigation>
            <navigation path="/classroom">班级信息</navigation>
            <navigation path="/jiaoshi">教室信息</navigation>
        </div>
        <router-view class="allbody-two"></router-view>
    </div>
</template>

<script>
    import navigation from "./navigation";

    export default {
        name: "allbody",
        components:{
            navigation,
        },
        props:{
            isschoolname: String
        }
    }
</script>

<style scoped>
    .navigation-school{
        background-color: rgb(69, 137, 239);
        height :100%;
    }
    .allbody{
        display: flex;
        margin: 0 8%;
        height: 100%;
    }
    .allbody-one{
    }
    .allbody-two{
        margin-left: 22px;
        width: 100%;
        padding: 10px;
    }
</style>