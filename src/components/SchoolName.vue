<template>
    <div class="bombody" v-if="schnameflag">
        <div class="inbombody">
           <h2>学校信息管理系统</h2>
            <p>输入您的学校:</p>
            <input type="text" placeholder="学校名称" v-model="schoolname" @blur="notnull">
            <p class="notnull" v-if="notnullflag">学校名称不能为空 !</p>
        <div>
            <button @click="openclose">退出</button>
            <button @click="logschool">登录</button>
        </div>
        </div>
        <div class="insertsch" @click="issertsch">
            注册学校
        </div>
    </div>
    <div v-else>
        <insertSchoolName></insertSchoolName>
    </div>
</template>

<script>
    import {getSchoolMultidata} from "../network/school";
    import insertSchoolName from "./schoolData/insertSchoolName";

    export default {
        name: "SchoolName",
        data(){
            return{
                schoolname:'',
                notnullflag:false,
                schoolnameid:null,
                schnameflag:true
            }
        },
        components:{
          insertSchoolName
        },
        methods:{
            logschool(){
                if (this.schoolname!=''){
                    getSchoolMultidata(this.schoolname).then(res =>{
                        this.schoolnameid=res.data[0].id
                        if (res.data==0){
                            alert("登陆失败，不存在该学校")
                        }else {
                            this.$store.commit('thisschoolflag')
                            this.$store.commit('thisschoolname',this.schoolname)
                            this.$store.commit('thisschoolid',this.schoolnameid)
                        }
                    }).catch(err =>{
                        alert("登陆失败，不存在该学校")
                    })
                }
            },
            openclose(){
                window.close()
            },
            notnull(){
                if (this.schoolname==''){
                    this.notnullflag=true
                }else {
                    this.notnullflag=false
                }
            },
            issertsch(){
                this.schnameflag=false
            }
        },


    }
</script>

<style scoped>
    .bombody{
        position:absolute;
        width:100%;
        height:100%;
        display: flex;
        background-color: #e9e9e9;
        align-items:center;/*垂直居中*/
        justify-content: center;/*水平居中*/
        text-align: center;
    }
    .inbombody{
        padding-top: 20px;
        text-align: center;
        float: initial;
        background-color: white;
        width: 400px;
        height: 230px;
        border: 1px solid #d6d5d5;
        box-shadow: #6e6969 1px 1px 1px;
        border-radius:8px;
        line-height: 40px;
    }
    .inbombody p{
        float: left;
        padding-left:25px ;
    }
    .inbombody input{
        width: 350px;
        height: 40px;
        border-radius:5px;
        border: 2px solid #36A7F2;
    }
    .inbombody button{
        font-size: 14px;
        height: 30px;
        width: 50px;
        float: right;
        margin:30px 20px 0 0px;
    }
    .notnull{
        color: red;
        font-size: 14px;
    }
    .insertsch{
        font-size: 12px;
        position: relative;
        top: 70px;
        /*left: 55%;*/
        right: 365px;
        color: #848285;
        text-decoration: underline;
    }
</style>