<template>
    <div class="isheader">
<!--        头部名称显示-->
        <h1>学校名称：<span>{{$store.state.schoolname}}</span>

            <div class="updataschname" @click="isupdatasch">更改学校名称</div></h1>
        <div v-if="schflag">
            <schoolupdata @opendialog="issubmitFrom"></schoolupdata>
        </div>

    </div>
</template>
<script>
    import schoolupdata from "./schoolData/schoolupdata";
    export default {
        name: "isheader",
        data(){
            return{
                schflag:false,
            }
        },
        components:{
          schoolupdata
        },
        methods:{
            isupdatasch(){
                this.schflag=true
            },
            issubmitFrom() {
                this.schflag=false
            }

        }
    }
</script>

<style scoped>
    .isheader{
        height: 100px;
        line-height: 105px;
        background-color: rgb(69, 137, 239);
    }
    .isheader h1 span{
        font-size: 20px;

    }
    .isheader h1{
        display: flex;
        padding-left: 8%;
        color: #ffffff;
    }
    .updataschname{
        display: inline-block;
        font-size: 13px;
        height: 20px;
        position: relative;
        top: 10px;
        left: 40px;
        color: #fdfcfc;
        text-decoration: underline;
    }
</style>